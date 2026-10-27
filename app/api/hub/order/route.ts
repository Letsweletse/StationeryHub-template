// Customer confirms a quotation as an order. This is the point where people step in:
// sales and the delivering branch get a WhatsApp alert and operations@ gets the order by email.
import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { sendPurchaseOrders } from '@/lib/flow';
import { clean, ensureSchema, esc, money, q, quoteSig, quoteUrl, SALES_WHATSAPP, sendEmail, sendWhatsApp } from '@/lib/hub';
import { branchFor } from '@/lib/eta';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const ref = clean(b.ref, 40);
  if (!ref || b.s !== quoteSig(ref)) return NextResponse.json({ error: 'Invalid quotation link.' }, { status: 403 });
  await ensureSchema();
  const [row] = await q(`select * from sh_quotes where ref = $1`, [ref]);
  if (!row) return NextResponse.json({ error: 'Quotation not found.' }, { status: 404 });
  if (row.ordered_at) return NextResponse.json({ ok: true, already: true });
  const address = clean(b.address, 300); const po = clean(b.po, 60); const note = clean(b.note, 600);
  await q(`update sh_quotes set status = 'ordered', ordered_at = now(), notes = concat_ws(E'\\n', notes, $2::text) where id = $1`,
    [row.id, [address && `Delivery address: ${address}`, po && `PO: ${po}`, note && `Order note: ${note}`].filter(Boolean).join('\n') || null]);

  const branch = branchFor(row.delivery_area || 'Gaborone');
  const items: any[] = row.items || []; const unpriced: any[] = row.unpriced || [];
  const lines = [
    `✅ ORDER CONFIRMED ${row.ref}`,
    `${row.customer_name}${row.company ? ` (${row.company})` : ''}`,
    row.phone ? `📞 ${row.phone}` : '', row.email ? `✉️ ${row.email}` : '',
    `Deliver to: ${row.delivery_area || 'Gaborone'}${address ? ` · ${address}` : ''}`,
    po ? `PO: ${po}` : '',
    ...items.map((x) => `• ${x.qty} × ${x.name} = ${money(Number(x.total_bwp))}`),
    ...unpriced.map((x) => `• ${x.qty} × ${x.name}: PRICE NEEDED`),
    `Total: ${money(Number(row.subtotal_bwp))}`,
    note ? `Note: ${note}` : '',
    quoteUrl(row.ref),
  ].filter(Boolean).join('\n');
  await sendWhatsApp(SALES_WHATSAPP, lines);
  if (branch.wa !== SALES_WHATSAPP) await sendWhatsApp(branch.wa, lines);
  const html = `<pre style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(lines)}</pre>`;
  await sendEmail('operations@stationeryhub.co.bw', `ORDER ${row.ref}: ${row.customer_name}${row.company ? ` (${row.company})` : ''}`, html, lines,
    { from: 'StationeryHub Orders <orders@stationeryhub.co.bw>', replyTo: row.email || undefined });
  if (row.email) {
    await sendEmail(row.email, `Order received: ${row.ref}`,
      `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0e0e0e"><p>Dear ${esc(row.customer_name)},</p><p>Thank you, we have received your order <strong>${esc(row.ref)}</strong>. Our ${esc(branch.town)} team will confirm stock, delivery and payment details shortly.</p><p>Questions? WhatsApp ${esc(branch.phone)} or reply to this email.</p><p>StationeryHub</p></div>`,
      `Thank you, we have received your order ${row.ref}. Our ${branch.town} team will confirm stock, delivery and payment details shortly. WhatsApp ${branch.phone}.`,
      { from: 'StationeryHub Orders <orders@stationeryhub.co.bw>', replyTo: 'operations@stationeryhub.co.bw' });
  }
  waitUntil(sendPurchaseOrders(row.ref).catch((e) => console.error('po', e)));
  return NextResponse.json({ ok: true, branch: { town: branch.town, phone: branch.phone } });
}
