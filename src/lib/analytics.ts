export const GA_MEASUREMENT_ID = 'G-K849JBF65X'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export interface AnalyticsItem {
  item_id: string
  item_name: string
  item_category?: string
  price?: number
  quantity?: number
  item_variant?: string
  [key: string]: unknown
}

export interface TrackViewItemParams {
  product: {
    slug: string
    name: string
    category: string
    sizes?: Array<{ price: number; label: string; sizeCategory?: string }>
  }
  selectedSize?: {
    price: number
    label: string
    sizeCategory?: string
  }
  quantity?: number
}

export interface TrackAddToCartParams {
  product: {
    slug: string
    name: string
    category: string
  }
  size: {
    price: number
    label: string
    sizeCategory?: string
  }
  quantity: number
  options?: Record<string, string>
}

export interface TrackCartParams {
  lines: Array<{
    slug: string
    sizeIndex: number
    quantity: number
    options?: Record<string, string>
  }>
  subtotal: number
  getProductBySlug: (slug: string) => {
    slug: string
    name: string
    category: string
    sizes: Array<{ price: number; label: string; sizeCategory?: string }>
    quoteOnly?: boolean
  } | undefined
}

export interface TrackPurchaseParams extends TrackCartParams {
  transactionId: string
  customer?: {
    name?: string
    city?: string
    phone?: string
  }
}

export interface TrackWhatsAppClickParams {
  buttonLocation:
    | 'floating_button'
    | 'header'
    | 'product_page'
    | 'product_page_out_of_stock'
    | 'cart'
    | 'checkout'
    | 'checkout_fallback'
    | 'footer'
    | 'contact_page'
    | 'hero_slider'
    | 'home_ad_banner'
    | 'regional_page'
    | 'mobile_menu'
    | 'cta_button'
    | 'global_link'
  productName?: string
  productId?: string
  selectedSize?: string
  selectedQuantity?: number | string
  pagePath?: string
  text?: string
  value?: number
  currency?: string
}

export interface TrackGenerateLeadParams {
  value?: number
  currency?: string
  leadSource?: string
  items?: AnalyticsItem[]
}

export interface TrackContactClickParams {
  type: 'phone' | 'email'
  value: string
  buttonLocation?: string
  pagePath?: string
}

// Deduplication stores
const trackedPageviews = new Set<string>()
const trackedPurchases = new Set<string>()
let lastViewItemSlug = ''
let lastViewItemTime = 0

/**
 * Low-level safe dispatcher to window.gtag
 */
export function sendGtag(command: 'event' | 'config' | 'set' | 'js', ...args: unknown[]): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag(command, ...args)
  } else {
    // If gtag script has not loaded yet, push into dataLayer
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push([command, ...args])
  }
}

/**
 * Track SPA route change / Pageview
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined') return

  const pagePath = url || window.location.pathname + window.location.search
  const pageLocation = window.location.href
  const pageTitle = title || (typeof document !== 'undefined' ? document.title : '')

  sendGtag('event', 'page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: pageTitle,
    send_to: GA_MEASUREMENT_ID,
  })
}

/**
 * Track GA4 view_item event when viewing a product page
 */
export function trackViewItem({ product, selectedSize, quantity = 1 }: TrackViewItemParams): void {
  if (typeof window === 'undefined') return

  const now = Date.now()
  // Guard against React StrictMode duplicate renders within 500ms for same product
  if (lastViewItemSlug === product.slug && now - lastViewItemTime < 500) {
    return
  }
  lastViewItemSlug = product.slug
  lastViewItemTime = now

  const size = selectedSize || product.sizes?.[0]
  const price = size?.price || 0
  const variant = size?.sizeCategory || size?.label || ''

  const item: AnalyticsItem = {
    item_id: product.slug,
    item_name: product.name,
    item_category: product.category,
    price: price,
    quantity: quantity,
  }

  if (variant) {
    item.item_variant = variant
  }

  sendGtag('event', 'view_item', {
    currency: 'PKR',
    value: price,
    items: [item],
  })
}

/**
 * Track GA4 add_to_cart event
 */
export function trackAddToCart({ product, size, quantity, options }: TrackAddToCartParams): void {
  if (typeof window === 'undefined') return

  const price = size.price || 0
  const totalValue = price * quantity
  const variant = size.sizeCategory || size.label || ''

  const item: AnalyticsItem = {
    item_id: product.slug,
    item_name: product.name,
    item_category: product.category,
    price: price,
    quantity: quantity,
  }

  if (variant) {
    item.item_variant = variant
  }

  if (options && Object.keys(options).length > 0) {
    Object.assign(item, options)
  }

  sendGtag('event', 'add_to_cart', {
    currency: 'PKR',
    value: totalValue,
    items: [item],
  })
}

/**
 * Transform cart lines into standard GA4 items
 */
function buildCartItems(
  lines: TrackCartParams['lines'],
  getProductBySlug: TrackCartParams['getProductBySlug']
): AnalyticsItem[] {
  return lines
    .map((line) => {
      const product = getProductBySlug(line.slug)
      if (!product) return null

      const size = product.sizes?.[line.sizeIndex]
      const price = product.quoteOnly ? 0 : size?.price || 0
      const variant = size?.sizeCategory || size?.label || ''

      const item: AnalyticsItem = {
        item_id: product.slug,
        item_name: product.name,
        item_category: product.category,
        price: price,
        quantity: line.quantity,
      }

      if (variant) {
        item.item_variant = variant
      }

      if (line.options && Object.keys(line.options).length > 0) {
        Object.assign(item, line.options)
      }

      return item
    })
    .filter((item): item is AnalyticsItem => Boolean(item))
}

/**
 * Track GA4 view_cart event
 */
export function trackViewCart({ lines, subtotal, getProductBySlug }: TrackCartParams): void {
  if (typeof window === 'undefined' || lines.length === 0) return

  const items = buildCartItems(lines, getProductBySlug)

  sendGtag('event', 'view_cart', {
    currency: 'PKR',
    value: subtotal,
    items,
  })
}

/**
 * Track GA4 begin_checkout event
 */
export function trackBeginCheckout({ lines, subtotal, getProductBySlug }: TrackCartParams): void {
  if (typeof window === 'undefined' || lines.length === 0) return

  const items = buildCartItems(lines, getProductBySlug)

  sendGtag('event', 'begin_checkout', {
    currency: 'PKR',
    value: subtotal,
    items,
  })
}

/**
 * Track GA4 purchase event upon successful WhatsApp order dispatch
 */
export function trackPurchase({
  transactionId,
  lines,
  subtotal,
  getProductBySlug,
  customer,
}: TrackPurchaseParams): void {
  if (typeof window === 'undefined') return

  if (trackedPurchases.has(transactionId)) {
    return
  }
  trackedPurchases.add(transactionId)

  const items = buildCartItems(lines, getProductBySlug)

  const payload: Record<string, unknown> = {
    transaction_id: transactionId,
    value: subtotal,
    currency: 'PKR',
    shipping: 0,
    items,
  }

  if (customer?.city) {
    payload.customer_city = customer.city
  }

  sendGtag('event', 'purchase', payload)
}

/**
 * Track GA4 generate_lead event
 */
export function trackGenerateLead({
  value,
  currency = 'PKR',
  leadSource = 'whatsapp_checkout',
  items,
}: TrackGenerateLeadParams): void {
  if (typeof window === 'undefined') return

  const payload: Record<string, unknown> = {
    currency,
    lead_source: leadSource,
  }

  if (value !== undefined) payload.value = value
  if (items && items.length > 0) payload.items = items

  sendGtag('event', 'generate_lead', payload)
}

/**
 * Helper to generate a lead from cart lines
 */
export function trackCartGenerateLead({
  lines,
  subtotal,
  getProductBySlug,
  leadSource = 'whatsapp_checkout',
}: TrackCartParams & { leadSource?: string }): void {
  if (typeof window === 'undefined') return

  const items = buildCartItems(lines, getProductBySlug)
  trackGenerateLead({
    value: subtotal,
    currency: 'PKR',
    leadSource,
    items,
  })
}

/**
 * Track custom whatsapp_click event
 */
export function trackWhatsAppClick({
  buttonLocation,
  productName,
  productId,
  selectedSize,
  selectedQuantity,
  pagePath,
  text,
  value,
  currency,
}: TrackWhatsAppClickParams): void {
  if (typeof window === 'undefined') return

  const path = pagePath || window.location.pathname

  const payload: Record<string, unknown> = {
    button_location: buttonLocation,
    page_path: path,
  }

  if (productName) payload.product_name = productName
  if (productId) payload.product_id = productId
  if (selectedSize) payload.selected_size = selectedSize
  if (selectedQuantity !== undefined) payload.selected_quantity = selectedQuantity
  if (text) payload.message_preview = text.slice(0, 100)
  if (value !== undefined) payload.value = value
  if (currency) payload.currency = currency

  sendGtag('event', 'whatsapp_click', payload)
}

/**
 * Track contact clicks (tel:, mailto:)
 */
export function trackContactClick({
  type,
  value,
  buttonLocation,
  pagePath,
}: TrackContactClickParams): void {
  if (typeof window === 'undefined') return

  const path = pagePath || window.location.pathname

  const payload: Record<string, unknown> = {
    contact_type: type,
    contact_value: value,
    button_location: buttonLocation || 'direct_link',
    page_path: path,
  }

  // Fire general contact_click as well as specific phone_click / email_click
  sendGtag('event', 'contact_click', payload)
  sendGtag('event', type === 'phone' ? 'phone_click' : 'email_click', payload)
}
