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
    <article className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#E7EBE4] hover:border-emerald-700/30 overflow-hidden hover:shadow-md transition-all p-2.5 sm:p-4">
      {/* Clean Studio Photo Canvas - White Background & Square Frame */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square bg-[#FAF8F5] rounded-lg sm:rounded-xl overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 290px"
          className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Low MOQ Tag */}
        {product.moq && (
          <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[9px] sm:text-[11px] font-bold text-emerald-800 px-1.5 py-0.5 rounded shadow-xs border border-emerald-100">
            {product.moq}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="pt-2 sm:pt-3 flex flex-col items-center text-center flex-1 justify-between">
        <div className="w-full">
          <h3 className="text-xs sm:text-sm font-semibold text-charcoal group-hover:text-emerald-800 transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Rating and review count (only if verified reviews exist) */}
          {reviewSummary.total > 0 && (
            <div className="flex items-center justify-center gap-1 mt-0.5 mb-1">
              <div className="flex text-amber-400 text-[10px] sm:text-xs leading-none">
                {'★'.repeat(Math.round(reviewSummary.average))}
                <span className="text-charcoal/20">{'★'.repeat(5 - Math.round(reviewSummary.average))}</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-charcoal">
                {reviewSummary.average.toFixed(1)}
              </span>
              <span className="text-[9px] sm:text-xs text-charcoal/60">
                ({reviewSummary.total})
              </span>
            </div>
          )}

          <div className="mt-1 text-[11px] sm:text-xs font-normal text-charcoal">
            {isOutOfStock ? (
              <span className="text-neutral-400 font-medium text-[10px] sm:text-xs">
                Currently Out of Stock
              </span>
            ) : product.quoteOnly ? (
              <span className="font-semibold text-charcoal/90">Custom Quote</span>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-[11px] text-charcoal/60">Starting from</span>
                <span className="font-bold text-xs sm:text-sm text-charcoal">
                  {formatPrice(size.price)}
                  {size.quantity && <span className="font-normal text-[10px] sm:text-xs text-charcoal/65"> / {size.quantity}</span>}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-2.5 sm:mt-3 w-full">
          <Link
            href={`/products/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 min-h-[34px] sm:min-h-[38px] px-2.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-sage hover:bg-sage-dark active:scale-[0.98] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
          >
            <span>{isOutOfStock ? 'Inquire' : product.quoteOnly ? 'Get Quote' : 'View Options'}</span>
            <svg
              className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
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
