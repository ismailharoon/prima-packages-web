'use client'

import { useState, useMemo, useRef, useEffect, type FormEvent } from 'react'
import { products } from '@/data/products'
import { money, validateNewOrder } from '@/lib/admin/domain.mjs'
import type { Workspace } from '@/lib/admin/types'

const rs = (value: number) => `Rs. ${(value / 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}`

const categories: Record<string, string> = {
  'woven-labels': 'Woven Label',
  'zipper-bags': 'Slider Bag/Zipper Bag',
  'hang-tags': 'Hang Tags',
  'thank-you-cards': 'Thank You Card',
  'business-cards': 'Business Cards',
  'courier-flyer-bags': 'Courier Flyers',
  'carry-bags': 'Carry Bag',
  'round-stickers': 'Round Stickers',
  'butter-paper': 'Butter Paper',
  'ribbon-tags': 'Ribbons',
  'tag-card-string': 'Tag Card String',
  'size-labels': 'Size Label',
  'bop-theli': 'BOP Theli',
}

const day = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' })

export type Line = {
  id: string
  name: string
  category: string
  size: string
  quantity: string
  price: string // Entered price based on pricingMode
  pricingMode: 'total' | 'unit' // Default is 'total'
}

export interface CustomerPrefill {
  customer: string
  brand: string
  phone?: string
  address?: string
  orderNumber?: string
}

export function NewOrderForm({
  busy,
  save,
  state,
  initialCustomer,
  onClearPrefill,
}: {
  busy: boolean
  save: (action: string, payload: unknown) => Promise<void>
  state?: Workspace | null
  initialCustomer?: CustomerPrefill | null
  onClearPrefill?: () => void
}) {
  // Customer details state
  const [customer, setCustomer] = useState(initialCustomer?.customer || '')
  const [brand, setBrand] = useState(initialCustomer?.brand || '')
  const [phone, setPhone] = useState(initialCustomer?.phone || '')
  const [address, setAddress] = useState(initialCustomer?.address || '')
  const [customerSearch, setCustomerSearch] = useState('')
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [loadedCustomerBadge, setLoadedCustomerBadge] = useState<string | null>(
    initialCustomer?.brand ? `${initialCustomer.brand} · ${initialCustomer.customer || initialCustomer.orderNumber || ''}` : null
  )

  const searchBoxRef = useRef<HTMLDivElement>(null)

  // Product selection state
  const [slug, setSlug] = useState(products[0].slug)
  const [size, setSize] = useState('')
  const [isCustomSize, setIsCustomSize] = useState(false)
  const [customSizeText, setCustomSizeText] = useState('')

  // Lines & charges
  const [lines, setLines] = useState<Line[]>([])
  const [discount, setDiscount] = useState('')
  const [delivery, setDelivery] = useState('')
  const [received, setReceived] = useState('')
  const [error, setError] = useState('')

  const product = products.find((p) => p.slug === slug) || products[0]
  const sizes = useMemo(() => {
    return [...new Set(product.sizes.map((s) => [s.sizeCategory || s.label, s.color, s.printType].filter(Boolean).join(' · ')))]
  }, [product])

  // Extract past unique customers for autofill & search
  const pastCustomers = useMemo(() => {
    if (!state?.orders) return []
    const map = new Map<string, {
      customer: string
      brand: string
      phone: string
      address: string
      orderNumber: string
      orderCount: number
      latestDate: string
    }>()

    const sorted = [...state.orders].sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    for (const o of sorted) {
      const cleanPhone = (o.phone || '').replace(/\D/g, '')
      const key = cleanPhone.length >= 7 ? `phone:${cleanPhone}` : `brand:${(o.brand || '').trim().toLowerCase()}:${(o.customer || '').trim().toLowerCase()}`
      const existing = map.get(key)
      if (existing) {
        existing.orderCount += 1
        if (!existing.phone && o.phone) existing.phone = o.phone
        if (!existing.address && o.address) existing.address = o.address
      } else {
        map.set(key, {
          customer: o.customer || '',
          brand: o.brand || '',
          phone: o.phone || '',
          address: o.address || '',
          orderNumber: o.number || '',
          orderCount: 1,
          latestDate: o.date || '',
        })
      }
    }
    return Array.from(map.values())
  }, [state?.orders])

  // Search filter
  const searchResults = useMemo(() => {
    const q = customerSearch.trim().toLowerCase()
    if (!q) return []
    const digits = q.replace(/\D/g, '')
    return pastCustomers.filter((c) => {
      const matchPhone = digits.length >= 2 && c.phone.replace(/\D/g, '').includes(digits)
      const matchBrand = c.brand.toLowerCase().includes(q)
      const matchCustomer = c.customer.toLowerCase().includes(q)
      const matchOrder = c.orderNumber.toLowerCase().includes(q)
      return matchPhone || matchBrand || matchCustomer || matchOrder
    }).slice(0, 8)
  }, [customerSearch, pastCustomers])

  // Inline phone search hint
  const phoneSuggestion = useMemo(() => {
    if (loadedCustomerBadge) return null
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 5) return null
    return pastCustomers.find((c) => c.phone.replace(/\D/g, '').includes(digits))
  }, [phone, loadedCustomerBadge, pastCustomers])

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectCustomer(c: typeof pastCustomers[0]) {
    setCustomer(c.customer)
    setBrand(c.brand)
    setPhone(c.phone)
    setAddress(c.address)
    setLoadedCustomerBadge(`${c.brand} · ${c.customer} (Order #${c.orderNumber})`)
    setCustomerSearch('')
    setShowSearchDropdown(false)
  }

  function clearCustomer() {
    setCustomer('')
    setBrand('')
    setPhone('')
    setAddress('')
    setLoadedCustomerBadge(null)
    onClearPrefill?.()
  }

  // Calculate line item total based on pricingMode
  const lineTotal = (l: Line) => {
    if (l.pricingMode === 'total') {
      return money(l.price || 0)
    }
    return Number(l.quantity || 0) * money(l.price || 0)
  }

  const total = lines.reduce((sum, l) => sum + lineTotal(l), 0)
  const net = total + money(delivery || 0) - money(discount || 0)

  function patch(id: string, values: Partial<Line>) {
    setLines(lines.map((l) => (l.id === id ? { ...l, ...values } : l)))
  }

  function togglePricingMode(l: Line, newMode: 'total' | 'unit') {
    if (l.pricingMode === newMode) return
    const qty = Math.max(1, Number(l.quantity) || 1)
    const currentPrice = Number(l.price) || 0

    let newPrice = l.price
    if (newMode === 'unit' && currentPrice > 0) {
      // Switching from Total to Per Piece: calculate price per piece
      newPrice = (currentPrice / qty).toFixed(2).replace(/\.00$/, '')
    } else if (newMode === 'total' && currentPrice > 0) {
      // Switching from Per Piece to Total: calculate total amount
      newPrice = (currentPrice * qty).toFixed(2).replace(/\.00$/, '')
    }

    patch(l.id, { pricingMode: newMode, price: newPrice })
  }

  function addProduct() {
    const selectedSize = isCustomSize ? (customSizeText.trim() || 'Custom size') : (size || sizes[0] || '')
    const variantObj =
      product.sizes.find(
        (s) => [s.sizeCategory || s.label, s.color, s.printType].filter(Boolean).join(' · ') === selectedSize
      ) || product.sizes[0]

    let defaultQty = '100'
    let defaultPrice = ''
    const pricingMode: 'total' | 'unit' = 'total' // Default to total amount directly as requested!

    if (slug === 'tag-card-string') {
      defaultQty = variantObj?.quantity ? String(Number(variantObj.quantity.replace(/[^0-9]/g, '')) || 1000) : '1000'
      defaultPrice = variantObj?.price ? String(variantObj.price) : ''
    } else if (slug === 'size-labels') {
      defaultQty = variantObj?.quantity ? String(Number(variantObj.quantity.replace(/[^0-9]/g, '')) || 1) : '1'
      defaultPrice = variantObj?.price ? String(variantObj.price) : ''
    } else if (variantObj) {
      defaultQty = variantObj.quantity ? String(Number(variantObj.quantity.replace(/[^0-9]/g, '')) || 100) : '100'
      // Direct pack/lot price default
      defaultPrice = variantObj.price ? String(variantObj.price) : ''
    }

    setLines([
      ...lines,
      {
        id: crypto.randomUUID(),
        name: product.name,
        category: categories[product.slug] || 'Other',
        size: selectedSize,
        quantity: defaultQty,
        price: defaultPrice,
        pricingMode,
      },
    ])

    // Reset custom size input for next addition
    if (isCustomSize) {
      setCustomSizeText('')
      setIsCustomSize(false)
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    try {
      if (!customer.trim() || !brand.trim()) {
        throw new Error('Customer name and Brand name are required.')
      }
      if ([discount, delivery, received, ...lines.map((l) => l.price)].some((v) => !v.trim())) {
        throw new Error('Enter every amount. Type 0 if there is no amount.')
      }
      if (!lines.length) {
        throw new Error('Add at least one product to the order.')
      }

      const payload = {
        date: day(),
        customer: customer.trim(),
        brand: brand.trim(),
        phone: phone.trim(),
        address: address.trim(),
        source: 'Other',
        status: 'Confirmed',
        dueDate: '',
        notes: '',
        artwork: '',
        items: lines.map((l) => {
          const qty = Number(l.quantity) || 1
          // If pricingMode is 'total', back-calculate unit price in paise for domain model:
          const uPrice = l.pricingMode === 'total' ? Math.round(money(l.price) / qty) : money(l.price)
          return {
            id: l.id,
            name: l.name,
            category: l.category,
            specification: l.size,
            quantity: qty,
            unitPrice: uPrice,
          }
        }),
        discount: money(discount),
        deliveryCharge: money(delivery),
        advance: money(received),
        paymentMethod: 'Order entry',
      }

      validateNewOrder(payload)
      await save('createOrder', payload)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Check the order details.')
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <p className="admin-muted">Order ID is generated automatically. Order date: {day()}.</p>

      {/* 1. Customer details & repeat customer search */}
      <h3>1. Customer details</h3>

      {/* Search repeat customer */}
      <div className="admin-customer-search-box" ref={searchBoxRef}>
        <label htmlFor="customer-search-input">
          <span>🔍</span> Search Repeat Customer (Phone, Order #, Brand, or Name):
        </label>
        <input
          id="customer-search-input"
          className="admin-customer-search-input"
          type="search"
          placeholder="e.g. 0321, PRIMA-1004, Libaas, Zahra..."
          value={customerSearch}
          onFocus={() => setShowSearchDropdown(true)}
          onChange={(e) => {
            setCustomerSearch(e.target.value)
            setShowSearchDropdown(true)
          }}
          autoComplete="off"
        />

        {showSearchDropdown && searchResults.length > 0 && (
          <div className="admin-customer-dropdown">
            {searchResults.map((c, i) => (
              <button
                type="button"
                key={`${c.orderNumber}-${i}`}
                className="admin-customer-item"
                onClick={() => selectCustomer(c)}
              >
                <div className="admin-customer-item-top">
                  <span className="admin-customer-item-brand">{c.brand || 'Untitled Brand'}</span>
                  <span className="admin-customer-item-badge">
                    Order #{c.orderNumber} ({c.orderCount} {c.orderCount === 1 ? 'order' : 'orders'})
                  </span>
                </div>
                <div className="admin-customer-item-details">
                  <span>👤 {c.customer}</span>
                  {c.phone && <span>📞 {c.phone}</span>}
                  {c.address && <span>📍 {c.address}</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {loadedCustomerBadge && (
          <div className="admin-customer-badge">
            <span>
              ✓ <strong>Repeat Customer Loaded:</strong> {loadedCustomerBadge}
            </span>
            <button type="button" onClick={clearCustomer}>
              Clear / New Customer
            </button>
          </div>
        )}
      </div>

      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Customer name</span>
          <input
            name="customer"
            required
            maxLength={150}
            placeholder="e.g. Muhammad Ali"
            value={customer}
            onChange={(e) => {
              setCustomer(e.target.value)
              if (loadedCustomerBadge) setLoadedCustomerBadge(null)
            }}
          />
        </label>

        <label className="admin-field">
          <span>Brand name</span>
          <input
            name="brand"
            required
            maxLength={200}
            placeholder="e.g. Nora Clothing"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value)
              if (loadedCustomerBadge) setLoadedCustomerBadge(null)
            }}
          />
        </label>

        <label className="admin-field">
          <span>Customer phone (optional)</span>
          <input
            name="phone"
            type="tel"
            maxLength={40}
            placeholder="0300 1234567"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (loadedCustomerBadge) setLoadedCustomerBadge(null)
            }}
          />
          {phoneSuggestion && (
            <div className="admin-customer-suggestion-pill">
              <span>
                Found past customer: <strong>{phoneSuggestion.brand}</strong> ({phoneSuggestion.customer})
              </span>
              <button type="button" onClick={() => selectCustomer(phoneSuggestion)}>
                Auto-fill
              </button>
            </div>
          )}
        </label>

        <label className="admin-field">
          <span>Customer address (optional)</span>
          <textarea
            name="address"
            maxLength={500}
            rows={2}
            placeholder="Shop / House, Street, Area, City"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </div>

      {/* 2. Order details & products */}
      <h3>2. Order details</h3>
      <div className="admin-product-picker">
        <select
          aria-label="Product name"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value)
            setSize('')
            setIsCustomSize(false)
            setCustomSizeText('')
          }}
        >
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>

        {!isCustomSize ? (
          <select
            aria-label="Product size"
            value={size || sizes[0] || ''}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                setIsCustomSize(true)
              } else {
                setSize(e.target.value)
              }
            }}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="__custom__">✎ + Custom size...</option>
          </select>
        ) : (
          <div className="admin-custom-size-box">
            <input
              type="text"
              aria-label="Custom size specification"
              placeholder="Enter custom size (e.g. 3 x 4.5 in)"
              value={customSizeText}
              onChange={(e) => setCustomSizeText(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              className="admin-btn small secondary"
              onClick={() => {
                setIsCustomSize(false)
                setCustomSizeText('')
              }}
              title="Cancel custom size"
            >
              Reset
            </button>
          </div>
        )}

        <button type="button" className="admin-btn secondary" onClick={addProduct}>
          Add product
        </button>
        <button
          type="button"
          className="admin-text-btn"
          onClick={() =>
            setLines([
              ...lines,
              {
                id: crypto.randomUUID(),
                name: '',
                category: 'Other',
                size: '',
                quantity: '1',
                price: '',
                pricingMode: 'total',
              },
            ])
          }
        >
          + Custom item
        </button>
      </div>

      {lines.map((l) => {
        const qty = Number(l.quantity) || 1
        const priceNum = Number(l.price) || 0
        const isTotalMode = l.pricingMode === 'total'

        return (
          <div className="admin-edit-line" key={l.id}>
            <label className="admin-field">
              <span>Product name</span>
              <input value={l.name} required onChange={(e) => patch(l.id, { name: e.target.value })} />
            </label>

            <label className="admin-field">
              <span>Size / specification (Customizable)</span>
              <input
                required
                maxLength={500}
                placeholder="e.g. 0.75 x 2 in, 3 x 4.5 in"
                value={l.size}
                onChange={(e) => patch(l.id, { size: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Quantity</span>
              <input
                type="number"
                min="1"
                max="1000000"
                step="1"
                required
                value={l.quantity}
                onChange={(e) => patch(l.id, { quantity: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <div className="admin-price-toggle-group">
                <span>{isTotalMode ? 'Total price (Rs.)' : 'Price per piece (Rs.)'}</span>
                <div className="admin-price-toggle-btns">
                  <button
                    type="button"
                    className={`admin-price-toggle-btn ${isTotalMode ? 'active' : ''}`}
                    onClick={() => togglePricingMode(l, 'total')}
                    title="Enter total amount for this quantity"
                  >
                    Total
                  </button>
                  <button
                    type="button"
                    className={`admin-price-toggle-btn ${!isTotalMode ? 'active' : ''}`}
                    onClick={() => togglePricingMode(l, 'unit')}
                    title="Enter price per single piece"
                  >
                    Per piece
                  </button>
                </div>
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                placeholder={isTotalMode ? 'e.g. 3500' : 'e.g. 35'}
                value={l.price}
                onChange={(e) => patch(l.id, { price: e.target.value })}
              />
              {isTotalMode && qty > 0 && priceNum > 0 && (
                <small className="admin-muted">
                  Rs. {(priceNum / qty).toFixed(2)} / pc
                </small>
              )}
              {!isTotalMode && qty > 0 && priceNum > 0 && (
                <small className="admin-muted">
                  {qty} pcs × Rs. {priceNum} = Rs. {(qty * priceNum).toLocaleString()}
                </small>
              )}
            </label>

            <strong>{rs(lineTotal(l))}</strong>
            <button
              type="button"
              aria-label={`Remove ${l.name}`}
              onClick={() => setLines(lines.filter((i) => i.id !== l.id))}
            >
              ×
            </button>
          </div>
        )
      })}

      {/* 3. Charges & payment */}
      <h3>3. Charges & payment</h3>
      <p className="admin-muted">
        All amounts are required. Enter 0 when there is no discount, delivery charge or payment received.
      </p>
      <div className="admin-form-grid">
        {[
          ['Discount (Rs.)', discount, setDiscount],
          ['Delivery charged to customer (Rs.)', delivery, setDelivery],
          ['Amount received incl. advance (Rs.)', received, setReceived],
        ].map(([label, value, setter]) => (
          <label className="admin-field" key={String(label)}>
            <span>{String(label)}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="Enter amount, or 0"
              value={String(value)}
              onChange={(e) => (setter as (s: string) => void)(e.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="admin-detail-metrics">
        <div>
          Products total<strong>{rs(total)}</strong>
        </div>
        <div>
          Net order total<strong>{rs(net)}</strong>
        </div>
        <div>
          Remaining amount<strong>{rs(net - money(received || 0))}</strong>
        </div>
      </div>

      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}

      <div className="admin-form-footer">
        <p>Add the actual courier cost later from the Order Log.</p>
        <button className="admin-btn" disabled={busy || !lines.length}>
          {busy ? 'Saving…' : 'Save order'}
        </button>
      </div>
    </form>
  )
}
