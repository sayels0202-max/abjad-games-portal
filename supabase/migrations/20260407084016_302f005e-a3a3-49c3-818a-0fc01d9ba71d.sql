
-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Create a rate-limiting helper function (max 3 submissions per email per hour)
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (
    SELECT count(*)
    FROM public.contact_submissions
    WHERE email = _email
      AND created_at > now() - interval '1 hour'
  ) < 3;
$$;

-- Recreate INSERT policy with validation and rate limiting
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) > 0
  AND char_length(name) <= 100
  AND char_length(trim(email)) > 0
  AND char_length(email) <= 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(trim(message)) > 0
  AND char_length(message) <= 5000
  AND public.check_contact_rate_limit(email)
);
