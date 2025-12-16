"use client";

import { IMAGES, VIDEOS } from "@/lib/media";

import { motion } from "framer-motion";
import { RefreshCw, FileCheck, Users } from "lucide-react";
import Image from "next/image";

/**
 * Données des raisons du projet
 */
const WHY_ITEMS = [
  {
    icon: RefreshCw,
    title: "Remplacer la centrale de Dégrad des Cannes",
    description:
      "La nouvelle centrale bioénergie du Larivot viendra en remplacement de l'actuelle centrale de Dégrad des Cannes pour garantir et sécuriser l'approvisionnement électrique de la Guyane. Ce projet stratégique répondra à la demande croissante en énergie tout en amorçant la transition énergétique.",
    color: "#001A70",
  },
  {
    icon: FileCheck,
    title: "Satisfaire les besoins exprimés dans la PPE",
    description:
      "En collaboration avec les acteurs locaux, EDF PEI accompagne la transition énergétique du territoire. L'objectif est de définir une stratégie adaptée pour développer les énergies renouvelables et répondre aux besoins inscrits dans le cadre de la PPE. EDF PEI entend réduire la dépendance aux énergies fossiles grâce à une offre durable et maîtrisée.",
    color: "#88D910",
  },
  {
    icon: Users,
    title: "Répondre aux besoins énergétiques de l'Île de Cayenne",
    description:
      "Un enjeu majeur pour répondre à la demande croissante en énergie de l'Île de Cayenne, cœur économique et démographique de la Guyane. Sécuriser et piloter l'approvisionnement en électricité de près de 50% de la population guyanaise est indispensable pour accompagner un développement durable et raisonné du territoire.",
    color: "#FFB210",
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/**
 * Section POURQUOI - Un projet clé pour le territoire
 */
export default function CentraleWhySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Colonne gauche - Contenu */}
          <div>
            {/* En-tête */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-semibold mb-6 uppercase tracking-wide">
                Pourquoi
              </span>
              <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
                Un projet{" "}
                <span className="text-edf-blue">clé</span>{" "}
                pour le territoire
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Avec sa puissance garantie de <strong className="text-edf-blue">120 MW</strong>, 
                la Centrale Bioénergie du Larivot se situe sur l&apos;Île de Cayenne 
                dans une zone industrielle hautement stratégique et bénéficie 
                d&apos;une proximité immédiate des consommateurs les plus importants.
              </p>
              <p className="text-gray-500 text-base mt-4">
                Cette infrastructure permettra de :
              </p>
            </motion.div>

            {/* Liste des raisons */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {WHY_ITEMS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <div
                      className="relative bg-white border border-gray-100 p-6 transition-all duration-500 hover:shadow-xl hover:-translate-x-1"
                      style={{
                        borderLeft: `4px solid ${item.color}`,
                      }}
                    >
                      {/* Fond au hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}05 0%, transparent 50%)`,
                        }}
                      />

                      <div className="relative flex gap-4">
                        {/* Icône */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                          }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        {/* Contenu */}
                        <div className="flex-1">
                          <h3
                            className="text-lg font-bold mb-2"
                            style={{ color: item.color }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Numéro décoratif */}
                      <div
                        className="absolute top-2 right-4 text-6xl font-bold leading-none opacity-[0.05] select-none"
                        style={{ color: item.color }}
                      >
                        0{index + 1}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Colonne droite - Image d'illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:sticky lg:top-32"
          >
            {/* Image d'illustration */}
            <div className="relative aspect-[4/3] overflow-hidden border border-gray-100">
              <Image
                src={IMAGES.centrale.pourquoiLocalisation}
                alt="Localisation stratégique de la Centrale Bioénergie du Larivot en Guyane"
                fill
                className="object-cover"
              />
            </div>

            {/* Badge statistique */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-4xl font-bold text-edf-blue">50%</div>
              <div className="text-sm text-gray-500 mt-1">
                de la population<br />guyanaise alimentée
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

