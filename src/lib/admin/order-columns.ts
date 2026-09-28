import type { Order, Workspace } from './types'
import { orderTotal, receivedFor, balanceFor, paymentStatus, settlementDate } from './domain.mjs'

export interface OrderColumn { label: string; value: (order: Order) => string | number; money?: boolean }

export function orderColumns(state: Workspace): OrderColumn[] {
  const delivery = (order: Order) => state.expenses.filter(e => !e.voided && e.orderId === order.id && e.category === 'Delivery')
  return [
    { label: 'Order ID', value: o => o.number },
    { label: 'Date', value: o => o.date },
    { label: 'Customer Name', value: o => o.customer },
    { label: 'Brand Name', value: o => o.brand },
    { label: 'No. of products', value: o => o.items.length },
    { label: 'Net Order Total (Rs)', money: true, value: o => orderTotal(o)/100 },
    { label: 'Received to Date incl. Advance (Rs)', money: true, value: o => receivedFor(state,o.id)/100 },
    { label: 'Payment Status', value: o => paymentStatus(state,o) },
    { label: 'Order Status', value: o => o.status === 'Production' ? 'In Production' : o.status },
    { label: 'Delivery Cost (Rs)', money: true, value: o => delivery(o).reduce((s,e) => s+e.amount,0)/100 },
    { label: 'Remaining Amount (Rs)', money: true, value: o => balanceFor(state,o)/100 },
    { label: 'Remaining Payment Date', value: o => balanceFor(state,o)>0 ? '—' : settlementDate(state,o) || 'Not recorded' },
  ]
}
