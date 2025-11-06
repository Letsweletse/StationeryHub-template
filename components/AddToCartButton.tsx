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
        userId = localStorage.getItem('userId') || '';
        
        if (!userId) {
          const { data: anonUser, error } = await supabase.auth.signInAnonymously();
          if (error) {
            alert('Please create an account first!');
            return;
          }
          if (anonUser.user) {
            userId = anonUser.user.id;
            localStorage.setItem('userId', userId || '');
          }
        }
      }

      if (!userId) {
        alert('Please create an account first!');
        return;
      }

      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
      } else {
        await supabase
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
      }

      alert('Product added to cart!');
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      alert('An error occurred while adding to cart');
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
