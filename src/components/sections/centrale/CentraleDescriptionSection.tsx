"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { Factory, Cog, Droplet, Briefcase } from "lucide-react";
import Image from "next/image";

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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/**
 * Section DESCRIPTION - Une électricité 100% renouvelable à puissance garantie
 */
export default function CentraleDescriptionSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-green/10 text-edf-green text-sm font-semibold mb-6 uppercase tracking-wide">
            Description
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Une électricité{" "}
            <span className="text-edf-green">100% renouvelable</span>{" "}
            à puissance garantie
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Grâce à son faible impact sur l&apos;environnement, la biomasse liquide, 
            obtenue à partir d&apos;huiles végétales telles que l&apos;huile de colza, 
            s&apos;impose comme une alternative énergétique prometteuse. Elle est en 
            parfait accord avec l&apos;objectif de la Guyane, qui vise à devenir l&apos;un 
            des premiers territoires alimenté à{" "}
            <strong className="text-edf-green">100% par des énergies renouvelables</strong>.
          </p>
        </motion.div>

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
                          className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}cc 100%)`,
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
                          <div className="text-[10px] text-gray-400 uppercase tracking-wide">
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
                      <p className="text-gray-600 text-sm leading-relaxed">
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <div className="bg-white shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col">
              {/* En-tête */}
              <div className="bg-edf-green px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Droplet className="w-4 h-4" />
                  <span className="font-semibold text-sm">Le cycle de la Biomasse Liquide</span>
                </div>
                <span className="text-white/80 text-xs">100% renouvelable</span>
              </div>

              {/* Image */}
              <div className="relative flex-1 min-h-[300px] bg-gradient-to-br from-gray-50 to-white">
                <Image
                  src="/visuel_biomasse_1.png"
                  alt="Cycle de la biomasse liquide - De la photosynthèse à la production d'énergie renouvelable"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Légende avec animation de flux */}
              <div className="bg-gray-50 px-4 py-4 border-t border-gray-100 overflow-hidden">
                <div className="relative flex items-center justify-center">
                  {/* Ligne de connexion avec flux animé */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[2px] bg-gray-200 overflow-hidden">
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
                      { step: "3", label: "Biocarburant", color: "#FF6B35" },
                      { step: "4", label: "Production", color: "#001A70" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center gap-1 z-10 bg-gray-50 px-2"
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
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 2.4,
                            delay: index * 0.8,
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
                              duration: 0.6,
                              repeat: Infinity,
                              repeatDelay: 2.4,
                              delay: index * 0.8,
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
                        <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">
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

