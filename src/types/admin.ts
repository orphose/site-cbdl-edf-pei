import type { News, Partnership } from "@/lib/database.types";

// Types pour les vues
export type ViewMode = "list" | "create" | "edit";
export type ActiveSection = "news" | "partnerships";

// Formulaire actualité
export interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  gallery: string[];
  is_published: boolean;
}

// Formulaire partenariat
export interface PartnershipFormData {
  name: string;
  description: string;
  logo_url: string;
  color: string;
  is_active: boolean;
}

// État du partage LinkedIn
export interface LinkedInShareState {
  enabled: boolean;
  customText: string;
  hashtags: string[];
  newHashtag: string;
}

// État de confirmation de suppression
export interface DeleteConfirmState {
  open: boolean;
  type: "news" | "partnership";
  id: string;
  name: string;
}

// État de sauvegarde partagé
export interface SaveState {
  saving: boolean;
  saveSuccess: boolean;
  saveError: string | null;
}

// État d'upload partagé
export interface UploadState {
  uploading: boolean;
  uploadProgress: number;
  uploadError: string;
}

// Ré-exports pour convenience
export type { News, Partnership };
