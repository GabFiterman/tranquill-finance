import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
console.log("supabaseUrl: ", supabaseUrl);
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.info("Connecting to Supabase...");

const useSupabase = () => {
  try {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase URL or Key");
    }
    if(supabase) {
      console.info("... connected to Supabase!");
      return { supabase };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default useSupabase;
