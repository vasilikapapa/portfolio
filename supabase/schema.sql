-- =========================================================
-- Portfolio resume storage
-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> Run
-- =========================================================

-- 1) Table that stores the resume as one JSON document
create table if not exists public.site_content (
  id         text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Turn on Row Level Security (blocks everything not allowed below)
alter table public.site_content enable row level security;

-- 3) Anyone visiting the site can READ the resume
drop policy if exists "Public can read content" on public.site_content;
create policy "Public can read content"
  on public.site_content for select
  using (true);

-- 4) Only the admin account can CREATE or UPDATE it.
--    >>> Replace the email below with the email you sign in with. <<<
drop policy if exists "Admin can insert content" on public.site_content;
create policy "Admin can insert content"
  on public.site_content for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'vasilika.papa108@gmail.com');

drop policy if exists "Admin can update content" on public.site_content;
create policy "Admin can update content"
  on public.site_content for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'vasilika.papa108@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'vasilika.papa108@gmail.com');
