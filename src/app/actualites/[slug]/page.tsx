"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Skeleton } from "@nextui-org/react";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
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

