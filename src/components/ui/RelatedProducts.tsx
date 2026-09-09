'use client'

import { useRef } from 'react'
import type { Product } from '@/data/products'
import { ProductCard } from './ProductCard'
import { HairlineDivider } from './HairlineDivider'

interface RelatedProductsProps {
  products: Product[]
  currentSlug: string
}

export function RelatedProducts({ products, currentSlug }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = products.filter((p) => p.slug !== currentSlug)

  if (filtered.length === 0) return null

  return (
    <div>
      <HairlineDivider ornament className="my-12" />
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
          Explore More
        </span>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl text-charcoal">
          Related Products
        </h2>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible"
      >
        {filtered.slice(0, 4).map((product, index) => (
          <div
            key={product.slug}
            className="min-w-[280px] snap-start md:min-w-0"
          >
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}
