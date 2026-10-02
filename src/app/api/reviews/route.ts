import { seedReviews, type Review } from '@/data/reviews'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Server-side in-memory cache for new reviews during session
const memoryReviews: Review[] = []

export async function GET() {
  const cleanReviews = memoryReviews.filter(r => r && r.id && !/^rev-\d{1,2}$/.test(r.id))
  return Response.json({
    reviews: cleanReviews,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    const { author, rating, comment, productSlug, productName, brandName, city } = body

    if (!author || typeof author !== 'string' || !author.trim()) {
      return Response.json({ error: 'Please enter your name.' }, { status: 400 })
    }

    const numRating = Number(rating)
    if (!Number.isFinite(numRating) || numRating < 1 || numRating > 5) {
      return Response.json({ error: 'Please select a rating between 1 and 5 stars.' }, { status: 400 })
    }

    if (!comment || typeof comment !== 'string' || comment.trim().length < 5) {
      return Response.json({ error: 'Please write a brief comment (at least 5 characters).' }, { status: 400 })
    }

    const newReview: Review = {
      id: body.id || `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productSlug: String(productSlug || 'woven-labels'),
      productName: String(productName || 'Custom Packaging'),
      author: author.trim().slice(0, 100),
      brandName: brandName ? String(brandName).trim().slice(0, 100) : undefined,
      city: city ? String(city).trim().slice(0, 60) : undefined,
      rating: Math.round(numRating),
      comment: comment.trim().slice(0, 1000),
      date: new Date().toISOString().split('T')[0],
      verified: true,
    }

    memoryReviews.unshift(newReview)

    return Response.json({
      success: true,
      review: newReview,
    }, { status: 201 })
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'Unable to save review.',
    }, { status: 400 })
  }
}
