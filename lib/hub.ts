// StationeryHub catalogue, pricing, quotes and suppliers.
// Tables are created on first use, so no manual SQL step is needed.
import { Pool } from 'pg';
import crypto from 'crypto';
import { MARKET_ZAR, SEED_ITEMS } from './catalog-seed';
import { etaFor, type Area } from './eta';

let pool: Pool | null = null;
function db() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
    const url = process.env.DATABASE_URL;
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url) || /sslmode=disable/.test(url);
    pool = new Pool({ connectionString: url, ssl: local ? false : { rejectUnauthorized: false }, max: 3 });
  }
  return pool;
}
export async function q<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const r = await db().query(text, params);
  return r.rows as T[];
}

let ready: Promise<void> | null = null;
export function ensureSchema() {
  if (!ready) ready = migrate().catch((e) => { ready = null; throw e; });
  return ready;
}

async function migrate() {
  await q(`create table if not exists sh_settings (key text primary key, value text not null)`);
  await q(`create table if not exists sh_suppliers (
    id serial primary key, name text not null, contact_person text, phone text not null, email text,
    country text default 'Botswana', city text, categories text, about text,
    plan text not null default 'free', status text not null default 'pending', show_contact boolean not null default false,
    paid_until date, created_at timestamptz not null default now())`);
  await q(`create table if not exists sh_items (
    id serial primary key, code text, name text not null, brand text, category text,
    cost_price numeric(12,2), markup_pct numeric(6,2), fixed_price numeric(12,2),
    status text not null default 'Available', compat text, supplier_id int references sh_suppliers(id) on delete set null,
    active boolean not null default true, updated_at timestamptz not null default now())`);
  await q(`create unique index if not exists sh_items_code_uq on sh_items (lower(code)) where code is not null and code <> ''`);
  await q(`create table if not exists sh_supplier_items (
    id serial primary key, supplier_id int not null references sh_suppliers(id) on delete cascade,
    name text not null, code text, brand text, category text, supplier_price numeric(12,2), moq int,
    status text not null default 'pending', item_id int, created_at timestamptz not null default now())`);
  await q(`create table if not exists sh_quotes (
    id serial primary key, ref text unique not null, customer_name text, company text, phone text, email text,
    country text, currency text not null default 'BWP', rate numeric(12,6) not null default 1,
    items jsonb not null, unpriced jsonb, subtotal_bwp numeric(12,2) not null default 0, notes text,
    source text default 'web', status text not null default 'new', created_at timestamptz not null default now())`);
  await q(`create table if not exists sh_chat_log (
    id serial primary key, channel text, sender text, message text, matched int, created_at timestamptz not null default now())`);
  const defaults: Record<string, string> = {
    default_markup: '25', usd_per_bwp: '0.073', zar_per_bwp: '1.33', listing_fee_bwp: '300',
    quote_valid_days: '7', landing_pct: '12', beat_pct: '3', min_margin_pct: '5',
  };
  for (const [k, v] of Object.entries(defaults)) {
    await q(`insert into sh_settings (key, value) values ($1, $2) on conflict (key) do nothing`, [k, v]);
  }
  await q(`alter table sh_items add column if not exists market_zar numeric(12,2)`);
  await q(`alter table sh_items add column if not exists price_source text`);
  await q(`alter table sh_items add column if not exists price_checked_at timestamptz`);
  await q(`alter table sh_quotes add column if not exists delivery_area text`);
  await q(`alter table sh_quotes add column if not exists ordered_at timestamptz`);
  await q(`create table if not exists sh_competitor_prices (
    id serial primary key, code text not null, shop text not null, price_bwp numeric(12,2) not null, url text,
    checked_at timestamptz not null default now(), unique (code, shop))`);
  const [{ n }] = await q<{ n: number }>(`select count(*)::int as n from sh_items`);
  if (n === 0) {
    for (const it of SEED_ITEMS) {
      await q(`insert into sh_items (code, name, brand, category, fixed_price) values ($1,$2,$3,$4,$5) on conflict do nothing`,
        [it.code, it.name, it.brand, it.category, it.fixed ?? null]);
    }
  }
  // One-off: price the catalogue from researched South African market prices (only items with no price yet).
  const done = await q(`select 1 from sh_settings where key = 'market_seed_v1'`);
  if (!done.length) {
    const st = Object.fromEntries((await q<{ key: string; value: string }>(`select key, value from sh_settings`)).map((r) => [r.key, r.value]));
    for (const [code, zar] of Object.entries(MARKET_ZAR)) {
      await q(`update sh_items set market_zar = $2, cost_price = $3, price_source = 'market_za', price_checked_at = now(), updated_at = now()
        where lower(code) = lower($1) and cost_price is null and fixed_price is null`, [code, zar, landedCost(zar, st)]);
    }
    await q(`insert into sh_settings (key, value) values ('market_seed_v1', now()::text) on conflict (key) do nothing`);
  }
  // v2: local competitor prices (Home Corp Botswana, 27 Oct 2026) and competitive pricing defaults.
  const v2 = await q(`select 1 from sh_settings where key = 'market_seed_v2'`);
  if (!v2.length) {
    for (const [code, shop, price, url] of COMPETITOR_SEED) {
      await q(`insert into sh_competitor_prices (code, shop, price_bwp, url) values ($1,$2,$3,$4) on conflict (code, shop) do update set price_bwp = excluded.price_bwp, url = excluded.url, checked_at = now()`, [code, shop, price, url]);
    }
    await q(`update sh_settings set value = '5' where key = 'landing_pct'`);
    await q(`update sh_settings set value = '20' where key = 'default_markup' and value = '25'`);
    // Old-site fixed prices that local competitors now beat move to automatic pricing.
    await q(`update sh_items set fixed_price = null, market_zar = coalesce(market_zar, $2), price_source = 'market_za' where lower(code) = lower($1) and fixed_price is not null`, ['H6ZD21AE', 130]);
    await q(`update sh_items set fixed_price = null, market_zar = coalesce(market_zar, $2), price_source = 'market_za' where lower(code) = lower($1) and fixed_price is not null`, ['HP4K0W1PE', 500]);
    const st = Object.fromEntries((await q<{ key: string; value: string }>(`select key, value from sh_settings`)).map((r) => [r.key, r.value]));
    const zpb = Number(st.zar_per_bwp) || 1.33; const landing = Number(st.landing_pct) || 0;
    await q(`update sh_items set cost_price = round((market_zar / $1::numeric) * (1 + $2::numeric / 100), 2), updated_at = now() where market_zar is not null and price_source like 'market%'`, [zpb, landing]);
    await q(`insert into sh_settings (key, value) values ('market_seed_v2', now()::text) on conflict (key) do nothing`);
  }
}

const COMPETITOR_SEED: [string, string, number, string][] = [
  ['H6ZD21AE', 'Home Corp', 109, 'https://www.homecorp.co.bw/product/hp-47-black-original-cartridge-6zd21a-840'],
  ['HP4K0V7PE', 'Home Corp', 239, 'https://www.homecorp.co.bw/product/hp-925-magenta-original-ink-cartridge-4k0v7pe-829'],
  ['HP4K0W1PE', 'Home Corp', 459, 'https://www.homecorp.co.bw/product/hp-925e-evomore-magenta-original-ink-cartridge-4k0w1pe-833'],
  ['HP4K0W3PE', 'Home Corp', 949, 'https://www.homecorp.co.bw/electronics/printers-and-ink/ink'],
];

/** Lowest known local competitor price per item code (lower-cased). */
export async function competitorMins(): Promise<Map<string, number>> {
  const rows = await q<{ code: string; p: string }>(`select lower(code) as code, min(price_bwp) as p from sh_competitor_prices where checked_at > now() - interval '60 days' group by lower(code)`);
  return new Map(rows.map((r) => [r.code, Number(r.p)]));
}

/** Landed cost in Pula for an item bought at a South African retail price. */
export function landedCost(zar: number, s: Record<string, string>) {
  const zarPerBwp = Number(s.zar_per_bwp) || 1.33;
  const landing = Number(s.landing_pct ?? 12) || 0;
  return Math.round((zar / zarPerBwp) * (1 + landing / 100) * 100) / 100;
}

export async function getSettings(): Promise<Record<string, string>> {
  await ensureSchema();
  const rows = await q<{ key: string; value: string }>(`select key, value from sh_settings`);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export type Item = {
  id: number; code: string | null; name: string; brand: string | null; category: string | null;
  cost_price: string | null; markup_pct: string | null; fixed_price: string | null; status: string;
  compat: string | null; supplier_id: number | null; active: boolean; price_source?: string | null; market_zar?: string | null;
};

export type PriceCtx = { settings?: Record<string, string>; comp?: Map<string, number> };

export function sellingPrice(it: Pick<Item, 'cost_price' | 'markup_pct' | 'fixed_price'> & { code?: string | null; price_source?: string | null }, defaultMarkup: number, ctx: PriceCtx = {}): number | null {
  if (it.fixed_price != null && Number(it.fixed_price) > 0) return round(Number(it.fixed_price));
  if (it.cost_price != null && Number(it.cost_price) > 0) {
    const cost = Number(it.cost_price);
    const m = it.markup_pct != null ? Number(it.markup_pct) : defaultMarkup;
    // Round up to the nearest P5 so prices look clean.
    let price = Math.ceil((cost * (1 + m / 100)) / 5) * 5;
    // Beat the cheapest local competitor, but never below cost + minimum margin.
    const rival = it.code ? ctx.comp?.get(it.code.toLowerCase()) : undefined;
    if (rival && (it.price_source || '').startsWith('market') && it.markup_pct == null) {
      const beat = Number(ctx.settings?.beat_pct ?? 3) / 100;
      const floor = Math.ceil((cost * (1 + Number(ctx.settings?.min_margin_pct ?? 5) / 100)) / 5) * 5;
      const target = Math.floor((rival * (1 - beat)) / 5) * 5;
      if (target < price) price = Math.max(target, floor);
    }
    return price;
  }
  return null;
}
const round = (n: number) => Math.round(n * 100) / 100;

export type PublicItem = { id: number; code: string | null; name: string; brand: string | null; category: string | null; status: string; price: number | null; compat: string | null; eta: string };

export async function publicCatalogue(area: Area = 'Gaborone'): Promise<PublicItem[]> {
  const s = await getSettings();
  const dm = Number(s.default_markup) || 25;
  const rows = await q<Item>(`select * from sh_items where active order by brand nulls last, category, name`);
  const ctx = { settings: s, comp: await competitorMins() };
  return rows.map((r) => ({ id: r.id, code: r.code, name: r.name, brand: r.brand, category: r.category, status: r.status, price: sellingPrice(r, dm, ctx), compat: r.compat, eta: etaFor(r.status, area).label }));
}

// ---------- search (used by the chat assistant and WhatsApp) ----------
const STOP = new Set(['how', 'much', 'is', 'the', 'a', 'an', 'for', 'of', 'price', 'prices', 'cost', 'do', 'you', 'have', 'i', 'need', 'want', 'please', 'pls', 'my', 'me', 'what', 'whats', 'hi', 'hello', 'good', 'morning', 'afternoon', 'evening', 'and', 'in', 'stock', 'available', 'cartridge', 'cartridges', 'ink', 'toner', 'can', 'get', 'quote', 'printer', 'uses', 'use', 'which', 'one', 'with', 'are', 'there', 'any', 'on']);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function searchItems(items: PublicItem[], text: string, limit = 6): PublicItem[] {
  const t = norm(text);
  if (!t) return [];
  const tokens = t.split(' ').filter((w) => w && !STOP.has(w));
  if (!tokens.length) return [];
  const colourWords = ['black', 'cyan', 'magenta', 'yellow', 'colour', 'color', 'tri'];
  const scored = items.map((it) => {
    const hay = norm([it.name, it.code, it.brand, it.category, it.compat].filter(Boolean).join(' '));
    const hayCompact = hay.replace(/ /g, '');
    let score = 0; let numHit = false;
    for (const w of tokens) {
      const isNum = /\d/.test(w);
      if (new RegExp(`(^| )${w}( |$)`).test(hay)) { score += isNum ? 5 : colourWords.includes(w) ? 2 : 2; if (isNum) numHit = true; }
      else if (w.length >= 3 && hayCompact.includes(w)) { score += isNum ? 4 : 1; if (isNum) numHit = true; }
    }
    // Codes typed without spaces, e.g. "crg067" or "lc3719".
    const compactQ = tokens.join('');
    if (compactQ.length >= 4 && hayCompact.includes(compactQ)) { score += 6; numHit = true; }
    const hasNumQuery = tokens.some((w) => /\d/.test(w));
    if (hasNumQuery && !numHit) score = 0;
    return { it, score };
  }).filter((x) => x.score > 0);
  scored.sort((a, b) => b.score - a.score || (a.it.price == null ? 1 : 0) - (b.it.price == null ? 1 : 0));
  const top = scored[0]?.score ?? 0;
  return scored.filter((x) => x.score >= Math.max(2, top - 3)).slice(0, limit).map((x) => x.it);
}

export const money = (n: number, cur = 'BWP') =>
  cur === 'BWP' ? `P${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${cur === 'USD' ? 'US$' : 'R'}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function newRef() {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  return `SH-${ymd}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

// ---------- admin auth (cookie holds an HMAC of the ADMIN_KEY) ----------
export function adminToken() {
  const key = process.env.ADMIN_KEY;
  if (!key) return null;
  return crypto.createHmac('sha256', key).update('stationeryhub-admin').digest('hex');
}
export function isAdminCookie(value: string | undefined) {
  const t = adminToken();
  if (!t || !value || value.length !== t.length) return false;
  return crypto.timingSafeEqual(Buffer.from(value), Buffer.from(t));
}
export function checkAdminKey(input: string) {
  const key = process.env.ADMIN_KEY;
  if (!key || !input || input.length !== key.length) return false;
  return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(key));
}

// ---------- notifications ----------
const digits = (v: string) => v.replace(/[^0-9]/g, '');
export async function sendWhatsApp(to: string, body: string) {
  const id = process.env.ULTRAMSG_INSTANCE_ID; const token = process.env.ULTRAMSG_TOKEN;
  if (!id || !token) return { skipped: true };
  try {
    const r = await fetch(`https://api.ultramsg.com/${id}/messages/chat`, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token, to: digits(to), body: body.slice(0, 3500), priority: '10' }),
    });
    return { ok: r.ok };
  } catch { return { ok: false }; }
}
export const SALES_WHATSAPP = process.env.SALES_WHATSAPP || '26775560140';

export async function sendEmail(to: string, subject: string, html: string, text: string, opts: { from?: string; replyTo?: string } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return { skipped: true };
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: opts.from || process.env.QUOTE_FROM || 'StationeryHub <sales@stationeryhub.co.bw>', to: [to], reply_to: opts.replyTo || 'sales@stationeryhub.co.bw', subject, html, text }),
    });
    return { ok: r.ok, status: r.status };
  } catch { return { ok: false }; }
}

export const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const clean = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max);

// ---------- signed quote links ----------
function linkSecret() { return process.env.QUOTE_LINK_SECRET || process.env.DATABASE_URL || 'stationeryhub'; }
export function quoteSig(ref: string) {
  return crypto.createHmac('sha256', linkSecret()).update(`quote:${ref}`).digest('base64url').slice(0, 16);
}
export function quoteUrl(ref: string) {
  const base = process.env.SITE_URL || 'https://www.stationeryhub.co.bw';
  return `${base}/q/${encodeURIComponent(ref)}?s=${quoteSig(ref)}`;
}
