import { useCallback, useRef, useState } from 'react';

interface AudioCacheEntry {
    audio: HTMLAudioElement;
    status: 'loading' | 'ready' | 'error';
}

// Global cache - persists across component re-renders and navigation
const globalAudioCache = new Map<string, AudioCacheEntry>();

interface UseAudioCacheReturn {
    /** Preload audio for a given URL (call on hover) */
    preload: (url: string) => void;
    /** Play audio - uses cache if available */
    play: (url: string) => void;
    /** Pause currently playing audio */
    pause: () => void;
    /** Stop and reset currently playing audio */
    stop: () => void;
    /** Check if a specific URL is currently loading */
    isLoading: (url: string) => boolean;
    /** The URL currently playing (null if nothing playing) */
    currentlyPlaying: string | null;
}

/**
 * Hook for managing audio playback with caching and preloading.
 * Audio is cached globally so it persists across navigation.
 */
export function useAudioCache(): UseAudioCacheReturn {
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
    const [loadingUrls, setLoadingUrls] = useState<Set<string>>(new Set());
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    const preload = useCallback((url: string) => {
        if (!url || globalAudioCache.has(url)) return;

        // Mark as loading
        setLoadingUrls(prev => new Set(prev).add(url));

        const audio = new Audio();

        // Set up event handlers before setting src
        audio.addEventListener('canplaythrough', () => {
            globalAudioCache.set(url, { audio, status: 'ready' });
            setLoadingUrls(prev => {
                const next = new Set(prev);
                next.delete(url);
                return next;
            });
        }, { once: true });

        audio.addEventListener('error', () => {
            globalAudioCache.set(url, { audio, status: 'error' });
            setLoadingUrls(prev => {
                const next = new Set(prev);
                next.delete(url);
                return next;
            });
        }, { once: true });

        // Start loading
        audio.preload = 'auto';
        audio.src = url;

        // Store immediately with loading status
        globalAudioCache.set(url, { audio, status: 'loading' });
    }, []);

    const play = useCallback((url: string) => {
        if (!url) return;

        // Stop any currently playing audio
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }

        // If same URL is playing, toggle off
        if (currentlyPlaying === url) {
            setCurrentlyPlaying(null);
            currentAudioRef.current = null;
            return;
        }

        const cached = globalAudioCache.get(url);

        if (cached && cached.status === 'ready') {
            // Use cached audio
            cached.audio.currentTime = 0;
            cached.audio.play().catch(console.error);
            currentAudioRef.current = cached.audio;
            setCurrentlyPlaying(url);

            // Handle end of playback
            cached.audio.onended = () => {
                setCurrentlyPlaying(null);
                currentAudioRef.current = null;
            };
        } else if (cached && cached.status === 'loading') {
            // Audio is still loading - wait for it
            const checkReady = () => {
                const entry = globalAudioCache.get(url);
                if (entry?.status === 'ready') {
                    entry.audio.currentTime = 0;
                    entry.audio.play().catch(console.error);
                    currentAudioRef.current = entry.audio;
                    setCurrentlyPlaying(url);
                    entry.audio.onended = () => {
                        setCurrentlyPlaying(null);
                        currentAudioRef.current = null;
                    };
                }
            };

            cached.audio.addEventListener('canplaythrough', checkReady, { once: true });
        } else {
            // Not cached - preload and play when ready
            preload(url);
            const audio = globalAudioCache.get(url)?.audio;
            if (audio) {
                audio.addEventListener('canplaythrough', () => {
                    audio.play().catch(console.error);
                    currentAudioRef.current = audio;
                    setCurrentlyPlaying(url);
                    audio.onended = () => {
                        setCurrentlyPlaying(null);
                        currentAudioRef.current = null;
                    };
                }, { once: true });
            }
        }
    }, [currentlyPlaying, preload]);

    const pause = useCallback(() => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
        }
        setCurrentlyPlaying(null);
    }, []);

    const stop = useCallback(() => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
            currentAudioRef.current = null;
        }
        setCurrentlyPlaying(null);
    }, []);

    const isLoading = useCallback((url: string) => {
        return loadingUrls.has(url);
    }, [loadingUrls]);

    return {
        preload,
        play,
        pause,
        stop,
        isLoading,
        currentlyPlaying,
    };
}
