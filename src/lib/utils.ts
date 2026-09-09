import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { WHATSAPP_NUMBER } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`
}

export function generateWhatsAppUrl(
  productName?: string,
  size?: string
): string {
  let message = 'Hi, I\'d like to enquire about your packaging products.'
  if (productName) {
    message = `Hi, I'd like to enquire about ${productName}`
    if (size) {
      message += ` – ${size}`
    }
    message += '.'
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
