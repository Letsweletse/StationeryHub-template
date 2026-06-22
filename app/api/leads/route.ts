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

async function sendZapierLead(payload: {
  email: string;
  name: string;
  phone: string;
  company: string;
  location: string;
  product: string;
}) {
  const webhookUrl = process.env.ZAPIER_LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { skipped: true, reason: 'ZAPIER_LEADS_WEBHOOK_URL env var missing' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Zapier lead webhook failed:', { status: response.status, text });
      return { ok: false, status: response.status };
    }

    return { ok: true };
  } catch (error) {
    console.error('Zapier lead webhook error:', error);
    return { ok: false };
  }
}

async function sendUltraMsg(to: string, body: string) {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const token = process.env.ULTRAMSG_TOKEN;

  if (!instanceId || !token) {
    return { skipped: true, reason: 'UltraMsg env vars missing' };
  }

  const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      token,
      to: phoneDigits(to),
      body: body.slice(0, 950),
      priority: '10',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return { ok: false, status: response.status, text };
  }

  return { ok: true };
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

    await sql`
      insert into stationery_conversations (phone, channel, user_message, ai_response, intent, product_id, product_name, lead_id)
      values (${phone}, 'website', ${message}, 'Lead captured. Sales team will respond on WhatsApp.', 'product_inquiry', ${savedProductId}, ${savedProductName}, ${leadId})
    `;

    await sql`
      insert into stationery_followups (lead_id, followup_type, message, scheduled_for, status)
      values (
        ${leadId},
        'sales_followup',
        ${`Follow up with ${fullName} about ${savedProductName}. Phone: ${phone}`},
        now() + interval '1 hour',
        'pending'
      )
    `;

    const settingsRows = await sql`
      select whatsapp_number, sales_email
      from stationery_business_settings
      order by updated_at desc
      limit 1
    `;

    const whatsappNumber = phoneDigits(String(settingsRows[0]?.whatsapp_number || '+26775560140'));
    const text = `StationeryHub order. Item: ${savedProductName}. Qty: ${quantity}. Name: ${fullName}. Phone: ${phone}. Area: ${location}. Lead: ${leadId.slice(0, 8)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText(text)}`;

    const internalAlert = `New StationeryHub lead\nItem: ${savedProductName}\nQty: ${quantity}\nName: ${fullName}\nPhone: ${phone}\nArea: ${location}\nLead: ${leadId.slice(0, 8)}`;
    const alertResult = await sendUltraMsg(whatsappNumber, internalAlert);
    const zapierResult = await sendZapierLead({
      email,
      name: fullName,
      phone,
      company: companyName,
      location,
      product: savedProductName,
    });

    return NextResponse.json({ ok: true, leadId, customerId, whatsappUrl, alertResult, zapierResult });
  } catch (error) {
    console.error('Lead capture failed:', error);
    return NextResponse.json({ error: 'Failed to capture lead.' }, { status: 500 });
  }
}
