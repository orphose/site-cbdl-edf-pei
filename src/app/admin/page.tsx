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
import type { AuditEntry, Profile, UserRole } from "@/lib/database.types";

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

  // Journal d'activité + utilisateurs
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Data loading
  const loadData = async () => {
    try {
      setLoadError(null);
      const [newsRes, partnershipsRes, auditRes, profilesRes] = await Promise.all([
        auth.supabase.from("news").select("*").order("created_at", { ascending: false }),
        auth.supabase.from("partnerships").select("*").order("display_order", { ascending: true }),
        auth.supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(200),
        auth.supabase.from("profiles").select("*").order("email", { ascending: true }),
      ]);

      if (newsRes.error || partnershipsRes.error) {
        throw newsRes.error ?? partnershipsRes.error;
      }

      newsManager.setNews(newsData(newsRes.data));
      partnershipManager.setPartnerships(partnershipsRes.data || []);
      setAuditEntries((auditRes.data as AuditEntry[]) || []);
      setProfiles((profilesRes.data as Profile[]) || []);
    } catch (error) {
      console.error("Erreur chargement données:", error);
      setLoadError(
        "Impossible de charger les données. Vérifiez votre connexion puis réessayez."
      );
    }
  };

  // Petit utilitaire de typage local (les données arrivent en `any` du client)
  const newsData = (data: unknown): News[] => (data as News[]) || [];

  // Changement de rôle d'un utilisateur (admin uniquement)
  const handleChangeRole = async (id: string, role: UserRole) => {
    const { error } = await auth.supabase
      .from("profiles")
      .update({ role })
      .eq("id", id);
    if (error) {
      console.error("Erreur changement de rôle:", error);
      return;
    }
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, role } : p))
    );
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
      // Revenir à la liste (sauvegarde réussie ou abandon) repart d'un état propre.
      setHasUnsavedChanges(false);
      return;
    }
    if (!formInitialized.current) {
      formInitialized.current = true;
      return;
    }
    setHasUnsavedChanges(true);
  }, [newsManager.newsForm, partnershipManager.partnershipForm, viewMode]);

  // Back to list — confirme si des modifications ne sont pas enregistrées
  const backToList = () => {
    if (
      hasUnsavedChanges &&
      !window.confirm(
        "Des modifications ne sont pas enregistrées. Quitter sans enregistrer ?"
      )
    ) {
      return;
    }
    setViewMode("list");
    newsManager.setSaveSuccess(false);
    newsManager.setSaveError(null);
    partnershipManager.setSaveSuccess(false);
    partnershipManager.setSaveError(null);
    setHasUnsavedChanges(false);
  };

  // Changement de section depuis la barre de navigation : quitte un éventuel
  // formulaire ouvert (avec la même confirmation anti-perte de saisie).
  const handleSectionChange = (section: ActiveSection) => {
    if (section === activeSection && viewMode === "list") return;
    if (viewMode !== "list") {
      if (
        hasUnsavedChanges &&
        !window.confirm(
          "Des modifications ne sont pas enregistrées. Quitter sans enregistrer ?"
        )
      ) {
        return;
      }
      setViewMode("list");
      newsManager.setSaveSuccess(false);
      newsManager.setSaveError(null);
      partnershipManager.setSaveSuccess(false);
      partnershipManager.setSaveError(null);
      setHasUnsavedChanges(false);
    }
    setActiveSection(section);
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
        className="min-h-screen flex items-center justify-center bg-edf-blanc-bleute"
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
        isAdmin={auth.isAdmin}
        onLogout={auth.handleLogout}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
        newsManager={newsManager}
        partnershipManager={partnershipManager}
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        onBackToList={backToList}
        onConfirmDelete={handleConfirmDelete}
        auditEntries={auditEntries}
        profiles={profiles}
        onChangeRole={handleChangeRole}
        loadError={loadError}
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
