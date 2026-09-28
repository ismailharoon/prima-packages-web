import { readWorkspace, saveCommand, readImport, importAvailable } from '@/lib/admin/local-store.mjs'
import { localRequestAllowed } from '@/lib/admin/local-access.mjs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store, private', 'X-Content-Type-Options': 'nosniff' }
function allowed(request: Request) {
  return localRequestAllowed(request)
}
export async function GET(request: Request) {
  if (!allowed(request)) return Response.json({error:'Local admin is unavailable.'},{status:403,headers})
  try {
    if (new URL(request.url).searchParams.get('view') === 'import') return Response.json(readImport(),{headers})
    return Response.json({ state: readWorkspace(), mode:'local', importAvailable:importAvailable() },{headers})
  } catch { return Response.json({error:'Unable to read local records. Check local storage and try again.'},{status:500,headers}) }
}
export async function POST(request: Request) {
  if (!allowed(request)) return Response.json({error:'Local admin is unavailable.'},{status:403,headers})
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({error:'JSON required.'},{status:415,headers})
  try {
    const body = await request.text()
    if (body.length > 100000) return Response.json({error:'Request is too large.'},{status:413,headers})
    const command = JSON.parse(body)
    return Response.json({state:saveCommand(command),mode:'local',importAvailable:importAvailable()},{headers})
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save. Please retry.'
    return Response.json({error: /SQLITE|ENOENT|EPERM|database/i.test(message) ? 'Local storage is unavailable. Nothing was saved.' : message},{status:400,headers})
  }
}
