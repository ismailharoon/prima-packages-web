import { applyCommand } from '../src/lib/admin/domain.mjs'
import { database, readCloud, digest } from './storage.mjs'
import { cloudInvoice } from './invoice.mjs'
const worker = {
  async fetch(request, env) {
    const origin=request.headers.get('Origin')
    const allowed=(env.ALLOWED_ORIGINS || '').split(',').includes(origin)
    const headers={'Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff','Vary':'Origin'}
    if(allowed) Object.assign(headers,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Max-Age':'600'})
    const reply=(data,status=200)=>Response.json(data,{status,headers})
    if(origin&&!allowed)return reply({error:'Origin not allowed.'},403)
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers})
    if(!['GET','POST'].includes(request.method))return reply({error:'Method not allowed.'},405)
    const path=new URL(request.url).pathname
    if(path==='/health'&&request.method==='GET')return reply({status:'ok'})
    if(!['/session','/workspace','/invoice'].includes(path))return reply({error:'Not found.'},404)
    const authorization=request.headers.get('Authorization')
    if(!authorization?.startsWith('Bearer '))return reply({error:'Please sign in.'},401)
    try {
      const authHeaders={apikey:env.SUPABASE_PUBLISHABLE_KEY,Authorization:authorization}
      const userResponse=await fetch(`${env.SUPABASE_URL}/auth/v1/user`,{headers:authHeaders})
      if(!userResponse.ok)return reply({error:'Session expired. Please sign in again.'},401)
      const user=await userResponse.json()
      if(!user.id)return reply({error:'Invalid session.'},401)
      // Membership is queried with the user's own JWT. RLS allows only their row.
      const membership=await fetch(`${env.SUPABASE_URL}/rest/v1/prima_admins?select=user_id&user_id=eq.${encodeURIComponent(user.id)}`,{headers:authHeaders})
      if(!membership.ok)return reply({error:'Cannot verify admin access.'},503)
      const rows=await membership.json()
      if(!Array.isArray(rows)||!rows.some(row=>row.user_id===user.id))return reply({error:'Admin access is not enabled for this account.'},403)
      if(path==='/session'&&request.method==='GET')return reply({user:{id:user.id,email:user.email}})
      if(request.method==='GET') {
        const state=await readCloud(env)
        if(path==='/invoice') {
          const order=state.orders.find(o=>o.id===new URL(request.url).searchParams.get('orderId'))
          if(!order)return reply({error:'Order not found.'},404)
          if(!['Confirmed','Production','Ready','Dispatched','Completed'].includes(order.status))return reply({error:'Confirm this order first.'},400)
          const pdf=await cloudInvoice(state,order)
          return new Response(pdf,{headers:{...headers,'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="Prima-Invoice-${order.number.replace(/[^a-zA-Z0-9_-]/g,'')}.pdf"`}})
        }
        return reply({state,mode:'cloud',importAvailable:false})
      }
      if(path!=='/workspace')return reply({error:'Method not allowed.'},405)
      if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply({error:'JSON required.'},415)
      // Bound the stream before decoding to avoid buffering arbitrary bodies.
      const reader=request.body?.getReader();const chunks=[];let size=0
      if(!reader)return reply({error:'Missing request.'},400)
      while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>100000){await reader.cancel();return reply({error:'Request too large.'},413)}chunks.push(value)}
      const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
      let command
      try{command=JSON.parse(new TextDecoder().decode(bytes))}catch{return reply({error:'Invalid JSON.'},400)}
      if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(command.requestId||''))return reply({error:'Invalid request identifier.'},400)
      if(command.action==='importWorkbook')return reply({error:'Use the reviewed migration tool.'},400)
      const hash=await digest(JSON.stringify({action:command.action,payload:command.payload}))
      const prior=await database(env,`prima_commands?request_id=eq.${command.requestId}&select=digest,actor_id`)
      if(prior.length){if(prior[0].digest!==hash||prior[0].actor_id!==user.id)return reply({error:'Request identifier conflict.'},409);return reply({state:await readCloud(env),mode:'cloud',importAvailable:false})}
      const current=await readCloud(env)
      let next
      try{next=applyCommand(current,command,user.email||user.id)}catch(e){return reply({error:e.message},400)}
      const saved=await database(env,'rpc/prima_commit_workspace',{p_actor:user.id,p_request:command.requestId,p_digest:hash,p_expected:current.revision,p_state:next})
      return reply({state:saved,mode:'cloud',importAvailable:false})
    }catch(e){return reply({error:e.message==='Records changed. Refresh and try again.'?e.message:'Cloud connection unavailable. Please retry; if it persists, check backend configuration.'},503)}
  }
}
export default worker
