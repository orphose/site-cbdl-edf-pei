"use client";

import { motion } from "framer-motion";
import { Handshake, Building2, Users2 } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";
import { IMAGES } from "@/lib/media";

/**
 * Points clés du consortium — registre institutionnel :
 * mono-camaïeu bleu, une seule couleur d'icône par section.
 */
const CONSORTIUM_POINTS = [
  {
    icon: Handshake,
    title: "Partenariat local",
    description:
      "Une alliance stratégique avec des entreprises guyanaises solidement ancrées dans le tissu économique local.",
  },
  {
    icon: Building2,
    title: "600M€ d'investissement",
    description:
      "Un projet d'envergure répondant aux besoins de l'économie et de la société guyanaise.",
  },
  {
    icon: Users2,
    title: "Valorisation locale",
    description:
      "Une stratégie de valorisation du savoir-faire local et d'implication dans le tissu économique du territoire.",
  },
];

/**
 * Section CONSORTIUM — un engagement aux côtés des entreprises guyanaises.
 * Fond blanc, cards à accent border Bleu Action (signature baguette).
 */
export default function ChantierConsortiumSection() {
  return (
    <section className="section bg-white" aria-labelledby="chantier-consortium-heading">
      <div className="container-custom">
        {/* En-tête de section */}
        <SectionHeader
          eyebrow="Consortium"
          heading={
            <>
              Un engagement aux côtés des{" "}
              <span className="text-edf-bleu-action">entreprises guyanaises</span>
            </>
          }
          description="La construction de la centrale met en lumière l'agilité, la performance et les savoir-faire d'entreprises locales engagées pour le développement du territoire."
          id="chantier-consortium-heading"
          className="mb-14"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Colonne gauche — image + chiffre clé */}
          <motion.div {...fadeInLeft} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden shadow-3">
              <Image
                src={IMAGES.centrale.modelisation}
                alt="Modélisation de la Centrale Bioénergie du Larivot"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-edf-blue/20 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Étiquette chiffre clé — angle bas-droite */}
            <motion.p
              {...fadeInUpDelay(0.2)}
              className="absolute -bottom-6 right-4 bg-edf-bleu-action text-white shadow-3 p-6"
            >
              <span className="block text-4xl font-bold leading-none">600M€</span>
              <span className="block text-sm text-white/80 mt-2">
                d&apos;investissement
              </span>
            </motion.p>
          </motion.div>

          {/* Colonne droite — points clés */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6 list-none"
          >
            {CONSORTIUM_POINTS.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.li key={item.title} variants={staggerItem} className="card-pop-left-wrap">
                  <article className="card-edf card-pop-left card-motif card-motif--orange p-6 pl-10">
                    <span className="icon-square" aria-hidden="true">
                      <IconComponent className="w-6 h-6" />
                    </span>
                    <h3 className="heading-4 text-edf-bleu-nuit mb-2">
                      {item.title}
                    </h3>
                    <p className="text-edf-bleu-nuit/75 leading-relaxed text-[0.9375rem]">
                      {item.description}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
