-- Run AFTER migrations/202609270001_admin_access.sql.
-- Replace the placeholder with the exact email you created in Authentication.
-- Never enter your password here.
do $$
declare
  owner_email text := 'REPLACE_WITH_YOUR_ADMIN_EMAIL';
  owner_id uuid;
begin
  if owner_email = 'REPLACE_WITH_YOUR_ADMIN_EMAIL' then
    raise exception 'Replace the admin email placeholder first.';
  end if;
  select id into owner_id from auth.users
    where lower(email) = lower(trim(owner_email)) and email_confirmed_at is not null;
  if owner_id is null then
    raise exception 'No confirmed user with this email. Check Authentication > Users.';
  end if;
  insert into public.prima_admins(user_id) values (owner_id)
    on conflict (user_id) do nothing;
end $$;

select u.email, a.created_at as admin_access_granted_at
from public.prima_admins a join auth.users u on u.id = a.user_id;
