import { useState, useEffect, useCallback } from 'react';
import { fetchUserCredits } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';

interface UseUserCreditsReturn {
    credits: number | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch user credits and sync with the global store
 * Handles loading state, error state, and provides refetch capability
 */
export function useUserCredits(userId: string | undefined): UseUserCreditsReturn {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const credits = useUserStore((state) => state.credits);
    const setCredits = useUserStore((state) => state.setCredits);

    const loadCredits = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userCredits = await fetchUserCredits(userId);
            if (userCredits !== null) {
                setCredits(userCredits);
            }
        } catch (err) {
            console.error('Error fetching credits:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch credits'));
        } finally {
            setIsLoading(false);
        }
    }, [userId, setCredits]);

    useEffect(() => {
        loadCredits();
    }, [loadCredits]);

    return {
        credits,
        isLoading,
        error,
        refetch: loadCredits,
    };
}
