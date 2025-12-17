"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardFooter, Button, Skeleton } from "@nextui-org/react";
import { Calendar, ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import type { News } from "@/lib/database.types";

// Client Supabase côté client
const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

/**
 * Section Actualités - Section 8
 * Affiche les 3 dernières actualités depuis Supabase
 */
export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement des actualités au montage
  useEffect(() => {
    async function loadNews() {
      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

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

  // Assertions de validation
  console.assert(news.length <= 3, "Maximum 3 actualités affichées");
  console.assert(typeof loading === "boolean", "Loading doit être un booléen");

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-medium mb-4">
              Actualités
            </span>
            <h2 className="heading-lg text-black uppercase max-w-[65%]">
              Nos dernières <span className="text-edf-orange">actualités</span>
            </h2>
          </div>
          <Link href="/actualites">
          <Button
            className="bg-edf-blue text-white font-medium hover:bg-edf-blue-light transition-all"
            radius="none"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Toutes les actualités
          </Button>
          </Link>
        </motion.div>

        {/* Grille d'actualités */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton de chargement
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="h-full bg-white border border-gray-100">
                <Skeleton className="aspect-video rounded-none" />
                <CardBody className="p-6">
                  <Skeleton className="w-32 h-4 mb-3 rounded" />
                  <Skeleton className="w-full h-6 mb-3 rounded" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                </CardBody>
              </Card>
            ))
          ) : news.length === 0 ? (
            // Message si pas d'actualités
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Aucune actualité pour le moment.</p>
            </div>
          ) : (
            // Affichage des actualités
            news.map((item, index) => (
            <motion.div
                key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
                <Link href={`/actualites/${item.slug}`}>
                  <Card className="h-full card-hover bg-white border border-gray-100 shadow-sm cursor-pointer">
                    {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-400 text-sm">📷 Image actualité</p>
                  </div>
                      )}
                  {/* Badge catégorie */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-edf-blue text-white text-xs font-medium">
                        Actualité
                  </span>
                </div>

                <CardBody className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.published_at)}</span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
                        {item.title}
                  </h3>

                  {/* Extrait */}
                  <p className="text-gray-600 text-sm line-clamp-2">
                        {item.excerpt || ""}
                  </p>
                </CardBody>

                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="light"
                    className="text-edf-orange font-medium p-0 h-auto hover:text-edf-orange-light"
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Lire la suite
                  </Button>
                </CardFooter>
              </Card>
                </Link>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
