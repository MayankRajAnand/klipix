import { useState, useCallback } from 'react';
import type { YouTubeMetadata } from '@/types/youtube';
import { fetchYouTubeMetadata } from '@/services/youtubeService';

export function useYouTubeMetadata() {
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<YouTubeMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = useCallback(async (url: string): Promise<YouTubeMetadata | null> => {
    if (!url.trim()) {
      setMetadata(null);
      setError(null);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchYouTubeMetadata(url);
      setMetadata(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video info';
      setError(errorMessage);
      setMetadata(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMetadata(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { isLoading, metadata, error, fetchMetadata, reset };
}
