"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton, Button } from "@nextui-org/react";
import { Calendar, ArrowLeft, Share2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/utils/supabase/client";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { News } from "@/lib/database.types";

/**
 * Page de détail d'une actualité
 * Affiche le contenu complet d'une actualité
 */
export default function ActualiteDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // État pour la lightbox de la galerie
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Navigation clavier dans la lightbox
  const handleLightboxKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") setLightboxOpen(false);
    if (e.key === "ArrowLeft") setLightboxIndex(prev => Math.max(0, prev - 1));
    if (e.key === "ArrowRight") setLightboxIndex(prev => {
      const max = (article?.gallery?.length ?? 1) - 1;
      return Math.min(max, prev + 1);
    });
  }, [lightboxOpen, article?.gallery?.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.addEventListener("keydown", handleLightboxKeyDown);
    return () => document.removeEventListener("keydown", handleLightboxKeyDown);
  }, [lightboxOpen, handleLightboxKeyDown]);

  // Swipe support pour la lightbox mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const max = (article?.gallery?.length ?? 1) - 1;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setLightboxIndex(prev => Math.min(max, prev + 1));
      else setLightboxIndex(prev => Math.max(0, prev - 1));
    }
    touchStartX.current = null;
  };

  // Chargement de l'actualité au montage
  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      
      try {
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from("news")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (fetchError || !data) {
          setError("Actualité non trouvée");
        } else {
          setArticle(data as News);
        }
      } catch (err) {
        console.error("Erreur chargement actualité:", err);
        setError("Impossible de charger l'actualité");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  // Formatage de la date
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Partager l'article
  const shareArticle = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || "",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Partage annulé");
      }
    }
  };

  // État de chargement
  if (loading) {
    return (
      <div className="pt-[72px] md:pt-[100px]">
        <div className="container-custom py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // Erreur ou article non trouvé
  if (error || !article) {
    return (
      <div className="pt-[72px] md:pt-[100px]">
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-edf-bleu-nuit mb-4">
            {error || "Actualité non trouvée"}
          </h1>
          <p className="text-edf-gris-fonce mb-8">
            Cette actualité n&apos;existe pas ou a été supprimée.
          </p>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-edf-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] md:pt-[100px]">
      {/* Header de l'article - Design amélioré */}
      <section className="relative bg-gradient-to-br from-edf-blue via-edf-blue to-[#002855] text-white py-20 md:py-28 overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cercles décoratifs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-48 -left-24 w-80 h-80 bg-edf-orange/10 rounded-full blur-3xl" />
          
          {/* Lignes géométriques */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-edf-orange to-transparent opacity-50" />
          <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-white/20 to-transparent" />
          
          {/* Grille subtile */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Breadcrumbs items={[{ label: "Actualités", href: "/actualites" }, { label: article.title }]} />

            {/* Retour */}
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-10 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Retour aux actualités
            </Link>

            {/* Badge + Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1.5 bg-edf-orange text-white text-xs font-bold uppercase tracking-wider">
                Actualité
              </span>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Extrait avec ligne décorative */}
            {article.excerpt && (
              <div className="relative pl-6 border-l-4 border-edf-orange">
                <p className="text-white/85 text-lg md:text-xl leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}
          </motion.div>
        </div>

      </section>

      {/* Contenu de l'article */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Image principale */}
            {article.image_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-video mb-12 overflow-hidden shadow-xl"
              >
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Contenu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              {article.content ? (
                <div className="text-edf-bleu-nuit leading-relaxed">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-edf-gris-moyen italic">
                  Contenu non disponible.
                </p>
              )}
            </motion.div>

            {/* Galerie photos */}
            {article.gallery && article.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold text-edf-bleu-nuit mb-6">Galerie photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {article.gallery.map((url, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md"
                      onClick={() => {
                        setLightboxIndex(index);
                        setLightboxOpen(true);
                      }}
                    >
                      <Image
                        src={url}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
              {lightboxOpen && article.gallery && (
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Galerie photos — image ${lightboxIndex + 1} sur ${article.gallery.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                  onClick={() => setLightboxOpen(false)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Bouton fermer */}
                  <Button
                    isIconOnly
                    variant="light"
                    aria-label="Fermer la galerie"
                    className="absolute top-4 right-4 text-white z-10"
                    onPress={() => setLightboxOpen(false)}
                  >
                    <X className="w-8 h-8" />
                  </Button>

                  {/* Navigation précédent */}
                  {lightboxIndex > 0 && (
                    <Button
                      isIconOnly
                      variant="light"
                      aria-label="Image précédente"
                      className="absolute left-4 text-white z-10"
                      onPress={() => setLightboxIndex(lightboxIndex - 1)}
                    >
                      <ChevronLeft className="w-10 h-10" />
                    </Button>
                  )}

                  {/* Image */}
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={article.gallery[lightboxIndex]}
                      alt={`Photo ${lightboxIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Navigation suivant */}
                  {lightboxIndex < article.gallery.length - 1 && (
                    <Button
                      isIconOnly
                      variant="light"
                      aria-label="Image suivante"
                      className="absolute right-4 text-white z-10"
                      onPress={() => setLightboxIndex(lightboxIndex + 1)}
                    >
                      <ChevronRight className="w-10 h-10" />
                    </Button>
                  )}

                  {/* Indicateur */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                    {lightboxIndex + 1} / {article.gallery.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-edf-gris-clair flex items-center justify-between"
            >
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 text-edf-blue hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Toutes les actualités
              </Link>

              <button
                onClick={shareArticle}
                className="inline-flex items-center gap-2 px-4 py-2 bg-edf-blanc-bleute hover:bg-edf-gris-clair rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

