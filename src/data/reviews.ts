export interface Review {
  id: string
  productSlug: string
  productName: string
  author: string
  brandName?: string
  city?: string
  rating: number // 1 to 5
  comment: string
  date: string // e.g. "2026-09-28"
  verified: boolean
}

export const seedReviews: Review[] = []

export function getReviewsByProduct(productSlug: string, customReviews: Review[] = []): Review[] {
  const combined = [...customReviews, ...seedReviews]
  // Deduplicate by ID and discard any legacy mock reviews
  const map = new Map<string, Review>()
  for (const r of combined) {
    if (r && r.id && !/^rev-\d{1,2}$/.test(r.id) && !map.has(r.id)) {
      map.set(r.id, r)
    }
  }
  return Array.from(map.values()).filter((r) => r.productSlug === productSlug)
}

export function getAllReviews(customReviews: Review[] = []): Review[] {
  const combined = [...customReviews, ...seedReviews]
  const map = new Map<string, Review>()
  for (const r of combined) {
    if (r && r.id && !/^rev-\d{1,2}$/.test(r.id) && !map.has(r.id)) {
      map.set(r.id, r)
    }
  }
  return Array.from(map.values())
}

export function calculateRatingSummary(reviews: Review[]) {
  if (!reviews.length) {
    return { average: 0, total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
  }
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  let sum = 0
  for (const r of reviews) {
    const star = Math.max(1, Math.min(5, Math.round(r.rating)))
    breakdown[star] = (breakdown[star] || 0) + 1
    sum += r.rating
  }
  const average = Number((sum / reviews.length).toFixed(1))
  return { average, total: reviews.length, breakdown }
}

export function getProductRatingSummary(productSlug: string, customReviews: Review[] = []) {
  const reviews = getReviewsByProduct(productSlug, customReviews)
  return calculateRatingSummary(reviews)
}
