'use client'
import {useEffect,useState,type FormEvent} from 'react'
import {AdminApp} from './AdminApp'
import {authClient,adminFetch,cloudMode} from '@/lib/admin/cloud-client'

export function AdminGate(){
 const [ready,setReady]=useState(false),[checking,setChecking]=useState(cloudMode),[busy,setBusy]=useState(false),[error,setError]=useState('')
 useEffect(()=>{
  if(!cloudMode)return
  let active=true
  async function check(){
   try{
    const {data}=await authClient().auth.getSession()
    if(!data.session){if(active){setReady(false);setChecking(false)};return}
    const response=await adminFetch('/session');const result=await response.json()
    if(!response.ok)throw new Error(result.error)
    if(active){setReady(true);setError('')}
   }catch(e){if(active){setReady(false);setError(e instanceof Error?e.message:'Unable to verify access.')}}
   finally{if(active)setChecking(false)}
  }
  void check()
  let subscription:{unsubscribe:()=>void}|undefined
  try{const {data}=authClient().auth.onAuthStateChange(event=>{
   if(event==='SIGNED_OUT'){setReady(false);setChecking(false)}
   else if(event==='SIGNED_IN')setTimeout(()=>{if(active)void check()},0)
  });subscription=data.subscription}catch{/* check() displays the configuration error. */}
  return()=>{active=false;subscription?.unsubscribe()}
 },[])
 async function login(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setError('')
  const fields=new FormData(event.currentTarget)
  try{const {error}=await authClient().auth.signInWithPassword({email:String(fields.get('email')).trim(),password:String(fields.get('password'))});if(error)throw error}
  catch(e){setError(e instanceof Error?e.message:'Sign-in failed.')}finally{setBusy(false)}
 }
 if(!cloudMode)return <AdminApp/>
 if(ready)return <><div className="admin-cloud-session"><span>Secure cloud workspace</span><button onClick={async()=>{const {error}=await authClient().auth.signOut({scope:'local'});if(error)setError(error.message)}}>Sign out</button>{error&&<span role="alert">{error}</span>}</div><AdminApp/></>
 return <main className="admin-start"><span className="admin-wordmark">PRIMA <small>BUSINESS WORKSPACE</small></span><h1>{checking?'Checking your access…':'Sign in to your workspace'}</h1>{!checking&&<form onSubmit={login} className="admin-form"><label className="admin-field"><span>Email</span><input name="email" type="email" autoComplete="username" required/></label><label className="admin-field"><span>Password</span><input name="password" type="password" autoComplete="current-password" required/></label><button className="admin-btn" disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form>}{error&&<p role="alert" className="admin-error">{error}</p>}</main>
}
