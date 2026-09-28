// Explicit local maintenance command: dry-run by default; --apply commits a reviewed snapshot.
import { DatabaseSync } from 'node:sqlite'
import { readFileSync,writeFileSync,mkdirSync } from 'node:fs'
import { summarize,orderTotal,receivedFor } from '../src/lib/admin/domain.mjs'
const preview=JSON.parse(readFileSync('.local/admin/order-sync.json','utf8'))
const db=new DatabaseSync('.local/admin/workspace.sqlite')
db.exec('PRAGMA busy_timeout=5000; BEGIN IMMEDIATE')
try {
 const current=JSON.parse(db.prepare('SELECT data FROM workspace WHERE id=1').get().data)
 if(current.orderSyncFingerprint===preview.fingerprint){console.log('Already synced; no changes.');db.exec('ROLLBACK');process.exit(0)}
 // This reviewed migration is only for the original untouched import. Never overwrite subsequent manual bookkeeping.
 if(current.revision!==1||current.audit.length!==1||current.audit[0].action!=='importWorkbook')throw Error('Local records changed; compare manual changes before syncing.')
 const next=structuredClone(current),now=new Date().toISOString();let added=0,updated=0
 for(const incoming of preview.orders){
  let o=next.orders.find(o=>o.id===incoming.id)
  if(o){updated++;o.version++}else{added++;o={id:incoming.id,number:incoming.number,phone:'',address:'',source:'Other',status:'Needs review',design:'Pending artwork',dueDate:'',artwork:'',version:1,createdAt:now};next.orders.push(o)}
  Object.assign(o,{date:incoming.date,customer:incoming.customer,brand:incoming.brand,items:incoming.items,discount:incoming.discount,deliveryCharge:incoming.deliveryCharge,notes:`Imported from ${preview.source}, order ${incoming.legacyId}. ${incoming.notes}`})
  if(incoming.status)o.status=incoming.status
  // Original import has only undated aggregate receipts; replace their totals, never invent payment dates.
  const receipts=next.payments.filter(p=>p.orderId===o.id)
  if(receipts.some(p=>p.method!=='Historical aggregate'||p.date))throw Error('Manual payment conflict')
  next.payments=next.payments.filter(p=>p.orderId!==o.id)
  if(incoming.received)next.payments.push({id:receipts[0]?.id||crypto.randomUUID(),orderId:o.id,amount:incoming.received,date:'',method:'Historical aggregate',account:'Business',reference:`Excel order ${incoming.legacyId}`,kind:'Receipt',note:`Updated received-to-date from ${preview.source}; actual receipt dates not provided.`})
  const costs=next.expenses.filter(e=>!e.voided&&e.category==='Delivery'&&e.orderId===o.id)
  if(costs.some(e=>e.funding!=='Business'||!e.note.startsWith('Imported once')))throw Error('Delivery history conflict')
  next.expenses=next.expenses.filter(e=>!costs.includes(e))
  if(incoming.deliveryCost)next.expenses.push({id:costs[0]?.id||crypto.randomUUID(),date:o.date,description:`Delivery — ${o.brand||o.customer}`,category:'Delivery',productType:'Other',brand:o.brand,orderId:o.id,amount:incoming.deliveryCost,funding:'Business',paid:true,paidDate:'',note:`Imported once from ${preview.source}; delivery treated as paid by Business per owner instructions; actual payment date unknown.`})
 }
 for(const o of preview.orders){const saved=next.orders.find(x=>x.id===o.id);if(orderTotal(saved)!==o.net||receivedFor(next,o.id)!==o.received)throw Error('Reconciliation failed')}
 next.orders.sort((a,b)=>b.date.localeCompare(a.date)||b.number.localeCompare(a.number))
 next.revision++;next.orderSyncFingerprint=preview.fingerprint
 next.audit.unshift({id:crypto.randomUUID(),at:now,actor:'Local owner',action:'syncWorkbookOrders',detail:`Synced ${preview.source}: ${added} new, ${updated} existing orders. Blank IDs skipped: ${preview.skipped.join(', ')}. Payment dates unknown. Non-delivery expenses retained.`})
 const summary={added,updated,total:next.orders.length,items:next.orders.reduce((s,o)=>s+o.items.length,0),...summarize(next)}
 writeFileSync('.local/admin/order-sync-report.json',JSON.stringify(summary,null,2))
 if(process.argv.includes('--apply')){
   mkdirSync('.local/admin/backups',{recursive:true})
   const backup=`.local/admin/backups/before-order-sync-${Date.now()}.json`
   writeFileSync(backup,JSON.stringify(current,null,2),{flag:'wx'})
   db.prepare('UPDATE workspace SET data=? WHERE id=1').run(JSON.stringify(next))
   db.exec('COMMIT');console.log(JSON.stringify({applied:true,backup,...summary}))
 }else{db.exec('ROLLBACK');console.log(JSON.stringify({dryRun:true,...summary}))}
}catch(e){db.exec('ROLLBACK');throw e}finally{db.close()}
