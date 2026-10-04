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
})
