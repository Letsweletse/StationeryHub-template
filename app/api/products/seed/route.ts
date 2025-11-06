import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
  try {
    const supabase = createClient();

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

    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (error) {
      return NextResponse.json(
        { error: `Failed to add products: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sample products added successfully',
      products: data
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Server error: ${error}` },
      { status: 500 }
    );
  }
}
