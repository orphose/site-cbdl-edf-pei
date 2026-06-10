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
      "La biomasse, en tant que source d'énergie renouvelable, présente un bilan carbone neutre en termes d'émissions directes (« scope 1 » selon les normes internationales). Cette neutralité carbone est atteinte grâce à l'équilibre entre le dioxyde de carbone (CO2) émis lors de la combustion des bioénergies et la quantité de CO2 absorbée pendant la croissance des plantes utilisées comme biomasse. Ce cycle naturel permet une réabsorption du carbone libéré, minimisant de ce fait l'impact sur le changement climatique.",
    highlight: "Neutre",
    highlightLabel: "bilan carbone",
  },
  {
    icon: Factory,
    title: "Traitement des fumées",
    description:
      "L'installation d'un système de traitement additionnel des fumées, grâce à la technologie de réduction catalytique sélective (SCR), constitue une avancée significative dans la maîtrise des émissions polluantes. Ce procédé, qui s'appuie sur des méthodes rigoureuses, permet de minimiser efficacement la libération de substances nocives dans l'atmosphère, notamment les oxydes d'azote (NOx), reconnus pour leur impact négatif sur la qualité de l'air et la santé humaine.",
    highlight: "SCR",
    highlightLabel: "technologie",
  },
  {
    icon: Settings,
    title: "Conception adaptée",
    description:
      "Une analyse environnementale rigoureuse a conduit à une conception parfaitement adaptée aux spécificités du site d'implantation de la centrale. De l'ajustement précis de la taille des cheminées à l'optimisation minutieuse des procédures opérationnelles, chaque élément a été finement calibré. Cette démarche garantit une amélioration durable et significative de la qualité de l'air.",
    highlight: "100%",
    highlightLabel: "adapté au site",
  },
  {
    icon: Eye,
    title: "Surveillance de la qualité de l'air",
    description:
      "Une surveillance systématique de la qualité de l'air sera instaurée, à l'instar des mesures déjà mises en place dans les quatre autres centrales opérées par EDF PEI. Cette initiative souligne un engagement soutenu en faveur d'une exploitation énergétique responsable et respectueuse de l'environnement.",
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
              La centrale bioénergie du Larivot utilise des techniques{" "}
              <strong className="font-semibold">avancées et innovantes</strong> afin
              de minimiser son impact sur la qualité de l&apos;air environnant.
              L&apos;emploi de la biomasse liquide, caractérisée par une absence de
              soufre et de métaux, contribue efficacement à la réduction des
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
              <motion.div key={card.title} variants={staggerItem} className="h-full">
                <article className="card-edf h-full p-7 border-t-4 border-t-edf-green-dark">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="icon-square icon-square--green" aria-hidden="true">
                      <IconComponent className="w-6 h-6" />
                    </span>
                    <p className="text-right">
                      <span className="block text-2xl font-bold text-edf-blue leading-tight">
                        {card.highlight}
                      </span>
                      <span className="block text-caption mt-0.5">
                        {card.highlightLabel}
                      </span>
                    </p>
                  </div>

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
              className="bg-white border border-edf-gris-clair border-t-4 border-t-edf-green-dark p-6"
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
