import { supabase } from '@/integrations/supabase/client';
import type { YouTubeMetadata } from '@/types/youtube';

/**
 * Fetch YouTube video metadata (title, thumbnail) from a URL
 */
export async function fetchYouTubeMetadata(url: string): Promise<YouTubeMetadata> {
  const { data, error } = await supabase.functions.invoke('youtube-metadata', {
    body: { url },
  });

  if (error) {
    throw new Error(error.message || 'Failed to fetch video metadata');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as YouTubeMetadata;
}
