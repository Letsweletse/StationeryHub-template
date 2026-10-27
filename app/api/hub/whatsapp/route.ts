// UltraMsg webhook ("Webhook on Received"): https://www.stationeryhub.co.bw/api/hub/whatsapp
// Quiet mode: the number (+267 75 560 140) is also used for normal business chats, so the bot ONLY
// replies when a message clearly asks about a product we stock. Everything else is left for a person.
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { answer } from '@/lib/hub-assistant';
import { q, sendWhatsApp } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const lastReply = new Map<string, number>();
const PRODUCT_HINT = /(price|how much|cost|quote|toner|ink|cartridge|bottle|stock|available|\bhp\b|canon|brother|epson|\b\d{2,4}[a-z]{0,3}\b)/i;

function authorised(req: NextRequest, evt: any) {
  const want = process.env.WHATSAPP_WEBHOOK_KEY; const k = req.nextUrl.searchParams.get('k');
  if (want && k && k.length === want.length && crypto.timingSafeEqual(Buffer.from(k), Buffer.from(want))) return true;
  const inst = String(evt?.instanceId || '').replace(/^instance/i, '');
  const mine = String(process.env.ULTRAMSG_INSTANCE_ID || '').replace(/^instance/i, '');
  return !!mine && inst === mine;
}

export async function POST(req: NextRequest) {
  if (process.env.WHATSAPP_AUTOREPLY !== 'on') return NextResponse.json({ skipped: 'autoreply off' });
  const evt = await req.json().catch(() => ({} as any));
  if (!authorised(req, evt)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const d = evt?.data ?? {};
  if (evt?.event_type && evt.event_type !== 'message_received') return NextResponse.json({ skipped: 'event' });
  if (d.fromMe || d.self || d.type !== 'chat') return NextResponse.json({ skipped: 'not a customer text' });
  const from = String(d.from || '');
  if (!from || from.endsWith('@g.us') || from.includes('status') || from.includes('broadcast')) return NextResponse.json({ skipped: 'group/status' });
  const body = String(d.body || '').trim();
  if (!body || body.length > 400 || !PRODUCT_HINT.test(body)) return NextResponse.json({ skipped: 'not a product question' });

  const phone = from.replace(/@.*$/, '');
  const now = Date.now();
  if (now - (lastReply.get(phone) || 0) < 30_000) return NextResponse.json({ skipped: 'rate' });
  const [{ n }] = await q<{ n: number }>(`select count(*)::int as n from sh_chat_log where channel = 'whatsapp' and sender = $1 and created_at > now() - interval '1 day'`, [phone]);
  if (n >= 15) return NextResponse.json({ skipped: 'daily limit' });

  const r = await answer(body, 'whatsapp', phone);
  if (!r.matches.length) return NextResponse.json({ skipped: 'no confident match' }); // leave it for a person
  lastReply.set(phone, now);
  await sendWhatsApp(phone, `${r.text}\n\n— StationeryHub price assistant (automatic reply)`);
  return NextResponse.json({ replied: true, matches: r.matches.length });
}
