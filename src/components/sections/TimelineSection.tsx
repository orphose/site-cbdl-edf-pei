"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, Building2, Droplets, Zap, Cog, Handshake, Flag } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Étapes de la construction — mono-camaïeu bleu (un seul registre
 * coloriel par composition, charte p.17).
 */
const TIMELINE_STEPS = [
  {
    year: "2023",
    quarter: "S2",
    phase: "Terrassement",
    description: "Préparation du terrain et travaux de terrassement",
    icon: Truck,
  },
  {
    year: "2024",
    quarter: "S1",
    phase: "Fondations",
    description: "Fondations profondes et pose des pieux",
    icon: Building2,
  },
  {
    year: "2024",
    quarter: "S2",
    phase: "Génie civil",
    description: "Construction des structures principales",
    icon: Building2,
  },
  {
    year: "2025",
    quarter: "S1",
    phase: "Canalisation",
    description: "Travaux de pose de la canalisation",
    icon: Droplets,
  },
  {
    year: "2025",
    quarter: "S2",
    phase: "Électromécanique",
    description: "Installation des équipements électromécaniques",
    icon: Zap,
  },
  {
    year: "2026",
    quarter: "S1",
    phase: "Raccordement",
    description: "Raccordement HTB au réseau",
    icon: Cog,
  },
  {
    year: "2026",
    quarter: "S2",
    phase: "Mise en service",
    description: "Essais finaux et mise en service",
    icon: Handshake,
    isLast: true,
  },
];

/**
 * Section Timeline — les grandes étapes de la construction.
 * Nœuds carrés (signature EDF), rail de progression Bleu Action.
 */
export default function TimelineSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="section bg-white" aria-labelledby="section-timeline-heading">
      <div className="container-custom" ref={containerRef}>
        <SectionHeader
          eyebrow="Construction"
          heading={
            <>
              Les grandes étapes de la{" "}
              <span className="text-edf-bleu-action">construction</span>
            </>
          }
          description="Du terrassement à la mise en service en 2026 : les grands jalons du chantier."
          id="section-timeline-heading"
          className="mb-16 lg:mb-20"
        />

        {/* Timeline desktop — horizontale */}
        <ol className="hidden lg:grid grid-cols-7 gap-4 relative list-none">
          {/* Rail de progression */}
          <div className="absolute top-7 left-0 right-0 h-0.5 bg-edf-gris-clair" aria-hidden="true">
            <motion.div
              className="h-full bg-edf-bleu-action"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            />
          </div>

          {TIMELINE_STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.li
                key={step.phase + step.year}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 + index * 0.07 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Nœud carré — signature EDF */}
                <span
                  className={`relative z-10 inline-flex items-center justify-center w-14 h-14 mb-4 ${
                    step.isLast ? "bg-edf-bleu-action" : "bg-edf-blue"
                  }`}
                  aria-hidden="true"
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </span>

                <p className="text-sm font-bold text-edf-bleu-action tracking-wide">
                  {step.year}&nbsp;{step.quarter}
                </p>
                <h3 className="text-sm font-semibold text-edf-bleu-nuit uppercase tracking-wide mt-1 mb-1.5">
                  {step.phase}
                </h3>
                <p className="text-caption max-w-[140px] mx-auto">{step.description}</p>

                {step.isLast && (
                  <p className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 bg-edf-blanc-bleute text-edf-blue text-xs font-semibold uppercase tracking-wide">
                    <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                    Objectif
                  </p>
                )}
              </motion.li>
            );
          })}
        </ol>

        {/* Timeline mobile — verticale */}
        <ol className="lg:hidden relative list-none">
          {/* Rail vertical */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-edf-gris-clair" aria-hidden="true">
            <motion.div
              className="w-full bg-edf-bleu-action"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-8">
            {TIMELINE_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.li
                  key={step.phase + step.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
                  className="relative flex items-start gap-5"
                >
                  <span
                    className={`relative z-10 inline-flex items-center justify-center w-12 h-12 shrink-0 ${
                      step.isLast ? "bg-edf-bleu-action" : "bg-edf-blue"
                    }`}
                    aria-hidden="true"
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </span>

                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-bold text-edf-bleu-action tracking-wide">
                      {step.year}&nbsp;{step.quarter}
                    </p>
                    <h3 className="text-base font-semibold text-edf-bleu-nuit uppercase tracking-wide mt-0.5 mb-1">
                      {step.phase}
                    </h3>
                    <p className="text-caption">{step.description}</p>

                    {step.isLast && (
                      <p className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 bg-edf-blanc-bleute text-edf-blue text-xs font-semibold uppercase tracking-wide">
                        <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                        Objectif
                      </p>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </div>
        </ol>
      </div>
    </section>
  );
}
