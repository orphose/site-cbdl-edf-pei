"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Building, ShieldCheck } from "lucide-react";

/**
 * Données des engagements environnementaux
 */
const ENVIRONMENT_ITEMS = [
  {
    icon: ClipboardCheck,
    title: "Contrôle indépendant",
    subtitle: "Respect des normes environnementales",
    description:
      "L'avancement du chantier fait l'objet d'un suivi rigoureux mené par un bureau d'études spécialisé et indépendant. Ce contrôle systématique assuré par des experts externes garantit le respect des réglementations environnementales applicables.",
    color: "#88D910",
  },
  {
    icon: Building,
    title: "Contrôle réglementaire",
    subtitle: "Inspections conjointes DGTM",
    description:
      "EDF PEI réalise chaque mois, conjointement avec la DGTM, des inspections rigoureuses du site de la centrale du Larivot. Ces vérifications communes garantissent la conformité réglementaire à chaque phase du chantier.",
    color: "#001A70",
  },
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Section ENVIRONNEMENT - Un chantier respectueux de l'environnement
 */
export default function ChantierEnvironmentSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-edf-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-edf-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold uppercase tracking-wide mb-6">
            Environnement
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase">
            Un chantier{" "}
            <span className="text-edf-green">respectueux</span>{" "}
            de l&apos;environnement
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            À travers la construction de la Centrale Bioénergie du Larivot, 
            EDF PEI s&apos;engage dans une démarche de préservation de 
            l&apos;environnement. Durant le chantier, des mesures concrètes 
            seront déployées pour réduire l&apos;empreinte écologique du projet.
          </p>
        </motion.div>

        {/* Cartes des engagements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl"
        >
          {ENVIRONMENT_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="relative bg-white border border-gray-100 p-8 transition-all duration-500 hover:shadow-2xl h-full">
                  {/* Barre de couleur en haut */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: item.color }}
                  />

                  {/* Fond au hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(180deg, ${item.color}08 0%, transparent 50%)`,
                    }}
                  />

                  <div className="relative">
                    {/* Icône */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Contenu */}
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h3>
                    <h4 className="text-gray-500 font-medium mb-4">
                      {item.subtitle}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Badge décoratif */}
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium" style={{ color: item.color }}>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Conformité garantie</span>
                    </div>
                  </div>

                  {/* Numéro décoratif */}
                  <div
                    className="absolute bottom-4 right-6 text-8xl font-bold leading-none opacity-[0.03] select-none"
                    style={{ color: item.color }}
                  >
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Message de transparence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-edf-blue/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-edf-blue" />
            </div>
            <p className="text-gray-600 text-sm">
              Une démarche guidée par la{" "}
              <strong className="text-edf-blue">transparence</strong>, la{" "}
              <strong className="text-edf-blue">responsabilité</strong> et l&apos;
              <strong className="text-edf-blue">innovation</strong> pour une 
              protection renforcée de l&apos;environnement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

