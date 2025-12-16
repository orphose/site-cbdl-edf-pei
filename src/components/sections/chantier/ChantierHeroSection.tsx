"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Section Hero - Page Chantier
 * LE CHANTIER - Un projet à la hauteur du territoire
 */
export default function ChantierHeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-edf-blue overflow-hidden pt-[100px]">
      {/* Fond avec motif géométrique */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 60%),
              linear-gradient(-30deg, transparent 40%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 60%)
            `,
            backgroundSize: "60px 100px",
          }}
        />
      </div>

      {/* Cercles décoratifs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-edf-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-edf-green/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-medium mb-8 border border-white/20">
              Construction & Emploi
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            LE CHANTIER
          </motion.h1>

          {/* Sous-titre */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-white/90 font-light mb-8"
          >
            Un projet à la{" "}
            <span className="text-edf-orange font-semibold">hauteur</span>{" "}
            du{" "}
            <span className="text-edf-green font-semibold">territoire</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed"
          >
            Plus qu&apos;une infrastructure énergétique, la future centrale 
            bioénergie du Larivot est un{" "}
            <span className="text-white font-semibold">projet d&apos;avenir</span>{" "}
            pour un territoire en pleine croissance économique et un vecteur 
            d&apos;emplois durables.
          </motion.p>

          {/* Indicateur de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 text-white/50 text-sm"
            >
              <span>Découvrir</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Barre décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-edf-orange" />
        <div className="flex-1 bg-edf-green" />
        <div className="flex-1 bg-edf-blue" />
      </div>
    </section>
  );
}
