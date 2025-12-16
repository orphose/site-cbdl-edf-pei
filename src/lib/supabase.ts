/**
 * Client Supabase pour le site CBDL
 * Gère la connexion à la base de données et au storage
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Variables d'environnement (peuvent être undefined pendant le build)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Client Supabase singleton pour l'application
 * Créé de manière lazy pour éviter les erreurs pendant le build
 */
let _supabase: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Variables Supabase non configurées');
    return null;
  }
  if (!_supabase) {
    _supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// Export pour compatibilité (peut être null pendant le build)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * URL de base pour le storage public
 */
export const STORAGE_URL = supabaseUrl 
  ? `${supabaseUrl}/storage/v1/object/public`
  : '';

/**
 * Génère l'URL publique d'un fichier dans le bucket media
 * @param path - Chemin du fichier dans le bucket
 * @returns URL publique du fichier
 */
export function getMediaUrl(path: string): string {
  console.assert(path && path.length > 0, 'Le chemin du fichier est requis');
  
  // Fallback vers le chemin local si Supabase non configuré
  if (!STORAGE_URL) {
    return `/${path}`;
  }
  
  return `${STORAGE_URL}/media/${path}`;
}

