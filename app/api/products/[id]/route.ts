import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

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

    const product = await prisma.product.delete({
      where: { id: productId }
    })
    
    return NextResponse.json({ 
      message: 'Product deleted successfully',
      product 
    })
  } catch (error: any) {
    console.error('Delete product error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to delete product: ' + error.message },
      { status: 500 }
    )
  }
}
