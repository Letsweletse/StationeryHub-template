'use client';
import { FormEvent, useState } from 'react';

export default function OrderBox({ refNo, sig, ordered, branchPhone }: { refNo: string; sig: string; ordered: boolean; branchPhone: string }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>(ordered ? 'done' : 'idle');
  const [msg, setMsg] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState('busy');
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch('/api/hub/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: refNo, s: sig, ...f }) });
    const d = await r.json().catch(() => ({}));
    if (r.ok) setState('done'); else { setState('error'); setMsg(d.error || 'Could not place the order.'); }
  }
  if (state === 'done') return <div className="mt-8 border-2 border-[#1f9e5a] bg-[#eefaf3] p-4 text-sm print:hidden"><strong>Order received.</strong> Our team will confirm stock, delivery and payment shortly. Questions: WhatsApp {branchPhone}.</div>;
  return (
    <form onSubmit={submit} className="mt-8 grid gap-3 border-2 border-[#0e0e0e] p-4 print:hidden">
      <p className="text-sm font-black uppercase tracking-widest">Happy with this quotation? Place your order</p>
      <input name="address" required placeholder="Delivery address (building, street, town) *" className="border border-black/15 px-3 py-3 text-sm" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="po" placeholder="Purchase order number (optional)" className="border border-black/15 px-3 py-3 text-sm" />
        <input name="note" placeholder="Note for our team (optional)" className="border border-black/15 px-3 py-3 text-sm" />
      </div>
      {state === 'error' && <p className="text-sm font-bold text-red-700">{msg}</p>}
      <button disabled={state === 'busy'} className="bg-[#c8481a] px-6 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60">{state === 'busy' ? 'Placing order…' : 'Confirm order'}</button>
      <p className="text-xs text-black/50">No payment now. We confirm stock and send the invoice before delivery.</p>
    </form>
  );
}
