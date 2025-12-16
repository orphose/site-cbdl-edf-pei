"use client";

import { motion } from "framer-motion";
import { Handshake, Building2, Users2 } from "lucide-react";
import Image from "next/image";

/**
 * Données des points clés du consortium
 */
const CONSORTIUM_POINTS = [
  {
    icon: Handshake,
    title: "Partenariat local",
    description: "Une alliance stratégique avec des entreprises guyanaises solidement ancrées dans le tissu économique local.",
    color: "#001A70",
  },
  {
    icon: Building2,
    title: "600M€ d'investissement",
    description: "Un projet d'envergure répondant aux besoins de l'économie et de la société guyanaise.",
    color: "#FFB210",
  },
  {
    icon: Users2,
    title: "Valorisation locale",
    description: "Une stratégie de valorisation du savoir-faire local et d'implication dans le tissu économique du territoire.",
    color: "#88D910",
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/**
 * Section CONSORTIUM - Un engagement aux côtés des entreprises guyanaises
 */
export default function ChantierConsortiumSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-semibold mb-6 uppercase tracking-wide">
            Consortium
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase">
            Un engagement aux côtés des{" "}
            <span className="text-edf-blue">entreprises guyanaises</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Un partenariat local pour un projet phare. La construction de cette 
            centrale bioénergie met en lumière l&apos;agilité, la performance et 
            les savoir-faire complexes d&apos;entreprises locales engagées pour 
            le développement du territoire.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Colonne gauche - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
              <Image
                src="/modelisation_photo_1.png"
                alt="Modélisation de la Centrale Bioénergie du Larivot"
                fill
                className="object-cover"
              />
              {/* Overlay subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-edf-blue/20 to-transparent" />
            </div>

            {/* Badge statistique */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-edf-orange text-white shadow-xl p-6"
            >
              <div className="text-4xl font-bold">600M€</div>
              <div className="text-sm text-white/80 mt-1">
                d&apos;investissement
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Points clés */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {CONSORTIUM_POINTS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <div
                      className="relative bg-white border border-gray-100 p-6 transition-all duration-500 hover:shadow-xl hover:translate-x-1"
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
        </div>
      </div>
    </section>
  );
}

