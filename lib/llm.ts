// AI layer. Uses Vercel AI Gateway with the project's built-in OIDC identity (no API key to manage),
// or Google Gemini directly if GEMINI_API_KEY is set. Everything still works if neither is available.
import { headers } from 'next/headers';

const GATEWAY = 'https://ai-gateway.vercel.sh/v1/chat/completions';
const GATEWAY_MODEL = process.env.AI_MODEL || 'google/gemini-2.5-flash';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
// Accept the key under GEMINI_API_KEY or the shorter names used in Vercel.
const geminiKey = () => process.env.GEMINI_API_KEY || process.env.gemini || process.env.GEMINI || '';

function gatewayToken(): string | null {
  if (process.env.AI_GATEWAY_API_KEY) return process.env.AI_GATEWAY_API_KEY;
  if (process.env.VERCEL_OIDC_TOKEN) return process.env.VERCEL_OIDC_TOKEN;
  try { return headers().get('x-vercel-oidc-token'); } catch { return null; }
}

export const aiEnabled = () => process.env.AI_DISABLED !== '1' && (!!geminiKey() || !!gatewayToken());

function extractJson(text: string): any {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.search(/[[{]/);
  if (start < 0) return null;
  const end = Math.max(raw.lastIndexOf('}'), raw.lastIndexOf(']'));
  try { return JSON.parse(raw.slice(start, end + 1)); } catch { return null; }
}

export type AiResult = { data: any; provider: string; error?: string };

/** Ask the model for JSON. With search=true the model can search the web first. */
export async function askAiJson(prompt: string, opts: { search?: boolean; timeoutMs?: number } = {}): Promise<AiResult> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 25000);
  try {
    if (geminiKey()) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
        method: 'POST', signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey() },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          ...(opts.search ? { tools: [{ google_search: {} }] } : { generationConfig: { responseMimeType: 'application/json', temperature: 0.1 } }),
        }),
      });
      if (!r.ok) return { data: null, provider: 'gemini', error: `${r.status} ${(await r.text()).slice(0, 200)}` };
      const d: any = await r.json();
      return { data: extractJson((d.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || '').join('')), provider: 'gemini' };
    }
    const token = gatewayToken();
    if (!token) return { data: null, provider: 'none', error: 'no AI credentials' };
    const r = await fetch(GATEWAY, {
      method: 'POST', signal: ctrl.signal,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: GATEWAY_MODEL,
        messages: [{ role: 'user', content: prompt + '\nRespond with JSON only.' }],
        max_tokens: 1500,
        ...(opts.search
          ? { tools: [{ type: 'vercel:perplexity_search', config: { max_results: 8 } }], tool_choice: 'required' }
          : { response_format: { type: 'json_object' }, temperature: 0.1 }),
      }),
    });
    if (!r.ok) return { data: null, provider: 'gateway', error: `${r.status} ${(await r.text()).slice(0, 300)}` };
    const d: any = await r.json();
    return { data: extractJson(String(d.choices?.[0]?.message?.content || '')), provider: 'gateway' };
  } catch (e: any) {
    return { data: null, provider: 'error', error: String(e?.message || e).slice(0, 200) };
  } finally { clearTimeout(t); }
}

/** Back-compat helper used by the assistant and price job. */
export async function askGeminiJson(prompt: string, opts: { search?: boolean; timeoutMs?: number } = {}) {
  const r = await askAiJson(prompt, opts);
  if (r.error) console.error('ai', r.provider, r.error);
  return r.data;
}
