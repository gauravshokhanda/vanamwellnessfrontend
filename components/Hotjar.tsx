'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface HotjarProps {
  hotjarId?: string;
}

export default function Hotjar({ hotjarId }: HotjarProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && hotjarId) {
      // Initialize Hotjar
      (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
        h.hj = h.hj || function() {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
        h._hjSettings = { hjid: parseInt(hotjarId), hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    }
  }, [hotjarId]);

  if (!hotjarId) return null;

  return (
    <Script id="hotjar" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hotjarId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
}

// Hotjar utility functions
export const triggerHotjarEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('event', eventName);
  }
};

export const identifyHotjarUser = (userId: string, attributes?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('identify', userId, attributes);
  }
};

// Declare hj for TypeScript
declare global {
  interface Window {
    hj: (...args: any[]) => void;
  }
}