
ALTER TABLE public.playtest_requests
  ADD COLUMN age INTEGER,
  ADD COLUMN weekly_hours INTEGER,
  ADD COLUMN favorite_games TEXT,
  ADD COLUMN previous_playtest BOOLEAN NOT NULL DEFAULT false;

-- Drop and recreate insert policy with new validations
DROP POLICY "Anyone can submit playtest request" ON public.playtest_requests;

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
  AND age IS NOT NULL AND age >= 10 AND age <= 100
  AND weekly_hours IS NOT NULL AND weekly_hours >= 0 AND weekly_hours <= 168
  AND favorite_games IS NOT NULL AND char_length(trim(favorite_games)) > 0 AND char_length(favorite_games) <= 500
);
