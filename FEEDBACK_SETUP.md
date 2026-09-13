# Feedback section

The existing page now uses `@supabase/supabase-js` to read and insert rows in your existing `public.feedback` table. No project or table is created.

## Existing project configuration

- In Vercel, verify the existing integration provides `NEXT_PUBLIC_SUPABASE_URL` and either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the deployment environment. Redeploy after changing environment variables.
- For local development, copy `.env.example` to `.env.local` and use the same project's public values, then restart `npm run dev`. Never use a service-role/secret key in the browser.
- The existing table must permit public SELECT and INSERT through its grants and row-level security policies. In Supabase, inspect existing policies first; if necessary, allow `anon` to SELECT with `true` and INSERT with a check requiring a nonblank name and message and a rating between 1 and 5. Keep RLS enabled; UPDATE and DELETE access are unnecessary.
- For automatic updates from other browsers, enable `public.feedback` in the existing `supabase_realtime` publication using Supabase's replication settings. See https://supabase.com/docs/guides/realtime/postgres-changes. Own submissions appear immediately even without Realtime enabled.

UUID and timestamp values are supplied during insertion, so existing database defaults are optional. Cards show newest entries first and merge by UUID to avoid duplicate cards when an insert also arrives through Realtime.

## Verify with the existing project

1. Open the page and check that existing feedback appears below the form.
2. Submit a name, message, and rating. Confirm one card appears with its timestamp and the form resets only on success.
3. Refresh and confirm the entry persists.
4. Open a second browser tab and submit there; with replication enabled, the first tab should update automatically.
5. Check the form and cards at a narrow mobile width. A failed request should show an error and preserve the form contents.

No live database verification was possible in this checkout without the project's environment values.
