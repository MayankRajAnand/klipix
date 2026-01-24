import { supabase } from '@/lib/supabaseClient';

export interface StaticAsset {
    id: string;
    type: 'theme' | 'voice';
    key: string;
    label: string;
    description?: string;
    voice_id?: string;
    bucket: string;
    path: string;
    is_active: boolean;
    sort_order: number;
    publicUrl?: string; // We will attach this
}

/**
 * Get the public URL for a file in Supabase storage
 */
export const getAssetUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

/**
 * Fetch all active themes
 */
export const getThemes = async (): Promise<StaticAsset[]> => {
    const { data, error } = await supabase
        .from('static_assets')
        .select('*')
        .eq('type', 'theme')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching themes:', error);
        return [];
    }

    return (data || []).map((asset) => ({
        ...asset,
        publicUrl: getAssetUrl(asset.bucket, asset.path),
    }));
};

/**
 * Fetch all active voices
 */
export const getVoices = async (): Promise<StaticAsset[]> => {
    const { data, error } = await supabase
        .from('static_assets')
        .select('*')
        .eq('type', 'voice')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching voices:', error);
        return [];
    }

    return (data || []).map((asset) => ({
        ...asset,
        publicUrl: getAssetUrl(asset.bucket, asset.path),
    }));
};
