"use client";

import { motion } from "framer-motion";
import { Users, AlertTriangle, CheckCircle2, Target, HeartPulse } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Engagements sécurité — registre institutionnel sur fond Bleu Foncé.
 */
const SECURITY_POINTS = [
  {
    icon: Target,
    text: "Politique du zéro accident",
  },
  {
    icon: HeartPulse,
    text: "Protection de la santé de tous",
  },
  {
    icon: Users,
    text: "Commission de coordination dédiée",
  },
  {
    icon: AlertTriangle,
    text: "Analyse et prévention des risques",
  },
];

/** Piliers de la démarche zéro accident */
const SECURITY_PILLARS = ["Coordination", "Prévention", "Analyse"];

/**
 * Section SÉCURITÉ — la sécurité, une priorité absolue.
 * Moment fort de la page : fond Bleu Foncé + effet lumineux
 * (signature EDF), seule section sombre de la page Chantier.
 */
export default function ChantierSecuritySection() {
  return (
    <section
      className="section section-dark glow-effect"
      aria-labelledby="chantier-security-heading"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Colonne gauche — contenu */}
          <motion.div {...fadeInLeft}>
            <SectionHeader
              eyebrow="Sécurité"
              onDark
              heading={<>La sécurité, une priorité absolue sur le chantier</>}
              id="chantier-security-heading"
            />

            <p className="text-lead text-white/85 mt-6 mb-9">
              La sécurité des salariés et des prestataires est un objectif
              majeur pour EDF PEI qui promeut la politique du{" "}
              <strong className="font-semibold">zéro accident</strong>.
              Nous nous engageons à garantir la sécurité et protéger
              la santé de toutes les parties prenantes du projet.
            </p>

            {/* Points d'engagement */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4 list-none"
            >
              {SECURITY_POINTS.map((point) => {
                const IconComponent = point.icon;
                return (
                  <motion.li
                    key={point.text}
                    variants={staggerItem}
                    className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3"
                  >
                    <span
                      className="inline-flex items-center justify-center w-11 h-11 bg-white/10 shrink-0"
                      aria-hidden="true"
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </span>
                    <span className="text-white/90 text-sm font-medium">
                      {point.text}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* Colonne droite — engagement zéro accident */}
          <motion.div {...fadeInRight}>
            <div className="bg-white p-8 md:p-10 shadow-4">
              <p className="eyebrow justify-center mb-5">Engagement EDF PEI</p>

              <h3 className="heading-3 text-edf-bleu-nuit text-center mb-4">
                Objectif Zéro Accident
              </h3>

              <p className="text-edf-bleu-nuit/75 text-center mb-10 max-w-md mx-auto">
                Une commission dédiée coordonne les activités, accompagne
                la prévention et analyse les risques en permanence.
              </p>

              {/* Piliers — mono-camaïeu bleu, une seule couleur d'icône */}
              <ul className="grid grid-cols-3 gap-2 md:gap-4 list-none">
                {SECURITY_PILLARS.map((pillar) => (
                  <li key={pillar} className="text-center">
                    <span className="icon-square mb-3" aria-hidden="true">
                      <CheckCircle2 className="w-6 h-6" />
                    </span>
                    <span className="block text-xs md:text-sm font-semibold uppercase tracking-wide text-edf-bleu-nuit">
                      {pillar}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
