"use client";

import { IMAGES, VIDEOS } from "@/lib/media";

import { motion } from "framer-motion";
import { Check, MapPin, Shield, Building2, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

/**
 * Section EMPRISE - Une emprise au sol limitée
 * Design unifié et cohérent avec le reste du site
 */
export default function CentraleEmpriseSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Motif de fond subtil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
            backgroundSize: "48px 48px",
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
          <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-semibold mb-6 uppercase tracking-wide">
            Emprise
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Une emprise au sol{" "}
            <span className="text-edf-orange">limitée</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            À puissance équivalente et énergie garantie, la Centrale Bioénergie
            du Larivot occupera{" "}
            <strong className="text-edf-blue">80 fois moins de place</strong>{" "}
            qu&apos;une centrale photovoltaïque avec stockage.
          </p>
        </motion.div>

        {/* Grille principale : Image + Infos */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-16">
          {/* Colonne gauche : Infographie */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-white shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col">
              {/* Image */}
              <div className="relative flex-1 min-h-[300px]">
                <Image
                  src={IMAGES.centrale.emprise2}
                  alt="Comparaison : Centrale bioénergie du Larivot (10 ha) vs Centrale photovoltaïque avec stockage (800 ha)"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Légende compacte */}
              <div className="bg-edf-blue px-6 py-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-edf-green rounded-full" />
                      <span className="text-sm">
                        <strong>10 ha</strong> Bioénergie
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white/50 rounded-full" />
                      <span className="text-sm">
                        <strong>800 ha</strong> Photovoltaïque
                      </span>
                    </div>
                  </div>
                  <div className="bg-edf-orange px-3 py-1 rounded text-sm font-bold">
                    80x moins
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite : Points clés + Localisation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Cards des points clés */}
            {[
              {
                icon: Check,
                title: "Consultations locales",
                description:
                  "Projet majeur en Guyane validé après des consultations publiques approfondies avec les acteurs du territoire.",
                color: "#88D910",
              },
              {
                icon: Shield,
                title: "Site sécurisé",
                description:
                  "Emplacement choisi pour éviter les risques d'inondation, conformément au Plan de Prévention des Risques d'Inondation (PPRI).",
                color: "#FFB210",
              },
              {
                icon: Building2,
                title: "Zone économique stratégique",
                description:
                  "Située à Matoury, au cœur du Grand Parc Économique Terca-Larivot-Collery, à proximité des grands consommateurs.",
                color: "#001A70",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div
                    className="bg-white p-5 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ borderLeft: `4px solid ${item.color}` }}
                  >
                    <div className="flex gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: item.color }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-bold mb-1"
                          style={{ color: item.color }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bandeau localisation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="grid md:grid-cols-4">
            {/* Info principale */}
            <div className="md:col-span-2 p-8">
              <h3 className="text-xl font-bold text-edf-blue mb-1">
                Localisation stratégique
              </h3>
              <p className="text-gray-600">
                Zone industrielle de Matoury, agglomération de Cayenne
              </p>
            </div>

            {/* Stats rapides */}
            {[
              { value: "Matoury", label: "Commune", color: "#001A70" },
              { value: "50%", label: "Population alimentée", color: "#FFB210" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-8 border-l border-gray-100 flex flex-col justify-center"
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
