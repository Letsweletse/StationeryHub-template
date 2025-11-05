import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return NextResponse.json({ 
      status: 'healthy', 
      database: 'connected',
      time: result[0].current_time
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      database: 'disconnected',
      error: error.message 
    }, { status: 500 });
  }
}
