# Vantage — Supabase backend setup (≈5 minutes, free, no card)

This turns the login/approval system into a **real** one: people can sign up from any
device, and `kasibkhan13@gmail.com` (and `adam@appypiellp.com`) approve/revoke them
from one central Admin dashboard. Do these 4 steps, then send me the 2 values in Step 4.

---

## Step 1 — Create a free Supabase project
1. Go to **https://supabase.com** → **Start your project** → sign in with GitHub or email.
2. Click **New project**.
   - Name: `vantage` (anything)
   - Database password: set any strong password (you won't need it day-to-day — save it somewhere)
   - Region: pick the one closest to you
3. Click **Create new project** and wait ~1–2 minutes for it to finish setting up.

---

## Step 2 — Create the users table + rules (copy‑paste one script)
1. In the left sidebar click **SQL Editor** → **New query**.
2. Paste **everything** below and click **Run**. (It's safe to run again if needed.)

```sql
-- Profiles table: one row per user, with an approval status
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  status text not null default 'pending',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Who counts as an admin
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select coalesce(lower(auth.jwt() ->> 'email') in
    ('kasibkhan13@gmail.com','adam@appypiellp.com'), false);
$$;

-- A user can read their own row; admins can read everyone
drop policy if exists "read own or admin" on public.profiles;
create policy "read own or admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

-- Only admins can change status (approve / revoke)
drop policy if exists "admin update" on public.profiles;
create policy "admin update" on public.profiles
  for update using (public.is_admin());

-- Auto-create a profile on signup (admins are auto-approved)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, status)
  values (
    new.id, new.email,
    coalesce(new.raw_user_meta_data->>'name',''),
    case when lower(new.email) in
      ('kasibkhan13@gmail.com','adam@appypiellp.com') then 'approved' else 'pending' end
  );
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

You should see **"Success. No rows returned."** — that's correct.

---

## Step 3 — Let people log in immediately (approval is our gate, not email confirmation)
1. Left sidebar → **Authentication** → **Sign In / Providers** (or **Providers → Email**).
2. Find **"Confirm email"** and turn it **OFF**, then **Save**.
   (This way new users can sign in right away, and *your approval* is what unlocks access.)

> Forgot-password reset emails still work automatically once this is connected.

---

## Step 4 — Send me these 2 values
1. Left sidebar → **Project Settings** (gear icon) → **API**.
2. Copy these two (both are safe to share — the anon key is designed to be public and is
   protected by the rules from Step 2):
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon public** key — a long string starting with `eyG...`
3. **Paste both to me in the chat.**

That's it — I'll plug them into the tool, deploy, and then:
- Anyone can **sign up from any device**
- You log in as `kasibkhan13@gmail.com` → **Admin** tab shows **every** pending request
- You **Approve** / **Revoke** and it applies everywhere
- **Forgot password** sends a real reset email

(You'll do the final testing since I can't reach your Supabase project from here.)
