import { NextRequest, NextResponse } from 'next/server';
import { answer } from '@/lib/hub-assistant';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const b = await req.json().catch(() => ({}));
    const message = String(b.message || '').trim();
    if (!message) return NextResponse.json({ error: 'empty' }, { status: 400 });
    const r = await answer(message, 'web');
    return NextResponse.json(r);
  } catch (e) {
    console.error('assistant', e);
    return NextResponse.json({ text: 'Sorry, I could not check prices right now. Please WhatsApp +267 75 560 140.', matches: [], handoff: true });
  }
}
