"use client";

import { motion } from "framer-motion";
import { TreePine, Waves, MapPin } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/media";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des mesures ERC — registre environnemental : une seule
 * couleur d'icône (vert foncé), titres et textes en Bleu Nuit.
 */
const ERC_MEASURES = [
  {
    icon: TreePine,
    title: "Protéger la flore locale",
    description:
      "Le site a été choisi pour éviter toute interférence avec la flore protégée. La population de palmiers Murumuru est restaurée par semence sélective et transplantation de jeunes plants, sous surveillance continue.",
    highlight: "Murumuru",
    highlightLabel: "Palmier protégé",
    image: IMAGES.environnement.murumuru,
  },
  {
    icon: Waves,
    title: "Sauvegarder la mangrove",
    description:
      "Aucune portion de la mangrove du site ne sera affectée par l'implantation de la centrale. Un plan de gestion rigoureux, en cours d'élaboration, protégera durablement cet écosystème vital.",
    highlight: "100%",
    highlightLabel: "Mangrove préservée",
    image: IMAGES.environnement.mangrove,
  },
  {
    icon: MapPin,
    title: "Limiter et compenser les impacts",
    description:
      "150 hectares de zones naturelles à haute valeur patrimoniale seront sanctuarisés, avec un plan de gestion élaboré avec le Parc Naturel Régional de Guyane — une démarche initiée et financée par EDF PEI, soutenue par la CTG.",
    highlight: "150 ha",
    highlightLabel: "Zones sanctuarisées",
    image: IMAGES.environnement.approcheResponsable,
  },
];

/** Démarche ERC — Éviter, Réduire, Compenser */
const ERC_STEPS = [
  { letter: "E", word: "Éviter" },
  { letter: "R", word: "Réduire" },
  { letter: "C", word: "Compenser" },
];

/**
 * Section NOS MESURES ERC — Éviter, Réduire, Compenser.
 * Fond blanc, touches de vert (registre environnemental).
 */
export default function BeneficesERCSection() {
  return (
    <section className="section bg-white" aria-labelledby="benefices-erc-heading">
      <div className="container-custom">
        {/* En-tête */}
        <SectionHeader
          eyebrow="Nos Mesures ERC"
          tone="green"
          heading={
            <>
              Éviter, réduire, compenser :{" "}
              <span className="text-edf-green-dark">une approche environnementale</span>{" "}
              responsable
            </>
          }
          description="La préservation de l'environnement et de la biodiversité est une priorité, de la construction à l'exploitation. EDF PEI s'engage à limiter l'impact du projet par une série de mesures concrètes."
          id="benefices-erc-heading"
          className="mb-14"
        />

        {/* Introduction ERC */}
        <motion.div {...fadeInUpDelay(0.1)} className="mb-16 lg:mb-20">
          <div className="max-w-3xl space-y-5">
            <h3 className="heading-3 text-edf-bleu-nuit">Une approche responsable</h3>
            <p className="text-edf-bleu-nuit/75 leading-relaxed">
              Construite sur l&apos;Île de Cayenne, une zone où la pression
              anthropique et urbanistique est très forte, la future centrale
              bioénergie du Larivot incarne notre engagement à respecter et
              protéger l&apos;environnement.
            </p>
            <p className="text-edf-bleu-nuit/75 leading-relaxed">
              Pour cela, nous adoptons l&apos;approche{" "}
              <strong className="font-semibold">ERC</strong> pour{" "}
              <strong className="font-semibold">« Éviter, Réduire, Compenser »</strong>{" "}
              afin de minimiser l&apos;impact résiduel sur la biodiversité locale.
            </p>

            {/* Démarche ERC — cartouches carrés (signature EDF) */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 pt-4 list-none"
            >
              {ERC_STEPS.map((step) => (
                <motion.li
                  key={step.letter}
                  variants={staggerItem}
                  className="flex items-center gap-3 bg-white border border-edf-gris-clair pr-5"
                >
                  <span
                    className="icon-square icon-square--green text-xl font-bold"
                    aria-hidden="true"
                  >
                    {step.letter}
                  </span>
                  <span className="font-medium text-edf-bleu-nuit">{step.word}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* Grille des mesures — alternance texte / image */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8 lg:space-y-12"
        >
          {ERC_MEASURES.map((measure, index) => {
            const IconComponent = measure.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div key={measure.title} variants={staggerItem}>
                <div
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    !isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Contenu texte */}
                  <div className={`card-pop-wrap ${!isEven ? "lg:col-start-2" : ""}`}>
                    <article className="card-edf card-pop h-full px-8 pb-8 pt-6">
                      <span className="icon-square icon-square--green" aria-hidden="true">
                        <IconComponent className="w-6 h-6" />
                      </span>
                      <p className="text-right mb-4">
                        <span className="block text-2xl font-bold text-edf-blue leading-tight">
                          {measure.highlight}
                        </span>
                        <span className="block text-caption mt-0.5">
                          {measure.highlightLabel}
                        </span>
                      </p>

                      <h3 className="heading-4 text-edf-bleu-nuit mb-3">
                        {measure.title}
                      </h3>
                      <p className="text-edf-bleu-nuit/75 leading-relaxed">
                        {measure.description}
                      </p>
                    </article>
                  </div>

                  {/* Photo */}
                  <div className={!isEven ? "lg:col-start-1" : ""}>
                    <div className="group relative aspect-[4/3] overflow-hidden shadow-2">
                      <Image
                        src={measure.image}
                        alt={measure.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Étiquette factuelle — angle bas-gauche */}
                      <p className="absolute bottom-4 left-4 bg-edf-green-dark text-white px-4 py-2 shadow-2 text-sm font-semibold uppercase tracking-wide">
                        {measure.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bandeau partenariat */}
        <motion.div
          {...fadeInUp}
          className="mt-16 lg:mt-20 bg-edf-blanc-bleute p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-3 text-edf-bleu-nuit mb-4">
                Un engagement partagé pour l&apos;environnement
              </h3>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                En partenariat avec le Parc Naturel Régional de Guyane et avec
                le soutien de la Collectivité Territoriale de Guyane (CTG),
                EDF PEI s&apos;engage concrètement pour la préservation de
                l&apos;environnement guyanais.
              </p>
            </div>
            <dl className="flex flex-wrap gap-6 justify-center md:justify-end">
              {[
                { value: "150 ha", label: "Zones protégées" },
                { value: "EDF PEI", label: "Porteur du projet" },
              ].map((item) => (
                <div key={item.label} className="px-6 py-4 bg-white">
                  <dd className="text-2xl md:text-3xl font-bold text-edf-blue">
                    {item.value}
                  </dd>
                  <dt className="text-caption mt-1">{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
