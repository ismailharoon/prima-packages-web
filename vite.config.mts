import {defineConfig} from 'vite'
import vinext from 'vinext'
import {cloudflare} from '@cloudflare/vite-plugin'
import {fileURLToPath} from 'node:url'

const disabled=fileURLToPath(new URL('./cloudflare/frontend-local-disabled.mjs',import.meta.url))
export default defineConfig({
 plugins:[
  {name:'disable-local-admin-on-cloudflare',enforce:'pre',resolveId(source){
   if(/(?:^|\/)lib\/admin\/(?:local-store|local-access|invoice)\.mjs$/.test(source))return disabled
  }},
  vinext(),
  cloudflare({configPath:'wrangler.frontend.jsonc',viteEnvironment:{name:'rsc',childEnvironments:['ssr']}}),
 ],
 define:{
  'process.env.NEXT_PUBLIC_ADMIN_MODE':JSON.stringify('cloud'),
  'process.env.NEXT_PUBLIC_ADMIN_API_URL':JSON.stringify('https://prima-admin-api.prima-packages-web.workers.dev'),
  'process.env.NEXT_PUBLIC_SUPABASE_URL':JSON.stringify('https://dbvqsolzfgqdirpfcfyx.supabase.co'),
  'process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY':JSON.stringify('sb_publishable_QrGzFZ4eAudqAYEwYigMOQ_ABdL2XUF'),
  'process.env.PRIMA_LOCAL_ADMIN':JSON.stringify('0'),
 },
})
