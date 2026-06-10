"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Données des piliers d'excellence — accent unique camaïeu bleu.
 */
const EXCELLENCE_PILLARS = [
  {
    number: "01",
    title: "Sécurité renforcée",
    description:
      "La haute disponibilité de nos installations assure la stabilité des réseaux électriques insulaires.",
  },
  {
    number: "02",
    title: "Énergie pilotable",
    description:
      "Notre énergie garantie et ajustable favorise l'intégration croissante des énergies renouvelables intermittentes.",
  },
  {
    number: "03",
    title: "Décarbonation",
    description:
      "La conversion à la biomasse liquide illustre notre engagement vers un mix énergétique décarboné.",
  },
];

/**
 * Section Excellence Industrielle — Page À propos.
 * Fond blanc (alternance), registre institutionnel bleu ;
 * cartouche Bleu Foncé pour la raison d'être (exergue par la graisse).
 */
export default function AboutIndustrySection() {
  return (
    <section aria-labelledby="about-industry-heading" className="section bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche — Contenu textuel */}
          <div>
            {/* En-tête */}
            <SectionHeader
              eyebrow="Excellence industrielle"
              heading={
                <>
                  L&apos;excellence{" "}
                  <span className="text-edf-bleu-action">industrielle</span>{" "}
                  d&apos;EDF PEI
                </>
              }
              id="about-industry-heading"
            />

            <motion.div {...fadeInUp} className="mt-6 mb-10">
              <p className="text-lead text-edf-bleu-nuit/75 mb-4">
                Forts de notre expertise technique et de notre connaissance
                approfondie des enjeux insulaires, nous poursuivons notre
                croissance en portant des projets innovants au service de
                la transition énergétique.
              </p>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Notre volonté de convertir à la biomasse liquide nos centrales
                électriques d&apos;outre-mer illustre parfaitement cet engagement
                vers un avenir décarboné.
              </p>
            </motion.div>

            {/* Bloc raison d'être EDF — cartouche Bleu Foncé */}
            <motion.div {...fadeInUpDelay(0.1)} className="bg-edf-blue p-8">
              <h3 className="heading-4 text-white mb-4">
                Notre raison d&apos;être
              </h3>
              <p className="text-white/85 leading-relaxed mb-6">
                Construire un avenir énergétique <strong>neutre en CO₂</strong>{" "}
                en conciliant préservation de la planète, bien-être et
                développement grâce à l&apos;électricité et à des solutions
                innovantes.
              </p>
              <a
                href="https://www.edf.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] text-white font-semibold underline-offset-4 hover:underline transition-colors"
              >
                <span>Découvrir le groupe EDF</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Colonne droite — Piliers d'excellence */}
          <div className="space-y-6">
            {EXCELLENCE_PILLARS.map((pillar, index) => (
              <motion.div key={pillar.number} {...fadeInUpDelay(index * 0.1)}>
                <article className="card-edf border-l-4 border-l-edf-bleu-action p-6 flex gap-6">
                  {/* Numéro décoratif */}
                  <span
                    className="text-4xl font-bold leading-none text-edf-bleu-action/25 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>

                  {/* Contenu */}
                  <div className="flex-1">
                    <h3 className="heading-4 text-edf-bleu-nuit mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
