'use client';

interface WhatsAppOrderButtonProps {
  productName: string;
  price: number;
}

export default function WhatsAppOrderButton({ productName, price }: WhatsAppOrderButtonProps) {
  const handleOrder = () => {
    const message = `Hello StationeryHub! I'd like to order:\n\nProduct: ${productName}\nPrice: P ${price.toFixed(2)}\n\nPlease contact me to complete the order.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '267XXXXXXXX'}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleOrder}
      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 w-full"
    >
      <span>📱</span>
      <span>Order via WhatsApp</span>
    </button>
  );
}
