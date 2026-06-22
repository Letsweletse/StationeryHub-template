import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function clean(value: unknown, max = 160) {
  return String(value || '').trim().slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 500 });
    }

    const body = await request.json();
    const email = clean(body.email).toLowerCase();
    const fullName = clean(body.fullName || 'Subscriber', 80);
    const companyName = clean(body.companyName, 100);
    const phone = clean(body.phone, 40);

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL);
    await sql`
      create table if not exists stationery_email_subscribers (
        id uuid primary key default gen_random_uuid(),
        email text unique not null,
        full_name text,
        company_name text,
        phone text,
        status text default 'subscribed',
        created_at timestamptz default now()
      )
    `;

    await sql`
      insert into stationery_email_subscribers (email, full_name, company_name, phone, status)
      values (${email}, ${fullName}, ${companyName}, ${phone}, 'subscribed')
      on conflict (email) do update set
        full_name = excluded.full_name,
        company_name = excluded.company_name,
        phone = excluded.phone,
        status = 'subscribed'
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Subscribe failed:', error);
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
  }
}
