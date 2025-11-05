'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
}

export default function AddToCartButton({ productId, productName, price }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Check if user has account
    let userId = localStorage.getItem('userId');
    
    if (!userId) {
      // Prompt user to create account
      const email = prompt('Create account to save your cart! Enter your email:');
      if (!email) {
        setIsAdding(false);
        return;
      }
      
      // Quick register
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name: 'Customer' })
        });
        
        const result = await response.json();
        if (result.success) {
          userId = result.user.id;
          localStorage.setItem('userId', userId || '');
        }
      } catch (error) {
        alert('Please create an account first!');
        setIsAdding(false);
        return;
      }
    }

    // Add to cart
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity: 1 })
      });
      
      alert(`Added ${productName} to cart! 🛒`);
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 w-full"
    >
      {isAdding ? 'Adding...' : 'Add to Cart 🛒'}
    </button>
  );
}
