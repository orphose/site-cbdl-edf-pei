"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

/**
 * Section Hero - Page La Centrale
 * Titre principal avec fond bleu EDF et design moderne
 */
export default function CentraleHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[100px]">
      {/* Fond avec gradient EDF */}
      <div className="absolute inset-0 bg-gradient-to-br from-edf-blue via-edf-blue-light to-edf-blue" />
      
      {/* Motif géométrique de fond */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.03) 60%, transparent 60%),
              linear-gradient(-30deg, transparent 40%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.03) 60%, transparent 60%)
            `,
            backgroundSize: '60px 100px',
          }}
        />
      </div>

      {/* Cercles décoratifs animés */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-edf-orange/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-edf-green/20 blur-3xl"
      />

      {/* Contenu */}
      <div className="relative z-10 container-custom text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
        >
          <Building2 className="w-4 h-4 text-edf-orange" />
          <span className="text-white/90 text-sm font-medium">Infrastructure Énergétique</span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 uppercase tracking-tight"
        >
          LA <span className="text-edf-orange">CENTRALE</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-8 max-w-4xl mx-auto"
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
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
        >
          Pour assurer la continuité de l&apos;approvisionnement en électricité sur le territoire 
          et soutenir ainsi la croissance démographique et économique en Guyane.
        </motion.p>

        {/* Statistique mise en avant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 inline-flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-bold text-edf-orange">120</span>
            <span className="text-xl text-white/80 ml-1">MW</span>
            <p className="text-sm text-white/50 mt-1">Puissance garantie</p>
          </div>
          <div className="w-px h-16 bg-white/20" />
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-bold text-edf-green">7</span>
            <p className="text-sm text-white/50 mt-1">Moteurs haute performance</p>
          </div>
          <div className="w-px h-16 bg-white/20" />
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-bold text-white">100%</span>
            <p className="text-sm text-white/50 mt-1">Renouvelable</p>
          </div>
        </motion.div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 60C1248 60 1344 72 1392 78L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

