import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { autoPriceQuote, ensureFlowSchema, requestSupplierPrices } from '@/lib/flow';
import { etaFor, branchFor, AREAS } from '@/lib/eta';
import { competitorMins, clean, ensureSchema, esc, getSettings, money, newRef, q, quoteUrl, SALES_WHATSAPP, sellingPrice, sendEmail, sendWhatsApp, type Item } from '@/lib/hub';

export const dynamic = 'force-dynamic';

const CURRENCIES = ['BWP', 'USD', 'ZAR'] as const;

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const b = await req.json().catch(() => ({}));
    const name = clean(b.name, 80); const phone = clean(b.phone, 40); const email = clean(b.email, 120);
    const company = clean(b.company, 120); const country = clean(b.country || 'Botswana', 60);
    const notes = clean(b.notes, 1200);
    const area = (AREAS as readonly string[]).includes(b.area) ? b.area : (country.toLowerCase() === 'botswana' ? 'Gaborone' : 'International');
    const currency = (CURRENCIES as readonly string[]).includes(b.currency) ? b.currency : 'BWP';
    if (!name || (!phone && !email)) return NextResponse.json({ error: 'Please give your name and a phone number or email.' }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please check your email address.' }, { status: 400 });

    const lines: { id: number; qty: number }[] = Array.isArray(b.items) ? b.items.slice(0, 80)
      .map((x: any) => ({ id: Number(x.id), qty: Math.max(1, Math.min(10000, Math.floor(Number(x.qty) || 1))) }))
      .filter((x: any) => Number.isInteger(x.id) && x.id > 0) : [];
    if (!lines.length && !notes) return NextResponse.json({ error: 'Add at least one item, or describe what you need.' }, { status: 400 });

    const s = await getSettings();
    const dm = Number(s.default_markup) || 25;
    const rate = currency === 'BWP' ? 1 : currency === 'USD' ? Number(s.usd_per_bwp) || 0.073 : Number(s.zar_per_bwp) || 1.33;
    const ids = lines.map((l) => l.id);
    const rows = ids.length ? await q<Item>(`select * from sh_items where id = any($1::int[]) and active`, [ids]) : [];
    const byId = new Map(rows.map((r) => [r.id, r]));
    const ctx = { settings: s, comp: await competitorMins() };

    const priced: any[] = []; const unpriced: any[] = [];
    for (const l of lines) {
      const it = byId.get(l.id); if (!it) continue;
      const unit = sellingPrice(it, dm, ctx);
      const eta = etaFor(it.status, area);
      const base = { id: it.id, code: it.code, name: it.name, qty: l.qty, eta: eta.label, eta_max: eta.max };
      if (unit == null) unpriced.push(base);
      else priced.push({ ...base, unit_bwp: unit, total_bwp: Math.round(unit * l.qty * 100) / 100 });
    }
    const subtotal = Math.round(priced.reduce((a, x) => a + x.total_bwp, 0) * 100) / 100;
    const ref = newRef();
    await q(`insert into sh_quotes (ref, customer_name, company, phone, email, country, currency, rate, items, unpriced, subtotal_bwp, notes, source, delivery_area)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'web',$13)`,
      [ref, name, company, phone, email, country, currency, rate, JSON.stringify(priced), JSON.stringify(unpriced), subtotal, notes, area]);
    const maxDays = Math.max(0, ...priced.concat(unpriced).map((x: any) => x.eta_max ?? 0));
    const etaAll = maxDays <= 1 ? 'same or next working day' : `within ${maxDays} working days`;
    const branch = branchFor(area);

    const url = quoteUrl(ref);
    const fx = (n: number) => money(Math.round(n * rate * 100) / 100, currency);
    const intl = country.toLowerCase() !== 'botswana';

    // Tell sales straight away.
    const salesMsg = [
      `🧾 New StationeryHub quote ${ref}`,
      `${name}${company ? ` (${company})` : ''} · ${country} · deliver to ${area}`,
      phone ? `📞 ${phone}` : '', email ? `✉️ ${email}` : '',
      ...priced.map((x) => `• ${x.qty} × ${x.name} = ${money(x.total_bwp)}`),
      ...unpriced.map((x) => `• ${x.qty} × ${x.name} — NEEDS PRICE`),
      notes ? `Notes: ${notes.slice(0, 400)}` : '',
      `Subtotal: ${money(subtotal)}${currency !== 'BWP' ? ` (${fx(subtotal)})` : ''}`,
      url,
    ].filter(Boolean).join('\n');
    await sendWhatsApp(SALES_WHATSAPP, salesMsg);
    if (branch.wa !== SALES_WHATSAPP) await sendWhatsApp(branch.wa, salesMsg);

    if (email) {
      const rowsHtml = priced.map((x) => `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee">${esc(x.name)}<br><span style="color:#888;font-size:12px">${esc(x.code || '')}</span></td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center">${x.qty}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">${fx(x.unit_bwp)}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">${fx(x.total_bwp)}</td></tr>`).join('')
        + unpriced.map((x) => `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee">${esc(x.name)}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center">${x.qty}</td><td colspan="2" style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;color:#c8481a">Price to follow</td></tr>`).join('');
      const html = `<div style="font-family:Arial,sans-serif;color:#0e0e0e;max-width:640px"><h2 style="margin:0">Stationery<span style="color:#c8481a">Hub</span> quotation ${esc(ref)}</h2>
<p>Dear ${esc(name)}, thank you for your request. Your quotation is below.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr style="background:#0e0e0e;color:#fff"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px">Qty</th><th style="padding:8px;text-align:right">Unit</th><th style="padding:8px;text-align:right">Total</th></tr></thead><tbody>${rowsHtml}</tbody>
<tfoot><tr><td colspan="3" style="padding:8px;text-align:right;font-weight:bold">Subtotal</td><td style="padding:8px;text-align:right;font-weight:bold">${fx(subtotal)}</td></tr></tfoot></table>
<p style="font-size:14px"><strong>Estimated delivery to ${esc(area)}:</strong> ${etaAll} after order confirmation. Your branch: ${branch.town}, ${branch.phone}.</p>
${intl ? '<p style="font-size:13px;color:#555">International order: shipping and any duties are quoted separately once we confirm your delivery address.</p>' : '<p style="font-size:13px;color:#555">Delivery within Gaborone can be arranged; we will confirm delivery cost with you.</p>'}
${unpriced.length ? '<p style="font-size:13px;color:#555">Items marked "price to follow" will be confirmed by our sales team shortly.</p>' : ''}
<p><a href="${url}" style="background:#c8481a;color:#fff;padding:10px 16px;text-decoration:none;font-weight:bold">View / print your quotation</a></p>
<p style="font-size:12px;color:#777">Quotation valid for ${Number(s.quote_valid_days) || 7} days, subject to stock availability.${currency !== 'BWP' ? ' Foreign-currency amounts are indicative; invoices are issued in Botswana Pula.' : ''}<br>StationeryHub · sales@stationeryhub.co.bw · WhatsApp +267 75 560 140</p></div>`;
      const text = `StationeryHub quotation ${ref}\nDelivery to ${area}: ${etaAll}\n\n${priced.map((x) => `${x.qty} x ${x.name}: ${fx(x.total_bwp)}`).join('\n')}${unpriced.map((x) => `\n${x.qty} x ${x.name}: price to follow`).join('')}\n\nSubtotal: ${fx(subtotal)}\n\nView: ${url}`;
      await sendEmail(email, `Your StationeryHub quotation ${ref}`, html, text);
    }

    if (unpriced.length || notes.length >= 4) {
      waitUntil((async () => {
        try { await ensureFlowSchema(); await autoPriceQuote(ref); await requestSupplierPrices(ref); } catch (e) { console.error('flow', e); }
      })());
    }
    return NextResponse.json({ ref, url, subtotal_bwp: subtotal, currency, rate, priced, unpriced, area, eta: etaAll, branch: { town: branch.town, phone: branch.phone, wa: branch.wa } });
  } catch (e) {
    console.error('quote', e);
    return NextResponse.json({ error: 'Could not create the quotation. Please WhatsApp +267 75 560 140.' }, { status: 500 });
  }
}
