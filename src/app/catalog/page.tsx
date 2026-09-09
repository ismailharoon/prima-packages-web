import type { Metadata } from 'next'
import { products, getAllCategories } from '@/data/products'
import { CatalogClient } from './catalog-client'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Explore our full range of premium custom packaging products: labels, tags, cards, stickers, and more.',
}

export default function CatalogPage() {
  const categories = getAllCategories()
  return <CatalogClient products={products} categories={categories} />
}
