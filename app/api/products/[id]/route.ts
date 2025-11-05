import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id)
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    // First check if product exists
    const existingProduct = await sql`
      SELECT id FROM products WHERE id = ${productId}
    `;

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete the product
    const deletedProduct = await sql`
      DELETE FROM products 
      WHERE id = ${productId}
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
    
    return NextResponse.json({ 
      message: 'Product deleted successfully',
      product: deletedProduct[0]
    })
  } catch (error: any) {
    console.error('Delete product error:', error)
    
    return NextResponse.json(
      { error: 'Failed to delete product: ' + error.message },
      { status: 500 }
    )
  }
}
