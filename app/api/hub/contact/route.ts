import { NextRequest, NextResponse } from 'next/server';
import { clean, esc, SALES_WHATSAPP, sendEmail, sendWhatsApp } from '@/lib/hub';

export const dynamic = 'force-dynamic';

// Contact form: emails the chosen team inbox (which forwards to Gmail) and alerts sales on WhatsApp.
const INBOX: Record<string, string> = {
  sales: 'sales@stationeryhub.co.bw',
  operations: 'operations@stationeryhub.co.bw',
  management: 'letsweletseseatla@stationeryhub.co.bw',
};

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  if (b.website) return NextResponse.json({ ok: true });
  const name = clean(b.name, 80); const phone = clean(b.phone, 40); const email = clean(b.email, 120); const message = clean(b.message, 2000);
  const to = INBOX[b.topic] || INBOX.sales;
  if (!name || (!phone && !email) || message.length < 3) return NextResponse.json({ error: 'Please add your name, a phone or email, and your message.' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please check your email address.' }, { status: 400 });
  const html = `<p><strong>${esc(name)}</strong>${phone ? ` · ${esc(phone)}` : ''}${email ? ` · ${esc(email)}` : ''}</p><p style="white-space:pre-wrap">${esc(message)}</p><p style="color:#888;font-size:12px">Sent from the stationeryhub.co.bw contact form</p>`;
  const r = await sendEmail(to, `Website enquiry from ${name}`, html, `${name} ${phone} ${email}\n\n${message}`, { from: 'StationeryHub Website <website@stationeryhub.co.bw>', replyTo: email || undefined });
  await sendWhatsApp(SALES_WHATSAPP, `📩 Website enquiry (${to.split('@')[0]})\n${name}${phone ? ` · ${phone}` : ''}${email ? ` · ${email}` : ''}\n${message.slice(0, 600)}`);
  if ((r as any).ok === false) return NextResponse.json({ error: 'Could not send right now. Please WhatsApp +267 75 560 140.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
