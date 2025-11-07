import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    console.log('Starting database seed...');

    // First, ensure table has correct structure
    await query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS image_url TEXT,
      ADD COLUMN IF NOT EXISTS category VARCHAR(100)
    `);

    // Clear any existing products
    await query('DELETE FROM products');

    // Add sample products
    const sampleProducts = [
      {
        name: 'HP 304 Black Ink Cartridge',
        description: 'Original HP 304 Black Ink Cartridge for HP DeskJet printers',
        price: 189.99,
        stock: 25,
        category: 'cartridges',
        image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop',
        is_featured: true
      },
      {
        name: 'Staedtler Ballpoint Pens (Pack of 12)',
        description: 'Premium ballpoint pens for smooth writing experience',
        price: 45.50,
        stock: 100,
        category: 'pens',
        image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=400&fit=crop',
        is_featured: true
      },
      {
        name: 'A4 Copy Paper (500 Sheets)',
        description: 'High-quality A4 copy paper for everyday printing needs',
        price: 89.99,
        stock: 50,
        category: 'stationery',
        image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop',
        is_featured: false
      },
      {
        name: 'Executive Office Chair',
        description: 'Ergonomic executive office chair with lumbar support',
        price: 1299.99,
        stock: 10,
        category: 'furniture',
        image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
        is_featured: true
      }
    ];

    // Insert products
    for (const product of sampleProducts) {
      await query(
        `INSERT INTO products (name, description, price, stock, category, image_url, is_featured) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          product.name,
          product.description,
          product.price,
          product.stock,
          product.category,
          product.image_url,
          product.is_featured
        ]
      );
    }

    // Verify
    const result = await query('SELECT COUNT(*) as count FROM products');
    const count = parseInt(result.rows[0].count);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully added ${count} products!` 
    });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
