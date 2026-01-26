-- =====================================================
-- VOICES TABLE
-- Internal source of truth for voice/narrator assets
-- Contains provider mappings (BACKEND ONLY)
-- =====================================================

CREATE TABLE voices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Internal identifier (stable, code-facing, unique across app)
  key text NOT NULL UNIQUE,

  -- User-facing metadata
  label text NOT NULL,
  description text,

  -- Voice characteristics
  gender text NOT NULL
    CHECK (gender IN ('male', 'female')),

  -- Voice provider mapping (MUST NOT be exposed to frontend)
  provider text NOT NULL,
  provider_voice_key text NOT NULL,
  voice_id text NOT NULL,

  -- Storage location (preview audio files only)
  bucket text NOT NULL DEFAULT 'static-assets',
  path text NOT NULL,

  -- UI / Product controls
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL,
  required_plan text NOT NULL DEFAULT 'free'
    CHECK (required_plan IN ('free', 'pro', 'premium')),

  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- =====================================================
-- SECURITY BASELINE
-- This table is BACKEND-ONLY and must never be queried by frontend
-- =====================================================

-- Enable RLS (deny-by-default for anon/authenticated users)
ALTER TABLE voices ENABLE ROW LEVEL SECURITY;

-- Extra defense-in-depth:
-- Prevent frontend roles from querying the base table even if RLS is misconfigured
REVOKE ALL ON voices FROM anon, authenticated;

-- NOTE:
-- Inserts/updates still work because migrations and backend
-- run using the table owner / service_role, which bypasses RLS.



-- =====================================================
-- CONSTRAINTS
-- =====================================================

-- Restrict provider values to known providers
-- (Extend this list when adding more TTS vendors)
ALTER TABLE voices
ADD CONSTRAINT valid_provider
CHECK (provider IN ('elevenAI'));


-- =====================================================
-- INDEXES
-- =====================================================

-- Fast lookup by key
CREATE INDEX idx_voices_key ON voices(key);

-- Fast lookup by voice_id (for backend provider calls)
CREATE INDEX idx_voices_voice_id ON voices(voice_id);

-- Fast filtering for active voices ordered by sort
CREATE INDEX idx_voices_active_sort ON voices(is_active, sort_order);

-- Fast filtering by plan
CREATE INDEX idx_voices_plan ON voices(required_plan);


-- =====================================================
-- PUBLIC VIEW (UI-SAFE CONTRACT)
-- Frontend MUST query this view, never the base table
-- Provider fields are intentionally excluded
-- =====================================================

CREATE VIEW public_voices AS
SELECT
  id,
  key,
  label,
  description,
  gender,
  bucket,
  path,
  sort_order,
  required_plan
FROM voices
WHERE is_active = true;

-- Allow frontend access ONLY to the safe view
GRANT SELECT ON public_voices TO authenticated;



-- =====================================================
-- SAMPLE DATA - Insert default voices with ElevenAI mapping
-- =====================================================

INSERT INTO voices (
  key,
  label,
  description,
  gender,
  provider,
  provider_voice_key,
  voice_id,
  bucket,
  path,
  sort_order,
  required_plan
)
VALUES
  ('victor', 'Victor', 'Dominant, Firm', 'male', 'elevenAI', 'adam', 'pNInz6obpgDQGcFmaJgB', 'static-assets', 'voice-preview/victor.mp3', 1, 'free'),
  ('clara', 'Clara', 'Clear, Engaging Educator', 'female', 'elevenAI', 'alice', 'Xb7hH8MSUJpSbSDYk0k2', 'static-assets', 'voice-preview/clara.mp3', 2, 'free'),
  ('amelia', 'Amelia', 'Professional, Bright, Warm', 'female', 'elevenAI', 'bella', 'hpp4J3VqNfWAUOO0d1Us', 'static-assets', 'voice-preview/amelia.mp3', 3, 'free'),
  ('arthur', 'Arthur', 'Wise, Mature, Balanced', 'male', 'elevenAI', 'bill', 'pqHfZKP75CvOlQylNhV4', 'static-assets', 'voice-preview/arthur.mp3', 4, 'free'),
  ('orion', 'Orion', 'Deep, Resonant and Comforting', 'male', 'elevenAI', 'brian', 'nPczCjzI2devNBz1zQrb', 'static-assets', 'voice-preview/orion.mp3', 5, 'free'),
  ('jax', 'Jax', 'Husky Trickster', 'male', 'elevenAI', 'callum', 'N2lVS1w4EtoT3dr4eOWO', 'static-assets', 'voice-preview/jax.mp3', 6, 'free'),
  ('marcus', 'Marcus', 'Deep, Confident, Energetic', 'male', 'elevenAI', 'charlie', 'IKne3meq5aSn9XLyUdCD', 'static-assets', 'voice-preview/marcus.mp3', 7, 'free'),
  ('theo', 'Theo', 'Charming, Down-to-Earth', 'male', 'elevenAI', 'chris', 'iP95p4xoKVk53GoZ742B', 'static-assets', 'voice-preview/theo.mp3', 8, 'pro'),
  ('elliot', 'Elliot', 'Steady Broadcaster', 'male', 'elevenAI', 'daniel', 'onwK4e9ZLuTAKqWW03F9', 'static-assets', 'voice-preview/elliot.mp3', 9, 'free'),
  ('caleb', 'Caleb', 'Smooth, Trustworthy', 'male', 'elevenAI', 'eric', 'cjVigY5qzO86Huf0OWal', 'static-assets', 'voice-preview/caleb.mp3', 10, 'free'),
  ('miles', 'Miles', 'Warm, Captivating Storyteller', 'male', 'elevenAI', 'george', 'JBFqnCBsd6RMkjVDRZzb', 'static-assets', 'voice-preview/miles.mp3', 11, 'free'),
  ('rex', 'Rex', 'Fierce Warrior', 'male', 'elevenAI', 'harry', 'SOYHLrjzK2X1ezoPC6cr', 'static-assets', 'voice-preview/rex.mp3', 12, 'pro'),
  ('luna', 'Luna', 'Playful, Bright, Warm', 'female', 'elevenAI', 'jessica', 'cgSgspJ2msm6clMCkdW9', 'static-assets', 'voice-preview/luna.mp3', 13, 'free'),
  ('piper', 'Piper', 'Enthusiast, Quirky Attitude', 'female', 'elevenAI', 'laura', 'FGY2WhTYpPnrIDTdsKH5', 'static-assets', 'voice-preview/piper.mp3', 14, 'free'),
  ('kai', 'Kai', 'Energetic, Social Media Creator', 'male', 'elevenAI', 'liam', 'TX3LPaxmHKxFdv7VOQHJ', 'static-assets', 'voice-preview/kai.mp3', 15, 'pro'),
  ('aria', 'Aria', 'Velvety Actress', 'female', 'elevenAI', 'lily', 'pFZP5JQG7iQjIQuC4Bku', 'static-assets', 'voice-preview/aria.mp3', 16, 'free'),
  ('nora', 'Nora', 'Knowledgable, Professional', 'female', 'elevenAI', 'matilda', 'XrExE9yKIg1WjnnlVkGX', 'static-assets', 'voice-preview/nora.mp3', 17, 'free'),
  ('rowan', 'Rowan', 'Relaxed, Neutral, Informative', 'male', 'elevenAI', 'river', 'SAz9YHcvj6GT2YYXdXww', 'static-assets', 'voice-preview/rowan.mp3', 18, 'free'),
  ('beau', 'Beau', 'Laid-Back, Casual, Resonant', 'male', 'elevenAI', 'roger', 'CwhRBWXzGAHq8TQ4Fs17', 'static-assets', 'voice-preview/beau.mp3', 19, 'premium'),
  ('helena', 'Helena', 'Mature, Reassuring, Confident', 'female', 'elevenAI', 'sarah', 'EXAVITQu4vr4xnSDxMaL', 'static-assets', 'voice-preview/helena.mp3', 20, 'free'),
  ('sunny', 'Sunny', 'Relaxed Optimist', 'male', 'elevenAI', 'will', 'bIHbv24MWmeRgasZH58o', 'static-assets', 'voice-preview/sunny.mp3', 21, 'free');

-- =====================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =====================================================

CREATE OR REPLACE FUNCTION update_voices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER voices_updated_at_trigger
BEFORE UPDATE ON voices
FOR EACH ROW
EXECUTE FUNCTION update_voices_updated_at();
