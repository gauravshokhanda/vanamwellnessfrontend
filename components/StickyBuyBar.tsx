'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function StickyBuyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-[#004d26] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold">Supercharged</div>
            <div className="text-[#d4af37] font-semibold">₹1,999 (Save ₹500)</div>
          </div>
          <Link 
            href="/checkout"
            className="bg-[#d4af37] text-[#004d26] px-6 py-3 rounded-xl font-bold flex items-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}