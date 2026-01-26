# Supabase Database Setup

Run these SQL files in order on your Supabase Dashboard → SQL Editor.

## 1. Schema (Tables)
- `schema/profiles.sql` - User profiles table
- `schema/themes.sql` - Visual themes/styles for video generation
- `schema/voices.sql` - Voice/narrator options with public view for frontend

## 2. Functions & Triggers
- `db-functions/handle_new_user.sql` - Auto-create profile on signup

## 3. Storage Bucket Setup
Create a public bucket named `static-assets` in your Supabase Storage:
1. Go to Storage in Supabase Dashboard
2. Create a new bucket named `static-assets`
3. Set it to **Public**
4. Upload theme preview images to `themes/` folder (e.g., `themes/anime.webp`)
5. Upload voice preview audio to `voice-preview/` folder (e.g., `voice-preview/adam.mp3`)

## Notes
- The `voices` table has Row Level Security enabled and is backend-only
- Frontend should query the `public_voices` view, which excludes sensitive provider information
- Both tables include sample data that will be inserted automatically
