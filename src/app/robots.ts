import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin-local'],
    },
    sitemap: 'https://www.primapackages.pk/sitemap.xml',
    host: 'https://www.primapackages.pk',
  }
}
