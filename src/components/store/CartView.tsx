'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartProvider'
import { Icon } from './Icon'
import { cartSubtotal, lineKey, lineTotal, minimumQuantity, orderMessage, type CartLine, type CustomerDetails } from '@/lib/cart'
import { getProductBySlug } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { WHATSAPP_NUMBER } from '@/lib/constants'

function QuantityField({ line }: { line: CartLine }) {
  const { setQuantity } = useCart()
  const product = getProductBySlug(line.slug)!
  const min = minimumQuantity(product, line.sizeIndex)
  return <div className="cart-quantity"><button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={line.quantity <= min} onClick={() => setQuantity(lineKey(line), line.quantity - 1)}>−</button><input aria-label={`${product.name} ${product.sizes[line.sizeIndex].quantity ? 'pack count' : 'piece count'}`} type="number" inputMode="numeric" min={min} max={100000} value={line.quantity} onChange={event => { const quantity = Number(event.target.value); if (Number.isInteger(quantity) && quantity >= min && quantity <= 100000) setQuantity(lineKey(line), quantity) }} /><button type="button" aria-label={`Increase ${product.name} quantity`} disabled={line.quantity >= 100000} onClick={() => setQuantity(lineKey(line), line.quantity + 1)}>+</button></div>
}

export function CartView() {
  const { lines, ready, remove, storageError } = useCart()
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', phone: '', city: '', address: '', notes: '' })
  const [error, setError] = useState('')
  const [prepared, setPrepared] = useState('')
  const [copied, setCopied] = useState(false)
  const subtotal = cartSubtotal(lines)
  const hasQuotes = lines.some(line => getProductBySlug(line.slug)?.quoteOnly)
  const currentMessage = orderMessage(lines, customer)
  const preparedIsCurrent = prepared !== '' && prepared === currentMessage
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const digits = customer.phone.replace(/\D/g, '')
    if (customer.name.trim().length < 2 || customer.city.trim().length < 2 || customer.address.trim().length < 8) { setError('Please enter your name, city and complete delivery address.'); return }
    if (!/^(03\d{9}|923\d{9})$/.test(digits)) { setError('Enter a valid Pakistani WhatsApp number, for example 03001234567 or +923001234567.'); return }
    setError('')
    setCopied(false)
    setPrepared(currentMessage)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentMessage)}`, '_blank', 'noopener,noreferrer')
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(currentMessage); setCopied(true) }
    catch { setError('Copy is unavailable in this browser. Use the WhatsApp link or select the summary below.') }
  }
  return <div className="store-shell cart-page"><div className="cart-title"><div><p className="eyebrow">YOUR BRAND STARTS HERE</p><h1>Your packaging cart<span>{ready ? ` (${lines.length})` : ''}</span></h1></div><Link href="/catalog">Continue shopping</Link></div>
    {!ready ? <div className="empty-cart" role="status">Loading your saved cart…</div> : !lines.length ? <div className="empty-cart"><Icon name="bag" /><h2>A little empty. Full of possibilities.</h2><p>Find the labels, tags and packaging that feel like your brand.</p><Link href="/catalog" className="store-button">Explore packaging</Link></div> : <>
      {storageError && <p className="form-error" role="status">Your browser cannot save this cart. Keep this tab open until you send your request.</p>}
      <div className="cart-layout"><div className="cart-items"><div className="cart-section-label">Your selections <span>Custom made, just for you</span></div>{lines.map(line => {
        const product = getProductBySlug(line.slug)!
        const size = product.sizes[line.sizeIndex]
        return <article className="cart-item" key={lineKey(line)}><Link href={`/products/${product.slug}`} className="cart-item-image" tabIndex={-1} aria-hidden="true"><Image src={product.heroImage} alt="" fill sizes="110px" className="object-cover" /></Link><div className="cart-item-content"><span className="eyebrow">{product.category}</span><h2><Link href={`/products/${product.slug}`}>{product.name}</Link></h2><p>{size.sizeCategory || size.label}{size.quantity ? ` · ${size.quantity} per pack` : ' · Price per piece'}{size.printType ? ` · ${size.printType}` : ''}</p>{(product.configuratorGroups || []).map(group => <p key={group.key}>{group.label}: {line.options[group.key]}</p>)}<div className="cart-item-bottom"><QuantityField line={line} /><strong>{product.quoteOnly ? 'Quote pending' : formatPrice(lineTotal(line)!)}</strong></div><button type="button" className="remove-item" onClick={() => { remove(lineKey(line)); setPrepared('') }} aria-label={`Remove ${product.name} from cart`}>Remove</button></div></article>
      })}<div className="cart-process"><Icon name="check" /><div><strong>No payment needed on this website.</strong><p>Send your selections to our team. We’ll confirm the design and final price before requesting your 50% advance.</p></div></div></div>
      <aside className="checkout-panel"><p className="eyebrow">ONE STEP CLOSER</p><h2>Let’s make it yours.</h2><div className="cart-totals"><div><span>{hasQuotes ? 'Priced items subtotal' : 'Estimated subtotal'}</span><strong>{formatPrice(subtotal)}</strong></div>{hasQuotes && <div><span>Custom-quote items</span><span>Priced by our team</span></div>}<div><span>Delivery</span><span>Confirmed on WhatsApp</span></div></div><p className="checkout-explainer">This is a custom-order request. Your order is confirmed by our team after your specifications, design and advance are agreed.</p>
      <form onSubmit={submit} className="checkout-form"><h3>Your details</h3>{([{ key: 'name', label: 'Full name', placeholder: 'Your full name', autoComplete: 'name', max: 80 }, { key: 'phone', label: 'WhatsApp number', placeholder: '0300 1234567', autoComplete: 'tel', max: 20 }, { key: 'city', label: 'City', placeholder: 'e.g. Karachi', autoComplete: 'address-level2', max: 60 }] as const).map(field => <label key={field.key}>{field.label}<input name={field.key} type={field.key === 'phone' ? 'tel' : 'text'} autoComplete={field.autoComplete} required maxLength={field.max} placeholder={field.placeholder} value={customer[field.key]} onChange={event => { setCustomer(current => ({ ...current, [field.key]: event.target.value })); setError('') }} /></label>)}<label>Delivery address<textarea name="address" autoComplete="street-address" required minLength={8} maxLength={300} rows={2} placeholder="House / shop, street and area" value={customer.address} onChange={event => setCustomer(current => ({ ...current, address: event.target.value }))} /></label><label>Notes or artwork details <span>(optional)</span><textarea name="notes" maxLength={500} rows={2} placeholder="Brand name, preferred colors, or design help needed…" value={customer.notes} onChange={event => setCustomer(current => ({ ...current, notes: event.target.value }))} /></label><p className="privacy-note">Your details are included in the WhatsApp message you choose to send. Share your logo directly in that chat.</p>{error && <p role="alert" className="form-error">{error}</p>}<button className="store-button" type="submit">Continue on WhatsApp</button><p className="send-note">WhatsApp opens with your summary. Tap <strong>Send</strong> there to share your request.</p></form>
      {preparedIsCurrent && <div className="whatsapp-fallback" role="status"><strong>Your summary is ready—not yet confirmed.</strong><p>If WhatsApp didn’t open, use the link below. Your cart is still saved.</p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentMessage)}`} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a><button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy order summary'}</button><details><summary>View your message</summary><pre>{currentMessage}</pre></details></div>}
      </aside></div>
    </>}
  </div>
}
