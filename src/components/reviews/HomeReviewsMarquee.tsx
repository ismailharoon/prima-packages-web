'use client'

import { useState } from 'react'
import { useReviews } from '@/lib/reviews-storage'
import { ReviewModal } from './ReviewModal'
import type { Review } from '@/data/reviews'

export function HomeReviewsMarquee() {
  const { allReviews, summary } = useReviews()
  const [modalOpen, setModalOpen] = useState(false)

  // Duplicate for seamless infinite loop (translateX: 0% to -50%)
  const loopTrack = [...allReviews, ...allReviews]

  // Calculate duration so speed is smooth and natural (~3.8s per card)
  const duration = Math.max(40, allReviews.length * 3.8)

  const renderCard = (r: Review, keyIdx: number) => (
    <article
      key={`${r.id}-${keyIdx}`}
      className="review-card-item select-none"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex text-amber-400 text-xs sm:text-sm">
          {'★'.repeat(r.rating)}
          <span className="text-charcoal/20">{'★'.repeat(5 - r.rating)}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 text-[9px] font-bold">
          ✓ Verified
        </span>
      </div>

      <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed line-clamp-3 mb-2.5">
        “{r.comment}”
      </p>

      <div className="mt-auto pt-2 border-t border-charcoal/5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-xs font-bold text-charcoal block truncate">
            {r.author}
          </span>
          <span className="text-[10px] sm:text-[11px] text-charcoal/60 font-medium block truncate">
            {r.brandName ? `${r.brandName} · ` : ''}{r.city || 'Pakistan'}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-sage-dark bg-sage/10 rounded-md px-2 py-0.5 shrink-0 max-w-[120px] truncate">
          {r.productName}
        </span>
      </div>
    </article>
  )

  return (
    <section className="py-8 sm:py-10 bg-[#FAF8F4] overflow-hidden border-y border-charcoal/5 my-4 sm:my-6" aria-label="Customer Reviews">
      <div className="store-shell mb-4 sm:mb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-emerald-700">VERIFIED CLIENT REVIEWS</p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <span className="text-xs sm:text-sm font-bold text-charcoal">
                {summary.average.toFixed(1)} / 5.0 Rating · {allReviews.length} Verified Reviews
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sage hover:bg-sage-dark px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-sage/20 transition-all hover:scale-105"
          >
            ★ Write a Review
          </button>
        </div>
      </div>

      {/* Single Continuous Scrolling Line of all reviews */}
      <div className="reviews-marquee-container py-1.5">
        <div
          className="reviews-track"
          style={{ animationDuration: `${duration}s` }}
        >
          {loopTrack.map((review, idx) => renderCard(review, idx))}
        </div>
      </div>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
