"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import Image from "next/image";

/**
 * Statistiques économiques du projet
 */
const ECONOMIC_STATS = [
  {
    value: "250-500",
    label: "personnes mobilisées",
    sublabel: "en moyenne / pics d'activité",
    color: "#001A70",
  },
  {
    value: "1 200",
    label: "emplois",
    sublabel: "directs et indirects",
    color: "#88D910",
  },
  {
    value: "130M€",
    label: "retombées directes",
    sublabel: "pour le territoire guyanais",
    color: "#FFB210",
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Section RETOMBÉES ÉCONOMIQUES
 * Une contribution au développement socio-économique de la Guyane
 */
export default function ChantierEconomicSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-edf-green/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-green/10 text-green-700 text-sm font-semibold mb-6 uppercase tracking-wide">
            Retombées Économiques
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase">
            Une contribution au{" "}
            <span className="text-edf-green">développement</span>{" "}
            socio-économique
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Un impact humain, social et économique positif pour la Guyane.
          </p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {ECONOMIC_STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4"
                style={{ borderTopColor: stat.color }}
              >
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-800 font-semibold">
                  {stat.label}
                </div>
                <div className="text-gray-500 text-sm">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Contenu détaillé */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Impact humain */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-edf-blue" />
                <h3 className="text-xl font-bold text-edf-blue">
                  Un impact humain et social positif
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Le chantier de construction mobilisera en moyenne{" "}
                <strong className="text-gray-800">250 personnes</strong> et 
                jusqu&apos;à <strong className="text-gray-800">500</strong> lors 
                des pics d&apos;activité. Ce projet nécessitera au total{" "}
                <strong className="text-gray-800">1 200 emplois</strong> directs 
                et indirects pour sa construction et son fonctionnement.
              </p>
            </div>

            {/* Impact économique */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-edf-green" />
                <h3 className="text-xl font-bold text-green-700">
                  Un impact économique majeur
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ce projet d&apos;envergure devrait générer plus de{" "}
                <strong className="text-gray-800">130 millions d&apos;euros</strong>{" "}
                de retombées directes pour le territoire guyanais,{" "}
                <strong className="text-gray-800">sans aucun impact sur la facture 
                d&apos;électricité des guyanais</strong>. Cet investissement massif 
                d&apos;EDF PEI démontre un engagement fort pour un développement 
                économique responsable et pérenne.
              </p>
            </div>
          </motion.div>

          {/* Colonne droite - Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden shadow-lg">
                <Image
                  src="/gestion_resp_1.png"
                  alt="Gestion responsable du chantier"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden shadow-lg mt-8">
                <Image
                  src="/ferme_peda_1.jpg"
                  alt="Impact local du projet"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

