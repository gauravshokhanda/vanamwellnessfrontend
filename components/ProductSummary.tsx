'use client';

import { Star, Shield, Zap, Heart } from 'lucide-react';

export default function ProductSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-fit">
      {/* Product Image */}
      <div className="relative">
        <img 
          src="/Logo/logo.jpg" 
          alt="Supercharged Plant Power" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-bold">
            LIMITED TIME OFFER
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#004d26] mb-2">
          SUPERCHARGED PLANT POWER
        </h2>
        <p className="text-gray-600 mb-4">
          Clean, Plant-Powered Energy to Crush Your Workout. No jitters, no crash — just pure, sustained energy.
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#d4af37] fill-current" />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">4.9/5 from 2,847+ reviews</span>
        </div>

        {/* Key Benefits */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-[#004d26] mb-3">Key Benefits:</h3>
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-[#22c55e] mr-3" />
            <span className="text-sm text-gray-700">100% Natural Ingredients</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-[#22c55e] mr-3" />
            <span className="text-sm text-gray-700">No Crash or Jitters</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-[#22c55e] mr-3" />
            <span className="text-sm text-gray-700">Heart Healthy Formula</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-[#f0fdf4] p-4 rounded-xl">
          <div className="text-center">
            <div className="text-sm text-gray-600 line-through mb-1">₹2,499</div>
            <div className="text-2xl font-bold text-[#004d26] mb-1">₹1,999</div>
            <div className="text-sm text-[#22c55e] font-semibold">Save ₹500 (20% OFF)</div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-[#004d26]">30-Day Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}