import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://rhbwvbwoxymzgvlvqbou.supabase.co";

// Configuração do cliente Supabase com persistência explícita usando AsyncStorage
export const supabase = createClient(supabaseUrl, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
