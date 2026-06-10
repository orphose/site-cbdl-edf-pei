"use client";

import { useState, useMemo } from "react";
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
  Pagination,
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
  Tag,
  Search,
  CalendarClock,
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

const NEWS_PAGE_SIZE = 8;
type NewsStatusFilter = "all" | "published" | "draft";

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
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<NewsStatusFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return news.filter((item) => {
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.tags ?? []).some((t) => t.toLowerCase().includes(q));
      const matchesStatus =
        status === "all" ||
        (status === "published" && item.is_published) ||
        (status === "draft" && !item.is_published);
      return matchesQuery && matchesStatus;
    });
  }, [news, query, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / NEWS_PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (safePage - 1) * NEWS_PAGE_SIZE,
    safePage * NEWS_PAGE_SIZE
  );

  const resetPage = () => setPage(1);

  return (
    <Card radius="none" shadow="none" className="mt-6 border border-edf-gris-clair">
      <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-edf-gris-clair">
        <div>
          <h2 className="text-lg font-bold text-edf-bleu-nuit">
            Gestion des actualités
          </h2>
          <p className="text-sm text-edf-bleu-nuit/60">
            Créez et gérez vos actualités
          </p>
        </div>
        <Button
          radius="none"
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
            <div className="w-16 h-16 bg-edf-blanc-bleute flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-edf-blue" />
            </div>
            <h3 className="text-lg font-bold text-edf-bleu-nuit mb-2">
              Publiez votre première actualité
            </h3>
            <p className="text-edf-bleu-nuit/60 text-sm mb-6 max-w-md mx-auto">
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
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 border-b border-edf-gris-clair">
              <Input
                aria-label="Rechercher une actualité"
                size="sm"
                placeholder="Rechercher (titre, slug, étiquette)…"
                value={query}
                onValueChange={(v) => {
                  setQuery(v);
                  resetPage();
                }}
                startContent={<Search className="w-4 h-4 text-edf-bleu-nuit/40" />}
                isClearable
                onClear={() => {
                  setQuery("");
                  resetPage();
                }}
                classNames={{
                  inputWrapper: "bg-white border border-edf-gris-clair rounded-none",
                  base: "sm:max-w-xs",
                }}
              />
              <div className="flex gap-1">
                {(
                  [
                    ["all", "Toutes"],
                    ["published", "Publiées"],
                    ["draft", "Brouillons"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={status === key}
                    onClick={() => {
                      setStatus(key);
                      resetPage();
                    }}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      status === key
                        ? "bg-edf-blue text-white font-medium"
                        : "bg-edf-blanc-bleute text-edf-bleu-nuit/70 hover:bg-edf-gris-clair"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-edf-bleu-nuit/50 sm:ml-auto">
                {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
              </span>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-14 text-edf-bleu-nuit/60 text-sm">
                Aucune actualité ne correspond à ces critères.
              </div>
            ) : (
              <Table
                aria-label="Liste des actualités"
                classNames={{
                  wrapper: "rounded-none shadow-none",
                  th: "bg-edf-blanc-bleute text-edf-bleu-nuit/70 font-semibold first:rounded-none last:rounded-none",
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
              {pageItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-edf-blanc-bleute/60">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.image_url && (
                        <div className="w-12 h-12 overflow-hidden bg-edf-blanc-bleute flex-shrink-0">
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
                        <p className="font-medium text-edf-bleu-nuit truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-edf-bleu-nuit/50 truncate">
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
                        radius="none"
                        startContent={<Eye className="w-3 h-3" />}
                      >
                        Publié
                      </Chip>
                    ) : (
                      <Chip
                        color="default"
                        variant="flat"
                        size="sm"
                        radius="none"
                        startContent={<EyeOff className="w-3 h-3" />}
                      >
                        Brouillon
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-edf-bleu-nuit/60">
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
                        radius="none"
                        className="text-edf-bleu-nuit/60 hover:text-edf-bleu-action"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Supprimer ${item.title}`}
                        onPress={() => onDeleteNews(item.id)}
                        radius="none"
                        className="text-edf-bleu-nuit/60 hover:text-red-600"
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
            {pageCount > 1 && (
              <div className="flex justify-center py-4 border-t border-edf-gris-clair">
                <Pagination
                  total={pageCount}
                  page={safePage}
                  onChange={setPage}
                  size="sm"
                  classNames={{ cursor: "bg-edf-blue rounded-none", item: "rounded-none" }}
                />
              </div>
            )}
          </div>
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
      <Card radius="none" shadow="none" className="border border-edf-gris-clair">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-edf-gris-clair">
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              isIconOnly
              onPress={onBackToList}
              radius="none"
              className="text-edf-bleu-nuit/60"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-lg font-bold text-edf-bleu-nuit">
                {editingNews
                  ? "Modifier l'actualité"
                  : "Nouvelle actualité"}
              </h2>
              <p className="text-sm text-edf-bleu-nuit/60">
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
              radius="none"
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
            <a href="#section-contenu" className="text-edf-bleu-action hover:underline">
              Contenu
            </a>
            <a href="#section-medias" className="text-edf-bleu-action hover:underline">
              Médias
            </a>
            <a
              href="#section-publication"
              className="text-edf-bleu-action hover:underline"
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
                className="border-b border-edf-gris-clair pb-2 mb-6"
              >
                <h3 className="text-lg font-semibold text-edf-bleu-nuit">Contenu</h3>
              </div>

              <div>
                <label
                  htmlFor="news-title"
                  className="block text-sm font-medium text-edf-bleu-nuit mb-2"
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
                    inputWrapper: "bg-white border border-edf-gris-clair rounded-none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="news-slug"
                  className="block text-sm font-medium text-edf-bleu-nuit mb-2"
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
                    inputWrapper: "bg-white border border-edf-gris-clair rounded-none",
                  }}
                />
                <p className="text-xs text-edf-bleu-nuit/50 mt-1">
                  URL : /actualites/{newsForm.slug || "..."}
                </p>
              </div>

              <div>
                <label
                  htmlFor="news-excerpt"
                  className="block text-sm font-medium text-edf-bleu-nuit mb-2"
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
                  className="w-full px-4 py-3 bg-white border border-edf-gris-clair text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action resize-y"
                />
                <p
                  className={`text-xs mt-1 ${
                    newsForm.excerpt.length > 260
                      ? "text-edf-orange-text"
                      : "text-edf-bleu-nuit/50"
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

              {/* Étiquettes */}
              <TagsField
                tags={newsForm.tags}
                onChange={(tags) => setNewsForm({ ...newsForm, tags })}
              />

              {/* Référencement (SEO) */}
              <SeoFields newsForm={newsForm} setNewsForm={setNewsForm} />
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              <div
                id="section-medias"
                className="border-b border-edf-gris-clair pb-2 mb-6 mt-8"
              >
                <h3 className="text-lg font-semibold text-edf-bleu-nuit">Médias</h3>
              </div>

              <MediaUploader
                imageUrl={newsForm.image_url}
                onClear={() =>
                  setNewsForm({ ...newsForm, image_url: "", image_alt: "" })
                }
                fileInputRef={fileInputRef}
                onFileSelect={onNewsFileSelect}
                uploading={uploading}
                uploadProgress={uploadProgress}
                uploadError={uploadError}
                label="Image de couverture"
                altValue={newsForm.image_alt}
                onAltChange={(image_alt) =>
                  setNewsForm({ ...newsForm, image_alt })
                }
              />

              <GalleryUploader
                gallery={newsForm.gallery}
                onRemove={onRemoveGalleryPhoto}
                galleryInputRef={galleryInputRef}
                onFileSelect={onGalleryFileSelect}
              />

              <div
                id="section-publication"
                className="border-b border-edf-gris-clair pb-2 mb-6 mt-8"
              >
                <h3 className="text-lg font-semibold text-edf-bleu-nuit">
                  Publication & Partage
                </h3>
              </div>

              {/* Publication toggle */}
              <div
                role="switch"
                aria-checked={newsForm.is_published}
                tabIndex={0}
                className="p-4 bg-edf-blanc-bleute cursor-pointer hover:bg-edf-gris-clair/50 transition-colors"
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
                    <p className="font-medium text-edf-bleu-nuit">Publier</p>
                    <p className="text-sm text-edf-bleu-nuit/60">Visible sur le site</p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                      newsForm.is_published ? "bg-edf-green-dark" : "bg-edf-gris-clair"
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

              {/* Publication programmée (visible si publié) */}
              {newsForm.is_published && (
                <div>
                  <label
                    htmlFor="news-published-at"
                    className="text-sm font-medium text-edf-bleu-nuit mb-2 flex items-center gap-1.5"
                  >
                    <CalendarClock className="w-4 h-4 text-edf-bleu-nuit/50" />
                    Date de publication
                  </label>
                  <input
                    id="news-published-at"
                    type="datetime-local"
                    value={newsForm.published_at}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, published_at: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-edf-gris-clair text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action"
                  />
                  <p className="text-xs text-edf-bleu-nuit/50 mt-1">
                    Laissez vide pour publier immédiatement. Une date future
                    programme l&apos;article : il apparaîtra à cette date.
                  </p>
                </div>
              )}

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

// --- Tags ---

function TagsField({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/^#/, "").toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 12) {
      onChange([...tags, tag]);
    }
  };

  return (
    <div>
      <label
        htmlFor="news-tag-input"
        className="text-sm font-medium text-edf-bleu-nuit mb-2 flex items-center gap-1.5"
      >
        <Tag className="w-4 h-4 text-edf-bleu-nuit/50" />
        Étiquettes
      </label>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-edf-blue/10 text-edf-blue text-xs font-medium"
            >
              #{tag}
              <button
                type="button"
                aria-label={`Retirer ${tag}`}
                onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="ml-0.5 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      {tags.length < 12 && (
        <Input
          id="news-tag-input"
          size="sm"
          placeholder="Ajouter une étiquette, puis Entrée"
          startContent={<Hash className="w-3 h-3 text-edf-bleu-nuit/40" />}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const target = e.target as HTMLInputElement;
              addTag(target.value);
              target.value = "";
            }
          }}
          classNames={{
            inputWrapper: "bg-white border border-edf-gris-clair rounded-none",
          }}
        />
      )}
    </div>
  );
}

// --- SEO ---

function SeoFields({
  newsForm,
  setNewsForm,
}: {
  newsForm: NewsFormData;
  setNewsForm: (form: NewsFormData) => void;
}) {
  return (
    <div className="border border-edf-gris-clair">
      <div className="flex items-center gap-2 px-4 py-3 bg-edf-blanc-bleute border-b border-edf-gris-clair">
        <Search className="w-4 h-4 text-edf-bleu-nuit/60" />
        <h4 className="text-sm font-semibold text-edf-bleu-nuit">Référencement (SEO)</h4>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label
            htmlFor="news-seo-title"
            className="block text-xs font-medium text-edf-bleu-nuit/70 mb-1.5"
          >
            Titre SEO{" "}
            <span className="text-edf-bleu-nuit/50">— défaut : le titre de l&apos;article</span>
          </label>
          <Input
            id="news-seo-title"
            size="sm"
            placeholder={newsForm.title || "Titre affiché dans Google"}
            value={newsForm.seo_title}
            onChange={(e) =>
              setNewsForm({ ...newsForm, seo_title: e.target.value })
            }
            classNames={{ inputWrapper: "bg-white border border-edf-gris-clair rounded-none" }}
          />
        </div>
        <div>
          <label
            htmlFor="news-seo-desc"
            className="block text-xs font-medium text-edf-bleu-nuit/70 mb-1.5"
          >
            Méta-description{" "}
            <span className="text-edf-bleu-nuit/50">— défaut : l&apos;extrait</span>
          </label>
          <textarea
            id="news-seo-desc"
            placeholder={newsForm.excerpt || "Description affichée dans les résultats de recherche"}
            value={newsForm.seo_description}
            onChange={(e) => {
              if (e.target.value.length <= 160)
                setNewsForm({ ...newsForm, seo_description: e.target.value });
            }}
            rows={2}
            maxLength={160}
            className="w-full px-3 py-2 bg-white border border-edf-gris-clair text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action resize-none"
          />
          <p className="text-xs text-edf-bleu-nuit/50 mt-1">
            {newsForm.seo_description.length}/160 caractères
          </p>
        </div>
        <div>
          <label
            htmlFor="news-og-image"
            className="block text-xs font-medium text-edf-bleu-nuit/70 mb-1.5"
          >
            Image de partage (OpenGraph){" "}
            <span className="text-edf-bleu-nuit/50">— défaut : l&apos;image de couverture</span>
          </label>
          <Input
            id="news-og-image"
            size="sm"
            placeholder="https://… (optionnel)"
            value={newsForm.og_image}
            onChange={(e) =>
              setNewsForm({ ...newsForm, og_image: e.target.value })
            }
            classNames={{ inputWrapper: "bg-white border border-edf-gris-clair rounded-none" }}
          />
        </div>
      </div>
    </div>
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
    <div className="border border-edf-gris-clair">
      <div
        role="switch"
        aria-checked={linkedInShare.enabled}
        tabIndex={0}
        className={`p-4 cursor-pointer transition-colors ${
          linkedInShare.enabled
            ? "bg-[#0A66C2]/10"
            : "bg-edf-blanc-bleute hover:bg-edf-gris-clair/50"
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
              className={`w-8 h-8 flex items-center justify-center ${
                linkedInShare.enabled ? "bg-[#0A66C2]" : "bg-edf-gris-clair"
              }`}
            >
              <Linkedin
                className={`w-4 h-4 ${
                  linkedInShare.enabled ? "text-white" : "text-edf-bleu-nuit/50"
                }`}
              />
            </div>
            <div>
              <p className="font-medium text-edf-bleu-nuit">
                Partager sur LinkedIn
              </p>
              <p className="text-xs text-edf-bleu-nuit/60">
                Ouvre une fenêtre pré-remplie
              </p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
              linkedInShare.enabled ? "bg-[#0A66C2]" : "bg-edf-gris-clair"
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
            <label className="block text-xs font-medium text-edf-bleu-nuit/70 mb-1.5">
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
              className="w-full px-3 py-2 bg-white border border-edf-gris-clair text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 focus:border-[#0A66C2] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-edf-bleu-nuit/70 mb-1.5">
              Hashtags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {linkedInShare.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-medium"
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
                    <Hash className="w-3 h-3 text-edf-bleu-nuit/40" />
                  }
                  classNames={{
                    inputWrapper: "h-8 bg-white border border-edf-gris-clair rounded-none",
                    input: "text-xs",
                  }}
                />
                <Button
                  size="sm"
                  variant="flat"
                  radius="none"
                  className="h-8 min-w-8 bg-[#0A66C2]/10 text-[#0A66C2]"
                  isIconOnly
                  onPress={onAddHashtag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="p-3 bg-edf-blanc-bleute max-h-48 overflow-y-auto">
            <p className="text-xs font-medium text-edf-bleu-nuit/60 mb-2 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Aperçu du post
            </p>
            <p className="text-xs text-edf-bleu-nuit/80 whitespace-pre-wrap">
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

          <p className="text-xs text-edf-bleu-nuit/50 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            Ouvrira LinkedIn dans un nouvel onglet
          </p>
        </div>
      )}
    </div>
  );
}
