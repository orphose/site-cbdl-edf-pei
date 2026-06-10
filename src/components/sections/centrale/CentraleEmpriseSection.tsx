"use client";

import { motion } from "framer-motion";
import { Check, Shield, Building2 } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/media";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Points clés de l'implantation — registre environnemental :
 * touche verte unique (icônes et accents).
 */
const KEY_POINTS = [
  {
    icon: Check,
    title: "Consultations locales",
    description:
      "Projet majeur en Guyane validé après des consultations publiques approfondies avec les acteurs du territoire.",
  },
  {
    icon: Shield,
    title: "Site sécurisé",
    description:
      "Emplacement choisi pour éviter les risques d'inondation, conformément au Plan de Prévention des Risques d'Inondation (PPRI).",
  },
  {
    icon: Building2,
    title: "Zone économique stratégique",
    description:
      "Située à Matoury, au cœur du Grand Parc Économique Terca-Larivot-Collery, à proximité des grands consommateurs.",
  },
];

/** Données du bandeau de localisation. */
const LOCATION_STATS = [
  { value: "Matoury", label: "Commune" },
  { value: "50%", label: "Population alimentée" },
];

/**
 * Section EMPRISE — une emprise au sol limitée.
 * Fond blanc, touches de vert (registre environnemental : comparaison
 * d'emprise au sol avec une centrale photovoltaïque).
 */
export default function CentraleEmpriseSection() {
  return (
    <section aria-labelledby="centrale-emprise-heading" className="section bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Emprise"
          tone="green"
          heading={
            <>
              Une emprise au sol{" "}
              <span className="text-edf-green-dark">limitée</span>
            </>
          }
          description={
            <>
              À puissance équivalente et énergie garantie, la Centrale Bioénergie du
              Larivot occupera{" "}
              <strong className="font-semibold">80 fois moins de place</strong>{" "}
              qu&apos;une centrale photovoltaïque avec stockage.
            </>
          }
          id="centrale-emprise-heading"
          className="mb-14"
        />

        {/* Grille principale : infographie + points clés */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-12">
          {/* Colonne gauche : infographie comparative */}
          <motion.div {...fadeInLeft}>
            <div className="relative bg-white border border-edf-gris-clair shadow-3 h-full flex flex-col">
              {/* Image */}
              <div className="relative flex-1 min-h-[300px]">
                <Image
                  src={IMAGES.centrale.emprise2}
                  alt="Comparaison : Centrale bioénergie du Larivot (10 ha) vs Centrale photovoltaïque avec stockage (800 ha)"
                  fill
                  className="object-contain p-4"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>

              {/* Légende — fond bleu foncé, touche verte décorative (charte p.17) */}
              <div className="bg-edf-blue px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-white">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <p className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-edf-green" aria-hidden="true" />
                      <span className="text-sm">
                        <strong className="font-semibold">10 ha</strong> Bioénergie
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white/50" aria-hidden="true" />
                      <span className="text-sm">
                        <strong className="font-semibold">800 ha</strong> Photovoltaïque
                      </span>
                    </p>
                  </div>
                  <p className="bg-edf-green-dark px-3 py-1 text-sm font-bold">
                    80x moins
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite : points clés */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            {KEY_POINTS.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div key={item.title} variants={staggerItem} className="card-pop-left-wrap">
                  <article className="card-edf card-pop-left card-motif card-motif--vert p-5 pl-10">
                    <span className="icon-square icon-square--green" aria-hidden="true">
                      <IconComponent className="w-6 h-6" />
                    </span>
                    <h3 className="heading-4 text-edf-bleu-nuit mb-1">
                      {item.title}
                    </h3>
                    <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bandeau localisation */}
        <motion.div {...fadeInUp} className="card-edf overflow-hidden">
          <div className="grid md:grid-cols-4">
            {/* Info principale */}
            <div className="md:col-span-2 p-8">
              <h3 className="heading-4 text-edf-bleu-nuit mb-1">
                Localisation stratégique
              </h3>
              <p className="text-edf-bleu-nuit/75">
                Zone industrielle de Matoury, agglomération de Cayenne
              </p>
            </div>

            {/* Données rapides */}
            {LOCATION_STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-8 border-t md:border-t-0 md:border-l border-edf-gris-clair flex flex-col justify-center"
              >
                <p className="text-2xl font-bold text-edf-blue leading-tight">
                  {stat.value}
                </p>
                <p className="text-caption mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
