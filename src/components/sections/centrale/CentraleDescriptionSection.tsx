"use client";

import { IMAGES, VIDEOS } from "@/lib/media";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { Factory, Cog, Droplet, Briefcase } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp } from "@/lib/motion-variants";

/**
 * Données des cartes de description
 */
const DESCRIPTION_CARDS = [
  {
    icon: Factory,
    title: "Centrale du Larivot",
    description:
      "Capacité de production prévue pour 25 ans, fonctionnant à la biomasse liquide dès sa mise en service.",
    color: "#001A70",
    highlight: "25 ans",
    highlightLabel: "de capacité",
  },
  {
    icon: Cog,
    title: "Moteurs",
    description:
      "Sept moteurs haute performance garantissant 120 MW de puissance modulable selon les besoins du territoire.",
    color: "#88D910",
    highlight: "7",
    highlightLabel: "moteurs",
  },
  {
    icon: Droplet,
    title: "Biomasse Liquide",
    description:
      "Sourcing éthique et durable. Huiles de palme et soja exclues conformément à la directive RED 2.",
    color: "#FFB210",
    highlight: "0%",
    highlightLabel: "huile de palme",
  },
  {
    icon: Briefcase,
    title: "Emploi",
    description:
      "Pilier de l'économie locale, créateur d'emplois et moteur de la filière biomasse en Guyane.",
    color: "#001A70",
    highlight: "500+",
    highlightLabel: "emplois",
  },
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

/**
 * Section DESCRIPTION - Une électricité 100% renouvelable à puissance garantie
 */
export default function CentraleDescriptionSection() {
  return (
    <section aria-labelledby="centrale-description-heading" className="section-padding bg-edf-blanc-bleute relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <SectionHeader
          badge="Description"
          badgeColor="green"
          heading={<>Une électricité{" "}<span className="text-edf-green">100% renouvelable</span>{" "}à puissance garantie</>}
          description={<>Grâce à son faible impact sur l&apos;environnement, la biomasse liquide, obtenue à partir d&apos;huiles végétales telles que l&apos;huile de colza, s&apos;impose comme une alternative énergétique prometteuse. Elle est en parfait accord avec l&apos;objectif de la Guyane, qui vise à devenir l&apos;un des premiers territoires alimenté à{" "}<strong className="text-edf-green">100% par des énergies renouvelables</strong>.</>}
          className="max-w-4xl mb-16"
          id="centrale-description-heading"
        />

        {/* Grille principale : Cards à gauche + Schéma à droite */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Colonne gauche : 4 cards en grille 2x2 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-4"
          >
            {DESCRIPTION_CARDS.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div key={index} variants={cardVariants}>
                  <Card
                    className="h-full card-hover border-none shadow-lg bg-white"
                    radius="none"
                  >
                    <CardBody className="p-5">
                      {/* Header avec icône et stat */}
                      <div className="flex items-start justify-between mb-4">
                        {/* Icône */}
                        <div
                          className="w-12 h-12 flex items-center justify-center shadow-md"
                          style={{
                            background: `linear-gradient(120deg, ${card.color} 0%, ${card.color}cc 100%)`,
                          }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        {/* Stat */}
                        <div className="text-right">
                          <div
                            className="text-xl font-bold"
                            style={{ color: card.color }}
                          >
                            {card.highlight}
                          </div>
                          <div className="text-[10px] text-edf-gris-moyen uppercase tracking-wide">
                            {card.highlightLabel}
                          </div>
                        </div>
                      </div>

                      {/* Titre */}
                      <h3
                        className="text-base font-bold mb-2"
                        style={{ color: card.color }}
                      >
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-edf-gris-fonce text-sm leading-relaxed">
                        {card.description}
                      </p>

                      {/* Barre décorative */}
                      <div
                        className="mt-4 h-1 w-12"
                        style={{ backgroundColor: card.color }}
                      />
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Colonne droite : Schéma biomasse */}
          <motion.div
            {...fadeInUp}
            className="h-full"
          >
            <div className="bg-white shadow-lg border border-edf-gris-clair overflow-hidden h-full flex flex-col">
              {/* En-tête */}
              <div className="bg-edf-green px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Droplet className="w-4 h-4" />
                  <span className="font-semibold text-sm">Le cycle de la Biomasse Liquide</span>
                </div>
                <span className="text-white/80 text-xs">100% renouvelable</span>
              </div>

              {/* Image */}
              <div className="relative flex-1 min-h-[300px] bg-gradient-to-br from-edf-blanc-bleute to-white">
                <Image
                  src={IMAGES.centrale.visuelBiomasse}
                  alt="Cycle de la biomasse liquide - De la photosynthèse à la production d'énergie renouvelable"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Légende avec animation de flux */}
              <div className="bg-edf-blanc-bleute px-4 py-4 border-t border-edf-gris-clair overflow-hidden">
                <div className="relative flex items-center justify-center">
                  {/* Ligne de connexion avec flux animé */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[2px] bg-edf-gris-clair overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-edf-green to-transparent"
                      animate={{ x: ["-100%", "500%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Étapes */}
                  <div className="relative flex items-center justify-between w-full max-w-lg">
                    {[
                      { step: "1", label: "Photosynthèse", color: "#88D910" },
                      { step: "2", label: "Transformation", color: "#FFB210" },
                      { step: "3", label: "Biocarburant", color: "#FE5716" },
                      { step: "4", label: "Production", color: "#001A70" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center gap-1 z-10 bg-edf-blanc-bleute px-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                      >
                        {/* Badge numéroté avec highlight séquentiel */}
                        <motion.div
                          className="relative w-8 h-8 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.15, 1],
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatDelay: 2.4,
                            delay: index * 0.4,
                          }}
                        >
                          {/* Cercle de fond animé */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: item.color }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 0.3,
                              repeat: Infinity,
                              repeatDelay: 2.4,
                              delay: index * 0.4,
                            }}
                          />
                          {/* Badge principal */}
                          <span
                            className="relative w-6 h-6 text-white text-xs font-bold flex items-center justify-center z-10"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.step}
                          </span>
                        </motion.div>

                        {/* Label */}
                        <span className="text-[11px] text-edf-gris-fonce font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

