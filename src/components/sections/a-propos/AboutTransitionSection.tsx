"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { Users, Zap, Lightbulb, Award, Wind } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Données des statistiques clés EDF PEI
 */
const STATS_DATA = [
  {
    icon: Users,
    value: "430",
    unit: "",
    label: "Salariés engagés",
    color: "#001A70",
  },
  {
    icon: Zap,
    value: "750",
    unit: "MW",
    label: "Capacité totale installée",
    color: "#FFB210",
  },
  {
    icon: Lightbulb,
    value: "3 500",
    unit: "GWh/an",
    label: "Énergie produite",
    color: "#88D910",
  },
  {
    icon: Wind,
    value: "50",
    unit: "MW",
    label: "Projets EnR en développement",
    color: "#00d4ff",
  },
  {
    icon: Award,
    value: "4",
    unit: "",
    label: "Centrales certifiées ISO 14001",
    color: "#001A70",
  },
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

/**
 * Section Transition Énergétique - Page À propos
 * Mission EDF PEI et chiffres clés
 */
export default function AboutTransitionSection() {
  return (
    <section aria-labelledby="about-transition-heading" className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-edf-green/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <SectionHeader
          badge="Notre mission"
          badgeColor="orange"
          heading={<>EDF PEI, acteur clé de la{" "}<span className="text-edf-green">transition énergétique</span>{" "}insulaire</>}
          description={<>Fidèle à la raison d&apos;être du Groupe EDF, notre ambition est de contribuer activement à la transition énergétique des territoires insulaires. Nous accompagnons ces régions dans le développement des énergies renouvelables grâce à des solutions innovantes et adaptées à chaque contexte local.</>}
          className="max-w-4xl mb-16"
          id="about-transition-heading"
        />

        {/* Bloc d'engagement */}
        <motion.div
          {...fadeInUpDelay(0.1)}
          className="mb-16"
        >
          <Card className="border-l-4 border-l-edf-orange bg-gray-50 shadow-none">
            <CardBody className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                Notre engagement se concrétise par la <strong className="text-edf-blue">conversion 
                à la biomasse liquide</strong> de nos centrales moteurs : d&apos;abord à La Réunion, 
                puis en Guadeloupe et en Martinique. En Guyane, nous construisons une centrale 
                fonctionnant avec ce combustible renouvelable dès <strong className="text-edf-orange">2026</strong>.
              </p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Grille des statistiques */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {STATS_DATA.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-none shadow-lg card-hover bg-white">
                  <CardBody className="p-6 text-center">
                    {/* Icône */}
                    <div
                      className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: stat.color }}
                      />
                    </div>

                    {/* Valeur */}
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="text-lg font-medium text-gray-500">
                          {stat.unit}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

