const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Sample products for StationeryHub
  const products = [
    {
      name: "Executive Ballpoint Pens (12pk)",
      description: "Smooth writing professional pens for office use",
      price: 45.99,
      category: "Pens & Writing",
      stock: 100,
      imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=400&fit=crop"
    },
    {
      name: "A4 Office Paper (500 sheets)",
      description: "Premium quality 80gsm copy paper",
      price: 289.99,
      category: "Paper",
      stock: 50,
      imageUrl: "https://images.unsplash.com/photo-1601662521347-f1ce43b53a28?w=500&h=400&fit=crop"
    },
    {
      name: "Stapler Heavy Duty",
      description: "Professional stapler for high-volume office use",
      price: 89.99,
      category: "Office Equipment",
      stock: 30,
      imageUrl: "https://images.unsplash.com/photo-1585336261027-6abdf1a1c554?w=500&h=400&fit=crop"
    },
    {
      name: "Desktop File Organizer",
      description: "Keep your documents organized and accessible",
      price: 156.50,
      category: "Storage & Organization",
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?w=500&h=400&fit=crop"
    },
    {
      name: "Whiteboard Markers (8 colors)",
      description: "Low-odor dry erase markers for presentations",
      price: 67.99,
      category: "Presentation",
      stock: 60,
      imageUrl: "https://images.unsplash.com/photo-1518834107812-67d823a0db0a?w=500&h=400&fit=crop"
    },
    {
      name: "Executive Notebook Set",
      description: "Premium leather-bound notebooks for professionals",
      price: 234.99,
      category: "Notebooks & Journals",
      stock: 40,
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=400&fit=crop"
    },
    {
      name: "Document Scanner",
      description: "High-speed scanner for digitizing documents",
      price: 1249.99,
      category: "Electronics",
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop"
    },
    {
      name: "Paper Clips Assorted (100pc)",
      description: "Mixed size paper clips for document organization",
      price: 23.50,
      category: "Fasteners & Clips",
      stock: 200,
      imageUrl: "https://images.unsplash.com/photo-1601576089619-1c7af32b8e94?w=500&h=400&fit=crop"
    },
    {
      name: "Desk Lamp LED",
      description: "Energy-efficient LED lamp with adjustable arm",
      price: 178.99,
      category: "Office Furniture",
      stock: 35,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop"
    },
    {
      name: "Calculator Printing",
      description: "12-digit printing calculator for financial work",
      price: 345.00,
      category: "Electronics",
      stock: 20,
      imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&h=400&fit=crop"
    },
    {
      name: "Sticky Notes (10 pads)",
      description: "Assorted color sticky notes for reminders",
      price: 45.75,
      category: "Notepads & Memos",
      stock: 80,
      imageUrl: "https://images.unsplash.com/photo-1618040997727-5f117e13e0c1?w=500&h=400&fit=crop"
    },
    {
      name: "Office Chair Executive",
      description: "Ergonomic office chair with lumbar support",
      price: 899.99,
      category: "Office Furniture",
      stock: 10,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop"
    },
    {
      name: "Printer Ink Cartridges",
      description: "Compatible ink cartridges for HP printers",
      price: 189.99,
      category: "Printer Supplies",
      stock: 45,
      imageUrl: "https://images.unsplash.com/photo-1502916668242-2f943dcd0387?w=500&h=400&fit=crop"
    },
    {
      name: "Document Filing Cabinet",
      description: "2-drawer metal filing cabinet for A4 documents",
      price: 678.50,
      category: "Storage & Organization",
      stock: 8,
      imageUrl: "https://images.unsplash.com/photo-1596524431135-58e3ad0a5e74?w=500&h=400&fit=crop"
    },
    {
      name: "Whiteboard 120x90cm",
      description: "Large magnetic whiteboard for meetings",
      price: 456.99,
      category: "Presentation",
      stock: 12,
      imageUrl: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?w=500&h=400&fit=crop"
    },
    {
      name: "Business Card Holder",
      description: "Elegant acrylic business card display",
      price: 78.25,
      category: "Desk Accessories",
      stock: 50,
      imageUrl: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&h=400&fit=crop"
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('✅ Database seeded with 16 products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
