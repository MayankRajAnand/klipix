
-- Create profiles table
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;


-- SELECT: Logged-in users can read ONLY their own row
CREATE POLICY "Users can read own profile only"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);