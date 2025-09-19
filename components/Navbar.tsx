import Link from "next/link";
import { Leaf } from "lucide-react";
import NavbarClient from "@/components/NavbarClient";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-[#004d26]" />
            <span className="font-space-grotesk font-bold text-xl text-[#004d26]">
              VANAM WELLNESS
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#004d26] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="text-gray-700 hover:text-[#004d26] transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-[#004d26] transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products/organic-turmeric-powder"
              className="text-gray-700 hover:text-[#004d26] transition-colors"
            >
              Product
            </Link>
            <Link
              href="/stories"
              className="text-gray-700 hover:text-[#004d26] transition-colors"
            >
              Stories
            </Link>
            <Link
              href="/journey-of-purity"
              className="text-gray-700 hover:text-[#004d26] transition-colors"
            >
              Journey of Purity
            </Link>
          </div>

          {/* Client-side interactive components */}
          <NavbarClient />
        </div>
      </div>
    </nav>
  );
}
