-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check ((select auth.uid()) = id);
create policy "Users can update their own profile." on profiles for update using ((select auth.uid()) = id);

-- GYM INFO (Key-Value store for static strings like hours, contact)
create table if not exists gym_info (
  id uuid default uuid_generate_v4() primary key,
  category text not null, -- e.g., 'hours', 'pricing', 'contact'
  key text not null, -- e.g., 'weekday', 'basic', 'phone'
  value jsonb not null, -- Stores the actual data (string or object)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table gym_info enable row level security;
create policy "Gym info is viewable by everyone" on gym_info for select using (true);

-- EXERCISES
create table if not exists exercises (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  muscle_group text not null, -- chest, back, legs, etc.
  sets integer,
  reps text,
  equipment text,
  difficulty text default 'intermediate',
  instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table exercises enable row level security;
create policy "Exercises are viewable by everyone" on exercises for select using (true);

-- MEALS
create table if not exists meals (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null, -- breakfast, lunch, dinner, snack
  calories integer,
  protein integer,
  carbs integer,
  fat integer,
  ingredients jsonb, -- array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table meals enable row level security;
create policy "Meals are viewable by everyone" on meals for select using (true);

-- CHAT LOGS
create table if not exists chat_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users, -- can be null for anonymous
  session_id text, -- for grouping anonymous sessions if needed
  role text not null, -- 'user' or 'assistant'
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table chat_logs enable row level security;
create policy "Users can insert chat logs" on chat_logs for insert with check (true);
create policy "Users see their own chats" on chat_logs for select using ((auth.uid() = user_id) or (user_id is null));

-- HANDLERS
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
