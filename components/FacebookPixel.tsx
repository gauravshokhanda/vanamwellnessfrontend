'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

interface FacebookPixelProps {
  pixelId?: string;
}

export default function FacebookPixel({ pixelId }: FacebookPixelProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && pixelId) {
      // Initialize Facebook Pixel
      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      window.fbq.l = +new Date();
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <Image
          height={1}
          width={1}
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="Facebook Pixel"
        />
      </noscript>
    </>
  );
}

// Facebook Pixel utility functions
export const trackFBEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

export const trackFBPurchase = (value: number, currency = 'INR') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency
    });
  }
};

export const trackFBAddToCart = (value: number, currency = 'INR', contentName?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      value: value,
      currency: currency,
      content_name: contentName
    });
  }
};

export const trackFBInitiateCheckout = (value: number, currency = 'INR') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: value,
      currency: currency
    });
  }
};

export const trackFBViewContent = (value: number, currency = 'INR', contentName?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      value: value,
      currency: currency,
      content_name: contentName
    });
  }
};

export const trackFBLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
};

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: {
      (...args: any[]): void;
      q?: any[];
      l?: number;
    };
  }
}