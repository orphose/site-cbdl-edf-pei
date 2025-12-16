"use client";

import { IMAGES, VIDEOS } from "@/lib/media";

import { motion } from "framer-motion";
import Image from "next/image";
import { RefreshCcw, FileText, Zap, MapPin } from "lucide-react";

/**
 * Données des raisons du projet
 */
const WHY_ITEMS = [
  {
    icon: RefreshCcw,
    title: "Remplacer la centrale de Dégrad des Cannes",
    description:
      "La nouvelle centrale bioénergie du Larivot viendra en remplacement de l'actuelle centrale de Dégrad des Cannes pour garantir et sécuriser l'approvisionnement électrique de la Guyane. Ce projet stratégique répondra à la demande croissante en énergie tout en amorçant la transition énergétique.",
    color: "#001A70",
  },
  {
    icon: FileText,
    title: "Satisfaire les besoins exprimés dans la PPE",
    description:
      "En collaboration avec les acteurs locaux, EDF PEI accompagne la transition énergétique du territoire. L'objectif est de définir une stratégie adaptée pour développer les énergies renouvelables et répondre aux besoins inscrits dans le cadre de la PPE. EDF PEI entend réduire la dépendance aux énergies fossiles grâce à une offre durable et maîtrisée.",
    color: "#88D910",
  },
  {
    icon: Zap,
    title: "Répondre aux besoins énergétiques de l'Ile de Cayenne",
    description:
      "Un enjeu majeur pour répondre à la demande croissante en énergie de l'Ile de Cayenne, cœur économique et démographique de la Guyane. Sécuriser et piloter l'approvisionnement en électricité de près de 50% de la population guyanaise est indispensable pour accompagner un développement durable et raisonné du territoire.",
    color: "#FFB210",
  },
];

/**
 * Variants d'animation
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
export default function WhySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Colonne gauche - Texte et cards */}
          <div>
            {/* En-tête de section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-semibold mb-6 uppercase tracking-wider">
                Pourquoi
              </span>
              <h2 className="heading-lg text-black mb-6 uppercase">
                Un projet clé pour le{" "}
                <span className="text-edf-blue">territoire</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Avec sa puissance garantie de <strong className="text-edf-orange">120 MW</strong>, 
                la Centrale Bioénergie du Larivot se situe sur l&apos;Île de Cayenne dans une zone 
                industrielle hautement stratégique et bénéficie d&apos;une proximité immédiate 
                des consommateurs les plus importants.
              </p>
              <p className="text-gray-600 text-lg mt-4 font-medium">
                Cette infrastructure permettra de :
              </p>
            </motion.div>

            {/* Liste des raisons */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
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
                      className="relative bg-white border border-gray-100 p-6 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                      style={{ borderLeft: `4px solid ${item.color}` }}
                    >
                      {/* Fond au hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}08 0%, transparent 50%)`,
                        }}
                      />

                      <div className="relative flex gap-5">
                        {/* Icône */}
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                          }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </motion.div>

                        {/* Contenu */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Numéro décoratif */}
                      <div
                        className="absolute -bottom-4 -right-2 text-[100px] font-bold leading-none opacity-[0.03] select-none"
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

          {/* Colonne droite - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:sticky lg:top-32"
          >
            {/* Image principale */}
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
              <Image
                src={IMAGES.centrale.modelisation}
                alt="Modélisation 3D de la Centrale Bioénergie du Larivot"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-edf-blue/60 via-transparent to-transparent" />
              
              {/* Badge localisation */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-edf-orange" />
                    <span className="text-sm font-semibold text-edf-blue uppercase">Localisation</span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Île de Cayenne • Zone industrielle stratégique
                  </p>
                </div>
              </div>
            </div>

            {/* Statistique flottante */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-edf-orange text-white p-6 shadow-xl"
            >
              <span className="text-4xl font-bold">50%</span>
              <p className="text-sm opacity-90 mt-1">de la population<br />guyanaise</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

