"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { 
  Wind as WindIcon,
  ChevronRight
} from "lucide-react";

/**
 * Données des centrales et projets
 */
const EXPERTISE_ITEMS = [
  {
    title: "Centrales en exploitation",
    subtitle: "Production d'électricité",
    items: [
      { name: "Lucciana", location: "Corse" },
      { name: "Port Est", location: "La Réunion" },
      { name: "Pointe Jarry", location: "Guadeloupe" },
      { name: "Bellefontaine", location: "Martinique" },
    ],
    color: "#001A70",
    gradient: "linear-gradient(135deg, #001A70 0%, #1a3a8c 100%)",
  },
  {
    title: "Projets en construction",
    subtitle: "Développement en cours",
    items: [
      { name: "Nouvelle centrale", location: "Corse" },
      { name: "Centrale Bioénergie du Larivot", location: "Guyane" },
    ],
    color: "#FFB210",
    gradient: "linear-gradient(135deg, #FFB210 0%, #ff9500 100%)",
  },
  {
    title: "Installations EnR",
    subtitle: "Énergies renouvelables",
    items: [
      { name: "Montjoly", location: "Guyane", type: "Photovoltaïque" },
      { name: "Gress", location: "Martinique", type: "Éolien" },
    ],
    color: "#88D910",
    gradient: "linear-gradient(135deg, #88D910 0%, #6bc700 100%)",
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

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Section Expertise - Page À propos
 * Un atout pour les territoires
 */
export default function AboutExpertiseSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-80 h-80 bg-edf-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-edf-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Colonne gauche - Texte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-medium mb-6">
              Expertise
            </span>
            <h2 className="heading-lg text-black mb-6 uppercase">
              Un <span className="text-edf-orange">atout</span> pour les territoires
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nos équipes maîtrisent l&apos;ensemble de la chaîne de valeur énergétique : 
              de la <strong className="text-edf-blue">gestion de projets</strong> à la 
              <strong className="text-edf-blue"> maîtrise d&apos;ouvrage</strong>, jusqu&apos;à 
              l&apos;<strong className="text-edf-blue">exploitation</strong> des centrales.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Ce savoir-faire unique est spécifiquement adapté aux systèmes électriques 
              non interconnectés, garantissant une expertise de pointe au service de la 
              sécurité énergétique de chaque territoire.
            </p>

            {/* Bloc partenariat */}
            <Card className="border-l-4 border-l-edf-green bg-white shadow-sm">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-edf-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <WindIcon className="w-5 h-5 text-edf-green" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">
                      Portefeuille EnR en développement
                    </h4>
                    <p className="text-gray-600 text-sm">
                      En collaboration avec <strong>EDF Renouvelables</strong>, autre filiale 
                      du Groupe, nous développons un portefeuille de projets d&apos;énergies 
                      renouvelables pour accélérer la transition énergétique.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Colonne droite - Cartes améliorées */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {EXPERTISE_ITEMS.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-none shadow-xl bg-white overflow-hidden group">
                    
                    <CardBody className="p-0">
                      {/* Header de la carte */}
                      <div className="px-6 pt-6 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className="text-xl font-bold"
                            style={{ color: item.color }}
                          >
                            {item.title}
                          </h3>
                          {/* Badge compteur */}
                          <span 
                            className="px-3 py-1 text-xs font-bold text-white"
                            style={{ background: item.gradient }}
                          >
                            {item.items.length} sites
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Liste des sites */}
                      <div className="px-6 pb-6">
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                          {item.items.map((subItem, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2"
                            >
                              <span className="font-semibold text-gray-800">
                                {subItem.name}
                              </span>
                              <ChevronRight 
                                className="w-4 h-4 text-gray-300 flex-shrink-0" 
                              />
                              <span className="text-gray-500 text-sm">
                                {subItem.location}
                              </span>
                              {/* Type pour EnR */}
                              {"type" in subItem && subItem.type && (
                                <span 
                                  className="px-2 py-0.5 text-xs font-medium rounded-md flex-shrink-0"
                                  style={{ 
                                    backgroundColor: `${item.color}15`,
                                    color: item.color 
                                  }}
                                >
                                  {subItem.type}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
