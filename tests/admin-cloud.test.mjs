import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {PGlite} from '@electric-sql/pglite'
import {emptyWorkspace,applyCommand,orderTotal} from '../src/lib/admin/domain.mjs'
import worker from '../cloudflare/worker.mjs'

const actor='00000000-0000-4000-8000-000000000001'
test('Postgres: access isolation, atomic writes, retries and stale revisions',async()=>{
 const db=new PGlite()
 try{
  await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz);create function auth.uid() returns uuid language sql as 'select null::uuid';insert into auth.users values('${actor}','owner@example.com',now());`)
  for(const name of ['202609270001_admin_access.sql','202609270002_business_tables.sql','202609270003_atomic_workspace.sql'])await db.exec(readFileSync(`supabase/migrations/${name}`,'utf8'))
  await db.exec(`insert into public.prima_admins(user_id)values('${actor}');`)
  const permissions=await db.query(`select has_table_privilege('authenticated','public.prima_workspace_state','SELECT') as can_read,has_function_privilege('authenticated','public.prima_commit_workspace(uuid,uuid,text,bigint,jsonb)','EXECUTE') as can_write`)
  assert.deepEqual(permissions.rows[0],{can_read:false,can_write:false})
  const command={action:'createOrder',payload:{customer:'Test',brand:'Test Brand',phone:'',address:'',date:'2026-09-27',source:'Other',status:'Confirmed',items:[{id:crypto.randomUUID(),name:'Label',category:'Woven Label',specification:'1 x 2',quantity:100,unitPrice:2000}],discount:0,deliveryCharge:35000,advance:100000,paymentMethod:'Cash'}}
  const next=applyCommand(emptyWorkspace(),command,'test')
  const request=crypto.randomUUID()
  const commit=(state,expected=0,id=request,hash='hash',who=actor)=>db.query('select public.prima_commit_workspace($1,$2,$3,$4,$5) as data',[who,id,hash,expected,JSON.stringify(state)])
  await commit(next)
  assert.equal((await db.query('select count(*)::int as n from prima_orders')).rows[0].n,1)
  assert.equal((await db.query('select count(*)::int as n from prima_payments')).rows[0].n,1)
  await commit(next)
  assert.equal((await db.query('select count(*)::int as n from prima_payments')).rows[0].n,1)
  await assert.rejects(commit(next,0,request,'different'),/Request ID conflict/)
  await assert.rejects(commit(next,0,crypto.randomUUID()),/STALE_REVISION/)
  await assert.rejects(commit(next,0,crypto.randomUUID(),'hash','00000000-0000-4000-8000-000000000002'),/Admin access required/)
  const invalid=structuredClone(next);invalid.revision=2;invalid.payments[0].orderId=crypto.randomUUID()
  await assert.rejects(commit(invalid,1,crypto.randomUUID()),/foreign key/)
  const saved=(await db.query('select data from prima_workspace_state')).rows[0].data
  assert.equal(saved.revision,1);assert.equal(orderTotal(saved.orders[0]),235000)
  assert.equal((await db.query('select count(*)::int as n from prima_orders')).rows[0].n,1)
 }finally{await db.close()}
})

test('Worker rejects missing sessions, foreign origins and unapproved users',async()=>{
 const env={ALLOWED_ORIGINS:'https://primapackages.pk',SUPABASE_URL:'https://test.invalid',SUPABASE_PUBLISHABLE_KEY:'test'}
 const request=(path,headers={})=>new Request(`https://api.test${path}`,{headers})
 assert.equal((await worker.fetch(request('/workspace'),env)).status,401)
 assert.equal((await worker.fetch(request('/workspace',{Origin:'https://bad.test'}),env)).status,403)
 const original=globalThis.fetch
 try{
  globalThis.fetch=async url=>Response.json(String(url).includes('/auth/')?{id:actor}:[])
  assert.equal((await worker.fetch(request('/workspace',{Authorization:'Bearer test'}),env)).status,403)
  globalThis.fetch=async url=>Response.json(String(url).includes('/auth/')?{id:actor}:[{user_id:actor}])
  assert.equal((await worker.fetch(request('/session',{Authorization:'Bearer test'}),env)).status,200)
 }finally{globalThis.fetch=original}
})
