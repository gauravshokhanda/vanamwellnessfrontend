'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import Testimonials from '@/components/Testimonials';
import StickyBuyBar from '@/components/StickyBuyBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BenefitsGrid />
      <Testimonials />
      <StickyBuyBar />
      <Footer />
    </main>
  );
}