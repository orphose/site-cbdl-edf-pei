"use client";

import { motion } from "framer-motion";
import { Wind as WindIcon, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des centrales et projets — présentation uniforme,
 * accent unique camaïeu bleu (charte : une couleur par section).
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
  },
  {
    title: "Projets en construction",
    subtitle: "Développement en cours",
    items: [
      { name: "Nouvelle centrale", location: "Corse" },
      { name: "Centrale Bioénergie du Larivot", location: "Guyane" },
    ],
  },
  {
    title: "Installations EnR",
    subtitle: "Énergies renouvelables",
    items: [
      { name: "Montjoly", location: "Guyane", type: "Photovoltaïque" },
      { name: "Gress", location: "Martinique", type: "Éolien" },
    ],
  },
];

/**
 * Section Expertise — Page À propos.
 * Un atout pour les territoires. Fond Blanc Bleuté (alternance),
 * registre institutionnel bleu.
 */
export default function AboutExpertiseSection() {
  return (
    <section aria-labelledby="about-expertise-heading" className="section section-alt">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche — Texte */}
          <div>
            <SectionHeader
              eyebrow="Expertise"
              heading={
                <>
                  Un <span className="text-edf-bleu-action">atout</span> pour les
                  territoires
                </>
              }
              id="about-expertise-heading"
            />

            <motion.div {...fadeInUpDelay(0.08)} className="mt-6">
              <p className="text-lead text-edf-bleu-nuit/75 mb-6">
                Nos équipes maîtrisent l&apos;ensemble de la chaîne de valeur
                énergétique : de la <strong>gestion de projets</strong> à la{" "}
                <strong>maîtrise d&apos;ouvrage</strong>, jusqu&apos;à{" "}
                l&apos;<strong>exploitation</strong> des centrales.
              </p>
              <p className="text-lead text-edf-bleu-nuit/75 mb-8">
                Ce savoir-faire unique est spécifiquement adapté aux systèmes
                électriques non interconnectés, garantissant une expertise de pointe
                au service de la sécurité énergétique de chaque territoire.
              </p>

              {/* Bloc partenariat */}
              <div className="card-pop-left-wrap">
                <div className="card-edf card-pop-left p-6 pl-10">
                  <span className="icon-square" aria-hidden="true">
                    <WindIcon className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="heading-4 text-edf-bleu-nuit mb-2">
                      Portefeuille EnR en développement
                    </h3>
                    <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
                      En collaboration avec <strong>EDF Renouvelables</strong>, autre
                      filiale du Groupe, nous développons un portefeuille de projets
                      d&apos;énergies renouvelables pour accélérer la transition
                      énergétique.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite — Cartes des sites */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            {EXPERTISE_ITEMS.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <article className="card-edf p-6">
                  {/* En-tête de la carte */}
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h3 className="heading-4 text-edf-blue">{item.title}</h3>
                    <span className="shrink-0 bg-edf-blue px-3 py-1 text-xs font-bold text-white">
                      {item.items.length} sites
                    </span>
                  </div>
                  <p className="text-caption mb-4">{item.subtitle}</p>

                  {/* Liste des sites */}
                  <div className="bg-edf-blanc-bleute p-4 space-y-3">
                    {item.items.map((subItem) => (
                      <div key={subItem.name} className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-edf-bleu-nuit">
                          {subItem.name}
                        </span>
                        <ChevronRight
                          className="w-4 h-4 text-edf-bleu-nuit/40 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-edf-bleu-nuit/75 text-sm">
                          {subItem.location}
                        </span>
                        {/* Type pour EnR */}
                        {"type" in subItem && subItem.type && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-white border border-edf-gris-clair text-edf-bleu-nuit flex-shrink-0">
                            {subItem.type}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
