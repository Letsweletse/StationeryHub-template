import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    // First, create products table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER DEFAULT 0,
        category VARCHAR(100),
        image_url TEXT,
        is_featured BOOLEAN DEFAULT false,
        specifications JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
      )
    `);

    const sampleProducts = [
      {
        name: 'HP 304XL High-Yield Ink Cartridge Combo',
        description: 'Original HP 304XL High-Yield Ink Cartridges (Black + Color) for HP DeskJet printers. Premium quality with extended page yield.',
        price: 459.99,
        stock: 15,
        category: 'cartridges',
        image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
        is_featured: true,
        specifications: {
          compatibility: 'HP DeskJet 2634, 2652, 2655, 3755, 3760, 4155, 4175',
          yield: 'Up to 600 pages (Black), 450 pages (Color)',
          type: 'Original HP',
          warranty: '1 Year'
        }
      },
      {
        name: 'Staedtler Ballpoint Pens (Pack of 12)',
        description: 'Premium ballpoint pens for smooth writing experience. Perfect for office and professional use.',
        price: 45.50,
        stock: 100,
        category: 'pens',
        image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=400&fit=crop',
        is_featured: true,
        specifications: {
          type: 'Ballpoint',
          ink_color: 'Blue',
          package: '12 pens',
          warranty: '1 Year'
        }
      },
      {
        name: 'A4 Copy Paper (500 Sheets)',
        description: 'High-quality A4 copy paper for everyday printing needs. Bright white, 80gsm premium paper.',
        price: 89.99,
        stock: 50,
        category: 'stationery',
        image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
        is_featured: false,
        specifications: {
          size: 'A4',
          weight: '80gsm',
          sheets: '500',
          brightness: '92'
        }
      },
      {
        name: 'Executive Office Chair',
        description: 'Ergonomic executive office chair with lumbar support. Perfect for long working hours.',
        price: 1299.99,
        stock: 10,
        category: 'furniture',
        image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
        is_featured: true,
        specifications: {
          material: 'Premium Leather',
          adjustments: 'Height, Lumbar, Tilt',
          weight_capacity: '150kg',
          warranty: '5 Years'
        }
      }
    ];

    // Insert products
    for (const product of sampleProducts) {
      await query(`
        INSERT INTO products (name, description, price, stock, category, image_url, is_featured, specifications)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.category,
        product.image_url,
        product.is_featured,
        JSON.stringify(product.specifications)
      ]);
    }

    // Get inserted products to return
    const result = await query('SELECT * FROM products ORDER BY id DESC LIMIT 10');
    
    return NextResponse.json({
      success: true,
      message: 'Database setup completed and sample products added',
      products: result.rows
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
