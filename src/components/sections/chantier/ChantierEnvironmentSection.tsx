"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Building, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Engagements environnementaux du chantier — registre environnemental :
 * touches de vert (une seule couleur d'icône), textes en Bleu Nuit.
 */
const ENVIRONMENT_ITEMS = [
  {
    icon: ClipboardCheck,
    title: "Contrôle indépendant",
    subtitle: "Respect des normes environnementales",
    description:
      "Un bureau d'études spécialisé et indépendant suit l'avancement du chantier et garantit le respect des réglementations environnementales.",
  },
  {
    icon: Building,
    title: "Contrôle réglementaire",
    subtitle: "Inspections conjointes DGTM",
    description:
      "Chaque mois, EDF PEI et la DGTM inspectent conjointement le site pour vérifier la conformité réglementaire à chaque phase du chantier.",
  },
];

/**
 * Section ENVIRONNEMENT — un chantier respectueux de l'environnement.
 * Fond blanc, touches de vert (registre environnemental).
 */
export default function ChantierEnvironmentSection() {
  return (
    <section className="section bg-white" aria-labelledby="chantier-environment-heading">
      <div className="container-custom">
        {/* En-tête de section */}
        <SectionHeader
          eyebrow="Environnement"
          tone="green"
          heading={
            <>
              Un chantier <span className="text-edf-green-dark">respectueux</span>{" "}
              de l&apos;environnement
            </>
          }
          description="Tout au long du chantier, EDF PEI déploie des mesures concrètes pour réduire l'empreinte écologique du projet."
          id="chantier-environment-heading"
          className="mb-14"
        />

        {/* Cartes des engagements — accent border verte, icône unique verte */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl"
        >
          {ENVIRONMENT_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div key={item.title} variants={staggerItem} className="card-pop-wrap">
                <article className="card-edf card-pop h-full px-8 pb-8 pt-12">
                  <span className="icon-square icon-square--green" aria-hidden="true">
                    <IconComponent className="w-6 h-6" />
                  </span>

                  <h3 className="heading-4 text-edf-bleu-nuit mb-1">{item.title}</h3>
                  <p className="text-caption mb-4">{item.subtitle}</p>
                  <p className="text-edf-bleu-nuit/75 leading-relaxed">
                    {item.description}
                  </p>

                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-edf-green-text">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Conformité garantie</span>
                  </p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Message de transparence */}
        <motion.div {...fadeInUpDelay(0.2)} className="mt-12">
          <div className="flex items-center gap-4 bg-edf-blanc-bleute px-6 py-5 max-w-3xl">
            <span className="icon-square icon-square--green shrink-0" aria-hidden="true">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
              Une démarche guidée par la{" "}
              <strong className="font-semibold">transparence</strong>, la{" "}
              <strong className="font-semibold">responsabilité</strong> et l&apos;
              <strong className="font-semibold">innovation</strong> pour une
              protection renforcée de l&apos;environnement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
