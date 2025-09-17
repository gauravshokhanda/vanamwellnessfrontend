'use client';

import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#004d26] text-white">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="w-8 h-8 text-[#22c55e]" />
              <span className="font-space-grotesk font-bold text-xl">
                VANAM WELLNESS
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering your wellness journey with premium plant-based supplements 
              crafted from nature&apos;s finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-[#22c55e] transition-colors">Home</Link></li>
              <li><Link href="/product/supercharged" className="text-gray-300 hover:text-[#22c55e] transition-colors">Product</Link></li>
              <li><Link href="/blogs" className="text-gray-300 hover:text-[#22c55e] transition-colors">Blogs</Link></li>
              <li><Link href="/stories" className="text-gray-300 hover:text-[#22c55e] transition-colors">Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">SUPPORT</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-[#22c55e] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#22c55e] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#22c55e] transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#22c55e] transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">CONTACT</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-[#22c55e]" />
                support@vanamwellness.com
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-[#22c55e]" />
                +91 98765 43210
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-[#22c55e]" />
                Mumbai, India
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#22c55e]/20">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
            <div>
              © 2025 Vanam Wellness. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-[#22c55e] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#22c55e] transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-[#22c55e] transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}