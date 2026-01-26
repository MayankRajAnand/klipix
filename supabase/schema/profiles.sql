
-- Create profiles table
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Subscription plan
  plan text NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'pro', 'premium')),

  -- Credits system
  credits INT NOT NULL DEFAULT 50,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: Logged-in users can read ONLY their own row
CREATE POLICY "Users can read own profile only"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- UPDATE/INSERT/DELETE: Only service role can modify profiles
-- (Backend will handle credit deductions and plan upgrades)
-- This policy is not needed as this is the default behavior of the service role, its just to document the intent. 
CREATE POLICY "Only service role can modify profiles"
ON profiles
FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_profiles_plan ON profiles(plan);

-- =====================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =====================================================

CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_profiles_updated_at();