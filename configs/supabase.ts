import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "@env";

const supabaseUrl = "https://rhbwvbwoxymzgvlvqbou.supabase.co";
export const supabase = createClient(supabaseUrl, SUPABASE_KEY);
