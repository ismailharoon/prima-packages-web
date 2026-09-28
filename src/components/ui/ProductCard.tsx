import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'

export function ProductCard({ product }: { product: Product; index?: number }) {
  const size = product.sizes.reduce(
    (lowest, current) => (current.price < lowest.price ? current : lowest),
    product.sizes[0]
  )

  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-[#E6EADB] hover:border-[#CAD5BD] shadow-[0_2px_12px_rgba(20,35,24,0.03)] hover:shadow-[0_12px_32px_rgba(20,35,24,0.07)] transition-all duration-300 overflow-hidden">
      {/* Clean Uncluttered Photo Frame with Generous Breathing Room */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] bg-[#F2F4ED] overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 290px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </Link>

      {/* Card Content with Generous Whitespace */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#687D6B]">
          {product.category}
        </span>

        <h3 className="mt-1.5 text-sm sm:text-[15px] font-bold text-[#182C1E] leading-snug line-clamp-2 min-h-[40px] group-hover:text-emerald-800 transition-colors">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Price & Action Row */}
        <div className="mt-auto pt-4 border-t border-[#EEF2E8]">
          <div className="flex items-baseline justify-between gap-1">
            <div>
              <span className="block text-[10px] uppercase font-medium text-[#7C8B7F]">
                Starting from
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                {product.quoteOnly ? (
                  <strong className="text-base sm:text-lg font-extrabold text-[#1B3425]">
                    Custom Quote
                  </strong>
                ) : (
                  <>
                    <strong className="text-base sm:text-lg font-extrabold text-[#1B3425]">
                      {formatPrice(size.price)}
                    </strong>
                    {size.quantity && (
                      <span className="text-[10px] text-[#637466] font-medium">
                        / {size.quantity}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="mt-3.5 w-full flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 rounded-xl bg-[#203927] hover:bg-[#16271B] active:scale-[0.98] text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
          >
            <span>{product.quoteOnly ? 'Customize & Enquire' : 'Customize Options'}</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
