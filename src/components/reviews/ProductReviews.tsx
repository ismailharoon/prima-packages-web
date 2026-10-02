'use client'

import { useState } from 'react'
import type { Product } from '@/data/products'
import { useReviews } from '@/lib/reviews-storage'
import { ReviewModal } from './ReviewModal'

export function ProductReviews({ product }: { product: Product }) {
  const { reviews, summary } = useReviews(product.slug)
  const [modalOpen, setModalOpen] = useState(false)
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({})

  const toggleHelpful = (id: string) => {
    setHelpfulMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  return (
    <section className="store-shell shop-section" aria-label="Customer Reviews">
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-10 shadow-sm">
        {/* Header / Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-charcoal/10">
          <div>
            <p className="eyebrow">VERIFIED CLIENT FEEDBACK</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight mt-1">
              Customer Reviews
            </h2>
            <p className="text-sm text-charcoal/70 mt-1">
              Real feedback from apparel brands and businesses across Pakistan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {summary.total > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-charcoal">
                  {summary.average.toFixed(1)}
                </span>
                <div>
                  <div className="flex text-amber-400 text-lg leading-none">
                    {'★'.repeat(Math.round(summary.average))}
                    <span className="text-charcoal/20">{'★'.repeat(5 - Math.round(summary.average))}</span>
                  </div>
                  <span className="text-xs font-medium text-charcoal/60 mt-1 block">
                    Based on {summary.total} {summary.total === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sage hover:bg-sage-dark px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-sage/20 transition-all"
            >
              ★ Write a Review
            </button>
          </div>
        </div>

        {/* Rating Breakdown Bar */}
        {summary.total > 0 && (
          <div className="pt-6 pb-8 grid grid-cols-1 sm:grid-cols-5 gap-3 border-b border-charcoal/10">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = summary.breakdown[stars] || 0
              const percentage = summary.total > 0 ? (count / summary.total) * 100 : 0
              return (
                <div key={stars} className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-charcoal/75 w-8">{stars} ★</span>
                  <div className="flex-1 h-2 rounded-full bg-charcoal/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-charcoal/50 w-6 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Reviews List */}
        <div className="mt-8 space-y-6">
          {reviews.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-charcoal/60 text-sm">No reviews yet for {product.name}.</p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-3 text-xs font-bold uppercase tracking-wider text-sage hover:underline"
              >
                Be the first to review this product →
              </button>
            </div>
          ) : (
            reviews.map(review => {
              const helpfulCount = helpfulMap[review.id] || 0
              return (
                <article
                  key={review.id}
                  className="rounded-xl border border-charcoal/8 bg-[#FAF8F4] p-5 sm:p-6 transition-all hover:border-charcoal/15"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        {'★'.repeat(review.rating)}
                        <span className="text-charcoal/20">{'★'.repeat(5 - review.rating)}</span>
                      </div>
                      <span className="text-xs font-extrabold text-charcoal">{review.author}</span>
                      {review.brandName && (
                        <span className="text-xs text-charcoal/65 font-medium">
                          · {review.brandName}
                        </span>
                      )}
                      {review.city && (
                        <span className="text-xs text-charcoal/50 font-normal">
                          ({review.city})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold">
                          ✓ Verified Client
                        </span>
                      )}
                      <span className="text-[11px] text-charcoal/50">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-charcoal/85">
                    {review.comment}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-charcoal/5 text-xs text-charcoal/60">
                    <span className="text-[11px]">Product: <strong>{review.productName}</strong></span>
                    <button
                      type="button"
                      onClick={() => toggleHelpful(review.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-charcoal/65 hover:text-charcoal transition-colors"
                    >
                      <span>👍 Helpful</span>
                      {helpfulCount > 0 && <span className="font-bold text-sage">({helpfulCount})</span>}
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProductSlug={product.slug}
      />
    </section>
  )
}
