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
      <section className="bg-cream pb-10 pt-[118px] sm:pb-14 sm:pt-[136px]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-dark">
              Find your packaging
            </span>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              Everything your brand needs to look consistent.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Browse labels, tags, cards, bags and shipping essentials. Choose available options or request a custom bulk quote.
            </p>
          </ScrollReveal>
          <HairlineDivider className="mt-10" />
        </div>
      </section>

      {/* Filter + Grid */}
      <Section className="pt-7 sm:pt-10">
        {/* Category Filter */}
        <div className="flex gap-2.5 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'shrink-0 rounded-full border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 sm:px-6',
              activeCategory === null
                ? 'border-charcoal bg-charcoal text-warm-white'
                : 'border-sage/30 bg-warm-white text-charcoal hover:border-sage'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'shrink-0 rounded-full border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 sm:px-6',
                activeCategory === cat
                  ? 'border-charcoal bg-charcoal text-warm-white'
                  : 'border-sage/30 bg-warm-white text-charcoal hover:border-sage'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
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
