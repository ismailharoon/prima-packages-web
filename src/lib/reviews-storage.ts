'use client'

import { useState, useEffect } from 'react'
import { Review, seedReviews, getAllReviews, getReviewsByProduct, calculateRatingSummary } from '@/data/reviews'

const STORAGE_KEY = 'prima_custom_reviews_v2'
const EVENT_NAME = 'prima_reviews_updated'

export function getStoredReviews(): Review[] {
  if (typeof window === 'undefined') return []
  try {
    // Purge old mock reviews key from browser storage
    try {
      localStorage.removeItem('prima_custom_reviews')
    } catch {}

    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Safety check: filter out any legacy mock reviews (rev-01 to rev-99)
    return parsed.filter((r: Review) => r && r.id && !/^rev-\d{1,2}$/.test(r.id))
  } catch {
    return []
  }
}

export function saveReviewToStorage(review: Review) {
  if (typeof window === 'undefined') return
  try {
    const existing = getStoredReviews()
    const updated = [review, ...existing.filter(r => r.id !== review.id)]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: review }))
  } catch (e) {
    console.error('Failed to save review in localStorage:', e)
  }
}

export async function submitReview(data: {
  productSlug: string
  productName: string
  author: string
  brandName?: string
  city?: string
  rating: number
  comment: string
}): Promise<Review> {
  const newReview: Review = {
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    productSlug: data.productSlug,
    productName: data.productName,
    author: data.author.trim(),
    brandName: data.brandName?.trim() || undefined,
    city: data.city?.trim() || undefined,
    rating: Math.max(1, Math.min(5, data.rating)),
    comment: data.comment.trim(),
    date: new Date().toISOString().split('T')[0],
    verified: true,
  }

  // Save to client storage immediately for instant UI responsiveness
  saveReviewToStorage(newReview)

  // Try saving to backend API if available
  try {
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    }).catch(() => {
      // Background sync fail gracefully
    })
  } catch {
    // Ignore network error
  }

  return newReview
}

export function useReviews(productSlug?: string) {
  const [customReviews, setCustomReviews] = useState<Review[]>([])

  useEffect(() => {
    setCustomReviews(getStoredReviews())

    const handleUpdate = () => {
      setCustomReviews(getStoredReviews())
    }

    window.addEventListener(EVENT_NAME, handleUpdate)
    window.addEventListener('storage', handleUpdate)

    // Optional: fetch from API to get newest community reviews
    fetch('/api/reviews')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.reviews)) {
          const local = getStoredReviews()
          const localIds = new Set(local.map(r => r.id))
          const newFromRemote = data.reviews.filter((r: Review) => !localIds.has(r.id))
          if (newFromRemote.length > 0) {
            const merged = [...local, ...newFromRemote]
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
            setCustomReviews(merged)
          }
        }
      })
      .catch(() => {})

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const all = getAllReviews(customReviews)
  const productReviews = productSlug ? getReviewsByProduct(productSlug, customReviews) : all
  const summary = calculateRatingSummary(productReviews)

  return {
    allReviews: all,
    reviews: productReviews,
    summary,
    submitReview,
  }
}
