import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const products = await sql`
      SELECT 
        id,
        name,
        category,
        price,
        description,
        image_url as "imageUrl",
        stock,
        created_at as "createdAt"
      FROM products 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, price' },
        { status: 400 }
      )
    }

    const product = await sql`
      INSERT INTO products (
        name, 
        category, 
        price, 
        description, 
        image_url, 
        stock
      ) VALUES (
        ${body.name},
        ${body.category},
        ${parseFloat(body.price)},
        ${body.description || ''},
        ${body.imageUrl || ''},
        ${parseInt(body.stock) || 0}
      )
      RETURNING 
        id,
        name,
        category,
        price,
        description,
        image_url as "imageUrl",
        stock,
        created_at as "createdAt"
    `;
    
    return NextResponse.json(product[0], { status: 201 })
  } catch (error: any) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product: ' + error.message },
      { status: 500 }
    )
  }
}
