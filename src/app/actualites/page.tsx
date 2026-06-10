import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ActualitesHeroSection from "@/components/sections/actualites/ActualitesHeroSection";
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
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .order("published_at", { ascending: false })
    .limit(50);

  const news = (data as News[]) || [];

  return (
    <>
      <ActualitesHeroSection />

      <section className="section section-alt" aria-labelledby="actualites-liste-heading">
        <div className="container-custom">
          <h2 id="actualites-liste-heading" className="sr-only">
            Toutes les actualités du projet
          </h2>

          {error && (
            <div role="alert" className="text-center py-20">
              <h3 className="heading-3 text-edf-bleu-nuit mb-3">
                Impossible de charger les actualités
              </h3>
              <p className="text-edf-bleu-nuit/75 mb-8 max-w-md mx-auto">
                Un problème est survenu lors du chargement. Veuillez réessayer
                dans quelques instants.
              </p>
            </div>
          )}

          {!error && news.length === 0 && (
            <div className="text-center py-20">
              <div
                className="w-24 h-24 bg-white border border-edf-gris-clair flex items-center justify-center mx-auto mb-6"
                aria-hidden="true"
              >
                <Calendar className="w-12 h-12 text-edf-blue" />
              </div>
              <h3 className="heading-3 text-edf-bleu-nuit mb-4">
                Aucune actualité pour le moment
              </h3>
              <p className="text-edf-bleu-nuit/75 max-w-md mx-auto mb-8">
                Les prochaines actualités du projet seront publiées ici.
                En attendant, découvrez la centrale et son chantier.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/centrale" className="btn btn-primary">
                  Découvrir la centrale
                </Link>
                <Link href="/chantier" className="btn btn-secondary">
                  Suivre le chantier
                </Link>
              </div>
            </div>
          )}

          {!error && news.length > 0 && (
            <>
              <ActualitesSearch newsCount={news.length} />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                  <article key={item.id} className="h-full">
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
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
