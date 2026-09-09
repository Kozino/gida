-- Gida — run in Supabase SQL editor
-- Multi-tenant lodge / house OS. Owners are not listed until verified.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  phone text,
  name text,
  role text not null default 'tenant',
  org_id uuid,
  created_at timestamptz default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type text not null,
  status text not null default 'pending',
  verification text not null default 'draft',
  owner_user_id uuid references public.profiles(id),
  nin text,
  cac text,
  bank_name text,
  bank_account_name text,
  bank_account_number text,
  state text,
  city text,
  address text,
  whatsapp text,
  notes text,
  rejection_reason text,
  listed boolean not null default false,
  created_at timestamptz default now()
);

alter table public.profiles
  add constraint profiles_org_fk
  foreign key (org_id) references public.organizations(id);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  state text,
  city text,
  address text,
  gender_policy text default 'any',
  occupancy_type text default 'whole_room',
  cycle text default 'yearly',
  token_fee numeric,
  first_year_rent numeric,
  renewal_rent numeric,
  caution_fee numeric,
  service_charge numeric,
  published boolean default false,
  rules text,
  created_at timestamptz default now(),
  unique (org_id, slug)
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  block text,
  beds int default 1,
  occupied_beds int default 0,
  rent numeric,
  amenities text[] default '{}',
  available boolean default true
);

create table if not exists public.tokens (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  code text unique not null,
  fee_paid boolean default false,
  issued_by uuid,
  used_by uuid,
  created_at timestamptz default now(),
  expires_at timestamptz
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id),
  room_id uuid references public.rooms(id),
  tenant_user_id uuid not null references public.profiles(id),
  token_id uuid references public.tokens(id),
  status text not null default 'draft',
  applicant_name text,
  phone text,
  school_or_work text,
  nin text,
  surety_name text,
  surety_phone text,
  receipt_url text,
  signed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.tenancies (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id),
  room_id uuid not null references public.rooms(id),
  tenant_user_id uuid not null references public.profiles(id),
  start_date date,
  end_date date,
  rent numeric,
  caution_held numeric,
  active boolean default true
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  tenant_user_id uuid references public.profiles(id),
  type text not null,
  amount numeric,
  method text,
  reference text,
  receipt_note text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid references public.properties(id),
  tenant_user_id uuid references public.profiles(id),
  title text not null,
  category text,
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid,
  actor_id uuid,
  action text not null,
  detail text,
  created_at timestamptz default now()
);

alter table public.organizations enable row level security;
alter table public.properties enable row level security;
alter table public.rooms enable row level security;
alter table public.tokens enable row level security;
alter table public.applications enable row level security;
alter table public.tenancies enable row level security;
alter table public.payments enable row level security;
alter table public.tickets enable row level security;
alter table public.audit_events enable row level security;
alter table public.profiles enable row level security;

-- Public may read only verified + listed orgs and their published properties
create policy "public listed orgs" on public.organizations
  for select using (listed = true and verification = 'verified' and status = 'active');

create policy "public published properties" on public.properties
  for select using (
    published = true and exists (
      select 1 from public.organizations o
      where o.id = org_id and o.listed and o.verification = 'verified'
    )
  );

create policy "public rooms of published" on public.rooms
  for select using (
    exists (
      select 1 from public.properties p
      join public.organizations o on o.id = p.org_id
      where p.id = property_id and p.published and o.listed and o.verification = 'verified'
    )
  );
