// Daily price refresh. Looks up current South African market prices for catalogue items with Gemini
// (Google Search grounding), converts to a Botswana landed cost and lets the markup do the rest.
// Runs from Vercel Cron; does nothing until GEMINI_API_KEY is set. Fixed prices and supplier costs are never touched.
import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, getSettings, isAdminCookie, landedCost, q } from '@/lib/hub';
import { aiEnabled, askGeminiJson } from '@/lib/llm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  const fromCron = secret ? auth === `Bearer ${secret}` : (req.headers.get('user-agent') || '').startsWith('vercel-cron');
  const admin = isAdminCookie(req.cookies.get('sh_admin')?.value);
  if (!fromCron && !admin) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  if (!aiEnabled()) return NextResponse.json({ skipped: 'GEMINI_API_KEY not set' });

  await ensureSchema();
  const s = await getSettings();
  const last = Date.parse(s.last_reprice || '') || 0;
  if (!admin && Date.now() - last < 20 * 3600 * 1000) return NextResponse.json({ skipped: 'ran recently' });
  await q(`insert into sh_settings (key, value) values ('last_reprice', $1) on conflict (key) do update set value = excluded.value`, [new Date().toISOString()]);

  const items = await q(`select id, code, name, market_zar from sh_items
    where active and fixed_price is null and (price_source like 'market%' or cost_price is null)
      and (price_checked_at is null or price_checked_at < now() - interval '21 days')
    order by price_checked_at nulls first, id limit 6`);
  if (!items.length) return NextResponse.json({ ok: true, checked: 0 });

  const results: any[] = [];
  for (let i = 0; i < items.length; i += 6) {
    const batch = items.slice(i, i + 6);
    const ai = await askGeminiJson(
      'For each GENUINE/original printer consumable below find (1) the current typical retail price in South Africa in ZAR incl. VAT ' +
      '(Takealot, Makro, PriceCheck, Waltons, Incredible Connection) and (2) any current price in Botswana in BWP from local shops ' +
      '(Home Corp homecorp.co.bw, BMS bmsonline.co.bw, Century Office Supplies century.bw, Cyberstore cyberstore.co.bw, Game Botswana, Northern Fixtures). ' +
      'Ignore compatible/generic cartridges. Return ONLY JSON: [{"code":"...","zar":number|null,"source":"shop","bw":[{"shop":"...","bwp":number,"url":"..."}]}].\n' +
      batch.map((b: any) => `- ${b.code}: ${b.name}`).join('\n'),
      { search: true, timeoutMs: 25000 },
    );
    if (!Array.isArray(ai)) continue;
    for (const row of ai) {
      const it = batch.find((b: any) => String(b.code).toLowerCase() === String(row?.code || '').toLowerCase());
      if (!it) continue;
      for (const c of Array.isArray(row?.bw) ? row.bw.slice(0, 5) : []) {
        const bwp = Number(c?.bwp); const shop = String(c?.shop || '').slice(0, 60);
        if (!shop || !Number.isFinite(bwp) || bwp < 20 || bwp > 50000) continue;
        await q(`insert into sh_competitor_prices (code, shop, price_bwp, url) values ($1,$2,$3,$4)
          on conflict (code, shop) do update set price_bwp = excluded.price_bwp, url = excluded.url, checked_at = now()`, [it.code, shop, bwp, String(c?.url || '').slice(0, 400) || null]);
        results.push({ code: it.code, competitor: shop, bwp });
      }
      const zar = Number(row?.zar);
      if (!Number.isFinite(zar) || zar < 20 || zar > 50000) continue;
      const prev = Number(it.market_zar) || 0;
      if (prev && (zar < prev * 0.5 || zar > prev * 2)) { results.push({ code: it.code, skipped: 'change too large', prev, zar }); continue; }
      await q(`update sh_items set market_zar=$2, cost_price=$3, price_source='market_za_ai', price_checked_at=now(), updated_at=now() where id=$1`,
        [it.id, zar, landedCost(zar, s)]);
      results.push({ code: it.code, zar, source: row.source });
    }
  }
  // Mark the rest as checked so the job moves on to other items tomorrow.
  await q(`update sh_items set price_checked_at = now() where id = any($1::int[]) and (price_checked_at is null or price_checked_at < now() - interval '21 days')`, [items.map((x: any) => x.id)]);
  return NextResponse.json({ ok: true, checked: items.length, updated: results.filter((r) => r.zar && !r.skipped).length, results });
}
