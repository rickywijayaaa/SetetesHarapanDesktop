"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Supabase URL and Key must be defined in environment variables."
  );
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getDb = (): SupabaseClient => supabase;
