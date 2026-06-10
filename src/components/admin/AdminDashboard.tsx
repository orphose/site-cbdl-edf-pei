"use client";

import {
  Card,
  CardBody,
  Button,
  Tabs,
  Tab,
  Chip,
} from "@nextui-org/react";
import {
  Newspaper,
  Users,
  Eye,
  LogOut,
  History,
  UserCog,
  AlertCircle,
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
  setActiveSection: (section: ActiveSection) => void;
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

export default function AdminDashboard({
  user,
  isAdmin,
  onLogout,
  activeSection,
  setActiveSection,
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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md h-[100px]">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src={IMAGES.logo.couleurs}
                alt="EDF PEI"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Administration
              </h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="light"
                size="sm"
                startContent={<Eye className="w-4 h-4" />}
                className="text-gray-600"
              >
                Voir le site
              </Button>
            </Link>
            <Button
              variant="flat"
              color="danger"
              size="sm"
              startContent={<LogOut className="w-4 h-4" />}
              onPress={onLogout}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border border-gray-100">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-edf-blue/10 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-edf-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {newsManager.news.length}
                </p>
                <p className="text-sm text-gray-500">Actualités</p>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-100">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-edf-orange/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-edf-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {newsManager.news.filter((n) => n.is_published).length}
                </p>
                <p className="text-sm text-gray-500">Publiées</p>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-100">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-edf-green/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-edf-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {partnershipManager.partnerships.length}
                </p>
                <p className="text-sm text-gray-500">Partenaires</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Tabs - only in list mode */}
        {viewMode === "list" && (
          <Tabs
            aria-label="Sections admin"
            color="primary"
            variant="underlined"
            selectedKey={activeSection}
            onSelectionChange={(key) =>
              setActiveSection(key as ActiveSection)
            }
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-gray-200",
              cursor: "w-full bg-edf-blue",
              tab: "max-w-fit px-0 h-12",
              tabContent:
                "group-data-[selected=true]:text-edf-blue font-medium",
            }}
          >
            <Tab
              key="news"
              title={
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  <span>Actualités</span>
                  <Chip size="sm" variant="flat" className="bg-gray-100">
                    {newsManager.news.length}
                  </Chip>
                </div>
              }
            />
            <Tab
              key="partnerships"
              title={
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Partenariats</span>
                  <Chip size="sm" variant="flat" className="bg-gray-100">
                    {partnershipManager.partnerships.length}
                  </Chip>
                </div>
              }
            />
            <Tab
              key="activity"
              title={
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  <span>Journal</span>
                </div>
              }
            />
            {isAdmin ? (
              <Tab
                key="users"
                title={
                  <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4" />
                    <span>Utilisateurs</span>
                    <Chip size="sm" variant="flat" className="bg-gray-100">
                      {profiles.length}
                    </Chip>
                  </div>
                }
              />
            ) : null}
          </Tabs>
        )}

        {loadError && (
          <div
            role="alert"
            className="mt-6 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onKeyDown={(e) => {
            if (e.key === "Escape") setDeleteConfirm(null);
          }}
        >
          <div className="bg-white shadow-xl p-6 max-w-md mx-4">
            <h3
              id="delete-dialog-title"
              className="text-lg font-bold text-edf-bleu-nuit mb-2"
            >
              Supprimer &laquo; {deleteConfirm.name} &raquo; ?
            </h3>
            <p
              id="delete-dialog-desc"
              className="text-edf-gris-fonce text-sm mb-6"
            >
              L&apos;élément sera retiré immédiatement. Vous pourrez annuler
              la suppression pendant 5 secondes.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 min-h-[44px] text-edf-bleu-nuit bg-edf-gris-clair hover:bg-gray-300 transition-colors font-medium"
                autoFocus
              >
                Garder
              </button>
              <button
                onClick={onConfirmDelete}
                className="px-4 py-2 min-h-[44px] text-white bg-red-600 hover:bg-red-700 transition-colors font-semibold"
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
