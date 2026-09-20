import type { Metadata } from 'next'
import { CartView } from '@/components/store/CartView'

export const metadata: Metadata = {
  title: 'Your Packaging Cart',
  description: 'Review your custom packaging selections and send your request to Prima Packages on WhatsApp.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/cart' },
}
export default function CartPage() { return <CartView /> }
