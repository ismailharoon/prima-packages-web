'use client'

import { useState, type FormEvent, useEffect } from 'react'
import { products } from '@/data/products'
import { submitReview } from '@/lib/reviews-storage'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  initialProductSlug?: string
  onReviewSubmitted?: () => void
}

export function ReviewModal({
  isOpen,
  onClose,
  initialProductSlug,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([initialProductSlug || products[0].slug])
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [author, setAuthor] = useState('')
  const [brandName, setBrandName] = useState('')
  const [city, setCity] = useState('')
  const [comment, setComment] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (initialProductSlug) {
      setSelectedSlugs([initialProductSlug])
    }
  }, [initialProductSlug])

  useEffect(() => {
    if (!isOpen) {
      setError('')
      setSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  function toggleProduct(slug: string) {
    setSelectedSlugs(prev => {
      if (prev.includes(slug)) {
        if (prev.length <= 1) return prev
        return prev.filter(s => s !== slug)
      } else {
        return [...prev, slug]
      }
    })
  }

  const ratingLabels = ['', 'Needs Improvement', 'Fair', 'Good Quality', 'Very Good', 'Excellent / Highly Recommended!']

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (selectedSlugs.length === 0) {
      setError('Please select at least one product.')
      return
    }
    if (!author.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!comment.trim() || comment.trim().length < 5) {
      setError('Please write at least a few words about your experience.')
      return
    }

    setBusy(true)
    try {
      const selectedProducts = products.filter(p => selectedSlugs.includes(p.slug))
      const combinedName = selectedProducts.map(p => p.name).join(', ')

      await submitReview({
        productSlug: selectedSlugs[0],
        productSlugs: selectedSlugs,
        productName: combinedName,
        author,
        brandName,
        city,
        rating,
        comment,
      })
      setSuccess(true)
      onReviewSubmitted?.()
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setComment('')
      }, 1600)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit review. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10 transition-colors"
          aria-label="Close review dialog"
        >
          ✕
        </button>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-charcoal">Review Published!</h3>
            <p className="mt-2 text-sm text-charcoal/70">
              Thank you for sharing your feedback. Your review is now visible across our store.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sage-dark">Customer Feedback</p>
              <h2 id="review-modal-title" className="text-xl sm:text-2xl font-extrabold text-charcoal">
                Write a Product Review
              </h2>
            </div>

            {/* Multi-Product Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Products In Your Order *
                </label>
                <span className="text-[11px] font-bold text-sage">
                  {selectedSlugs.length} {selectedSlugs.length === 1 ? 'product' : 'products'} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#FAF8F4] border border-charcoal/15 rounded-xl">
                {products.map(p => {
                  const isSelected = selectedSlugs.includes(p.slug)
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => toggleProduct(p.slug)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'bg-sage text-white font-semibold shadow-sm ring-1 ring-sage'
                          : 'bg-white text-charcoal/75 border border-charcoal/10 hover:border-charcoal/30 hover:bg-charcoal/5 font-medium'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-[10px]">{isSelected ? '✓' : '+'}</span>
                      <span>{p.name}</span>
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-charcoal/50 mt-1">
                Tap multiple products to include them in this review (e.g. Woven Labels + Zipper Bags + Hang Tags).
              </p>
            </div>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(star => {
                  const active = (hoverRating !== null ? hoverRating : rating) >= star
                  return (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl sm:text-3xl transition-transform hover:scale-110 focus:outline-none"
                      aria-label={`${star} star`}
                    >
                      <span className={active ? 'text-amber-400 drop-shadow-sm' : 'text-charcoal/20'}>
                        ★
                      </span>
                    </button>
                  )
                })}
                <span className="ml-2 text-xs font-semibold text-charcoal/75">
                  {ratingLabels[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Author Name & Brand Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="review-author" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                  Your Name *
                </label>
                <input
                  id="review-author"
                  type="text"
                  required
                  placeholder="e.g. Sara Qureshi"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
              <div>
                <label htmlFor="review-brand" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                  Brand Name (optional)
                </label>
                <input
                  id="review-brand"
                  type="text"
                  placeholder="e.g. Studio Bloom"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="review-city" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                City (optional)
              </label>
              <input
                id="review-city"
                type="text"
                placeholder="e.g. Karachi, Lahore, Faisalabad"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            {/* Review Comment */}
            <div>
              <label htmlFor="review-comment" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Your Review *
              </label>
              <textarea
                id="review-comment"
                required
                rows={3}
                placeholder="Share your thoughts on print clarity, materials, packaging, or customer service..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs font-semibold text-rose-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="rounded-xl border border-charcoal/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal/70 hover:bg-charcoal/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-sage hover:bg-sage-dark px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-sage/20 transition-all disabled:opacity-50"
              >
                {busy ? 'Submitting…' : 'Submit Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
