"use client";

import {
  Newspaper,
  Users,
  Eye,
  LogOut,
  History,
  UserCog,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/media";
import type { User } from "@supabase/supabase-js";
import type {
  ActiveSection,
  ViewMode,
  DeleteConfirmState,
} from "@/types/admin";
import type { AuditEntry, Profile, UserRole } from "@/lib/database.types";
import NewsEditor from "@/components/admin/NewsEditor";
import PartnershipEditor from "@/components/admin/PartnershipEditor";
import AdminActivityLog from "@/components/admin/AdminActivityLog";
import AdminUsers from "@/components/admin/AdminUsers";
import type { useNewsManager } from "@/hooks/useNewsManager";
import type { usePartnershipManager } from "@/hooks/usePartnershipManager";

// Extract return types from the hooks
type NewsManagerReturn = ReturnType<typeof useNewsManager>;
type PartnershipManagerReturn = ReturnType<typeof usePartnershipManager>;

interface AdminDashboardProps {
  user: User;
  isAdmin: boolean;
  onLogout: () => void;
  activeSection: ActiveSection;
  /** Changement de section — gardé contre la perte de saisie (cf. page) */
  onSectionChange: (section: ActiveSection) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  newsManager: NewsManagerReturn;
  partnershipManager: PartnershipManagerReturn;
  deleteConfirm: DeleteConfirmState | null;
  setDeleteConfirm: (state: DeleteConfirmState | null) => void;
  onBackToList: () => void;
  onConfirmDelete: () => void;
  auditEntries: AuditEntry[];
  profiles: Profile[];
  onChangeRole: (id: string, role: UserRole) => void;
  loadError: string | null;
}

interface NavItem {
  key: ActiveSection;
  label: string;
  icon: LucideIcon;
  count?: number;
  adminOnly?: boolean;
}

export default function AdminDashboard({
  user,
  isAdmin,
  onLogout,
  activeSection,
  onSectionChange,
  viewMode,
  newsManager,
  partnershipManager,
  deleteConfirm,
  setDeleteConfirm,
  onBackToList,
  onConfirmDelete,
  auditEntries,
  profiles,
  onChangeRole,
  loadError,
}: AdminDashboardProps) {
  const navItems: NavItem[] = [
    {
      key: "news",
      label: "Actualités",
      icon: Newspaper,
      count: newsManager.news.length,
    },
    {
      key: "partnerships",
      label: "Partenariats",
      icon: Users,
      count: partnershipManager.partnerships.length,
    },
    { key: "activity", label: "Journal", icon: History },
    {
      key: "users",
      label: "Utilisateurs",
      icon: UserCog,
      count: profiles.length,
      adminOnly: true,
    },
  ];

  const publishedCount = newsManager.news.filter((n) => n.is_published).length;

  return (
    <div className="min-h-screen bg-admin-bg">
      {/* En-tête — reprend le langage de la nav publique (fond blanc,
          logo à gauche, état actif = barre Bleu Action sous le lien) */}
      <header className="bg-white sticky top-0 z-50 border-b border-edf-gris-clair shadow-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 sm:gap-6">
          {/* Identité */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/"
              aria-label="EDF PEI — retour au site"
              className="flex items-center"
            >
              <Image
                src={IMAGES.logo.couleurs}
                alt="EDF PEI"
                width={140}
                height={56}
                className="h-9 w-auto"
              />
            </Link>
            <div className="h-8 w-px bg-edf-gris-clair hidden sm:block" aria-hidden="true" />
            <span className="eyebrow eyebrow--bleu-nuit hidden sm:inline-flex">
              Administration
            </span>
          </div>

          {/* Navigation des sections — self-stretch + barre active (cf. Header public) */}
          <nav
            aria-label="Sections d'administration"
            className="flex items-center self-stretch gap-1 overflow-x-auto min-w-0 flex-1"
          >
            {navItems
              .filter((item) => !item.adminOnly || isAdmin)
              .map((item) => {
                const ItemIcon = item.icon;
                const active = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onSectionChange(item.key)}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-2 h-full px-3 text-[0.9375rem] whitespace-nowrap transition-colors ${
                      active
                        ? "text-edf-bleu-action font-semibold"
                        : "text-edf-bleu-nuit font-medium hover:text-edf-bleu-action"
                    }`}
                  >
                    <ItemIcon className="w-4 h-4" aria-hidden="true" />
                    {item.label}
                    {typeof item.count === "number" && (
                      <span
                        className={`px-1.5 py-0.5 text-xs font-semibold leading-none ${
                          active
                            ? "bg-edf-bleu-action/10 text-edf-bleu-action"
                            : "bg-admin-bg text-edf-bleu-nuit/70"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                    {/* Barre active — repère "vous êtes ici" */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-0 h-[3px] transition-colors ${
                        active ? "bg-edf-bleu-action" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 min-h-11 px-3 text-sm font-medium text-edf-bleu-nuit hover:text-edf-bleu-action transition-colors"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              Voir le site
            </Link>
            <button
              type="button"
              onClick={onLogout}
              title={user.email ?? undefined}
              className="inline-flex items-center gap-2 min-h-11 px-4 border-2 border-edf-bleu-nuit text-sm font-semibold text-edf-bleu-nuit hover:bg-edf-bleu-nuit hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Identité de session (mobile n'a pas le title du header) */}
        <p className="text-caption mb-6">
          Connecté en tant que{" "}
          <span className="font-medium text-edf-bleu-nuit">{user.email}</span>
          {!isAdmin && " — éditeur"}
        </p>

        {/* Chiffres clés — cartes carrées, icônes en carré plein */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Newspaper,
              square: "icon-square",
              value: newsManager.news.length,
              label: "Actualités",
            },
            {
              icon: CheckCircle2,
              square: "icon-square icon-square--green",
              value: publishedCount,
              label: "Publiées sur le site",
            },
            {
              icon: Users,
              square: "icon-square icon-square--action",
              value: partnershipManager.partnerships.length,
              label: "Partenaires",
            },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white border border-edf-gris-clair p-5 flex items-center gap-4"
              >
                <span className={stat.square} aria-hidden="true">
                  <StatIcon className="w-6 h-6" />
                </span>
                <div>
                  <dd className="text-3xl font-bold text-edf-bleu-nuit leading-tight">
                    {stat.value}
                  </dd>
                  <dt className="text-caption">{stat.label}</dt>
                </div>
              </div>
            );
          })}
        </dl>

        {loadError && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{loadError}</span>
          </div>
        )}

        {/* News Section */}
        {activeSection === "news" && (
          <NewsEditor
            news={newsManager.news}
            viewMode={viewMode}
            editingNews={newsManager.editingNews}
            newsForm={newsManager.newsForm}
            setNewsForm={newsManager.setNewsForm}
            linkedInShare={newsManager.linkedInShare}
            setLinkedInShare={newsManager.setLinkedInShare}
            saving={newsManager.saving}
            saveSuccess={newsManager.saveSuccess}
            saveError={newsManager.saveError}
            uploading={newsManager.uploading}
            uploadProgress={newsManager.uploadProgress}
            uploadError={newsManager.uploadError}
            fileInputRef={newsManager.fileInputRef}
            galleryInputRef={newsManager.galleryInputRef}
            onCreateNews={newsManager.openCreateNews}
            onEditNews={newsManager.openEditNews}
            onDeleteNews={(id) => {
              const confirm = newsManager.deleteNews(id);
              setDeleteConfirm(confirm);
            }}
            onSaveNews={newsManager.saveNews}
            onBackToList={onBackToList}
            onNewsFileSelect={newsManager.handleNewsFileSelect}
            onGalleryFileSelect={newsManager.handleGalleryFileSelect}
            onRemoveGalleryPhoto={newsManager.removeGalleryPhoto}
            onAddHashtag={newsManager.addHashtag}
            onRemoveHashtag={newsManager.removeHashtag}
          />
        )}

        {/* Partnerships Section */}
        {activeSection === "partnerships" && (
          <PartnershipEditor
            partnerships={partnershipManager.partnerships}
            viewMode={viewMode}
            editingPartnership={partnershipManager.editingPartnership}
            partnershipForm={partnershipManager.partnershipForm}
            setPartnershipForm={partnershipManager.setPartnershipForm}
            saving={partnershipManager.saving}
            saveSuccess={partnershipManager.saveSuccess}
            saveError={partnershipManager.saveError}
            uploading={partnershipManager.uploading}
            uploadProgress={partnershipManager.uploadProgress}
            uploadError={partnershipManager.uploadError}
            partnershipFileInputRef={
              partnershipManager.partnershipFileInputRef
            }
            onCreatePartnership={partnershipManager.openCreatePartnership}
            onEditPartnership={partnershipManager.openEditPartnership}
            onDeletePartnership={(id) => {
              const confirm = partnershipManager.deletePartnership(id);
              setDeleteConfirm(confirm);
            }}
            onSavePartnership={partnershipManager.savePartnership}
            onBackToList={onBackToList}
            onPartnershipFileSelect={
              partnershipManager.handlePartnershipFileSelect
            }
            onReorder={partnershipManager.reorderPartnerships}
          />
        )}

        {/* Journal d'activité */}
        {activeSection === "activity" && viewMode === "list" && (
          <AdminActivityLog entries={auditEntries} />
        )}

        {/* Utilisateurs & rôles (admins uniquement) */}
        {activeSection === "users" && viewMode === "list" && isAdmin && (
          <AdminUsers
            profiles={profiles}
            currentUserId={user.id}
            onChangeRole={onChangeRole}
          />
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-desc"
          className="fixed inset-0 z-50 flex items-center justify-center bg-edf-bleu-nuit/60"
          onKeyDown={(e) => {
            if (e.key === "Escape") setDeleteConfirm(null);
          }}
        >
          <div className="bg-white shadow-4 p-6 max-w-md mx-4">
            <h3
              id="delete-dialog-title"
              className="text-lg font-bold text-edf-bleu-nuit mb-2"
            >
              Supprimer &laquo; {deleteConfirm.name} &raquo; ?
            </h3>
            <p
              id="delete-dialog-desc"
              className="text-edf-bleu-nuit/75 text-sm mb-6"
            >
              L&apos;élément sera retiré immédiatement. Vous pourrez annuler
              la suppression pendant 5 secondes.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 min-h-11 text-edf-bleu-nuit bg-admin-bg hover:bg-edf-gris-clair transition-colors font-medium"
                autoFocus
              >
                Garder
              </button>
              <button
                onClick={onConfirmDelete}
                className="px-4 py-2 min-h-11 text-white bg-red-600 hover:bg-red-700 transition-colors font-semibold"
              >
                Supprimer{" "}
                {deleteConfirm.type === "news" ? "l'actualité" : "le partenariat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
