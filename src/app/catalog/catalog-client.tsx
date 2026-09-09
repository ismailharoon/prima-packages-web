'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ProductCard } from '@/components/ui/ProductCard'
import { HairlineDivider } from '@/components/ui/HairlineDivider'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/products'

interface CatalogClientProps {
  products: Product[]
  categories: string[]
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-14 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              Shop All
            </span>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
              The Catalog
            </h1>
            <p className="mt-4 text-lg text-muted max-w-2xl">
              Explore our full range of premium custom packaging products, each crafted to elevate your brand.
            </p>
          </ScrollReveal>
          <HairlineDivider className="mt-10" />
        </div>
      </section>

      {/* Filter + Grid */}
      <Section className="pt-8">
        {/* Category Filter */}
        <div className="flex gap-2.5 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'shrink-0 px-5 sm:px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 border',
              activeCategory === null
                ? 'border-sage bg-sage text-warm-white'
                : 'border-sage/30 text-charcoal hover:border-sage'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'shrink-0 px-5 sm:px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 border',
                activeCategory === cat
                  ? 'border-sage bg-sage text-warm-white'
                  : 'border-sage/30 text-charcoal hover:border-sage'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
          {filtered.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted">No products found in this category.</p>
          </div>
        )}
      </Section>
    </>
  )
}
