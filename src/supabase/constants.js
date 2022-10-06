if (!process.env.SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL env variable");
}

export const SUPABASE_URL = process.env.REACT_NATIVE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY =
  process.env.REACT_NATIVE_SUPABASE_ANON_KEY || "";
