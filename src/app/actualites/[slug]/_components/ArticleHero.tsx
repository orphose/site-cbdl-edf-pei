"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

export default function ArticleHero({ title, excerpt, publishedAt }: ArticleHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-edf-blue via-edf-blue to-[#002855] text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-24 w-80 h-80 bg-edf-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-edf-orange to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-white/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <Breadcrumbs
            items={[{ label: "Actualités", href: "/actualites" }, { label: title }]}
          />

          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-white/85 hover:text-white mb-10 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Retour aux actualités
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1.5 bg-edf-orange text-white text-xs font-bold uppercase tracking-wider">
              Actualité
            </span>
            <div className="flex items-center gap-2 text-white/85 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            {title}
          </h1>

          {excerpt && (
            <div className="relative pl-6 border-l-4 border-edf-orange">
              <p className="text-white/85 text-lg md:text-xl leading-relaxed">{excerpt}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
