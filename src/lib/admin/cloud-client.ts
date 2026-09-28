'use client'
import { createClient } from '@supabase/supabase-js'

export const cloudMode=process.env.NEXT_PUBLIC_ADMIN_MODE==='cloud'
const api=process.env.NEXT_PUBLIC_ADMIN_API_URL?.replace(/\/$/,'')
let client:ReturnType<typeof createClient>|undefined
export function authClient(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if(!url||!key)throw new Error('Supabase login is not configured.')
  return client??=createClient(url,key)
}
export async function adminFetch(path:string,options:RequestInit={}){
  if(!cloudMode)return fetch(path,options)
  if(!api)throw new Error('Cloud backend URL is not configured.')
  const {data,error}=await authClient().auth.getSession()
  if(error||!data.session)throw new Error('Please sign in again.')
  const endpoint=path.replace('/api/admin-local/invoice','/invoice').replace('/api/admin-local','/workspace')
  const headers=new Headers(options.headers)
  headers.set('Authorization',`Bearer ${data.session.access_token}`)
  return fetch(`${api}${endpoint}`,{...options,headers,cache:'no-store'})
}
