-- Run this entire file in your Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → New Query → paste this → Run

create table if not exists lesson_bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  parent_name text,
  parent_email text,
  parent_phone text,
  child_name text,
  child_age integer,
  lesson_type text,
  lesson_duration text,
  water_comfort_level integer,
  water_comfort_label text,
  lesson_date date,
  lesson_time text,
  additional_notes text,
  waiver_agreed boolean default false,
  waiver_signature text,
  status text default 'pending'
);

create table if not exists lifeguard_bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  contact_name text,
  contact_email text,
  contact_phone text,
  event_date date,
  event_start_time text,
  event_end_time text,
  event_address text,
  pool_type text,
  estimated_swimmers integer,
  children_count integer default 0,
  additional_notes text,
  status text default 'pending'
);

create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  parent_name text,
  parent_email text,
  parent_phone text,
  preferred_dates text,
  lesson_type text,
  notes text,
  status text default 'waiting'
);

create table if not exists gift_lessons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  purchaser_name text,
  purchaser_email text,
  recipient_name text,
  lesson_type text,
  lesson_duration text,
  message text,
  gift_code text,
  status text default 'pending'
);

create table if not exists interested_families (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text,
  email text,
  source text default 'homepage'
);

-- Allow public access (no login required for bookings)
alter table lesson_bookings enable row level security;
alter table lifeguard_bookings enable row level security;
alter table waitlist enable row level security;
alter table gift_lessons enable row level security;
alter table interested_families enable row level security;

create policy "Allow public insert" on lesson_bookings for insert with check (true);
create policy "Allow public select" on lesson_bookings for select using (true);
create policy "Allow public update" on lesson_bookings for update using (true);

create policy "Allow public insert" on lifeguard_bookings for insert with check (true);
create policy "Allow public select" on lifeguard_bookings for select using (true);
create policy "Allow public update" on lifeguard_bookings for update using (true);

create policy "Allow public insert" on waitlist for insert with check (true);
create policy "Allow public select" on waitlist for select using (true);
create policy "Allow public update" on waitlist for update using (true);

create policy "Allow public insert" on gift_lessons for insert with check (true);
create policy "Allow public select" on gift_lessons for select using (true);
create policy "Allow public update" on gift_lessons for update using (true);

create policy "Allow public insert" on interested_families for insert with check (true);
create policy "Allow public select" on interested_families for select using (true);
