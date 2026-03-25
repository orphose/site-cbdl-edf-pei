import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import PageHero from "@/components/ui/PageHero";
import type { News } from "@/lib/database.types";
import ActualitesSearch from "./ActualitesSearch";

export const metadata: Metadata = {
  title: "Actualités | CBDL EDF PEI",
  description:
    "Suivez les dernières avancées de la Centrale Bioénergie du Larivot.",
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(50);

  const news = (data as News[]) || [];

  return (
    <div>
      <PageHero
        breadcrumbLabel="Actualités"
        badge="Actualités & Événements"
        title="Actualités"
        subtitle="Toute l'actualité du projet CBDL"
        accentWord="CBDL"
        description="Suivez les dernières avancées de la Centrale Bioénergie du Larivot et restez informé des événements importants."
      />

      <section className="section-padding bg-edf-blanc-bleute">
        <div className="container-custom">
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">
                Impossible de charger les actualités
              </p>
            </div>
          )}

          {!error && news.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-edf-gris-moyen" />
              </div>
              <h2 className="text-2xl font-bold text-edf-bleu-nuit mb-4">
                Aucune actualité pour le moment
              </h2>
              <p className="text-edf-gris-moyen max-w-md mx-auto">
                Les prochaines actualités du projet seront publiées ici.
              </p>
            </div>
          )}

          {!error && news.length > 0 && (
            <>
              <ActualitesSearch newsCount={news.length} />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                  <Link key={item.id} href={`/actualites/${item.slug}`}>
                    <article className="h-full bg-white border border-edf-gris-clair hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="relative h-48 overflow-hidden">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-edf-blue to-edf-blue-mid flex items-center justify-center">
                            <span className="text-white/30 text-6xl font-bold">
                              CBDL
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-edf-gris-moyen text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(item.published_at)}</span>
                        </div>

                        <h3 className="text-lg font-bold text-edf-bleu-nuit mb-3 group-hover:text-edf-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {item.excerpt && (
                          <p className="text-edf-gris-fonce text-sm line-clamp-3 mb-4">
                            {item.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-edf-orange font-medium text-sm group-hover:gap-3 transition-all">
                          <span>Lire la suite</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
