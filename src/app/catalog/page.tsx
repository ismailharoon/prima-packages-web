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

export default function CatalogPage() {
  const categories = getAllCategories()
  return <CatalogClient products={products} categories={categories} />
}
