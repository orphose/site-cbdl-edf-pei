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
import NewsEditor from "@/components/admin/NewsEditor";
import PartnershipEditor from "@/components/admin/PartnershipEditor";
import type { useNewsManager } from "@/hooks/useNewsManager";
import type { usePartnershipManager } from "@/hooks/usePartnershipManager";

// Extract return types from the hooks
type NewsManagerReturn = ReturnType<typeof useNewsManager>;
type PartnershipManagerReturn = ReturnType<typeof usePartnershipManager>;

interface AdminDashboardProps {
  user: User;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any;
}

export default function AdminDashboard({
  user,
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
          </Tabs>
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
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3
              id="delete-dialog-title"
              className="text-lg font-bold text-gray-900 mb-2"
            >
              Supprimer &laquo; {deleteConfirm.name} &raquo; ?
            </h3>
            <p
              id="delete-dialog-desc"
              className="text-gray-600 text-sm mb-6"
            >
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                autoFocus
              >
                Annuler
              </button>
              <button
                onClick={onConfirmDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
