"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Section Hero - Page Centrale
 * LA CENTRALE - Une infrastructure moderne et fiable
 */
export default function CentraleHeroSection() {
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
              Infrastructure Énergétique
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            LA{" "}
            <span className="text-white">CENTRALE</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-white/90 font-light mb-8"
          >
            Une infrastructure{" "}
            <span className="text-edf-green font-semibold">moderne</span> et{" "}
            <span className="text-edf-orange font-semibold">fiable</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed"
          >
            Pour assurer la continuité de l&apos;approvisionnement en électricité 
            sur le territoire et soutenir ainsi la croissance démographique et 
            économique en Guyane.
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

      {/* Barre décorative en bas avec animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <motion.div
          className="h-full w-[200%]"
          style={{
            background: "linear-gradient(90deg, #FF6B35, #88D910, #001A70, #FF6B35, #88D910, #001A70)",
          }}
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}

