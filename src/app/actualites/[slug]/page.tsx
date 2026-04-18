import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/utils/supabase/server";
import type { News } from "@/lib/database.types";
import ArticleHero from "./_components/ArticleHero";
import ArticleGallery from "./_components/ArticleGallery";
import ShareButton from "./ShareButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Charge une actualité publiée à partir de son slug.
 * Retourne `null` si l'article n'existe pas ou n'est pas publié.
 */
async function fetchArticle(slug: string): Promise<News | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return (data as News | null) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    return { title: "Actualité introuvable | CBDL" };
  }

  return {
    title: `${article.title} | Actualités CBDL`,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: "article",
      images: article.image_url ? [{ url: article.image_url }] : undefined,
    },
  };
}

export default async function ActualiteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
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
              <div className="relative aspect-video mb-12 overflow-hidden shadow-xl">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 896px, 100vw"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {article.content ? (
                <div className="text-edf-bleu-nuit leading-relaxed">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-edf-gris-fonce italic">
                  Contenu non disponible.
                </p>
              )}
            </div>

            {article.gallery && article.gallery.length > 0 && (
              <ArticleGallery images={article.gallery} />
            )}

            <div className="mt-12 pt-8 border-t border-edf-gris-clair flex items-center justify-between">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 text-edf-blue hover:underline min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                Toutes les actualités
              </Link>

              <ShareButton
                title={article.title}
                excerpt={article.excerpt ?? ""}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
