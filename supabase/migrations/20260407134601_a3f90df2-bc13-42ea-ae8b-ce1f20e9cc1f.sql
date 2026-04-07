
CREATE TABLE public.playtest_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  twitter_handle TEXT,
  discord_handle TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.playtest_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a playtest request
CREATE POLICY "Anyone can submit playtest request"
ON public.playtest_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) > 0
  AND char_length(name) <= 100
  AND char_length(trim(email)) > 0
  AND char_length(email) <= 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (twitter_handle IS NULL OR char_length(twitter_handle) <= 100)
  AND (discord_handle IS NULL OR char_length(discord_handle) <= 100)
);

-- Admins can view and manage requests
CREATE POLICY "Admins can manage playtest requests"
ON public.playtest_requests
FOR ALL
TO authenticated
USING (public.has_role('admin'::app_role))
WITH CHECK (public.has_role('admin'::app_role));
