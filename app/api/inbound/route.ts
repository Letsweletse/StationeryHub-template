// Forwards mail received at @stationeryhub.co.bw (Resend receiving) to Gmail.
// Resend calls this webhook on "email.received" / "inbox.email.received".
// Security: the payload is never trusted. Only the email ID is taken from it, and the
// message is then fetched from the Resend API with our key, so a forged call can at most
// re-forward a real email that was already received.
//
// Env (Vercel): RESEND_INBOUND_KEY (full-access Resend key; falls back to RESEND_API_KEY),
// optional FORWARD_TO (comma-separated, default blimdawoo@gmail.com), optional FORWARD_FROM.

export const runtime = "edge";
export const dynamic = "force-dynamic";

const API = "https://api.resend.com";
const FORWARD_TO = (process.env.FORWARD_TO || "blimdawoo@gmail.com").split(",").map((s) => s.trim()).filter(Boolean);
const FORWARD_FROM = process.env.FORWARD_FROM || "StationeryHub Inbox <inbox@stationeryhub.co.bw>";
const MAX_ATTACH_BYTES = 30 * 1024 * 1024;

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x: any) => (typeof x === "string" ? x : x?.email || x?.address || "")).filter(Boolean)
    : typeof v === "string" && v ? [v] : [];

const addr = (v: unknown) => {
  const s = typeof v === "string" ? v : (v as any)?.email || (v as any)?.address || "";
  const m = /<([^>]+)>/.exec(s);
  return (m ? m[1] : s).trim();
};

async function get(key: string, path: string) {
  const r = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${key}` } });
  return r.ok ? r.json() : null;
}

export async function POST(req: Request): Promise<Response> {
  const key = process.env.RESEND_INBOUND_KEY || process.env.RESEND_API_KEY;
  if (!key) return json({ error: "not_configured" }, 503);

  let evt: any;
  try { evt = await req.json(); } catch { return json({ error: "bad json" }, 400); }
  const d = evt?.data ?? {};
  const id: string | undefined = d.email_id || d.email?.id || d.id;
  if (!id || typeof id !== "string" || id.length > 100) return json({ skipped: "no email id" });

  const email: any = await get(key, `/emails/receiving/${encodeURIComponent(id)}`);
  if (!email) return json({ skipped: "email not found" }, 404);

  const from = addr(email.from);
  // Never forward our own outgoing mail back in (prevents loops).
  if (/@stationeryhub\.co\.bw$/i.test(from) && /^(noreply|inbox)@/i.test(from)) return json({ skipped: "own mail" });

  const to = list(email.to).join(", ");
  const cc = list(email.cc).join(", ");
  const subject = String(email.subject || "(no subject)");

  // Attachments: Resend gives short-lived download URLs; pass them through as paths.
  const attachments: { filename: string; path: string }[] = [];
  const att: any = await get(key, `/emails/receiving/${encodeURIComponent(id)}/attachments`);
  let total = 0;
  for (const a of att?.data || []) {
    total += Number(a.size) || 0;
    if (a.download_url && total <= MAX_ATTACH_BYTES) attachments.push({ filename: a.filename || "attachment", path: a.download_url });
  }

  const banner = `<div style="font-family:Arial,sans-serif;font-size:13px;color:#334155;background:#EEF4FB;border:1px solid #D6E4F5;border-radius:8px;padding:10px 12px;margin:0 0 14px">
<strong>Received at ${esc(to || "stationeryhub.co.bw")}</strong><br>From: ${esc(email.from)}${cc ? `<br>Cc: ${esc(cc)}` : ""}<br>
Press Reply to answer the sender directly.</div>`;
  const html = email.html ? banner + email.html : banner + `<pre style="white-space:pre-wrap;font-family:inherit">${esc(email.text || "")}</pre>`;
  const text = `Received at ${to}\nFrom: ${email.from}${cc ? `\nCc: ${cc}` : ""}\n\n${email.text || ""}`;

  const r = await fetch(`${API}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FORWARD_FROM,
      to: FORWARD_TO,
      reply_to: from || undefined,
      subject: `[${(list(email.to)[0] || "sales@stationeryhub.co.bw").toLowerCase()}] ${subject}`.slice(0, 990),
      html,
      text,
      ...(attachments.length ? { attachments } : {}),
    }),
  });
  const body: any = await r.json().catch(() => ({}));
  if (!r.ok) {
    console.error("Forward failed", r.status, body?.message);
    return json({ error: "forward_failed", status: r.status }, 502);
  }
  return json({ forwarded: true, id: body?.id });
}
