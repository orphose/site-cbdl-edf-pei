"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { Zap, Leaf, Settings } from "lucide-react";

/**
 * Données des cartes de présentation
 */
const PRESENTATION_CARDS = [
  {
    icon: Settings,
    title: "Technologie de pointe",
    description:
      "La Centrale bioénergie du Larivot sera dotée de 7 moteurs de nouvelle génération fonctionnant avec de la biomasse liquide comme combustible renouvelable. Leur conception permet de générer une puissance de 120 MW et de sécuriser les besoins de l'île de Cayenne.",
    color: "#001A70",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Leaf,
    title: "Combustible écologique",
    description:
      "La centrale bioénergie du Larivot utilisera de la biomasse liquide, un biocombustible neutre en émission carbone. Elle permettra d'éviter l'émission d'environ 500.000 tonnes de CO2 annuellement et la qualité de l'air sera sensiblement améliorée.",
    color: "#88D910",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Énergie garantie et pilotable",
    description:
      "La Centrale bioénergie du Larivot pourra moduler sa puissance et son énergie en fonction de l'évolution des moyens de production intermittents comme le solaire et l'éolien.",
    color: "#FFB210",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

/**
 * Animation variants pour les cartes
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Section Présentation - Section 2
 * Une centrale qui produit une électricité 100% renouvelable
 */
export default function PresentationSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-green/10 text-edf-green text-sm font-medium mb-6">
            100% Renouvelable
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Une centrale qui produit une électricité{" "}
            <span className="text-edf-green">100% RENOUVELABLE</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Un outil essentiel au développement de la Guyane. Pour remplacer les
            anciens moyens de production et accompagner le développement
            économique et démographique du littoral, la centrale bioénergie du
            Larivot renforce les moyens de production en Guyane, assurant ainsi
            un équilibre entre l&apos;offre et la demande énergétique.
          </p>
        </motion.div>

        {/* Grille de cartes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {PRESENTATION_CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className="h-full card-hover border-none shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--background) 0%, var(--background) 100%)`,
                  }}
                >
                  <CardBody className="p-8">
                    {/* Icône */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6`}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: card.color }}
                      />
                    </div>

                    {/* Titre */}
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistiques clés */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "120", unit: "MW", label: "Puissance générée" },
            { value: "7", unit: "", label: "Moteurs nouvelle génération" },
            { value: "500K", unit: "t", label: "CO2 évitées/an" },
            { value: "100%", unit: "", label: "Énergie renouvelable" },
          ].map((stat, index) => (
            <div key={index} className="text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold text-edf-blue">
                  {stat.value}
                </span>
                <span className="text-xl text-edf-orange font-medium">
                  {stat.unit}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

