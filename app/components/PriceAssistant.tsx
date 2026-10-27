'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { addToBasket, fmtP } from '@/lib/basket';

type Match = { id: number; name: string; code: string | null; price: number | null };
type Msg = { from: 'me' | 'bot'; text: string; matches?: Match[]; handoff?: boolean };

export default function PriceAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: 'Dumela! Ask me for a price, e.g. "HP 47 black" or "Canon CRG 067". I can add items to your quote.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState<number | null>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim(); if (!text || busy) return;
    setInput(''); setMsgs((m) => [...m, { from: 'me', text }]); setBusy(true);
    try {
      const r = await fetch('/api/hub/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
      const d = await r.json();
      setMsgs((m) => [...m, { from: 'bot', text: d.matches?.length ? (d.matches.length === 1 ? 'Here is what we have:' : 'Here are the closest matches:') : d.text, matches: d.matches, handoff: d.handoff }]);
    } catch {
      setMsgs((m) => [...m, { from: 'bot', text: 'Sorry, I could not check right now. Please WhatsApp +267 75 560 140.', handoff: true }]);
    }
    setBusy(false);
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 print:hidden">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col border border-black/15 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#0e0e0e] px-4 py-3 text-white">
            <p className="text-sm font-black uppercase tracking-widest">Price assistant</p>
            <button onClick={() => setOpen(false)} className="text-xs font-bold uppercase text-white/70">Close</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'text-right' : ''}>
                <div className={`inline-block max-w-[90%] px-3 py-2 text-left ${m.from === 'me' ? 'bg-[#c8481a] text-white' : 'bg-[#f0ede8]'}`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                  {m.matches?.map((x) => (
                    <div key={x.id} className="mt-2 border-t border-black/10 pt-2">
                      <p className="font-bold">{x.name}</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black">{x.price != null ? fmtP(x.price) : 'Price on request'}</span>
                        <button onClick={() => { addToBasket({ id: x.id, name: x.name, code: x.code, price: x.price }); setAdded(x.id); setTimeout(() => setAdded(null), 1500); }}
                          className="bg-[#0e0e0e] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">{added === x.id ? 'Added ✓' : 'Add to quote'}</button>
                      </div>
                    </div>
                  ))}
                  {m.matches && m.matches.length > 0 && <a href="/quote" className="mt-2 block text-xs font-black uppercase tracking-widest text-[#c8481a]">Open my quote →</a>}
                  {m.handoff && <a href={`https://wa.me/26775560140?text=${encodeURIComponent('Hello StationeryHub, I need help with: ' + (msgs[i - 1]?.text || ''))}`} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs font-black uppercase tracking-widest text-[#128c4a]">Chat with sales on WhatsApp →</a>}
                </div>
              </div>
            ))}
            {busy && <p className="text-xs text-black/40">Checking prices…</p>}
            <div ref={end} />
          </div>
          <form onSubmit={send} className="flex border-t border-black/10">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. HP 925 magenta" className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" aria-label="Ask for a price" />
            <button className="bg-[#c8481a] px-4 text-xs font-black uppercase tracking-widest text-white">Ask</button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-[#c8481a] px-4 py-3 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:bg-[#e8622e]">
        {open ? 'Close' : 'Ask for a price'}
      </button>
    </div>
  );
}
