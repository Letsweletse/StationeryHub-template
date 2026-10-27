// Cheka Kalahari Domes: enquiries and the public interest counter.
// GET returns real counts only (no seeding or padding). POST stores an enquiry and alerts the owner.
import { NextRequest, NextResponse } from 'next/server';
import { clean, esc, q, SALES_WHATSAPP, sendEmail, sendWhatsApp } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const REASONS: Record<string, string> = {
  open: 'Be told the moment you open',
  invite: 'Invitation to opening night',
  question: 'Question',
  group: 'Company or group booking',
  partner: 'Partner or invest',
};

let ready: Promise<unknown> | null = null;
function schema() {
  ready ??= q(`create table if not exists ck_enquiries (
      id serial primary key, created_at timestamptz not null default now(),
      name text not null, phone text not null, email text, reason text not null,
      travel_type text, visit_when text, message text, guests int)`)
    .then(() => q(`create index if not exists ck_enquiries_phone on ck_enquiries (phone)`))
    .catch((e) => { ready = null; throw e; });
  return ready;
}

export async function GET() {
  try {
    await schema();
    const rows = await q<{ reason: string; n: number }>(`select reason, count(*)::int as n from ck_enquiries group by reason`);
    const [last] = await q<{ at: string | null; people: number }>(`select max(created_at) as at, count(distinct regexp_replace(phone,'\\D','','g'))::int as people from ck_enquiries`);
    const by: Record<string, number> = { open: 0, invite: 0, question: 0, group: 0, partner: 0 };
    for (const r of rows) by[r.reason] = (by[r.reason] || 0) + r.n;
    return NextResponse.json({ people: last?.people || 0, by, latest: last?.at || null },
      { headers: { 'Cache-Control': 's-maxage=20, stale-while-revalidate=60', 'Access-Control-Allow-Origin': '*' } });
  } catch (e) {
    console.error('cheka GET', e);
    return NextResponse.json({ people: null, error: 'unavailable' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await schema();
    const b = await req.json().catch(() => ({}));
    if (b.website) return NextResponse.json({ ok: true }); // honeypot
    const name = clean(b.name, 80), phone = clean(b.phone, 30), email = clean(b.email, 120);
    const reason = REASONS[b.reason] ? String(b.reason) : 'open';
    if (name.length < 2 || phone.replace(/\D/g, '').length < 7) return NextResponse.json({ error: 'Please add your name and a phone number we can reach you on.' }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please check your email address.' }, { status: 400 });
    const digits = phone.replace(/\D/g, '');
    const dup = await q(`select id from ck_enquiries where regexp_replace(phone,'\\D','','g') = $1 and reason = $2 and created_at > now() - interval '1 day' limit 1`, [digits, reason]);
    if (dup.length) return NextResponse.json({ ok: true, duplicate: true });
    const guests = Math.min(200, Math.max(0, Math.floor(Number(b.guests) || 0))) || null;
    const row = { name, phone, email: email || null, reason, travel_type: clean(b.type, 60), visit_when: clean(b.when, 60), message: clean(b.msg, 1000), guests };
    await q(`insert into ck_enquiries (name, phone, email, reason, travel_type, visit_when, message, guests) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [row.name, row.phone, row.email, row.reason, row.travel_type, row.visit_when, row.message || null, row.guests]);

    const lines = [`🏕️ Cheka Kalahari Domes enquiry`, `${REASONS[reason]}`, `👤 ${name}`, `📞 ${phone}`, email && `✉️ ${email}`,
      row.travel_type && `Travelling as: ${row.travel_type}`, row.visit_when && `When: ${row.visit_when}`, guests && `Guests: ${guests}`, row.message && `💬 ${row.message}`].filter(Boolean).join('\n');
    await Promise.all([
      sendWhatsApp(SALES_WHATSAPP, lines),
      sendEmail('letsweletseseatla@stationeryhub.co.bw', `Cheka Kalahari Domes: ${REASONS[reason]} from ${name}`,
        `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">${esc(lines).replace(/\n/g, '<br>')}</div>`, lines,
        { from: 'Cheka Kalahari Domes <enquiries@stationeryhub.co.bw>', replyTo: email || undefined }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('cheka POST', e);
    return NextResponse.json({ error: 'We could not save your enquiry. Please WhatsApp +267 75 560 140.' }, { status: 500 });
  }
}
