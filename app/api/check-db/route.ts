import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Test connection and check tables
    const tablesCheck = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name IN ('products', 'product_reviews', 'order_inquiries')
    `);
    
    const existingTables = tablesCheck.rows.map(row => row.table_name);
    
    // Check products count if table exists
    let productsCount = 0;
    if (existingTables.includes('products')) {
      const countResult = await query('SELECT COUNT(*) FROM products');
      productsCount = parseInt(countResult.rows[0].count);
    }
    
    return NextResponse.json({
      success: true,
      database: 'Neon PostgreSQL',
      connection: 'Connected successfully',
      existingTables,
      productsCount,
      environment: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasDirectUrl: !!process.env.DIRECT_URL
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
