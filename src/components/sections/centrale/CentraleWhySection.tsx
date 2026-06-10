"use client";

import { motion } from "framer-motion";
import { RefreshCw, FileCheck, Users } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/media";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Les trois raisons du projet — registre institutionnel :
 * camaïeu bleu unique (icônes et accents).
 */
const WHY_ITEMS = [
  {
    icon: RefreshCw,
    title: "Remplacer la centrale de Dégrad des Cannes",
    description:
      "La centrale du Larivot remplace celle de Dégrad des Cannes pour sécuriser l'approvisionnement électrique de la Guyane, répondre à la demande croissante et amorcer la transition énergétique.",
  },
  {
    icon: FileCheck,
    title: "Satisfaire les besoins exprimés dans la PPE",
    description:
      "Aux côtés des acteurs locaux, EDF PEI développe les énergies renouvelables prévues par la PPE et réduit la dépendance du territoire aux énergies fossiles.",
  },
  {
    icon: Users,
    title: "Répondre aux besoins énergétiques de l'Île de Cayenne",
    description:
      "Cœur économique et démographique de la Guyane, l'Île de Cayenne concentre près de 50% de la population. Sécuriser son alimentation électrique est indispensable au développement du territoire.",
  },
];

/**
 * Section POURQUOI — un projet clé pour le territoire.
 * Première section après le hero : fond blanc, accents bleus.
 */
export default function CentraleWhySection() {
  return (
    <section aria-labelledby="centrale-why-heading" className="section bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche — contenu */}
          <div>
            <SectionHeader
              eyebrow="Pourquoi"
              heading={
                <>
                  Un projet <span className="text-edf-bleu-action">clé</span> pour le
                  territoire
                </>
              }
              id="centrale-why-heading"
              className="mb-8"
            />

            <motion.div {...fadeInUp} className="mb-10">
              <p className="text-lead text-edf-bleu-nuit/75">
                Avec sa puissance garantie de{" "}
                <strong className="font-semibold">120 MW</strong>, la Centrale
                Bioénergie du Larivot se situe sur l&apos;Île de Cayenne dans une zone
                industrielle hautement stratégique et bénéficie d&apos;une proximité
                immédiate des consommateurs les plus importants.
              </p>
              <p className="text-edf-bleu-nuit/75 mt-4">
                Cette infrastructure permettra de :
              </p>
            </motion.div>

            {/* Liste des raisons — cards à accent border bleu (signature baguette) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              {WHY_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div key={item.title} variants={staggerItem} className="card-pop-left-wrap">
                    <article className="card-edf card-pop-left p-6 pl-10">
                      <span className="icon-square" aria-hidden="true">
                        <IconComponent className="w-6 h-6" />
                      </span>
                      <h3 className="heading-4 text-edf-bleu-nuit mb-2">
                        {item.title}
                      </h3>
                      <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </article>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Colonne droite — image d'illustration */}
          <motion.div {...fadeInUpDelay(0.15)} className="relative lg:sticky lg:top-32">
            <div className="relative aspect-[4/3] overflow-hidden shadow-3">
              <Image
                src={IMAGES.centrale.pourquoiLocalisation}
                alt="Localisation stratégique de la Centrale Bioénergie du Larivot en Guyane"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            {/* Chiffre clé — cartouche factuel en angle */}
            <motion.div
              {...fadeInUpDelay(0.25)}
              className="mt-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 inline-block bg-white p-5 lg:p-6 shadow-3"
            >
              <p className="flex items-baseline">
                <span className="stat-value">50</span>
                <span className="text-xl font-semibold text-edf-bleu-action">%</span>
              </p>
              <p className="text-caption mt-1">
                de la population
                <br />
                guyanaise alimentée
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
