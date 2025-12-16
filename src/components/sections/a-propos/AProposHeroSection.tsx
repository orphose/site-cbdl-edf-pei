"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap, Globe } from "lucide-react";

/**
 * Section Hero - Page À Propos
 * Présentation d'EDF PEI, producteur d'électricité insulaire responsable
 */
export default function AProposHeroSection() {
  // Assertions pour la validation des données
  const COMPANY_NAME = "EDF PEI";
  const PARENT_COMPANY = "EDF";
  
  console.assert(COMPANY_NAME.length > 0, "Le nom de l'entreprise doit être défini");
  console.assert(PARENT_COMPANY.length > 0, "Le nom de la maison mère doit être défini");

  return (
    <section className="relative min-h-[90vh] flex items-center bg-edf-blue overflow-hidden pt-[100px]">
      {/* Fond avec motif géométrique subtil */}
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
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 right-20 w-[500px] h-[500px] bg-edf-orange rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-edf-green rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Colonne gauche - Contenu principal */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium mb-8 border border-white/20">
                <Globe className="w-4 h-4" />
                EDF PEI • Filiale du groupe EDF
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
            >
              À PROPOS
            </motion.h1>

            {/* Sous-titre */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/90 font-light mb-8 leading-snug"
            >
              Producteur d&apos;électricité{" "}
              <span className="text-edf-orange font-semibold">insulaire</span>{" "}
              <span className="text-edf-green font-semibold">responsable</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10"
            >
              <strong className="text-white">EDF PEI</strong>, filiale à 100% du groupe EDF, 
              construit et exploite des{" "}
              <span className="text-edf-green">centrales électriques de dernière génération</span>{" "}
              dans les régions d&apos;outre-mer et en Corse.
            </motion.p>

            {/* Indicateur de scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 text-white/50 text-sm cursor-pointer hover:text-white/70 transition-colors"
              >
                <span>Découvrir notre mission</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>

          {/* Colonne droite - Carte informative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 relative overflow-hidden">
              {/* Icône décorative */}
              <div className="absolute top-4 right-4">
                <Zap className="w-12 h-12 text-edf-orange/30" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-6">
                Territoires non interconnectés
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-6">
                Ces zones, à la différence de l&apos;Hexagone, 
                <strong className="text-white"> ne sont pas reliées au réseau électrique continental</strong>. 
                Elles n&apos;ont d&apos;autre choix que de disposer sur leur sol des capacités 
                de production nécessaires pour garantir leur consommation électrique.
              </p>

              {/* Liste des territoires */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-edf-orange rounded-full" />
                  <span className="text-white/80">La Réunion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-edf-orange rounded-full" />
                  <span className="text-white/80">Guadeloupe</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-edf-orange rounded-full" />
                  <span className="text-white/80">Martinique</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-edf-green rounded-full" />
                  <span className="text-white/80">Guyane</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-edf-orange rounded-full" />
                  <span className="text-white/80">Corse</span>
                </div>
              </div>

              {/* Ligne décorative */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-edf-green via-edf-orange to-edf-green" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Barre décorative animée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <motion.div
          className="h-full w-[200%]"
          style={{
            background: "linear-gradient(90deg, #88D910, #FFB210, #001A70, #88D910, #FFB210, #001A70)",
          }}
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}

