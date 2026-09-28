-- Run after 001 and 002. Backend-only atomic storage and retry protection.
begin;
-- Historical workbook rows may have an unknown/zero cost. Preserve them;
-- new expense commands still require a positive amount in the backend.
alter table public.prima_expenses drop constraint if exists prima_expenses_amount_check;
alter table public.prima_expenses add constraint prima_expenses_amount_check check(amount >= 0);
create table if not exists public.prima_workspace_state (
 id integer primary key check(id=1), data jsonb not null
);
alter table public.prima_workspace_state enable row level security;
revoke all on public.prima_workspace_state from public,anon,authenticated;
grant all on public.prima_workspace_state to service_role;
insert into public.prima_workspace_state values(1,'{"schema":1,"revision":0,"orders":[],"payments":[],"expenses":[],"movements":[],"audit":[],"openingBalance":0}') on conflict do nothing;

create or replace function public.prima_commit_workspace(
 p_actor uuid, p_request uuid, p_digest text, p_expected bigint, p_state jsonb
) returns jsonb language plpgsql security invoker set search_path='' as $$
declare current_state jsonb; prior public.prima_commands%rowtype;
begin
 if not exists(select 1 from public.prima_admins where user_id=p_actor) then
  raise exception 'Admin access required';
 end if;
 select data into current_state from public.prima_workspace_state where id=1 for update;
 select * into prior from public.prima_commands where request_id=p_request;
 if found then
  if prior.digest<>p_digest or prior.actor_id<>p_actor then raise exception 'Request ID conflict'; end if;
  return current_state;
 end if;
 if (current_state->>'revision')::bigint<>p_expected then raise exception 'STALE_REVISION'; end if;
 if (p_state->>'revision')::bigint<>p_expected+1 then raise exception 'Invalid revision'; end if;
 if jsonb_typeof(p_state->'orders')<>'array' or jsonb_typeof(p_state->'payments')<>'array'
  or jsonb_typeof(p_state->'expenses')<>'array' or jsonb_typeof(p_state->'audit')<>'array'
  or jsonb_typeof(p_state->'movements')<>'array' then raise exception 'Invalid workspace'; end if;

 -- Maintain relational projections in the SAME transaction as the snapshot.
 -- A failed constraint rolls back all changes, including the request receipt.
 delete from public.prima_payments where id is not null;
 delete from public.prima_expenses where id is not null;
 delete from public.prima_order_items where id is not null;
 delete from public.prima_orders where id is not null;
 delete from public.prima_movements where id is not null;
 delete from public.prima_audit where id is not null;
 insert into public.prima_orders(id,number,order_date,customer,brand,phone,address,status,discount,delivery_charge,version,details,created_at)
 select (o->>'id')::uuid,o->>'number',(o->>'date')::date,o->>'customer',coalesce(o->>'brand',''),coalesce(o->>'phone',''),coalesce(o->>'address',''),o->>'status',(o->>'discount')::bigint,(o->>'deliveryCharge')::bigint,(o->>'version')::integer,o,(o->>'createdAt')::timestamptz
 from jsonb_array_elements(p_state->'orders') o;
 insert into public.prima_order_items(id,order_id,position,name,specification,category,quantity,unit_price)
 select (i->>'id')::uuid,(o->>'id')::uuid,(n-1)::integer,i->>'name',coalesce(i->>'specification',''),i->>'category',(i->>'quantity')::integer,(i->>'unitPrice')::bigint
 from jsonb_array_elements(p_state->'orders') o cross join lateral jsonb_array_elements(o->'items') with ordinality as line(i,n);
 insert into public.prima_payments(id,order_id,amount,payment_date,kind,account,method,reference,note)
 select (p->>'id')::uuid,(p->>'orderId')::uuid,(p->>'amount')::bigint,nullif(p->>'date','')::date,p->>'kind',p->>'account',p->>'method',coalesce(p->>'reference',''),coalesce(p->>'note','') from jsonb_array_elements(p_state->'payments') p;
 update public.prima_payments t set reversal_of=nullif(p->>'reversalOf','')::uuid from jsonb_array_elements(p_state->'payments') p where t.id=(p->>'id')::uuid;
 insert into public.prima_expenses(id,order_id,expense_date,description,category,product_type,brand,amount,funding,paid,paid_date,note,voided)
 select (e->>'id')::uuid,nullif(e->>'orderId','')::uuid,(e->>'date')::date,e->>'description',e->>'category',coalesce(e->>'productType','Other'),coalesce(e->>'brand',''),(e->>'amount')::bigint,e->>'funding',(e->>'paid')::boolean,nullif(e->>'paidDate','')::date,coalesce(e->>'note',''),coalesce((e->>'voided')::boolean,false) from jsonb_array_elements(p_state->'expenses') e;
 insert into public.prima_movements(id,movement_date,type,partner,amount,note)
 select (m->>'id')::uuid,(m->>'date')::date,m->>'type',m->>'partner',(m->>'amount')::bigint,m->>'note' from jsonb_array_elements(p_state->'movements') m;
 insert into public.prima_audit(id,occurred_at,actor,action,detail)
 select (a->>'id')::uuid,(a->>'at')::timestamptz,a->>'actor',a->>'action',a->>'detail' from jsonb_array_elements(p_state->'audit') a;
 update public.prima_workspace_meta set revision=p_expected+1,opening_balance=(p_state->>'openingBalance')::bigint,import_details=jsonb_build_object('fingerprint',p_state->>'importFingerprint') where id=1;
 update public.prima_workspace_state set data=p_state where id=1;
 insert into public.prima_commands(request_id,actor_id,digest,resulting_revision) values(p_request,p_actor,p_digest,p_expected+1);
 return p_state;
end $$;
revoke all on function public.prima_commit_workspace(uuid,uuid,text,bigint,jsonb) from public,anon,authenticated;
grant execute on function public.prima_commit_workspace(uuid,uuid,text,bigint,jsonb) to service_role;
commit;
