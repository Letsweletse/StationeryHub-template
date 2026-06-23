'use client';

import { FormEvent, useMemo, useState } from 'react';

type RequestType = 'Ink / Toner' | 'Office Stationery' | 'Office Furniture' | 'Bulk Quote' | 'Price List' | 'Talk to Sales';

type ReceptionistResponse = {
  ok?: boolean;
  whatsappUrl?: string;
  error?: string;
};

const quickOptions: RequestType[] = [
  'Ink / Toner',
  'Office Stationery',
  'Office Furniture',
  'Bulk Quote',
  'Price List',
  'Talk to Sales',
];

const salesWhatsApp = '26775560140';

function cleanWhatsAppMessage(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

function keywordReply(text: string) {
  const value = text.toLowerCase();

  if (['cartridge', 'toner', 'ink', 'printer'].some((word) => value.includes(word))) {
    return 'Please share the cartridge code or printer model.';
  }

  if (['chair', 'desk', 'furniture'].some((word) => value.includes(word))) {
    return 'Please share the quantity and preferred style if available.';
  }

  if (['quote', 'bulk'].some((word) => value.includes(word))) {
    return 'Please share your list and company/school name.';
  }

  return 'Share a few details below and we’ll help you get a quote.';
}

function speak(message: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export default function VirtualReceptionist() {
  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>('Ink / Toner');
  const [needText, setNeedText] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('Choose a quick option or tell us what you need.');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);

  const guidance = useMemo(() => keywordReply(`${requestType} ${needText}`), [requestType, needText]);

  function openPanel() {
    setOpen(true);
    if (audioEnabled) {
      speak('Welcome to StationeryHub. Tell us what you need and we will help you get a quote.');
    }
  }

  function chooseOption(option: RequestType) {
    const nextMessage = option === 'Bulk Quote'
      ? 'Please share your list and company/school name.'
      : keywordReply(option);

    setRequestType(option);
    setAssistantMessage(nextMessage);
    setStatus('');

    if (audioEnabled) {
      speak(nextMessage);
    }
  }

  function updateNeed(value: string) {
    const nextMessage = keywordReply(value);
    setNeedText(value);
    setAssistantMessage(nextMessage);
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    const form = new FormData(event.currentTarget);
    const fullName = String(form.get('fullName') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const companyName = String(form.get('companyName') || '').trim();
    const location = String(form.get('location') || '').trim();
    const email = String(form.get('email') || '').trim();
    const requestDetails = needText.trim();

    const customerMessage = `Hello StationeryHub, I need help with ${requestType}. Name: ${fullName}. Phone: ${phone}. Company/School/Office: ${companyName}. Location: ${location}. Details: ${requestDetails}`;
    const endpoint = requestType === 'Bulk Quote' ? '/api/quote-request' : '/api/leads';
    const payload = requestType === 'Bulk Quote'
      ? {
          fullName,
          companyName,
          phone,
          email,
          location,
          requestedItems: requestDetails || requestType,
        }
      : {
          fullName,
          companyName,
          phone,
          email,
          location,
          productName: requestType,
          message: requestDetails || `Customer requested help with ${requestType}.`,
          quantity: 1,
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as ReceptionistResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Could not prepare your request.');
      }

      const nextMessage = 'Thanks, we’ve prepared your request. Continue to WhatsApp so our sales team can assist.';
      setStatus(nextMessage);
      setAssistantMessage('A StationeryHub sales assistant will follow up.');

      if (audioEnabled) {
        speak(nextMessage);
      }

      window.open(data.whatsappUrl || cleanWhatsAppMessage(customerMessage), '_blank', 'noopener,noreferrer');
      event.currentTarget.reset();
      setNeedText('');
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : 'Could not prepare your request. Please try WhatsApp.';
      setStatus(nextMessage);
      if (audioEnabled) {
        speak(nextMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-[1000] max-w-[calc(100vw-2rem)] sm:bottom-24 sm:right-6">
      {!open && (
        <button
          type="button"
          onClick={openPanel}
          className="flex items-center gap-2 rounded-full bg-[#c8481a] px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-orange-500/30 ring-4 ring-white/80 transition hover:-translate-y-0.5 hover:bg-[#0e0e0e]"
          aria-label="Ask StationeryHub receptionist"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-base" aria-hidden="true">?</span>
          Ask StationeryHub
        </button>
      )}

      {open && (
        <section className="flex max-h-[calc(100vh-2rem)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white text-[#0e0e0e] shadow-2xl">
          <header className="bg-[#0e0e0e] p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-black">StationeryHub Receptionist</p>
                <p className="mt-1 text-sm leading-6 text-white/70">Tell us what you need and we’ll help you get a quote.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-2xl font-black text-white/60 hover:text-white" aria-label="Close receptionist">×</button>
            </div>
            <button
              type="button"
              onClick={() => {
                setAudioEnabled((enabled) => !enabled);
                if (audioEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              className="mt-4 rounded-full border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white/80"
            >
              Audio {audioEnabled ? 'on' : 'off'}
            </button>
          </header>

          <div className="overflow-y-auto p-5">
            <div className="space-y-3">
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#f0ede8] p-4 text-sm leading-6">
                {assistantMessage}
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#f0ede8] p-4 text-sm leading-6">
                {guidance}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {quickOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseOption(option)}
                  className={`min-h-11 rounded-2xl border px-3 py-3 text-left text-xs font-black uppercase tracking-wider transition ${
                    requestType === option ? 'border-[#c8481a] bg-[#c8481a] text-white' : 'border-black/10 bg-[#f8f6f2] text-black/70 hover:border-[#c8481a]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <form onSubmit={submitRequest} className="mt-5 grid gap-3">
              <input name="fullName" required placeholder="Your name" className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="phone" required placeholder="Phone / WhatsApp" className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="companyName" required placeholder="Company / school / office" className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="location" required placeholder="Location e.g. Gaborone" className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]" />
              <textarea
                name="requestDetails"
                required
                rows={4}
                value={needText}
                onChange={(event) => updateNeed(event.target.value)}
                placeholder="What do you need? Example: HP cartridge code, paper quantity, desks, chairs, or full supply list."
                className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#c8481a]"
              />
              {status && <p className="rounded-2xl bg-[#f0ede8] p-3 text-sm font-semibold leading-6 text-black/70">{status}</p>}
              <button disabled={loading} className="rounded-2xl bg-[#0e0e0e] px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#c8481a] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Preparing...' : 'Continue to WhatsApp'}
              </button>
              <p className="text-xs leading-5 text-black/45">A StationeryHub sales assistant will follow up. You can also email sales@stationeryhub.co.bw or WhatsApp +267 75 560 140 / +267 72 347 712.</p>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
