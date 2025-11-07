import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Simple test - just add one product
    await query(
      `INSERT INTO products (name, description, price, stock, category, image_url, is_featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        'Test Product',
        'This is a test product to verify database connection',
        99.99,
        10,
        'test',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop',
        true
      ]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Test product added successfully!' 
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
