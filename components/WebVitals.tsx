'use client';

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface WebVitalsProps {
  gaId?: string;
}

export default function WebVitals({ gaId }: WebVitalsProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Send Core Web Vitals to Google Analytics
      const sendToGoogleAnalytics = ({ name, delta, value, id }: any) => {
        if (window.gtag && gaId) {
          window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            non_interaction: true,
          });
        }
      };

      // Send to console for development
      const sendToConsole = ({ name, delta, value, id }: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Web Vitals] ${name}:`, {
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            id,
            delta
          });
        }
      };

      // Send to custom analytics endpoint (optional)
      const sendToAnalytics = ({ name, delta, value, id }: any) => {
        const body = JSON.stringify({
          name,
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          id,
          url: window.location.href,
          timestamp: Date.now()
        });

        // Send to your analytics endpoint
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/analytics/web-vitals', body);
        } else {
          fetch('/api/analytics/web-vitals', {
            method: 'POST',
            body,
            headers: {
              'Content-Type': 'application/json'
            },
            keepalive: true
          }).catch(console.error);
        }
      };

      // Combine all reporting functions
      const reportWebVitals = (metric: any) => {
        sendToGoogleAnalytics(metric);
        sendToConsole(metric);
        // Uncomment to send to custom analytics
        // sendToAnalytics(metric);
      };

      // Measure Core Web Vitals
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);

      // Performance Observer for additional metrics
      if ('PerformanceObserver' in window) {
        try {
          // Observe navigation timing
          const navObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'navigation') {
                const navEntry = entry as PerformanceNavigationTiming;
                const metrics = {
                  dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
                  tcp: navEntry.connectEnd - navEntry.connectStart,
                  ssl: navEntry.connectEnd - navEntry.secureConnectionStart,
                  ttfb: navEntry.responseStart - navEntry.requestStart,
                  download: navEntry.responseEnd - navEntry.responseStart,
                  domParse: navEntry.domContentLoadedEventStart - navEntry.responseEnd,
                  domReady: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                  loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart
                };

                if (window.gtag && gaId) {
                  Object.entries(metrics).forEach(([key, value]) => {
                    if (value > 0) {
                      window.gtag('event', 'timing_complete', {
                        name: key,
                        value: Math.round(value),
                        event_category: 'Navigation Timing'
                      });
                    }
                  });
                }

                if (process.env.NODE_ENV === 'development') {
                  console.log('[Navigation Timing]', metrics);
                }
              }
            }
          });
          navObserver.observe({ entryTypes: ['navigation'] });

          // Observe resource timing for critical resources
          const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const resourceEntry = entry as PerformanceResourceTiming;
              
              // Track slow resources (>1s)
              if (resourceEntry.duration > 1000) {
                if (window.gtag && gaId) {
                  window.gtag('event', 'slow_resource', {
                    event_category: 'Performance',
                    event_label: resourceEntry.name,
                    value: Math.round(resourceEntry.duration)
                  });
                }

                if (process.env.NODE_ENV === 'development') {
                  console.warn('[Slow Resource]', resourceEntry.name, `${Math.round(resourceEntry.duration)}ms`);
                }
              }
            }
          });
          resourceObserver.observe({ entryTypes: ['resource'] });

        } catch (error) {
          console.warn('Performance Observer not supported:', error);
        }
      }
    }
  }, [gaId]);

  return null;
}

// Utility functions for manual performance tracking
export const trackCustomMetric = (name: string, value: number, category = 'Custom Metrics') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'custom_metric', {
      event_category: category,
      event_label: name,
      value: Math.round(value)
    });
  }
};

export const trackPageLoadTime = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      trackCustomMetric('page_load_time', loadTime, 'Performance');
    });
  }
};

export const trackUserTiming = (name: string, startTime?: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    if (startTime) {
      const duration = performance.now() - startTime;
      trackCustomMetric(name, duration, 'User Timing');
      return duration;
    } else {
      return performance.now();
    }
  }
  return 0;
};