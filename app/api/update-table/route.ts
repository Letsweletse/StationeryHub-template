import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    console.log('Updating products table structure...');

    // Add missing columns to products table
    await query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS image_url TEXT,
      ADD COLUMN IF NOT EXISTS category VARCHAR(100)
    `);

    return NextResponse.json({ 
      success: true, 
      message: 'Products table updated successfully!' 
    });

  } catch (error: any) {
    console.error('Table update error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
