/**
 * Médias du site.
 *
 * RÈGLE DE PARTAGE :
 * — Contenus STATIQUES (images des sections, posters) : servis localement
 *   depuis /public/images/site, optimisés (WebP ≤ 1920px). Les originaux
 *   pesaient 327 Mo au total ; les versions servies pèsent ~4 Mo.
 * — Contenus DYNAMIQUES (covers d'actualités, logos partenaires uploadés
 *   via l'admin) : Supabase Storage, résolus par getMediaUrl().
 * — VIDÉOS : Supabase Storage (hors git), en versions transcodées pour le
 *   web (1080p max, H.264 CRF 28-29, sans audio, faststart).
 */

// URL de base du storage Supabase (contenus dynamiques + vidéos)
const STORAGE_BASE_URL = 'https://hfrfpbwnztopvytaeymb.supabase.co/storage/v1/object/public/media';

/**
 * Génère l'URL complète d'un média stocké sur Supabase
 * @param filename - Nom du fichier dans le bucket media
 * @returns URL complète du média
 */
export function getMediaUrl(filename: string): string {
  return `${STORAGE_BASE_URL}/${filename}`;
}

// ============================================
// IMAGES STATIQUES (locales, optimisées)
// ============================================

export const IMAGES = {
  // Logos
  logo: {
    blanc: '/images/site/logo-edf-pei-blanc.png',
    couleurs: '/images/site/logo-edf-pei-couleurs.png',
  },

  // Centrale
  centrale: {
    modelisation: '/images/site/modelisation-centrale.webp',
    visuelBiomasse: '/images/site/schema-biomasse.webp',
    pourquoiLocalisation: '/images/site/localisation-centrale.webp',
    emprise2: '/images/site/emprise-comparaison.webp',
  },

  // Environnement
  environnement: {
    qualiteAir: '/images/site/qualite-air.webp',
    gestionResp: '/images/site/gestion-responsable.webp',
    murumuru: '/images/site/murumuru.webp',
    mangrove: '/images/site/mangrove.webp',
    approcheResponsable: '/images/site/approche-responsable.webp',
  },

  // Partenariats (visuels statiques des sections — les logos uploadés
  // via l'admin restent sur Supabase)
  partenariats: {
    fermePeda: '/images/site/ferme-pedagogique.webp',
  },

  // Galerie photos (page Centrale)
  galerie: Array.from({ length: 12 }, (_, i) =>
    `/images/site/galerie-${String(i + 1).padStart(2, '0')}.webp`
  ),
} as const;

// ============================================
// VIDÉOS (Supabase, versions web optimisées)
// ============================================

export const VIDEOS = {
  // Modélisation 3D de la centrale (hero) — 4K 45 Mo → 1080p 17 Mo
  modelisation2: getMediaUrl('modelisation-centrale-web.mp4'),

  // Ressource en eau — 33 Mo → 9 Mo
  ressourceEau2: getMediaUrl('ressource-eau-web.mp4'),

  // Sanctuarisation — 13 Mo → 6 Mo
  sanctuarisation: getMediaUrl('sanctuarisation-web.mp4'),
} as const;

/** Posters des vidéos (première image réelle, locale et légère) */
export const POSTERS = {
  modelisation: '/images/site/posters/poster-modelisation.webp',
  ressourceEau: '/images/site/posters/poster-ressource-eau.webp',
  sanctuarisation: '/images/site/posters/poster-sanctuarisation.webp',
} as const;

// Export par défaut
const media = {
  IMAGES,
  VIDEOS,
  POSTERS,
  getMediaUrl,
};

export default media;
