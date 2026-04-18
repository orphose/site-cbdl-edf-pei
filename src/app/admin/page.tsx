"use client";

import { useState, useEffect, useRef } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNewsManager } from "@/hooks/useNewsManager";
import { usePartnershipManager } from "@/hooks/usePartnershipManager";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import Toast from "@/components/ui/Toast";
import type {
  ViewMode,
  ActiveSection,
  DeleteConfirmState,
  News,
  Partnership,
} from "@/types/admin";

interface PendingUndo {
  kind: "news" | "partnership";
  payload: News | Partnership;
  label: string;
}

/**
 * Page d'administration du CMS avec Supabase Auth
 */
export default function AdminPage() {
  const auth = useAdminAuth();

  // Navigation state
  const [activeSection, setActiveSection] = useState<ActiveSection>("news");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState | null>(null);

  // Undo state — payload complet de la dernière ligne supprimée (restaurable 5s)
  const [pendingUndo, setPendingUndo] = useState<PendingUndo | null>(null);

  // Unsaved changes protection
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const formInitialized = useRef(false);

  // Data loading
  const loadData = async () => {
    try {
      const { data: newsData } = await auth.supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: partnershipsData } = await auth.supabase
        .from("partnerships")
        .select("*")
        .order("display_order", { ascending: true });

      newsManager.setNews(newsData || []);
      partnershipManager.setPartnerships(partnershipsData || []);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    }
  };

  // Hooks for data management
  const newsManager = useNewsManager(auth.supabase, setViewMode, loadData);
  const partnershipManager = usePartnershipManager(auth.supabase, setViewMode, loadData);

  // Load data when user is authenticated
  useEffect(() => {
    if (auth.user) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  // Beforeunload protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Detect form changes (skip initial population)
  useEffect(() => {
    if (viewMode === "list") {
      formInitialized.current = false;
      return;
    }
    if (!formInitialized.current) {
      formInitialized.current = true;
      return;
    }
    setHasUnsavedChanges(true);
  }, [newsManager.newsForm, partnershipManager.partnershipForm, viewMode]);

  // Back to list
  const backToList = () => {
    setViewMode("list");
    newsManager.setSaveSuccess(false);
    newsManager.setSaveError(null);
    partnershipManager.setSaveSuccess(false);
    partnershipManager.setSaveError(null);
    setHasUnsavedChanges(false);
  };

  // Confirm delete — supprime puis conserve 5s un snapshot pour l'undo.
  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    const table = deleteConfirm.type === "news" ? "news" : "partnerships";

    // Récupère le snapshot complet avant suppression (pour l'undo)
    const { data: snapshot } = await auth.supabase
      .from(table)
      .select("*")
      .eq("id", deleteConfirm.id)
      .single();

    await auth.supabase.from(table).delete().eq("id", deleteConfirm.id);

    if (snapshot) {
      setPendingUndo({
        kind: deleteConfirm.type,
        payload: snapshot,
        label: deleteConfirm.name,
      });
    }

    setDeleteConfirm(null);
    loadData();
  };

  // Annule la suppression (ré-insertion). Échec silencieux si contrainte.
  const handleUndoDelete = async () => {
    if (!pendingUndo) return;
    const table = pendingUndo.kind === "news" ? "news" : "partnerships";
    await auth.supabase.from(table).insert(pendingUndo.payload);
    setPendingUndo(null);
    loadData();
  };

  // Loading screen
  if (auth.loading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-live="polite"
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-edf-blue"
          aria-hidden="true"
        />
        <span className="sr-only">Chargement de la session…</span>
      </div>
    );
  }

  // Login screen
  if (!auth.user) {
    return (
      <AdminAuth
        email={auth.email}
        setEmail={auth.setEmail}
        password={auth.password}
        setPassword={auth.setPassword}
        authError={auth.authError}
        authLoading={auth.authLoading}
        handleLogin={auth.handleLogin}
      />
    );
  }

  // Dashboard
  return (
    <>
      <AdminDashboard
        user={auth.user}
        onLogout={auth.handleLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        viewMode={viewMode}
        setViewMode={setViewMode}
        newsManager={newsManager}
        partnershipManager={partnershipManager}
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        onBackToList={backToList}
        onConfirmDelete={handleConfirmDelete}
        supabase={auth.supabase}
      />

      {pendingUndo && (
        <Toast
          kind="info"
          duration={5000}
          message={`« ${pendingUndo.label} » supprimé.`}
          onClose={() => setPendingUndo(null)}
          action={
            <button
              type="button"
              onClick={handleUndoDelete}
              className="px-3 py-1 text-sm font-semibold underline hover:no-underline min-h-[32px]"
            >
              Annuler
            </button>
          }
        />
      )}
    </>
  );
}
