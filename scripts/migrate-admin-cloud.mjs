// Dry-run by default. Credentials must be in .env.cloud.local, never CLI text.
// node --env-file=.env.cloud.local scripts/migrate-admin-cloud.mjs [--apply]
import {mkdirSync,writeFileSync} from 'node:fs'
import {readWorkspace} from '../src/lib/admin/local-store.mjs'
import {summarize} from '../src/lib/admin/domain.mjs'
import {readCloud,database,digest} from '../cloudflare/storage.mjs'

const env=process.env
if(!env.SUPABASE_URL||!env.SUPABASE_SERVICE_KEY||env.SUPABASE_SERVICE_KEY==='PASTE_SECRET_KEY_HERE')throw Error('Configure SUPABASE_URL and SUPABASE_SERVICE_KEY in the ignored .env.cloud.local file.')
if(!env.PRIMA_OWNER_ID){const owners=await database(env,'prima_admins?select=user_id');if(owners.length!==1)throw Error('Set PRIMA_OWNER_ID explicitly when more than one admin exists.');env.PRIMA_OWNER_ID=owners[0].user_id}
const local=readWorkspace(),cloud=await readCloud(env)
const sourceHash=await digest(JSON.stringify(local))
if(cloud.cloudMigrationFingerprint===sourceHash){console.log('This exact local snapshot has already been imported. Nothing changed.');process.exit(0)}
if(cloud.revision!==0||['orders','payments','expenses','movements','audit'].some(k=>cloud[k].length))throw Error('Cloud workspace is not empty. Refusing to overwrite live records.')
const admins=await database(env,`prima_admins?user_id=eq.${encodeURIComponent(env.PRIMA_OWNER_ID)}&select=user_id`)
if(!admins.length)throw Error('PRIMA_OWNER_ID is not an approved admin.')
for(const key of ['orders','payments','expenses','movements','audit']) {
 const ids=local[key].map(x=>x.id)
 if(new Set(ids).size!==ids.length)throw Error(`Duplicate ${key} IDs`)
}
const orderIds=new Set(local.orders.map(o=>o.id))
if(local.payments.some(p=>!orderIds.has(p.orderId))||local.expenses.some(e=>e.orderId&&!orderIds.has(e.orderId)))throw Error('Broken order links; resolve before migration.')
const report={orders:local.orders.length,products:local.orders.reduce((n,o)=>n+o.items.length,0),payments:local.payments.length,expenses:local.expenses.length,summary:summarize(local)}
console.log(JSON.stringify({dryRun:!process.argv.includes('--apply'),...report},null,2))
if(!process.argv.includes('--apply'))process.exit(0)
mkdirSync('.local/admin/backups',{recursive:true})
writeFileSync(`.local/admin/backups/before-cloud-${Date.now()}.json`,JSON.stringify(local,null,2),{flag:'wx'})
// Confirm local data did not change while reviewing the remote workspace.
if(await digest(JSON.stringify(readWorkspace()))!==sourceHash)throw Error('Local records changed. Pause entries and retry.')
const next={...local,revision:1,cloudMigrationFingerprint:sourceHash}
next.audit=[{id:crypto.randomUUID(),at:new Date().toISOString(),actor:env.PRIMA_OWNER_ID,action:'migrateLocalWorkspace',detail:`Migrated ${local.orders.length} orders with original contacts, payments and expenses. Local revision ${local.revision}.`},...local.audit]
const saved=await database(env,'rpc/prima_commit_workspace',{p_actor:env.PRIMA_OWNER_ID,p_request:crypto.randomUUID(),p_digest:sourceHash,p_expected:0,p_state:next})
if(JSON.stringify(summarize(saved))!==JSON.stringify(summarize(local)))throw Error('Cloud reconciliation failed. Keep local mode active.')
const reread=await readCloud(env)
if(reread.orders.length!==local.orders.length||JSON.stringify(summarize(reread))!==JSON.stringify(summarize(local)))throw Error('Read-back verification failed. Keep local mode active.')
console.log('Migration and read-back totals verified. Local data retained. Switch to cloud mode only after login and API checks pass.')
