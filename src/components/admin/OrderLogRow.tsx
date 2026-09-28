'use client'

import { useState } from 'react'
import type { Order, Workspace } from '@/lib/admin/types'
import type { OrderColumn } from '@/lib/admin/order-columns'
import { balanceFor, money } from '@/lib/admin/domain.mjs'

export function OrderLogRow({ order, state, columns, busy, open, save }: {
  order:Order; state:Workspace; columns:OrderColumn[]; busy:boolean;
  open:()=>void; save:(action:string,payload:unknown)=>Promise<boolean>
}) {
  const cost=state.expenses.filter(e=>!e.voided&&e.orderId===order.id&&e.category==='Delivery').reduce((s,e)=>s+e.amount,0)
  const balance=balanceFor(state,order)
  const [status,setStatus]=useState(order.status)
  const [delivery,setDelivery]=useState(String(cost/100))
  const [clear,setClear]=useState(false)
  const [error,setError]=useState('')
  const changed=status!==order.status||Number(delivery)!==cost/100||clear
  async function update() {
    setError('')
    try {
      if(delivery.trim()===''||!Number.isFinite(Number(delivery))||Number(delivery)<0) throw new Error('Enter a valid delivery cost.')
      await save('updateOrderLog',{id:order.id,version:order.version,status,deliveryCost:money(delivery),expectedDeliveryCost:cost,expectedBalance:balance,clearRemaining:clear,date:new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Karachi'})})
    } catch(e) { setError(e instanceof Error?e.message:'Check the row.') }
  }
  return <tr>{columns.map(c=><td key={c.label} className={c.money?'admin-ledger-money':undefined}>
    {c.label==='Order ID'||c.label==='Brand Name'?<button className="admin-order-link" onClick={open}>{String(c.value(order))||'View details'}</button>
    :c.label==='Order Status'?<select aria-label={`Order status for ${order.number}`} disabled={busy||order.status==='Cancelled'} value={status} onChange={e=>setStatus(e.target.value as Order['status'])}>{[...new Set([order.status,'Confirmed','Production','Dispatched'])].map(s=><option key={s} value={s}>{s==='Production'?'In Production':s}</option>)}</select>
    :c.label==='Delivery Cost (Rs)'?<input aria-label={`Delivery cost for ${order.number}`} disabled={busy||order.status==='Cancelled'} type="number" min="0" step="0.01" value={delivery} onChange={e=>setDelivery(e.target.value)}/>
    :c.label==='Remaining Amount (Rs)'?<div className="admin-row-controls"><strong>{(balance/100).toLocaleString('en-PK',{minimumFractionDigits:2})}</strong>{balance>0&&order.status!=='Cancelled'&&<button type="button" className="admin-btn small secondary" aria-pressed={clear} disabled={busy} onClick={()=>setClear(!clear)}>{clear?'Undo clear':'Clear remaining'}</button>}{clear&&<small>Will record Rs. {(balance/100).toLocaleString('en-PK')} received when you click Update.</small>}</div>
    :c.label==='Payment Status'?<span className="admin-badge">{String(c.value(order))}</span>
    :c.money?Number(c.value(order)).toLocaleString('en-PK',{minimumFractionDigits:2,maximumFractionDigits:2}):String(c.value(order))||'—'}
  </td>)}<td><button className="admin-btn small" disabled={busy||!changed||order.status==='Cancelled'} onClick={update}>{busy?'Saving…':'Update'}</button>{error&&<p role="alert" className="admin-error">{error}</p>}</td></tr>
}
