import { useState, useEffect, useCallback } from 'react';
import {
    getThemes,
    getVoices,
    getTopics,
    getUserProfile,
    type StaticAsset,
    type Topic,
    type UserProfile,
} from '@/services/staticAssetsService';

interface UseStaticAssetsReturn {
    themes: StaticAsset[];
    voices: StaticAsset[];
    topics: Topic[];
    userProfile: UserProfile | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch all static assets (themes, voices, topics) and user profile
 * Handles loading state, error state, and provides refetch capability
 */
export function useStaticAssets(): UseStaticAssetsReturn {
    const [themes, setThemes] = useState<StaticAsset[]>([]);
    const [voices, setVoices] = useState<StaticAsset[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [themesData, voicesData, topicsData, profile] = await Promise.all([
                getThemes(),
                getVoices(),
                getTopics(),
                getUserProfile(),
            ]);

            setThemes(themesData);
            setVoices(voicesData);
            setTopics(topicsData);
            setUserProfile(profile);
        } catch (err) {
            console.error('Error fetching static assets:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        themes,
        voices,
        topics,
        userProfile,
        isLoading,
        error,
        refetch: fetchData,
    };
}
