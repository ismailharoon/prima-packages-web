'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Review } from '@/data/reviews'
import { products } from '@/data/products'

export function AdminReviews({ onCountChange }: { onCountChange?: (count: number) => void }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('All')
  const [selectedRating, setSelectedRating] = useState('All')
  const [pendingDelete, setPendingDelete] = useState<Review | null>(null)

  async function loadReviews() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/reviews', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP error ${res.status}`)
      const data = await res.json()
      if (data && Array.isArray(data.reviews)) {
        setReviews(data.reviews)
        onCountChange?.(data.reviews.length)
      } else {
        setReviews([])
        onCountChange?.(0)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load reviews.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadReviews()
  }, [])

  async function handleDelete(review: Review) {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const res = await fetch(`/api/reviews?id=${encodeURIComponent(review.id)}`, {
        method: 'DELETE',
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(result.error || 'Failed to delete review.')
      }

      const updated = reviews.filter(r => r.id !== review.id)
      setReviews(updated)
      onCountChange?.(updated.length)
      setNotice(`Review by "${review.author}" was successfully deleted from storefront.`)
      setPendingDelete(null)

      // Also update local storage if in browser
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('prima_custom_reviews_v2', JSON.stringify(updated))
          window.dispatchEvent(new CustomEvent('prima_reviews_updated', { detail: { id: review.id, deleted: true } }))
        } catch {}
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error deleting review.')
    } finally {
      setBusy(false)
    }
  }

  const filtered = useMemo(() => {
    return reviews.filter(r => {
      const matchesSearch = !search.trim() || 
        `${r.author} ${r.brandName || ''} ${r.city || ''} ${r.comment} ${r.productName}`.toLowerCase().includes(search.toLowerCase().trim())

      const matchesProduct = selectedProduct === 'All' || r.productSlug === selectedProduct
      const matchesRating = selectedRating === 'All' || String(r.rating) === selectedRating

      return matchesSearch && matchesProduct && matchesRating
    })
  }, [reviews, search, selectedProduct, selectedRating])

  const totalReviews = reviews.length
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : '0.0'
  const fiveStarCount = reviews.filter(r => r.rating === 5).length
  const uniqueProductsCount = new Set(reviews.map(r => r.productSlug)).size

  return (
    <div className="admin-reviews-section">
      <div className="admin-metrics" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <div className="admin-metric">
          <span>Total Reviews</span>
          <strong>{totalReviews}</strong>
          <small>Published on store</small>
        </div>
        <div className="admin-metric">
          <span>Average Rating</span>
          <strong>{avgRating} ★</strong>
          <small>Across all products</small>
        </div>
        <div className="admin-metric">
          <span>5-Star Reviews</span>
          <strong>{fiveStarCount}</strong>
          <small>{totalReviews > 0 ? `${Math.round((fiveStarCount / totalReviews) * 100)}% positive` : 'None yet'}</small>
        </div>
        <div className="admin-metric">
          <span>Products Reviewed</span>
          <strong>{uniqueProductsCount}</strong>
          <small>Active catalogue</small>
        </div>
      </div>

      {error && <div role="alert" className="admin-error">{error}</div>}
      {notice && <div role="status" className="admin-success">{notice}</div>}

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Storefront Customer Reviews</h2>
            <p>Delete duplicate or unwanted customer comments from live product pages and marquee.</p>
          </div>
          <button 
            type="button" 
            className="admin-btn secondary small" 
            disabled={loading || busy}
            onClick={loadReviews}
          >
            {loading ? 'Refreshing…' : '↻ Refresh reviews'}
          </button>
        </div>

        <div className="admin-filters">
          <input
            type="search"
            aria-label="Search reviews"
            placeholder="Search author, brand, city or comment text…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            aria-label="Filter by product"
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
            <option value="All">All Products</option>
            {products.map(p => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
          <select
            aria-label="Filter by rating"
            value={selectedRating}
            onChange={e => setSelectedRating(e.target.value)}
          >
            <option value="All">All Stars</option>
            <option value="5">5 Stars (★★★★★)</option>
            <option value="4">4 Stars (★★★★)</option>
            <option value="3">3 Stars (★★★)</option>
            <option value="2">2 Stars (★★)</option>
            <option value="1">1 Star (★)</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '16%' }}>Author</th>
                  <th style={{ width: '18%' }}>Brand & City</th>
                  <th style={{ width: '16%' }}>Product</th>
                  <th style={{ width: '10%' }}>Rating</th>
                  <th style={{ width: '28%' }}>Comment</th>
                  <th style={{ width: '12%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.author}</strong>
                      <small style={{ color: '#556550' }}>{r.date || 'Recent'}</small>
                    </td>
                    <td>
                      <strong>{r.brandName || '—'}</strong>
                      {r.city && <small>📍 {r.city}</small>}
                    </td>
                    <td>
                      <span className="admin-badge">{r.productName || r.productSlug}</span>
                    </td>
                    <td>
                      <span style={{ color: '#d97706', fontWeight: 600, fontSize: '13px' }}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </td>
                    <td>
                      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#27382d' }}>
                        &ldquo;{r.comment}&rdquo;
                      </p>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="admin-btn small secondary"
                        style={{ color: '#b91c1c', borderColor: '#fca5a5' }}
                        disabled={busy}
                        onClick={() => setPendingDelete(r)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">
            <span>★</span>
            <h3>{loading ? 'Loading reviews…' : 'No reviews found'}</h3>
            <p>
              {loading 
                ? 'Connecting to store reviews…' 
                : reviews.length === 0 
                  ? 'No customer reviews submitted yet.' 
                  : 'No reviews match your search or filter.'}
            </p>
          </div>
        )}
      </section>

      {/* Delete confirmation modal */}
      {pendingDelete && (
        <dialog 
          open 
          className="admin-modal" 
          style={{ maxWidth: '480px' }}
          aria-label="Confirm Delete Review"
        >
          <div className="admin-modal-head">
            <h2>Delete Review</h2>
            <button 
              type="button" 
              disabled={busy} 
              onClick={() => setPendingDelete(null)}
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>
          <div className="admin-form">
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#374151' }}>
              Are you sure you want to permanently delete this review by <strong>{pendingDelete.author}</strong>?
            </p>
            <div style={{ background: '#f9fafb', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', margin: '14px 0' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                {pendingDelete.productName} · {'★'.repeat(pendingDelete.rating)}
              </div>
              <p style={{ margin: 0, fontSize: '13px', fontStyle: 'italic', color: '#1f2937' }}>
                &ldquo;{pendingDelete.comment}&rdquo;
              </p>
            </div>
            <p style={{ fontSize: '12px', color: '#b91c1c', margin: '0 0 20px' }}>
              ⚠️ This will remove the comment from the storefront immediately.
            </p>
            <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="admin-btn secondary"
                disabled={busy}
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn"
                style={{ background: '#dc2626', borderColor: '#dc2626', color: '#fff' }}
                disabled={busy}
                onClick={() => handleDelete(pendingDelete)}
              >
                {busy ? 'Deleting…' : 'Yes, Delete Review'}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
