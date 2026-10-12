'use client'

import { useState, useRef, type FormEvent, useEffect } from 'react'
import { products } from '@/data/products'
import { submitReview } from '@/lib/reviews-storage'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onReviewSubmitted?: () => void
}

const productShortNames: Record<string, string> = {
  'woven-labels': 'Woven Labels',
  'zipper-bags': 'Zipper Bags',
  'hang-tags': 'Hang Tags',
  'thank-you-cards': 'Thank You Cards',
  'business-cards': 'Business Cards',
  'courier-flyer-bags': 'Courier Flyers',
  'carry-bags': 'Carry Bags',
  'round-stickers': 'Stickers',
  'butter-paper': 'Butter Paper',
  'ribbon-tags': 'Ribbon Tags',
  'tag-card-string': 'Tag Strings',
  'size-labels': 'Size Labels',
}

export function ReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [step, setStep] = useState<'products' | 'review'>('products')
  const [pipHint, setPipHint] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
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
    if (isOpen) {
      setStep('products')
      setPipHint(false)
      setSelectedSlugs([])
      const previous = document.activeElement as HTMLElement | null
      const overflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      dialog.current?.focus()
      return () => { document.body.style.overflow = overflow; previous?.focus() }
    }
  }, [isOpen])

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
        return prev.filter(s => s !== slug)
      } else {
        return [...prev, slug]
      }
    })
  }

  const ratingLabels = ['', 'Needs Work', 'Fair', 'Good', 'Very Good', 'Excellent!']

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (step !== 'review' || busy) return
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
      const combinedName = selectedProducts.map(p => productShortNames[p.slug] || p.name).join(', ')

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
      ref={dialog}
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      onClick={onClose}
      onKeyDown={e => {
        if (e.key === 'Escape' && !busy) onClose()
        if (e.key !== 'Tab') return
        const items = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input, textarea, select')
        if (!items?.length) return
        const first = items[0], last = items[items.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { e.preventDefault(); first.focus() }
      }}
    >
      <div
        className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10 transition-colors"
          aria-label="Close review dialog"
        >
          ✕
        </button>

        {success ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-charcoal">Review Published!</h3>
            <p className="mt-1 text-xs text-charcoal/70">
              Thank you for sharing your feedback. Your review is now visible across our store.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="pr-8">
              <p className="text-[10px] font-bold uppercase tracking-wider text-sage-dark">Customer Feedback</p>
              <h2 id="review-modal-title" className="text-lg sm:text-xl font-extrabold text-charcoal">
                {step === 'products' ? 'Which product would you like to review?' : 'Write a Product Review'}
              </h2>
            </div>

            {/* Compact Multi-Product Selector */}
            {step === 'products' ? <div>
              <p className="mb-4 text-sm text-charcoal/75">Choose the products you ordered, then share your experience.</p>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70">
                  Products In Your Order *
                </label>
                <span className="text-[10px] font-bold text-sage">
                  {selectedSlugs.length} {selectedSlugs.length === 1 ? 'product' : 'products'} selected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 bg-[#FAF8F4] border border-charcoal/15 rounded-lg">
                {products.map(p => {
                  const isSelected = selectedSlugs.includes(p.slug)
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => toggleProduct(p.slug)}
                      className={`inline-flex min-h-11 items-center gap-2 px-3 py-2 rounded-md text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        isSelected
                          ? 'bg-sage text-white font-semibold shadow-xs ring-1 ring-sage'
                          : 'bg-white text-charcoal/75 border border-charcoal/15 hover:border-charcoal/30 hover:bg-charcoal/5 font-medium'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-[9px]">{isSelected ? '✓' : '+'}</span>
                      <span>{productShortNames[p.slug] || p.name}</span>
                    </button>
                  )
                })}
              </div>
              <button type="button" disabled={!selectedSlugs.length} onClick={() => { setStep('review'); setTimeout(() => document.getElementById('review-author')?.focus(), 0) }} className="mt-4 min-h-11 w-full rounded-lg bg-sage-dark px-4 py-3 font-bold text-white disabled:opacity-40">Continue to review</button>
            </div> : <>
            <div className="flex items-center justify-between gap-3 rounded-lg bg-sage/10 p-3 text-sm">
              <span>{selectedSlugs.map(slug => productShortNames[slug] || products.find(p => p.slug === slug)?.name).join(', ')}</span>
              <button type="button" disabled={busy} onClick={() => setStep('products')} className="min-h-11 font-bold text-sage-dark underline">Change</button>
            </div>

            {/* Star Rating Selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70">
                  Rating
                </label>
                <span className="text-[11px] font-semibold text-charcoal/75">
                  {ratingLabels[hoverRating || rating]}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => {
                  const active = (hoverRating !== null ? hoverRating : rating) >= star
                  return (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-0.5 text-xl sm:text-2xl transition-transform hover:scale-110 focus:outline-none"
                      aria-label={`${star} star`}
                    >
                      <span className={active ? 'text-amber-400 drop-shadow-sm' : 'text-charcoal/20'}>
                        ★
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Author Name & Brand Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="review-author" className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70 mb-1">
                  Your Name *
                </label>
                <input
                  id="review-author"
                  type="text"
                  required
                  placeholder="e.g. Sara Qureshi"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-1.5 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
              <div>
                <label htmlFor="review-brand" className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70 mb-1">
                  Brand Name (optional)
                </label>
                <input
                  id="review-brand"
                  type="text"
                  placeholder="e.g. Studio Bloom"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-1.5 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="review-city" className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70 mb-1">
                City (optional)
              </label>
              <input
                id="review-city"
                type="text"
                placeholder="e.g. Karachi, Lahore, Faisalabad"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-1.5 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>

            {/* Review Comment */}
            <div>
              <label htmlFor="review-comment" className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70 mb-1">
                Your Review *
              </label>
              <textarea
                id="review-comment"
                required
                rows={2}
                placeholder="Share your thoughts on print clarity, materials, packaging, or customer service..."
                value={comment}
                onFocus={() => setPipHint(true)}
                onChange={e => setComment(e.target.value)}
                className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-1.5 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage resize-none"
              />
              {pipHint && <div role="status" className="mt-2 flex items-center gap-3 rounded-xl bg-[#f0f4ea] p-3 text-sm text-[#203a2b]">
                <svg className="h-16 w-16 shrink-0 motion-safe:animate-bounce" style={{ animationIterationCount: 2 }} viewBox="0 0 160 164" aria-hidden="true">
                  <path d="M30 91Q12 83 15 60M130 89q17-2 15-17" fill="none" stroke="#6e8566" strokeWidth="9" strokeLinecap="round"/>
                  <path d="m33 47 64-17 1-18-45 9Z" fill="#bdcaaa"/><path d="m97 30 34 20 13-22-37-15Z" fill="#e1e7d8"/>
                  <path d="m32 47 65 16v76l-55-11q-10-2-10-13Z" fill="#9cad8c"/><path d="m97 63 34-13v68q0 10-9 13l-25 8Z" fill="#4c674f"/>
                  <path d="m61 54 13 3v25l-6-4-7 2Z" fill="#f4e6c6"/>
                  <path d="M43 96q6-12 12 2M74 101q6-12 12 2" fill="none" stroke="#203a2b" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                <p><strong>Pip says:</strong><br/>Itna mat socho 😄 Apna honest experience likh do!</p>
              </div>}
            </div>

            {error && (
              <p role="alert" className="text-xs font-semibold text-rose-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="rounded-lg border border-charcoal/15 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-charcoal/70 hover:bg-charcoal/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="rounded-lg bg-sage hover:bg-sage-dark px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-sage/20 transition-all disabled:opacity-50"
              >
                {busy ? 'Submitting…' : 'Submit Review'}
              </button>
            </div>
            </>}
          </form>
        )}
      </div>
    </div>
  )
}
