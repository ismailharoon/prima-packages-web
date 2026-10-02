'use client'

import { useState, type FormEvent } from 'react'
import { products } from '@/data/products'
import { money, validateNewOrder } from '@/lib/admin/domain.mjs'

const rs=(value:number)=>`Rs. ${(value/100).toLocaleString('en-PK',{maximumFractionDigits:2})}`
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
const day=()=>new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Karachi'})
type Line={id:string;name:string;category:string;size:string;quantity:string;price:string;pricingMode?:'unit'|'total'}
export function NewOrderForm({busy,save}:{busy:boolean;save:(action:string,payload:unknown)=>Promise<void>}) {
  const [slug,setSlug]=useState(products[0].slug)
  const [size,setSize]=useState('')
  const [lines,setLines]=useState<Line[]>([])
  const [discount,setDiscount]=useState('')
  const [delivery,setDelivery]=useState('')
  const [received,setReceived]=useState('')
  const [error,setError]=useState('')
  const product=products.find(p=>p.slug===slug)!
  const sizes=[...new Set(product.sizes.map(s=>[s.sizeCategory||s.label,s.color,s.printType].filter(Boolean).join(' · ')))]
  
  const isStringLine=(l:Line)=>l.category==='Tag Card String'||l.name.toLowerCase().includes('string')||l.pricingMode==='total'
  const isRollLine=(l:Line)=>l.category==='Size Label'||l.name.toLowerCase().includes('size label')||l.size.toLowerCase().includes('roll')
  const lineTotal=(l:Line)=>isStringLine(l)?money(l.price||0):Number(l.quantity)*money(l.price||0)
  const total=lines.reduce((sum,l)=>sum+lineTotal(l),0)
  const net=total+money(delivery||0)-money(discount||0)
  function patch(id:string,values:Partial<Line>) { setLines(lines.map(l=>l.id===id?{...l,...values}:l)) }

  function addProduct() {
    const selectedSize=size||sizes[0]||''
    const isString=slug==='tag-card-string'
    const isRoll=slug==='size-labels'
    const variantObj=product.sizes.find(s=>[s.sizeCategory||s.label,s.color,s.printType].filter(Boolean).join(' · ')===selectedSize)||product.sizes[0]
    let defaultQty='100'
    let defaultPrice=''
    let pricingMode:'unit'|'total'=isString?'total':'unit'
    if(isString){
      defaultQty=variantObj?.quantity?String(Number(variantObj.quantity.replace(/[^0-9]/g,''))||1000):'1000'
      defaultPrice=variantObj?.price?String(variantObj.price):''
    } else if(isRoll){
      defaultQty=variantObj?.quantity?String(Number(variantObj.quantity.replace(/[^0-9]/g,''))||1):'1'
      defaultPrice=variantObj?.price?String(variantObj.price):''
    } else if(variantObj){
      defaultQty=variantObj.quantity?String(Number(variantObj.quantity.replace(/[^0-9]/g,''))||100):'100'
      defaultPrice=variantObj.unitPrice?String(variantObj.unitPrice):variantObj.price?String(variantObj.price/Math.max(1,Number(defaultQty))):''
    }
    setLines([...lines,{id:crypto.randomUUID(),name:product.name,category:categories[product.slug]||'Other',size:selectedSize,quantity:defaultQty,price:defaultPrice,pricingMode}])
  }

  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();setError('')
    const f=new FormData(e.currentTarget)
    try {
      if ([discount,delivery,received,...lines.map(l=>l.price)].some(v=>!v.trim())) throw new Error('Enter every amount. Type 0 if there is no amount.')
      const payload={
        date:day(),customer:String(f.get('customer')),brand:String(f.get('brand')),phone:String(f.get('phone')),address:String(f.get('address')),source:'Other',status:'Confirmed',dueDate:'',notes:'',artwork:'',
        items:lines.map(l=>{
          const qty=Number(l.quantity)||1
          const uPrice=isStringLine(l)?Math.round(money(l.price)/qty):money(l.price)
          return {id:l.id,name:l.name,category:l.category,specification:l.size,quantity:qty,unitPrice:uPrice}
        }),
        discount:money(discount),deliveryCharge:money(delivery),advance:money(received),paymentMethod:'Order entry'
      }
      validateNewOrder(payload)
      await save('createOrder',payload)
    } catch(e) {setError(e instanceof Error?e.message:'Check the order details.')}
  }
  return <form className="admin-form" onSubmit={submit}>
    <p className="admin-muted">Order ID is generated automatically. Order date: {day()}.</p>
    <h3>1. Customer details</h3><div className="admin-form-grid">
      <label className="admin-field"><span>Customer name</span><input name="customer" required maxLength={150}/></label>
      <label className="admin-field"><span>Brand name</span><input name="brand" required maxLength={200}/></label>
      <label className="admin-field"><span>Customer phone (optional)</span><input name="phone" type="tel" maxLength={40}/></label>
      <label className="admin-field"><span>Customer address (optional)</span><textarea name="address" maxLength={500} rows={2}/></label>
    </div><h3>2. Order details</h3>
    <div className="admin-product-picker">
      <select aria-label="Product name" value={slug} onChange={e=>{setSlug(e.target.value);setSize('')}}>{products.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}</select>
      <select aria-label="Product size" value={size||sizes[0]||''} onChange={e=>setSize(e.target.value)}>{sizes.map(s=><option key={s}>{s}</option>)}</select>
      <button type="button" className="admin-btn secondary" onClick={addProduct}>Add product</button>
      <button type="button" className="admin-text-btn" onClick={()=>setLines([...lines,{id:crypto.randomUUID(),name:'',category:'Other',size:'',quantity:'1',price:'',pricingMode:'unit'}])}>+ Custom item</button>
    </div>
    {lines.map(l=>{
      const isStr=isStringLine(l)
      const isRoll=isRollLine(l)
      return <div className="admin-edit-line" key={l.id}>
        <label className="admin-field"><span>Product name</span><input value={l.name} required onChange={e=>patch(l.id,{name:e.target.value})}/></label>
        <label className="admin-field"><span>{isRoll?'Roll specification':'Size / specification'}</span><input required maxLength={500} value={l.size} onChange={e=>patch(l.id,{size:e.target.value})}/></label>
        <label className="admin-field"><span>{isRoll?'Rolls':'Quantity'}</span><input type="number" min="1" max="1000000" step="1" required value={l.quantity} onChange={e=>patch(l.id,{quantity:e.target.value})}/></label>
        <label className="admin-field">
          <span>{isStr?'Total price (Rs.)':isRoll?'Price per roll (Rs.)':'Price per piece (Rs.)'}</span>
          <input type="number" min="0" step="0.01" required placeholder="Enter price" value={l.price} onChange={e=>patch(l.id,{price:e.target.value})}/>
          {isStr&&Number(l.quantity)>0&&Number(l.price)>0&&<small className="admin-muted">Rs. {(Number(l.price)/Number(l.quantity)).toFixed(2)} / pc</small>}
          {isRoll&&Number(l.quantity)>0&&Number(l.price)>0&&<small className="admin-muted">{l.quantity} roll(s) × Rs. {l.price}</small>}
        </label>
        <strong>{rs(lineTotal(l))}</strong>
        <button type="button" aria-label={`Remove ${l.name}`} onClick={()=>setLines(lines.filter(i=>i.id!==l.id))}>×</button>
      </div>
    })}
    <h3>3. Charges & payment</h3><p className="admin-muted">All amounts are required. Enter 0 when there is no discount, delivery charge or payment received.</p><div className="admin-form-grid">{[['Discount (Rs.)',discount,setDiscount],['Delivery charged to customer (Rs.)',delivery,setDelivery],['Amount received incl. advance (Rs.)',received,setReceived]].map(([label,value,setter])=><label className="admin-field" key={String(label)}><span>{String(label)}</span><input type="number" min="0" step="0.01" required placeholder="Enter amount, or 0" value={String(value)} onChange={e=>(setter as (s:string)=>void)(e.target.value)}/></label>)}</div>
    <div className="admin-detail-metrics"><div>Products total<strong>{rs(total)}</strong></div><div>Net order total<strong>{rs(net)}</strong></div><div>Remaining amount<strong>{rs(net-money(received||0))}</strong></div></div>
    {error&&<p role="alert" className="admin-error">{error}</p>}<div className="admin-form-footer"><p>Add the actual courier cost later from the Order Log.</p><button className="admin-btn" disabled={busy||!lines.length}>{busy?'Saving…':'Save order'}</button></div>
  </form>
}
