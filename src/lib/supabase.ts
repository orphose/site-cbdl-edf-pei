/**
 * Client Supabase pour le site CBDL
 * Gère la connexion à la base de données et au storage
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Vérification des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

assert(supabaseUrl, 'NEXT_PUBLIC_SUPABASE_URL est requis');
assert(supabaseAnonKey, 'NEXT_PUBLIC_SUPABASE_ANON_KEY est requis');

/**
 * Assertion simple pour vérifier les conditions
 */
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Client Supabase singleton pour l'application
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * URL de base pour le storage public
 */
export const STORAGE_URL = `${supabaseUrl}/storage/v1/object/public`;

/**
 * Génère l'URL publique d'un fichier dans le bucket media
 * @param path - Chemin du fichier dans le bucket
 * @returns URL publique du fichier
 */
export function getMediaUrl(path: string): string {
  assert(path, 'Le chemin du fichier est requis');
  assert(path.length > 0, 'Le chemin ne peut pas être vide');
  
  return `${STORAGE_URL}/media/${path}`;
}

