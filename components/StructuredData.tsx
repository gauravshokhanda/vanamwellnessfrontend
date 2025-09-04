'use client';

import Script from 'next/script';

interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand: string;
  sku?: string;
  gtin?: string;
}

interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

interface StructuredDataProps {
  type: 'product' | 'organization' | 'website';
  data: Product | Organization | any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vanamwellness.com';
    
    switch (type) {
      case 'product':
        const product = data as Product;
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: `${baseUrl}${product.image}`,
          brand: {
            '@type': 'Brand',
            name: product.brand
          },
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: product.currency,
            availability: `https://schema.org/${product.availability}`,
            url: baseUrl,
            seller: {
              '@type': 'Organization',
              name: 'Vanam Wellness'
            }
          },
          ...(product.sku && { sku: product.sku }),
          ...(product.gtin && { gtin: product.gtin })
        };

      case 'organization':
        const org = data as Organization;
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: org.name,
          url: org.url,
          logo: org.logo,
          description: org.description,
          ...(org.contactPoint && {
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: org.contactPoint.telephone,
              contactType: org.contactPoint.contactType,
              ...(org.contactPoint.email && { email: org.contactPoint.email })
            }
          }),
          ...(org.sameAs && { sameAs: org.sameAs })
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Vanam Wellness',
          url: baseUrl,
          description: 'Premium plant-based wellness supplements for natural energy and health',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Vanam Wellness',
            logo: `${baseUrl}/images/logo.png`
          }
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}

// Pre-configured structured data components
export function ProductStructuredData({
  name = 'Supercharged Plant-Based Energy Supplement',
  description = 'Premium plant-powered energy supplement with Seabuckthorn, Moringa, Ashwagandha, and more natural ingredients.',
  image = '/images/supercharged-bottle.jpg',
  price = 2999,
  currency = 'INR',
  availability = 'InStock' as const,
  brand = 'Vanam Wellness',
  sku,
  gtin
}: Partial<Product> = {}) {
  return (
    <StructuredData
      type="product"
      data={{
        name,
        description,
        image,
        price,
        currency,
        availability,
        brand,
        sku,
        gtin
      }}
    />
  );
}

export function OrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vanamwellness.com';
  
  return (
    <StructuredData
      type="organization"
      data={{
        name: 'Vanam Wellness',
        url: baseUrl,
        logo: `${baseUrl}/images/logo.png`,
        description: 'Premium plant-based wellness supplements for natural energy and optimal health',
        contactPoint: {
          telephone: '+91-XXXXXXXXXX',
          contactType: 'Customer Service',
          email: 'support@vanamwellness.com'
        },
        sameAs: [
          process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/vanamwellness',
          process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/vanamwellness',
          process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/vanamwellness'
        ]
      }}
    />
  );
}

export function WebsiteStructuredData() {
  return <StructuredData type="website" data={{}} />;
}