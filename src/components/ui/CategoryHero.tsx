import Image from 'next/image'
import type { Product } from '@/data/products'
import { HairlineDivider } from './HairlineDivider'

interface CategoryHeroProps {
  product: Product
}

export function CategoryHero({ product }: CategoryHeroProps) {
  return (
    <div className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:min-h-[64vh] lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-[4/3] min-h-[300px] sm:min-h-[420px] lg:aspect-auto lg:min-h-full">
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
          <div className="flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-24">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              {product.category}
            </span>
            <h1 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <HairlineDivider className="my-6" />
            <p className="max-w-lg text-base leading-7 text-muted sm:text-lg">
              {product.shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
