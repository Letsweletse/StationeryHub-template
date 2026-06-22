'use client';

import { FormEvent, useState } from 'react';

export default function QuotePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get('fullName') || ''),
      companyName: String(form.get('companyName') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      location: String(form.get('location') || ''),
      requestedItems: String(form.get('requestedItems') || ''),
    };

    const response = await fetch('/api/quote-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const text = encodeURIComponent(`Hello StationeryHub, I submitted a quote request. Name: ${payload.fullName}. Company: ${payload.companyName}. Phone: ${payload.phone}. Items: ${payload.requestedItems.slice(0, 200)}`);
      window.open(`https://wa.me/26775560140?text=${text}`, '_blank', 'noopener,noreferrer');
      setMessage('Quote request saved. WhatsApp opened so sales can continue with you.');
      event.currentTarget.reset();
    } else {
      setMessage('Could not save quote request. Please WhatsApp +267 75 560 140.');
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f0ede8] px-5 py-10 text-[#0e0e0e] lg:px-10">
      <div className="mx-auto max-w-3xl bg-white p-6 shadow-2xl md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">StationeryHub corporate quote</p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-none md:text-6xl">Request a quote</h1>
        <p className="mt-5 text-black/60">For schools, offices, clinics, companies and bulk supply. The request is saved, sales is alerted, and you can continue on WhatsApp.</p>

        <form onSubmit={submitQuote} className="mt-8 grid gap-4">
          <input name="fullName" required placeholder="Your name" className="border border-black/15 px-4 py-3 outline-none focus:border-[#c8481a]" />
          <input name="companyName" placeholder="Company / school / office" className="border border-black/15 px-4 py-3 outline-none focus:border-[#c8481a]" />
          <input name="phone" required placeholder="Phone / WhatsApp" className="border border-black/15 px-4 py-3 outline-none focus:border-[#c8481a]" />
          <input name="email" type="email" placeholder="Email" className="border border-black/15 px-4 py-3 outline-none focus:border-[#c8481a]" />
          <input name="location" placeholder="Location e.g. Gaborone" className="border border-black/15 px-4 py-3 outline-none focus:border-[#c8481a]" />
          <textarea name="requestedItems" required rows={6} placeholder="List items needed: cartridges, paper, furniture, laptops, quantities, printer model, etc." className="border border-black/15 px-4 py-3 outline-none focus:border-[#c8481a]" />
          <button disabled={loading} className="bg-[#0e0e0e] px-6 py-4 font-black uppercase tracking-widest text-white transition hover:bg-[#c8481a] disabled:opacity-60">
            {loading ? 'Saving...' : 'Submit quote request'}
          </button>
          {message && <p className="font-bold text-[#c8481a]">{message}</p>}
        </form>

        <div className="mt-8 border-t border-black/10 pt-5 text-sm text-black/60">
          <p>Sales: <a className="font-bold text-[#c8481a]" href="mailto:sales@stationeryhub.co.bw">sales@stationeryhub.co.bw</a></p>
          <p>WhatsApp: +267 75 560 140 / +267 72 347 712</p>
        </div>
      </div>
    </main>
  );
}
