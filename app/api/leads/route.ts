import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type LeadPayload = {
  fullName?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  location?: string;
  productName?: string;
  productId?: number;
  message?: string;
  quantity?: number;
};

function clean(value: unknown, max = 120) {
  return String(value ?? '').trim().slice(0, max);
}

function phoneDigits(value: string) {
  return value.replace(/[^0-9]/g, '');
}

function whatsappText(text: string) {
  return encodeURIComponent(text.slice(0, 850));
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as LeadPayload;
    const fullName = clean(body.fullName || 'Website Customer', 80);
    const companyName = clean(body.companyName, 100);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 120);
    const location = clean(body.location || 'Botswana', 80);
    const productName = clean(body.productName || 'StationeryHub product', 180);
    const message = clean(body.message || 'Customer wants quotation.', 300);
    const quantity = Math.max(1, Number(body.quantity || 1));

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL);

    const productRows = body.productId
      ? await sql`select id, name from products where id = ${body.productId} limit 1`
      : await sql`select id, name from products where lower(name) = lower(${productName}) limit 1`;

    const product = productRows[0] as { id?: number; name?: string } | undefined;
    const savedProductId = product?.id ?? null;
    const savedProductName = product?.name || productName;

    const customerRows = await sql`
      insert into stationery_customers (full_name, company_name, phone, email, location)
      values (${fullName}, ${companyName}, ${phone}, ${email}, ${location})
      returning id
    `;
    const customerId = customerRows[0].id as string;

    const leadRows = await sql`
      insert into stationery_leads (customer_id, product_id, product_name, message, quantity_requested, status, source)
      values (${customerId}, ${savedProductId}, ${savedProductName}, ${message}, ${quantity}, 'new', 'website')
      returning id
    `;
    const leadId = leadRows[0].id as string;

    const settingsRows = await sql`
      select whatsapp_number, sales_email
      from stationery_business_settings
      order by updated_at desc
      limit 1
    `;

    const whatsappNumber = phoneDigits(String(settingsRows[0]?.whatsapp_number || '+26775560140'));
    const text = `StationeryHub order. Item: ${savedProductName}. Qty: ${quantity}. Name: ${fullName}. Phone: ${phone}. Area: ${location}. Lead: ${leadId.slice(0, 8)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText(text)}`;

    return NextResponse.json({ ok: true, leadId, customerId, whatsappUrl });
  } catch (error) {
    console.error('Lead capture failed:', error);
    return NextResponse.json({ error: 'Failed to capture lead.' }, { status: 500 });
  }
}
