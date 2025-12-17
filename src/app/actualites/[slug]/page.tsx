"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton, Button } from "@nextui-org/react";
import { Calendar, ArrowLeft, Share2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import type { News } from "@/lib/database.types";

// Client Supabase créé côté client uniquement
const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

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

  // Chargement de l'actualité au montage
  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      
      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          setError("Configuration Supabase manquante");
          setLoading(false);
          return;
        }

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
      <div className="pt-[100px]">
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
      <div className="pt-[100px]">
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {error || "Actualité non trouvée"}
          </h1>
          <p className="text-gray-600 mb-8">
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
    <div className="pt-[100px]">
      {/* Header de l'article */}
      <section className="bg-edf-blue text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Retour */}
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux actualités
            </Link>

            {/* Date */}
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.published_at)}</span>
            </div>

            {/* Titre */}
            <h1 className="heading-lg text-white mb-6">{article.title}</h1>

            {/* Extrait */}
            {article.excerpt && (
              <p className="text-white/80 text-xl max-w-3xl">
                {article.excerpt}
              </p>
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
                className="relative aspect-video mb-12 overflow-hidden shadow-2xl"
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
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                />
              ) : (
                <p className="text-gray-500 italic">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Galerie photos</h2>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                  onClick={() => setLightboxOpen(false)}
                >
                  {/* Bouton fermer */}
                  <Button
                    isIconOnly
                    variant="light"
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
                      className="absolute left-4 text-white z-10"
                      onPress={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(lightboxIndex - 1);
                      }}
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
                      className="absolute right-4 text-white z-10"
                      onPress={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(lightboxIndex + 1);
                      }}
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
              className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between"
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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

