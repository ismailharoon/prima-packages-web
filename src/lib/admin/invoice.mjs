import PDFDocument from 'pdfkit'
import { orderTotal, receivedFor, paymentStatus } from './domain.mjs'

export const invoiceAllowed = order => ['Confirmed','Production','Ready','Dispatched','Completed'].includes(order.status)
const rs = n => `Rs. ${(n / 100).toLocaleString('en-PK', {minimumFractionDigits:2,maximumFractionDigits:2})}`

// Only explicitly selected customer-facing fields are rendered here.
export function generateInvoice(state, order) {
  if (!invoiceAllowed(order)) throw new Error('Confirm the order before generating its invoice.')
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({size:'A4',margin:44,bufferPages:true,info:{Title:`Invoice ${order.number}`,Author:'Prima Packages'}})
    const chunks = []
    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
    const width = 507, left = 44
    const text = (value,x,y,w,size=10,bold=false) => doc.font(bold?'Helvetica-Bold':'Helvetica').fontSize(size).fillColor('#253c30').text(String(value),x,y,{width:w})
    let y = 44
    function newPage() { doc.addPage(); y=44; text(`PRIMA PACKAGES  /  INVOICE ${order.number}`,left,y,width,10,true); y+=30 }
    function room(height) { if(y+height>765) newPage() }
    text('PRIMA',left,y,300,30,true); text('INVOICE',380,y,171,22,true); y+=37
    text('PACKAGES',left,y,300,10,true); text(`INV-${order.number}`,380,y,171,11); y+=28
    text('www.primapackages.pk  |  +92 323 3231712',left,y,width); y+=17
    text('Shop # B-52, Ground Floor, Karim Center, Saddar, Karachi',left,y,width,9); y+=30
    text(`Order: ${order.number}    |    Order date: ${order.date}`,left,y,width,10,true); y+=20
    text(`Payment status: ${paymentStatus(state,order)}    |    Currency: PKR`,left,y,width); y+=28
    text('BILL TO',left,y,width,9,true); y+=18
    for (const value of [order.customer,order.brand,order.phone,order.address].filter(Boolean)) {
      doc.font('Helvetica').fontSize(11)
      const h=doc.heightOfString(String(value),{width})+7
      room(h); text(value,left,y,width,11); y+=h
    }
    y+=16
    function tableHead() {
      room(35); doc.rect(left,y,width,28).fill('#eaf0eb')
      text('PRODUCT / SIZE',left+8,y+9,257,9,true); text('QTY',315,y+9,40,9,true); text('RATE',365,y+9,75,9,true); text('TOTAL',453,y+9,90,9,true); y+=36
    }
    tableHead()
    for (const item of order.items) {
      const label=`${item.name}\n${item.specification || 'Size not recorded'}`
      doc.font('Helvetica').fontSize(10)
      const h=Math.max(42,doc.heightOfString(label,{width:253})+18)
      if(y+h>745) {newPage(); tableHead()}
      text(label,left+8,y,253); text(item.quantity,315,y,40); text(rs(item.unitPrice),365,y,80,9); text(rs(item.quantity*item.unitPrice),453,y,95,9)
      y+=h; doc.moveTo(left,y-9).lineTo(left+width,y-9).strokeColor('#dbe3dd').stroke()
    }
    room(220); y+=12
    const total=orderTotal(order), received=receivedFor(state,order.id), balance=total-received
    const rows=[['Products total',order.items.reduce((s,i)=>s+i.quantity*i.unitPrice,0)],['Discount',-order.discount],['Delivery charged',order.deliveryCharge],['Net order total',total],['Received incl. advance',received],[balance<0?'Credit / refund due':'Remaining amount',Math.abs(balance)]]
    for(const [label,value] of rows) {
      const strong=label==='Net order total'||label==='Remaining amount'||label==='Credit / refund due'
      if(strong) doc.rect(285,y-5,266,25).fill('#eaf0eb')
      text(label,295,y,155,10,strong); text(rs(value),450,y,101,10,strong); y+=28
    }
    y+=12; text('Thank you for choosing Prima Packages.',left,y,width,11,true)
    y+=18; text('Custom-made for your brand. Please contact us for design and order updates.',left,y,width,9)
    const pages=doc.bufferedPageRange()
    for(let i=0;i<pages.count;i++) {
      doc.switchToPage(i)
      doc.font('Helvetica').fontSize(8).fillColor('#253c30').text(`INV-${order.number}  |  Page ${i+1} of ${pages.count}`,left,780,{width,lineBreak:false})
    }
    doc.end()
  })
}
