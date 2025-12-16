"use client";

import { motion } from "framer-motion";
import { Wind, Leaf, Factory, Settings, Eye, ArrowRight } from "lucide-react";
import { Card, CardBody } from "@nextui-org/react";

/**
 * Données des sous-sections qualité de l'air
 */
const AIR_QUALITY_ITEMS = [
  {
    icon: Leaf,
    title: "Biocombustible neutre",
    description:
      "La biomasse, en tant que source d'énergie renouvelable, présente un bilan carbone neutre en termes d'émissions directes (« scope 1 » selon les normes internationales). Cette neutralité carbone est atteinte grâce à l'équilibre entre le dioxyde de carbone (CO2) émis lors de la combustion des bioénergies et la quantité de CO2 absorbée pendant la croissance des plantes utilisées comme biomasse. Ce cycle naturel permet une réabsorption du carbone libéré, minimisant de ce fait l'impact sur le changement climatique.",
    color: "#88D910",
    highlight: "Neutre",
    highlightLabel: "bilan carbone",
  },
  {
    icon: Factory,
    title: "Traitement des fumées",
    description:
      "L'installation d'un système de traitement additionnel des fumées, grâce à la technologie de réduction catalytique sélective (SCR), constitue une avancée significative dans la maîtrise des émissions polluantes. Ce procédé, qui s'appuie sur des méthodes rigoureuses, permet de minimiser efficacement la libération de substances nocives dans l'atmosphère, notamment les oxydes d'azote (NOx), reconnus pour leur impact négatif sur la qualité de l'air et la santé humaine.",
    color: "#001A70",
    highlight: "SCR",
    highlightLabel: "technologie",
  },
  {
    icon: Settings,
    title: "Conception adaptée",
    description:
      "Une analyse environnementale rigoureuse a conduit à une conception parfaitement adaptée aux spécificités du site d'implantation de la centrale. De l'ajustement précis de la taille des cheminées à l'optimisation minutieuse des procédures opérationnelles, chaque élément a été finement calibré. Cette démarche garantit une amélioration durable et significative de la qualité de l'air.",
    color: "#FFB210",
    highlight: "100%",
    highlightLabel: "adapté au site",
  },
  {
    icon: Eye,
    title: "Surveillance de la qualité de l'air",
    description:
      "Une surveillance systématique de la qualité de l'air sera instaurée, à l'instar des mesures déjà mises en place dans les quatre autres centrales opérées par EDF PEI. Cette initiative souligne un engagement soutenu en faveur d'une exploitation énergétique responsable et respectueuse de l'environnement.",
    color: "#00d4ff",
    highlight: "24/7",
    highlightLabel: "surveillance",
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Section QUALITÉ DE L'AIR - Améliorer la qualité de l'air
 */
export default function BeneficesAirQualitySection() {
  // Assertions de validation
  console.assert(AIR_QUALITY_ITEMS.length === 4, "4 éléments attendus pour la qualité de l'air");
  console.assert(AIR_QUALITY_ITEMS.every(item => item.icon && item.title), "Données complètes requises");

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
            Qualité de l&apos;air
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Améliorer la qualité de l&apos;air :{" "}
            <span className="text-edf-green">un enjeu prioritaire</span>{" "}
            pour la Guyane
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            La centrale bioénergie du Larivot utilise des techniques{" "}
            <strong className="text-edf-green">avancées et innovantes</strong>{" "}
            afin de minimiser son impact sur la qualité de l&apos;air environnant. 
            L&apos;emploi de la biomasse liquide, caractérisée par une absence 
            de soufre et de métaux, contribue efficacement à la réduction des 
            émissions de particules fines.
          </p>
        </motion.div>

        {/* Grille de cartes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {AIR_QUALITY_ITEMS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className="h-full card-hover border-none shadow-lg bg-white"
                  radius="none"
                >
                  <CardBody className="p-6">
                    {/* Header avec icône et stat */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Icône */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}cc 100%)`,
                        }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
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
                      className="text-lg font-bold mb-3"
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
                      className="mt-5 h-1 w-16"
                      style={{ backgroundColor: card.color }}
                    />

                    {/* Numéro décoratif */}
                    <div
                      className="absolute top-4 right-4 text-7xl font-bold leading-none opacity-[0.03] select-none"
                      style={{ color: card.color }}
                    >
                      0{index + 1}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bandeau statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-edf-green text-white overflow-hidden"
        >
          <div className="grid md:grid-cols-4">
            {[
              { value: "0%", label: "Soufre dans le biocombustible" },
              { value: "0%", label: "Métaux lourds" },
              { value: "-90%", label: "Réduction NOx (SCR)" },
              { value: "5", label: "Centrales EDF PEI surveillées" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`p-8 text-center ${index > 0 ? "border-l border-white/20" : ""}`}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

