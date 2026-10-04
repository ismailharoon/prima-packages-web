import test from 'node:test'
import assert from 'node:assert/strict'

test('GA4 analytics module tests', async (t) => {
  // Set up mock window and dataLayer
  const calls = []
  globalThis.window = {
    location: {
      pathname: '/products/woven-labels',
      search: '?utm_source=instagram&utm_medium=paid_social',
      href: 'https://primapackages.pk/products/woven-labels?utm_source=instagram&utm_medium=paid_social',
    },
    dataLayer: [],
    gtag: (command, ...args) => {
      calls.push({ command, args })
    },
  }
  globalThis.document = {
    title: 'Polyester Woven Labels | Prima Packages',
  }

  const {
    GA_MEASUREMENT_ID,
    trackPageView,
    trackViewItem,
    trackAddToCart,
    trackViewCart,
    trackBeginCheckout,
    trackPurchase,
    trackWhatsAppClick,
    trackContactClick,
  } = await import('../src/lib/analytics.ts')

  await t.test('Measurement ID is correctly configured', () => {
    assert.equal(GA_MEASUREMENT_ID, 'G-K849JBF65X')
  })

  await t.test('trackPageView dispatches page_view with full path and location', () => {
    calls.length = 0
    trackPageView('/products/woven-labels?utm_source=instagram')
    assert.equal(calls.length, 1)
    assert.equal(calls[0].command, 'event')
    assert.equal(calls[0].args[0], 'page_view')
    assert.deepEqual(calls[0].args[1], {
      page_path: '/products/woven-labels?utm_source=instagram',
      page_location: 'https://primapackages.pk/products/woven-labels?utm_source=instagram&utm_medium=paid_social',
      page_title: 'Polyester Woven Labels | Prima Packages',
      send_to: 'G-K849JBF65X',
    })
  })

  await t.test('trackViewItem dispatches view_item with correct e-commerce payload', () => {
    calls.length = 0
    trackViewItem({
      product: {
        slug: 'woven-labels',
        name: 'Polyester Woven Labels',
        category: 'Labels',
      },
      selectedSize: {
        label: '100 pcs',
        price: 2500,
        sizeCategory: '0.75 x 2 inch',
      },
      quantity: 1,
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].command, 'event')
    assert.equal(calls[0].args[0], 'view_item')
    const payload = calls[0].args[1]
    assert.equal(payload.currency, 'PKR')
    assert.equal(payload.value, 2500)
    assert.equal(payload.items.length, 1)
    assert.equal(payload.items[0].item_id, 'woven-labels')
    assert.equal(payload.items[0].item_name, 'Polyester Woven Labels')
    assert.equal(payload.items[0].item_category, 'Labels')
    assert.equal(payload.items[0].price, 2500)
    assert.equal(payload.items[0].quantity, 1)
    assert.equal(payload.items[0].item_variant, '0.75 x 2 inch')
  })

  await t.test('trackAddToCart dispatches add_to_cart with quantity, options, and total value', () => {
    calls.length = 0
    trackAddToCart({
      product: {
        slug: 'woven-labels',
        name: 'Polyester Woven Labels',
        category: 'Labels',
      },
      size: {
        label: '100 pcs',
        price: 2500,
        sizeCategory: '0.75 x 2 inch',
      },
      quantity: 2,
      options: {
        fold: 'Center Fold',
      },
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].command, 'event')
    assert.equal(calls[0].args[0], 'add_to_cart')
    const payload = calls[0].args[1]
    assert.equal(payload.currency, 'PKR')
    assert.equal(payload.value, 5000)
    assert.equal(payload.items.length, 1)
    assert.equal(payload.items[0].item_id, 'woven-labels')
    assert.equal(payload.items[0].quantity, 2)
    assert.equal(payload.items[0].fold, 'Center Fold')
  })

  await t.test('trackViewCart and trackBeginCheckout format cart items correctly', () => {
    const mockGetProduct = (slug) => ({
      slug,
      name: 'Polyester Woven Labels',
      category: 'Labels',
      sizes: [{ label: '100 pcs', price: 2500 }],
    })

    calls.length = 0
    trackViewCart({
      lines: [{ slug: 'woven-labels', sizeIndex: 0, quantity: 1, options: {} }],
      subtotal: 2500,
      getProductBySlug: mockGetProduct,
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].args[0], 'view_cart')
    assert.equal(calls[0].args[1].value, 2500)
    assert.equal(calls[0].args[1].items[0].item_id, 'woven-labels')

    calls.length = 0
    trackBeginCheckout({
      lines: [{ slug: 'woven-labels', sizeIndex: 0, quantity: 1, options: {} }],
      subtotal: 2500,
      getProductBySlug: mockGetProduct,
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].args[0], 'begin_checkout')
    assert.equal(calls[0].args[1].value, 2500)
  })

  await t.test('trackPurchase fires with transaction_id and deduplicates duplicate calls', () => {
    const mockGetProduct = (slug) => ({
      slug,
      name: 'Polyester Woven Labels',
      category: 'Labels',
      sizes: [{ label: '100 pcs', price: 2500 }],
    })

    calls.length = 0
    const txId = 'PRIMA-TEST-12345'
    trackPurchase({
      transactionId: txId,
      lines: [{ slug: 'woven-labels', sizeIndex: 0, quantity: 1, options: {} }],
      subtotal: 2500,
      getProductBySlug: mockGetProduct,
      customer: { name: 'Ali', city: 'Karachi' },
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].args[0], 'purchase')
    assert.equal(calls[0].args[1].transaction_id, txId)
    assert.equal(calls[0].args[1].value, 2500)
    assert.equal(calls[0].args[1].customer_city, 'Karachi')

    // Immediate second call with same transaction ID should be ignored
    trackPurchase({
      transactionId: txId,
      lines: [{ slug: 'woven-labels', sizeIndex: 0, quantity: 1, options: {} }],
      subtotal: 2500,
      getProductBySlug: mockGetProduct,
    })
    assert.equal(calls.length, 1, 'Duplicate purchase call was prevented')
  })

  await t.test('trackWhatsAppClick formats parameters for custom button locations', () => {
    calls.length = 0
    trackWhatsAppClick({
      buttonLocation: 'product_page',
      productName: 'Polyester Woven Labels',
      productId: 'woven-labels',
      selectedSize: '0.75 x 2 inch',
      selectedQuantity: 100,
      pagePath: '/products/woven-labels',
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].args[0], 'whatsapp_click')
    assert.deepEqual(calls[0].args[1], {
      button_location: 'product_page',
      page_path: '/products/woven-labels',
      product_name: 'Polyester Woven Labels',
      product_id: 'woven-labels',
      selected_size: '0.75 x 2 inch',
      selected_quantity: 100,
    })
  })

  await t.test('trackContactClick dispatches contact_click and phone_click / email_click', () => {
    calls.length = 0
    trackContactClick({
      type: 'phone',
      value: '+923233231712',
      buttonLocation: 'header',
    })

    assert.equal(calls.length, 2)
    assert.equal(calls[0].args[0], 'contact_click')
    assert.equal(calls[1].args[0], 'phone_click')
    assert.equal(calls[0].args[1].contact_value, '+923233231712')
    assert.equal(calls[0].args[1].button_location, 'header')
  })
})
