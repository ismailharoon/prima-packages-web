import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'
import { getProductRatingSummary } from '@/data/reviews'

export function ProductCard({ product }: { product: Product; index?: number }) {
  const size = product.sizes.reduce(
    (lowest, current) => (current.price < lowest.price ? current : lowest),
    product.sizes[0]
  )
  const reviewSummary = getProductRatingSummary(product.slug)

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

      {/* Content - aprints.pk-style Centered Flow */}
      <div className="pt-4 flex flex-col items-center text-center flex-1">
        <h3 className="text-base sm:text-[17px] font-extrabold text-[#182C1E] tracking-wider uppercase group-hover:text-emerald-800 transition-colors">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Rating and review count */}
        <div className="flex items-center gap-1.5 mt-1.5 mb-1">
          <div className="flex text-amber-400 text-xs leading-none">
            {'★'.repeat(Math.round(reviewSummary.average))}
          </div>
          <span className="text-xs font-extrabold text-[#182C1E]">
            {reviewSummary.average.toFixed(1)}
          </span>
          <span className="text-xs text-[#5D6B60] font-medium">
            ({reviewSummary.total} {reviewSummary.total === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        <div className="mt-1 text-sm font-semibold text-[#182C1E]">
          {product.quoteOnly ? (
            <span>Custom Quote</span>
          ) : (
            <span>
              Starting from <strong className="font-extrabold">{formatPrice(size.price)}</strong>
              {size.quantity && <span className="font-medium text-xs text-[#5D6B60]"> / {size.quantity}</span>}
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
            <span>{product.quoteOnly ? 'Customize Now' : 'Shop Now'}</span>
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
