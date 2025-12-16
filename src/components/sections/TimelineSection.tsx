"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, Building2, Droplets, Zap, Cog, Handshake, CheckCircle2 } from "lucide-react";

/**
 * Données de la timeline de construction
 */
const TIMELINE_STEPS = [
  {
    year: "2023",
    quarter: "S2",
    phase: "Terrassement",
    description: "Préparation du terrain et travaux de terrassement",
    icon: Truck,
    color: "#FFB210",
  },
  {
    year: "2024",
    quarter: "S1",
    phase: "Fondations",
    description: "Fondations profondes et pose des pieux",
    icon: Building2,
    color: "#88D910",
  },
  {
    year: "2024",
    quarter: "S2",
    phase: "Génie Civil",
    description: "Construction des structures principales",
    icon: Building2,
    color: "#001A70",
  },
  {
    year: "2025",
    quarter: "S1",
    phase: "Canalisation",
    description: "Travaux de pose de la canalisation",
    icon: Droplets,
    color: "#88D910",
  },
  {
    year: "2025",
    quarter: "S2",
    phase: "Électromécanique",
    description: "Installation des équipements électromécaniques",
    icon: Zap,
    color: "#FFB210",
  },
  {
    year: "2026",
    quarter: "S1",
    phase: "Raccordement",
    description: "Raccordement HTB au réseau",
    icon: Cog,
    color: "#001A70",
  },
  {
    year: "2026",
    quarter: "S2",
    phase: "Mise en service",
    description: "Essais finaux et mise en service",
    icon: Handshake,
    color: "#88D910",
    isLast: true,
  },
];

/**
 * Section Timeline - Section 5
 * Les grandes étapes de la construction
 * Design moderne avec animations progressives
 */
export default function TimelineSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Motif de fond subtil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10" ref={containerRef}>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-semibold mb-6">
            Construction
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Les grandes étapes de la{" "}
            <span className="text-edf-orange">construction</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Une mise en route opérationnelle à horizon 2026. Découvrez les
            jalons essentiels à la construction de la centrale bioénergie du
            Larivot.
          </p>
        </motion.div>

        {/* Timeline Desktop */}
        <div className="hidden lg:block relative">
          {/* Ligne de progression animée */}
          <div className="absolute top-[45px] left-0 right-0 h-0.5 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-edf-orange via-edf-green to-edf-blue rounded-full"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-7 gap-4">
            {TIMELINE_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Point sur la ligne */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                    className="relative mb-5"
                  >
                    {/* Cercle extérieur animé */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: step.color }}
                      initial={{ scale: 1, opacity: 0.3 }}
                      animate={isInView ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0, 0.15]
                      } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                    
                    {/* Cercle principal */}
                    <div
                      className="w-[90px] h-[90px] rounded-full flex items-center justify-center shadow-lg relative z-10 border-4 border-white"
                      style={{
                        background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                        boxShadow: `0 6px 25px ${step.color}25`
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Date discrète en bas à droite du cercle */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.15 }}
                      className="absolute -bottom-1 -right-1 z-20"
                    >
                      <div 
                        className="bg-white px-2 py-0.5 rounded-full shadow-md text-[10px] font-semibold tracking-wide"
                        style={{ color: step.color }}
                      >
                        {step.year} {step.quarter}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Contenu texte */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                    className="text-center"
                  >
                    <h3 
                      className="font-bold text-sm mb-2 uppercase tracking-wide"
                      style={{ color: step.color }}
                    >
                      {step.phase}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[130px] mx-auto">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Indicateur de fin */}
                  {step.isLast && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 2.5 }}
                      className="absolute -bottom-10"
                    >
                      <CheckCircle2 className="w-6 h-6 text-edf-green" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Mobile - Version verticale */}
        <div className="lg:hidden relative">
          {/* Ligne verticale */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200">
            <motion.div
              className="w-full bg-gradient-to-b from-edf-orange via-edf-green to-edf-blue"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-8">
            {TIMELINE_STEPS.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-6 relative"
                >
                  {/* Icône */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-lg relative z-10 border-2 border-white"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Contenu */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-gray-900">
                        {step.year}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {step.quarter}
                      </span>
                    </div>
                    <h3
                      className="font-bold text-base mb-1 uppercase"
                      style={{ color: step.color }}
                    >
                      {step.phase}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Statistiques animées */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "3", label: "ans de construction", suffix: "" },
            { value: "600", label: "millions d'euros", suffix: "M€" },
            { value: "120", label: "MW de puissance", suffix: "MW" },
            { value: "2026", label: "mise en service", suffix: "" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="text-3xl md:text-4xl font-bold text-edf-blue"
              >
                {stat.value}
                {stat.suffix && <span className="text-lg text-gray-400">{stat.suffix}</span>}
              </motion.span>
              <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
