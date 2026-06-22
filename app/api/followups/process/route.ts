import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function phoneDigits(value: string) {
  return value.replace(/[^0-9]/g, '');
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

  return { ok: response.ok, status: response.status };
}

export async function GET(request: NextRequest) {
  try {
    if (process.env.CRON_SECRET) {
      const token = request.nextUrl.searchParams.get('token');
      if (token !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 500 });
    }

    const sql = neon(process.env.DATABASE_URL);
    const settings = await sql`
      select whatsapp_number
      from stationery_business_settings
      order by updated_at desc
      limit 1
    `;
    const ownerWhatsApp = String(settings[0]?.whatsapp_number || '+26775560140');

    const pending = await sql`
      select f.id, f.message, f.scheduled_for, l.product_name, c.full_name, c.phone
      from stationery_followups f
      left join stationery_leads l on l.id = f.lead_id
      left join stationery_customers c on c.id = l.customer_id
      where f.status = 'pending'
        and (f.scheduled_for is null or f.scheduled_for <= now())
      order by f.created_at asc
      limit 10
    `;

    const results = [];
    for (const item of pending as any[]) {
      const text = `StationeryHub follow-up due\nCustomer: ${item.full_name || 'Customer'}\nPhone: ${item.phone || ''}\nItem: ${item.product_name || ''}\nTask: ${item.message}`;
      const sent = await sendUltraMsg(ownerWhatsApp, text);

      await sql`
        update stationery_followups
        set status = 'sent', sent_at = now()
        where id = ${item.id}
      `;

      results.push({ id: item.id, sent });
    }

    return NextResponse.json({ ok: true, processed: results.length, results });
  } catch (error) {
    console.error('Followup processing failed:', error);
    return NextResponse.json({ error: 'Failed to process followups.' }, { status: 500 });
  }
}
