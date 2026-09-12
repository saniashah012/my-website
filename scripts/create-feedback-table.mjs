import pg from "pg"

const { Client } = pg

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const sql = `
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

drop policy if exists "feedback_select_all" on public.feedback;
create policy "feedback_select_all" on public.feedback for select using (true);

drop policy if exists "feedback_insert_all" on public.feedback;
create policy "feedback_insert_all" on public.feedback for insert with check (
  char_length(name) between 1 and 120
  and char_length(message) between 1 and 2000
  and rating between 1 and 5
);
`

async function main() {
  await client.connect()
  await client.query(sql)
  const res = await client.query(
    "select column_name, data_type from information_schema.columns where table_schema = 'public' and table_name = 'feedback' order by ordinal_position",
  )
  console.log("[v0] feedback table columns:", JSON.stringify(res.rows))
  await client.end()
}

main().catch((err) => {
  console.error("[v0] error:", err.message)
  process.exit(1)
})
