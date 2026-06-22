import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function cleanEmail(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

function money(value: unknown) {
  const text = String(value || '').trim();
  return text || 'Request quote';
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CAMPAIGN_FROM_EMAIL || 'StationeryHub <sales@stationeryhub.co.bw>';

  if (!apiKey) return { skipped: true, reason: 'RESEND_API_KEY missing' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  return { ok: response.ok, status: response.status, text: await response.text() };
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const testEmail = cleanEmail(body.testEmail);
    const limit = Math.min(Number(body.limit || 50), 100);

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      create table if not exists stationery_email_campaigns (
        id uuid primary key default gen_random_uuid(),
        campaign_name text not null,
        subject text not null,
        recipient_email text not null,
        status text default 'pending',
        provider_response text,
        sent_at timestamptz,
        created_at timestamptz default now()
      )
    `;

    const products = await sql`
      select name, price, category, stock
      from products
      order by category, name
      limit 30
    `;

    const recipients = testEmail
      ? [{ email: testEmail }]
      : await sql`
          select distinct email
          from stationery_customers
          where email is not null
            and email <> ''
          order by email
          limit ${limit}
        `;

    const productRows = (products as any[]).map((p) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #eee;">${p.name || ''}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;">${p.category || ''}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;font-weight:700;">${money(p.price)}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;">${p.stock ?? ''}</td>
      </tr>
    `).join('');

    const subject = 'StationeryHub Botswana price list and office supply quote';
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#111;">
        <h1 style="margin:0 0 10px;font-size:28px;">StationeryHub Botswana Price List</h1>
        <p>Good day, here is a current StationeryHub office supplies price list. Reply to this email or WhatsApp us for availability and bulk pricing.</p>
        <p><strong>Sales:</strong> sales@stationeryhub.co.bw<br/>
        <strong>WhatsApp:</strong> +267 75 560 140 / +267 72 347 712</p>
        <table style="width:100%;border-collapse:collapse;margin-top:20px;">
          <thead><tr style="background:#111;color:white;"><th align="left" style="padding:10px;">Product</th><th align="left" style="padding:10px;">Category</th><th align="left" style="padding:10px;">Price</th><th align="left" style="padding:10px;">Stock</th></tr></thead>
          <tbody>${productRows}</tbody>
        </table>
        <p style="margin-top:20px;"><a href="https://www.stationeryhub.co.bw/quote" style="background:#c8481a;color:white;padding:12px 18px;text-decoration:none;font-weight:bold;">Request a quote</a></p>
        <p style="font-size:12px;color:#666;margin-top:30px;">You are receiving this because you contacted StationeryHub or requested office supply information. To stop receiving updates, reply REMOVE.</p>
      </div>
    `;

    const results = [];
    for (const recipient of recipients as any[]) {
      const email = cleanEmail(recipient.email);
      if (!email) continue;

      const sent = await sendEmail(email, subject, html);
      await sql`
        insert into stationery_email_campaigns (campaign_name, subject, recipient_email, status, provider_response, sent_at)
        values ('price_list', ${subject}, ${email}, ${sent.ok ? 'sent' : 'failed'}, ${JSON.stringify(sent)}, now())
      `;
      results.push({ email, sent });
    }

    return NextResponse.json({ ok: true, recipients: results.length, results });
  } catch (error) {
    console.error('Price list campaign failed:', error);
    return NextResponse.json({ error: 'Failed to send campaign.' }, { status: 500 });
  }
}
