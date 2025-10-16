import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

// Real Unsplash images for stationery products
const productImages = {
  'HP 12A Black Cartridge': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop',
  'Canon 303 Cartridge': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop',
  'A4 Copy Paper 500 sheets': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop',
  'Stapler': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
  'Office Chair': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
};

export async function GET() {
  try {
    const updates = [];
    
    for (const [productName, imageUrl] of Object.entries(productImages)) {
      const update = await prisma.product.updateMany({
        where: { name: productName },
        data: { imageUrl }
      });
      updates.push({ productName, updated: update.count });
    }
    
    // Get all products to verify
    const allProducts = await prisma.product.findMany({
      select: { id: true, name: true, imageUrl: true }
    });
    
    return NextResponse.json({
      status: 'SUCCESS',
      updates,
      productCount: allProducts.length,
      products: allProducts
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'ERROR',
      error: error.message
    }, { status: 500 });
  }
}
