-- Roles
create type public.app_role as enum ('admin', 'student');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = auth.uid());

create policy "profiles_select_admin" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = auth.uid());

-- Enrollments
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course text not null default 'Hardware Internship (2 weeks)',
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  seat_number integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, course)
);

grant select, insert on public.enrollments to authenticated;
grant all on public.enrollments to service_role;

alter table public.enrollments enable row level security;

create policy "enrollments_select_own" on public.enrollments
  for select to authenticated using (user_id = auth.uid());

create policy "enrollments_select_admin" on public.enrollments
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "enrollments_insert_own" on public.enrollments
  for insert to authenticated with check (user_id = auth.uid());

-- Payments
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  razorpay_payment_id text unique,
  razorpay_order_id text,
  razorpay_payment_link_id text,
  amount_paise integer,
  currency text not null default 'INR',
  method text,
  status text not null default 'captured',
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

grant select on public.payments to authenticated;
grant all on public.payments to service_role;

alter table public.payments enable row level security;

create policy "payments_select_own" on public.payments
  for select to authenticated using (user_id = auth.uid());

create policy "payments_select_admin" on public.payments
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Auto-create a profile row when a student signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', '')
    ),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();