import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/products'
import { HairlineDivider } from './HairlineDivider'

interface CategoryHeroProps {
  product: Product
}

export function CategoryHero({ product }: CategoryHeroProps) {
  return (
    <div className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          {/* Image Side */}
          <div className="relative aspect-[4/3] lg:aspect-auto min-h-[380px] lg:min-h-full">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              {product.category}
            </span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.1]">
              {product.name}
            </h1>
            <HairlineDivider className="my-6" />
            <p className="text-lg text-muted leading-relaxed max-w-lg">
              {product.shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
