// Optional AI layer (Google Gemini). Everything works without it; with GEMINI_API_KEY set,
// the assistant understands free-text questions and the daily job refreshes market prices.
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export const aiEnabled = () => !!process.env.GEMINI_API_KEY;

function extractJson(text: string): any {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.search(/[[{]/);
  if (start < 0) return null;
  const end = Math.max(raw.lastIndexOf('}'), raw.lastIndexOf(']'));
  try { return JSON.parse(raw.slice(start, end + 1)); } catch { return null; }
}

/** Ask Gemini for JSON. With search=true the model can use Google Search (grounding). */
export async function askGeminiJson(prompt: string, opts: { search?: boolean; timeoutMs?: number } = {}): Promise<any> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 25000);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      signal: ctrl.signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        ...(opts.search ? { tools: [{ google_search: {} }] } : { generationConfig: { responseMimeType: 'application/json', temperature: 0.1 } }),
      }),
    });
    if (!r.ok) { console.error('gemini', r.status, (await r.text()).slice(0, 300)); return null; }
    const d: any = await r.json();
    const text = (d.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || '').join('');
    return extractJson(text);
  } catch (e) {
    console.error('gemini error', e);
    return null;
  } finally { clearTimeout(t); }
}
