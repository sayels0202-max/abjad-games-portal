
CREATE TABLE public.linkedin_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_url TEXT NOT NULL,
  caption TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.linkedin_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published linkedin posts"
ON public.linkedin_posts
FOR SELECT
USING (published = true);

CREATE POLICY "Admins can manage linkedin posts"
ON public.linkedin_posts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_linkedin_posts_updated_at
BEFORE UPDATE ON public.linkedin_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
