/**
 * Script d'upload des vidéos vers Supabase Storage
 * Usage: node scripts/upload-videos.mjs
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Supabase
const SUPABASE_URL = 'https://hfrfpbwnztopvytaeymb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmcmZwYnduenRvcHZ5dGFleW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDYyODcsImV4cCI6MjA4MTQ4MjI4N30.IhXg35z4T26zOfZBslq6oWMA_xVS8SMPCLeIiVgFkr8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Vidéos à uploader
const VIDEOS = [
  'modelisation_video_cbdl.mp4',
  'modelisation_video_cbdl_2.mp4',
  'ressource_eau.mov',
  'ressource_eau_2.mp4',
];

/**
 * Détermine le type MIME d'un fichier
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Upload un fichier vers Supabase Storage
 */
async function uploadFile(localPath, remotePath) {
  const fileBuffer = fs.readFileSync(localPath);
  const mimeType = getMimeType(localPath);
  const sizeMB = (fileBuffer.length / 1024 / 1024).toFixed(1);
  
  console.log(`📤 Upload ${remotePath} (${sizeMB}MB)...`);
  
  const { error } = await supabase.storage
    .from('media')
    .upload(remotePath, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    console.error(`❌ Erreur: ${error.message}`);
    return false;
  }
  
  console.log(`✅ ${remotePath} uploadé avec succès`);
  return true;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🎬 Upload des vidéos vers Supabase Storage\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < VIDEOS.length; i++) {
    const video = VIDEOS[i];
    const localPath = path.join(publicDir, video);
    
    if (!fs.existsSync(localPath)) {
      console.log(`⚠️ Fichier non trouvé: ${video}`);
      failed++;
      continue;
    }
    
    const result = await uploadFile(localPath, video);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }
  
  console.log(`\n📊 Résultat: ${success} réussis, ${failed} échecs`);
}

main().catch(console.error);

