import type { Metadata } from 'next'
import { REGIONAL_CITIES } from '@/data/regional'
import { products } from '@/data/products'
import { CityLandingView } from '@/components/regional/CityLandingView'

const city = REGIONAL_CITIES.sialkot

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  keywords: city.keywords,
  alternates: {
    canonical: `/${city.slug}`,
  },
  openGraph: {
    title: city.metaTitle,
    description: city.metaDescription,
    url: `https://www.primapackages.pk/${city.slug}`,
    siteName: 'Prima Packages',
    images: [{ url: '/images/products/hero-suite.jpg', width: 1200, height: 900 }],
  },
}

export default function CustomPackagingSialkotPage() {
  const featuredProducts = products.filter((p) =>
    city.featuredProductSlugs.includes(p.slug)
  )

  const regionalJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Prima Packages - Custom Packaging & Sportswear Labels ${city.cityName}`,
    description: city.metaDescription,
    url: `https://www.primapackages.pk/${city.slug}`,
    telephone: '+92 323 3231712',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop B-52, Ground Floor, Karim Center, Saddar',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    areaServed: [
      { '@type': 'City', name: 'Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regionalJsonLd).replace(/</g, '\\u003c') }}
      />
      <CityLandingView city={city} products={featuredProducts} />
    </>
  )
}
