import { NextResponse } from 'next/server';
import { askAiJson, aiEnabled } from '@/lib/llm';

export const dynamic = 'force-dynamic';
let lastRun = 0; let lastResult: any = null;

// Quick health check for the AI connection (cached for a minute to avoid cost).
export async function GET() {
  if (!aiEnabled()) return NextResponse.json({ enabled: false });
  if (Date.now() - lastRun < 60_000 && lastResult) return NextResponse.json(lastResult);
  lastRun = Date.now();
  const r = await askAiJson('Return {"ok": true}.', { timeoutMs: 15000 });
  lastResult = { enabled: true, provider: r.provider, ok: !!r.data?.ok, error: r.error || null };
  return NextResponse.json(lastResult);
}
