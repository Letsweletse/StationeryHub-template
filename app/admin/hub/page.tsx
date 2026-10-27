'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type Data = { settings: Record<string, string>; items: any[]; suppliers: any[]; supplierItems: any[]; quotes: any[]; chats: any[] };
const P = (n: any) => (n == null || n === '' ? '—' : `P${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

export default function HubAdmin() {
  const [data, setData] = useState<Data | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [key, setKey] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState<'items' | 'quotes' | 'suppliers' | 'settings' | 'chats'>('items');
  const [filter, setFilter] = useState('');
  const [edit, setEdit] = useState<Record<number, any>>({});
  const [bulk, setBulk] = useState('');
  const [msg, setMsg] = useState('');
  const [newItem, setNewItem] = useState<any>({});

  const load = useCallback(async () => {
    const r = await fetch('/api/hub/admin', { cache: 'no-store' });
    if (r.status === 401) { setAuthed(false); return; }
    const d = await r.json(); setData(d); setAuthed(true);
  }, []);
  useEffect(() => { load().catch(() => setAuthed(false)); }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setErr('');
    const r = await fetch('/api/hub/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
    const d = await r.json(); if (!r.ok) { setErr(d.error || 'Login failed'); return; }
    setKey(''); load();
  }
  async function act(body: any, note = 'Saved') {
    const r = await fetch('/api/hub/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const d = await r.json(); if (!r.ok) { setMsg(d.error || 'Error'); return d; }
    setMsg(note); setTimeout(() => setMsg(''), 2500); await load(); return d;
  }

  const items = useMemo(() => {
    const q = filter.toLowerCase();
    return (data?.items || []).filter((i) => !q || [i.name, i.code, i.brand, i.category].some((v: string) => (v || '').toLowerCase().includes(q)));
  }, [data, filter]);

  if (authed === false) return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0ede8] p-4">
      <form onSubmit={login} className="w-full max-w-sm border border-black/10 bg-white p-6">
        <p className="text-xl font-black uppercase tracking-[0.12em]">Stationery<span className="text-[#c8481a]">Hub</span> admin</p>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin key" className="mt-4 w-full border border-black/15 px-3 py-3" autoComplete="current-password" />
        {err && <p className="mt-2 text-sm font-bold text-red-700">{err}</p>}
        <button className="mt-4 w-full bg-[#0e0e0e] py-3 text-sm font-black uppercase tracking-widest text-white">Sign in</button>
      </form>
    </main>
  );
  if (!data) return <main className="p-10 text-center">Loading…</main>;

  const s = data.settings;
  const pendingSup = data.suppliers.filter((x) => x.status === 'pending').length;
  const unpricedCount = data.items.filter((i) => i.active && i.selling == null).length;

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-lg font-black uppercase tracking-[0.12em]">Stationery<span className="text-[#c8481a]">Hub</span> · Admin</p>
          <div className="flex flex-wrap gap-1 text-xs font-black uppercase tracking-widest">
            {([['items', `Items (${unpricedCount} unpriced)`], ['quotes', `Quotes (${data.quotes.filter((q) => q.status === 'ordered').length} orders · ${data.quotes.filter((q) => q.status === 'new').length} new)`], ['suppliers', `Suppliers (${pendingSup + data.supplierItems.length})`], ['settings', 'Settings'], ['chats', 'Chats']] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`px-3 py-2 ${tab === k ? 'bg-[#0e0e0e] text-white' : 'bg-[#f0ede8]'}`}>{l}</button>
            ))}
            <button onClick={async () => { await fetch('/api/hub/admin/login', { method: 'DELETE' }); setAuthed(false); }} className="px-3 py-2 text-black/50">Sign out</button>
          </div>
        </div>
        {msg && <p className="bg-[#c8481a] px-4 py-1 text-center text-xs font-bold text-white">{msg}</p>}
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {tab === 'items' && (
          <>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="border border-black/10 bg-white p-4">
                <p className="font-black uppercase">Paste supplier costs</p>
                <p className="mt-1 text-xs text-black/60">One per line: <code>code, cost</code> or <code>code, cost, markup%</code>. Selling price = cost + markup (default {s.default_markup}%), rounded up to the nearest P5.</p>
                <textarea value={bulk} onChange={(e) => setBulk(e.target.value)} rows={5} placeholder={'CCRG067BK, 610\nH6ZD21AE, 210, 30'} className="mt-2 w-full border border-black/15 p-2 font-mono text-xs" />
                <button onClick={async () => { const d = await act({ action: 'bulk_costs', text: bulk }, 'Costs updated'); if (d?.ok) { setMsg(`Updated ${d.updated}${d.missing?.length ? ` · not found: ${d.missing.slice(0, 8).join(', ')}` : ''}`); setBulk(''); } }} className="mt-2 bg-[#0e0e0e] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">Apply costs</button>
              </div>
              <div className="border border-black/10 bg-white p-4">
                <p className="font-black uppercase">Add item</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {[['name', 'Name *'], ['code', 'Code'], ['brand', 'Brand'], ['category', 'Category'], ['cost_price', 'Supplier cost (P)'], ['fixed_price', 'Or fixed selling price (P)']].map(([k, l]) => (
                    <input key={k} placeholder={l} value={newItem[k] || ''} onChange={(e) => setNewItem({ ...newItem, [k]: e.target.value })} className="border border-black/15 px-2 py-2" />
                  ))}
                  <input placeholder="Fits printers (for search), e.g. LBP632, MF657" value={newItem.compat || ''} onChange={(e) => setNewItem({ ...newItem, compat: e.target.value })} className="col-span-2 border border-black/15 px-2 py-2" />
                </div>
                <button onClick={async () => { const d = await act({ action: 'add_item', ...newItem }, 'Item added'); if (d?.ok) setNewItem({}); }} className="mt-2 bg-[#0e0e0e] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">Add item</button>
              </div>
            </div>
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter items" className="mt-4 w-full border border-black/15 bg-white px-3 py-2 text-sm" />
            <div className="mt-3 overflow-x-auto border border-black/10 bg-white">
              <table className="w-full min-w-[1000px] text-sm">
                <thead className="bg-[#0e0e0e] text-left text-[10px] uppercase tracking-widest text-white"><tr><th className="px-2 py-2">Item</th><th className="px-2 py-2">Code</th><th className="px-2 py-2">Cost</th><th className="px-2 py-2">Markup %</th><th className="px-2 py-2">Fixed price</th><th className="px-2 py-2">Selling</th><th className="px-2 py-2">Status</th><th className="px-2 py-2">Fits printers</th><th className="px-2 py-2">Show</th><th className="px-2 py-2"></th></tr></thead>
                <tbody className="divide-y divide-black/5">
                  {items.map((i) => {
                    const e = edit[i.id] || {}; const v = (k: string) => (e[k] !== undefined ? e[k] : i[k] ?? '');
                    const set = (k: string, val: any) => setEdit({ ...edit, [i.id]: { ...e, [k]: val } });
                    const dirty = Object.keys(e).length > 0;
                    return (
                      <tr key={i.id} className={i.active ? '' : 'opacity-40'}>
                        <td className="px-2 py-1"><input value={v('name')} onChange={(x) => set('name', x.target.value)} className="w-64 border border-transparent px-1 py-1 hover:border-black/10" /><span className="block px-1 text-[10px] text-black/40">{i.brand} · {i.category}{i.supplier_id ? ` · supplier #${i.supplier_id}` : ''}</span></td>
                        <td className="px-2 py-1"><input value={v('code')} onChange={(x) => set('code', x.target.value)} className="w-28 border border-black/10 px-1 py-1 font-mono text-xs" /></td>
                        <td className="px-2 py-1"><input value={v('cost_price')} onChange={(x) => set('cost_price', x.target.value)} className="w-20 border border-black/10 px-1 py-1" /></td>
                        <td className="px-2 py-1"><input value={v('markup_pct')} onChange={(x) => set('markup_pct', x.target.value)} placeholder={s.default_markup} className="w-14 border border-black/10 px-1 py-1" /></td>
                        <td className="px-2 py-1"><input value={v('fixed_price')} onChange={(x) => set('fixed_price', x.target.value)} className="w-20 border border-black/10 px-1 py-1" /></td>
                        <td className="px-2 py-1 font-black">{i.selling != null ? P(i.selling) : <span className="text-xs text-[#c8481a]">no price</span>}{i.market_zar != null && <span className="block text-[10px] font-normal text-black/45">SA R{Number(i.market_zar).toFixed(0)}{i.price_source === 'market_za_ai' ? ' · AI' : ''}</span>}{i.rival != null && <span className="block text-[10px] font-bold text-[#c8481a]">Local rival P{Number(i.rival).toFixed(0)}</span>}</td>
                        <td className="px-2 py-1"><select value={v('status')} onChange={(x) => set('status', x.target.value)} className="border border-black/10 px-1 py-1 text-xs"><option>Available</option><option>Low stock</option><option>On order</option><option>Out of stock</option></select></td>
                        <td className="px-2 py-1"><input value={v('compat')} onChange={(x) => set('compat', x.target.value)} className="w-36 border border-black/10 px-1 py-1 text-xs" /></td>
                        <td className="px-2 py-1"><input type="checkbox" checked={v('active') !== false} onChange={(x) => set('active', x.target.checked)} /></td>
                        <td className="px-2 py-1">{dirty && <button onClick={async () => { await act({ action: 'save_item', ...i, ...e }); const n = { ...edit }; delete n[i.id]; setEdit(n); }} className="bg-[#c8481a] px-2 py-1 text-[10px] font-black uppercase text-white">Save</button>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'quotes' && (
          <div className="grid gap-3">
            {data.quotes.length === 0 && <p className="text-sm text-black/50">No quotations yet.</p>}
            {data.quotes.map((qq) => (
              <div key={qq.id} className="border border-black/10 bg-white p-4 text-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div><p className="font-black">{qq.ref} · {qq.customer_name}{qq.company ? ` (${qq.company})` : ''}</p><p className="text-xs text-black/50">{qq.ordered_at ? '✅ ORDERED · ' : ''}{new Date(qq.created_at).toLocaleString('en-GB')} · deliver to {qq.delivery_area || qq.country} · {qq.currency} · {[qq.phone, qq.email].filter(Boolean).join(' · ')}</p></div>
                  <div className="flex items-center gap-2"><strong>{P(qq.subtotal_bwp)}</strong>
                    <select value={qq.status} onChange={(e) => act({ action: 'quote_status', id: qq.id, status: e.target.value })} className="border border-black/15 px-2 py-1 text-xs"><option value="new">New</option><option value="ordered">Ordered</option><option value="contacted">Contacted</option><option value="won">Won</option><option value="lost">Lost</option></select>
                    {qq.phone && <a href={`https://wa.me/${String(qq.phone).replace(/\D/g, '').replace(/^(7\d{7})$/, '267$1')}`} target="_blank" rel="noopener noreferrer" className="bg-[#25d366] px-2 py-1 text-[10px] font-black uppercase">WhatsApp</a>}
                  </div>
                </div>
                <ul className="mt-2 text-xs text-black/70">
                  {(qq.items || []).map((x: any) => <li key={x.id}>{x.qty} × {x.name} = {P(x.total_bwp)}</li>)}
                  {(qq.unpriced || []).map((x: any) => <li key={`u${x.id}`} className="text-[#c8481a]">{x.qty} × {x.name}: needs price</li>)}
                </ul>
                {qq.notes && <p className="mt-2 bg-[#f0ede8] p-2 text-xs">{qq.notes}</p>}
              </div>
            ))}
          </div>
        )}

        {tab === 'suppliers' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-2 font-black uppercase">Suppliers</p>
              {data.suppliers.length === 0 && <p className="text-sm text-black/50">No supplier sign-ups yet. Share stationeryhub.co.bw/suppliers.</p>}
              <div className="grid gap-3">
                {data.suppliers.map((sp) => <SupplierCard key={sp.id} sp={sp} act={act} />)}
              </div>
            </div>
            <div>
              <p className="mb-2 font-black uppercase">Items waiting for approval</p>
              {data.supplierItems.length === 0 && <p className="text-sm text-black/50">Nothing waiting.</p>}
              <div className="grid gap-2">
                {data.supplierItems.map((x) => (
                  <div key={x.id} className="flex flex-wrap items-center justify-between gap-2 border border-black/10 bg-white p-3 text-sm">
                    <div><p className="font-bold">{x.name} <span className="font-mono text-xs text-black/50">{x.code}</span></p><p className="text-xs text-black/50">{x.supplier_name} · cost {P(x.supplier_price)}{x.moq ? ` · min ${x.moq}` : ''}</p></div>
                    <div className="flex gap-2">
                      <button onClick={() => act({ action: 'approve_supplier_item', id: x.id }, 'Added to catalogue')} className="bg-[#0e0e0e] px-2 py-1 text-[10px] font-black uppercase text-white">Approve</button>
                      <button onClick={() => act({ action: 'reject_supplier_item', id: x.id }, 'Rejected')} className="px-2 py-1 text-[10px] font-black uppercase text-black/50">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && <Settings s={s} act={act} />}

        {tab === 'chats' && (
          <div className="overflow-x-auto border border-black/10 bg-white">
            <table className="w-full text-sm"><thead className="bg-[#0e0e0e] text-left text-[10px] uppercase tracking-widest text-white"><tr><th className="px-3 py-2">When</th><th className="px-3 py-2">Channel</th><th className="px-3 py-2">From</th><th className="px-3 py-2">Asked</th><th className="px-3 py-2">Matches</th></tr></thead>
              <tbody className="divide-y divide-black/5">{data.chats.map((c, i) => <tr key={i}><td className="px-3 py-2 text-xs">{new Date(c.created_at).toLocaleString('en-GB')}</td><td className="px-3 py-2">{c.channel}</td><td className="px-3 py-2">{c.sender}</td><td className="px-3 py-2">{c.message}</td><td className={`px-3 py-2 ${c.matched ? '' : 'font-bold text-[#c8481a]'}`}>{c.matched || 'none: add this item?'}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function SupplierCard({ sp, act }: { sp: any; act: (b: any, n?: string) => Promise<any> }) {
  const [v, setV] = useState({ status: sp.status, plan: sp.plan, show_contact: sp.show_contact, paid_until: sp.paid_until ? String(sp.paid_until).slice(0, 10) : '' });
  return (
    <div className="border border-black/10 bg-white p-3 text-sm">
      <p className="font-black">{sp.name} {sp.pending_items > 0 && <span className="ml-1 bg-[#c8481a] px-1.5 text-[10px] text-white">{sp.pending_items} items</span>}</p>
      <p className="text-xs text-black/60">{[sp.contact_person, sp.phone, sp.email, sp.city, sp.country].filter(Boolean).join(' · ')}</p>
      {sp.categories && <p className="text-xs">{sp.categories}</p>}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <select value={v.status} onChange={(e) => setV({ ...v, status: e.target.value })} className="border border-black/15 px-1 py-1"><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
        <select value={v.plan} onChange={(e) => setV({ ...v, plan: e.target.value })} className="border border-black/15 px-1 py-1"><option value="free">Free</option><option value="listed">Featured (paid)</option></select>
        <label className="flex items-center gap-1"><input type="checkbox" checked={v.show_contact} onChange={(e) => setV({ ...v, show_contact: e.target.checked })} /> Show contact</label>
        <label className="flex items-center gap-1">Paid until <input type="date" value={v.paid_until} onChange={(e) => setV({ ...v, paid_until: e.target.value })} className="border border-black/15 px-1" /></label>
        <button onClick={() => act({ action: 'supplier', id: sp.id, ...v })} className="bg-[#0e0e0e] px-2 py-1 font-black uppercase text-white">Save</button>
        <a href={`https://wa.me/${String(sp.phone).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-[#25d366] px-2 py-1 font-black uppercase">WhatsApp</a>
      </div>
    </div>
  );
}

function Settings({ s, act }: { s: Record<string, string>; act: (b: any, n?: string) => Promise<any> }) {
  const [v, setV] = useState(s);
  const f = [['default_markup', 'Default markup % on supplier cost'], ['landing_pct', 'Landing cost % on SA market prices (freight, duty, clearing)'], ['beat_pct', 'Beat cheapest local competitor by %'], ['min_margin_pct', 'Never go below cost + this margin %'], ['usd_per_bwp', 'USD per 1 BWP (e.g. 0.073)'], ['zar_per_bwp', 'ZAR per 1 BWP (e.g. 1.33)'], ['listing_fee_bwp', 'Featured supplier listing fee (P/month)'], ['quote_valid_days', 'Quotation valid for (days)']];
  return (
    <div className="max-w-xl border border-black/10 bg-white p-5">
      {f.map(([k, l]) => (
        <label key={k} className="mb-3 block text-xs font-bold uppercase tracking-widest text-black/60">{l}
          <input value={v[k] || ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} className="mt-1 w-full border border-black/15 px-3 py-2 text-sm font-normal text-black" />
        </label>
      ))}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => act({ action: 'save_settings', settings: v })} className="bg-[#0e0e0e] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">Save settings</button>
        <button onClick={async () => { await act({ action: 'save_settings', settings: v }); await act({ action: 'recalc_market' }, 'Market-based prices recalculated'); }} className="bg-[#c8481a] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">Save &amp; recalculate market prices</button>
        <button onClick={async () => { const r = await fetch('/api/hub/reprice'); const d = await r.json(); alert(JSON.stringify(d).slice(0, 400)); }} className="border border-black/20 px-4 py-2 text-xs font-black uppercase tracking-widest">Refresh prices with AI now</button>
      </div>
      <p className="mt-3 text-xs text-black/50">Market-priced items: selling price = SA retail price ÷ ZAR rate × (1 + landing %) + markup. The AI refresh runs daily once GEMINI_API_KEY is set in Vercel.</p>
    </div>
  );
}
