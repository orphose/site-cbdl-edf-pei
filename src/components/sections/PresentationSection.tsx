"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { Zap, Leaf, Settings } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Données des cartes de présentation
 */
const PRESENTATION_CARDS = [
  {
    icon: Settings,
    title: "Technologie de pointe",
    description:
      "La Centrale bioénergie du Larivot sera dotée de 7 moteurs de nouvelle génération fonctionnant avec de la biomasse liquide comme combustible renouvelable. Leur conception permet de générer une puissance de 120 MW et de sécuriser les besoins de l'île de Cayenne.",
    color: "#001A70",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Leaf,
    title: "Combustible écologique",
    description:
      "La centrale bioénergie du Larivot utilisera de la biomasse liquide, un biocombustible neutre en émission carbone. Elle permettra d'éviter l'émission d'environ 500.000 tonnes de CO2 annuellement et la qualité de l'air sera sensiblement améliorée.",
    color: "#88D910",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Énergie garantie et pilotable",
    description:
      "La Centrale bioénergie du Larivot pourra moduler sa puissance et son énergie en fonction de l'évolution des moyens de production intermittents comme le solaire et l'éolien.",
    color: "#FFB210",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];


function CountUpValue({ value }: { value: string }) {
  const numericMatch = value.match(/(\d+)/);
  const prefix = value.match(/^([^\d]*)/)?.[1] || "";
  const suffix = value.match(/\d+(.*)/)?.[1] || "";
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;

  const { count, ref } = useCountUp(numericValue);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-edf-blue">
      {prefix}{count}{suffix}
    </span>
  );
}

/**
 * Section Présentation - Section 2
 * Une centrale qui produit une électricité 100% renouvelable
 */
export default function PresentationSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="section-presentation-heading">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-edf-blanc-bleute to-transparent pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <SectionHeader
          badge="100% Renouvelable"
          badgeColor="green"
          heading={<>Une centrale qui produit une électricité{" "}<span className="text-edf-green">100% renouvelable</span></>}
          description="Un outil essentiel au développement de la Guyane. Pour remplacer les anciens moyens de production et accompagner le développement économique et démographique du littoral, la centrale bioénergie du Larivot renforce les moyens de production en Guyane, assurant ainsi un équilibre entre l'offre et la demande énergétique."
          id="section-presentation-heading"
          className="max-w-4xl mb-16"
        />

        {/* Grille de cartes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {PRESENTATION_CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={index} variants={staggerItem}>
                <Card
                  className="h-full card-hover border-none shadow-lg"
                  style={{
                    background: `linear-gradient(120deg, var(--background) 0%, var(--background) 100%)`,
                  }}
                >
                  <CardBody className="p-8">
                    {/* Icône */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6`}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: card.color }}
                      />
                    </div>

                    {/* Titre */}
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-edf-gris-fonce leading-relaxed">
                      {card.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistiques clés */}
        <motion.div
          {...fadeInUpDelay(0.2)}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "120", unit: "MW", label: "Puissance générée" },
            { value: "7", unit: "", label: "Moteurs nouvelle génération" },
            { value: "500K", unit: "t", label: "CO2 évitées/an" },
            { value: "100%", unit: "", label: "Énergie renouvelable" },
          ].map((stat, index) => (
            <div key={index} className="text-left">
              <div className="flex items-baseline gap-1">
                <CountUpValue value={stat.value} />
                <span className="text-xl text-edf-orange font-medium">
                  {stat.unit}
                </span>
              </div>
              <p className="text-edf-gris-moyen text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

