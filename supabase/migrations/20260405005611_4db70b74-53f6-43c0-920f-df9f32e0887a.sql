
ALTER TABLE public.linkedin_posts
ADD COLUMN text TEXT,
ADD COLUMN image_url TEXT,
ADD COLUMN author_name TEXT DEFAULT 'Abjad Games',
ADD COLUMN likes_count INTEGER DEFAULT 0;
