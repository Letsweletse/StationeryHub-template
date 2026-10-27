'use client';
// Quote basket kept in the browser so customers can add items from any page.
export type BasketLine = { id: number; name: string; code: string | null; price: number | null; qty: number };
const KEY = 'sh_quote_basket_v1';
const EVT = 'sh-basket';

export function readBasket(): BasketLine[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function write(lines: BasketLine[]) {
  try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  window.dispatchEvent(new Event(EVT));
}
export function addToBasket(item: Omit<BasketLine, 'qty'>, qty = 1) {
  const lines = readBasket();
  const ex = lines.find((l) => l.id === item.id);
  if (ex) ex.qty = Math.min(10000, ex.qty + qty); else lines.push({ ...item, qty });
  write(lines);
}
export function setQty(id: number, qty: number) {
  write(readBasket().map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(10000, Math.floor(qty) || 1)) } : l)));
}
export function removeLine(id: number) { write(readBasket().filter((l) => l.id !== id)); }
export function clearBasket() { write([]); }
export function onBasket(cb: () => void) {
  window.addEventListener(EVT, cb); window.addEventListener('storage', cb);
  return () => { window.removeEventListener(EVT, cb); window.removeEventListener('storage', cb); };
}
export const fmtP = (n: number) => `P${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
