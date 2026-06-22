'use client';

import { FormEvent, useState } from 'react';

type LeadCaptureButtonProps = {
  productName: string;
  price?: string;
  quantity?: number;
  buttonText?: string;
  className?: string;
};

export default function LeadCaptureButton({
  productName,
  price,
  quantity = 1,
  buttonText = 'Order',
  className = 'inline-flex items-center justify-center gap-2 bg-[#0e0e0e] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#f0ede8] transition hover:bg-[#c8481a]',
}: LeadCaptureButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get('fullName') || ''),
      companyName: String(form.get('companyName') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      location: String(form.get('location') || ''),
      productName,
      quantity,
      message: `Website order inquiry for ${productName}${price ? ` (${price})` : ''}`,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.whatsappUrl) {
        throw new Error(data.error || 'Could not save lead.');
      }

      window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white p-6 text-black shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c8481a]">StationeryHub order</p>
                <h3 className="mt-2 text-2xl font-black leading-tight">{productName}</h3>
                {price && <p className="mt-1 text-sm font-bold text-black/55">{price}</p>}
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-2xl font-black text-black/40 hover:text-black">×</button>
            </div>

            <form onSubmit={submitLead} className="mt-6 grid gap-3">
              <input name="fullName" required placeholder="Your name" className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="phone" required placeholder="Phone / WhatsApp e.g. +267..." className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="companyName" placeholder="Company / school / office (optional)" className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="location" placeholder="Location e.g. Gaborone" className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />

              {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

              <button disabled={loading} className="mt-2 bg-[#0e0e0e] px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#c8481a] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Saving...' : 'Save lead & open WhatsApp'}
              </button>
              <p className="text-xs leading-5 text-black/45">Your details are saved so StationeryHub can follow up even if WhatsApp is closed.</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
