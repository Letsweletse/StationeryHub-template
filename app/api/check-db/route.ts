import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();
    
    // Test basic connection
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    // Test products table
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    return NextResponse.json({
      success: true,
      auth: {
        connected: !authError,
        error: authError?.message
      },
      database: {
        productsTableExists: !productsError,
        productCount: products?.length || 0,
        error: productsError?.message
      },
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
