import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client
 *
 * Configured with two public values from Vite env variables:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_ANON_KEY
 *
 * The anon key is safe to ship to the browser: write access is enforced by
 * the Row Level Security policies in supabase/schema.sql (only the admin
 * email can save). If the variables are missing or invalid, `supabase` is
 * null and the site falls back to the default resume instead of crashing.
 */

/** Removes spaces, quotes and a trailing slash people often paste by accident. */
function clean(value: string | undefined): string {
  return (value ?? "").trim().replace(/^["']|["']$/g, "").trim();
}

let url = clean(import.meta.env.VITE_SUPABASE_URL as string | undefined).replace(/\/+$/, "");
const anonKey = clean(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

// Accept "xyz.supabase.co" without https://
if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;

/** Plain-language reason Supabase isn't connected, shown on /admin. Empty when fine. */
export let configProblem = "";

function makeClient(): SupabaseClient | null {
  if (!url && !anonKey) {
    configProblem =
      "Neither VITE_SUPABASE_URL nor VITE_SUPABASE_ANON_KEY was found. Check that .env.local is in the main project folder (next to package.json) and restart npm run dev.";
    return null;
  }
  if (!url) {
    configProblem = "VITE_SUPABASE_URL is missing or empty in .env.local.";
    return null;
  }
  if (!anonKey) {
    configProblem = "VITE_SUPABASE_ANON_KEY is missing or empty in .env.local.";
    return null;
  }
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) {
    console.warn(`VITE_SUPABASE_URL looks unusual: ${url}`);
  }
  try {
    return createClient(url, anonKey);
  } catch (err) {
    configProblem = `The Supabase URL couldn't be used (${url}). It should look like https://your-project.supabase.co`;
    console.error(
      "Supabase settings look wrong; check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.",
      err
    );
    return null;
  }
}

export const supabase: SupabaseClient | null = makeClient();

export const isSupabaseConfigured = supabase !== null;
