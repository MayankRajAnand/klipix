import { supabase } from '@/lib/supabaseClient';

/**
 * Fetch user credits from profiles table
 */
export const fetchUserCredits = async (userId: string): Promise<number | null> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('credits')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error fetching credits:', error);
            return null;
        }

        return data?.credits ?? null;
    } catch (err) {
        console.error('Error fetching credits:', err);
        return null;
    }
};
