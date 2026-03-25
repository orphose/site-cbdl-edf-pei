"use client";

import { IMAGES } from "@/lib/media";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Wind, Leaf, CloudOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Section Qualité de l'air - Section 4
 * Un levier efficace pour améliorer la qualité de l'air
 * Layout 50/50 : texte à gauche, image pleine hauteur à droite
 */
export default function AirQualitySection() {
  return (
    <section className="relative flex flex-col lg:flex-row lg:min-h-[650px] bg-edf-blue overflow-hidden" aria-labelledby="section-air-quality-heading">
      {/* Fond avec motif */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(136,217,16,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,178,16,0.2),transparent_50%)]" />
      </div>

      {/* Colonne gauche - Contenu texte (50%) */}
      <div className="w-full lg:w-1/2 flex items-center relative z-10 flex-1">
        <div className="px-8 lg:px-16 py-12 lg:py-16 max-w-2xl">
          <motion.div
            {...fadeInLeft}
          >
            <SectionHeader
              badge="Qualité de l'air"
              badgeColor="green"
              headingColor="white"
              heading={<>Un levier efficace pour{" "}<span className="text-edf-green-bright">améliorer la qualité de l&apos;air</span></>}
              id="section-air-quality-heading"
            />

            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Avec l&apos;utilisation de biocombustibles, un bilan carbone neutre et
              l&apos;absence d&apos;émissions de dioxyde de soufre, la centrale du Larivot
              incarne l&apos;avenir d&apos;une énergie propre et durable contribuant ainsi
              à une amélioration de la qualité de l&apos;air pour tous.
            </p>

            {/* Points clés */}
            <div className="flex flex-wrap gap-8 mb-8">
              {[
                { icon: Leaf, label: "Biocombustibles" },
                { icon: CloudOff, label: "Carbone neutre" },
                { icon: Wind, label: "Zéro SO2" },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeInUpDelay(0.15 + index * 0.05)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-edf-green" />
                    </div>
                    <span className="text-white/90 text-sm">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <Button
              as={Link}
              href="/benefices"
              size="lg"
              className="bg-edf-green text-white font-semibold px-8 hover:bg-edf-green-light transition-all"
              radius="none"
            >
              En savoir plus
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Colonne droite - Image (50% largeur, 100% hauteur) */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-full h-full"
        >
          <Image
            src={IMAGES.environnement.qualiteAir}
            alt="Modélisation de la centrale bioénergie du Larivot"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay léger */}
          <div className="absolute inset-0 bg-edf-blue/10" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Version mobile - Image en bas (dans le flux) */}
      <div className="lg:hidden relative w-full h-64 flex-shrink-0">
        <Image
          src={IMAGES.centrale.modelisation}
          alt="Modélisation de la centrale bioénergie du Larivot"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-edf-blue via-edf-blue/50 to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
