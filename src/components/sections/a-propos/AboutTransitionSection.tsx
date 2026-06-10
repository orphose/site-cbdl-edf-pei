"use client";

import { motion } from "framer-motion";
import { Users, Zap, Lightbulb, Award, Wind } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des statistiques clés EDF PEI — accent unique camaïeu bleu,
 * conformément à la charte (une seule couleur d'icône par section).
 */
const STATS_DATA = [
  {
    icon: Users,
    value: "430",
    unit: "",
    label: "Salariés engagés",
  },
  {
    icon: Zap,
    value: "750",
    unit: "MW",
    label: "Capacité totale installée",
  },
  {
    icon: Lightbulb,
    value: "3 500",
    unit: "GWh/an",
    label: "Énergie produite",
  },
  {
    icon: Wind,
    value: "50",
    unit: "MW",
    label: "Projets EnR en développement",
  },
  {
    icon: Award,
    value: "4",
    unit: "",
    label: "Centrales certifiées ISO 14001",
  },
];

/**
 * Section Transition Énergétique — Page À propos.
 * Mission EDF PEI et chiffres clés. Fond blanc, registre institutionnel
 * bleu ; seule l'exergue « transition énergétique » porte la touche
 * environnementale verte (charte p.17).
 */
export default function AboutTransitionSection() {
  return (
    <section aria-labelledby="about-transition-heading" className="section bg-white">
      <div className="container-custom">
        {/* En-tête de section */}
        <SectionHeader
          eyebrow="Notre mission"
          heading={
            <>
              EDF PEI, acteur clé de la{" "}
              <span className="text-edf-green-dark">transition énergétique</span>{" "}
              insulaire
            </>
          }
          description={
            <>
              Fidèle à la raison d&apos;être du Groupe EDF, EDF PEI accompagne la
              transition énergétique des territoires insulaires avec des solutions
              innovantes, adaptées à chaque contexte local.
            </>
          }
          id="about-transition-heading"
          className="mb-14"
        />

        {/* Bloc d'engagement — aplat teinté */}
        <motion.div
          {...fadeInUpDelay(0.1)}
          className="mb-14 bg-edf-blanc-bleute p-8 md:p-10"
        >
          <p className="text-lead text-edf-bleu-nuit">
            Notre engagement se concrétise par la <strong>conversion à la
            biomasse liquide</strong> de nos centrales moteurs : d&apos;abord à La Réunion,
            puis en Guadeloupe et en Martinique. En Guyane, nous construisons une centrale
            fonctionnant avec ce combustible renouvelable dès <strong>2026</strong>.
          </p>
        </motion.div>

        {/* Grille des statistiques — grands chiffres en couleur de marque */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {STATS_DATA.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div key={stat.label} variants={staggerItem} className="card-pop-wrap">
                <article className="card-edf card-pop card-pop--center h-full px-6 pb-6 pt-12 text-center">
                  {/* Icône */}
                  <span className="icon-square" aria-hidden="true">
                    <IconComponent className="w-6 h-6" />
                  </span>

                  {/* Valeur */}
                  <p className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-3xl md:text-4xl font-bold text-edf-blue leading-tight">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="text-base font-semibold text-edf-bleu-action">
                        {stat.unit}
                      </span>
                    )}
                  </p>

                  {/* Label */}
                  <p className="text-caption">{stat.label}</p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
