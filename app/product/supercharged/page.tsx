'use client';

import Navbar from '@/components/Navbar';
import ProductGallery from '@/components/ProductGallery';
import ProductDetails from '@/components/ProductDetails';
import IngredientAccordion from '@/components/IngredientAccordion';
import FAQSection from '@/components/FAQSection';
import StickyBuyBar from '@/components/StickyBuyBar';
import Footer from '@/components/Footer';
import { ProductStructuredData } from '@/components/StructuredData';
import { trackGAEvent, trackGAViewItem } from '@/components/Analytics';
import { trackFBViewContent } from '@/components/FacebookPixel';
import { triggerHotjarEvent } from '@/components/Hotjar';
import { useEffect } from 'react';

export default function ProductPage() {
  useEffect(() => {
    // Track product page view
    trackGAViewItem({
      item_id: 'supercharged-supplement',
      item_name: 'Supercharged Plant-Based Energy Supplement',
      item_category: 'Supplements',
      price: 2999,
      currency: 'INR'
    });
    
    trackFBViewContent(2999, 'INR', 'Supercharged Plant-Based Energy Supplement');
    triggerHotjarEvent('product_page_view');
  }, []);

  return (
    <main className="min-h-screen">
      <ProductStructuredData
        name="Supercharged Plant-Based Energy Supplement"
        description="Premium plant-powered energy supplement with Seabuckthorn, Moringa, Ashwagandha, and more natural ingredients for sustained energy and wellness."
        image="/images/supercharged-bottle.jpg"
        price={2999}
        currency="INR"
        availability="InStock"
        brand="Vanam Wellness"
        sku="VW-SUPER-001"
      />
      <Navbar />
      <div className="section-container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <ProductGallery />
          <ProductDetails />
        </div>
      </div>
      <IngredientAccordion />
      <FAQSection />
      <StickyBuyBar />
      <Footer />
    </main>
  );
}