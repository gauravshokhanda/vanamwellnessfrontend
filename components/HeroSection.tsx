"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Zap, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/herovideo/herovideo.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content Wrapper */}
      <div className="w-full py-20 relative z-20 flex justify-start">
        <div className="max-w-4xl text-white text-left pl-8 md:pl-16 lg:pl-24">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/Logo/logo.jpg"
              alt="Vanam Wellness Logo"
              width={64}
              height={64}
              className="mb-6"
            />
          </div>

          {/* Hero Text */}
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center bg-[#22c55e]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Zap className="w-4 h-4 text-[#22c55e] mr-2" />
                <span className="text-sm font-semibold text-white">
                  LIMITED TIME OFFER
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold uppercase leading-tight mb-4">
                <span className="text-[#22c55e]">SUPERCHARGED</span>
                <br />
                <span className="text-white">PLANT POWER</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Clean, Plant-Powered Energy to Crush Your Workout.
                <br />
                No jitters, no crash — just pure, sustained energy.
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#d4af37] fill-current"
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-200">
                4.9/5 from 2,847+ reviews
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/checkout"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 w-fit"
              >
                BUY NOW - ₹1,999
              </Link>
              <Link
                href="/product/supercharged"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all w-fit"
              >
                LEARN MORE
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center max-w-md">
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 text-[#22c55e] mb-2" />
                <span className="text-sm font-semibold text-gray-200">
                  100% Natural
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-6 h-6 text-[#22c55e] mb-2" />
                <span className="text-sm font-semibold text-gray-200">
                  No Crash
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="w-6 h-6 text-[#22c55e] mb-2" />
                <span className="text-sm font-semibold text-gray-200">
                  Heart Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
