"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { Building2, Cog, Droplets, Users } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/media";

/**
 * Données des cartes de description
 */
const DESCRIPTION_CARDS = [
  {
    icon: Building2,
    title: "Centrale du Larivot",
    description:
      "Capacité de production prévue pour 25 ans, fonctionnant à la biomasse liquide dès sa mise en service.",
    color: "#001A70",
    stat: "25",
    statLabel: "ans de capacité",
  },
  {
    icon: Cog,
    title: "Moteurs",
    description:
      "Sept moteurs haute performance garantissant 120 MW de puissance modulable selon les besoins du territoire.",
    color: "#88D910",
    stat: "7",
    statLabel: "moteurs haute performance",
  },
  {
    icon: Droplets,
    title: "Biomasse Liquide",
    description:
      "Sourcing éthique et durable. Huiles de palme et soja exclues conformément à la directive RED 2.",
    color: "#FFB210",
    stat: "0%",
    statLabel: "huile de palme/soja",
  },
  {
    icon: Users,
    title: "Emploi",
    description:
      "Pilier de l'économie locale, créateur d'emplois et moteur de la filière biomasse en Guyane.",
    color: "#001A70",
    stat: "500+",
    statLabel: "emplois créés",
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
 * Section DESCRIPTION - Une électricité 100% renouvelable
 */
export default function DescriptionSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Motif de fond subtil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
            backgroundSize: "48px 48px",
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
          <span className="inline-block px-4 py-2 bg-edf-green/10 text-edf-green text-sm font-semibold mb-6 uppercase tracking-wider">
            Description
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase">
            Une électricité{" "}
            <span className="text-edf-green">100% renouvelable</span> à puissance
            garantie
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Grâce à son faible impact sur l&apos;environnement, la biomasse liquide, 
            obtenue à partir d&apos;huiles végétales telles que l&apos;huile de colza, 
            s&apos;impose comme une alternative énergétique prometteuse. Elle est en 
            parfait accord avec l&apos;objectif de la Guyane, qui vise à devenir l&apos;un 
            des premiers territoires alimenté à <strong className="text-edf-blue">100% par des énergies renouvelables</strong>.
          </p>
        </motion.div>

        {/* Grille de cartes 2x2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {DESCRIPTION_CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className="h-full card-hover border-none shadow-lg bg-white"
                >
                  <CardBody className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      {/* Icône */}
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}cc 100%)`,
                        }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Statistique */}
                      <div className="text-right">
                        <div
                          className="text-3xl font-bold"
                          style={{ color: card.color }}
                        >
                          {card.stat}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          {card.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Titre */}
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {card.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Image du cycle biomasse */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white p-8 shadow-xl">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-semibold uppercase tracking-wider">
                Cycle de production
              </span>
              <h3 className="heading-md text-black mt-4">
                Comment fonctionne la <span className="text-edf-green">biomasse liquide</span> ?
              </h3>
            </div>
            <div className="relative aspect-[16/9] max-w-5xl mx-auto">
              <Image
                src={IMAGES.centrale.visuelBiomasse}
                alt="Cycle de production de la biomasse liquide"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

