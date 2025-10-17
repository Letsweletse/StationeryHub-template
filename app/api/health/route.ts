import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'StationeryHub API is working!',
    timestamp: new Date().toISOString()
  });
}
