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
    trackGenerateLead,
    trackCartGenerateLead,
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

  await t.test('trackGenerateLead and trackCartGenerateLead track lead conversions', () => {
    const mockGetProduct = (slug) => ({
      slug,
      name: 'Polyester Woven Labels',
      category: 'Labels',
      sizes: [{ label: '100 pcs', price: 2500 }],
    })

    calls.length = 0
    trackCartGenerateLead({
      lines: [{ slug: 'woven-labels', sizeIndex: 0, quantity: 1, options: {} }],
      subtotal: 2500,
      getProductBySlug: mockGetProduct,
      leadSource: 'whatsapp_checkout',
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].args[0], 'generate_lead')
    assert.equal(calls[0].args[1].currency, 'PKR')
    assert.equal(calls[0].args[1].value, 2500)
    assert.equal(calls[0].args[1].lead_source, 'whatsapp_checkout')
    assert.equal(calls[0].args[1].items.length, 1)
  })

  await t.test('trackWhatsAppClick formats parameters including value and currency on checkout', () => {
    calls.length = 0
    trackWhatsAppClick({
      buttonLocation: 'checkout',
      value: 2500,
      currency: 'PKR',
      pagePath: '/cart',
    })

    assert.equal(calls.length, 1)
    assert.equal(calls[0].args[0], 'whatsapp_click')
    assert.deepEqual(calls[0].args[1], {
      button_location: 'checkout',
      page_path: '/cart',
      value: 2500,
      currency: 'PKR',
    })
  })

  await t.test('trackPurchase utility is preserved but isolated for confirmed orders', () => {
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
