"use client";

import { motion } from "framer-motion";
import { Users, AlertTriangle, CheckCircle2, Target, HeartPulse } from "lucide-react";

/**
 * Engagements sécurité
 */
const SECURITY_POINTS = [
  {
    icon: Target,
    text: "Politique du zéro accident",
  },
  {
    icon: HeartPulse,
    text: "Protection de la santé de tous",
  },
  {
    icon: Users,
    text: "Commission de coordination dédiée",
  },
  {
    icon: AlertTriangle,
    text: "Analyse et prévention des risques",
  },
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/**
 * Section SÉCURITÉ - La sécurité, une priorité absolue
 */
export default function ChantierSecuritySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-edf-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-edf-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Colonne gauche - Contenu */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-semibold mb-6 uppercase tracking-wide">
              Sécurité
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 uppercase leading-tight">
              La sécurité, une{" "}
              <span className="text-edf-orange">priorité absolue</span>{" "}
              sur le chantier
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              La sécurité des salariés et des prestataires est un objectif 
              majeur pour EDF PEI qui promeut la politique du{" "}
              <strong className="text-gray-800">zéro accident</strong>. 
              Nous nous engageons à garantir la sécurité et protéger 
              la santé de toutes les parties prenantes du projet.
            </p>

            {/* Points d'engagement */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {SECURITY_POINTS.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 bg-gray-50 px-4 py-3 border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-edf-orange/10 flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4 text-edf-orange" />
                    </div>
                    <span className="text-gray-800 text-sm font-medium">
                      {point.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Colonne droite - Visuel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Carte principale */}
            <div className="bg-white border border-gray-200 shadow-lg p-10 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Contenu */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                  <span className="px-4 py-1 bg-edf-orange text-white text-xs font-bold uppercase tracking-wider">
                    Engagement EDF PEI
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-3xl font-bold text-black text-center mb-4 uppercase tracking-wide">
                  Objectif Zéro Accident
                </h3>

                <p className="text-black text-center mb-10 max-w-md mx-auto">
                  Une commission dédiée coordonne les activités, accompagne 
                  la prévention et analyse les risques en permanence.
                </p>

                {/* Indicateurs avec couleurs EDF */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    { label: "Coordination", color: "#001A70", bgColor: "rgba(0, 26, 112, 0.1)" },
                    { label: "Prévention", color: "#88D910", bgColor: "rgba(136, 217, 16, 0.1)" },
                    { label: "Analyse", color: "#FFB210", bgColor: "rgba(255, 178, 16, 0.1)" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="text-center"
                    >
                      <motion.div 
                        className="w-12 h-12 md:w-16 md:h-16 mx-auto flex items-center justify-center mb-2 md:mb-3 border-2"
                        style={{ 
                          borderColor: item.color,
                          backgroundColor: item.bgColor,
                        }}
                        animate={{
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <CheckCircle2 
                          className="w-5 h-5 md:w-8 md:h-8" 
                          style={{ color: item.color }}
                        />
                      </motion.div>
                      <div 
                        className="font-bold text-[10px] md:text-sm uppercase tracking-wide"
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Ligne décorative bas - Couleurs EDF */}
                <div className="mt-10 flex justify-center">
                  <div className="flex gap-2">
                    <motion.div 
                      className="w-3 h-3 bg-edf-blue"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-edf-green"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-edf-orange"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    />
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
