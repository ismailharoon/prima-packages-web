-- Run after 202609270001_admin_access.sql in Supabase SQL Editor.
-- Creates empty tables only. No local records are uploaded or replaced.
-- All money columns are integer paisa (Rs. 1 = 100).
begin;

create table if not exists public.prima_orders (
  id uuid primary key,
  number text not null unique,
  order_date date not null,
  customer text not null,
  brand text not null default '',
  phone text not null default '',
  address text not null default '',
  status text not null check (status in ('New request','Confirmed','Production','Ready','Dispatched','Completed','Cancelled','Needs review')),
  discount bigint not null check (discount >= 0),
  delivery_charge bigint not null check (delivery_charge >= 0),
  version integer not null default 1 check (version > 0),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.prima_order_items (
  id uuid primary key,
  order_id uuid not null references public.prima_orders(id),
  position integer not null check (position >= 0),
  name text not null,
  specification text not null default '',
  category text not null,
  quantity integer not null check (quantity > 0),
  unit_price bigint not null check (unit_price >= 0),
  unique(order_id, position)
);

create table if not exists public.prima_payments (
  id uuid primary key,
  order_id uuid not null references public.prima_orders(id),
  amount bigint not null check (amount > 0),
  payment_date date,
  kind text not null check (kind in ('Receipt','Refund')),
  account text not null check (account in ('Business','Ismail','Rizwan')),
  method text not null,
  reference text not null default '',
  note text not null default '',
  reversal_of uuid references public.prima_payments(id)
);

create table if not exists public.prima_expenses (
  id uuid primary key,
  order_id uuid references public.prima_orders(id),
  expense_date date not null,
  description text not null,
  category text not null,
  product_type text not null default 'Other',
  brand text not null default '',
  amount bigint not null check (amount > 0),
  funding text not null check (funding in ('Business','Ismail','Rizwan')),
  paid boolean not null,
  paid_date date,
  note text not null default '',
  voided boolean not null default false
);

create table if not exists public.prima_movements (
  id uuid primary key,
  movement_date date not null,
  type text not null check (type in ('Capital in','Partner repayment','Owner withdrawal')),
  partner text not null check (partner in ('Ismail','Rizwan')),
  amount bigint not null check (amount > 0),
  note text not null
);

create table if not exists public.prima_audit (
  id uuid primary key,
  occurred_at timestamptz not null,
  actor text not null,
  action text not null,
  detail text not null
);

create table if not exists public.prima_workspace_meta (
  id integer primary key check (id = 1),
  revision bigint not null default 0 check (revision >= 0),
  opening_balance bigint not null default 0,
  import_details jsonb not null default '{}'::jsonb
);
insert into public.prima_workspace_meta(id) values (1) on conflict (id) do nothing;

-- Request receipts will support atomic, repeat-safe backend commands.
create table if not exists public.prima_commands (
  request_id uuid primary key,
  actor_id uuid not null references auth.users(id),
  digest text not null,
  resulting_revision bigint not null,
  created_at timestamptz not null default now()
);

create index if not exists prima_orders_date_idx on public.prima_orders(order_date desc);
create index if not exists prima_payments_order_idx on public.prima_payments(order_id);
create index if not exists prima_expenses_order_idx on public.prima_expenses(order_id);

-- Browser clients cannot read or write these tables directly, even after login.
-- The future Worker must verify the user's token AND prima_admins membership
-- before using its server-only service credential. Never expose that credential.
do $$
declare table_name text;
begin
  foreach table_name in array array[
    'prima_orders','prima_order_items','prima_payments','prima_expenses',
    'prima_movements','prima_audit','prima_workspace_meta','prima_commands'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from public, anon, authenticated', table_name);
    execute format('grant all on table public.%I to service_role', table_name);
  end loop;
end $$;

commit;

-- Expected result: eight rows, each with row_security_enabled = true.
select tablename, rowsecurity as row_security_enabled
from pg_tables
where schemaname = 'public' and tablename in (
  'prima_orders','prima_order_items','prima_payments','prima_expenses',
  'prima_movements','prima_audit','prima_workspace_meta','prima_commands'
)
order by tablename;
