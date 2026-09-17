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
  let message = 'Hi, I need packaging for my brand.\nProduct: \nQuantity: \nCity: '
  if (productName) {
    message = `Hi, I need packaging for my brand.\nProduct: ${productName}${size ? ` (${size})` : ''}\nQuantity: \nCity: `
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
