import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

let client: SupabaseClient | null = null

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null
  client ??= createClient(url, key)
  return client
}

export function mergeFeedback(current: Feedback[], incoming: Feedback[]) {
  return Array.from(new Map([...current, ...incoming].map((item) => [item.id, item])).values())
    .sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id))
}
