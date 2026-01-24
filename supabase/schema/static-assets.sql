create table static_assets (

  -- Primary key
  id uuid primary key default gen_random_uuid(),

  -- Asset type: 'theme' | 'voice'
  type text not null,

  -- Stable internal identifier (not shown in UI)
  key text not null,

  -- Display name shown in UI
  label text not null,

  -- Optional description (mainly for voices, For eg:- Dominant, Firm)
  description text,

  -- ElevenLabs voice_id (NULL for non-voice assets)
  voice_id text,

  -- Storage bucket name
  bucket text not null,

  -- File path inside the bucket
  /* Examples: * - 'themes/anime.webp' * - 'voices/adam.webp' */
  path text not null,

  -- Controls whether asset is visible in UI
  is_active boolean not null default true,

  -- Ordering for UI display
  sort_order integer not null,

  -- Row creation timestamp
  created_at timestamp not null default now()
);

-- Insert themes
insert into static_assets
(type, key, label, bucket, path, sort_order)
values
('theme', 'anime', 'Anime', 'static-assets', 'themes/anime.webp', 1),
('theme', 'cinematic', 'Cinematic', 'static-assets', 'themes/cinematic.webp', 2),
('theme', 'comic', 'Comic Art', 'static-assets', 'themes/comic.webp', 3),
('theme', 'cyberpunk', 'Cyberpunk', 'static-assets', 'themes/cyberpunk.webp', 4),
('theme', 'dark-fantasy', 'Dark Fantasy', 'static-assets', 'themes/dark-fantasy.webp', 5),
('theme', 'fantasy', 'Fantasy', 'static-assets', 'themes/fantasy.webp', 6),
('theme', 'ghibli', 'Ghibli Style', 'static-assets', 'themes/ghibli.webp', 7),
('theme', 'minecraft', 'Minecraft Style', 'static-assets', 'themes/minecraft.webp', 8),
('theme', 'natural', 'Natural', 'static-assets', 'themes/natural.webp', 9),
('theme', 'painting', 'Painting', 'static-assets', 'themes/painting.webp', 10),
('theme', 'pixar', 'Pixar Style', 'static-assets', 'themes/pixar.webp', 11),
('theme', 'realism', 'Realism', 'static-assets', 'themes/realism.webp', 12);

-- Insert voices
insert into static_assets
(type, key, label, description, voice_id, bucket, path, sort_order)
values
('voice', 'victor', 'Victor', 'Dominant, Firm', 'pNInz6obpgDQGcFmaJgB', 'static-assets', 'elevenAI-voice-preview/adam.mp3', 1),
('voice', 'clara', 'Clara', 'Clear, Engaging Educator', 'Xb7hH8MSUJpSbSDYk0k2', 'static-assets', 'elevenAI-voice-preview/alice.mp3', 2),
('voice', 'amelia', 'Amelia', 'Professional, Bright, Warm', 'hpp4J3VqNfWAUOO0d1Us', 'static-assets', 'elevenAI-voice-preview/bella.mp3', 3),
('voice', 'arthur', 'Arthur', 'Wise, Mature, Balanced', 'pqHfZKP75CvOlQylNhV4', 'static-assets', 'elevenAI-voice-preview/bill.mp3', 4),
('voice', 'orion', 'Orion', 'Deep, Resonant and Comforting', 'nPczCjzI2devNBz1zQrb', 'static-assets', 'elevenAI-voice-preview/brain.mp3', 5),
('voice', 'jax', 'Jax', 'Husky Trickster', 'N2lVS1w4EtoT3dr4eOWO', 'static-assets', 'elevenAI-voice-preview/callum.mp3', 6),
('voice', 'marcus', 'Marcus', 'Deep, Confident, Energetic', 'IKne3meq5aSn9XLyUdCD', 'static-assets', 'elevenAI-voice-preview/charlie.mp3', 7),
('voice', 'theo', 'Theo', 'Charming, Down-to-Earth', 'iP95p4xoKVk53GoZ742B', 'static-assets', 'elevenAI-voice-preview/chris.mp3', 8),
('voice', 'elliot', 'Elliot', 'Steady Broadcaster', 'onwK4e9ZLuTAKqWW03F9', 'static-assets', 'elevenAI-voice-preview/daniel.mp3', 9),
('voice', 'caleb', 'Caleb', 'Smooth, Trustworthy', 'cjVigY5qzO86Huf0OWal', 'static-assets', 'elevenAI-voice-preview/eric.mp3', 10),
('voice', 'miles', 'Miles', 'Warm, Captivating Storyteller', 'JBFqnCBsd6RMkjVDRZzb', 'static-assets', 'elevenAI-voice-preview/george.mp3', 11),
('voice', 'rex', 'Rex', 'Fierce Warrior', 'SOYHLrjzK2X1ezoPC6cr', 'static-assets', 'elevenAI-voice-preview/harry.mp3', 12),
('voice', 'luna', 'Luna', 'Playful, Bright, Warm', 'cgSgspJ2msm6clMCkdW9', 'static-assets', 'elevenAI-voice-preview/jessica.mp3', 13),
('voice', 'piper', 'Piper', 'Enthusiast, Quirky Attitude', 'FGY2WhTYpPnrIDTdsKH5', 'static-assets', 'elevenAI-voice-preview/laura.mp3', 14),
('voice', 'kai', 'Kai', 'Energetic, Social Media Creator', 'TX3LPaxmHKxFdv7VOQHJ', 'static-assets', 'elevenAI-voice-preview/liam.mp3', 15),
('voice', 'aria', 'Aria', 'Velvety Actress', 'pFZP5JQG7iQjIQuC4Bku', 'static-assets', 'elevenAI-voice-preview/lily.mp3', 16),
('voice', 'nora', 'Nora', 'Knowledgable, Professional', 'XrExE9yKIg1WjnnlVkGX', 'static-assets', 'elevenAI-voice-preview/matilda.mp3', 17),
('voice', 'rowan', 'Rowan', 'Relaxed, Neutral, Informative', 'SAz9YHcvj6GT2YYXdXww', 'static-assets', 'elevenAI-voice-preview/river.mp3', 18),
('voice', 'beau', 'Beau', 'Laid-Back, Casual, Resonant', 'CwhRBWXzGAHq8TQ4Fs17', 'static-assets', 'elevenAI-voice-preview/roger.mp3', 19),
('voice', 'helena', 'Helena', 'Mature, Reassuring, Confident', 'EXAVITQu4vr4xnSDxMaL', 'static-assets', 'elevenAI-voice-preview/sarah.mp3', 20),
('voice', 'sunny', 'Sunny', 'Relaxed Optimist', 'bIHbv24MWmeRgasZH58o', 'static-assets', 'elevenAI-voice-preview/will.mp3', 21);
