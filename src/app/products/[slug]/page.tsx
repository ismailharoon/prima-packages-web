import type { Metadata } from 'next'
import { products, getProductBySlug } from '@/data/products'
import { notFound } from 'next/navigation'
import { ProductDetail } from './product-detail'
import { productSeo } from '@/data/seo'

const SITE_URL = 'https://www.primapackages.pk'

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
  const seo = productSeo[slug]
  const canonicalUrl = `/products/${slug}`
  return {
    title: seo?.title || product.name,
    description: seo?.description || product.shortDescription,
    keywords: seo?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.title || product.name,
      description: seo?.description || product.shortDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: product.heroImage,
          alt: `${product.name} by Prima Packages`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || product.name,
      description: seo?.description || product.shortDescription,
      images: [product.heroImage],
    },
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

  const pricedSizes = product.sizes.filter((size) => size.price > 0)
  const prices = pricedSizes.map((size) => size.price)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: product.gallery.map((image) => `${SITE_URL}${image}`),
    brand: {
      '@type': 'Brand',
      name: 'Prima Packages',
    },
    category: product.category,
    url: `${SITE_URL}/products/${product.slug}`,
    ...(prices.length > 0
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'PKR',
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: pricedSizes.length,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/products/${product.slug}`,
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ProductDetail product={product} allProducts={products} />
    </>
  )
}
