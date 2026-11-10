// Retry of the 4 rate-limited sends from the international partnership round (10 Nov 2026): ask manufacturers/brand owners in South Africa,
// India, Germany, Australia and China to appoint StationeryHub as their local supplier in Botswana.
// Addresses are the companies' public contact emails. Sends exactly once.
import { NextResponse } from 'next/server';
import { ensureSchema, q, sendEmail } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const LIST: { company: string; email: string; range: string }[] = [
  { company: 'Pelikan Middle East & Africa', email: 'mohammedf@pelikan.ae', range: 'Pelikan, Herlitz, Oxford and Elba school and office products' },
  { company: 'Bala Trading', email: 'sales@balatrading.com.au', range: 'thermal and POS rolls, labels and business stationery' },
  { company: 'Ningbo Guangbo', email: 'info@guangbo.net', range: 'stationery, notebooks and office paper products' },
  { company: 'Zhejiang Dongxiao Stationery', email: 'Leo@chinadongxiao.com', range: 'office and school stationery' },
];

async function run() {
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ skipped: 'no email key on this deployment' });
  await ensureSchema();
  const done = await q(`select value from sh_settings where key = 'outreach_v3b_sent'`);
  if (done.length) return NextResponse.json({ skipped: 'already sent', at: done[0].value });
  await q(`insert into sh_settings (key, value) values ('outreach_v3b_sent', $1)`, [new Date().toISOString()]);
  const results: any[] = [];
  for (const r of LIST) {
    await new Promise((res) => setTimeout(res, 1200));
    const text = `Dear ${r.company} team,

I'm Letsweletse Seatla, founder of StationeryHub (www.stationeryhub.co.bw), an office supplies company in Botswana with our head office in Gaborone and branches serving Palapye and Francistown.

We supply businesses, schools, clinics and government departments, and we receive requests for quotation every week. We would like to carry your ${r.range} and become your local supplier in Botswana.

We would welcome the chance to discuss:
- Becoming your authorised reseller or distributor for Botswana
- Your distributor price list, minimum order quantities and lead times to Botswana (or via South Africa)
- Payment terms, and any marketing or product-training support for partners

StationeryHub lists products online with instant quotations, so your range would be visible to our business and government customers from day one.

Could you let me know the right person to speak to, or share your partner terms and catalogue? A short call is also welcome.

Kind regards,
Letsweletse Seatla
Founder, StationeryHub, Botswana
+267 75 560 140 (call or WhatsApp)
sales@stationeryhub.co.bw · www.stationeryhub.co.bw

If you would prefer not to hear from us again, reply with "unsubscribe" and we will not contact you again.`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0e0e0e">${text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>')}</div>`;
    const res = await sendEmail(r.email, 'Partnership request: become your local supplier in Botswana (StationeryHub)', html, text,
      { from: 'Letsweletse Seatla – StationeryHub <sales@stationeryhub.co.bw>', replyTo: 'sales@stationeryhub.co.bw' });
    results.push({ to: r.email, ...res });
  }
  return NextResponse.json({ sent: results });
}

export async function POST() { return run(); }
export async function GET() { return run(); }
