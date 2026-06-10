"use client";

import { motion } from "framer-motion";
import { Leaf, Factory, Settings, Eye } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des sous-sections qualité de l'air — registre environnemental :
 * une seule couleur d'icône (vert foncé), titres et textes en Bleu Nuit.
 */
const AIR_QUALITY_ITEMS = [
  {
    icon: Leaf,
    title: "Biocombustible neutre",
    description:
      "La biomasse présente un bilan carbone neutre en émissions directes (« scope 1 ») : le CO₂ émis lors de la combustion est compensé par celui absorbé pendant la croissance des plantes. Ce cycle naturel minimise l'impact sur le climat.",
    highlight: "Neutre",
    highlightLabel: "bilan carbone",
  },
  {
    icon: Factory,
    title: "Traitement des fumées",
    description:
      "Un traitement additionnel des fumées par réduction catalytique sélective (SCR) minimise le rejet de substances nocives dans l'atmosphère — notamment les oxydes d'azote (NOx), néfastes pour la qualité de l'air et la santé.",
    highlight: "SCR",
    highlightLabel: "technologie",
  },
  {
    icon: Settings,
    title: "Conception adaptée",
    description:
      "De la taille des cheminées aux procédures d'exploitation, chaque élément a été calibré sur la base d'une analyse environnementale rigoureuse du site, pour une amélioration durable de la qualité de l'air.",
    highlight: "100%",
    highlightLabel: "adapté au site",
  },
  {
    icon: Eye,
    title: "Surveillance de la qualité de l'air",
    description:
      "Comme dans les quatre autres centrales exploitées par EDF PEI, la qualité de l'air fera l'objet d'une surveillance systématique — la garantie d'une exploitation responsable et respectueuse de l'environnement.",
    highlight: "24/7",
    highlightLabel: "surveillance",
  },
];

/**
 * Chiffres clés du bandeau — unité verte autorisée sur la page Bénéfices.
 */
const AIR_QUALITY_STATS = [
  { value: "0", unit: "%", label: "Soufre dans le biocombustible" },
  { value: "0", unit: "%", label: "Métaux lourds" },
  { value: "-90", unit: "%", label: "Réduction NOx (SCR)" },
  { value: "5", unit: "", label: "Centrales EDF PEI surveillées" },
];

/**
 * Section QUALITÉ DE L'AIR — améliorer la qualité de l'air.
 * Fond blanc bleuté, touches de vert (registre environnemental).
 */
export default function BeneficesAirQualitySection() {
  return (
    <section className="section section-alt" aria-labelledby="benefices-air-quality-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Qualité de l'air"
          tone="green"
          heading={
            <>
              Améliorer la qualité de l&apos;air :{" "}
              <span className="text-edf-green-dark">un enjeu prioritaire</span> pour
              la Guyane
            </>
          }
          description={
            <>
              Des techniques{" "}
              <strong className="font-semibold">avancées et innovantes</strong>{" "}
              minimisent l&apos;impact de la centrale sur l&apos;air environnant :
              sans soufre ni métaux, la biomasse liquide réduit efficacement les
              émissions de particules fines.
            </>
          }
          id="benefices-air-quality-heading"
          className="mb-14"
        />

        {/* Grille de cartes — accent border verte, icône unique verte */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {AIR_QUALITY_ITEMS.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={card.title} variants={staggerItem} className="card-pop-wrap">
                <article className="card-edf card-pop h-full px-7 pb-7 pt-6">
                  <span className="icon-square icon-square--green" aria-hidden="true">
                    <IconComponent className="w-6 h-6" />
                  </span>
                  <p className="text-right mb-4">
                    <span className="block text-2xl font-bold text-edf-blue leading-tight">
                      {card.highlight}
                    </span>
                    <span className="block text-caption mt-0.5">
                      {card.highlightLabel}
                    </span>
                  </p>

                  <h3 className="heading-4 text-edf-bleu-nuit mb-3">{card.title}</h3>
                  <p className="text-edf-bleu-nuit/75 leading-relaxed text-[0.9375rem]">
                    {card.description}
                  </p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chiffres clés — grands chiffres en couleur de marque (charte) */}
        <motion.dl
          {...fadeInUpDelay(0.15)}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {AIR_QUALITY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-edf-gris-clair p-6"
            >
              <dd className="flex items-baseline gap-1">
                <span className="stat-value">{stat.value}</span>
                {stat.unit && (
                  <span className="text-xl font-semibold text-edf-green-text">
                    {stat.unit}
                  </span>
                )}
              </dd>
              <dt className="text-sm text-edf-bleu-nuit/75 mt-2">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
