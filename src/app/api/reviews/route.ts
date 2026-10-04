import type { Review } from '@/data/reviews'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KV_KEY = 'reviews:all'
const KV_DELETED_KEY = 'reviews:deleted'
const MAX_REVIEWS = 1000

type KVStore = {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
}

// Fallback only for local `next dev` where Cloudflare bindings are unavailable.
const memoryReviews: Review[] = []
const memoryDeleted: string[] = []

async function getKV(): Promise<KVStore | null> {
  try {
    const mod = (await import('cloudflare:workers')) as { env?: { REVIEWS_KV?: KVStore } }
    return mod.env?.REVIEWS_KV ?? null
  } catch {
    return null
  }
}

async function getDeletedIds(): Promise<string[]> {
  const kv = await getKV()
  if (!kv) return memoryDeleted
  const raw = await kv.get(KV_DELETED_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function markReviewDeleted(id: string) {
  const kv = await getKV()
  if (!kv) {
    if (!memoryDeleted.includes(id)) memoryDeleted.push(id)
    return
  }
  const current = await getDeletedIds()
  if (!current.includes(id)) {
    await kv.put(KV_DELETED_KEY, JSON.stringify([id, ...current].slice(0, 500)))
  }
}

async function readReviews(): Promise<Review[]> {
  const kv = await getKV()
  if (!kv) return memoryReviews
  const raw = await kv.get(KV_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeReviews(reviews: Review[]) {
  const kv = await getKV()
  if (!kv) {
    memoryReviews.splice(0, memoryReviews.length, ...reviews)
    return
  }
  await kv.put(KV_KEY, JSON.stringify(reviews.slice(0, MAX_REVIEWS)))
}

export async function GET() {
  const reviews = await readReviews()
  return Response.json({ reviews }, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' },
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

    const id = typeof body.id === 'string' && /^rev-\d{10,}-[a-z0-9]{1,10}$/.test(body.id)
      ? body.id
      : `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const deletedIds = await getDeletedIds()
    if (deletedIds.includes(id)) {
      return Response.json({ error: 'This review was removed by an administrator.' }, { status: 400 })
    }

    const newReview: Review = {
      id,
      productSlug: String(productSlug || 'woven-labels').slice(0, 80),
      productName: String(productName || 'Custom Packaging').slice(0, 120),
      author: author.trim().slice(0, 100),
      brandName: brandName ? String(brandName).trim().slice(0, 100) : undefined,
      city: city ? String(city).trim().slice(0, 60) : undefined,
      rating: Math.round(numRating),
      comment: comment.trim().slice(0, 1000),
      date: new Date().toISOString().split('T')[0],
      verified: true,
    }

    const existing = await readReviews()
    if (!existing.some(r => r.id === newReview.id)) {
      await writeReviews([newReview, ...existing])
    }

    return Response.json({ success: true, review: newReview }, { status: 201 })
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'Unable to save review.',
    }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    let id = url.searchParams.get('id')
    if (!id) {
      const body = await request.json().catch(() => null)
      if (body && typeof body === 'object' && typeof body.id === 'string') {
        id = body.id
      }
    }

    if (!id || typeof id !== 'string') {
      return Response.json({ error: 'Review ID is required.' }, { status: 400 })
    }

    const reviews = await readReviews()
    const target = reviews.find(r => r.id === id)
    if (!target) {
      // If already not present, make sure it is in deleted tombstone list
      await markReviewDeleted(id)
      return Response.json({ success: true, id, message: 'Review already removed.' })
    }

    const remaining = reviews.filter(r => r.id !== id)
    await writeReviews(remaining)
    await markReviewDeleted(id)

    return Response.json({ success: true, id, remainingCount: remaining.length })
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'Unable to delete review.',
    }, { status: 500 })
  }
}

