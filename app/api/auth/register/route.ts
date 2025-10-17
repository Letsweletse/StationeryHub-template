import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, whatsapp } = await request.json();
    
    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const result = await pool.query(
      `INSERT INTO users (email, name, phone, whatsapp) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, name, phone, whatsapp]
    );

    return NextResponse.json({ 
      success: true, 
      user: result.rows[0],
      message: 'Account created successfully!'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
