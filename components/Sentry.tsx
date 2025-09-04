'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface SentryProps {
  dsn?: string;
  environment?: string;
}

export default function Sentry({ dsn, environment = 'production' }: SentryProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && dsn) {
      // Initialize Sentry
      import('@sentry/browser').then((Sentry) => {
        Sentry.init({
          dsn: dsn,
          environment: environment,
          integrations: [
            new Sentry.BrowserTracing(),
          ],
          tracesSampleRate: 1.0,
          beforeSend(event) {
            // Filter out development errors
            if (environment === 'development') {
              return null;
            }
            return event;
          },
        });
      }).catch(() => {
        // Fallback if Sentry package is not installed
        console.warn('Sentry package not found. Install @sentry/browser for error tracking.');
      });
    }
  }, [dsn, environment]);

  if (!dsn) return null;

  return (
    <Script
      id="sentry-init"
      strategy="beforeInteractive"
      src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"
      onLoad={() => {
        if (window.Sentry && dsn) {
          window.Sentry.init({
            dsn: dsn,
            environment: environment,
            integrations: [
              new window.Sentry.BrowserTracing(),
            ],
            tracesSampleRate: 1.0,
          });
        }
      }}
    />
  );
}

// Sentry utility functions
export const captureException = (error: Error, context?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.Sentry) {
    if (context) {
      window.Sentry.withScope((scope) => {
        Object.keys(context).forEach(key => {
          scope.setTag(key, context[key]);
        });
        window.Sentry.captureException(error);
      });
    } else {
      window.Sentry.captureException(error);
    }
  }
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureMessage(message, level);
  }
};

export const setUserContext = (user: { id: string; email?: string; username?: string }) => {
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.setUser(user);
  }
};

export const addBreadcrumb = (message: string, category?: string, level?: string) => {
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.addBreadcrumb({
      message,
      category: category || 'custom',
      level: level as any || 'info',
    });
  }
};

// Declare Sentry for TypeScript
declare global {
  interface Window {
    Sentry: any;
  }
}