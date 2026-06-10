"use client";

import { motion } from "framer-motion";
import { GraduationCap, Battery, TrendingUp, Cpu } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { PROJECT_STATS } from "@/lib/constants";

/**
 * Bénéfices du projet — registre socio-économique : camaïeu bleu unique.
 */
const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Emploi et formation",
    description:
      "Des formations et des carrières locales dans le secteur des énergies renouvelables.",
    stat: PROJECT_STATS.jobs.value,
    statLabel: "emplois créés",
  },
  {
    icon: Battery,
    title: "Autonomie énergétique",
    description:
      "Une production modulable quasi instantanément, par simple démarrage ou arrêt des moteurs.",
    stat: PROJECT_STATS.power.value + " " + PROJECT_STATS.power.unit,
    statLabel: "de puissance",
  },
  {
    icon: TrendingUp,
    title: "Développement économique",
    description:
      "Le plus gros chantier jamais confié aux entreprises guyanaises : plus de 600 millions d'euros investis.",
    stat: PROJECT_STATS.investment.value + PROJECT_STATS.investment.unit,
    statLabel: "d'investissement",
  },
  {
    icon: Cpu,
    title: "Modernisation des infrastructures",
    description:
      "Des équipements de pointe, au meilleur niveau de performance technique et environnementale.",
    stat: PROJECT_STATS.engines.value,
    statLabel: "moteurs nouvelle génération",
  },
];

/**
 * Section Bénéfices — accompagner la transition énergétique de la Guyane.
 * Fond blanc bleuté, cards à accent border bleu action (signature baguette).
 */
export default function BenefitsSection() {
  return (
    <section className="section section-alt" aria-labelledby="section-benefits-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Bénéfices"
          heading={
            <>
              Accompagner la transition énergétique de la{" "}
              <span className="text-edf-bleu-action">Guyane</span>
            </>
          }
          description="Avec cette centrale, EDF PEI produit une électricité renouvelable, garantie et pilotable : un pas décisif vers le mix 100 % EnR, sans compromis sur la sécurité du réseau."
          id="section-benefits-heading"
          className="mb-14"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {BENEFITS.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div key={benefit.title} variants={staggerItem} className="card-pop-wrap">
                <article className="card-edf card-pop h-full px-7 pb-7 pt-6">
                  <span className="icon-square" aria-hidden="true">
                    <IconComponent className="w-6 h-6" />
                  </span>
                  <p className="text-right mb-4">
                    <span className="block text-2xl font-bold text-edf-blue leading-tight">
                      {benefit.stat}
                    </span>
                    <span className="block text-caption mt-0.5">{benefit.statLabel}</span>
                  </p>

                  <h3 className="heading-4 text-edf-bleu-nuit mb-2">{benefit.title}</h3>
                  <p className="text-edf-bleu-nuit/75 leading-relaxed text-[0.9375rem]">
                    {benefit.description}
                  </p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
