# Vanam Wellness - Production-Ready E-commerce Website

A modern, production-ready e-commerce website for Vanam Wellness, featuring comprehensive analytics tracking, performance monitoring, and SEO optimization.

## 🚀 Features

### Analytics & Tracking
- **Google Analytics 4 (GA4)** - Complete e-commerce tracking with enhanced events
- **Facebook Pixel** - Social media conversion tracking and retargeting
- **Hotjar** - User behavior analytics, heatmaps, and session recordings
- **Sentry** - Error tracking and performance monitoring
- **Core Web Vitals** - Real-time performance metrics tracking

### SEO Optimization
- **Structured Data** - JSON-LD schema markup for products and organization
- **Enhanced Meta Tags** - Open Graph, Twitter Cards, and comprehensive metadata
- **Sitemap.xml** - Search engine indexing optimization
- **Robots.txt** - Crawler instructions and sitemap reference
- **Canonical URLs** - Duplicate content prevention

### Security & Performance
- **Security Headers** - CSP, XSS protection, and HTTPS enforcement
- **Performance Optimization** - Compression, caching, and CDN-ready configuration
- **Image Optimization** - WebP/AVIF support and responsive images
- **Production Build** - Optimized bundles with tree shaking

### User Experience
- **OTP Authentication** - Secure login with mobile/email verification
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Built with Radix UI and shadcn/ui
- **Loading States** - Smooth user interactions and feedback

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **TypeScript**: Full type safety
- **Analytics**: GA4, Facebook Pixel, Hotjar, Sentry
- **Performance**: Web Vitals, Core Web Vitals tracking
- **SEO**: Structured data, meta tags, sitemap

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Frontendsingle
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789
NEXT_PUBLIC_HOTJAR_ID=1234567
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# App Configuration
NEXT_PUBLIC_APP_URL=https://vanamwellness.com
NODE_ENV=production
```

5. Run the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## 🔧 Configuration

### Analytics Setup

#### Google Analytics 4
1. Create a GA4 property in Google Analytics
2. Copy the Measurement ID (G-XXXXXXXXXX)
3. Add it to `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your environment variables

#### Facebook Pixel
1. Create a Facebook Pixel in Facebook Business Manager
2. Copy the Pixel ID
3. Add it to `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` in your environment variables

#### Hotjar
1. Create a Hotjar account and site
2. Copy the Site ID
3. Add it to `NEXT_PUBLIC_HOTJAR_ID` in your environment variables

#### Sentry
1. Create a Sentry project
2. Copy the DSN
3. Add it to `NEXT_PUBLIC_SENTRY_DSN` in your environment variables

### SEO Configuration

#### Structured Data
The website automatically includes:
- Organization schema for company information
- Product schema for e-commerce items
- Website schema for search functionality

#### Meta Tags
Comprehensive meta tags are configured in `app/layout.tsx` including:
- Open Graph tags for social sharing
- Twitter Card tags
- SEO-optimized titles and descriptions

### Security Headers

Security headers are configured in `next.config.js`:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Strict Transport Security (HSTS)
- Referrer Policy

## 📊 Analytics Events

### Google Analytics Events
- `page_view` - Automatic page tracking
- `view_item` - Product page views
- `add_to_cart` - Add to cart actions
- `begin_checkout` - Checkout initiation
- `purchase` - Completed purchases
- `login` - User authentication
- `sign_up` - User registration

### Facebook Pixel Events
- `PageView` - Page visits
- `ViewContent` - Product views
- `AddToCart` - Cart additions
- `InitiateCheckout` - Checkout starts
- `Purchase` - Completed orders
- `Lead` - Lead generation

### Hotjar Events
- `product_page_view` - Product page visits
- `checkout_start` - Checkout initiation
- `form_submission` - Form completions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `out` folder (static export)
3. Configure environment variables on your platform

## 📈 Performance Monitoring

### Core Web Vitals
The website tracks all Core Web Vitals metrics:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

### Performance Optimization
- Image optimization with WebP/AVIF
- Code splitting and lazy loading
- Compression and caching headers
- CDN-ready static assets

## 🔒 Security Features

- Content Security Policy (CSP)
- XSS Protection
- Clickjacking prevention
- HTTPS enforcement
- Secure headers configuration

## 📱 Mobile Optimization

- Responsive design with mobile-first approach
- Touch-friendly interactions
- Optimized images for different screen sizes
- Fast loading on mobile networks

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For support and questions, contact the development team.

---

**Built with ❤️ for Vanam Wellness**