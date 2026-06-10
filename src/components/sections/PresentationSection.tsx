"use client";

import { motion } from "framer-motion";
import { Zap, Leaf, Settings } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECT_STATS } from "@/lib/constants";
import { fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des cartes de présentation — une seule couleur d'accent
 * par section (camaïeu bleu), conformément à la charte.
 */
const PRESENTATION_CARDS = [
  {
    icon: Settings,
    title: "Technologie de pointe",
    description:
      "La Centrale bioénergie du Larivot sera dotée de 7 moteurs de nouvelle génération fonctionnant avec de la biomasse liquide comme combustible renouvelable. Leur conception permet de générer une puissance de 120 MW et de sécuriser les besoins de l'île de Cayenne.",
  },
  {
    icon: Leaf,
    title: "Combustible écologique",
    description:
      "La centrale bioénergie du Larivot utilisera de la biomasse liquide, un biocombustible neutre en émission carbone. Elle permettra d'éviter l'émission d'environ 500 000 tonnes de CO₂ annuellement et la qualité de l'air sera sensiblement améliorée.",
  },
  {
    icon: Zap,
    title: "Énergie garantie et pilotable",
    description:
      "La Centrale bioénergie du Larivot pourra moduler sa puissance et son énergie en fonction de l'évolution des moyens de production intermittents comme le solaire et l'éolien.",
  },
];

function CountUpValue({ value }: { value: string }) {
  const numericMatch = value.match(/(\d+)/);
  const prefix = value.match(/^([^\d]*)/)?.[1] || "";
  const suffix = value.match(/\d+(.*)/)?.[1] || "";
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;

  const { count, ref } = useCountUp(numericValue);

  return (
    <span ref={ref} className="stat-value">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/**
 * Section Présentation — une centrale qui produit une électricité
 * 100 % renouvelable. Fond blanc, accents bleus, exergue verte (touche
 * environnementale autorisée sur le camaïeu bleu).
 */
export default function PresentationSection() {
  return (
    <section className="section bg-white" aria-labelledby="section-presentation-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Le projet"
          heading={
            <>
              Une centrale qui produit une électricité{" "}
              <span className="text-edf-green-dark">100&nbsp;% renouvelable</span>
            </>
          }
          description="Un outil essentiel au développement de la Guyane. Pour remplacer les anciens moyens de production et accompagner le développement économique et démographique du littoral, la centrale bioénergie du Larivot renforce les moyens de production en Guyane, assurant ainsi un équilibre entre l'offre et la demande énergétique."
          id="section-presentation-heading"
          className="mb-14"
        />

        {/* Cartes — style uniforme, accent bleu unique */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {PRESENTATION_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={card.title} variants={staggerItem} className="h-full">
                <article className="card-edf h-full p-7">
                  <span className="icon-square mb-6" aria-hidden="true">
                    <IconComponent className="w-6 h-6" />
                  </span>
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
          className="mt-16 pt-10 border-t border-edf-gris-clair grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          {[
            PROJECT_STATS.power,
            PROJECT_STATS.engines,
            PROJECT_STATS.co2,
            PROJECT_STATS.renewable,
          ].map((stat) => (
            <div key={stat.label}>
              <dd className="flex items-baseline gap-1 order-1">
                <CountUpValue value={stat.value} />
                {stat.unit && (
                  <span className="text-xl font-semibold text-edf-bleu-action">
                    {stat.unit}
                  </span>
                )}
              </dd>
              <dt className="text-caption mt-2">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
