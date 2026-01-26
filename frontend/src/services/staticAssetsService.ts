import { supabase } from '@/lib/supabaseClient';

// User profile interface
export interface UserProfile {
    user_id: string;
    plan: 'free' | 'pro' | 'premium';
    credits: number;
}

// Theme interface matching the themes table schema
export interface Theme {
    id: string;
    key: string;
    label: string;
    bucket: string;
    path: string;
    is_active: boolean;
    sort_order: number;
    required_plan: 'free' | 'pro' | 'premium';
    publicUrl?: string; // Attached after fetch
}

// Voice interface matching the public_voices view schema
export interface Voice {
    id: string;
    key: string;
    label: string;
    description?: string;
    gender: 'male' | 'female';
    bucket: string;
    path: string;
    sort_order: number;
    required_plan: 'free' | 'pro' | 'premium';
    publicUrl?: string; // Attached after fetch
}

// Topic interface matching the topics table schema
export interface Topic {
    id: string;
    key: string;
    label: string;
    description?: string;
    sort_order: number;
    required_plan: 'free' | 'pro' | 'premium';
}

// Legacy interface for backward compatibility
export interface StaticAsset {
    id: string;
    key: string;
    label: string;
    description?: string;
    gender?: 'male' | 'female';
    bucket: string;
    path: string;
    sort_order: number;
    required_plan?: 'free' | 'pro' | 'premium';
    publicUrl?: string;
}

/**
 * Get the public URL for a file in Supabase storage
 */
export const getAssetUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

/**
 * Fetch all active themes from the themes table
 */
export const getThemes = async (): Promise<StaticAsset[]> => {
    const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching themes:', error);
        return [];
    }

    return (data || []).map((theme) => ({
        id: theme.id,
        key: theme.key,
        label: theme.label,
        bucket: theme.bucket,
        path: theme.path,
        sort_order: theme.sort_order,
        required_plan: theme.required_plan,
        publicUrl: getAssetUrl(theme.bucket, theme.path),
    }));
};

/**
 * Fetch all active voices from the public_voices view
 * Note: This queries the public_voices view, not the voices table directly
 * The view excludes sensitive provider information
 */
export const getVoices = async (): Promise<StaticAsset[]> => {
    const { data, error } = await supabase
        .from('public_voices')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching voices:', error);
        return [];
    }

    return (data || []).map((voice) => ({
        id: voice.id,
        key: voice.key,
        label: voice.label,
        description: voice.description,
        gender: voice.gender,
        bucket: voice.bucket,
        path: voice.path,
        sort_order: voice.sort_order,
        required_plan: voice.required_plan,
        publicUrl: getAssetUrl(voice.bucket, voice.path),
    }));
};

/**
 * Fetch all active topics from the topics table
 */
export const getTopics = async (): Promise<Topic[]> => {
    const { data, error } = await supabase
        .from('topics')
        .select('id, key, label, description, sort_order, required_plan')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching topics:', error);
        return [];
    }

    return data || [];
};

/**
 * Fetch the current user's profile including their plan
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('user_id, plan, credits')
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return data;
};

/**
 * Check if user's plan can access a given required plan
 */
export const canAccessPlan = (
    userPlan: 'free' | 'pro' | 'premium',
    requiredPlan: 'free' | 'pro' | 'premium'
): boolean => {
    const planLevels = { free: 0, pro: 1, premium: 2 };
    return planLevels[userPlan] >= planLevels[requiredPlan];
};
