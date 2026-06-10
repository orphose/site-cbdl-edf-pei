"use client";

import { motion } from "framer-motion";
import { Wind, Leaf, CloudOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/media";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInUpDelay } from "@/lib/motion-variants";

const KEY_POINTS = [
  { icon: Leaf, label: "Biocombustibles" },
  { icon: CloudOff, label: "Carbone neutre" },
  { icon: Wind, label: "Zéro SO₂" },
];

/**
 * Section Qualité de l'air — moment fort de la page.
 * Fond Bleu Foncé + effet lumineux (signature EDF), touches de vert
 * (registre environnemental). Layout 50/50 : texte | image.
 */
export default function AirQualitySection() {
  return (
    <section
      className="section-dark glow-effect"
      aria-labelledby="section-air-quality-heading"
    >
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Colonne gauche — contenu */}
        <div className="flex items-center">
          <motion.div
            {...fadeInLeft}
            className="w-full max-w-2xl ml-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24"
          >
            <SectionHeader
              eyebrow="Qualité de l'air"
              onDark
              heading={
                <>
                  Un levier efficace pour{" "}
                  <span className="text-edf-green">améliorer la qualité de l&apos;air</span>
                </>
              }
              id="section-air-quality-heading"
            />

            <p className="text-lead text-white/85 mt-6 mb-9">
              Biocombustibles, bilan carbone neutre, zéro émission de dioxyde
              de soufre : la centrale du Larivot produit une énergie propre qui
              améliore la qualité de l&apos;air pour tous.
            </p>

            {/* Points clés — touche de vert sur fond bleu foncé (charte p.17) */}
            <ul className="flex flex-wrap gap-x-9 gap-y-5 mb-10">
              {KEY_POINTS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.li
                    key={item.label}
                    {...fadeInUpDelay(0.1 + index * 0.06)}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 bg-white/10"
                      aria-hidden="true"
                    >
                      <IconComponent className="w-6 h-6 text-edf-green" />
                    </span>
                    <span className="text-white/90 text-sm font-medium">{item.label}</span>
                  </motion.li>
                );
              })}
            </ul>

            <Link href="/benefices" className="btn btn-on-dark">
              Découvrir les bénéfices
            </Link>
          </motion.div>
        </div>

        {/* Colonne droite — image pleine hauteur */}
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[560px]">
          <Image
            src={IMAGES.environnement.qualiteAir}
            alt="Vue aérienne du site de la centrale bioénergie du Larivot"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-edf-blue/10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
