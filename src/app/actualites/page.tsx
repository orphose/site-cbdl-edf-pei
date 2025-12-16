"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { Calendar, ArrowRight, ChevronDown } from "lucide-react";
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
    <div>
      {/* Hero Section - Conforme aux autres pages */}
      <section className="relative min-h-[85vh] flex items-center bg-edf-blue overflow-hidden pt-[100px]">
        {/* Fond avec motif géométrique */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 60%),
                linear-gradient(-30deg, transparent 40%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 60%)
              `,
              backgroundSize: "60px 100px",
            }}
          />
        </div>

        {/* Cercles décoratifs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-edf-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-edf-orange/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-medium mb-8 border border-white/20">
                Actualités & Événements
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
            >
              ACTUALITÉS
            </motion.h1>

            {/* Sous-titre */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/90 font-light mb-8"
            >
              Toute l&apos;actualité du{" "}
              <span className="text-edf-orange font-semibold">projet</span>{" "}
              <span className="text-edf-green font-semibold">CBDL</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Suivez les{" "}
              <span className="text-white font-semibold">dernières avancées</span>{" "}
              de la Centrale Bioénergie du Larivot et restez informé des événements importants.
            </motion.p>

            {/* Indicateur de scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 text-white/50 text-sm"
              >
                <span>Découvrir</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Barre décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-edf-orange" />
          <div className="flex-1 bg-edf-green" />
          <div className="flex-1 bg-white/20" />
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

