import { getProductBySlug, type Product } from '@/data/products'

export interface CartLine {
  slug: string
  sizeIndex: number
  quantity: number
  options: Record<string, string>
}

export const CART_KEY = 'prima-cart-v1'
export function minimumQuantity(product: Product, sizeIndex: number) {
  if (product.sizes[sizeIndex]?.quantity) return 1
  return Number(product.moq?.match(/[\d,]+/)?.[0].replace(/,/g, '')) || 1
}
export function lineKey(line: CartLine) {
  return JSON.stringify([line.slug, line.sizeIndex, Object.entries(line.options).sort(([a], [b]) => a.localeCompare(b))])
}
export function normalizeCart(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return []
  const result: CartLine[] = []
  for (const entry of input.slice(0, 50)) {
    if (!entry || typeof entry !== 'object' || typeof entry.slug !== 'string') continue
    const product = getProductBySlug(entry.slug)
    if (!product || !Number.isInteger(entry.sizeIndex) || !product.sizes[entry.sizeIndex]) continue
    if (!Number.isInteger(entry.quantity) || entry.quantity < minimumQuantity(product, entry.sizeIndex) || entry.quantity > 100000) continue
    const options: Record<string, string> = {}
    for (const group of product.configuratorGroups || []) {
      const selected = group.options.find(option => option.value === entry.options?.[group.key])
      options[group.key] = (selected || group.options.find(option => option.popular) || group.options[0]).value
    }
    const line = { slug: product.slug, sizeIndex: entry.sizeIndex, quantity: entry.quantity, options }
    const previous = result.find(item => lineKey(item) === lineKey(line))
    if (previous) previous.quantity = Math.min(100000, previous.quantity + line.quantity)
    else result.push(line)
  }
  return result
}
export function lineTotal(line: CartLine) {
  const product = getProductBySlug(line.slug)
  if (!product || product.quoteOnly) return null
  return Math.round(product.sizes[line.sizeIndex].price * line.quantity * 100) / 100
}
export function cartSubtotal(lines: CartLine[]) {
  return Math.round(lines.reduce((sum, line) => sum + (lineTotal(line) || 0), 0) * 100) / 100
}
export interface CustomerDetails { name: string; phone: string; city: string; address: string; notes: string }
export function orderMessage(lines: CartLine[], customer: CustomerDetails) {
  const items = lines.map((line, index) => {
    const product = getProductBySlug(line.slug)!
    const size = product.sizes[line.sizeIndex]
    const options = (product.configuratorGroups || []).map(group => `${group.label}: ${line.options[group.key]}`).join('\n')
    return `${index + 1}. ${product.name}\nSize: ${size.sizeCategory || size.label}\n${size.printType ? `Print: ${size.printType}\n` : ''}${size.quantity ? `Pack: ${size.quantity}\nPacks: ${line.quantity}` : `Quantity: ${line.quantity} pieces`}${options ? `\n${options}` : ''}\n${product.quoteOnly ? 'Price: please quote' : `Estimated amount: Rs. ${lineTotal(line)!.toLocaleString('en-PK')}`}`
  })
  return `Salam Prima Packages, I would like to request a custom order.\n\n${items.join('\n\n')}\n\nPriced items subtotal: Rs. ${cartSubtotal(lines).toLocaleString('en-PK')}${lines.some(line => getProductBySlug(line.slug)?.quoteOnly) ? '\nCustom-quote items are additional.' : ''}\nDelivery charges and final pricing to be confirmed.\n\nName: ${customer.name.trim()}\nWhatsApp: ${customer.phone.trim()}\nCity: ${customer.city.trim()}\nAddress: ${customer.address.trim()}${customer.notes.trim() ? `\nNotes / artwork: ${customer.notes.trim()}` : ''}\n\nPlease help finalize my design. I understand production starts after design approval and 50% advance, with the balance payable before dispatch.`
}
