"use client";

import { motion } from "framer-motion";
import { GraduationCap, Battery, TrendingUp, Cpu } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Données des bénéfices
 */
const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Emploi et formation",
    description:
      "Favorise le développement de formations et de carrières locales dans le secteur des énergies renouvelables.",
    color: "#001A70",
    stat: "500+",
    statLabel: "emplois créés",
  },
  {
    icon: Battery,
    title: "Autonomie énergétique",
    description:
      "Elle peut moduler sa capacité de production de façon quasi instantanée en démarrant ou en arrêtant ses moteurs très rapidement.",
    color: "#88D910",
    stat: "120",
    statLabel: "MW de puissance",
  },
  {
    icon: TrendingUp,
    title: "Développement économique",
    description:
      "Représente le plus gros chantier jamais attribué aux entreprises guyanaises avec un investissement de plus de 600 millions d'euros.",
    color: "#FFB210",
    stat: "600M€",
    statLabel: "d'investissement",
  },
  {
    icon: Cpu,
    title: "Modernisation des infrastructures",
    description:
      "La centrale bioénergie du Larivot bénéficiera d'équipements de pointe, qui se démarqueront par leur haut niveau de performance technique et environnementale.",
    color: "#001A70",
    stat: "7",
    statLabel: "moteurs nouvelle génération",
  },
];

/**
 * Section Bénéfices - Section 3
 * Accompagner la transition énergétique de la Guyane
 */
export default function BenefitsSection() {
  return (
    <section className="section-padding bg-edf-blanc-bleute relative overflow-hidden" aria-labelledby="section-benefits-heading">
      {/* Fond avec motif subtil */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête */}
        <SectionHeader
          badge="Bénéfices"
          badgeColor="green"
          heading={<>Accompagner la transition énergétique de la{" "}<span className="text-edf-green">Guyane</span></>}
          description={<>Avec la construction de cette future centrale bioénergie, EDF PEI propose une électricité renouvelable, durable, garantie et pilotable, en vue d&apos;atteindre un mix-énergétique 100% EnR tout en garantissant la sécurité du système électrique.</>}
          id="section-benefits-heading"
          className="max-w-4xl mb-16"
        />

        {/* Grille des bénéfices */}
        <div className="grid md:grid-cols-2 gap-8">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                {...fadeInUpDelay(index * 0.05)}
                className="group"
              >
                <div 
                  className="relative h-full bg-white border border-edf-gris-clair overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  style={{ 
                    borderLeft: `4px solid ${benefit.color}`,
                  }}
                >
                  {/* Fond au hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(120deg, ${benefit.color}05 0%, transparent 50%)` 
                    }}
                  />

                  <div className="relative p-6">
                    {/* Header avec icône et stat */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Icône */}
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-14 h-14 flex items-center justify-center shadow-lg"
                        style={{ 
                          background: `linear-gradient(120deg, ${benefit.color} 0%, ${benefit.color}cc 100%)`,
                        }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Stat */}
                      <div className="text-right">
                        <div 
                          className="text-2xl font-bold"
                          style={{ color: benefit.color }}
                        >
                          {benefit.stat}
                        </div>
                        <div className="text-[10px] text-edf-gris-moyen uppercase tracking-wide">
                          {benefit.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Titre */}
                    <h3 className="text-lg font-bold text-edf-bleu-nuit mb-2 group-hover:text-edf-bleu-nuit transition-colors">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-edf-gris-moyen leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Numéro décoratif */}
                  <div 
                    className="absolute -bottom-4 -right-2 text-[120px] font-bold leading-none opacity-[0.03] select-none"
                    style={{ color: benefit.color }}
                  >
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
