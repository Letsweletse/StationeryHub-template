// Branches, delivery areas and delivery-time estimates. Safe to import on the client.
export const AREAS = ['Gaborone', 'Palapye', 'Francistown', 'Other Botswana', 'International'] as const;
export type Area = (typeof AREAS)[number];

export const BRANCHES = [
  { town: 'Gaborone', role: 'Head office & main warehouse', phone: '+267 75 560 140', tel: '+26775560140', wa: '26775560140', serves: 'Greater Gaborone, Mogoditshane, Tlokweng, Kanye, Molepolole, Lobatse' },
  { town: 'Palapye', role: 'Central region branch', phone: '+267 72 347 712', tel: '+26772347712', wa: '26772347712', serves: 'Palapye, Serowe, Mahalapye, Letlhakane' },
  { town: 'Francistown', role: 'Northern region branch', phone: '+267 72 347 712', tel: '+26772347712', wa: '26772347712', serves: 'Francistown, Selebi-Phikwe, Tonota, Nata, Maun' },
] as const;

export function branchFor(area: string) {
  if (area === 'Palapye') return BRANCHES[1];
  if (area === 'Francistown') return BRANCHES[2];
  return BRANCHES[0];
}

// Working-day ranges by stock status and delivery area.
const TABLE: Record<string, Record<Area, [number, number]>> = {
  'In stock':  { Gaborone: [0, 1], Palapye: [1, 2], Francistown: [1, 2], 'Other Botswana': [2, 3], International: [5, 10] },
  Available:   { Gaborone: [3, 5], Palapye: [4, 6], Francistown: [4, 6], 'Other Botswana': [5, 7], International: [7, 14] },
  'Low stock': { Gaborone: [0, 2], Palapye: [1, 3], Francistown: [1, 3], 'Other Botswana': [2, 4], International: [5, 10] },
  'On order':  { Gaborone: [5, 10], Palapye: [6, 11], Francistown: [6, 11], 'Other Botswana': [7, 12], International: [10, 20] },
};

export function etaFor(status: string, area: Area | string = 'Gaborone') {
  const a = (AREAS as readonly string[]).includes(area) ? (area as Area) : 'Gaborone';
  if (status === 'Out of stock') return { min: null as number | null, max: null as number | null, label: 'Out of stock: ask for an alternative' };
  const [min, max] = (TABLE[status] || TABLE.Available)[a];
  const label = max <= 1 ? (min === 0 ? 'Same or next working day' : 'Next working day') : `${min}–${max} working days`;
  return { min, max, label };
}
