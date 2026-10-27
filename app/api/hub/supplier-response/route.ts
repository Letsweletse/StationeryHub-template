import { NextRequest, NextResponse } from 'next/server';
import { clean, q, SALES_WHATSAPP, sendWhatsApp, money } from '@/lib/hub';
import { ensureFlowSchema, rebuildQuote, supplierSig } from '@/lib/flow';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const id = Number(b.id);
  if (!id || b.t !== supplierSig(id)) return NextResponse.json({ error: 'Invalid link.' }, { status: 403 });
  await ensureFlowSchema();
  const [r] = await q(`select r.*, s.name as sname from sh_supplier_requests r join sh_suppliers s on s.id = r.supplier_id where r.id = $1`, [id]);
  if (!r) return NextResponse.json({ error: 'Request not found.' }, { status: 404 });
  const lines: any[] = Array.isArray(b.lines) ? b.lines.slice(0, 50) : [];
  const allowed = new Set((r.items || []).map((x: any) => Number(x.id)));
  const resp: any[] = [];
  for (const l of lines) {
    const itemId = Number(l.id); if (!allowed.has(itemId)) continue;
    const price = Number(String(l.price ?? '').replace(/[^0-9.]/g, ''));
    const available = l.available !== false;
    const lead = Math.max(0, Math.min(90, Math.floor(Number(l.lead) || 0)));
    resp.push({ id: itemId, price: Number.isFinite(price) && price > 0 ? price : null, available, lead });
    if (r.kind === 'rfq' && available && Number.isFinite(price) && price > 0) {
      // Take the supplier price if it is the first price or cheaper than the current cost.
      await q(`update sh_items set cost_price = $2, supplier_id = $3, price_source = 'supplier', price_checked_at = now(), updated_at = now(),
        status = case when $4 <= 2 then 'Available' else 'On order' end
        where id = $1 and fixed_price is null and (cost_price is null or $2 < cost_price or price_source <> 'supplier')`, [itemId, price, r.supplier_id, lead]);
    }
  }
  await q(`update sh_supplier_requests set status = 'answered', response = $2, responded_at = now() where id = $1`, [id, JSON.stringify({ lines: resp, note: clean(b.note, 500) })]);
  if (r.kind === 'rfq') {
    await rebuildQuote(r.quote_ref, { notify: true });
    await sendWhatsApp(SALES_WHATSAPP, `💬 ${r.sname} priced quote ${r.quote_ref}:\n${resp.map((x) => `• item ${x.id}: ${x.available ? (x.price ? money(x.price) : 'no price') : 'not available'}${x.lead ? ` · ${x.lead} days` : ''}`).join('\n')}`);
  } else {
    await sendWhatsApp(SALES_WHATSAPP, `✅ ${r.sname} answered PO ${r.quote_ref}:\n${resp.map((x) => `• item ${x.id}: ${x.available ? `available${x.lead ? `, ${x.lead} days` : ''}` : 'NOT available'}`).join('\n')}${b.note ? `\nNote: ${clean(b.note, 300)}` : ''}`);
  }
  return NextResponse.json({ ok: true });
}
