// UltraMsg webhook: set "Webhook on Received" to https://www.stationeryhub.co.bw/api/hub/whatsapp?k=<WHATSAPP_WEBHOOK_KEY>
// Replies to incoming WhatsApp messages with prices from the catalogue.
// Only use this on the StationeryHub WhatsApp number, never on the ChekaMeds bot number.
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { answer } from '@/lib/hub-assistant';
import { sendWhatsApp } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const recent = new Map<string, number>();

function keyOk(k: string | null) {
  const want = process.env.WHATSAPP_WEBHOOK_KEY;
  if (!want || !k || k.length !== want.length) return false;
  return crypto.timingSafeEqual(Buffer.from(k), Buffer.from(want));
}

export async function POST(req: NextRequest) {
  if (process.env.WHATSAPP_AUTOREPLY !== 'on') return NextResponse.json({ skipped: 'autoreply off' });
  if (!keyOk(req.nextUrl.searchParams.get('k'))) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const evt = await req.json().catch(() => ({} as any));
  const d = evt?.data ?? {};
  if (evt?.event_type && evt.event_type !== 'message_received') return NextResponse.json({ skipped: 'event' });
  if (d.fromMe || d.self || d.type !== 'chat') return NextResponse.json({ skipped: 'not a text from a customer' });
  const from = String(d.from || '');
  if (!from || from.endsWith('@g.us') || from.includes('status')) return NextResponse.json({ skipped: 'group/status' });
  const body = String(d.body || '').trim();
  if (!body) return NextResponse.json({ skipped: 'empty' });

  // Ignore duplicate deliveries of the same message.
  const id = String(d.id || `${from}:${body}`);
  const now = Date.now();
  if (recent.has(id) && now - (recent.get(id) || 0) < 10 * 60 * 1000) return NextResponse.json({ skipped: 'dup' });
  recent.set(id, now);
  if (recent.size > 500) for (const [k, t] of Array.from(recent.entries())) if (now - t > 10 * 60 * 1000) recent.delete(k);

  const phone = from.replace(/@.*$/, '');
  const r = await answer(body, 'whatsapp', phone);
  await sendWhatsApp(phone, r.text);
  const alertTo = process.env.SALES_ALERT_WHATSAPP;
  if (r.handoff && alertTo) await sendWhatsApp(alertTo, `🙋 StationeryHub WhatsApp needs a person\nFrom: +${phone}\nMessage: ${body.slice(0, 500)}`);
  return NextResponse.json({ replied: true, matches: r.matches.length });
}
