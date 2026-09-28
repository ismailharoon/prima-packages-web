// All money is stored as integer paisa. Used by the local API and tests.
export const fundingSources = ['Business', 'Ismail', 'Rizwan']
export const orderStatuses = ['New request', 'Confirmed', 'Production', 'Ready', 'Dispatched', 'Completed', 'Cancelled', 'Needs review']
export const designStatuses = ['Pending artwork', 'In progress', 'Awaiting approval', 'Approved']
export function validateNewOrder(p) {
  for (const [key,label,max] of [['customer','customer name',150],['brand','brand name',200]]) text(p[key],label,max,true)
  text(p.phone ?? '', 'phone',40)
  text(p.address ?? '', 'address',500)
  for (const [key,label] of [['discount','Discount'],['deliveryCharge','Delivery charged'],['advance','Amount received']]) amount(p[key],`${label} (enter 0 if none)`)
  const lines=items(p.items)
  for (const line of lines) text(line.specification,'product size',500,true)
  const subtotal=lines.reduce((sum,i)=>sum+i.quantity*i.unitPrice,0)
  if(p.discount>subtotal+p.deliveryCharge) throw new Error('Discount cannot exceed the products total plus delivery charged.')
  if(p.advance>subtotal+p.deliveryCharge-p.discount) throw new Error('Amount received cannot exceed the net order total.')
}
export function emptyWorkspace() { return { schema: 1, revision: 0, orders: [], payments: [], expenses: [], movements: [], audit: [], openingBalance: 0 } }
export function money(value) { const number = Number(value); if (!Number.isFinite(number)) throw new Error('Enter a valid amount.'); return Math.round((number + Number.EPSILON) * 100) }
export function amount(value, label = 'Amount', allowZero = true) {
  if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1) || value > 100000000000) throw new Error(`${label} must be a valid ${allowZero ? 'non-negative' : 'positive'} amount.`)
  return value
}
function text(value, label, max = 200, required = false) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`Check ${label}.`)
  return value.trim()
}
function choice(value, list, label) { if (!list.includes(value)) throw new Error(`Choose a valid ${label}.`); return value }
function date(value, required = true) {
  if (!required && !value) return ''
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0,10) !== value) throw new Error('Choose a valid date.')
  return value
}
export function orderTotal(order) { return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) - order.discount + order.deliveryCharge }
export function receivedFor(state, orderId) { return state.payments.filter(p => p.orderId === orderId).reduce((sum, p) => sum + (p.kind === 'Refund' ? -p.amount : p.amount), 0) }
export function balanceFor(state, order) { return (order.status === 'Cancelled' ? 0 : orderTotal(order)) - receivedFor(state, order.id) }
export function paymentStatus(state, order) { const paid = receivedFor(state, order.id); const balance = balanceFor(state, order); return balance < 0 ? 'Credit / refund due' : balance === 0 ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid' }
export function settlementDate(state, order) {
  if (balanceFor(state,order) > 0 || order.status === 'Cancelled') return ''
  const receipts = state.payments.filter(p => p.orderId === order.id && p.kind === 'Receipt' && p.date)
  return receipts.map(p => p.date).sort().at(-1) || ''
}
export function isSale(order) { return !['New request', 'Cancelled'].includes(order.status) }
export function summarize(state, month = '') {
  const within = value => !month || (value && value.startsWith(month))
  const orders = state.orders.filter(o => isSale(o) && within(o.date))
  const expenses = state.expenses.filter(e => !e.voided && within(e.date))
  const payments = state.payments.filter(p => within(p.date))
  const sales = orders.reduce((sum,o) => sum + orderTotal(o), 0)
  const costs = expenses.reduce((sum,e) => sum + e.amount, 0)
  const received = payments.reduce((sum,p) => sum + (p.kind === 'Refund' ? -p.amount : p.amount), 0)
  const liveExpenses = state.expenses.filter(e => !e.voided)
  let cash = state.openingBalance + state.payments.filter(p => p.account === 'Business').reduce((sum,p) => sum + (p.kind === 'Refund' ? -p.amount : p.amount), 0) - liveExpenses.filter(e => e.paid && e.funding === 'Business').reduce((sum,e) => sum + e.amount, 0)
  const partners = { Ismail: 0, Rizwan: 0 }
  for (const e of liveExpenses) if (e.paid && e.funding !== 'Business') partners[e.funding] += e.amount
  // Customer funds held personally reduce the amount the business owes that partner.
  for (const p of state.payments) if (p.account !== 'Business') partners[p.account] -= p.kind === 'Refund' ? -p.amount : p.amount
  for (const m of state.movements) {
    cash += m.type === 'Capital in' ? m.amount : -m.amount
    if (m.type === 'Capital in') partners[m.partner] += m.amount
    if (m.type === 'Partner repayment') partners[m.partner] -= m.amount
  }
  return { sales, costs, profit: sales - costs, received, outstanding: state.orders.filter(isSale).reduce((s,o) => s + Math.max(0, balanceFor(state,o)),0), credits: state.orders.reduce((s,o) => s + Math.max(0,-balanceFor(state,o)),0), cash, partners, unpaidCosts: liveExpenses.filter(e => !e.paid).reduce((s,e) => s + e.amount,0), unknownDateReceipts: state.payments.filter(p => !p.date).reduce((s,p) => s + (p.kind === 'Refund' ? -p.amount : p.amount),0), orders: orders.length }
}
function findOrder(state, id) { const order = state.orders.find(o => o.id === id); if (!order) throw new Error('Order not found. Refresh and try again.'); return order }
function items(input) {
  if (!Array.isArray(input) || !input.length || input.length > 50) throw new Error('Add between 1 and 50 product lines.')
  return input.map(item => {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 1000000) throw new Error('Quantity must be a whole number between 1 and 1,000,000.')
    const unitPrice = amount(item.unitPrice, 'Unit price')
    if (unitPrice * item.quantity > 100000000000) throw new Error('Product line total is too large.')
    return { id: crypto.randomUUID(), name: text(item.name,'product name',200,true), specification: text(item.specification || '', 'specification',500), category: text(item.category || 'Other','category',100), quantity: item.quantity, unitPrice }
  })
}
export function applyCommand(current, command, actor = 'Local owner') {
  const state = structuredClone(current)
  const p = command.payload
  if (!p || typeof p !== 'object') throw new Error('Invalid request.')
  let detail = ''
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  switch (command.action) {
    case 'updateOrderLog': {
      const o = findOrder(state,p.id)
      const costs = state.expenses.filter(e => !e.voided && e.orderId === o.id && e.category === 'Delivery')
      const currentCost = costs.reduce((s,e) => s+e.amount,0)
      const balance = balanceFor(state,o)
      if (o.version !== p.version || p.expectedBalance !== balance || p.expectedDeliveryCost !== currentCost) throw new Error('This order changed. Refresh before updating it.')
      const status = choice(p.status,orderStatuses,'order status')
      if (o.status === 'Cancelled') throw new Error('Cancelled orders cannot be updated here.')
      if (!['Confirmed','Production','Dispatched'].includes(status) && status !== o.status) throw new Error('Choose a status from the order log.')
      const paidOn = date(p.date)
      if (paidOn < o.date) throw new Error('Payment date cannot be before the order date.')
      const cost = amount(p.deliveryCost,'Delivery cost')
      if (cost !== currentCost && costs.some(e => e.funding !== 'Business' || !e.paid)) throw new Error('Historical delivery funding needs review before changing this cost.')
      if (p.clearRemaining === true) {
        if (balance <= 0) throw new Error('There is no remaining amount to clear.')
        state.payments.unshift({id:crypto.randomUUID(),orderId:o.id,amount:balance,date:paidOn,method:'Order balance settlement',account:'Business',reference:'',kind:'Receipt',note:'Remaining amount cleared from Order Log'})
      }
      if (cost !== currentCost) {
        for (const expense of costs) expense.voided = true
        if (cost) state.expenses.unshift({id:crypto.randomUUID(),orderId:o.id,date:paidOn,description:`Delivery — ${o.number}`,category:'Delivery',productType:'Other',brand:o.brand,amount:cost,funding:'Business',paid:true,paidDate:paidOn,note:`Order Log delivery total updated from Rs. ${currentCost/100}`})
      }
      o.status = status
      o.version++
      detail = `${o.number}: ${status}; delivery Rs. ${cost/100}${p.clearRemaining ? `; balance received Rs. ${balance/100}` : ''}`
      break
    }
    case 'updateContact': {
      const o=findOrder(state,p.id)
      if(o.version!==p.version) throw new Error('This order changed. Refresh before saving contact details.')
      o.phone=text(p.phone ?? '', 'phone',40)
      o.address=text(p.address ?? '', 'address',500)
      o.version++
      detail=`${o.number}: updated customer phone and address`
      break
    }
    case 'createOrder': {
      validateNewOrder(p)
      const order = { id, number: `PP-${String(Math.max(0,...state.orders.map(o=>Number(o.number.match(/^PP-(\d+)$/)?.[1]||0)))+1).padStart(5,'0')}`, date: date(p.date), customer: text(p.customer,'customer name',150,true), brand: text(p.brand || '', 'brand'), phone: text(p.phone || '', 'phone',40), address: text(p.address || '', 'address',500), source: choice(p.source,['Instagram','WhatsApp','Website','Other'],'source'), status: choice(p.status,['New request','Confirmed'],'order status'), design: 'Pending artwork', paymentDueDate: date(p.paymentDueDate,false), dueDate: date(p.dueDate,false), notes: text(p.notes || '', 'notes',4000), artwork: text(p.artwork || '', 'artwork reference',1000), items: items(p.items), discount: amount(p.discount || 0,'Discount'), deliveryCharge: amount(p.deliveryCharge || 0,'Delivery charge'), version: 1, createdAt: now }
      if (orderTotal(order) < 0 || orderTotal(order) > 100000000000) throw new Error('Check the order total and discount.')
      if (order.dueDate && order.dueDate < order.date) throw new Error('Due date cannot be before the order date.')
      const deliveryCost = amount(p.deliveryCost || 0,'Delivery cost')
      if (deliveryCost) state.expenses.unshift({ id:crypto.randomUUID(), date:order.date, description:`Delivery — ${order.number}`, category:'Delivery', productType:'Other', brand:order.brand, orderId:id, amount:deliveryCost, funding:'Business', paid:true, paidDate:order.date, note:'Delivery paid with order entry' })
      state.orders.unshift(order)
      if (p.advance) state.payments.unshift({ id: crypto.randomUUID(), orderId:id, amount:amount(p.advance,'Advance',false), date:date(p.date), method:text(p.paymentMethod || 'Bank transfer','payment method',80,true), account:'Business', reference:'', kind:'Receipt', note:'Advance recorded with order' })
      detail = `Created ${order.number} for ${order.customer}`
      break
    }
    case 'updateOrder': {
      const o = findOrder(state,p.id)
      if (o.version !== p.version) throw new Error('This order changed in another window. Refresh before saving.')
      const status = choice(p.status,orderStatuses,'order status')
      const design = choice(p.design,designStatuses,'design status')
      const note = text(p.notes || '', 'notes',4000)
      if (o.status === 'Cancelled' && status !== 'Cancelled') throw new Error('Cancelled orders cannot be reopened. Create a new order.')
      if (status === 'New request' && o.status !== 'New request') throw new Error('A confirmed order cannot become a new request again.')
      const allowed = { 'New request': ['Confirmed','Cancelled'], Confirmed: ['Production','Cancelled'], Production: ['Ready','Cancelled'], Ready: ['Dispatched','Cancelled'], Dispatched: ['Completed','Cancelled'], Completed: ['Cancelled'], Cancelled: [], 'Needs review': ['Confirmed','Production','Ready','Dispatched','Completed','Cancelled'] }
      if (status !== o.status && !allowed[o.status].includes(status)) throw new Error('Move the order through each production stage in sequence.')
      if (['Production','Ready','Dispatched','Completed'].includes(status) && (design !== 'Approved' || receivedFor(state,o.id) < Math.ceil(orderTotal(o) / 2))) throw new Error('Design approval and at least 50% advance are required before production.')
      if (['Dispatched','Completed'].includes(status) && balanceFor(state,o) > 0) throw new Error('Clear the remaining balance before dispatch.')
      if (status === 'Cancelled' && o.status !== status && !note) throw new Error('Add a cancellation reason in notes.')
      o.status = status; o.design = design; o.notes = note; o.artwork = text(p.artwork || '', 'artwork reference',1000); o.dueDate = date(p.dueDate,false); o.paymentDueDate = p.paymentDueDate === undefined ? o.paymentDueDate || '' : date(p.paymentDueDate,false); o.version++
      detail = `${o.number}: ${status}; design ${design}`
      break
    }
    case 'addPayment': {
      const o = findOrder(state,p.orderId)
      const kind = choice(p.kind,['Receipt','Refund'],'payment type')
      const value = amount(p.amount,'Payment',false)
      if (kind === 'Receipt' && o.status === 'Cancelled') throw new Error('Cannot receive a payment for a cancelled order.')
      if (kind === 'Refund' && value > receivedFor(state,o.id)) throw new Error('Refund cannot exceed the net amount received.')
      state.payments.unshift({ id, orderId: o.id, amount: value, date: date(p.date), method: text(p.method,'payment method',80,true), account: choice(p.account,fundingSources,'receiving/paying account'), reference: text(p.reference || '', 'reference',200), kind, note: text(p.note || '', 'note',1000) })
      detail = `${o.number}: ${kind} Rs. ${(value/100).toLocaleString('en-PK')}`
      break
    }
    case 'addExpense': {
      const linkedOrder = p.orderId ? findOrder(state,p.orderId) : null
      if (linkedOrder && p.category === 'Delivery' && state.expenses.some(e=>!e.voided&&e.category==='Delivery'&&e.orderId===linkedOrder.id)) throw new Error('Delivery is already recorded for this order. Change its total in the Order Log instead of adding it again.')
      const paid = p.category === 'Delivery' || p.paid === true
      state.expenses.unshift({ id, date: date(p.date), description: text(p.description,'expense description',250,true), category: choice(p.category,['Product','Delivery','Marketing','Business','Other'],'expense category'), productType: text(p.productType || 'Other','product type',100), brand: linkedOrder ? linkedOrder.brand : text(p.brand || '', 'brand',200), orderId: p.orderId || '', amount: amount(p.amount,'Expense',false), funding: p.category === 'Delivery' ? 'Business' : choice(p.funding,fundingSources,'funding source'), paid, paidDate: paid ? date(p.category === 'Delivery' ? p.date : p.paidDate) : '', note: text(p.note || '', 'note',1000) })
      detail = `Expense: ${p.description}`
      break
    }
    case 'payExpense': {
      const e = state.expenses.find(e => e.id === p.id)
      if (!e || e.voided || e.paid) throw new Error('Expense is missing, already paid or voided.')
      e.paid = true; e.paidDate = date(p.date)
      detail = `Paid expense: ${e.description}`
      break
    }
    case 'addMovement': {
      const type = choice(p.type,['Capital in','Partner repayment','Owner withdrawal'],'movement')
      const partner = choice(p.partner,['Ismail','Rizwan'],'partner')
      const value = amount(p.amount,'Movement',false)
      if (type === 'Partner repayment' && value > summarize(state).partners[partner]) throw new Error('Repayment exceeds the amount owed to this partner.')
      state.movements.unshift({id, date: date(p.date), type, partner, amount: value, note: text(p.note || '', 'note',1000,true) })
      detail = `${type}: ${partner}`
      break
    }
    default: throw new Error('Unknown action.')
  }
  state.revision++
  state.audit.unshift({ id: crypto.randomUUID(), at: now, action: command.action, detail, actor })
  return state
}
