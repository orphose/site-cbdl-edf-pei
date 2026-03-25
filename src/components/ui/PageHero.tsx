"use client";

import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { heroAnimation } from "@/lib/motion-variants";

type ColorName = "orange" | "green" | "blue";

const COLOR_MAP: Record<ColorName, string> = {
  orange: "bg-edf-orange",
  green: "bg-edf-green",
  blue: "bg-edf-blue",
};

const CIRCLE_COLOR_MAP: Record<"orange" | "green", string> = {
  orange: "bg-edf-orange/10",
  green: "bg-edf-green/10",
};

interface PageHeroProps {
  breadcrumbLabel: string;
  badge: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  description: React.ReactNode;
  circleTopColor?: "orange" | "green";
  accentColor?: "orange" | "green";
}

export default function PageHero({
  breadcrumbLabel,
  badge,
  title,
  subtitle,
  description,
  circleTopColor = "orange",
  accentColor = "orange",
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const circleBottomColor = circleTopColor === "orange" ? "green" : "orange";

  return (
    <section className="relative min-h-[60vh] flex items-center bg-edf-blue overflow-hidden pt-[72px] md:pt-[80px]">
      {/* Fond avec motif geometrique */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
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

      {/* Cercles decoratifs */}
      <div
        className={`absolute top-20 right-20 w-96 h-96 ${CIRCLE_COLOR_MAP[circleTopColor]} rounded-full blur-3xl`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-10 left-10 w-64 h-64 ${CIRCLE_COLOR_MAP[circleBottomColor]} rounded-full blur-3xl`}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

          {/* Badge */}
          <motion.div {...heroAnimation(reduced, 0)}>
            <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-medium mb-8 border border-white/20 uppercase tracking-wide">
              {badge}
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            {...heroAnimation(reduced, 0.08)}
            className="heading-xl font-bold text-white mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Sous-titre */}
          <motion.h2
            {...heroAnimation(reduced, 0.16)}
            className="text-2xl md:text-3xl text-white/90 font-light mb-8"
          >
            {subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...heroAnimation(reduced, 0.24)}
            className="text-white/90 text-lg md:text-xl max-w-3xl leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Barre decorative en bas — camaïeu bleu + accent unique */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex" aria-hidden="true">
        <div className={`flex-[2] ${COLOR_MAP.blue}`} />
        <div className={`flex-1 ${COLOR_MAP[accentColor]}`} />
      </div>
    </section>
  );
}
