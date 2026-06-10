import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
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

/**
 * Rendu du corps d'article (Markdown) avec les tokens du design system :
 * titres Bleu Nuit, liens Bleu Action soulignés, texte courant à 75 %.
 * Les `#` éventuels sont rétrogradés en H2 (un seul H1 par page).
 */
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="heading-2 text-edf-bleu-nuit mt-10 mb-4">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="heading-3 text-edf-bleu-nuit mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="heading-4 text-edf-bleu-nuit mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-edf-bleu-nuit/75 leading-relaxed mb-5">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-edf-bleu-action underline underline-offset-4 hover:text-edf-blue transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-edf-bleu-nuit/75">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-edf-bleu-nuit/75">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="bg-edf-blanc-bleute px-6 py-5 mb-5 text-edf-bleu-nuit font-medium">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-edf-bleu-nuit">{children}</strong>
  ),
};

export default async function ActualiteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleHero
        title={article.title}
        excerpt={article.excerpt}
        publishedAt={article.published_at}
      />

      <section className="section bg-white" aria-label="Contenu de l'article">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {article.image_url && (
              <div className="relative aspect-video mb-12 overflow-hidden shadow-3">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 768px, 100vw"
                />
              </div>
            )}

            {article.content ? (
              <ReactMarkdown components={markdownComponents}>
                {article.content}
              </ReactMarkdown>
            ) : (
              <p className="text-edf-bleu-nuit/75 italic">
                Contenu non disponible.
              </p>
            )}

            {article.gallery && article.gallery.length > 0 && (
              <ArticleGallery images={article.gallery} />
            )}

            <div className="mt-12 pt-8 border-t border-edf-gris-clair flex flex-wrap items-center justify-between gap-4">
              <Link href="/actualites" className="link-arrow">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
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
    </>
  );
}
