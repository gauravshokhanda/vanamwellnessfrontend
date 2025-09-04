import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import Analytics from '@/components/Analytics';
import FacebookPixel from '@/components/FacebookPixel';
import Hotjar from '@/components/Hotjar';
import Sentry from '@/components/Sentry';
import WebVitals from '@/components/WebVitals';
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/StructuredData';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vanam Wellness | Supercharged Plant-Based Energy Supplement',
  description: 'Clean, plant-powered energy supplement with Seabuckthorn, Moringa, Ashwagandha, and more. Fuel your body naturally with premium wellness products.',
  keywords: 'plant-based supplement, natural energy, ashwagandha, moringa, seabuckthorn, wellness, organic, ayurveda, fitness, health',
  authors: [{ name: 'Vanam Wellness' }],
  creator: 'Vanam Wellness',
  publisher: 'Vanam Wellness',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://vanamwellness.com',
    siteName: 'Vanam Wellness',
    title: 'Supercharged Energy, Backed by Nature',
    description: 'Clean, plant-powered energy supplement for peak performance. Premium wellness products crafted with nature\'s finest ingredients.',
    images: [
      {
        url: '/images/supercharged-bottle.jpg',
        width: 1200,
        height: 630,
        alt: 'Vanam Wellness Supercharged Energy Supplement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vanam Wellness | Supercharged Plant-Based Energy',
    description: 'Clean, plant-powered energy supplement with premium natural ingredients.',
    images: ['/images/supercharged-bottle.jpg'],
    creator: '@vanamwellness',
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const environment = process.env.NODE_ENV;

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL || 'https://vanamwellness.com'} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#004d26" />
        <meta name="msapplication-TileColor" content="#004d26" />
      </head>
      <body className="font-inter antialiased">
        <Analytics gaId={gaId} />
        <FacebookPixel pixelId={fbPixelId} />
        <Hotjar hotjarId={hotjarId} />
        <Sentry dsn={sentryDsn} environment={environment} />
        <WebVitals gaId={gaId} />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}