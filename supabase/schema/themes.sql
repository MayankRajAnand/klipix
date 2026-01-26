-- =====================================================
-- THEMES TABLE
-- Stores visual style/theme assets for video generation
-- =====================================================

CREATE TABLE themes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Internal identifier (stable, code-facing, unique across app)
  key text NOT NULL UNIQUE,

  -- User-facing name
  label text NOT NULL,

  -- Storage location
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
-- INDEXES
-- =====================================================

-- Fast lookup by key
CREATE INDEX idx_themes_key ON themes(key);

-- Fast filtering for active themes ordered by sort
CREATE INDEX idx_themes_active_sort ON themes(is_active, sort_order);

-- Fast filtering by plan
CREATE INDEX idx_themes_plan ON themes(required_plan);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE themes ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view active themes
CREATE POLICY "Authenticated users can view active themes"
ON themes
FOR SELECT
TO authenticated
USING (is_active = true);


-- =====================================================
-- SAMPLE DATA - Insert default themes
-- =====================================================

INSERT INTO themes (key, label, bucket, path, sort_order, required_plan)
VALUES
  ('anime', 'Anime', 'static-assets', 'themes/anime.webp', 1, 'free'),
  ('cinematic', 'Cinematic', 'static-assets', 'themes/cinematic.webp', 2, 'free'),
  ('comic', 'Comic Art', 'static-assets', 'themes/comic.webp', 3, 'free'),
  ('cyberpunk', 'Cyberpunk', 'static-assets', 'themes/cyberpunk.webp', 4, 'pro'),
  ('dark-fantasy', 'Dark Fantasy', 'static-assets', 'themes/dark-fantasy.webp', 5, 'free'),
  ('fantasy', 'Fantasy', 'static-assets', 'themes/fantasy.webp', 6, 'free'),
  ('ghibli', 'Ghibli Style', 'static-assets', 'themes/ghibli.webp', 7, 'pro'),
  ('minecraft', 'Minecraft Style', 'static-assets', 'themes/minecraft.webp', 8, 'free'),
  ('natural', 'Natural', 'static-assets', 'themes/natural.webp', 9, 'free'),
  ('painting', 'Painting', 'static-assets', 'themes/painting.webp', 10, 'free'),
  ('pixar', 'Pixar Style', 'static-assets', 'themes/pixar.webp', 11, 'premium'),
  ('realism', 'Realism', 'static-assets', 'themes/realism.webp', 12, 'free');

-- =====================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =====================================================

CREATE OR REPLACE FUNCTION update_themes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER themes_updated_at_trigger
BEFORE UPDATE ON themes
FOR EACH ROW
EXECUTE FUNCTION update_themes_updated_at();
