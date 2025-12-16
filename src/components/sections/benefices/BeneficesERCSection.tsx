"use client";

import { motion } from "framer-motion";
import { TreePine, Waves, MapPin } from "lucide-react";
import Image from "next/image";

/**
 * Données des mesures ERC
 */
const ERC_MEASURES = [
  {
    icon: TreePine,
    title: "Protéger la flore locale",
    description:
      "La localisation de la centrale a été choisie pour éviter toute interférence avec la flore protégée, dans le cadre d'une démarche engagée pour la préservation du patrimoine naturel guyanais. Des actions concrètes sont menées, comme la restauration de la population de palmiers Murumuru via la semence sélective et le transplant de jeunes plants. La zone fait l'objet d'une surveillance soutenue pour garantir la pérennité de cette espèce.",
    color: "#88D910",
    highlight: "Murumuru",
    highlightLabel: "Palmier protégé",
    image: "/murumuru_1.jpg",
  },
  {
    icon: Waves,
    title: "Sauvegarder la mangrove",
    description:
      "Un engagement fort est pris pour préserver la mangrove présente sur le site, garantissant qu'aucune portion ne soit affectée par l'implantation de la centrale. L'élaboration actuelle d'un plan de gestion rigoureux traduit la volonté de protéger et préserver durablement cet écosystème vital. Il s'agit d'une démarche cruciale démontrant notre détermination à maintenir l'équilibre de cette zone essentielle.",
    color: "#00d4ff",
    highlight: "100%",
    highlightLabel: "Mangrove préservée",
    image: "/mangrove_1.png",
  },
  {
    icon: MapPin,
    title: "Limiter et compenser les impacts",
    description:
      "150 hectares de zones naturelles à haute valeur patrimoniale seront sanctuarisés et préservés. Un plan de gestion minutieux sera élaboré avec le Parc Naturel Régional de Guyane. Initiée et financée par EDF PEI avec le soutien de la CTG, cette démarche traduit un engagement concret pour la protection de l'environnement.",
    color: "#FFB210",
    highlight: "150 ha",
    highlightLabel: "Zones sanctuarisées",
    image: "/resp_approch.jpg",
  },
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/**
 * Section NOS MESURES ERC - Éviter, Réduire, Compenser
 */
export default function BeneficesERCSection() {
  // Assertions de validation
  console.assert(ERC_MEASURES.length === 3, "3 mesures ERC attendues");
  console.assert(ERC_MEASURES.every(m => m.title && m.description), "Données complètes requises");

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-green-50/50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-semibold mb-6 uppercase tracking-wide">
            Nos Mesures ERC
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Éviter, réduire, compenser :{" "}
            <span className="text-edf-orange">une approche environnementale</span>{" "}
            responsable
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            EDF PEI fait de la préservation de l&apos;environnement et de la 
            biodiversité une priorité durant toute la phase de construction et 
            de fonctionnement de la centrale bioénergie du Larivot. Ainsi, nous 
            nous sommes engagés à limiter l&apos;impact environnemental à travers 
            une série de mesures compensatoires.
          </p>
        </motion.div>

        {/* Introduction ERC */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          {/* Texte explicatif */}
          <div className="max-w-3xl space-y-6">
            <h3 className="text-2xl font-bold text-edf-blue">
              Une approche responsable
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Construite sur l&apos;Île de Cayenne, une zone où la pression 
              anthropique et urbanistique est très forte, la future centrale 
              bioénergie du Larivot incarne notre engagement à respecter et 
              protéger l&apos;environnement.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Pour cela, nous adoptons l&apos;approche{" "}
              <strong className="text-edf-green">ERC</strong> pour{" "}
              <strong className="text-edf-blue">« Éviter, Réduire, Compenser »</strong>{" "}
              afin de minimiser l&apos;impact résiduel sur la biodiversité locale.
            </p>

            {/* Badges ERC */}
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                { letter: "E", word: "Éviter", color: "#88D910" },
                { letter: "R", word: "Réduire", color: "#FFB210" },
                { letter: "C", word: "Compenser", color: "#001A70" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white shadow-md border border-gray-100"
                >
                  <span
                    className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.letter}
                  </span>
                  <span className="font-medium text-gray-700">{item.word}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grille des mesures */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {ERC_MEASURES.map((measure, index) => {
            const IconComponent = measure.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    !isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Contenu texte */}
                  <div className={`${!isEven ? "lg:col-start-2" : ""}`}>
                    <div
                      className="relative bg-white border border-gray-100 p-8 shadow-lg transition-all duration-500 hover:shadow-xl"
                      style={{
                        borderLeft: `4px solid ${measure.color}`,
                      }}
                    >
                      {/* Fond au hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${measure.color}05 0%, transparent 50%)`,
                        }}
                      />

                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                            style={{
                              background: `linear-gradient(135deg, ${measure.color} 0%, ${measure.color}cc 100%)`,
                            }}
                          >
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>

                          <div className="text-right">
                            <div
                              className="text-xl font-bold"
                              style={{ color: measure.color }}
                            >
                              {measure.highlight}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                              {measure.highlightLabel}
                            </div>
                          </div>
                        </div>

                        {/* Titre */}
                        <h3
                          className="text-xl font-bold mb-4"
                          style={{ color: measure.color }}
                        >
                          {measure.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {measure.description}
                        </p>

                        {/* Barre décorative */}
                        <div
                          className="mt-6 h-1 w-20"
                          style={{ backgroundColor: measure.color }}
                        />
                      </div>

                      {/* Numéro décoratif */}
                      <div
                        className="absolute top-4 right-6 text-7xl font-bold leading-none opacity-[0.03] select-none"
                        style={{ color: measure.color }}
                      >
                        0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Photo */}
                  <div className={`${!isEven ? "lg:col-start-1" : ""}`}>
                    <div className="relative aspect-[4/3] overflow-hidden group">
                      <Image
                        src={measure.image}
                        alt={measure.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Étiquette */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center bg-white shadow-lg">
                          <div
                            className="w-1.5 h-full absolute left-0 top-0 bottom-0"
                            style={{ backgroundColor: measure.color }}
                          />
                          <span
                            className="font-bold text-sm uppercase tracking-wide px-4 py-2 pl-5"
                            style={{ color: measure.color }}
                          >
                            {measure.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bandeau partenariat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-white border border-gray-100 shadow-lg p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-edf-blue mb-4">
                Un engagement partagé pour l&apos;environnement
              </h3>
              <p className="text-gray-600 leading-relaxed">
                En partenariat avec le Parc Naturel Régional de Guyane et avec 
                le soutien de la Collectivité Territoriale de Guyane (CTG), 
                EDF PEI s&apos;engage concrètement pour la préservation de 
                l&apos;environnement guyanais.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center md:justify-end">
              {[
                { value: "150 ha", label: "Zones protégées", color: "#88D910" },
                { value: "EDF PEI", label: "Porteur du projet", color: "#001A70" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center px-6 py-4 border-l-4"
                  style={{ borderColor: item.color }}
                >
                  <div
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

