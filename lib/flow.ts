// The automatic pipeline behind every quotation:
//  1. AI looks up prices for anything we cannot price yet (and items typed in the notes),
//  2. suppliers are asked for a price on whatever is still unpriced (WhatsApp + email, one-click reply link),
//  3. when a price comes in, the customer's quotation is updated and re-sent automatically,
//  4. when the customer confirms, the order goes to the supplier(s) as a purchase order.
// People only step in when an order arrives or nobody can price an item.
import crypto from 'crypto';
import { competitorMins, ensureSchema, esc, getSettings, landedCost, money, q, quoteUrl, SALES_WHATSAPP, sellingPrice, sendEmail, sendWhatsApp, type Item } from './hub';
import { aiEnabled, askGeminiJson } from './llm';
import { etaFor } from './eta';

const SITE = process.env.SITE_URL || 'https://www.stationeryhub.co.bw';
const secret = () => process.env.QUOTE_LINK_SECRET || process.env.DATABASE_URL || 'stationeryhub';
export const supplierSig = (id: number) => crypto.createHmac('sha256', secret()).update(`sreq:${id}`).digest('base64url').slice(0, 16);
export const supplierLink = (id: number) => `${SITE}/s/${id}?t=${supplierSig(id)}`;

export async function ensureFlowSchema() {
  await ensureSchema();
  await q(`create table if not exists sh_supplier_requests (
    id serial primary key, quote_ref text, supplier_id int references sh_suppliers(id) on delete cascade,
    kind text not null default 'rfq', items jsonb not null, status text not null default 'sent', response jsonb,
    created_at timestamptz not null default now(), responded_at timestamptz)`);
}

/** Re-price a quotation from the current catalogue. Returns true if anything changed. */
export async function rebuildQuote(ref: string, opts: { notify?: boolean } = {}) {
  const [row] = await q(`select * from sh_quotes where ref = $1`, [ref]);
  if (!row || row.ordered_at) return false;
  const s = await getSettings(); const dm = Number(s.default_markup) || 25;
  const ctx = { settings: s, comp: await competitorMins() };
  const lines = [...(row.items || []), ...(row.unpriced || [])];
  const ids = lines.map((l: any) => Number(l.id)).filter(Boolean);
  const items = ids.length ? await q<Item>(`select * from sh_items where id = any($1::int[])`, [ids]) : [];
  const byId = new Map(items.map((i) => [i.id, i]));
  const priced: any[] = []; const unpriced: any[] = [];
  for (const l of lines) {
    const it = byId.get(Number(l.id)); if (!it) continue;
    const unit = sellingPrice(it, dm, ctx);
    const eta = etaFor(it.status, row.delivery_area || 'Gaborone');
    const base = { id: it.id, code: it.code, name: it.name, qty: l.qty, eta: eta.label, eta_max: eta.max };
    if (unit == null) unpriced.push(base); else priced.push({ ...base, unit_bwp: unit, total_bwp: Math.round(unit * l.qty * 100) / 100 });
  }
  const subtotal = Math.round(priced.reduce((a, x) => a + x.total_bwp, 0) * 100) / 100;
  const changed = priced.length !== (row.items || []).length || Math.abs(subtotal - Number(row.subtotal_bwp)) > 0.009;
  if (!changed) return false;
  await q(`update sh_quotes set items = $2, unpriced = $3, subtotal_bwp = $4 where id = $1`, [row.id, JSON.stringify(priced), JSON.stringify(unpriced), subtotal]);
  if (opts.notify) {
    const url = quoteUrl(ref);
    const msg = `Your StationeryHub quotation ${ref} has been updated${unpriced.length ? '' : ' and is now fully priced'}. Total: ${money(subtotal)}.\nView and confirm: ${url}`;
    if (row.email) await sendEmail(row.email, `Updated quotation ${ref}`, `<div style="font-family:Arial,sans-serif;font-size:14px"><p>Dear ${esc(row.customer_name)},</p><p>${esc(msg).replace(/\n/g, '<br>')}</p><p>StationeryHub</p></div>`, msg);
    if (row.phone) await sendWhatsApp(normPhone(row.phone), msg);
    await sendWhatsApp(SALES_WHATSAPP, `🔄 Quote ${ref} re-priced automatically: ${money(subtotal)}${unpriced.length ? ` · ${unpriced.length} still unpriced` : ' · fully priced'}`);
  }
  return true;
}

const normPhone = (p: string) => { const d = String(p).replace(/\D/g, ''); return /^7\d{7}$/.test(d) ? `267${d}` : d; };

/** AI step: price unpriced lines and turn free-text notes into priced catalogue items. */
export async function autoPriceQuote(ref: string) {
  if (!aiEnabled()) return { skipped: 'ai off' };
  const [row] = await q(`select * from sh_quotes where ref = $1`, [ref]);
  if (!row) return { skipped: 'no quote' };
  const s = await getSettings();
  const unpriced: any[] = row.unpriced || [];
  const notes = String(row.notes || '').trim();
  if (!unpriced.length && notes.length < 4) return { skipped: 'nothing to price' };
  const ai = await askGeminiJson(
    'You price office supplies for StationeryHub, Botswana. For each item, find the current typical retail price in South Africa (ZAR incl. VAT, genuine items, e.g. Takealot, Makro, PriceCheck) ' +
    'and any Botswana price in BWP (Home Corp, BMS, Century Office Supplies, Cyberstore, Game).\n' +
    (unpriced.length ? `Catalogue items needing a price:\n${unpriced.map((u) => `- id ${u.id}: ${u.name}${u.code ? ` (${u.code})` : ''}`).join('\n')}\n` : '') +
    (notes ? `Customer notes (extract any extra products with quantities): <<${notes.slice(0, 800)}>>\n` : '') +
    'Return ONLY JSON: {"priced":[{"id":number,"zar":number|null,"bwp":number|null}],"extra":[{"name":"clear product name","qty":number,"zar":number|null,"bwp":number|null}]}',
    { search: true, timeoutMs: 25000 },
  );
  if (!ai) return { skipped: 'ai no answer' };
  let touched = 0;
  for (const p of Array.isArray(ai.priced) ? ai.priced : []) {
    const id = Number(p?.id); if (!unpriced.some((u) => Number(u.id) === id)) continue;
    const zar = Number(p?.zar); const bwp = Number(p?.bwp);
    if (Number.isFinite(zar) && zar >= 5 && zar <= 50000) {
      await q(`update sh_items set market_zar=$2, cost_price=$3, price_source='market_za_ai', price_checked_at=now() where id=$1 and cost_price is null and fixed_price is null`, [id, zar, landedCost(zar, s)]);
      touched++;
    } else if (Number.isFinite(bwp) && bwp >= 5 && bwp <= 50000) {
      await q(`update sh_items set cost_price=$2, price_source='market_bw_ai', price_checked_at=now() where id=$1 and cost_price is null and fixed_price is null`, [id, Math.round(bwp * 0.85 * 100) / 100]);
      touched++;
    }
  }
  const added: any[] = [];
  for (const x of (Array.isArray(ai.extra) ? ai.extra : []).slice(0, 15)) {
    const name = String(x?.name || '').trim().slice(0, 160); const qty = Math.max(1, Math.min(10000, Math.floor(Number(x?.qty) || 1)));
    if (name.length < 3) continue;
    const zar = Number(x?.zar); const bwp = Number(x?.bwp);
    const cost = Number.isFinite(zar) && zar >= 5 ? landedCost(zar, s) : Number.isFinite(bwp) && bwp >= 5 ? Math.round(bwp * 0.85 * 100) / 100 : null;
    const [ex] = await q(`select id from sh_items where lower(name) = lower($1) limit 1`, [name]);
    const id = ex?.id ?? (await q(`insert into sh_items (name, category, cost_price, market_zar, price_source, price_checked_at, status, active)
      values ($1, 'Customer request', $2, $3, $4, now(), 'Available', false) returning id`, [name, cost, Number.isFinite(zar) ? zar : null, cost ? 'market_za_ai' : null]))[0].id;
    added.push({ id, code: null, name, qty });
  }
  if (added.length) {
    const lines = [...(row.unpriced || []), ...added];
    await q(`update sh_quotes set unpriced = $2 where id = $1`, [row.id, JSON.stringify(lines)]);
  }
  const changed = await rebuildQuote(ref, { notify: true });
  return { touched, added: added.length, changed };
}

/** Ask suppliers to price what is still unpriced on a quotation. */
export async function requestSupplierPrices(ref: string) {
  await ensureFlowSchema();
  const [row] = await q(`select * from sh_quotes where ref = $1`, [ref]);
  const unpriced: any[] = row?.unpriced || [];
  if (!row || !unpriced.length) return { skipped: 'nothing unpriced' };
  const words = unpriced.map((u) => String(u.name).toLowerCase()).join(' ');
  const sups = await q(`select * from sh_suppliers where status = 'approved' order by (plan = 'listed') desc, id`);
  const scored = sups.map((s: any) => ({ s, hit: String(s.categories || '').toLowerCase().split(/[,;/]+/).filter((c: string) => c.trim() && words.includes(c.trim().split(' ')[0])).length }));
  const chosen = (scored.some((x) => x.hit) ? scored.filter((x) => x.hit) : scored).slice(0, 5).map((x) => x.s);
  if (!chosen.length) {
    await sendWhatsApp(SALES_WHATSAPP, `⚠️ Quote ${ref}: ${unpriced.length} item(s) need a price and no approved supplier is on file:\n${unpriced.map((u) => `• ${u.qty} × ${u.name}`).join('\n')}\n${quoteUrl(ref)}`);
    return { suppliers: 0 };
  }
  for (const sup of chosen) {
    const [req] = await q(`insert into sh_supplier_requests (quote_ref, supplier_id, kind, items) values ($1,$2,'rfq',$3) returning id`, [ref, sup.id, JSON.stringify(unpriced.map((u) => ({ id: u.id, name: u.name, code: u.code, qty: u.qty })))]);
    const link = supplierLink(req.id);
    const text = `Dumela ${sup.contact_person || sup.name}, StationeryHub has a customer request. Please send your best price and availability:\n${unpriced.map((u) => `• ${u.qty} × ${u.name}${u.code ? ` (${u.code})` : ''}`).join('\n')}\n\nReply in one click: ${link}\nThank you!`;
    if (sup.phone) await sendWhatsApp(normPhone(sup.phone), text);
    if (sup.email) await sendEmail(sup.email, `Price request ${ref} from StationeryHub`, `<div style="font-family:Arial,sans-serif;font-size:14px"><p>${esc(text).replace(/\n/g, '<br>')}</p></div>`, text, { from: 'StationeryHub Procurement <operations@stationeryhub.co.bw>', replyTo: 'operations@stationeryhub.co.bw' });
  }
  return { suppliers: chosen.length };
}

/** On a confirmed order, send purchase orders to the suppliers of the ordered items. */
export async function sendPurchaseOrders(ref: string) {
  await ensureFlowSchema();
  const [row] = await q(`select * from sh_quotes where ref = $1`, [ref]);
  if (!row) return;
  const lines: any[] = row.items || [];
  const ids = lines.map((l) => Number(l.id));
  const items = ids.length ? await q(`select i.id, i.supplier_id, s.name as sname, s.phone, s.email, s.contact_person from sh_items i left join sh_suppliers s on s.id = i.supplier_id and s.status = 'approved' where i.id = any($1::int[])`, [ids]) : [];
  const bySup = new Map<number, { sup: any; lines: any[] }>(); const noSup: any[] = [];
  for (const l of lines) {
    const it = items.find((x: any) => x.id === Number(l.id));
    if (it?.supplier_id && it.phone) { const g = bySup.get(it.supplier_id) || { sup: it, lines: [] }; g.lines.push(l); bySup.set(it.supplier_id, g); } else noSup.push(l);
  }
  for (const [sid, g] of Array.from(bySup.entries())) {
    const [req] = await q(`insert into sh_supplier_requests (quote_ref, supplier_id, kind, items) values ($1,$2,'po',$3) returning id`, [ref, sid, JSON.stringify(g.lines.map((l) => ({ id: l.id, name: l.name, code: l.code, qty: l.qty })))]);
    const text = `📦 PURCHASE ORDER ${ref} from StationeryHub\nDeliver to: ${row.delivery_area || 'Gaborone'}\n${g.lines.map((l) => `• ${l.qty} × ${l.name}${l.code ? ` (${l.code})` : ''}`).join('\n')}\n\nPlease confirm availability and delivery date: ${supplierLink(req.id)}`;
    await sendWhatsApp(normPhone(g.sup.phone), text);
    if (g.sup.email) await sendEmail(g.sup.email, `Purchase order ${ref} from StationeryHub`, `<pre style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(text)}</pre>`, text, { from: 'StationeryHub Procurement <operations@stationeryhub.co.bw>', replyTo: 'operations@stationeryhub.co.bw' });
  }
  if (noSup.length) await sendWhatsApp(SALES_WHATSAPP, `🛒 Order ${ref}: buy these yourself (no supplier on file):\n${noSup.map((l) => `• ${l.qty} × ${l.name}`).join('\n')}`);
}
