"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Building2,
  Sun,
  Wind,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

/**
 * Liste des centrales exploitées par EDF PEI
 */
const CENTRALES = [
  {
    id: 1,
    nom: "Lucciana",
    localisation: "Corse",
    type: "Production",
    status: "En exploitation",
  },
  {
    id: 2,
    nom: "Port Est",
    localisation: "La Réunion",
    type: "Production",
    status: "En exploitation",
  },
  {
    id: 3,
    nom: "Pointe Jarry",
    localisation: "Guadeloupe",
    type: "Production",
    status: "En exploitation",
  },
  {
    id: 4,
    nom: "Bellefontaine",
    localisation: "Martinique",
    type: "Production",
    status: "En exploitation",
  },
];

/**
 * Projets en développement
 */
const PROJETS = [
  {
    id: 1,
    nom: "Centrale du Larivot",
    localisation: "Guyane",
    icon: Building2,
    description: "Construction en cours",
  },
  {
    id: 2,
    nom: "Montjoly",
    localisation: "Guyane",
    icon: Sun,
    description: "Photovoltaïque",
  },
  {
    id: 3,
    nom: "Gress",
    localisation: "Martinique",
    icon: Wind,
    description: "Éolien",
  },
];

/**
 * Section Expertise - Page À Propos
 * Un atout pour les territoires
 */
export default function AProposExpertiseSection() {
  // Assertions de validation
  console.assert(CENTRALES.length === 4, "4 centrales en exploitation");
  console.assert(PROJETS.length >= 2, "Au moins 2 projets en développement");

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--edf-blue) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-medium mb-6">
              <Settings className="w-4 h-4" />
              EXPERTISE
            </span>

            <h2 className="heading-lg text-edf-blue mb-6">
              Un atout pour les{" "}
              <span className="text-edf-green">territoires</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Gestion de projets, maîtrise d&apos;ouvrages de construction,
              exploitation des centrales...{" "}
              <strong className="text-edf-blue">nos équipes maîtrisent</strong>{" "}
              l&apos;ensemble de la chaîne de valeur avec un savoir-faire
              spécifique aux systèmes électriques non-interconnectés.
            </p>

            <p className="text-gray-500 leading-relaxed">
              Cette expertise s&apos;illustre également par des installations
              EnR photovoltaïques et éoliennes, ainsi qu&apos;un portefeuille de
              projets en cours de développement avec{" "}
              <strong className="text-edf-blue">EDF Renouvelables</strong>,
              autre filiale du Groupe.
            </p>
          </motion.div>

          {/* Image ou visuel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-edf-blue to-edf-blue-dark overflow-hidden">
              <Image
                src="/gestion_resp_1.png"
                alt="Expertise EDF PEI - Gestion responsable"
                fill
                className="object-cover mix-blend-luminosity opacity-60"
              />
              {/* Overlay avec texte */}
              <div className="absolute inset-0 flex items-end p-8">
                <div className="text-white">
                  <p className="text-3xl font-bold mb-2">4 centrales</p>
                  <p className="text-white/80">en exploitation active</p>
                </div>
              </div>
              {/* Ligne décorative */}
              <div className="absolute top-0 left-0 w-2 h-full bg-edf-orange" />
            </div>
          </motion.div>
        </div>

        {/* Liste des centrales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-edf-blue mb-8 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-edf-orange" />
            Centrales en exploitation
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CENTRALES.map((centrale, index) => (
              <motion.div
                key={centrale.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-gray-50 hover:bg-edf-blue transition-colors duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <MapPin className="w-5 h-5 text-edf-orange group-hover:text-edf-orange" />
                  <span className="text-xs font-medium px-2 py-1 bg-edf-green/10 text-edf-green group-hover:bg-edf-green group-hover:text-white transition-colors">
                    {centrale.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-1 transition-colors">
                  {centrale.nom}
                </h4>
                <p className="text-gray-500 group-hover:text-white/70 transition-colors">
                  {centrale.localisation}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projets en développement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-edf-blue mb-8 flex items-center gap-3">
            <ArrowRight className="w-6 h-6 text-edf-green" />
            Projets de construction et EnR
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJETS.map((projet, index) => {
              const Icon = projet.icon;
              return (
                <motion.div
                  key={projet.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="bg-gradient-to-br from-edf-blue to-edf-blue-dark p-6 text-white relative overflow-hidden group"
                >
                  {/* Icône de fond */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-20 h-20" />
                  </div>

                  <Icon className="w-8 h-8 text-edf-orange mb-4" />
                  <h4 className="text-xl font-semibold mb-2">{projet.nom}</h4>
                  <p className="text-white/70 mb-1">{projet.localisation}</p>
                  <span className="inline-block text-sm px-3 py-1 bg-white/10 mt-2">
                    {projet.description}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

