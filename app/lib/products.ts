// Create this file at lib/products.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Notebook",
    description: "High-quality A5 notebook with 120 pages",
    price: 12.99,
    image: "/images/notebook.jpg",
    category: "notebooks"
  },
  {
    id: "2", 
    name: "Executive Pen Set",
    description: "Set of 3 premium ballpoint pens",
    price: 24.99,
    image: "/images/pens.jpg",
    category: "pens"
  },
  {
    id: "3",
    name: "Desk Organizer",
    description: "Wooden desk organizer with multiple compartments",
    price: 35.99,
    image: "/images/organizer.jpg",
    category: "accessories"
  }
];
