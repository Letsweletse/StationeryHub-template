import { NextRequest, NextResponse } from 'next/server';
import { clean, ensureSchema, getSettings, q, SALES_WHATSAPP, sendWhatsApp } from '@/lib/hub';

export const dynamic = 'force-dynamic';

// Public directory: approved suppliers. Contact details only for paid listings that are current.
export async function GET() {
  try {
    await ensureSchema();
    const s = await getSettings();
    const rows = await q(`select s.id, s.name, s.country, s.city, s.categories, s.about, s.plan,
        (s.show_contact and (s.paid_until is null or s.paid_until >= current_date)) as contact_ok,
        s.phone, s.email, s.contact_person,
        (select count(*)::int from sh_items i where i.supplier_id = s.id and i.active) as items
      from sh_suppliers s where s.status = 'approved' order by (s.plan = 'listed') desc, s.name`);
    const suppliers = rows.map((r: any) => ({
      id: r.id, name: r.name, country: r.country, city: r.city, categories: r.categories, about: r.about, items: r.items,
      listed: r.plan === 'listed',
      contact: r.contact_ok ? { person: r.contact_person, phone: r.phone, email: r.email } : null,
    }));
    return NextResponse.json({ suppliers, listingFee: Number(s.listing_fee_bwp) || 300 });
  } catch (e) {
    console.error('suppliers GET', e);
    return NextResponse.json({ suppliers: [], listingFee: 300 }, { status: 503 });
  }
}

// Supplier sign-up with optional item list. Everything starts as pending until approved in admin.
export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const b = await req.json().catch(() => ({}));
    if (b.website) return NextResponse.json({ ok: true }); // honeypot
    const name = clean(b.name, 120); const phone = clean(b.phone, 40); const email = clean(b.email, 120);
    if (name.length < 2 || phone.replace(/\D/g, '').length < 7) return NextResponse.json({ error: 'Please give your business name and a valid phone number.' }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please check the email address.' }, { status: 400 });
    const plan = b.plan === 'listed' ? 'listed' : 'free';
    const dup = await q(`select id from sh_suppliers where regexp_replace(phone,'\\D','','g') = regexp_replace($1,'\\D','','g') limit 1`, [phone]);
    let supplierId: number;
    if (dup.length) supplierId = dup[0].id;
    else {
      const [row] = await q(`insert into sh_suppliers (name, contact_person, phone, email, country, city, categories, about, plan)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id`,
        [name, clean(b.contact_person, 80), phone, email, clean(b.country || 'Botswana', 60), clean(b.city, 60), clean(b.categories, 200), clean(b.about, 600), plan]);
      supplierId = row.id;
    }

    // Items: one per line, "name, code, price, min qty" (code/price/qty optional).
    const raw = String(b.items || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 300);
    let added = 0;
    for (const line of raw) {
      const parts = line.split(/\s*[,;\t|]\s*/);
      const itemName = clean(parts[0], 160); if (itemName.length < 2) continue;
      const code = clean(parts[1], 60) || null;
      const price = Number(String(parts[2] || '').replace(/[^0-9.]/g, '')) || null;
      const moq = Math.floor(Number(String(parts[3] || '').replace(/[^0-9]/g, ''))) || null;
      await q(`insert into sh_supplier_items (supplier_id, name, code, supplier_price, moq) values ($1,$2,$3,$4,$5)`, [supplierId, itemName, code, price, moq]);
      added++;
    }
    await sendWhatsApp(SALES_WHATSAPP, `🏭 New StationeryHub supplier${dup.length ? ' (existing, added items)' : ''}: ${name}\n📞 ${phone}${email ? `\n✉️ ${email}` : ''}\nPlan: ${plan === 'listed' ? 'Paid listing' : 'Free (orders via StationeryHub)'}\nItems submitted: ${added}\nReview at /admin/hub`);
    return NextResponse.json({ ok: true, items: added });
  } catch (e) {
    console.error('suppliers POST', e);
    return NextResponse.json({ error: 'Could not save. Please WhatsApp +267 75 560 140.' }, { status: 500 });
  }
}
