'use client';

import { FormEvent, useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter, { CONTACTS } from '../components/SiteFooter';
import { BRANCHES } from '@/lib/eta';

export default function ContactPage() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError('');
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch('/api/hub/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not send');
      setDone(true);
    } catch (err: any) { setError(err.message); }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">Contact</p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-6xl">Talk to StationeryHub</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="grid content-start gap-3">
            {BRANCHES.map((b) => (
              <div key={b.town} className="border border-black/10 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#c8481a]">{b.role}</p><p className="text-xl font-black uppercase">{b.town}</p></div>
                  <a href={`https://wa.me/${b.wa}`} target="_blank" rel="noopener noreferrer" className="bg-[#25d366] px-3 py-2 text-xs font-black uppercase tracking-widest text-black">WhatsApp</a>
                </div>
                <a href={`tel:${b.tel}`} className="mt-1 block font-bold">{b.phone}</a>
                <p className="mt-1 text-xs text-black/50">Serves {b.serves}</p>
              </div>
            ))}
            {CONTACTS.emails.map((e) => (
              <a key={e.email} href={`mailto:${e.email}`} className="block border border-black/10 bg-white p-4 hover:border-[#c8481a]">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#c8481a]">{e.label}</span>
                <span className="break-all font-bold">{e.email}</span>
              </a>
            ))}
            <p className="text-sm text-black/60">Mon–Fri 8:00–17:00 · instant quotes online 24/7</p>
          </section>

          <form onSubmit={submit} className="border border-black/10 bg-white p-5">
            <h2 className="text-xl font-black uppercase">Send us a message</h2>
            {done ? <p className="mt-4 bg-[#f0ede8] p-4 text-sm font-bold">Thank you, your message is with our team. We usually reply within a working hour.</p> : (
              <div className="mt-4 grid gap-3">
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <select name="topic" className="border border-black/15 px-3 py-3 text-sm">
                  <option value="sales">Prices, quotes and products</option>
                  <option value="operations">An order or delivery</option>
                  <option value="management">Partnerships and management</option>
                </select>
                <input name="name" required placeholder="Your name *" className="border border-black/15 px-3 py-3 text-sm" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="phone" placeholder="Phone / WhatsApp" className="border border-black/15 px-3 py-3 text-sm" />
                  <input name="email" type="email" placeholder="Email" className="border border-black/15 px-3 py-3 text-sm" />
                </div>
                <textarea name="message" required rows={5} placeholder="How can we help?" className="border border-black/15 px-3 py-3 text-sm" />
                {error && <p className="text-sm font-bold text-red-700">{error}</p>}
                <button disabled={busy} className="bg-[#c8481a] px-6 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60">{busy ? 'Sending…' : 'Send message'}</button>
              </div>
            )}
          </form>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
