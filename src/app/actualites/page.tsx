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
        camaieu="orange"
      />

      <section className="section-padding bg-edf-blanc-bleute">
        <div className="container-custom">
          {error && (
            <div role="alert" className="text-center py-20">
              <h2 className="text-2xl font-bold text-edf-bleu-nuit mb-3">
                Impossible de charger les actualités
              </h2>
              <p className="text-edf-gris-fonce mb-8 max-w-md mx-auto">
                Un problème est survenu lors du chargement. Veuillez réessayer
                dans quelques instants.
              </p>
            </div>
          )}

          {!error && news.length === 0 && (
            <div className="text-center py-20">
              <div
                className="w-24 h-24 bg-edf-blanc-bleute flex items-center justify-center mx-auto mb-6"
                aria-hidden="true"
              >
                <Calendar className="w-12 h-12 text-edf-blue" />
              </div>
              <h2 className="text-2xl font-bold text-edf-bleu-nuit mb-4">
                Aucune actualité pour le moment
              </h2>
              <p className="text-edf-gris-fonce max-w-md mx-auto mb-8">
                Les prochaines actualités du projet seront publiées ici.
                En attendant, découvrez la centrale et son chantier.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/centrale"
                  className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] bg-edf-bleu-action text-white font-semibold hover:bg-edf-blue transition-colors"
                >
                  Découvrir la centrale
                </Link>
                <Link
                  href="/chantier"
                  className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] border-2 border-edf-bleu-nuit text-edf-bleu-nuit font-semibold hover:bg-edf-bleu-nuit hover:text-white transition-colors"
                >
                  Suivre le chantier
                </Link>
              </div>
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
                        {/* Label date — hiérarchie tertiaire (Wathan § Hierarchy) */}
                        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-edf-gris-fonce mb-3">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{formatDate(item.published_at)}</span>
                        </p>

                        {/* Titre — hiérarchie primaire */}
                        <h3 className="text-lg font-bold text-edf-bleu-nuit mb-3 group-hover:text-edf-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Extrait — hiérarchie secondaire */}
                        {item.excerpt && (
                          <p className="text-edf-gris-fonce text-sm line-clamp-3 mb-4">
                            {item.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-edf-orange-dark font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>Lire la suite</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
