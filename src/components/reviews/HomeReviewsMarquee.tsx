'use client'

import { useState } from 'react'
import { useReviews } from '@/lib/reviews-storage'
import { ReviewModal } from './ReviewModal'
import type { Review } from '@/data/reviews'

export function HomeReviewsMarquee() {
  const { allReviews, summary } = useReviews()
  const [modalOpen, setModalOpen] = useState(false)

  // Split reviews into two distinct tracks for visual depth
  const mid = Math.ceil(allReviews.length / 2)
  const track1 = allReviews.slice(0, mid)
  const track2 = allReviews.slice(mid)

  // Duplicate for seamless infinite loop
  const loopTrack1 = [...track1, ...track1, ...track1]
  const loopTrack2 = [...track2, ...track2, ...track2]

  const renderCard = (r: Review, keyIdx: number) => (
    <article
      key={`${r.id}-${keyIdx}`}
      className="review-card-item select-none"
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex text-amber-400 text-sm">
          {'★'.repeat(r.rating)}
          <span className="text-charcoal/20">{'★'.repeat(5 - r.rating)}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 text-[9px] font-bold">
          ✓ Verified
        </span>
      </div>

      <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed line-clamp-3 mb-3">
        “{r.comment}”
      </p>

      <div className="mt-auto pt-2.5 border-t border-charcoal/5 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-charcoal block">
            {r.author}
          </span>
          <span className="text-[11px] text-charcoal/60 font-medium">
            {r.brandName ? `${r.brandName} · ` : ''}{r.city || 'Pakistan'}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-sage-dark bg-sage/10 rounded-md px-2 py-0.5 max-w-[120px] truncate">
          {r.productName}
        </span>
      </div>
    </article>
  )

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F4] overflow-hidden" aria-label="Customer Reviews">
      <div className="store-shell mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-emerald-700">LOVED BY 500+ BRANDS ACROSS PAKISTAN</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1.5">
              Client Reviews &amp; Experiences
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400 text-base">★★★★★</div>
              <span className="text-xs sm:text-sm font-semibold text-charcoal/75">
                {summary.average.toFixed(1)} / 5.0 Rating · Based on {allReviews.length} Verified Reviews
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal hover:bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-105"
            >
              ★ Leave a Review
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Track 1 (Left to Right) */}
      <div className="reviews-marquee-container py-2">
        <div className="reviews-track">
          {loopTrack1.map((review, idx) => renderCard(review, idx))}
        </div>
      </div>

      {/* Marquee Track 2 (Right to Left) */}
      <div className="reviews-marquee-container py-2 mt-2">
        <div className="reviews-track-reverse">
          {loopTrack2.map((review, idx) => renderCard(review, idx))}
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-charcoal/50">
        <span>Touch or hover over any review to pause scrolling.</span>
      </div>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
