import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type QuotePayload = {
  fullName?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  location?: string;
  requestedItems?: string;
};

function clean(value: unknown, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as QuotePayload;
    const fullName = clean(body.fullName || 'Website Customer', 80);
    const companyName = clean(body.companyName, 100);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 120);
    const location = clean(body.location || 'Botswana', 80);
    const requestedItems = clean(body.requestedItems || 'General office supplies quote request.', 900);

    if (!phone || !requestedItems) {
      return NextResponse.json({ error: 'Phone and requested items are required.' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL);

    const customerRows = await sql`
      insert into stationery_customers (full_name, company_name, phone, email, location)
      values (${fullName}, ${companyName}, ${phone}, ${email}, ${location})
      returning id
    `;
    const customerId = customerRows[0].id as string;

    const quoteRows = await sql`
      insert into stationery_quote_requests (customer_id, company_name, contact_person, phone, email, location, requested_items, status)
      values (${customerId}, ${companyName}, ${fullName}, ${phone}, ${email}, ${location}, ${requestedItems}, 'new')
      returning id
    `;

    return NextResponse.json({ ok: true, quoteRequestId: quoteRows[0].id, customerId });
  } catch (error) {
    console.error('Quote request failed:', error);
    return NextResponse.json({ error: 'Failed to capture quote request.' }, { status: 500 });
  }
}
