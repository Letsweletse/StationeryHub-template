import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    const productCount = await prisma.product.count()
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true
      }
    })

    return NextResponse.json({
      status: 'SUCCESS',
      database: 'CONNECTED',
      productCount,
      sampleProducts,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'ERROR',
      database: 'DISCONNECTED',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
