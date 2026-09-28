'use client'
import {useState,type FormEvent} from 'react'
import type {Order,Workspace} from '@/lib/admin/types'
import {money,receivedFor} from '@/lib/admin/domain.mjs'
export function PaymentCorrection({order,state,busy,save}:{order:Order;state:Workspace;busy:boolean;save:(action:string,payload:unknown)=>Promise<boolean>}){
 const receipts=state.payments.filter(p=>p.orderId===order.id&&p.kind==='Receipt')
 const initial=receipts.find(p=>p.note==='Advance recorded with order')
 const [editing,setEditing]=useState(false),[selected,setSelected]=useState(initial?.id||receipts[0]?.id||'')
 const receipt=receipts.find(p=>p.id===selected)
 const [error,setError]=useState('')
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setError('');const data=new FormData(e.currentTarget)
  try{const raw=String(data.get('amount')||'');if(!raw.trim())throw Error('Enter the correct amount, including 0 if none.')
   if(await save('correctPayment',{orderId:order.id,version:order.version,paymentId:selected,expectedAmount:receipt?.amount||0,expectedReceived:receivedFor(state,order.id),amount:money(raw),reason:String(data.get('reason')||'')}))setEditing(false)
  }catch(e){setError(e instanceof Error?e.message:'Check the amount.')}
 }
 return <section className="admin-payment-correction"><div><h3>Advance & payment correction</h3><p>Fix an amount entered by mistake. For a new installment, use Record payment.</p></div><button type="button" className="admin-btn secondary" disabled={busy||order.status==='Cancelled'} onClick={()=>{setEditing(!editing);setError('')}}>{editing?'Cancel correction':'Edit received amount'}</button>{editing&&<form onSubmit={submit}><label className="admin-field"><span>Receipt to correct</span><select disabled={busy} value={selected} onChange={e=>setSelected(e.target.value)}>{receipts.map(p=><option key={p.id} value={p.id}>{p.note==='Advance recorded with order'?'Order advance':p.method} · {p.date||'Historical / date unknown'} · Rs. {p.amount/100}</option>)}{!initial&&<option value="">Advance omitted at order entry (Rs. 0)</option>}</select></label><div className="admin-form-grid"><label className="admin-field"><span>Correct amount (Rs.)</span><input key={`${selected}-${receipt?.amount||0}`} name="amount" defaultValue={(receipt?.amount||0)/100} type="number" min="0" step="0.01" required disabled={busy}/></label><label className="admin-field"><span>Reason for correction</span><input name="reason" required maxLength={500} placeholder="e.g. Advance entered incorrectly" disabled={busy}/></label></div><p>The original receipt date is retained. Totals, balance and payment status update together; the correction is recorded in Activity.</p>{error&&<p role="alert" className="admin-error">{error}</p>}<button className="admin-btn" disabled={busy}>{busy?'Saving…':'Save payment correction'}</button></form>}</section>
}
