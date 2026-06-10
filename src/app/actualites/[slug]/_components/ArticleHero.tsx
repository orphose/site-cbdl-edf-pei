import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

interface ArticleHeroProps {
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Hero d'article — dégradé mono-camaïeu bleu (charte p.19) + motif
 * baguette subtil (p.44-46). Texte blanc, métadonnées en white/80.
 */
export default function ArticleHero({ title, excerpt, publishedAt }: ArticleHeroProps) {
  return (
    <section className="relative overflow-hidden gradient-bleu pt-16 md:pt-20">
      {/* Motif baguette — subtil, côté droit */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Image
          src="/images/charte/motifs/motif-bleu.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
      </div>

      <div className="container-custom relative z-10 py-14 md:py-20">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Actualités", href: "/actualites" }, { label: title }]}
          />

          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-white/85 hover:text-white underline-offset-4 hover:underline transition-colors hero-fade-in"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Retour aux actualités
          </Link>

          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 mb-5 hero-fade-in"
            style={{ animationDelay: "0.08s" }}
          >
            <p className="eyebrow eyebrow--on-dark">Actualité</p>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={publishedAt ?? undefined}>{formatDate(publishedAt)}</time>
            </p>
          </div>

          <h1
            className="heading-1 text-white hero-fade-in"
            style={{ animationDelay: "0.16s" }}
          >
            {title}
          </h1>

          {excerpt && (
            <p
              className="text-lead text-white/85 border-l-4 border-white/70 pl-5 mt-6 hero-fade-in"
              style={{ animationDelay: "0.24s" }}
            >
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
