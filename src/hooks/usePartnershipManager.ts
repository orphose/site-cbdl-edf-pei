"use client";

import { useState, useRef, useCallback } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateSlug } from "@/hooks/useNewsManager";
import type { Partnership, PartnershipFormData, ViewMode } from "@/types/admin";

const EMPTY_PARTNERSHIP_FORM: PartnershipFormData = {
  name: "",
  description: "",
  logo_url: "",
  color: "#001A70",
  is_active: true,
};

export function usePartnershipManager(
  supabase: SupabaseClient,
  setViewMode: (mode: ViewMode) => void,
  loadData: () => void
) {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [editingPartnership, setEditingPartnership] =
    useState<Partnership | null>(null);
  const [partnershipForm, setPartnershipForm] =
    useState<PartnershipFormData>(EMPTY_PARTNERSHIP_FORM);

  // Save state
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  // Ref
  const partnershipFileInputRef = useRef<HTMLInputElement>(null);

  // Upload d'image
  const handleImageUpload = useCallback(
    async (file: File) => {
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
          .from("media")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        setUploadProgress(100);

        const { data: publicUrl } = supabase.storage
          .from("media")
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

  // Gestionnaire de sélection de fichier pour partenariats
  const handlePartnershipFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleImageUpload(file);
    if (url) {
      setPartnershipForm((prev) => ({ ...prev, logo_url: url }));
    }
  };

  // Ouvrir création partenariat
  const openCreatePartnership = () => {
    setEditingPartnership(null);
    setPartnershipForm(EMPTY_PARTNERSHIP_FORM);
    setViewMode("create");
  };

  // Ouvrir édition partenariat
  const openEditPartnership = (item: Partnership) => {
    setEditingPartnership(item);
    setPartnershipForm({
      name: item.name,
      description: item.description || "",
      logo_url: item.logo_url || "",
      color: item.color || "#001A70",
      is_active: item.is_active,
    });
    setViewMode("edit");
  };

  // Sauvegarder partenariat
  const savePartnership = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const partnershipData = {
        name: partnershipForm.name,
        slug: generateSlug(partnershipForm.name),
        description: partnershipForm.description || null,
        logo_url: partnershipForm.logo_url || null,
        website_url: null,
        category: "local",
        display_order:
          editingPartnership?.display_order ?? partnerships.length,
        is_active: partnershipForm.is_active,
        color: partnershipForm.color || "#001A70",
        icon_name: "zap",
      };

      if (editingPartnership) {
        const { error } = await supabase
          .from("partnerships")
          .update(partnershipData)
          .eq("id", editingPartnership.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("partnerships")
          .insert(partnershipData);
        if (error) throw error;
      }

      setSaveSuccess(true);

      setTimeout(() => {
        setViewMode("list");
        loadData();
      }, 1000);

      return true;
    } catch (error) {
      console.error("Erreur sauvegarde partenariat:", error);
      setSaveError("Erreur lors de la sauvegarde. Veuillez réessayer.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Supprimer partenariat
  const deletePartnership = (id: string) => {
    return {
      open: true as const,
      type: "partnership" as const,
      id,
      name:
        partnerships.find((p) => p.id === id)?.name || "cet élément",
    };
  };

  return {
    partnerships,
    setPartnerships,
    editingPartnership,
    partnershipForm,
    setPartnershipForm,
    saving,
    saveSuccess,
    setSaveSuccess,
    saveError,
    setSaveError,
    uploading,
    uploadProgress,
    uploadError,
    partnershipFileInputRef,
    handlePartnershipFileSelect,
    openCreatePartnership,
    openEditPartnership,
    savePartnership,
    deletePartnership,
  };
}
