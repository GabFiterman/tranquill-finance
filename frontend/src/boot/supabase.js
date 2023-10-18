import { createClient } from '@supabase/supabase-js';
import useAuthUser from 'src/composables/UseAuthUser';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
    const { user } = useAuthUser();

    user.value = session?.user || null;
});

const useSupabase = () => {
    try {
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Missing Supabase URL or Key');
        }
        if (supabase) {
            return { supabase };
        }
    } catch (error) {
        throw new Error(error);
    }
};

export default useSupabase;
