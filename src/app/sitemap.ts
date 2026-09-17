import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

const SITE_URL = 'https://www.primapackages.pk'

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITE_URL}/images/products/hero-suite.jpg`],
    },
    {
      url: `${SITE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: product.slug === 'woven-labels' ? 0.95 : 0.8,
    images: product.gallery.map((image) => `${SITE_URL}${image}`),
  }))

  return [...corePages, ...productPages]
}
