"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Shield, Building2, CheckCircle } from "lucide-react";
import Image from "next/image";

/**
 * Composant pour animer un compteur
 */
function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/**
 * Points clés de localisation
 */
const LOCATION_POINTS = [
  {
    icon: CheckCircle,
    text: "Projet majeur en Guyane après consultations locales.",
  },
  {
    icon: Shield,
    text: "Site choisi pour éviter les risques d'inondation selon le PPRI.",
  },
  {
    icon: Building2,
    text: "Centrale à Matoury, cœur du nouveau parc économique Larivot.",
  },
];

/**
 * Section EMPRISE - Une emprise au sol limitée
 */
export default function FootprintSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-semibold mb-6 uppercase tracking-wider">
            Emprise
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase">
            Une emprise au sol{" "}
            <span className="text-edf-orange">limitée</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            À puissance équivalente et énergie garantie, la Centrale Bioénergie du Larivot 
            occupera <strong className="text-edf-blue">80 fois moins de place</strong> qu&apos;une centrale photovoltaïque avec stockage.
          </p>
        </motion.div>

        {/* Infographie de comparaison animée */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 shadow-xl border border-gray-100">
            {/* Titre de l'infographie */}
            <div className="text-center mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-edf-blue mb-2">
                Comparaison de la surface nécessaire pour 120 MW de puissance
              </h3>
              <p className="text-gray-500">
                Centrale bioénergie vs. Centrale photovoltaïque avec stockage
              </p>
            </div>

            {/* Comparaison visuelle */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Centrale Bioénergie */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <div className="relative">
                  {/* Carré représentant la surface */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-edf-green to-edf-green/80 mx-auto shadow-lg flex items-center justify-center"
                  >
                    <Building2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </motion.div>
                  
                  {/* Indicateur de taille */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-6"
                  >
                    <div className="text-5xl md:text-6xl font-bold text-edf-green">
                      <AnimatedCounter end={10} duration={1500} />
                    </div>
                    <div className="text-xl text-gray-600 font-medium">hectares</div>
                  </motion.div>
                </div>
                
                <div className="mt-4 px-4 py-2 bg-edf-green/10 inline-block">
                  <span className="text-edf-green font-semibold">Centrale Bioénergie du Larivot</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">120 MW garantis</p>
              </motion.div>

              {/* Séparateur VS */}
              <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-gray-100"
                >
                  <span className="text-xl font-bold text-gray-400">VS</span>
                </motion.div>
              </div>

              {/* Centrale Photovoltaïque */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <div className="relative">
                  {/* Grand rectangle représentant la surface */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="w-full max-w-xs h-40 md:h-48 bg-gradient-to-br from-blue-400 to-cyan-500 mx-auto shadow-lg relative overflow-hidden"
                  >
                    {/* Motif de panneaux solaires */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 10px,
                            rgba(255,255,255,0.3) 10px,
                            rgba(255,255,255,0.3) 12px
                          ),
                          repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 20px,
                            rgba(255,255,255,0.3) 20px,
                            rgba(255,255,255,0.3) 22px
                          )
                        `,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/80 text-xs font-medium">☀️ Panneaux + Stockage</span>
                    </div>
                  </motion.div>
                  
                  {/* Indicateur de taille */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-6"
                  >
                    <div className="text-5xl md:text-6xl font-bold text-blue-500">
                      <AnimatedCounter end={800} duration={2000} />
                    </div>
                    <div className="text-xl text-gray-600 font-medium">hectares</div>
                  </motion.div>
                </div>
                
                <div className="mt-4 px-4 py-2 bg-blue-500/10 inline-block">
                  <span className="text-blue-600 font-semibold">Centrale photovoltaïque avec stockage</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">120 MW intermittents</p>
              </motion.div>
            </div>

            {/* Barre de comparaison animée */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-4">
                <div className="text-right w-32">
                  <span className="text-sm font-semibold text-edf-green">10 ha</span>
                </div>
                <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "1.25%" } : { width: "0%" }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-edf-green to-edf-green/80 rounded-full"
                  />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full"
                  />
                </div>
                <div className="w-32">
                  <span className="text-sm font-semibold text-blue-500">800 ha</span>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                <strong className="text-edf-orange">80x moins d&apos;emprise</strong> pour la même puissance garantie
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image de comparaison officielle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative aspect-[16/9] max-w-5xl mx-auto shadow-2xl overflow-hidden">
            <Image
              src="/emprise_cbdl_vs_solaire.png"
              alt="Comparaison de l'emprise au sol - Centrale Bioénergie vs Photovoltaïque"
              fill
              className="object-contain bg-white"
            />
          </div>
        </motion.div>

        {/* Points clés de localisation */}
        <div className="grid md:grid-cols-3 gap-8">
          {LOCATION_POINTS.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex items-start gap-4 p-6 bg-gray-50 border-l-4 border-edf-blue"
              >
                <IconComponent className="w-6 h-6 text-edf-blue shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">{point.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Description de la localisation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-edf-blue text-white p-8 md:p-12"
        >
          <div className="flex items-start gap-6">
            <MapPin className="w-10 h-10 text-edf-orange shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-4">
                Une localisation stratégique
              </h3>
              <p className="text-white/80 leading-relaxed">
                Cette centrale est stratégiquement située dans la zone industrielle de Matoury, 
                au sein de l&apos;agglomération de Cayenne. À proximité des secteurs à forte consommation 
                électrique, elle s&apos;intègre dans le Grand Parc Économique Terca-Larivot-Collery. 
                Une localisation optimale pour alimenter le cœur économique de la Guyane en électricité durable.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

