'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'
import { useReviews } from '@/lib/reviews-storage'

export function ProductCard({ product }: { product: Product; index?: number }) {
  const isOutOfStock = product.slug === 'carry-bags' || product.discountBadge === 'Out of Stock'
  const size = product.sizes.reduce(
    (lowest, current) => (current.price < lowest.price ? current : lowest),
    product.sizes[0]
  )
  const { summary: reviewSummary } = useReviews(product.slug)

  return (
    <article className="group flex flex-col bg-transparent border-0 shadow-none pb-12 sm:pb-0 border-b sm:border-b-0 border-[#E2E7DB] last:border-b-0 last:pb-0">
      {/* Clean Photo Frame - 90 Degree Sharp Corners & White Canvas */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square bg-white rounded-none border border-[#EAEFE5] overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 290px"
          className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </Link>

      {/* Content */}
      <div className="pt-3.5 flex flex-col items-center text-center flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-charcoal group-hover:text-emerald-800 transition-colors">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Rating and review count (only if verified reviews exist) */}
        {reviewSummary.total > 0 && (
          <div className="flex items-center gap-1.5 mt-1 mb-1">
            <div className="flex text-amber-400 text-xs leading-none">
              {'★'.repeat(Math.round(reviewSummary.average))}
              <span className="text-charcoal/20">{'★'.repeat(5 - Math.round(reviewSummary.average))}</span>
            </div>
            <span className="text-xs font-semibold text-charcoal">
              {reviewSummary.average.toFixed(1)}
            </span>
            <span className="text-xs text-charcoal/60">
              ({reviewSummary.total} {reviewSummary.total === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}

        <div className="mt-1 text-xs sm:text-sm font-normal text-charcoal">
          {isOutOfStock ? (
            <span className="text-neutral-500 font-medium text-xs">
              Currently Out of Stock
            </span>
          ) : product.quoteOnly ? (
            <span className="font-medium text-xs text-charcoal/80">Custom Quote</span>
          ) : (
            <span>
              Starting from <span className="font-semibold text-charcoal">{formatPrice(size.price)}</span>
              {size.quantity && <span className="text-xs text-charcoal/65"> / {size.quantity}</span>}
            </span>
          )}
        </div>

        {product.shortDescription && (
          <p className="mt-1 text-xs text-[#5D6B60] max-w-sm line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-2.5 rounded-full bg-sage hover:bg-sage-dark active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <span>{isOutOfStock ? 'Inquire on WhatsApp' : product.quoteOnly ? 'Customize Now' : 'Shop Now'}</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
