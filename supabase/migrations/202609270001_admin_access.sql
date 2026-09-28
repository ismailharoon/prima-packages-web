-- Run once in Supabase SQL Editor. Safe to rerun.
-- Access foundation only; business tables and data migration follow separately.
begin;

create table if not exists public.prima_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.prima_admins enable row level security;
revoke all on table public.prima_admins from public, anon, authenticated;
grant select on table public.prima_admins to authenticated;
grant all on table public.prima_admins to service_role;

drop policy if exists prima_admin_read_self on public.prima_admins;
create policy prima_admin_read_self on public.prima_admins
  for select to authenticated
  using (user_id = (select auth.uid()));

-- No client insert/update/delete policies: users cannot promote themselves.
commit;
