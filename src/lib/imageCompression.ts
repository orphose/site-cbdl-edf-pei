/**
 * Compression d'image côté client (sans dépendance) avant upload.
 *
 * Redimensionne à une largeur/hauteur maximale et ré-encode en JPEG/WebP
 * avec une qualité cible. Réduit fortement le poids des photos issues de
 * smartphones (souvent 3–8 Mo) avant de les envoyer vers Supabase Storage.
 *
 * Les formats non maîtrisables (GIF animés, SVG) sont renvoyés tels quels.
 */

const MAX_DIMENSION = 2000; // px — largeur/hauteur max
const TARGET_QUALITY = 0.82;

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
}

function canCompress(file: File): boolean {
  return file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp";
}

export async function compressImage(file: File): Promise<CompressionResult> {
  if (typeof window === "undefined" || !canCompress(file)) {
    return { file, originalSize: file.size, compressedSize: file.size };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;

    const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
    const targetW = Math.round(width * scale);
    const targetH = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return { file, originalSize: file.size, compressedSize: file.size };
    }
    ctx.drawImage(bitmap, 0, 0, targetW, targetH);
    bitmap.close();

    // Le PNG (souvent des logos avec transparence) est ré-encodé en WebP
    // pour préserver l'alpha ; les photos en JPEG.
    const outType = file.type === "image/png" ? "image/webp" : "image/jpeg";

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outType, TARGET_QUALITY)
    );

    if (!blob || blob.size >= file.size) {
      // La compression n'apporte rien (image déjà légère) : on garde l'original.
      return { file, originalSize: file.size, compressedSize: file.size };
    }

    const ext = outType === "image/webp" ? "webp" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const compressed = new File([blob], `${baseName}.${ext}`, { type: outType });

    return {
      file: compressed,
      originalSize: file.size,
      compressedSize: compressed.size,
    };
  } catch {
    // En cas d'échec (navigateur, image corrompue), on retombe sur l'original.
    return { file, originalSize: file.size, compressedSize: file.size };
  }
}
