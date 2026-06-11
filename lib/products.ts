export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  whatsappMessage: string;
};

export const products: Product[] = [
  {
    id: 'hp-3yp17a-colour-printhead',
    name: 'HP 3YP17A Colour Printhead',
    category: 'Print Supplies',
    price: 'P780.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg',
    whatsappMessage: 'Hello StationeryHub, I am interested in the HP 3YP17A Colour Printhead for P780.00.',
  },
  {
    id: 'hp-47-black-ink-cartridge',
    name: 'HP 47 Black Ink Cartridge',
    category: 'Print Supplies',
    price: 'P280.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png',
    whatsappMessage: 'Hello StationeryHub, I would like to purchase the HP 47 Black Ink Cartridge for P280.00.',
  },
  {
    id: 'canon-486-colour-ink-cartridge',
    name: 'Canon 486 Colour Ink Cartridge',
    category: 'Print Supplies',
    price: 'P756.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681956/HC6657AE_b6ra8c.jpg',
    whatsappMessage: 'Hello StationeryHub, I want to order the Canon 486 Colour Ink Cartridge for P756.00.',
  },
  {
    id: 'canon-pg-485-standard-black-ink',
    name: 'Canon PG-485 Standard Black Ink',
    category: 'Print Supplies',
    price: 'P780.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762696702/CPG-485XL_ctheag.jpg',
    whatsappMessage: 'Hello StationeryHub, I need the Canon PG-485 Standard Black Ink for P780.00.',
  },
  {
    id: 'hp-154a-neverstop-toner-reload',
    name: 'HP 154A Neverstop Toner Reload',
    category: 'Toner',
    price: 'P450.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762682083/HW1540A_bwvqbi.png',
    whatsappMessage: 'Hello StationeryHub, I am interested in the HP 154A Neverstop Toner Reload for P450.00.',
  },
  {
    id: 'hp-925e-evomore-high-yield-magenta',
    name: 'HP 925e Evomore High Yield Magenta',
    category: 'Ink Cartridge',
    price: 'P560.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681957/HP4K0W0PE_nissve.jpg',
    whatsappMessage: 'Hello StationeryHub, I would like the HP 925e Evomore High Yield Magenta Ink Cartridge for P560.00.',
  },
  {
    id: 'office-stationery-bulk-pack',
    name: 'Office Stationery Bulk Pack',
    category: 'Office Stationery',
    price: 'Request Quote',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    whatsappMessage: 'Hello StationeryHub, please quote me for an office stationery bulk pack.',
  },
  {
    id: 'office-furniture-supply',
    name: 'Office Furniture Supply',
    category: 'Office Furniture',
    price: 'Request Quote',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    whatsappMessage: 'Hello StationeryHub, I need a quote for office furniture supply.',
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
