/**
 * Fonctions API pour récupérer les données du CMS
 * Actualités et Partenariats depuis Supabase
 */
import { getSupabase } from './supabase';
import type { News, Partnership } from './database.types';

// ============================================
// ACTUALITÉS
// ============================================

/**
 * Récupère toutes les actualités publiées
 * Triées par date de publication décroissante
 * @param limit - Nombre maximum d'actualités (défaut: 10)
 */
export async function getPublishedNews(limit = 10): Promise<News[]> {
  // Assertions de validation
  console.assert(limit >= 1 && limit <= 100, 'Limit doit être entre 1 et 100');

  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase non configuré, retour liste vide');
    return [];
  }

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  // Vérification du retour
  if (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    throw error;
  }

  return data ?? [];
}

/**
 * Récupère une actualité par son slug
 * @param slug - Identifiant URL de l'actualité
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  // Assertions de validation
  console.assert(slug && slug.trim().length > 0, 'Le slug est requis');

  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase non configuré');
    return null;
  }

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  // Vérification du retour
  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Non trouvé
    }
    console.error('Erreur lors de la récupération de l\'actualité:', error);
    throw error;
  }

  return data;
}

// ============================================
// PARTENARIATS
// ============================================

/**
 * Récupère tous les partenaires actifs
 * Triés par ordre d'affichage
 * @param category - Catégorie optionnelle pour filtrer
 */
export async function getActivePartnerships(category?: string): Promise<Partnership[]> {
  // Assertions de validation (category peut être undefined)
  console.assert(
    category === undefined || category.trim().length > 0,
    'La catégorie ne peut pas être vide si fournie'
  );

  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase non configuré, retour liste vide');
    return [];
  }

  let query = supabase
    .from('partnerships')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  // Vérification du retour
  if (error) {
    console.error('Erreur lors de la récupération des partenaires:', error);
    throw error;
  }

  return data ?? [];
}

/**
 * Récupère un partenaire par son slug
 * @param slug - Identifiant URL du partenaire
 */
export async function getPartnershipBySlug(slug: string): Promise<Partnership | null> {
  // Assertions de validation
  console.assert(slug && slug.trim().length > 0, 'Le slug est requis');

  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase non configuré');
    return null;
  }

  const { data, error } = await supabase
    .from('partnerships')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  // Vérification du retour
  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Non trouvé
    }
    console.error('Erreur lors de la récupération du partenaire:', error);
    throw error;
  }

  return data;
}

/**
 * Récupère les catégories de partenaires disponibles
 */
export async function getPartnershipCategories(): Promise<string[]> {
  // Assertions de validation
  const partnerships = await getActivePartnerships();
  
  if (partnerships.length === 0) {
    return [];
  }

  // Extraire les catégories uniques non nulles
  const categories = [...new Set(
    partnerships
      .map(p => p.category)
      .filter((cat): cat is string => cat !== null && cat !== undefined)
  )];
  
  return categories;
}

