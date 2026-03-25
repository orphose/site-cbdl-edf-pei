"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import {
  Newspaper,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  Save,
  Check,
  Linkedin,
  Hash,
  X,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { generateSlug } from "@/hooks/useNewsManager";
import type {
  News,
  NewsFormData,
  LinkedInShareState,
  ViewMode,
} from "@/types/admin";
import MediaUploader, { GalleryUploader } from "@/components/admin/MediaUploader";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import AIGenerator from "@/components/admin/AIGenerator";

interface NewsEditorProps {
  news: News[];
  viewMode: ViewMode;
  editingNews: News | null;
  newsForm: NewsFormData;
  setNewsForm: (form: NewsFormData) => void;
  linkedInShare: LinkedInShareState;
  setLinkedInShare: (state: LinkedInShareState) => void;
  saving: boolean;
  saveSuccess: boolean;
  saveError: string | null;
  uploading: boolean;
  uploadProgress: number;
  uploadError: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  onCreateNews: () => void;
  onEditNews: (item: News) => void;
  onDeleteNews: (id: string) => void;
  onSaveNews: () => void;
  onBackToList: () => void;
  onNewsFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveGalleryPhoto: (index: number) => void;
  onAddHashtag: () => void;
  onRemoveHashtag: (tag: string) => void;
}

export default function NewsEditor({
  news,
  viewMode,
  editingNews,
  newsForm,
  setNewsForm,
  linkedInShare,
  setLinkedInShare,
  saving,
  saveSuccess,
  saveError,
  uploading,
  uploadProgress,
  uploadError,
  fileInputRef,
  galleryInputRef,
  onCreateNews,
  onEditNews,
  onDeleteNews,
  onSaveNews,
  onBackToList,
  onNewsFileSelect,
  onGalleryFileSelect,
  onRemoveGalleryPhoto,
  onAddHashtag,
  onRemoveHashtag,
}: NewsEditorProps) {
  if (viewMode === "list") {
    return <NewsList news={news} onCreateNews={onCreateNews} onEditNews={onEditNews} onDeleteNews={onDeleteNews} />;
  }

  return (
    <NewsForm
      editingNews={editingNews}
      newsForm={newsForm}
      setNewsForm={setNewsForm}
      linkedInShare={linkedInShare}
      setLinkedInShare={setLinkedInShare}
      saving={saving}
      saveSuccess={saveSuccess}
      saveError={saveError}
      uploading={uploading}
      uploadProgress={uploadProgress}
      uploadError={uploadError}
      fileInputRef={fileInputRef}
      galleryInputRef={galleryInputRef}
      onSaveNews={onSaveNews}
      onBackToList={onBackToList}
      onNewsFileSelect={onNewsFileSelect}
      onGalleryFileSelect={onGalleryFileSelect}
      onRemoveGalleryPhoto={onRemoveGalleryPhoto}
      onAddHashtag={onAddHashtag}
      onRemoveHashtag={onRemoveHashtag}
    />
  );
}

// --- News List ---

function NewsList({
  news,
  onCreateNews,
  onEditNews,
  onDeleteNews,
}: {
  news: News[];
  onCreateNews: () => void;
  onEditNews: (item: News) => void;
  onDeleteNews: (id: string) => void;
}) {
  return (
    <Card className="mt-6 border border-gray-100 shadow-sm">
      <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Gestion des actualités
          </h2>
          <p className="text-sm text-gray-500">
            Créez et gérez vos actualités
          </p>
        </div>
        <Button
          className="bg-edf-blue text-white font-medium"
          startContent={<Plus className="w-4 h-4" />}
          onPress={onCreateNews}
        >
          Nouvelle actualité
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        {news.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-edf-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-edf-blue" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Publiez votre première actualité
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Les actualités apparaîtront sur la page d&apos;accueil et la
              section Actualités du site.
            </p>
            <Button
              onPress={onCreateNews}
              className="bg-edf-blue text-white"
              radius="none"
            >
              Créer une actualité
            </Button>
          </div>
        ) : (
          <Table
            aria-label="Liste des actualités"
            classNames={{
              th: "bg-gray-50 text-gray-600 font-semibold",
              td: "py-4",
            }}
          >
            <TableHeader>
              <TableColumn>TITRE</TableColumn>
              <TableColumn>STATUT</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Aucune actualité">
              {news.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.image_url && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="max-w-sm">
                        <p className="font-medium text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          /actualites/{item.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.is_published ? (
                      <Chip
                        color="success"
                        variant="flat"
                        size="sm"
                        startContent={<Eye className="w-3 h-3" />}
                      >
                        Publié
                      </Chip>
                    ) : (
                      <Chip
                        color="default"
                        variant="flat"
                        size="sm"
                        startContent={<EyeOff className="w-3 h-3" />}
                      >
                        Brouillon
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Modifier ${item.title}`}
                        onPress={() => onEditNews(item)}
                        className="text-gray-600 hover:text-edf-blue"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Supprimer ${item.title}`}
                        onPress={() => onDeleteNews(item.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
}

// --- News Form ---

function NewsForm({
  editingNews,
  newsForm,
  setNewsForm,
  linkedInShare,
  setLinkedInShare,
  saving,
  saveSuccess,
  saveError,
  uploading,
  uploadProgress,
  uploadError,
  fileInputRef,
  galleryInputRef,
  onSaveNews,
  onBackToList,
  onNewsFileSelect,
  onGalleryFileSelect,
  onRemoveGalleryPhoto,
  onAddHashtag,
  onRemoveHashtag,
}: Omit<NewsEditorProps, "news" | "viewMode" | "onCreateNews" | "onEditNews" | "onDeleteNews">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              isIconOnly
              onPress={onBackToList}
              className="text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {editingNews
                  ? "Modifier l'actualité"
                  : "Nouvelle actualité"}
              </h2>
              <p className="text-sm text-gray-500">
                {editingNews
                  ? "Modifiez les informations"
                  : "Créez une nouvelle actualité"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saveError && (
              <Chip
                color="danger"
                variant="flat"
                startContent={<AlertCircle className="w-4 h-4" />}
              >
                {saveError}
              </Chip>
            )}
            {saveSuccess && (
              <Chip
                color="success"
                variant="flat"
                startContent={<Check className="w-4 h-4" />}
              >
                Enregistré
              </Chip>
            )}
            <Button
              className="bg-edf-blue text-white font-medium"
              startContent={saving ? null : <Save className="w-4 h-4" />}
              onPress={onSaveNews}
              isLoading={saving}
              isDisabled={!newsForm.title}
            >
              {editingNews ? "Enregistrer" : "Créer"}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          {/* Mini navigation par section */}
          <div className="flex gap-4 mb-6 text-sm">
            <a href="#section-contenu" className="text-edf-blue hover:underline">
              Contenu
            </a>
            <a href="#section-medias" className="text-edf-blue hover:underline">
              Médias
            </a>
            <a
              href="#section-publication"
              className="text-edf-blue hover:underline"
            >
              Publication
            </a>
          </div>

          {/* Assistant IA */}
          <AIGenerator
            type="news"
            description={
              <>Décrivez le sujet, l&apos;IA génère <strong>titre + résumé + contenu</strong></>
            }
            placeholder="Ex: Inauguration de la centrale prévue en 2025 avec présence du préfet, mise en service progressive, création de 50 emplois locaux..."
            onGenerateNews={(data) => {
              setNewsForm({
                ...newsForm,
                title: data.title || newsForm.title,
                slug: data.slug || newsForm.slug,
                excerpt: data.excerpt || newsForm.excerpt,
                content: data.content || newsForm.content,
              });
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              <div
                id="section-contenu"
                className="border-b border-gray-200 pb-2 mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-800">Contenu</h3>
              </div>

              <div>
                <label
                  htmlFor="news-title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Titre <span className="text-red-500">*</span>
                </label>
                <Input
                  id="news-title"
                  placeholder="Titre de l'actualité"
                  value={newsForm.title}
                  onChange={(e) => {
                    setNewsForm({
                      ...newsForm,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  size="lg"
                  classNames={{
                    inputWrapper: "bg-gray-50 border border-gray-200",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="news-slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Slug (URL)
                </label>
                <Input
                  id="news-slug"
                  placeholder="titre-de-lactualite"
                  value={newsForm.slug}
                  onChange={(e) =>
                    setNewsForm({ ...newsForm, slug: e.target.value })
                  }
                  classNames={{
                    inputWrapper: "bg-gray-50 border border-gray-200",
                  }}
                />
                <p className="text-xs text-gray-400 mt-1">
                  URL : /actualites/{newsForm.slug || "..."}
                </p>
              </div>

              <div>
                <label
                  htmlFor="news-excerpt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Extrait
                </label>
                <textarea
                  id="news-excerpt"
                  placeholder="Résumé court affiché dans les listes"
                  value={newsForm.excerpt}
                  onChange={(e) => {
                    if (e.target.value.length <= 300)
                      setNewsForm({ ...newsForm, excerpt: e.target.value });
                  }}
                  rows={3}
                  maxLength={300}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-y"
                />
                <p
                  className={`text-xs mt-1 ${
                    newsForm.excerpt.length > 260
                      ? "text-orange-500"
                      : "text-gray-400"
                  }`}
                >
                  {newsForm.excerpt.length}/300 caractères
                </p>
              </div>

              <MarkdownEditor
                content={newsForm.content}
                onChange={(content) =>
                  setNewsForm({ ...newsForm, content })
                }
              />
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              <div
                id="section-medias"
                className="border-b border-gray-200 pb-2 mb-6 mt-8"
              >
                <h3 className="text-lg font-semibold text-gray-800">Médias</h3>
              </div>

              <MediaUploader
                imageUrl={newsForm.image_url}
                onClear={() =>
                  setNewsForm({ ...newsForm, image_url: "" })
                }
                fileInputRef={fileInputRef}
                onFileSelect={onNewsFileSelect}
                uploading={uploading}
                uploadProgress={uploadProgress}
                uploadError={uploadError}
                label="Image de couverture"
              />

              <GalleryUploader
                gallery={newsForm.gallery}
                onRemove={onRemoveGalleryPhoto}
                galleryInputRef={galleryInputRef}
                onFileSelect={onGalleryFileSelect}
              />

              <div
                id="section-publication"
                className="border-b border-gray-200 pb-2 mb-6 mt-8"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Publication & Partage
                </h3>
              </div>

              {/* Publication toggle */}
              <div
                role="switch"
                aria-checked={newsForm.is_published}
                tabIndex={0}
                className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() =>
                  setNewsForm({
                    ...newsForm,
                    is_published: !newsForm.is_published,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setNewsForm({
                      ...newsForm,
                      is_published: !newsForm.is_published,
                    });
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Publier</p>
                    <p className="text-sm text-gray-500">Visible sur le site</p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                      newsForm.is_published ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        newsForm.is_published
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn share */}
              <LinkedInSharePanel
                linkedInShare={linkedInShare}
                setLinkedInShare={setLinkedInShare}
                newsContent={newsForm.content}
                onAddHashtag={onAddHashtag}
                onRemoveHashtag={onRemoveHashtag}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// --- LinkedIn Share Panel ---

function LinkedInSharePanel({
  linkedInShare,
  setLinkedInShare,
  newsContent,
  onAddHashtag,
  onRemoveHashtag,
}: {
  linkedInShare: LinkedInShareState;
  setLinkedInShare: (state: LinkedInShareState) => void;
  newsContent: string;
  onAddHashtag: () => void;
  onRemoveHashtag: (tag: string) => void;
}) {
  return (
    <div className="border border-[#0A66C2]/20 rounded-xl overflow-hidden">
      <div
        role="switch"
        aria-checked={linkedInShare.enabled}
        tabIndex={0}
        className={`p-4 cursor-pointer transition-colors ${
          linkedInShare.enabled
            ? "bg-[#0A66C2]/10"
            : "bg-gray-50 hover:bg-gray-100"
        }`}
        onClick={() =>
          setLinkedInShare({
            ...linkedInShare,
            enabled: !linkedInShare.enabled,
          })
        }
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setLinkedInShare({
              ...linkedInShare,
              enabled: !linkedInShare.enabled,
            });
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                linkedInShare.enabled ? "bg-[#0A66C2]" : "bg-gray-200"
              }`}
            >
              <Linkedin
                className={`w-4 h-4 ${
                  linkedInShare.enabled ? "text-white" : "text-gray-500"
                }`}
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Partager sur LinkedIn
              </p>
              <p className="text-xs text-gray-500">
                Ouvre une fenêtre pré-remplie
              </p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
              linkedInShare.enabled ? "bg-[#0A66C2]" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                linkedInShare.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      {linkedInShare.enabled && (
        <div className="p-4 border-t border-[#0A66C2]/20 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Texte du post (optionnel)
            </label>
            <textarea
              placeholder="Par défaut : le contenu de l'actualité sera utilisé"
              value={linkedInShare.customText}
              onChange={(e) =>
                setLinkedInShare({
                  ...linkedInShare,
                  customText: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 focus:border-[#0A66C2] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Hashtags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {linkedInShare.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#0A66C2]/10 text-[#0A66C2] text-xs rounded-full"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => onRemoveHashtag(tag)}
                    className="ml-0.5 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {linkedInShare.hashtags.length < 10 && (
              <div className="flex gap-2">
                <Input
                  size="sm"
                  placeholder="Ajouter un hashtag"
                  value={linkedInShare.newHashtag}
                  onChange={(e) =>
                    setLinkedInShare({
                      ...linkedInShare,
                      newHashtag: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onAddHashtag();
                    }
                  }}
                  startContent={
                    <Hash className="w-3 h-3 text-gray-400" />
                  }
                  classNames={{
                    inputWrapper: "h-8 bg-white border border-gray-200",
                    input: "text-xs",
                  }}
                />
                <Button
                  size="sm"
                  variant="flat"
                  className="h-8 min-w-8 bg-[#0A66C2]/10 text-[#0A66C2]"
                  isIconOnly
                  onPress={onAddHashtag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
            <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Aperçu du post
            </p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap">
              {linkedInShare.customText ||
                newsContent ||
                "Votre texte apparaîtra ici..."}
              {linkedInShare.hashtags.length > 0 && (
                <>
                  {"\n\n"}
                  <span className="text-[#0A66C2]">
                    {linkedInShare.hashtags.map((h) => `#${h}`).join(" ")}
                  </span>
                </>
              )}
            </p>
          </div>

          <p className="text-xs text-gray-400 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            Ouvrira LinkedIn dans un nouvel onglet
          </p>
        </div>
      )}
    </div>
  );
}
