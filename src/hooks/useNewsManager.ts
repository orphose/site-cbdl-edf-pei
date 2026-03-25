"use client";

import { useState, useRef, useCallback } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  News,
  NewsFormData,
  LinkedInShareState,
  ViewMode,
} from "@/types/admin";

const EMPTY_NEWS_FORM: NewsFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image_url: "",
  gallery: [],
  is_published: false,
};

const DEFAULT_LINKEDIN_SHARE: LinkedInShareState = {
  enabled: false,
  customText: "",
  hashtags: ["CBDL", "EnergieRenouvelable", "Guyane"],
  newHashtag: "",
};

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useNewsManager(
  supabase: SupabaseClient,
  setViewMode: (mode: ViewMode) => void,
  loadData: () => void
) {
  const [news, setNews] = useState<News[]>([]);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [newsForm, setNewsForm] = useState<NewsFormData>(EMPTY_NEWS_FORM);

  // LinkedIn share state
  const [linkedInShare, setLinkedInShare] =
    useState<LinkedInShareState>(DEFAULT_LINKEDIN_SHARE);

  // Save state
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Upload d'image
  const handleImageUpload = useCallback(
    async (file: File, bucket: "actualites" | "media") => {
      setUploading(true);
      setUploadProgress(0);
      setUploadError("");

      try {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          throw new Error("Le fichier est trop volumineux (max 5MB)");
        }

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            "Format non supporté (JPG, PNG, WebP, GIF uniquement)"
          );
        }

        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

        setUploadProgress(30);

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        setUploadProgress(100);

        const { data: publicUrl } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        return publicUrl.publicUrl;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erreur lors de l'upload";
        setUploadError(message);
        return null;
      } finally {
        setUploading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    },
    [supabase.storage]
  );

  // Gestionnaire de sélection de fichier pour actualités
  const handleNewsFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleImageUpload(file, "actualites");
    if (url) {
      setNewsForm((prev) => ({ ...prev, image_url: url }));
    }
  };

  // Gestionnaire de sélection de fichiers pour la galerie (max 8)
  const handleGalleryFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 8 - newsForm.gallery.length;
    if (remainingSlots <= 0) {
      setUploadError("La galerie est pleine (max 8 photos)");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    const newGalleryUrls: string[] = [];

    for (const file of filesToUpload) {
      const url = await handleImageUpload(file, "actualites");
      if (url) {
        newGalleryUrls.push(url);
      }
    }

    if (newGalleryUrls.length > 0) {
      setNewsForm((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newGalleryUrls],
      }));
    }

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  // Supprimer une photo de la galerie
  const removeGalleryPhoto = (index: number) => {
    setNewsForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Ouvrir création actualité
  const openCreateNews = () => {
    setEditingNews(null);
    setNewsForm(EMPTY_NEWS_FORM);
    setLinkedInShare(DEFAULT_LINKEDIN_SHARE);
    setViewMode("create");
  };

  // Ouvrir édition actualité
  const openEditNews = (item: News) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || "",
      content: item.content || "",
      image_url: item.image_url || "",
      gallery: item.gallery || [],
      is_published: item.is_published,
    });
    setLinkedInShare(DEFAULT_LINKEDIN_SHARE);
    setViewMode("edit");
  };

  // Ouvrir la fenêtre de partage LinkedIn
  const openLinkedInShare = (
    _articleUrl: string,
    _title: string,
    content: string
  ) => {
    const hashtags = linkedInShare.hashtags.map((h) => `#${h}`).join(" ");
    const postText = linkedInShare.customText || content;
    const fullText = `${postText}\n\n${hashtags}`;
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(fullText)}`;
    window.open(linkedInUrl, "_blank");
  };

  // Ajouter un hashtag
  const addHashtag = () => {
    const tag = linkedInShare.newHashtag.trim().replace(/^#/, "");
    if (
      tag &&
      !linkedInShare.hashtags.includes(tag) &&
      linkedInShare.hashtags.length < 10
    ) {
      setLinkedInShare({
        ...linkedInShare,
        hashtags: [...linkedInShare.hashtags, tag],
        newHashtag: "",
      });
    }
  };

  // Supprimer un hashtag
  const removeHashtag = (tagToRemove: string) => {
    setLinkedInShare({
      ...linkedInShare,
      hashtags: linkedInShare.hashtags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Sauvegarder actualité
  const saveNews = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const finalSlug = newsForm.slug || generateSlug(newsForm.title);

      // Vérifier l'unicité du slug
      if (!editingNews || editingNews.slug !== finalSlug) {
        const { data: existing } = await supabase
          .from("news")
          .select("id")
          .eq("slug", finalSlug)
          .limit(1);
        if (
          existing &&
          existing.length > 0 &&
          existing[0].id !== editingNews?.id
        ) {
          setSaveError("Ce slug est déjà utilisé par une autre actualité.");
          setSaving(false);
          return;
        }
      }

      const newsData: Record<string, unknown> = {
        title: newsForm.title,
        slug: finalSlug,
        excerpt: newsForm.excerpt || null,
        content: newsForm.content || null,
        image_url: newsForm.image_url || null,
        gallery: newsForm.gallery || [],
        is_published: newsForm.is_published,
      };

      if (!editingNews) {
        newsData.published_at = newsForm.is_published
          ? new Date().toISOString()
          : null;
      } else if (newsForm.is_published && !editingNews.published_at) {
        newsData.published_at = new Date().toISOString();
      } else if (!newsForm.is_published) {
        newsData.published_at = null;
      }

      if (editingNews) {
        const { error } = await supabase
          .from("news")
          .update(newsData)
          .eq("id", editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert(newsData);
        if (error) throw error;
      }

      setSaveSuccess(true);
      // setHasUnsavedChanges is handled via returned flag

      // Ouvrir LinkedIn si l'option est activée et l'article est publié
      if (linkedInShare.enabled && newsForm.is_published) {
        const baseUrl = window.location.origin;
        const articleUrl = `${baseUrl}/actualites/${finalSlug}`;
        setTimeout(() => {
          openLinkedInShare(
            articleUrl,
            newsForm.title,
            newsForm.content || newsForm.title
          );
        }, 500);
      }

      setTimeout(() => {
        setViewMode("list");
        loadData();
      }, 1000);

      return true; // indicate success for unsaved changes tracking
    } catch (error) {
      console.error("Erreur sauvegarde actualité:", error);
      setSaveError("Erreur lors de la sauvegarde. Veuillez réessayer.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Supprimer actualité
  const deleteNews = (id: string) => {
    return {
      open: true as const,
      type: "news" as const,
      id,
      name: news.find((n) => n.id === id)?.title || "cet élément",
    };
  };

  return {
    news,
    setNews,
    editingNews,
    newsForm,
    setNewsForm,
    linkedInShare,
    setLinkedInShare,
    saving,
    saveSuccess,
    setSaveSuccess,
    saveError,
    setSaveError,
    uploading,
    uploadProgress,
    uploadError,
    fileInputRef,
    galleryInputRef,
    handleNewsFileSelect,
    handleGalleryFileSelect,
    removeGalleryPhoto,
    openCreateNews,
    openEditNews,
    saveNews,
    deleteNews,
    addHashtag,
    removeHashtag,
  };
}
