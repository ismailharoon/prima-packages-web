import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { applyCommand, emptyWorkspace, orderTotal, receivedFor, balanceFor, summarize, money } from '../src/lib/admin/domain.mjs'

const base = { date:'2026-09-25', customer:'Test customer', brand:'Test brand', phone:'03001234567', address:'Test address', source:'WhatsApp', status:'Confirmed', dueDate:'2026-09-30', notes:'', artwork:'', discount:0, advance:0, deliveryCharge:20000, items:[{name:'Labels',category:'Woven Label',specification:'1 x 2',quantity:100,unitPrice:2000},{name:'Cards',category:'Hang Tags',specification:'2 x 3',quantity:50,unitPrice:1000}] }
test('delivery cost is an atomic paid business expense and payment due date persists',()=>{
  let s=applyCommand(emptyWorkspace(),{action:'createOrder',payload:{...base,advance:100000,deliveryCost:15000,paymentDueDate:'2026-10-01'}})
  const o=s.orders[0]
  assert.equal(o.paymentDueDate,'2026-10-01')
  assert.equal(s.expenses[0].orderId,o.id)
  assert.equal(s.expenses[0].funding,'Business')
  assert.equal(s.expenses[0].paid,true)
  assert.equal(summarize(s).cash,85000)
  assert.equal(orderTotal(o),270000)
  s=applyCommand(s,{action:'updateOrder',payload:{...o,paymentDueDate:'2026-10-02'}})
  assert.equal(s.orders[0].paymentDueDate,'2026-10-02')
  assert.throws(()=>applyCommand(s,{action:'addExpense',payload:{date:'2026-09-26',description:'Courier',category:'Delivery',orderId:o.id,amount:5000,funding:'Ismail',paid:false}}),/already recorded/)
  s=applyCommand(s,{action:'addExpense',payload:{date:'2026-09-26',description:'General courier',category:'Delivery',amount:5000,funding:'Ismail',paid:false}})
  assert.equal(s.expenses[0].funding,'Business')
  assert.equal(s.expenses[0].paid,true)
  assert.equal(s.expenses[0].paidDate,'2026-09-26')
  assert.equal(summarize(s).cash,80000)
  assert.throws(()=>applyCommand(s,{action:'updateOrder',payload:{...s.orders[0],paymentDueDate:'bad'}}),/date/)
})
function run(s,action,payload) { return applyCommand(s,{action,payload}) }
function orderState() { return run(emptyWorkspace(),'createOrder',base) }
test('expense linkage uses order identity and canonical brand; unpaid cost only reduces cash when paid',()=>{
  let s=orderState();const o=s.orders[0]
  const expense={date:'2026-09-25',description:'Making labels',category:'Product',productType:'Woven Label',orderId:o.id,brand:'Wrong brand',amount:30000,funding:'Business',paid:false}
  assert.throws(()=>run(s,'addExpense',{...expense,orderId:'missing'}),/not found/)
  s=run(s,'addExpense',expense)
  assert.equal(s.expenses[0].brand,o.brand)
  assert.equal(s.expenses[0].orderId,o.id)
  assert.equal(summarize(s).cash,0)
  assert.equal(summarize(s).unpaidCosts,30000)
  assert.equal(summarize(s).profit,240000)
  s=run(s,'payExpense',{id:s.expenses[0].id,date:'2026-09-26'})
  assert.equal(summarize(s).cash,-30000)
  assert.equal(summarize(s).unpaidCosts,0)
  assert.equal(summarize(s).profit,240000)
})
test('new orders require explicit amounts and complete customer/product details',()=>{
  for(const field of ['customer','brand']) assert.throws(()=>run(emptyWorkspace(),'createOrder',{...base,[field]:'   '}))
  for(const field of ['discount','deliveryCharge','advance']) for(const value of [undefined,null,'',-1,NaN,1.5]) assert.throws(()=>run(emptyWorkspace(),'createOrder',{...base,[field]:value}))
  assert.throws(()=>run(emptyWorkspace(),'createOrder',{...base,items:[{...base.items[0],specification:' '}]}),/size/)
  assert.throws(()=>run(emptyWorkspace(),'createOrder',{...base,advance:270001}),/exceed/)
  const s=run(emptyWorkspace(),'createOrder',{...base,discount:0,deliveryCharge:0,advance:0})
  assert.equal(s.orders.length,1)
  assert.equal(s.payments.length,0)
})
test('order log clears actual balance and replaces delivery total once, with stale-write protection',()=>{
  let s=run(emptyWorkspace(),'createOrder',{...base,advance:100000})
  const id=s.orders[0].id
  const change={id,version:1,expectedBalance:170000,expectedDeliveryCost:0,status:'Dispatched',deliveryCost:24000,clearRemaining:true,date:'2026-09-26'}
  s=run(s,'updateOrderLog',change)
  assert.equal(balanceFor(s,s.orders[0]),0)
  assert.equal(s.orders[0].status,'Dispatched')
  assert.equal(s.payments[0].date,'2026-09-26')
  assert.equal(s.payments[0].amount,170000)
  assert.equal(summarize(s).cash,246000)
  assert.throws(()=>run(s,'updateOrderLog',change),/changed/)
  s=run(s,'updateOrderLog',{...change,version:2,expectedBalance:0,expectedDeliveryCost:24000,deliveryCost:25000,clearRemaining:false})
  assert.equal(summarize(s).cash,245000)
  assert.equal(s.expenses.filter(e=>!e.voided).length,1)
  assert.equal(s.expenses.filter(e=>e.voided).length,1)
})
test('COD dispatch leaves amount outstanding; invalid log updates do not mutate records',()=>{
  const s=orderState(), o=s.orders[0]
  const p={id:o.id,version:o.version,expectedBalance:270000,expectedDeliveryCost:0,status:'Dispatched',deliveryCost:20000,clearRemaining:false,date:'2026-09-26'}
  const next=run(s,'updateOrderLog',p)
  assert.equal(balanceFor(next,next.orders[0]),270000)
  assert.equal(next.payments.length,0)
  assert.throws(()=>run(s,'updateOrderLog',{...p,clearRemaining:true,deliveryCost:-1}),/cost/)
  assert.equal(s.payments.length,0)
  assert.equal(s.expenses.length,0)
})
test('multi-product total and atomic initial advance',()=>{const s=run(emptyWorkspace(),'createOrder',{...base,advance:100000});assert.equal(orderTotal(s.orders[0]),270000);assert.equal(receivedFor(s,s.orders[0].id),100000);assert.equal(balanceFor(s,s.orders[0]),170000);assert.equal(summarize(s).cash,100000);assert.equal(emptyWorkspace().orders.length,0)})
test('production requires approval and 50%, dispatch requires full amount',()=>{
  let s=orderState(); const id=s.orders[0].id
  const update=(status,design='Approved')=>({id,version:s.orders[0].version,status,design,dueDate:'2026-09-30',notes:'',artwork:'approved in test'})
  assert.throws(()=>run(s,'updateOrder',update('Production')),/50%/)
  s=run(s,'addPayment',{orderId:id,date:'2026-09-25',amount:135000,kind:'Receipt',method:'Bank',account:'Business'})
  assert.throws(()=>run(s,'updateOrder',update('Production','Pending artwork')),/approval/)
  s=run(s,'updateOrder',update('Production'));s=run(s,'updateOrder',update('Ready'))
  assert.throws(()=>run(s,'updateOrder',update('Dispatched')),/balance/)
  s=run(s,'addPayment',{orderId:id,date:'2026-09-26',amount:135000,kind:'Receipt',method:'Cash',account:'Business'})
  s=run(s,'updateOrder',update('Dispatched'));assert.equal(balanceFor(s,s.orders[0]),0)
})
test('cash, expenses and partner funding stay separate; repayment is not a second cost',()=>{
  let s=run(emptyWorkspace(),'createOrder',{...base,advance:200000});const id=s.orders[0].id
  const expense={date:'2026-09-25',description:'Making',category:'Product',productType:'Woven Label',orderId:id,amount:60000,paid:true,paidDate:'2026-09-25'}
  s=run(s,'addExpense',{...expense,funding:'Ismail'});s=run(s,'addExpense',{...expense,category:'Delivery',funding:'Business',amount:20000})
  s=run(s,'addExpense',{...expense,funding:'Business',amount:10000,paid:false})
  let sum=summarize(s);assert.equal(sum.cash,180000);assert.equal(sum.partners.Ismail,60000);assert.equal(sum.costs,90000);assert.equal(sum.profit,180000);assert.equal(sum.unpaidCosts,10000)
  s=run(s,'addMovement',{date:'2026-09-25',type:'Partner repayment',partner:'Ismail',amount:60000,note:'Repaid production expense'})
  sum=summarize(s);assert.equal(sum.cash,120000);assert.equal(sum.partners.Ismail,0);assert.equal(sum.costs,90000)
  assert.throws(()=>run(s,'addMovement',{date:'2026-09-25',type:'Partner repayment',partner:'Ismail',amount:1,note:'extra'}),/exceeds/)
})
test('unpaid partner expenses are costs but not invested cash; mark paid once',()=>{let s=orderState();s=run(s,'addExpense',{date:'2026-09-25',description:'Supplier',category:'Product',amount:50000,funding:'Rizwan',paid:false});assert.equal(summarize(s).partners.Rizwan,0);assert.equal(summarize(s).costs,50000);const id=s.expenses[0].id;s=run(s,'payExpense',{id,date:'2026-09-26'});assert.equal(summarize(s).partners.Rizwan,50000);assert.throws(()=>run(s,'payExpense',{id,date:'2026-09-26'}),/already paid/)})
test('monthly receipts use payment dates; unknown historical dates are not fabricated',()=>{let s=orderState();const id=s.orders[0].id;s=run(s,'addPayment',{orderId:id,date:'2026-10-01',amount:10000,kind:'Receipt',method:'Bank',account:'Business'});assert.equal(summarize(s,'2026-09').received,0);assert.equal(summarize(s,'2026-10').received,10000);s.payments[0].date='';assert.equal(summarize(s).received,10000);assert.equal(summarize(s,'2026-10').received,0)})
test('cancelled orders retain cost and customer credit; refunds cannot exceed receipts',()=>{let s=run(emptyWorkspace(),'createOrder',{...base,advance:50000});const id=s.orders[0].id;s=run(s,'updateOrder',{id,version:1,status:'Cancelled',design:'Pending artwork',notes:'Customer cancelled',artwork:'',dueDate:''});assert.equal(summarize(s).sales,0);assert.equal(summarize(s).credits,50000);assert.throws(()=>run(s,'addPayment',{orderId:id,date:'2026-09-25',amount:50001,kind:'Refund',method:'Bank',account:'Business'}),/exceed/);s=run(s,'addPayment',{orderId:id,date:'2026-09-25',amount:50000,kind:'Refund',method:'Bank',account:'Business'});assert.equal(balanceFor(s,s.orders[0]),0);assert.equal(summarize(s).cash,0)})
test('invalid amounts, stale versions, negative totals and invalid dates are rejected',()=>{const s=orderState();assert.equal(money('12.35'),1235);assert.throws(()=>run(s,'createOrder',{...base,date:'2026-02-31'}),/date/);assert.throws(()=>run(s,'createOrder',{...base,discount:99999999}),/total/);assert.throws(()=>run(s,'addPayment',{orderId:s.orders[0].id,date:'2026-09-25',amount:NaN,kind:'Receipt'}),/Payment/);assert.throws(()=>run(s,'updateOrder',{id:s.orders[0].id,version:0}),/another window/)})
test('SQLite persists records, retries are idempotent, failed changes roll back',async()=>{
  const path=mkdtempSync(join(tmpdir(),'prima-admin-test-'));process.env.PRIMA_ADMIN_DATA_DIR=path
  try { const {readWorkspace,saveCommand}=await import('../src/lib/admin/local-store.mjs');const command={requestId:crypto.randomUUID(),action:'createOrder',payload:base};saveCommand(command);saveCommand(command);assert.equal(readWorkspace().orders.length,1);assert.throws(()=>saveCommand({...command,payload:{...base,customer:'Changed'}}),/different data/);assert.throws(()=>saveCommand({requestId:crypto.randomUUID(),action:'createOrder',payload:{...base,items:[]}}),/product lines/);assert.equal(readWorkspace().orders.length,1);assert.equal(readWorkspace().revision,1) } finally {delete process.env.PRIMA_ADMIN_DATA_DIR;rmSync(path,{recursive:true,force:true})}
})

test('contact details can be omitted, added later or cleared without changing finances',()=>{
 let s=run(emptyWorkspace(),'createOrder',{...base,phone:'',address:''})
 const before=summarize(s),o=s.orders[0]
 s=run(s,'updateContact',{id:o.id,version:o.version,phone:'03001234567',address:'Dispatch address'})
 assert.equal(s.orders[0].address,'Dispatch address')
 assert.deepEqual(summarize(s),before)
 assert.throws(()=>run(s,'updateContact',{id:o.id,version:o.version,phone:'',address:''}),/changed/)
 s=run(s,'updateContact',{id:o.id,version:s.orders[0].version,phone:'',address:''})
 assert.equal(s.orders[0].phone,'')
 assert.equal(s.orders[0].address,'')
 assert.deepEqual(summarize(s),before)
})

test('receipt corrections update balances and cash, preserve date and audit old amount',()=>{
 const s=applyCommand(emptyWorkspace(),{action:'createOrder',payload:{...base,advance:100000}}),o=s.orders[0],r=s.payments[0]
 const payload={orderId:o.id,version:o.version,paymentId:r.id,expectedAmount:r.amount,expectedReceived:100000,amount:70000,reason:'Typing mistake'}
 const n=applyCommand(s,{action:'correctPayment',payload})
 assert.equal(receivedFor(n,o.id),70000);assert.equal(balanceFor(n,n.orders[0]),200000);assert.equal(summarize(n).cash,70000)
 assert.equal(n.payments[0].date,r.date);assert.match(n.audit[0].detail,/1000 to Rs. 700/);assert.equal(s.payments[0].amount,100000)
 assert.throws(()=>applyCommand(n,{action:'correctPayment',payload}),/changed/)
 assert.throws(()=>applyCommand(s,{action:'correctPayment',payload:{...payload,amount:-1}}),/valid/)
 assert.throws(()=>applyCommand(s,{action:'correctPayment',payload:{...payload,amount:300000}}),/exceed/)
 assert.throws(()=>applyCommand(s,{action:'correctPayment',payload:{...payload,reason:''}}),/reason/)
 const zero=applyCommand(s,{action:'correctPayment',payload:{...payload,amount:0}})
 assert.equal(zero.payments.length,0);assert.equal(summarize(zero).cash,0)
})
test('omitted advance can be corrected without overwriting later installments or refunds',()=>{
 let s=applyCommand(emptyWorkspace(),{action:'createOrder',payload:base});const o=s.orders[0]
 s=applyCommand(s,{action:'correctPayment',payload:{orderId:o.id,version:o.version,paymentId:'',expectedReceived:0,amount:50000,reason:'Advance omitted'}})
 const r=s.payments[0]
 s=applyCommand(s,{action:'addPayment',payload:{orderId:o.id,kind:'Refund',amount:20000,date:base.date,method:'Cash',account:'Business'}})
 assert.throws(()=>applyCommand(s,{action:'correctPayment',payload:{orderId:o.id,version:s.orders[0].version,paymentId:r.id,expectedReceived:30000,expectedAmount:50000,amount:10000,reason:'Wrong receipt'}}),/refunds/)
})
