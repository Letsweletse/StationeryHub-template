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
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      let userId = session?.user?.id;

      // If no user session, check for anonymous user ID in localStorage
      if (!userId) {
        userId = localStorage.getItem('userId');
        
        // If no anonymous user ID exists, create one
        if (!userId) {
          const { data: anonUser, error } = await supabase.auth.signInAnonymously();
          if (error) {
            console.error('Error creating anonymous user:', error);
            alert('Please create an account first!');
            return;
          }
          if (anonUser.user) {
            userId = anonUser.user.id;
            // FIXED: Added fallback for null case
            localStorage.setItem('userId', userId || '');
          }
        }
      }

      if (!userId) {
        alert('Please create an account first!');
        return;
      }

      // Check if product already exists in cart
      const { data: existingItem, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error checking cart:', fetchError);
        alert('Error adding to cart');
        return;
      }

      if (existingItem) {
        // Update quantity if item exists
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (updateError) {
          console.error('Error updating cart:', updateError);
          alert('Error updating cart');
          return;
        }
      } else {
        // Add new item to cart
        const { error: insertError } = await supabase
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

        if (insertError) {
          console.error('Error adding to cart:', insertError);
          alert('Error adding to cart');
          return;
        }
      }

      alert('Product added to cart!');
      
      // Trigger cart update event for other components
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Error:', error);
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
