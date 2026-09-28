import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import {orderTotal,receivedFor,paymentStatus} from '../src/lib/admin/domain.mjs'
import logoData from './invoice-logo.mjs'
export async function cloudInvoice(state,order){
 const doc=await PDFDocument.create();doc.setTitle(`Invoice ${order.number}`);doc.setAuthor('Prima Packages')
 const font=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold),logo=await doc.embedPng(logoData)
 const ink=rgb(.14,.23,.18),muted=rgb(.39,.44,.40),pale=rgb(.93,.95,.93),rule=rgb(.84,.88,.85)
 let page,y
 const rs=n=>`Rs. ${((n || 0)/100).toLocaleString('en-PK',{minimumFractionDigits:2,maximumFractionDigits:2})}`
 const clean=v=>String(v).replace(/×/g,'x')
 function text(v,x,t,size=10,strong=false,color=ink){page.drawText(clean(v),{x,y:842-t-size,size,font:strong?bold:font,color})}
 function right(v,x,t,size=10,strong=false){text(v,x-(strong?bold:font).widthOfTextAtSize(clean(v),size),t,size,strong)}
 function box(x,t,w,h,color){page.drawRectangle({x,y:842-t-h,width:w,height:h,color})}
 function line(t){page.drawLine({start:{x:44,y:842-t},end:{x:551,y:842-t},thickness:.6,color:rule})}
 function wrap(v,w,size=10,strong=false){
  const face=strong?bold:font,rows=[];let row=''
  for(const word of clean(v).split(/\s+/)){
   if(row&&face.widthOfTextAtSize(row+' '+word,size)>w){rows.push(row);row=''}
   for(const c of (row?' ':'')+word){if(face.widthOfTextAtSize(row+c,size)>w){rows.push(row);row=''}row+=c}
  }if(row)rows.push(row);return rows
 }
 function newPage(first=false){page=doc.addPage([595,842]);y=44
  if(first){page.drawImage(logo,{x:44,y:734,width:190,height:66});right('INVOICE',551,48,23,true);right(`INV-${order.number}`,551,80,10);y=126}
  else{text('PRIMA PACKAGES',44,y,12,true);right(`INV-${order.number}`,551,y,10);y+=32}
 }
 function head(){box(44,y,507,28,ink);for(const [v,x] of [['PRODUCT / SIZE',52],['QTY',324],['RATE (PKR)',375],['AMOUNT (PKR)',464]])text(v,x,y+9,8,true,rgb(1,1,1));y+=28}
 newPage(true);text('www.primapackages.pk  |  +92 323 3231712',44,y,9);y+=16
 text('Shop # B-52, Ground Floor, Karim Center, Saddar, Karachi',44,y,9,false,muted);y+=25;line(y);y+=18
 text('BILL TO',44,y,9,true);right(`Order date: ${order.date}`,551,y,10);y+=19;right(`Payment: ${paymentStatus(state,order)}`,551,y,10,true)
 for(const [i,v] of [order.customer,order.brand,order.phone,order.address].filter(Boolean).entries())for(const row of wrap(v,290,10,i===0)){if(y>720)newPage();text(row,44,y,10,i===0);y+=15}
 y+=22;if(y>690)newPage();head()
 for(const item of order.items){
  const rows=[...wrap(item.name,252,10,true).map(v=>[v,true]),...wrap(item.specification||'Size not recorded',252,9).map(v=>[v,false])]
  if(y+Math.min(Math.max(48,rows.length*14+20),620)>744){newPage();head()}
  let top=y+12;right(item.quantity,350,top,9);right(rs(item.unitPrice).slice(4),443,top,9);right(rs(item.quantity*item.unitPrice).slice(4),543,top,9,true)
  for(const [v,strong] of rows){if(top>724){newPage();head();top=y+12}text(v,52,top,strong?10:9,strong,strong?ink:muted);top+=14}
  y=Math.max(y+48,top+10);line(y)
 }
 if(y+242>758)newPage();y+=18
 const total=orderTotal(order),received=receivedFor(state,order.id),balance=total-received
 for(const [label,value,strong] of [['Products total',order.items.reduce((s,i)=>s+i.quantity*i.unitPrice,0)],['Discount',-order.discount],['Delivery charged',order.deliveryCharge],['Net order total',total,true],['Received incl. advance',received],[balance<0?'Credit / refund due':'Remaining amount',Math.abs(balance),true]]){
  if(strong)box(274,y-5,277,26,pale);text(label,284,y,9,strong);right(rs(value),541,y,10,strong);y+=28
 }
 y+=16;text('Thank you for choosing Prima Packages.',44,y,11,true);y+=18;text('Custom-made for your brand. Contact us for design and order updates.',44,y,9,false,muted)
 doc.getPages().forEach((p,i)=>{page=p;line(783);text(`INV-${order.number}`,44,795,8,false,muted);right(`Page ${i+1} of ${doc.getPageCount()}`,551,795,8)})
 return doc.save()
}

