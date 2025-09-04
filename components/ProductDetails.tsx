'use client';

import { Star, Truck, Shield, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetails() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-4 text-[#004d26]">
          SUPERCHARGED
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Premium plant-based energy supplement crafted with 8 powerful superfoods 
          for sustained energy, immunity, and peak performance.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-[#d4af37] fill-current" />
          ))}
        </div>
        <span className="text-gray-600">4.9/5 (2,847+ reviews)</span>
      </div>

      <div className="bg-[#d4af37]/10 p-6 rounded-2xl">
        <div className="text-center">
          <div className="text-sm text-gray-600 line-through mb-1">MRP: ₹2,499</div>
          <div className="text-3xl font-bold text-[#004d26] mb-2">₹1,999</div>
          <div className="text-[#d4af37] font-semibold">SAVE ₹500 TODAY!</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-[#22c55e]" />
          <span>Free shipping on orders above ₹1,500</span>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-[#22c55e]" />
          <span>100% money-back guarantee</span>
        </div>
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-5 h-5 text-[#22c55e]" />
          <span>30-day return policy</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20">
            <option>1 Bottle (30 servings)</option>
            <option>2 Bottles (60 servings) - Save 10%</option>
            <option>3 Bottles (90 servings) - Save 15%</option>
          </select>
        </div>

        <Link href="/checkout" className="btn-primary w-full text-center block">
          BUY NOW - ₹1,999
        </Link>
      </div>

      <div className="bg-[#f0fdf4] p-6 rounded-2xl">
        <h3 className="font-bold text-[#004d26] mb-2">⚡ Limited Time Offer</h3>
        <p className="text-sm text-gray-600">
          Only 47 bottles left at this price. Offer expires in 23:45:12
        </p>
      </div>
    </div>
  );
}