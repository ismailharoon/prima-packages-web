export async function database(env,path,body) {
  if(!env.SUPABASE_SERVICE_KEY) throw new Error('Backend database secret is not configured.')
  const response=await fetch(`${env.SUPABASE_URL}/rest/v1/${path}`,{
    method:body?'POST':'GET',headers:{apikey:env.SUPABASE_SERVICE_KEY,...(env.SUPABASE_SERVICE_KEY.startsWith('sb_secret_')?{}:{Authorization:`Bearer ${env.SUPABASE_SERVICE_KEY}`}), 'Content-Type':'application/json'},
    ...(body?{body:JSON.stringify(body)}:{})
  })
  if(!response.ok){const error=await response.json();throw new Error(error.message?.includes('STALE_REVISION')?'Records changed. Refresh and try again.':'Cloud database operation failed. No changes were saved.')}
  return response.json()
}
export async function readCloud(env) {
  const rows=await database(env,'prima_workspace_state?id=eq.1&select=data')
  if(!rows[0]?.data)throw new Error('Run the cloud database migration first.')
  return rows[0].data
}
export async function digest(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('')}
