import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

const SITE_URL = 'https://www.primapackages.pk'

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITE_URL}/images/products/hero-suite.jpg`],
    },
    {
      url: `${SITE_URL}/catalog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    changeFrequency: 'monthly',
    priority: product.slug === 'woven-labels' ? 0.95 : 0.8,
    images: product.gallery.map((image) => `${SITE_URL}${image}`),
  }))

  const regionalPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/custom-packaging-karachi`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/custom-packaging-lahore`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/custom-packaging-faisalabad`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/custom-packaging-sialkot`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return [...corePages, ...productPages, ...regionalPages]
}
