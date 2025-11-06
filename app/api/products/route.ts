import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let sql = `
      SELECT 
        p.*,
        COALESCE(AVG(pr.rating), 0) as average_rating,
        COUNT(pr.id) as review_count
      FROM products p
      LEFT JOIN product_reviews pr ON p.id = pr.product_id
    `;
    
    const params: any[] = [];
    
    // Add WHERE conditions
    const conditions = [];
    
    if (category) {
      conditions.push(`p.category = $${params.length + 1}`);
      params.push(category);
    }
    
    if (featured === 'true') {
      conditions.push(`p.is_featured = $${params.length + 1}`);
      params.push(true);
    }
    
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    // Add GROUP BY and ORDER
    sql += ` GROUP BY p.id ORDER BY p.created_at DESC`;
    
    const result = await query(sql, params);
    
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    
    const sql = `
      INSERT INTO products (name, description, price, stock, category, image_url, is_featured, specifications)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const params = [
      productData.name,
      productData.description,
      productData.price,
      productData.stock,
      productData.category,
      productData.image_url,
      productData.is_featured || false,
      productData.specifications || null
    ];
    
    const result = await query(sql, params);
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
