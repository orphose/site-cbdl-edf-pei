/**
 * Configuration des URLs médias Supabase Storage
 * Tous les médias du site sont stockés sur Supabase Storage
 */

// URL de base du storage Supabase
const STORAGE_BASE_URL = 'https://hfrfpbwnztopvytaeymb.supabase.co/storage/v1/object/public/media';

/**
 * Génère l'URL complète d'un média stocké sur Supabase
 * @param filename - Nom du fichier dans le bucket media
 * @returns URL complète du média
 */
export function getMediaUrl(filename: string): string {
  // Assertions de validation
  console.assert(filename, 'Le nom du fichier est requis');
  console.assert(filename.length > 0, 'Le nom du fichier ne peut pas être vide');
  
  return `${STORAGE_BASE_URL}/${filename}`;
}

// ============================================
// IMAGES
// ============================================

export const IMAGES = {
  // Logos
  logo: {
    blanc: getMediaUrl('EDF_PEI_LOGO_BLANC.png'),
    couleurs: getMediaUrl('EDF_PEI_LOGO_COULEURS.png'),
    couleursJpg: getMediaUrl('EDF_PEI_LOGO_COULEURS.jpg'),
  },
  
  // Centrale
  centrale: {
    emprise: getMediaUrl('emprise_cbdl_vs_solaire.png'),
    emprise2: getMediaUrl('emprise_cbdl_vs_solaire_2.png'),
    modelisation: getMediaUrl('modelisation_photo_1.png'),
    visuelBiomasse: getMediaUrl('visuel_biomasse_1.png'),
    pourquoiLocalisation: getMediaUrl('pourquoi_localisation_env.png'),
  },
  
  // Environnement
  environnement: {
    mangrove: getMediaUrl('mangrove_1.png'),
    gestionResp: getMediaUrl('gestion_resp_1.png'),
    ressourcePreserv: getMediaUrl('ressource_preserv.png'),
    preservWater: getMediaUrl('preserv_water.jpg'),
    qualiteAir: getMediaUrl('qualite_air_photo_1.jpg'),
    respApproch: getMediaUrl('resp_approch.jpg'),
  },
  
  // Partenariats locaux
  partenariats: {
    fermePeda: getMediaUrl('ferme_peda_1.jpg'),
    miellerie: getMediaUrl('miellerie_macouria_1.jpg'),
    murumuru: getMediaUrl('murumuru_1.jpg'),
    palmetum: getMediaUrl('palmetum_macouria_1.jpg'),
    villagePalikour: getMediaUrl('village_palikour_1.jpg'),
  },
  
  // Galerie photos
  galerie: [
    getMediaUrl('photo_gal_1.jpg'),
    getMediaUrl('photo_gal_2.jpg'),
    getMediaUrl('photo_gal_3.jpg'),
    getMediaUrl('photo_gal_4.jpg'),
    getMediaUrl('photo_gal_5.jpg'),
    getMediaUrl('photo_gal_6.jpg'),
    getMediaUrl('photo_gal_7.jpg'),
    getMediaUrl('photo_gal_8.jpg'),
    getMediaUrl('photo_gal_9.jpg'),
    getMediaUrl('photo_gal_10.jpg'),
    getMediaUrl('photo_gal_11.jpg'),
    getMediaUrl('photo_gal_12.jpg'),
  ],
} as const;

// ============================================
// VIDÉOS
// ============================================

export const VIDEOS = {
  // Modélisation 3D de la centrale
  modelisation: getMediaUrl('modelisation_video_cbdl.mp4'),
  modelisation2: getMediaUrl('modelisation_video_cbdl_2.mp4'),
  
  // Ressource en eau
  ressourceEau: getMediaUrl('ressource_eau.mp4'),
  ressourceEau2: getMediaUrl('ressource_eau_2.mp4'),
  
  // Sanctuarisation
  sanctuarisation: getMediaUrl('sanctuarisation_video.mp4'),
} as const;

// Export par défaut
export default {
  IMAGES,
  VIDEOS,
  getMediaUrl,
};

