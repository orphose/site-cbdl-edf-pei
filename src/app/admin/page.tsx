"use client";

import { useState, useEffect, useRef } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNewsManager } from "@/hooks/useNewsManager";
import { usePartnershipManager } from "@/hooks/usePartnershipManager";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { ViewMode, ActiveSection, DeleteConfirmState } from "@/types/admin";

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

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "news") {
      await auth.supabase.from("news").delete().eq("id", deleteConfirm.id);
    } else {
      await auth.supabase.from("partnerships").delete().eq("id", deleteConfirm.id);
    }
    setDeleteConfirm(null);
    loadData();
  };

  // Loading screen
  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-edf-blue"></div>
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
  );
}
