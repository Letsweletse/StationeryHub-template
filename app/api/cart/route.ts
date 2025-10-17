import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// Get user's cart
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const result = await pool.query(
      `SELECT c.*, p.name, p.price, p.imageUrl, p.stock 
       FROM carts c 
       JOIN products p ON c.productId = p.id 
       WHERE c.userId = $1`,
      [userId]
    );
    
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// Add to cart
export async function POST(request: NextRequest) {
  try {
    const { userId, productId, quantity = 1 } = await request.json();
    
    // Check if item already in cart
    const existing = await pool.query(
      'SELECT * FROM carts WHERE userId = $1 AND productId = $2',
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      // Update quantity
      await pool.query(
        'UPDATE carts SET quantity = quantity + $1 WHERE userId = $2 AND productId = $3',
        [quantity, userId, productId]
      );
    } else {
      // Add new item
      await pool.query(
        'INSERT INTO carts (userId, productId, quantity) VALUES ($1, $2, $3)',
        [userId, productId, quantity]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}
