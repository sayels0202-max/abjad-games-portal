
-- Drop all policies that depend on has_role first
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can manage linkedin posts" ON public.linkedin_posts;
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;

-- Now drop the old function
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);

-- Create new function using auth.uid() internally
CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = _role
  );
$$;

-- Recreate all policies with new signature
CREATE POLICY "Admins can delete submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (has_role('admin'::app_role));
CREATE POLICY "Admins can update submissions" ON public.contact_submissions FOR UPDATE TO authenticated USING (has_role('admin'::app_role));
CREATE POLICY "Admins can view submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (has_role('admin'::app_role));
CREATE POLICY "Admins can manage linkedin posts" ON public.linkedin_posts FOR ALL TO authenticated USING (has_role('admin'::app_role)) WITH CHECK (has_role('admin'::app_role));
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (has_role('admin'::app_role)) WITH CHECK (has_role('admin'::app_role));
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (has_role('admin'::app_role));
CREATE POLICY "Only admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (has_role('admin'::app_role));
CREATE POLICY "Only admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (has_role('admin'::app_role));
CREATE POLICY "Only admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (has_role('admin'::app_role)) WITH CHECK (has_role('admin'::app_role));
