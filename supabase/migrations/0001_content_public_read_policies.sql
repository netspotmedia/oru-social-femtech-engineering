-- UNAPPLIED PROPOSAL — requires review and application by someone with
-- Supabase access. Status tracked in docs/current-status.md.
--
-- Purpose: allow anonymous (publishable/anon key) reads of PUBLISHED content
-- only. Columns referenced below are those used by lib/supabase/server.ts;
-- verify names against the live schema before applying.
--
-- Apply with: supabase db push (or paste into the SQL editor), then run the
-- verification queries at the bottom with the anon key.

-- 1. content_items: anon may read published rows only.
alter table public.content_items enable row level security;

drop policy if exists "Public can read published content" on public.content_items;
create policy "Public can read published content"
  on public.content_items
  for select
  to anon
  using (is_published = true);

-- 2. content_categories: anon may read category names (joined for labels).
alter table public.content_categories enable row level security;

drop policy if exists "Public can read content categories" on public.content_categories;
create policy "Public can read content categories"
  on public.content_categories
  for select
  to anon
  using (true);

-- 3. No write policies for anon: inserts/updates/deletes must go through
--    authenticated staff roles only (define separately per role model).

-- Verification (run with the ANON key, must return zero draft rows):
--   select count(*) from public.content_items where is_published = false;
--   --> 0 rows visible (or permission denied on the predicate column is also
--       acceptable evidence drafts are unreachable; record the outcome).
--   select slug from public.content_items where is_published = true limit 1;
--   --> succeeds.
