import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface YouTubeMetadata {
  title: string;
  thumbnailUrl: string;
  authorName: string;
  videoId: string;
}

// Extract video ID from various YouTube URL formats
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ error: 'YouTube URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing YouTube URL:', url);

    const videoId = extractVideoId(url);
    if (!videoId) {
      console.error('Invalid YouTube URL format:', url);
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extracted video ID:', videoId);

    // Use YouTube oEmbed API (no API key required)
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    console.log('Fetching oEmbed data from:', oembedUrl);
    
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      console.error('oEmbed request failed:', response.status);
      return new Response(
        JSON.stringify({ error: 'Video not found or unavailable' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const oembedData = await response.json();
    console.log('oEmbed data received:', oembedData.title);

    // Get high quality thumbnail
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    // Check if maxres thumbnail exists, fallback to hqdefault
    const thumbCheck = await fetch(thumbnailUrl, { method: 'HEAD' });
    const finalThumbnail = thumbCheck.ok 
      ? thumbnailUrl 
      : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const metadata: YouTubeMetadata = {
      title: oembedData.title,
      thumbnailUrl: finalThumbnail,
      authorName: oembedData.author_name,
      videoId,
    };

    console.log('Returning metadata for:', metadata.title);

    return new Response(
      JSON.stringify(metadata),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch video metadata' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
