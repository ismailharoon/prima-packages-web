import type { Metadata } from 'next'
import { products, getProductBySlug } from '@/data/products'
import { notFound } from 'next/navigation'
import { ProductDetail } from './product-detail'

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata(
  props: PageProps<'/products/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default async function ProductPage(
  props: PageProps<'/products/[slug]'>
) {
  const { slug } = await props.params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} allProducts={products} />
}
