"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Données des piliers d'excellence
 */
const EXCELLENCE_PILLARS = [
  {
    number: "01",
    title: "Sécurité renforcée",
    description: "La haute disponibilité de nos installations assure la stabilité des réseaux électriques insulaires.",
    color: "#001A70",
  },
  {
    number: "02",
    title: "Énergie pilotable",
    description: "Notre énergie garantie et ajustable favorise l'intégration croissante des énergies renouvelables intermittentes.",
    color: "#FFB210",
  },
  {
    number: "03",
    title: "Décarbonation",
    description: "La conversion à la biomasse liquide illustre notre engagement vers un mix énergétique décarboné.",
    color: "#88D910",
  },
];

/**
 * Section Excellence Industrielle - Page À propos
 * Refactorisée pour être conforme aux guidelines EDF
 */
export default function AboutIndustrySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-edf-blue/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Colonne gauche - Contenu textuel */}
          <div>
            {/* En-tête */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-medium mb-6">
                Excellence industrielle
              </span>
              <h2 className="heading-lg text-black mb-6 uppercase">
                L&apos;excellence{" "}
                <span className="text-edf-orange">industrielle</span>{" "}
                d&apos;EDF PEI
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Forts de notre expertise technique et de notre connaissance 
                approfondie des enjeux insulaires, nous poursuivons notre 
                croissance en portant des projets innovants au service de 
                la transition énergétique.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Notre volonté de convertir à la biomasse liquide nos centrales 
                électriques d&apos;outre-mer illustre parfaitement cet engagement 
                vers un avenir décarboné.
              </p>
            </motion.div>

            {/* Bloc raison d'être EDF */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-edf-blue p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Notre raison d&apos;être
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Construire un avenir énergétique{" "}
                <strong className="text-edf-orange">neutre en CO₂</strong>{" "}
                en conciliant préservation de la planète, bien-être et 
                développement grâce à l&apos;électricité et à des solutions 
                innovantes.
              </p>
              <a
                href="https://www.edf.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-edf-green hover:text-edf-green/80 font-medium transition-colors"
              >
                <span>Découvrir le groupe EDF</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Colonne droite - Piliers d'excellence */}
          <div className="space-y-6">
            {EXCELLENCE_PILLARS.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div
                  className="relative bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ borderLeft: `4px solid ${pillar.color}` }}
                >
                  {/* Fond au hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${pillar.color}08 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative p-6 flex gap-6">
                    {/* Numéro */}
                    <div
                      className="text-4xl font-bold opacity-20 flex-shrink-0"
                      style={{ color: pillar.color }}
                    >
                      {pillar.number}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ color: pillar.color }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  {/* Numéro décoratif en arrière-plan */}
                  <div
                    className="absolute -bottom-6 -right-4 text-[100px] font-bold leading-none opacity-[0.03] select-none pointer-events-none"
                    style={{ color: pillar.color }}
                  >
                    {pillar.number}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
