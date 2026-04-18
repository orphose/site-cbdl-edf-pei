-- Row-Level Security pour les tables news et partnerships
--
-- Modèle d'accès :
--   * Lecture publique (anon + authenticated) uniquement sur les lignes
--     publiées/actives.
--   * Écriture (INSERT/UPDATE/DELETE) réservée aux utilisateurs authentifiés
--     (rôle `authenticated`). L'admin est protégé côté Next.js par Supabase
--     Auth, donc toute écriture passe par un JWT `authenticated`.
--
-- À rejouer via `supabase db push` ou dans le SQL Editor du dashboard.

-- ============================================
-- Table: news
-- ============================================
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "news_public_read_published" ON public.news;
CREATE POLICY "news_public_read_published"
  ON public.news
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "news_authenticated_read_all" ON public.news;
CREATE POLICY "news_authenticated_read_all"
  ON public.news
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "news_authenticated_insert" ON public.news;
CREATE POLICY "news_authenticated_insert"
  ON public.news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "news_authenticated_update" ON public.news;
CREATE POLICY "news_authenticated_update"
  ON public.news
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "news_authenticated_delete" ON public.news;
CREATE POLICY "news_authenticated_delete"
  ON public.news
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Table: partnerships
-- ============================================
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "partnerships_public_read_active" ON public.partnerships;
CREATE POLICY "partnerships_public_read_active"
  ON public.partnerships
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "partnerships_authenticated_read_all" ON public.partnerships;
CREATE POLICY "partnerships_authenticated_read_all"
  ON public.partnerships
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "partnerships_authenticated_insert" ON public.partnerships;
CREATE POLICY "partnerships_authenticated_insert"
  ON public.partnerships
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "partnerships_authenticated_update" ON public.partnerships;
CREATE POLICY "partnerships_authenticated_update"
  ON public.partnerships
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "partnerships_authenticated_delete" ON public.partnerships;
CREATE POLICY "partnerships_authenticated_delete"
  ON public.partnerships
  FOR DELETE
  TO authenticated
  USING (true);
