"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPublishedNews } from "@/lib/api";
import type { News } from "@/lib/database.types";

/**
 * Page des actualités
 * Affiche toutes les actualités publiées depuis Supabase
 */
export default function ActualitesPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement des actualités au montage
  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getPublishedNews(50);
        setNews(data);
      } catch (err) {
        console.error("Erreur chargement actualités:", err);
        setError("Impossible de charger les actualités");
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

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

  return (
    <div className="pt-[100px]">
      {/* Hero Section */}
      <section className="bg-edf-blue text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-semibold mb-6 uppercase tracking-wider">
              Actualités
            </span>
            <h1 className="heading-xl text-white mb-6 uppercase">
              Toute l&apos;actualité du{" "}
              <span className="text-edf-orange">projet</span>
            </h1>
            <p className="text-white/80 text-lg">
              Suivez les dernières avancées de la Centrale Bioénergie du Larivot
              et restez informé des événements importants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Liste des actualités */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* État de chargement */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-full">
                  <CardBody className="p-0">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Aucune actualité */}
          {!loading && !error && news.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Aucune actualité pour le moment
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Les prochaines actualités du projet seront publiées ici.
                Revenez bientôt !
              </p>
            </motion.div>
          )}

          {/* Liste des actualités */}
          {!loading && !error && news.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/actualites/${item.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group">
                      <CardBody className="p-0">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-edf-blue to-edf-blue-dark flex items-center justify-center">
                              <span className="text-white/30 text-6xl font-bold">
                                CBDL
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.published_at)}</span>
                          </div>

                          {/* Titre */}
                          <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-edf-blue transition-colors line-clamp-2">
                            {item.title}
                          </h3>

                          {/* Extrait */}
                          {item.excerpt && (
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                              {item.excerpt}
                            </p>
                          )}

                          {/* Lien */}
                          <div className="flex items-center gap-2 text-edf-blue font-medium text-sm group-hover:gap-3 transition-all">
                            <span>Lire la suite</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

