import type { Metadata } from 'next'
import { products, getAllCategories } from '@/data/products'
import { CatalogClient } from './catalog-client'

export const metadata: Metadata = {
  title: 'Custom Packaging Products Pakistan',
  description: 'Browse custom woven labels, hang tags, zipper bags, courier flyers, butter paper, carry bags, cards and stickers with delivery across Pakistan.',
  keywords: [
    'custom packaging products Pakistan',
    'packaging supplier Karachi',
    'clothing packaging Pakistan',
    'ecommerce packaging supplier',
    'custom branded packaging',
  ],
  alternates: {
    canonical: '/catalog',
  },
  openGraph: {
    title: 'Custom Packaging Products Pakistan | Prima Packages',
    description: 'Labels, tags, bags, cards, stickers and custom packaging for Pakistani brands.',
    url: '/catalog',
    type: 'website',
  },
}

export default async function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
  const categories = getAllCategories()
  const { category, q } = await searchParams
  const query = typeof q === 'string' ? q.trim().slice(0, 80) : ''
  const activeCategory = typeof category === 'string' && categories.includes(category)
    ? category
    : null
  const filteredProducts = products.filter(product =>
    (!activeCategory || product.category === activeCategory) &&
    (!query || `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(query.toLowerCase()))
  )

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.primapackages.pk/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catalog',
        item: 'https://www.primapackages.pk/catalog'
      }
    ]
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Custom Packaging Products',
    numberOfItems: filteredProducts.length,
    itemListElement: filteredProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.primapackages.pk/products/${product.slug}`,
      name: product.name
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c') }}
      />
      <CatalogClient products={filteredProducts} categories={categories} activeCategory={activeCategory} query={query} />
    </>
  )
}
