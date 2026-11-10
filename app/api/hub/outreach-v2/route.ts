// One-off supplier follow-up round (10 Nov 2026) to the 27 Oct invitees who have not replied.
// Sends a fixed message to a fixed list exactly once; calling it again does nothing.
import { NextResponse } from 'next/server';
import { ensureSchema, q, sendEmail } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const LIST: { company: string; email: string; angle: string }[] = [
  { company: 'BSC Stationery Sales (Treeline)', email: 'sales@treeline.co.za', angle: 'office and school stationery' },
  { company: 'Tele Wholesale Stationers', email: 'sales@telestationery.co.za', angle: 'wholesale office stationery' },
  { company: 'CH Africa', email: 'sales@chafrica.co.za', angle: 'original ink, toner and printers' },
  { company: 'Toner Corp', email: 'sales@tonercorp.co.za', angle: 'toner and ink cartridges' },
  { company: 'Introstat', email: 'info@introstat.co.za', angle: 'print consumables' },
  { company: 'Cartridge & Toner Discount Shop', email: 'info@cartridges.co.bw', angle: 'toner refills and remanufactured cartridges' },
];

async function run() {
  await ensureSchema();
  const done = await q(`select value from sh_settings where key = 'outreach_v2_sent'`);
  if (done.length) return NextResponse.json({ skipped: 'already sent', at: done[0].value });
  await q(`insert into sh_settings (key, value) values ('outreach_v2_sent', $1)`, [new Date().toISOString()]);
  const results: any[] = [];
  for (const r of LIST) {
    const text = `Dear ${r.company} team,

A quick follow-up on my note of 27 October inviting you to supply StationeryHub (stationeryhub.co.bw), the Botswana office supplies company serving Gaborone, Palapye and Francistown.

Business customers are sending us requests every week, including this week for toner cartridges, computers and printers, and we want reliable wholesale partners for ${r.angle} to quote on them.

How it works for you:
- Free listing: add your products at your trade price, or simply reply with your reseller price list and we will load it for you.
- When a customer asks for an item you carry, you receive the price request directly, and confirmed orders come to you as purchase orders.
- Your trade prices stay private.

Register in 2 minutes: https://www.stationeryhub.co.bw/suppliers

Or just reply with your price list and terms (MOQ, lead times, delivery or collection for Botswana orders).

Kind regards,
Letsweletse Seatla
StationeryHub, Botswana
+267 75 560 140 (call or WhatsApp)
sales@stationeryhub.co.bw · www.stationeryhub.co.bw

If you would prefer not to hear from us again, reply with "unsubscribe" and we will not contact you again.`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0e0e0e">${text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace('https://www.stationeryhub.co.bw/suppliers', '<a href="https://www.stationeryhub.co.bw/suppliers">stationeryhub.co.bw/suppliers</a>')
      .replace(/\n/g, '<br>')}</div>`;
    const res = await sendEmail(r.email, 'Re: Supplier partnership: list your range with StationeryHub Botswana', html, text,
      { from: 'Letsweletse Seatla – StationeryHub <sales@stationeryhub.co.bw>', replyTo: 'sales@stationeryhub.co.bw' });
    results.push({ to: r.email, ...res });
  }
  return NextResponse.json({ sent: results });
}

export async function POST() { return run(); }
export async function GET() { return run(); }
