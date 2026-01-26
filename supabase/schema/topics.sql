-- =====================================================
-- TOPICS TABLE
-- Stores content categories / story ideas for generation
-- =====================================================

CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Stable internal identifier (code-facing)
  key text NOT NULL UNIQUE,

  -- User-facing display name
  label text NOT NULL,

  -- Optional description (for future UI/tooltips)
  description text,

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
CREATE INDEX idx_topics_key ON topics(key);

-- UI listing: active topics ordered by priority
CREATE INDEX idx_topics_active_sort ON topics(is_active, sort_order);

-- Plan-based filtering
CREATE INDEX idx_topics_plan ON topics(required_plan);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view active topics
CREATE POLICY "Authenticated users can view active topics"
ON topics
FOR SELECT
TO authenticated
USING (is_active = true);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

INSERT INTO topics (key, label, sort_order, required_plan)
VALUES
  ('motivational-story', 'Motivational Story', 1, 'free'),
  ('scary-story', 'Scary Story', 2, 'free'),
  ('what-if', 'What If?', 3, 'free'),
  ('interesting-facts', 'Interesting Facts', 4, 'free'),
  ('technology-trends', 'Technology Trends', 5, 'free'),
  ('historical-events', 'Historical Events', 6, 'free'),
  ('travel-destination', 'Travel Destination', 7, 'free'),
  ('fun-facts', 'Fun Facts', 8, 'free'),
  ('philosophy', 'Philosophy', 9, 'free'),
  ('bedtime-stories', 'Bed Time Stories', 10, 'free'),
  ('crime-story', 'Crime Story', 11, 'free'),
  ('financial-advice', 'Financial Advice', 12, 'free'),
  ('relationship-advice', 'Relationship Advice', 13, 'free');

-- =====================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =====================================================

CREATE OR REPLACE FUNCTION update_topics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER topics_updated_at_trigger
BEFORE UPDATE ON topics
FOR EACH ROW
EXECUTE FUNCTION update_topics_updated_at();
