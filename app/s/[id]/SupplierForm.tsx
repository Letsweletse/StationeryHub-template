'use client';
import { FormEvent, useState } from 'react';

type Line = { id: number; name: string; code: string | null; qty: number };

export default function SupplierForm({ id, t, kind, items, answered }: { id: number; t: string; kind: string; items: Line[]; answered: boolean }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>(answered ? 'done' : 'idle');
  const [vals, setVals] = useState<Record<number, { price: string; available: boolean; lead: string }>>(
    Object.fromEntries(items.map((i) => [i.id, { price: '', available: true, lead: '' }])),
  );
  const [note, setNote] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault(); setState('busy');
    const lines = items.map((i) => ({ id: i.id, ...vals[i.id] }));
    const r = await fetch('/api/hub/supplier-response', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, t, lines, note }) });
    setState(r.ok ? 'done' : 'error');
  }
  if (state === 'done') return <p className="mt-6 bg-[#eefaf3] p-4 text-sm font-bold">Thank you, your reply has been received. Our team will be in touch.</p>;
  return (
    <form onSubmit={submit} className="mt-6 grid gap-3">
      {items.map((i) => (
        <div key={i.id} className="border border-black/10 p-3">
          <p className="font-bold">{i.qty} × {i.name}</p>
          {i.code && <p className="font-mono text-xs text-black/50">{i.code}</p>}
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
            {kind !== 'po' && <input inputMode="decimal" placeholder="Price each (P)" value={vals[i.id].price} onChange={(e) => setVals({ ...vals, [i.id]: { ...vals[i.id], price: e.target.value } })} className="border border-black/15 px-2 py-2" />}
            <input inputMode="numeric" placeholder="Days to deliver" value={vals[i.id].lead} onChange={(e) => setVals({ ...vals, [i.id]: { ...vals[i.id], lead: e.target.value } })} className="border border-black/15 px-2 py-2" />
            <label className="flex items-center gap-2"><input type="checkbox" checked={vals[i.id].available} onChange={(e) => setVals({ ...vals, [i.id]: { ...vals[i.id], available: e.target.checked } })} /> Available</label>
          </div>
        </div>
      ))}
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Note (optional)" className="border border-black/15 px-3 py-2 text-sm" />
      {state === 'error' && <p className="text-sm font-bold text-red-700">Could not send. Please WhatsApp +267 75 560 140.</p>}
      <button disabled={state === 'busy'} className="bg-[#c8481a] px-6 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60">{state === 'busy' ? 'Sending…' : kind === 'po' ? 'Confirm order' : 'Send my prices'}</button>
    </form>
  );
}
