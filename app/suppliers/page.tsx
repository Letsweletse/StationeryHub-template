'use client';

import { FormEvent, useEffect, useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

type Supplier = { id: number; name: string; country: string; city: string | null; categories: string | null; about: string | null; items: number; listed: boolean; contact: { person: string | null; phone: string; email: string | null } | null };

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [fee, setFee] = useState(300);
  const [plan, setPlan] = useState<'free' | 'listed'>('free');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/hub/suppliers').then((r) => r.json()).then((d) => { setSuppliers(d.suppliers || []); setFee(d.listingFee || 300); }).catch(() => {});
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError('');
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch('/api/hub/suppliers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, plan }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not submit');
      setDone(`Thank you. We received your details${d.items ? ` and ${d.items} item(s)` : ''}. You are now on our supplier panel and will receive price requests and orders by WhatsApp and email. Products you listed go live after a quick check.`);
      e.currentTarget.reset();
    } catch (err: any) { setError(err.message); }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">Suppliers</p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-6xl">Sell through StationeryHub</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-black/60">Manufacturers, distributors and wholesalers in Botswana and abroad can list stationery, ink, toner, office furniture and technology. We bring the buyers: businesses, schools, clinics, government and international customers.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <button type="button" onClick={() => setPlan('free')} className={`border-2 p-5 text-left ${plan === 'free' ? 'border-[#c8481a] bg-white' : 'border-black/10 bg-white/60'}`}>
            <p className="text-xs font-black uppercase tracking-widest text-[#c8481a]">Free</p>
            <p className="mt-1 text-2xl font-black">Orders through StationeryHub</p>
            <p className="mt-2 text-sm leading-6 text-black/60">List your items at your supplier price. We sell to customers and place orders with you. Your contact details stay private.</p>
          </button>
          <button type="button" onClick={() => setPlan('listed')} className={`border-2 p-5 text-left ${plan === 'listed' ? 'border-[#c8481a] bg-white' : 'border-black/10 bg-white/60'}`}>
            <p className="text-xs font-black uppercase tracking-widest text-[#c8481a]">Featured listing · P{fee}/month</p>
            <p className="mt-1 text-2xl font-black">Customers contact you directly</p>
            <p className="mt-2 text-sm leading-6 text-black/60">Your business, phone and email shown in our supplier directory, plus everything in Free. Activated after payment.</p>
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <form onSubmit={submit} className="border border-black/10 bg-white p-5">
            <h2 className="text-xl font-black uppercase">Register as a supplier</h2>
            {done ? <p className="mt-4 bg-[#f0ede8] p-4 text-sm font-bold">{done}</p> : (
              <div className="mt-4 grid gap-3">
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input name="name" required placeholder="Business name *" className="border border-black/15 px-3 py-3 text-sm" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="contact_person" placeholder="Contact person" className="border border-black/15 px-3 py-3 text-sm" />
                  <input name="phone" required placeholder="Phone / WhatsApp (with country code) *" className="border border-black/15 px-3 py-3 text-sm" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <input name="email" type="email" placeholder="Email" className="border border-black/15 px-3 py-3 text-sm sm:col-span-1" />
                  <input name="country" defaultValue="Botswana" placeholder="Country" className="border border-black/15 px-3 py-3 text-sm" />
                  <input name="city" placeholder="City" className="border border-black/15 px-3 py-3 text-sm" />
                </div>
                <input name="categories" placeholder="What you supply, e.g. toner, paper, office chairs" className="border border-black/15 px-3 py-3 text-sm" />
                <textarea name="about" rows={2} placeholder="Short description of your business" className="border border-black/15 px-3 py-3 text-sm" />
                <label className="text-xs font-bold uppercase tracking-widest text-black/60">Your items (optional), one per line: name, code, your price (BWP), minimum qty
                  <textarea name="items" rows={6} placeholder={'HP 305 Black Ink Cartridge, 3YM61AE, 165, 10\nA4 Copy Paper 80gsm box, , 290, 5'} className="mt-1 w-full border border-black/15 px-3 py-3 font-mono text-xs normal-case tracking-normal text-black" />
                </label>
                {error && <p className="text-sm font-bold text-red-700">{error}</p>}
                <button disabled={busy} className="bg-[#c8481a] px-6 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60">{busy ? 'Sending…' : plan === 'listed' ? 'Apply for featured listing' : 'Register for free'}</button>
              </div>
            )}
          </form>

          <section>
            <h2 className="text-xl font-black uppercase">Supplier directory</h2>
            {suppliers.length === 0 ? <p className="mt-3 text-sm text-black/50">Approved suppliers will appear here.</p> : (
              <div className="mt-3 grid gap-3">
                {suppliers.map((s) => (
                  <div key={s.id} className="border border-black/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-black">{s.name}</p><p className="text-xs text-black/50">{[s.city, s.country].filter(Boolean).join(', ')}{s.items ? ` · ${s.items} items` : ''}</p></div>
                      {s.listed && <span className="bg-[#c8481a] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">Featured</span>}
                    </div>
                    {s.categories && <p className="mt-2 text-sm text-black/70">{s.categories}</p>}
                    {s.contact ? (
                      <p className="mt-2 text-sm font-bold">{s.contact.person ? `${s.contact.person} · ` : ''}<a href={`tel:${s.contact.phone}`} className="text-[#c8481a]">{s.contact.phone}</a>{s.contact.email ? <> · <a href={`mailto:${s.contact.email}`} className="text-[#c8481a]">{s.contact.email}</a></> : null}</p>
                    ) : (
                      <a href="/quote" className="mt-2 inline-block text-xs font-black uppercase tracking-widest text-[#c8481a]">Order via StationeryHub →</a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
