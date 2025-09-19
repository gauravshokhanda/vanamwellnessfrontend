"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";

export default function NavbarClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, user, logout, login } = useAuth();
  const isHome = pathname === '/';

  const handleLogin = (userData: { email: string; mobile: string }) => {
    login(userData);
  };

  const linkClasses = isHome
    ? "text-white hover:text-[#22c55e] transition-colors"
    : "text-gray-700 hover:text-[#004d26] transition-colors";

  return (
    <>
      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm">{user?.email || user?.mobile}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className={
                isHome
                  ? "text-white hover:text-[#22c55e] hover:bg-white/10"
                  : "text-gray-700 hover:text-[#004d26]"
              }
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            onClick={() => setIsLoginModalOpen(true)}
            className={
              isHome
                ? "text-white hover:text-[#22c55e] hover:bg-white/10"
                : "text-gray-700 hover:text-[#004d26]"
            }
          >
            <User className="w-4 h-4 mr-1" />
            Login
          </Button>
        )}
        <Link
          href="/checkout"
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          BUY NOW
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden ${isHome ? "text-white" : "text-gray-700"}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`absolute top-16 left-0 w-full md:hidden py-4 border-t ${
            isHome
              ? "border-white/20 bg-black/70 backdrop-blur-md"
              : "border-gray-100 bg-white"
          } rounded-lg`}
        >
          <div
            className={`flex flex-col space-y-4 px-4 ${
              isHome ? "text-white" : "text-gray-700"
            }`}
          >
            <Link href="/" className={linkClasses}>
              Home
            </Link>
            <Link href="/products/organic-turmeric-powder" className={linkClasses}>
              Product
            </Link>
            <Link href="/blogs" className={linkClasses}>
              Blogs
            </Link>
            <Link href="/stories" className={linkClasses}>
              Stories
            </Link>
            <Link href="/journey-of-purity" className={linkClasses}>
              Journey of Purity
            </Link>

            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2 px-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">
                    {user?.email || user?.mobile}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-2 hover:text-[#22c55e]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 px-2 hover:text-[#22c55e]"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            <Link
              href="/checkout"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-center px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}