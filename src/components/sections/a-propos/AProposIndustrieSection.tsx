"use client";

import { motion } from "framer-motion";
import { Shield, Leaf, Target, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

/**
 * Points forts de l'excellence industrielle
 */
const ATOUTS = [
  {
    id: 1,
    titre: "Haute disponibilité",
    description:
      "Nos installations renforcent la sécurité des réseaux électriques insulaires",
    icon: Shield,
  },
  {
    id: 2,
    titre: "Énergie garantie",
    description:
      "Une production ajustable et pilotable pour accompagner les EnR intermittentes",
    icon: Target,
  },
  {
    id: 3,
    titre: "Décarbonation",
    description:
      "Conversion à la biomasse liquide pour réduire l'empreinte carbone",
    icon: Leaf,
  },
];

/**
 * Section Excellence Industrielle - Page À Propos
 * L'excellence industrielle d'EDF PEI
 */
export default function AProposIndustrieSection() {
  // Assertions de validation
  console.assert(ATOUTS.length === 3, "3 atouts principaux définis");
  console.assert(
    ATOUTS.every((a) => a.icon),
    "Chaque atout doit avoir une icône"
  );

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-edf-blue/5 -skew-x-12 transform origin-top-right" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Colonne gauche - Visuel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Image principale */}
              <div className="relative aspect-square bg-edf-blue overflow-hidden">
                <Image
                  src="/visuel_biomasse_1.png"
                  alt="Excellence industrielle EDF PEI - Biomasse"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-edf-blue/80 via-transparent to-transparent" />

                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-edf-green flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Raison d&apos;être EDF
                      </p>
                      <p className="font-semibold text-edf-blue">
                        Un avenir énergétique neutre en CO₂
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Élément décoratif */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-edf-orange/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-edf-green -z-10" />
            </div>
          </motion.div>

          {/* Colonne droite - Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-edf-green/10 text-edf-green text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              INDUSTRIE
            </span>

            <h2 className="heading-lg text-edf-blue mb-6">
              L&apos;excellence industrielle{" "}
              <span className="text-edf-orange">d&apos;EDF PEI</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              La haute disponibilité de nos installations renforce la{" "}
              <strong className="text-edf-blue">
                sécurité des réseaux électriques insulaires
              </strong>
              . L&apos;énergie garantie, ajustable et pilotable produite
              favorise le développement croissant des{" "}
              <strong className="text-edf-green">
                énergies renouvelables intermittentes
              </strong>{" "}
              et contribue activement à la transition énergétique de ces
              territoires.
            </p>

            {/* Liste des atouts */}
            <div className="space-y-4 mb-10">
              {ATOUTS.map((atout, index) => {
                const Icon = atout.icon;
                return (
                  <motion.div
                    key={atout.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white border border-gray-100 hover:border-edf-blue/20 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 bg-edf-blue/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-edf-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {atout.titre}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {atout.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Citation */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-l-4 border-edf-orange pl-6 py-2"
            >
              <p className="text-gray-700 italic leading-relaxed">
                &quot;Notre volonté de convertir à la biomasse liquide nos
                centrales électriques d&apos;outre-mer illustre parfaitement cet
                engagement.&quot;
              </p>
            </motion.blockquote>
          </motion.div>
        </div>

        {/* Section finale - Raison d'être */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <div className="bg-edf-blue p-8 md:p-12 relative overflow-hidden">
            {/* Motif de fond */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent 60%)`,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-edf-orange mx-auto mb-6 flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Notre raison d&apos;être
              </h3>

              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Ces actions s&apos;inscrivent dans la raison d&apos;être du
                groupe EDF :{" "}
                <strong className="text-edf-orange">
                  construire un avenir énergétique neutre en CO₂
                </strong>{" "}
                en conciliant{" "}
                <span className="text-edf-green">
                  préservation de la planète
                </span>
                , bien-être et développement grâce à l&apos;électricité et à des
                solutions innovantes.
              </p>

              {/* Ligne décorative */}
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-12 h-1 bg-edf-green" />
                <div className="w-12 h-1 bg-edf-orange" />
                <div className="w-12 h-1 bg-white/50" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

