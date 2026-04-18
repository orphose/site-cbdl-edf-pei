"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/utils/supabase/client";
import type { News } from "@/lib/database.types";
import ArticleHero from "./_components/ArticleHero";
import ArticleGallery from "./_components/ArticleGallery";
import ArticleSkeleton from "./_components/ArticleSkeleton";

/**
 * Page de détail d'une actualité — compose hero, contenu markdown et galerie.
 */
export default function ActualiteDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const shareArticle = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || "",
          url: window.location.href,
        });
      } catch {
        // Partage annulé par l'utilisateur
      }
    }
  };

  if (loading) {
    return <ArticleSkeleton />;
  }

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
      <ArticleHero
        title={article.title}
        excerpt={article.excerpt}
        publishedAt={article.published_at}
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
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
                <p className="text-edf-gris-moyen italic">Contenu non disponible.</p>
              )}
            </motion.div>

            {article.gallery && article.gallery.length > 0 && (
              <ArticleGallery images={article.gallery} />
            )}

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
