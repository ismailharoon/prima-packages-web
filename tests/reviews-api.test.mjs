import test from 'node:test'
import assert from 'node:assert/strict'

test('reviews API handles GET, POST, DELETE and deleted tombstone', async () => {
  const { GET, POST, DELETE } = await import('../src/app/api/reviews/route.ts')

  // 1. Post a test review
  const testId = `rev-${Date.now()}-test1`
  const postReq = new Request('http://localhost/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: testId,
      author: 'Test User',
      rating: 5,
      comment: 'This is an automated test review.',
      productSlug: 'woven-labels',
      productName: 'Polyester Woven Labels',
    }),
  })

  const postRes = await POST(postReq)
  assert.equal(postRes.status, 201)
  const postData = await postRes.json()
  assert.equal(postData.success, true)
  assert.equal(postData.review.id, testId)

  // 2. GET should contain the test review
  const getRes = await GET()
  const getData = await getRes.json()
  assert(getData.reviews.some(r => r.id === testId))

  // 3. DELETE with query param
  const delReq = new Request(`http://localhost/api/reviews?id=${testId}`, {
    method: 'DELETE',
  })
  const delRes = await DELETE(delReq)
  assert.equal(delRes.status, 200)
  const delData = await delRes.json()
  assert.equal(delData.success, true)
  assert.equal(delData.id, testId)

  // 4. GET should no longer contain test review
  const getResAfter = await GET()
  const getDataAfter = await getResAfter.json()
  assert(!getDataAfter.reviews.some(r => r.id === testId))

  // 5. Attempting to re-post the same deleted review ID is rejected
  const repostReq = new Request('http://localhost/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: testId,
      author: 'Test User',
      rating: 5,
      comment: 'Attempting to re-post deleted review.',
    }),
  })
  const repostRes = await POST(repostReq)
  assert.equal(repostRes.status, 400)
  const repostData = await repostRes.json()
  assert(repostData.error.includes('removed by an administrator'))

  // 6. Multi-product review submission
  const multiId = `rev-${Date.now()}-multi`
  const multiReq = new Request('http://localhost/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: multiId,
      author: 'Multi Product Buyer',
      rating: 5,
      comment: 'Bought labels and ziplock bags together, both are superb!',
      productSlugs: ['woven-labels', 'zipper-bags', 'hang-tags'],
      productName: 'Polyester Woven Labels, Zipper Bags, Hang Tags',
    }),
  })
  const multiRes = await POST(multiReq)
  assert.equal(multiRes.status, 201)
  const multiData = await multiRes.json()
  assert.equal(multiData.review.productSlugs.length, 3)

  // Verify getReviewsByProduct matches each of the selected products
  const { getReviewsByProduct } = await import('../src/data/reviews.ts')
  const wovenMatches = getReviewsByProduct('woven-labels', [multiData.review])
  assert(wovenMatches.some(r => r.id === multiId))

  const zipperMatches = getReviewsByProduct('zipper-bags', [multiData.review])
  assert(zipperMatches.some(r => r.id === multiId))

  const hangTagMatches = getReviewsByProduct('hang-tags', [multiData.review])
  assert(hangTagMatches.some(r => r.id === multiId))

  const unrelatedMatches = getReviewsByProduct('butter-paper', [multiData.review])
  assert(!unrelatedMatches.some(r => r.id === multiId))

  // Clean up multiId
  await DELETE(new Request(`http://localhost/api/reviews?id=${multiId}`, { method: 'DELETE' }))
})

