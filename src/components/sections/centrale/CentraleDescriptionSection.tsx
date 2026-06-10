"use client";

import { motion } from "framer-motion";
import { Factory, Cog, Droplet, Briefcase } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/media";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInRight, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des cartes de description — sur fond bleu foncé,
 * touche verte unique (registre renouvelable) pour les icônes.
 */
const DESCRIPTION_CARDS = [
  {
    icon: Factory,
    title: "Centrale du Larivot",
    description:
      "Capacité de production prévue pour 25 ans, fonctionnant à la biomasse liquide dès sa mise en service.",
    highlight: "25 ans",
    highlightLabel: "de capacité",
  },
  {
    icon: Cog,
    title: "Moteurs",
    description:
      "Sept moteurs haute performance garantissant 120 MW de puissance modulable selon les besoins du territoire.",
    highlight: "7",
    highlightLabel: "moteurs",
  },
  {
    icon: Droplet,
    title: "Biomasse Liquide",
    description:
      "Sourcing éthique et durable. Huiles de palme et soja exclues conformément à la directive RED 2.",
    highlight: "0%",
    highlightLabel: "huile de palme",
  },
  {
    icon: Briefcase,
    title: "Emploi",
    description:
      "Pilier de l'économie locale, créateur d'emplois et moteur de la filière biomasse en Guyane.",
    highlight: "500+",
    highlightLabel: "emplois",
  },
];

/** Étapes du cycle de la biomasse liquide (légende du schéma). */
const BIOMASS_STEPS = ["Photosynthèse", "Transformation", "Biocarburant", "Production"];

/**
 * Section DESCRIPTION — une électricité 100% renouvelable à puissance garantie.
 * Moment fort de la page : fond Bleu Foncé + effet lumineux (signature EDF),
 * touches de vert autorisées sur fond sombre (charte p.17).
 */
export default function CentraleDescriptionSection() {
  return (
    <section
      aria-labelledby="centrale-description-heading"
      className="section section-dark glow-effect"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Description"
          onDark
          heading={
            <>
              Une électricité <span className="text-edf-green">100% renouvelable</span>{" "}
              à puissance garantie
            </>
          }
          description={
            <>
              Grâce à son faible impact sur l&apos;environnement, la biomasse liquide,
              obtenue à partir d&apos;huiles végétales telles que l&apos;huile de colza,
              s&apos;impose comme une alternative énergétique prometteuse. Elle est en
              parfait accord avec l&apos;objectif de la Guyane, qui vise à devenir
              l&apos;un des premiers territoires alimenté à{" "}
              <strong className="font-semibold text-white">
                100% par des énergies renouvelables
              </strong>
              .
            </>
          }
          id="centrale-description-heading"
          className="mb-14"
        />

        {/* Grille principale : cartes à gauche + schéma à droite */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Colonne gauche : 4 cartes chiffrées */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {DESCRIPTION_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <motion.div key={card.title} variants={staggerItem} className="h-full">
                  <article className="h-full border border-white/15 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span
                        className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-white/10"
                        aria-hidden="true"
                      >
                        <IconComponent className="w-6 h-6 text-edf-green" />
                      </span>
                      <p className="text-right">
                        <span className="block text-2xl font-bold text-white leading-tight">
                          {card.highlight}
                        </span>
                        <span className="block text-xs uppercase tracking-wide text-white/60 mt-0.5">
                          {card.highlightLabel}
                        </span>
                      </p>
                    </div>

                    <h3 className="heading-4 text-white mb-2">{card.title}</h3>
                    <p className="text-white/85 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </article>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Colonne droite : schéma du cycle de la biomasse */}
          <motion.div {...fadeInRight} className="h-full">
            <div className="bg-white shadow-3 h-full flex flex-col">
              {/* En-tête du schéma */}
              <div className="bg-edf-green-dark px-5 py-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-white">
                  <Droplet className="w-4 h-4" aria-hidden="true" />
                  <span className="font-semibold text-sm">
                    Le cycle de la Biomasse Liquide
                  </span>
                </p>
                <p className="text-white/80 text-xs">100% renouvelable</p>
              </div>

              {/* Image */}
              <div className="relative flex-1 min-h-[300px]">
                <Image
                  src={IMAGES.centrale.visuelBiomasse}
                  alt="Cycle de la biomasse liquide - De la photosynthèse à la production d'énergie renouvelable"
                  fill
                  className="object-contain p-4"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>

              {/* Légende — étapes du cycle */}
              <div className="bg-edf-blanc-bleute border-t border-edf-gris-clair px-4 py-4">
                <ol className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between max-w-lg mx-auto">
                  {BIOMASS_STEPS.map((label, index) => (
                    <li key={label} className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 bg-edf-green-dark text-white text-xs font-bold"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="text-xs font-medium text-edf-bleu-nuit/75 whitespace-nowrap">
                        {label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
