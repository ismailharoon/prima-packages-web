import test from 'node:test'
import assert from 'node:assert/strict'
import { localRequestAllowed } from '../src/lib/admin/local-access.mjs'
const enabled={PRIMA_LOCAL_ADMIN:'1'}
const req=(host,origin,extra={})=>new Request('http://localhost:3100/api/admin-local',{method:'POST',headers:{host,origin,...extra}})
test('same-origin loopback works despite Next internal hostname normalization',()=>{
  assert.equal(localRequestAllowed(req('127.0.0.1:3100','http://127.0.0.1:3100'),enabled),true)
  assert.equal(localRequestAllowed(req('localhost:3100','http://localhost:3100'),enabled),true)
})
test('reject external origins, other ports, malformed hosts and disabled/cloud mode',()=>{
  for(const [host,origin] of [['127.0.0.1:3100','https://evil.example'],['localhost:3100','http://localhost:3000'],['evil.example','http://evil.example'],['localhost@evil.example','http://evil.example'],['localhost:3100','null']]) assert.equal(localRequestAllowed(req(host,origin),enabled),false)
  const request=req('localhost:3100','http://localhost:3100')
  assert.equal(localRequestAllowed(request,{}),false)
  assert.equal(localRequestAllowed(request,{...enabled,VERCEL:'1'}),false)
  assert.equal(localRequestAllowed(req('localhost:3100','http://localhost:3100',{'sec-fetch-site':'cross-site'}),enabled),false)
})
