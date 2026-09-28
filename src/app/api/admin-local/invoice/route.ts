import { localRequestAllowed } from '@/lib/admin/local-access.mjs'
import { readWorkspace } from '@/lib/admin/local-store.mjs'
import { generateInvoice, invoiceAllowed } from '@/lib/admin/invoice.mjs'
import type { Order } from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = {'Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff'}
export async function GET(request:Request) {
  if(!localRequestAllowed(request)) return Response.json({error:'Local admin is unavailable.'},{status:403,headers})
  try {
    const state=readWorkspace()
    const order=state.orders.find((o:Order)=>o.id===new URL(request.url).searchParams.get('orderId'))
    if(!order) return Response.json({error:'Order not found.'},{status:404,headers})
    if(!invoiceAllowed(order)) return Response.json({error:'Confirm the order before generating its invoice.'},{status:400,headers})
    const pdf=await generateInvoice(state,order)
    const name=order.number.replace(/[^a-zA-Z0-9_-]/g,'')
    return new Response(new Uint8Array(pdf),{headers:{...headers,'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="Prima-Invoice-${name}.pdf"`}})
  } catch { return Response.json({error:'Unable to generate invoice. Please try again.'},{status:500,headers}) }
}
