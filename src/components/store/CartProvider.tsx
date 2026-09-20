'use client'

import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import Link from 'next/link'
import { CART_KEY, lineKey, normalizeCart, type CartLine } from '@/lib/cart'

type State = { lines: CartLine[]; ready: boolean; notice: string; storageError: boolean }
type Action = { type: 'load'; lines: CartLine[] } | { type: 'add'; line: CartLine } | { type: 'quantity'; key: string; quantity: number } | { type: 'remove'; key: string } | { type: 'dismiss' } | { type: 'storageError' }
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load': return { ...state, lines: action.lines, ready: true }
    case 'add': return { ...state, lines: normalizeCart([...state.lines, action.line]), notice: 'Added to your cart' }
    case 'quantity': return { ...state, lines: normalizeCart(state.lines.map(line => lineKey(line) === action.key ? { ...line, quantity: action.quantity } : line)) }
    case 'remove': return { ...state, lines: state.lines.filter(line => lineKey(line) !== action.key) }
    case 'dismiss': return { ...state, notice: '' }
    case 'storageError': return { ...state, storageError: true }
  }
}
const CartContext = createContext<{
  lines: CartLine[]; ready: boolean; storageError: boolean
  add: (line: CartLine) => void; remove: (key: string) => void; setQuantity: (key: string, quantity: number) => void
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], ready: false, notice: '', storageError: false })
  useEffect(() => {
    try { dispatch({ type: 'load', lines: normalizeCart(JSON.parse(localStorage.getItem(CART_KEY) || '[]')) }) }
    catch { dispatch({ type: 'load', lines: [] }) }
    const sync = (event: StorageEvent) => {
      if (event.key !== CART_KEY) return
      try { dispatch({ type: 'load', lines: normalizeCart(JSON.parse(event.newValue || '[]')) }) } catch { /* Ignore malformed external changes. */ }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  useEffect(() => {
    if (!state.ready) return
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.lines)) }
    catch { dispatch({ type: 'storageError' }) }
  }, [state.lines, state.ready])
  useEffect(() => {
    if (!state.notice) return
    const timer = setTimeout(() => dispatch({ type: 'dismiss' }), 5000)
    return () => clearTimeout(timer)
  }, [state.notice, state.lines])
  return <CartContext.Provider value={{ lines: state.lines, ready: state.ready, storageError: state.storageError, add: line => dispatch({ type: 'add', line }), remove: key => dispatch({ type: 'remove', key }), setQuantity: (key, quantity) => dispatch({ type: 'quantity', key, quantity }) }}>
    {children}
    {state.notice && <div className="cart-notice" role="status"><span>✓ {state.notice}</span><Link href="/cart" onClick={() => dispatch({ type: 'dismiss' })}>View cart</Link><button aria-label="Dismiss notification" onClick={() => dispatch({ type: 'dismiss' })}>×</button></div>}
  </CartContext.Provider>
}
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('CartProvider is required')
  return context
}
