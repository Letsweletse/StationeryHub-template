'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
}

export default function AddToCartButton({ productId, productName, price }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      let userId = session?.user?.id;

      if (!userId) {
        // SIMPLE FIX: Always use empty string fallback
        userId = localStorage.getItem('userId') || '';
      }

      if (!userId) {
        alert('Please create an account first!');
        return;
      }

      // Add to cart logic here
      const { error } = await supabase
        .from('cart_items')
        .insert([
          {
            user_id: userId,
            product_id: productId,
            product_name: productName,
            price: price,
            quantity: 1,
          },
        ]);

      if (error) {
        alert('Error adding to cart');
        return;
      }

      alert('Product added to cart!');
      
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
