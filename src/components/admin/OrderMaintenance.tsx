'use client'
import { useState, type FormEvent } from 'react'
import type { Expense, Order, Workspace } from '@/lib/admin/types'
import { money } from '@/lib/admin/domain.mjs'
import { products } from '@/data/products'

type Save = (action:string,payload:unknown)=>Promise<boolean>

const categories:Record<string,string>={
  'woven-labels':'Woven Label',
  'zipper-bags':'Slider Bag/Zipper Bag',
  'hang-tags':'Hang Tags',
  'thank-you-cards':'Thank You Card',
  'business-cards':'Business Cards',
  'courier-flyer-bags':'Courier Flyers',
  'carry-bags':'Carry Bag',
  'round-stickers':'Round Stickers',
  'butter-paper':'Other',
  'ribbon-tags':'Ribbons',
  'tag-card-string':'Tag Card String',
  'size-labels':'Size Label'
}

export function DeleteOrder({order,state,busy,save}:{order:Order;state:Workspace;busy:boolean;save:Save}) {
 const [open,setOpen]=useState(false),[confirm,setConfirm]=useState('')
 return <section className="admin-panel admin-form"><h3>Delete order permanently</h3><p>This removes the order, its products, all linked payments (including advance) and all linked expenses. Totals will be recalculated. Cancellation keeps these records; deletion does not issue a refund.</p>{!open?<button className="admin-btn secondary" disabled={busy} onClick={()=>setOpen(true)}>Delete this order</button>:<form onSubmit={async e=>{e.preventDefault();await save('deleteOrder',{id:order.id,version:order.version,expectedRevision:state.revision,confirmNumber:confirm.trim().toUpperCase()})}}><p>{state.payments.filter(p=>p.orderId===order.id).length} payments and {state.expenses.filter(e=>e.orderId===order.id).length} expenses will be removed.</p><label className="admin-field">Type {order.number} to confirm<input value={confirm} onChange={e=>setConfirm(e.target.value)} required autoComplete="off" placeholder={order.number}/></label><div className="admin-actions"><button className="admin-btn" disabled={busy||confirm.trim().toUpperCase()!==order.number.toUpperCase()}>Permanently delete</button><button type="button" className="admin-btn secondary" disabled={busy} onClick={()=>{setOpen(false);setConfirm('')}}>Keep order</button></div></form>}</section>
}
export function ProductExpenseEditor({expense:e,revision,busy,save}:{expense:Expense;revision:number;busy:boolean;save:Save}) {
 const [open,setOpen]=useState(false),[error,setError]=useState('')
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();setError('');const f=new FormData(event.currentTarget)
  try {if(await save('updateProductExpense',{id:e.id,expectedRevision:revision,amount:money(String(f.get('amount'))),date:String(f.get('date')),funding:String(f.get('funding')),paid:f.get('paid')==='yes',paidDate:String(f.get('paidDate'))}))setOpen(false)} catch(err){setError(err instanceof Error?err.message:'Check amount')}
 }
 return <div><button type="button" className="admin-btn small secondary" disabled={busy} onClick={()=>setOpen(!open)}>{open?'Close editor':e.amount?'Edit product cost':'Enter product cost'}</button>{open&&<form className="admin-form" onSubmit={submit}><label className="admin-field">Total cost (Rs.)<input name="amount" type="number" min="0" step="0.01" required defaultValue={e.amount/100}/></label><label className="admin-field">Expense date<input name="date" type="date" required defaultValue={e.date}/></label><label className="admin-field">Funded by<select name="funding" defaultValue={e.funding}><option>Business</option><option>Ismail</option><option>Rizwan</option></select></label><label className="admin-field">Payment<select name="paid" defaultValue={e.paid?'yes':'no'}><option value="no">Unpaid</option><option value="yes">Paid</option></select></label><label className="admin-field">Payment date (if paid)<input name="paidDate" type="date" defaultValue={e.paidDate||new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Karachi'})}/></label>{error&&<p role="alert">{error}</p>}<button className="admin-btn small" disabled={busy}>Save cost</button></form>}</div>
}

type LineState = { id: string; name: string; category: string; size: string; quantity: string; price: string; pricingMode?: 'unit'|'total' }

export function OrderProductsEditor({order,state,busy,save}:{order:Order;state:Workspace;busy:boolean;save:Save}) {
  const [open,setOpen]=useState(false)
  const [error,setError]=useState('')
  const [lines,setLines]=useState<LineState[]>([])
  const [slug,setSlug]=useState(products[0].slug)
  const [size,setSize]=useState('')

  function initLines() {
    setLines(order.items.map(i => {
      const isStr = i.category === 'Tag Card String' || i.name.toLowerCase().includes('string')
      return {
        id: i.id,
        name: i.name,
        category: i.category,
        size: i.specification || '',
        quantity: String(i.quantity),
        price: isStr ? String((i.unitPrice * i.quantity) / 100) : String(i.unitPrice / 100),
        pricingMode: isStr ? 'total' : 'unit'
      }
    }))
    setError('')
    setOpen(true)
  }

  const isStringLine = (l: { category: string; name: string; pricingMode?: 'unit'|'total' }) =>
    l.category === 'Tag Card String' || l.name.toLowerCase().includes('string') || l.pricingMode === 'total'
  const isRollLine = (l: { category: string; name: string; size: string }) =>
    l.category === 'Size Label' || l.name.toLowerCase().includes('size label') || l.size.toLowerCase().includes('roll')
  
  const lineTotal = (l: { category: string; name: string; size: string; quantity: string; price: string; pricingMode?: 'unit'|'total' }) =>
    isStringLine(l) ? money(l.price || 0) : Number(l.quantity) * money(l.price || 0)

  const product = products.find(p => p.slug === slug) || products[0]
  const sizes = [...new Set(product.sizes.map(s => [s.sizeCategory || s.label, s.color, s.printType].filter(Boolean).join(' · ')))]

  function addProduct() {
    const selectedSize = size || sizes[0] || ''
    const isString = slug === 'tag-card-string'
    const isRoll = slug === 'size-labels'
    const variantObj = product.sizes.find(s => [s.sizeCategory || s.label, s.color, s.printType].filter(Boolean).join(' · ') === selectedSize) || product.sizes[0]
    let defaultQty = '100'
    let defaultPrice = ''
    let pricingMode: 'unit' | 'total' = isString ? 'total' : 'unit'
    if (isString) {
      defaultQty = variantObj?.quantity ? String(Number(variantObj.quantity.replace(/[^0-9]/g, '')) || 1000) : '1000'
      defaultPrice = variantObj?.price ? String(variantObj.price) : ''
    } else if (isRoll) {
      defaultQty = variantObj?.quantity ? String(Number(variantObj.quantity.replace(/[^0-9]/g, '')) || 1) : '1'
      defaultPrice = variantObj?.price ? String(variantObj.price) : ''
    } else if (variantObj) {
      defaultQty = variantObj.quantity ? String(Number(variantObj.quantity.replace(/[^0-9]/g, '')) || 100) : '100'
      defaultPrice = variantObj.unitPrice ? String(variantObj.unitPrice) : variantObj.price ? String(variantObj.price / Math.max(1, Number(defaultQty))) : ''
    }
    setLines([...lines, {
      id: crypto.randomUUID(),
      name: product.name,
      category: categories[product.slug] || 'Other',
      size: selectedSize,
      quantity: defaultQty,
      price: defaultPrice,
      pricingMode
    }])
  }

  function patch(id: string, values: Partial<{ name: string; size: string; quantity: string; price: string }>) {
    setLines(lines.map(l => l.id === id ? { ...l, ...values } : l))
  }

  const currentTotal = order.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  const newItemsTotal = lines.reduce((sum, l) => sum + lineTotal(l), 0)
  const diff = newItemsTotal - currentTotal

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    try {
      if (!lines.length) throw new Error('An order must have at least one product.')
      if (lines.some(l => !l.name.trim() || !l.price.trim() || Number(l.quantity) < 1)) {
        throw new Error('Enter name, quantity and price for every product.')
      }
      const formattedItems = lines.map(l => {
        const qty = Number(l.quantity) || 1
        const uPrice = isStringLine(l) ? Math.round(money(l.price) / qty) : money(l.price)
        return {
          id: l.id,
          name: l.name,
          category: l.category,
          specification: l.size,
          quantity: qty,
          unitPrice: uPrice
        }
      })
      const ok = await save('updateOrderItems', {
        id: order.id,
        version: order.version,
        expectedRevision: state.revision,
        items: formattedItems
      })
      if (ok) setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update products.')
    }
  }

  if (order.status === 'Cancelled') return null

  return (
    <div style={{ marginTop: '12px', marginBottom: '12px' }}>
      {!open ? (
        <button type="button" className="admin-btn small secondary" disabled={busy} onClick={initLines}>
          + Add product / Edit items
        </button>
      ) : (
        <form className="admin-panel admin-form" onSubmit={submit}>
          <div className="admin-panel-heading">
            <div>
              <h3>Add or edit products for {order.number}</h3>
              <p className="admin-muted">Add new items or modify quantities. New products will automatically generate Rs. 0 pending expense rows.</p>
            </div>
            <button type="button" className="admin-text-btn" onClick={() => setOpen(false)}>Close</button>
          </div>
          <div className="admin-product-picker">
            <select aria-label="Product name" value={slug} onChange={e => { setSlug(e.target.value); setSize('') }}>
              {products.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            </select>
            <select aria-label="Product size" value={size || sizes[0] || ''} onChange={e => setSize(e.target.value)}>
              {sizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <button type="button" className="admin-btn secondary" onClick={addProduct}>Add to order</button>
            <button type="button" className="admin-text-btn" onClick={() => setLines([...lines, { id: crypto.randomUUID(), name: '', category: 'Other', size: '', quantity: '1', price: '', pricingMode: 'unit' }])}>
              + Custom product
            </button>
          </div>
          {lines.map((l, index) => {
            const isStr = isStringLine(l)
            const isRoll = isRollLine(l)
            return (
              <div className="admin-edit-line" key={l.id}>
                <label className="admin-field">
                  <span>Product name</span>
                  <input value={l.name} required onChange={e => patch(l.id, { name: e.target.value })} />
                </label>
                <label className="admin-field">
                  <span>{isRoll ? 'Roll specification' : 'Size / specification'}</span>
                  <input required maxLength={500} value={l.size} onChange={e => patch(l.id, { size: e.target.value })} />
                </label>
                <label className="admin-field">
                  <span>{isRoll ? 'Rolls' : 'Quantity'}</span>
                  <input type="number" min="1" max="1000000" step="1" required value={l.quantity} onChange={e => patch(l.id, { quantity: e.target.value })} />
                </label>
                <label className="admin-field">
                  <span>{isStr ? 'Total price (Rs.)' : isRoll ? 'Price per roll (Rs.)' : 'Price per piece (Rs.)'}</span>
                  <input type="number" min="0" step="0.01" required placeholder="Enter price" value={l.price} onChange={e => patch(l.id, { price: e.target.value })} />
                  {isStr && Number(l.quantity) > 0 && Number(l.price) > 0 && (
                    <small className="admin-muted">Rs. {(Number(l.price) / Number(l.quantity)).toFixed(2)} / pc</small>
                  )}
                  {isRoll && Number(l.quantity) > 0 && Number(l.price) > 0 && (
                    <small className="admin-muted">{l.quantity} roll(s) × Rs. {l.price}</small>
                  )}
                </label>
                <strong>Rs. {(lineTotal(l) / 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}</strong>
                {lines.length > 1 && (
                  <button type="button" aria-label={`Remove product line ${index + 1}`} onClick={() => setLines(lines.filter(i => i.id !== l.id))}>×</button>
                )}
              </div>
            )
          })}
          <div className="admin-detail-metrics">
            <div>Current items total<strong>Rs. {(currentTotal / 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}</strong></div>
            <div>New items total<strong>Rs. {(newItemsTotal / 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}</strong></div>
            <div>Difference<strong>{diff >= 0 ? `+Rs. ${(diff / 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}` : `-Rs. ${(Math.abs(diff) / 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}`}</strong></div>
          </div>
          {error && <p role="alert" className="admin-error">{error}</p>}
          <div className="admin-actions">
            <button className="admin-btn" disabled={busy || !lines.length}>{busy ? 'Saving products…' : 'Save product changes'}</button>
            <button type="button" className="admin-btn secondary" disabled={busy} onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}

