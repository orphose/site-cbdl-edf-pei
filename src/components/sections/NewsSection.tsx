"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Image from "next/image";
import type { News } from "@/lib/database.types";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Section Actualités — les 3 dernières actualités depuis Supabase.
 * Fond blanc bleuté, cards blanches, lien tertiaire Bleu Action.
 */
export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("is_published", true)
          .order("published_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setNews((data as News[]) || []);
      } catch (err) {
        console.error("Erreur chargement actualités:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="section section-alt" aria-labelledby="section-news-heading">
      <div className="container-custom">
        {/* En-tête avec action secondaire */}
        <motion.div
          {...fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
        >
          <SectionHeader
            eyebrow="Actualités"
            heading={
              <>
                Nos dernières <span className="text-edf-bleu-action">actualités</span>
              </>
            }
            id="section-news-heading"
          />
          <Link href="/actualites" className="btn btn-secondary shrink-0">
            Toutes les actualités
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Grille d'actualités */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          role={loading ? "status" : undefined}
          aria-busy={loading || undefined}
          aria-live={loading ? "polite" : undefined}
        >
          {loading ? (
            <>
              <span className="sr-only">Chargement des actualités…</span>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white border border-edf-gris-clair">
                  <div className="img-skeleton aspect-video" />
                  <div className="p-6 space-y-3">
                    <div className="img-skeleton w-32 h-4" />
                    <div className="img-skeleton w-full h-6" />
                    <div className="img-skeleton w-3/4 h-4" />
                  </div>
                </div>
              ))}
            </>
          ) : news.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-edf-bleu-nuit/75">Aucune actualité pour le moment.</p>
            </div>
          ) : (
            news.map((item, index) => (
              <motion.article
                key={item.id}
                {...fadeInUpDelay(index * 0.05)}
                className="h-full"
              >
                <Link
                  href={`/actualites/${item.slug}`}
                  className="card-edf group flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="aspect-video bg-edf-blanc-bleute relative overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-caption">Image à venir</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    {/* Date */}
                    <p className="flex items-center gap-2 text-caption mb-3">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <time dateTime={item.published_at ?? undefined}>
                        {formatDate(item.published_at)}
                      </time>
                    </p>

                    {/* Titre */}
                    <h3 className="text-lg font-semibold leading-snug text-edf-bleu-nuit mb-2 line-clamp-2 group-hover:text-edf-bleu-action transition-colors">
                      {item.title}
                    </h3>

                    {/* Extrait */}
                    <p className="text-edf-bleu-nuit/75 text-sm line-clamp-2 mb-4">
                      {item.excerpt || ""}
                    </p>

                    {/* Lien tertiaire */}
                    <span className="link-arrow mt-auto text-sm">
                      Lire la suite
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
