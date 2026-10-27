import { NextRequest, NextResponse } from 'next/server';
import { ensureFlowSchema } from '@/lib/flow';
import { competitorMins, clean, ensureSchema, getSettings, isAdminCookie, q, sellingPrice, type Item } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const num = (v: unknown) => {
  if (v === '' || v == null) return null;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
};

function guard(req: NextRequest) {
  return isAdminCookie(req.cookies.get('sh_admin')?.value);
}

export async function GET(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  await ensureFlowSchema();
  const s = await getSettings();
  const dm = Number(s.default_markup) || 25;
  const comp = await competitorMins(); const ctx = { settings: s, comp };
  const [items, suppliers, supplierItems, quotes, chats] = await Promise.all([
    q<Item>(`select * from sh_items order by active desc, brand nulls last, category, name`),
    q(`select s.*, (select count(*)::int from sh_supplier_items x where x.supplier_id = s.id and x.status = 'pending') as pending_items from sh_suppliers s order by s.created_at desc`),
    q(`select x.*, s.name as supplier_name from sh_supplier_items x join sh_suppliers s on s.id = x.supplier_id where x.status = 'pending' order by x.created_at desc limit 300`),
    q(`select id, ref, customer_name, company, phone, email, country, currency, subtotal_bwp, items, unpriced, notes, status, created_at, delivery_area, ordered_at from sh_quotes order by created_at desc limit 100`),
    q(`select channel, sender, message, matched, created_at from sh_chat_log order by created_at desc limit 60`),
  ]);
  return NextResponse.json({
    settings: s,
    items: items.map((i) => ({ ...i, selling: sellingPrice(i, dm, ctx), rival: comp.get(String(i.code || '').toLowerCase()) ?? null })),
    supplierRequests: await q(`select r.id, r.quote_ref, r.kind, r.status, r.items, r.response, r.created_at, s.name as supplier from sh_supplier_requests r join sh_suppliers s on s.id = r.supplier_id order by r.created_at desc limit 60`),
    competitors: await q(`select code, shop, price_bwp, url, checked_at from sh_competitor_prices order by checked_at desc limit 300`),
    suppliers, supplierItems, quotes, chats,
  });
}

export async function POST(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  await ensureSchema();
  const b = await req.json().catch(() => ({}));
  switch (b.action) {
    case 'save_item': {
      const id = Number(b.id);
      await q(`update sh_items set name=coalesce(nullif($2,''),name), code=nullif($3,''), brand=nullif($4,''), category=nullif($5,''),
        cost_price=$6, markup_pct=$7, fixed_price=$8, status=coalesce(nullif($9,''),'Available'), compat=nullif($10,''), active=$11, updated_at=now() where id=$1`,
        [id, clean(b.name, 160), clean(b.code, 60), clean(b.brand, 60), clean(b.category, 60), num(b.cost_price), num(b.markup_pct), num(b.fixed_price), clean(b.status, 40), clean(b.compat, 300), b.active !== false]);
      return NextResponse.json({ ok: true });
    }
    case 'add_item': {
      const name = clean(b.name, 160);
      if (name.length < 2) return NextResponse.json({ error: 'Name required' }, { status: 400 });
      const [row] = await q(`insert into sh_items (name, code, brand, category, cost_price, markup_pct, fixed_price, compat) values ($1,nullif($2,''),nullif($3,''),nullif($4,''),$5,$6,$7,nullif($8,'')) returning id`,
        [name, clean(b.code, 60), clean(b.brand, 60), clean(b.category, 60), num(b.cost_price), num(b.markup_pct), num(b.fixed_price), clean(b.compat, 300)]);
      return NextResponse.json({ ok: true, id: row.id });
    }
    case 'bulk_costs': {
      // Lines: "code, cost" or "code, cost, markup%"
      const lines = String(b.text || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 1000);
      let updated = 0; const missing: string[] = [];
      for (const line of lines) {
        const [code, cost, markup] = line.split(/\s*[,;\t|]\s*/);
        const c = num(cost);
        if (!code || c == null) { missing.push(line); continue; }
        const r = await q(`update sh_items set cost_price=$2, markup_pct=coalesce($3, markup_pct), updated_at=now() where lower(code)=lower($1) returning id`, [code.trim(), c, num(markup)]);
        if (r.length) updated++; else missing.push(code.trim());
      }
      return NextResponse.json({ ok: true, updated, missing });
    }
    case 'save_settings': {
      const allowed = ['default_markup', 'usd_per_bwp', 'zar_per_bwp', 'listing_fee_bwp', 'quote_valid_days', 'landing_pct', 'beat_pct', 'min_margin_pct'];
      for (const k of allowed) {
        const v = num(b.settings?.[k]);
        if (v != null && v >= 0) await q(`insert into sh_settings (key, value) values ($1,$2) on conflict (key) do update set value=excluded.value`, [k, String(v)]);
      }
      return NextResponse.json({ ok: true });
    }
    case 'supplier': {
      await q(`update sh_suppliers set status=coalesce(nullif($2,''),status), plan=coalesce(nullif($3,''),plan), show_contact=$4, paid_until=$5 where id=$1`,
        [Number(b.id), clean(b.status, 20), clean(b.plan, 20), !!b.show_contact, b.paid_until ? clean(b.paid_until, 10) : null]);
      return NextResponse.json({ ok: true });
    }
    case 'approve_supplier_item': {
      const [x] = await q(`select * from sh_supplier_items where id=$1`, [Number(b.id)]);
      if (!x) return NextResponse.json({ error: 'not found' }, { status: 404 });
      let itemId: number | null = null;
      if (x.code) {
        const ex = await q(`select id from sh_items where lower(code)=lower($1)`, [x.code]);
        if (ex.length) {
          itemId = ex[0].id;
          await q(`update sh_items set cost_price=coalesce($2,cost_price), supplier_id=$3, active=true, updated_at=now() where id=$1`, [itemId, x.supplier_price, x.supplier_id]);
        }
      }
      if (!itemId) {
        const [row] = await q(`insert into sh_items (name, code, brand, category, cost_price, supplier_id) values ($1,$2,$3,$4,$5,$6) returning id`,
          [x.name, x.code, x.brand || clean(b.brand, 60) || null, x.category || clean(b.category, 60) || null, x.supplier_price, x.supplier_id]);
        itemId = row.id;
      }
      await q(`update sh_supplier_items set status='approved', item_id=$2 where id=$1`, [x.id, itemId]);
      return NextResponse.json({ ok: true, item_id: itemId });
    }
    case 'recalc_market': {
      const st = await getSettings();
      const zpb = Number(st.zar_per_bwp) || 1.33; const landing = Number(st.landing_pct ?? 12) || 0;
      const r = await q(`update sh_items set cost_price = round((market_zar / $1::numeric) * (1 + $2::numeric / 100), 2), updated_at = now()
        where market_zar is not null and price_source like 'market%' returning id`, [zpb, landing]);
      return NextResponse.json({ ok: true, updated: r.length });
    }
    case 'reject_supplier_item':
      await q(`update sh_supplier_items set status='rejected' where id=$1`, [Number(b.id)]);
      return NextResponse.json({ ok: true });
    case 'quote_status':
      await q(`update sh_quotes set status=$2 where id=$1`, [Number(b.id), clean(b.status, 20)]);
      return NextResponse.json({ ok: true });
    default:
      return NextResponse.json({ error: 'unknown action' }, { status: 400 });
  }
}
