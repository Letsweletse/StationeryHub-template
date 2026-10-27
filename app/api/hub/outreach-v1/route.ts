// One-off supplier invitation round (27 Oct 2026). Sends a fixed message to a fixed list exactly once;
// calling it again does nothing. Recipients are wholesalers/distributors found on their public websites.
import { NextResponse } from 'next/server';
import { ensureSchema, q, sendEmail } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const LIST: { company: string; email: string; angle: string }[] = [
  { company: 'BSC Stationery Sales (Treeline)', email: 'sales@treeline.co.za', angle: 'office and school stationery' },
  { company: 'CTP Stationery', email: 'sales@ctpstationery.co.za', angle: 'stationery and paper products' },
  { company: 'Tele Wholesale Stationers', email: 'sales@telestationery.co.za', angle: 'wholesale office stationery' },
  { company: 'CH Africa', email: 'sales@chafrica.co.za', angle: 'original ink, toner and printers' },
  { company: 'Toner Corp', email: 'sales@tonercorp.co.za', angle: 'toner and ink cartridges' },
  { company: 'Introstat', email: 'info@introstat.co.za', angle: 'print consumables' },
  { company: 'Cartridge & Toner Discount Shop', email: 'info@cartridges.co.bw', angle: 'toner refills and remanufactured cartridges' },
];

export async function POST() {
  await ensureSchema();
  const done = await q(`select value from sh_settings where key = 'outreach_v1_sent'`);
  if (done.length) return NextResponse.json({ skipped: 'already sent', at: done[0].value });
  await q(`insert into sh_settings (key, value) values ('outreach_v1_sent', $1)`, [new Date().toISOString()]);
  const results: any[] = [];
  for (const r of LIST) {
    const text = `Dear ${r.company} team,

I'm Letsweletse Seatla from StationeryHub (stationeryhub.co.bw), an office supplies company in Botswana with our head office in Gaborone and branches serving Palapye and Francistown.

We supply businesses, schools, clinics and government departments, and we're looking for reliable wholesale partners for ${r.angle}. Our customers get instant online quotations, and when they ask for items we need to source, our system sends a price request straight to our partner suppliers. When an order is confirmed, the supplier receives the purchase order automatically.

I'd like to invite you to list with us as a supplier:
- Free listing: you add your products at your trade price, we sell and place orders with you. Your details stay private.
- Register here (takes 2 minutes): https://www.stationeryhub.co.bw/suppliers

If you prefer, simply reply with your reseller price list and terms (MOQ, lead times, delivery or collection for Botswana orders) and we'll load it for you.

Looking forward to working together.

Kind regards,
Letsweletse Seatla
StationeryHub, Botswana
+267 75 560 140 (call or WhatsApp)
sales@stationeryhub.co.bw · www.stationeryhub.co.bw`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0e0e0e">${text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace('https://www.stationeryhub.co.bw/suppliers', '<a href="https://www.stationeryhub.co.bw/suppliers">stationeryhub.co.bw/suppliers</a>')
      .replace(/\n/g, '<br>')}</div>`;
    const res = await sendEmail(r.email, 'Supplier partnership: list your range with StationeryHub Botswana', html, text,
      { from: 'Letsweletse Seatla – StationeryHub <sales@stationeryhub.co.bw>', replyTo: 'sales@stationeryhub.co.bw' });
    results.push({ to: r.email, ...res });
  }
  return NextResponse.json({ sent: results });
}
