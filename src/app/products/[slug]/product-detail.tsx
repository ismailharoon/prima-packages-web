'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/store/CartProvider'
import { Icon } from '@/components/store/Icon'
import { ProductCard } from '@/components/ui/ProductCard'
import { ProductReviews } from '@/components/reviews/ProductReviews'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'
import { getProductRatingSummary } from '@/data/reviews'

export function ProductDetail({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const { add, ready } = useCart()
  const isOutOfStock = product.discountBadge === 'Out of Stock'
  const isHangTags = product.slug === 'hang-tags'
  const [sizeIndex, setSizeIndex] = useState(0)
  const [packQuantity, setPackQuantity] = useState('1')
  const [imageIndex, setImageIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const [hangTagPrint, setHangTagPrint] = useState<'One Side' | 'Double Side'>('One Side')
  const [hangTagQty, setHangTagQty] = useState<'100 pcs' | '500 pcs' | '1,000 pcs' | '2,000 pcs'>('100 pcs')
  const [hangTagString, setHangTagString] = useState<boolean>(false)

  const stringCosts: Record<string, number> = {
    '100 pcs': 300,
    '500 pcs': 500,
    '1,000 pcs': 600,
    '2,000 pcs': 1000,
  }
  const currentStringCost = stringCosts[hangTagQty] || 300

  const updateHangTag = (
    newPrint: 'One Side' | 'Double Side',
    newQty: '100 pcs' | '500 pcs' | '1,000 pcs' | '2,000 pcs',
    newString: boolean
  ) => {
    setHangTagPrint(newPrint)
    setHangTagQty(newQty)
    setHangTagString(newString)
    const targetCategory = newString ? `${newPrint} + Tag Card String` : newPrint
    const idx = product.sizes.findIndex(
      (s) => s.sizeCategory === targetCategory && s.quantity === newQty
    )
    if (idx !== -1) {
      setSizeIndex(idx)
      setPackQuantity('1')
      setAdded(false)
    }
  }

  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (product.configuratorGroups || []).map((group) => [
        group.key,
        (group.options.find((option) => option.popular) || group.options[0]).value,
      ])
    )
  )

  const size = product.sizes[sizeIndex] || product.sizes[0]
  const colors = [...new Set(product.sizes.map((item) => item.color).filter(Boolean))] as string[]
  const selectedColor = size?.color || (colors.length > 0 ? colors[0] : '')

  // Filter sizes available for selected color
  const sizesForColor = product.sizes.filter((item) => !selectedColor || item.color === selectedColor)
  const sizeCategories = [...new Set(sizesForColor.map((item) => item.sizeCategory || item.label))]
  const selectedCategory = size?.sizeCategory || size?.label || sizeCategories[0]

  // Available quantity packs for selected size and color
  const tiersForSize = product.sizes
    .map((item, index) => ({ ...item, index }))
    .filter(
      (item) =>
        (item.sizeCategory || item.label) === selectedCategory &&
        (!selectedColor || item.color === selectedColor)
    )

  const countPacks = Math.max(1, parseInt(packQuantity, 10) || 1)
  const total = Math.round(size.price * countPacks * 100) / 100
  const images = product.gallery.length ? product.gallery : [product.heroImage]
  const ratingSummary = getProductRatingSummary(product.slug)

  const handleColorChange = (newColor: string) => {
    const nextItem = product.sizes.find((item) => item.color === newColor)
    if (nextItem) {
      setSizeIndex(product.sizes.indexOf(nextItem))
      setPackQuantity('1')
      setAdded(false)
    }
  }

  const handleSizeChange = (newCategory: string) => {
    const nextItem = product.sizes.find(
      (item) =>
        (item.sizeCategory || item.label) === newCategory &&
        (!selectedColor || item.color === selectedColor)
    )
    if (nextItem) {
      setSizeIndex(product.sizes.indexOf(nextItem))
      setPackQuantity('1')
      setAdded(false)
    }
  }

  const handleTierChange = (newIndex: number) => {
    setSizeIndex(newIndex)
    setPackQuantity('1')
    setAdded(false)
  }

  const addItem = () => {
    if (!ready || isOutOfStock) return
    add({ slug: product.slug, sizeIndex, quantity: countPacks, options })
    setAdded(true)
  }

  return (
    <>
      <section className="store-shell product-layout">
        {/* Photo Gallery */}
        <div className="product-gallery">
          <div className="product-main-photo">
            <Image
              src={images[imageIndex]}
              alt={`${product.name}, view ${imageIndex + 1}`}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 700px) 100vw, 600px"
              className="object-contain p-4"
            />
            {product.discountBadge && <span className="shop-badge">{product.discountBadge}</span>}
            <span className="gallery-counter">
              {imageIndex + 1} / {images.length}
            </span>
          </div>
          <div className="product-thumbnails" aria-label="Product photos">
            {images.map((src, index) => (
              <button
                type="button"
                key={src}
                onClick={() => setImageIndex(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === imageIndex}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain p-1" />
              </button>
            ))}
          </div>
          <p className="gallery-caption">Made to order with your artwork. Photos show sample designs.</p>
        </div>

        {/* Product Details & Purchase Form */}
        <div className="product-buy">
          <p className="eyebrow">PRIMA PACKAGES / {product.category.toUpperCase()}</p>
          <h1>{product.name}</h1>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 mt-1 mb-2.5">
            <div className="flex text-amber-400 text-sm leading-none">
              {'★'.repeat(Math.round(ratingSummary.average))}
            </div>
            <span className="text-xs font-extrabold text-charcoal">
              {ratingSummary.average.toFixed(1)} / 5.0
            </span>
            <span className="text-xs text-charcoal/60 font-medium">
              ({ratingSummary.total} {ratingSummary.total === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <p className="product-intro">{product.shortDescription}</p>

          {/* Dynamic Price Display */}
          <div className="product-price">
            {isOutOfStock ? (
              <strong className="text-neutral-600">Currently Out of Stock</strong>
            ) : product.quoteOnly ? (
              <strong>Made to your specification</strong>
            ) : (
              <>
                <strong>{formatPrice(total)}</strong>
                <span>
                  {size.quantity
                    ? `${countPacks > 1 ? `${countPacks} × ` : ''}${size.quantity}${
                        size.unitPrice ? ` (${formatPrice(size.unitPrice)} / piece)` : ''
                      }`
                    : `for ${size.label}`}
                </span>
              </>
            )}
          </div>

          <p className="product-price-note">
            {isOutOfStock
              ? 'This product is currently out of stock. Contact our team on WhatsApp for availability.'
              : product.quoteOnly
              ? 'Our team will confirm your price on WhatsApp.'
              : isHangTags
              ? hangTagString
                ? `Hang Tag Card: Rs. ${(size.price - currentStringCost).toLocaleString()} + Tag Card String: Rs. ${currentStringCost.toLocaleString()} = Rs. ${size.price.toLocaleString()}`
                : `350 GSM Bleach Card · Card only (Tag Card String available at Rs. ${currentStringCost.toLocaleString()} for ${hangTagQty})`
              : 'Official rate. Final artwork, design proof and delivery confirmed on WhatsApp.'}
          </p>

          <div className="product-trust">
            <span>
              <Icon name="check" />
              {product.moq}
            </span>
            <span>
              <Icon name="box" />
              {product.dispatchDays} production*
            </span>
          </div>

          {/* Simple Clean Dropdowns For Configuration */}
          {!isOutOfStock && !product.quoteOnly && (
            <div className="space-y-4 my-5">
              {isHangTags ? (
                <>
                  {/* Hang Tag Print Style Dropdown */}
                  <div className="option-block !mt-0">
                    <label htmlFor="hangtag-print" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      1. Print Side (350 GSM · 2 × 3.5 in)
                    </label>
                    <select
                      id="hangtag-print"
                      value={hangTagPrint}
                      onChange={(e) => updateHangTag(e.target.value as 'One Side' | 'Double Side', hangTagQty, hangTagString)}
                      className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="One Side">One Side Printed</option>
                      <option value="Double Side">Double Side Printed</option>
                    </select>
                  </div>

                  {/* Hang Tag Quantity Dropdown */}
                  <div className="option-block !mt-0">
                    <label htmlFor="hangtag-qty" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      2. Select Quantity
                    </label>
                    <select
                      id="hangtag-qty"
                      value={hangTagQty}
                      onChange={(e) => updateHangTag(hangTagPrint, e.target.value as '100 pcs' | '500 pcs' | '1,000 pcs' | '2,000 pcs', hangTagString)}
                      className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="100 pcs">100 pcs — {hangTagPrint === 'One Side' ? 'Rs. 2,600' : 'Rs. 3,600'}</option>
                      <option value="500 pcs">500 pcs — {hangTagPrint === 'One Side' ? 'Rs. 3,200' : 'Rs. 4,200'}</option>
                      <option value="1,000 pcs">1,000 pcs — {hangTagPrint === 'One Side' ? 'Rs. 3,800' : 'Rs. 4,800'}</option>
                      <option value="2,000 pcs">2,000 pcs — {hangTagPrint === 'One Side' ? 'Rs. 6,000' : 'Rs. 7,800'}</option>
                    </select>
                  </div>

                  {/* Hang Tag String (Tag Dori) Dropdown */}
                  <div className="option-block !mt-0">
                    <label htmlFor="hangtag-string" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      3. Tag Card String (Tag Dori)
                    </label>
                    <select
                      id="hangtag-string"
                      value={hangTagString ? 'yes' : 'no'}
                      onChange={(e) => updateHangTag(hangTagPrint, hangTagQty, e.target.value === 'yes')}
                      className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="no">Without String (Cards Only) — Rs. 0</option>
                      <option value="yes">With Tag Card String (+ Rs. {currentStringCost.toLocaleString()})</option>
                    </select>
                  </div>

                  {/* Official Rate List Table */}
                  <div className="p-3.5 bg-[#FAF8F4] border border-[#CDD5C7] rounded-xl text-xs">
                    <div className="font-bold text-charcoal mb-2 flex items-center justify-between">
                      <span className="tracking-wide">TAG CARDS RATE LIST (350 GSM · 2 × 3.5 INCH)</span>
                      <span className="text-[11px] font-semibold text-emerald-800">Price in PKR</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#CDD5C7] text-charcoal/80">
                            <th className="py-1.5 font-bold">Print</th>
                            <th className="py-1.5 font-semibold text-center">100 pcs</th>
                            <th className="py-1.5 font-semibold text-center">500 pcs</th>
                            <th className="py-1.5 font-semibold text-center">1,000 pcs</th>
                            <th className="py-1.5 font-semibold text-center">2,000 pcs</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEFE5]">
                          <tr className={hangTagPrint === 'One Side' ? 'bg-amber-50/60 font-semibold text-charcoal' : ''}>
                            <td className="py-1.5 font-semibold text-charcoal">One Side</td>
                            <td className="py-1.5 text-center text-charcoal/90">2,600</td>
                            <td className="py-1.5 text-center text-charcoal/90">3,200</td>
                            <td className="py-1.5 text-center text-charcoal/90">3,800</td>
                            <td className="py-1.5 text-center text-charcoal/90">6,000</td>
                          </tr>
                          <tr className={hangTagPrint === 'Double Side' ? 'bg-amber-50/60 font-semibold text-charcoal' : ''}>
                            <td className="py-1.5 font-semibold text-charcoal">Double Side</td>
                            <td className="py-1.5 text-center text-charcoal/90">3,600</td>
                            <td className="py-1.5 text-center text-charcoal/90">4,200</td>
                            <td className="py-1.5 text-center text-charcoal/90">4,800</td>
                            <td className="py-1.5 text-center text-charcoal/90">7,800</td>
                          </tr>
                          <tr className={hangTagString ? 'bg-emerald-50/80 font-bold text-emerald-950' : 'text-charcoal/80'}>
                            <td className="py-1.5 font-semibold text-emerald-900">Tag Card String</td>
                            <td className="py-1.5 text-center text-emerald-900">300</td>
                            <td className="py-1.5 text-center text-emerald-900">500</td>
                            <td className="py-1.5 text-center text-emerald-900">600</td>
                            <td className="py-1.5 text-center text-emerald-900">1,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Color Dropdown */}
                  {colors.length > 0 && (
                    <div className="option-block !mt-0">
                      <label htmlFor="product-color" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                        Select Color
                      </label>
                      <select
                        id="product-color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                      >
                        {colors.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Size Dropdown */}
                  {sizeCategories.length > 0 && (
                    <div className="option-block !mt-0">
                      <label htmlFor="product-size" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                        1. Select Size
                      </label>
                      <select
                        id="product-size"
                        value={selectedCategory}
                        onChange={(e) => handleSizeChange(e.target.value)}
                        className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                      >
                        {sizeCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Quantity / Pack Dropdown */}
                  {tiersForSize.length > 0 && (
                    <div className="option-block !mt-0">
                      <label htmlFor="product-tier" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                        2. Select Quantity
                      </label>
                      <select
                        id="product-tier"
                        value={sizeIndex}
                        onChange={(e) => handleTierChange(Number(e.target.value))}
                        className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                      >
                        {tiersForSize.map((tier) => (
                          <option key={tier.index} value={tier.index}>
                            {tier.quantity || tier.label} — {formatPrice(tier.price)}
                            {tier.unitPrice ? ` (${formatPrice(tier.unitPrice)} / piece)` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Optional Configurator Dropdowns */}
                  {(product.configuratorGroups || []).map((group) => (
                    <div key={group.key} className="option-block !mt-0">
                      <label htmlFor={`config-${group.key}`} className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                        {group.label}
                      </label>
                      <select
                        id={`config-${group.key}`}
                        value={options[group.key]}
                        onChange={(e) => {
                          setOptions((current) => ({ ...current, [group.key]: e.target.value }))
                          setAdded(false)
                        }}
                        className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm focus:border-emerald-600 focus:outline-none"
                      >
                        {group.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </>
              )}

              {/* Number of Packs (if customer wants multiples of 50/100/500) */}
              <div className="option-block quantity-block !mt-0">
                <label htmlFor="product-quantity" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Number of Packs
                </label>
                <input
                  id="product-quantity"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={50}
                  step={1}
                  value={packQuantity}
                  onChange={(e) => {
                    setPackQuantity(e.target.value)
                    setAdded(false)
                  }}
                  className="w-full bg-white border border-[#CDD5C7] rounded-lg p-3 text-sm font-semibold text-charcoal shadow-sm"
                />
              </div>

              {/* Custom Size / Bulk Quote Box */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#EAEFE5] text-xs text-[#4A554D] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <strong className="block text-charcoal font-bold">Need a custom size, special GSM, or volume order?</strong>
                  <span className="text-[11px] text-[#6B756E]">
                    We manufacture customized sizes, materials, and bulk runs tailored to your brand.
                  </span>
                </div>
                <a
                  href={`https://wa.me/923233231712?text=${encodeURIComponent(
                    `Hi Prima Packages, I need a custom quote for ${product.name}.\nSize / Dimensions:\nQuantity:\nCity:`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 underline whitespace-nowrap text-xs"
                >
                  WhatsApp Quote →
                </a>
              </div>
            </div>
          )}

          {/* Action Button */}
          {isOutOfStock ? (
            <a
              href={`https://wa.me/923233231712?text=${encodeURIComponent(
                `Hi Prima Packages, I would like to inquire about stock and availability for ${product.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button inline-flex items-center justify-center gap-2 bg-[#2D4A36] text-white w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#1E3325] transition-all"
            >
              <Icon name="bag" /> Inquire Availability on WhatsApp
            </a>
          ) : (
            <button
              className="store-button add-cart-button"
              type="button"
              disabled={!ready}
              onClick={addItem}
            >
              <Icon name={added ? 'check' : 'bag'} />
              {!ready
                ? 'Loading cart…'
                : added
                ? 'Add another selection'
                : product.quoteOnly
                ? 'Add quote request to cart'
                : 'Add to cart'}
            </button>
          )}

          {added && (
            <Link className="view-cart-link" href="/cart">
              Review your cart & continue
            </Link>
          )}

          <div className="custom-order-note">
            <strong>Your design gets the final say.</strong>
            <p>
              We’ll finalize your design with you on WhatsApp. Production begins after design approval and 50%
              advance. Balance before dispatch.
            </p>
            <small>*Production estimate starts after approval and advance verification. Delivery time is additional.</small>
          </div>

          <div className="product-details">
            {[
              ['Product details', product.longDescription],
              ['Materials & finishes', [...(product.materials || []), ...(product.finishes || [])].join(' · ')],
              ['More about this product', product.seoContentBlock || ''],
              [
                'Artwork & delivery',
                'Share your logo or artwork on WhatsApp after sending your order request. Our team will confirm the final specifications, delivery charges and timeline before production.',
              ],
            ]
              .filter(([, text]) => text)
              .map(([title, text]) => (
                <details key={title}>
                  <summary>
                    {title}
                    <span>+</span>
                  </summary>
                  <p>{text}</p>
                </details>
              ))}
          </div>
        </div>
      </section>

      <ProductReviews product={product} />

      <section className="store-shell shop-section product-related">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COMPLETE YOUR BRAND PACKAGING</p>
            <h2>Better together.</h2>
          </div>
          <Link href="/catalog">Shop all</Link>
        </div>
        <div className="store-grid">
          {allProducts
            .filter((item) => item.slug !== product.slug)
            .slice(0, 4)
            .map((item) => (
              <ProductCard product={item} key={item.slug} />
            ))}
        </div>
      </section>

      <div className="mobile-buy-bar">
        <div>
          <strong>{isOutOfStock ? 'Out of Stock' : product.quoteOnly ? 'Custom quote' : formatPrice(total)}</strong>
          <span>
            {isOutOfStock
              ? 'Contact WhatsApp'
              : size.quantity
              ? `${countPacks > 1 ? `${countPacks} × ` : ''}${size.quantity}`
              : `for ${size.label}`}
          </span>
        </div>
        {isOutOfStock ? (
          <a
            href={`https://wa.me/923233231712?text=${encodeURIComponent(
              `Hi Prima Packages, I would like to inquire about stock and availability for ${product.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <Icon name="bag" /> Inquire
          </a>
        ) : (
          <button type="button" className="store-button" onClick={addItem} disabled={!ready}>
            <Icon name="bag" /> Add to cart
          </button>
        )}
      </div>
    </>
  )
}
