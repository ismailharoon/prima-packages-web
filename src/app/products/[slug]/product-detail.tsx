'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/store/CartProvider'
import { Icon } from '@/components/store/Icon'
import { ProductCard } from '@/components/ui/ProductCard'
import { minimumQuantity } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/products'

export function ProductDetail({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const { add, ready } = useCart()
  const [sizeIndex, setSizeIndex] = useState(0)
  const [quantity, setQuantity] = useState(String(minimumQuantity(product, 0)))
  const [imageIndex, setImageIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const [options, setOptions] = useState<Record<string, string>>(() => Object.fromEntries((product.configuratorGroups || []).map(group => [group.key, (group.options.find(option => option.popular) || group.options[0]).value])))
  const size = product.sizes[sizeIndex]
  const sizeCategory = size.sizeCategory || size.label
  const categories = [...new Set(product.sizes.map(item => item.sizeCategory || item.label))]
  const tiers = product.sizes.map((item, index) => ({ ...item, index })).filter(item => (item.sizeCategory || item.label) === sizeCategory)
  const min = minimumQuantity(product, sizeIndex)
  const count = Number(quantity)
  const valid = Number.isInteger(count) && count >= min && count <= 100000
  const total = Math.round(size.price * (valid ? count : min) * 100) / 100
  const images = product.gallery.length ? product.gallery : [product.heroImage]
  const selectSize = (index: number) => { setSizeIndex(index); setQuantity(String(minimumQuantity(product, index))); setAdded(false) }
  const addItem = () => {
    if (!valid || !ready) return
    add({ slug: product.slug, sizeIndex, quantity: count, options })
    setAdded(true)
  }
  return <>
    <section className="store-shell product-layout">
      <div className="product-gallery"><div className="product-main-photo"><Image src={images[imageIndex]} alt={`${product.name}, view ${imageIndex + 1}`} fill loading="eager" fetchPriority="high" sizes="(max-width: 700px) 100vw, 600px" className="object-cover" />{product.discountBadge && <span className="shop-badge">{product.discountBadge}</span>}<span className="gallery-counter">{imageIndex + 1} / {images.length}</span></div><div className="product-thumbnails" aria-label="Product photos">{images.map((src, index) => <button type="button" key={src} onClick={() => setImageIndex(index)} aria-label={`Show photo ${index + 1}`} aria-pressed={index === imageIndex}><Image src={src} alt="" fill sizes="80px" className="object-cover" /></button>)}</div><p className="gallery-caption">Made to order with your artwork. Photos show sample designs.</p></div>
      <div className="product-buy"><p className="eyebrow">PRIMA PACKAGES / {product.category.toUpperCase()}</p><h1>{product.name}</h1><p className="product-intro">{product.shortDescription}</p>
        <div className="product-price">{product.quoteOnly ? <strong>Made to your specification</strong> : <><strong>{formatPrice(total)}</strong><span>{size.quantity ? `${count || 1} × ${size.quantity}` : `for ${valid ? count : min} pieces`}</span></>}</div>
        <p className="product-price-note">{product.quoteOnly ? 'Our team will confirm your price on WhatsApp.' : 'Estimated price. Final artwork, options and delivery confirmed on WhatsApp.'}</p>
        <div className="product-trust"><span><Icon name="check" />{product.moq}</span><span><Icon name="box" />{product.dispatchDays} production*</span></div>
        {!product.quoteOnly && <div className="option-block"><label htmlFor="product-size">1. Choose your size</label><select id="product-size" value={sizeCategory} onChange={event => selectSize(product.sizes.findIndex(item => (item.sizeCategory || item.label) === event.target.value))}>{categories.map(category => <option key={category}>{category}</option>)}</select></div>}
        {!product.quoteOnly && size.quantity && <fieldset className="option-block"><legend>2. Choose your pack</legend><div className="pack-options">{tiers.map(tier => <button type="button" key={tier.index} aria-pressed={tier.index === sizeIndex} onClick={() => selectSize(tier.index)}><strong>{tier.quantity}</strong>{tier.printType && <span>{tier.printType}</span>}<b>{formatPrice(tier.price)}</b></button>)}</div></fieldset>}
        {(product.configuratorGroups || []).map(group => <fieldset key={group.key} className="option-block"><legend>{group.label}</legend><div className="choice-chips">{group.options.map(option => <button type="button" key={option.value} aria-pressed={options[group.key] === option.value} onClick={() => { setOptions(current => ({ ...current, [group.key]: option.value })); setAdded(false) }}>{option.label}</button>)}</div></fieldset>)}
        <div className="option-block quantity-block"><label htmlFor="product-quantity">{size.quantity ? 'Number of packs' : `Quantity (minimum ${min} pieces)`}</label><input id="product-quantity" type="number" inputMode="numeric" min={min} max={100000} step={1} value={quantity} onChange={event => { setQuantity(event.target.value); setAdded(false) }} aria-invalid={!valid} aria-describedby={!valid ? 'quantity-error' : undefined} />{!valid && <p id="quantity-error" className="form-error">Enter a whole number from {min} to 100,000.</p>}</div>
        <button className="store-button add-cart-button" type="button" disabled={!valid || !ready} onClick={addItem}><Icon name={added ? 'check' : 'bag'} />{!ready ? 'Loading cart…' : added ? 'Add another selection' : product.quoteOnly ? 'Add quote request to cart' : 'Add to cart'}</button>
        {added && <Link className="view-cart-link" href="/cart">Review your cart & continue</Link>}
        <div className="custom-order-note"><strong>Your design gets the final say.</strong><p>We’ll finalize your design with you on WhatsApp. Production begins after design approval and 50% advance. Balance before dispatch.</p><small>*Production estimate starts after approval and advance verification. Delivery time is additional.</small></div>
        <div className="product-details">{[['Product details', product.longDescription], ['Materials & finishes', [...(product.materials || []), ...(product.finishes || [])].join(' · ')], ['More about this product', product.seoContentBlock || ''], ['Artwork & delivery', 'Share your logo or artwork on WhatsApp after sending your order request. Our team will confirm the final specifications, delivery charges and timeline before production.']].filter(([, text]) => text).map(([title, text]) => <details key={title}><summary>{title}<span>+</span></summary><p>{text}</p></details>)}</div>
      </div>
    </section>
    <section className="store-shell shop-section product-related"><div className="section-heading"><div><p className="eyebrow">COMPLETE YOUR BRAND PACKAGING</p><h2>Better together.</h2></div><Link href="/catalog">Shop all</Link></div><div className="store-grid">{allProducts.filter(item => item.slug !== product.slug).slice(0, 4).map(item => <ProductCard product={item} key={item.slug} />)}</div></section>
    <div className="mobile-buy-bar"><div><strong>{product.quoteOnly ? 'Custom quote' : formatPrice(total)}</strong><span>{size.quantity ? `${count || 1} × ${size.quantity}` : `${valid ? count : min} pieces`}</span></div><button type="button" className="store-button" onClick={addItem} disabled={!valid || !ready}><Icon name="bag" />Add to cart</button></div>
  </>
}
