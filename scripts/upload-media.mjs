/**
 * Script d'upload des médias vers Supabase Storage
 * Usage: node scripts/upload-media.mjs
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

// Extensions de fichiers médias supportées
const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov'];

/**
 * Récupère tous les fichiers médias d'un dossier
 */
function getMediaFiles(dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getMediaFiles(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (MEDIA_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Détermine le type MIME d'un fichier
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
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
  
  const { error } = await supabase.storage
    .from('media')
    .upload(remotePath, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    console.error(`❌ Erreur upload ${remotePath}:`, error.message);
    return false;
  }
  
  console.log(`✅ ${remotePath}`);
  return true;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Upload des médias vers Supabase Storage\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const mediaFiles = getMediaFiles(publicDir);
  
  console.log(`📁 ${mediaFiles.length} fichiers médias trouvés\n`);
  
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < mediaFiles.length; i++) {
    const file = mediaFiles[i];
    const relativePath = path.relative(publicDir, file);
    
    const result = await uploadFile(file, relativePath);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }
  
  console.log(`\n📊 Résultat: ${success} réussis, ${failed} échecs`);
  console.log(`\n🔗 URL de base: ${SUPABASE_URL}/storage/v1/object/public/media/`);
}

main().catch(console.error);

