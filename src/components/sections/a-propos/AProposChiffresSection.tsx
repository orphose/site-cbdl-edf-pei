"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Leaf, Award, Users, Zap, TrendingUp, Factory } from "lucide-react";

/**
 * Données des chiffres clés EDF PEI
 */
const CHIFFRES_DATA = [
  {
    id: 1,
    value: 430,
    suffix: "",
    label: "Salariés",
    description: "Experts dédiés à la transition énergétique insulaire",
    icon: Users,
    color: "edf-blue",
  },
  {
    id: 2,
    value: 750,
    suffix: " MW",
    label: "Capacité totale",
    description: "De puissance installée sur l'ensemble des territoires",
    icon: Zap,
    color: "edf-orange",
  },
  {
    id: 3,
    value: 3500,
    suffix: " GWh/an",
    label: "Énergie produite",
    description: "Pour alimenter les territoires insulaires français",
    icon: TrendingUp,
    color: "edf-green",
  },
  {
    id: 4,
    value: 50,
    suffix: " MW",
    label: "Projets EnR",
    description: "De projets d'énergies renouvelables en développement",
    icon: Leaf,
    color: "edf-green",
  },
  {
    id: 5,
    value: 4,
    suffix: "",
    label: "Centrales certifiées",
    description: "Certifiées ISO 14001 pour la gestion environnementale",
    icon: Award,
    color: "edf-orange",
  },
];

/**
 * Composant pour animer un compteur
 */
function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const ANIMATION_DURATION = 2000; // ms
  const FRAME_RATE = 60;

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const steps = Math.ceil(ANIMATION_DURATION / (1000 / FRAME_RATE));
    const increment = target / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame += 1;
      current += increment;

      if (frame >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / FRAME_RATE);

    return () => clearInterval(timer);
  }, [target, isInView]);

  // Formatage des grands nombres
  const formattedValue =
    count >= 1000
      ? count.toLocaleString("fr-FR").replace(/\s/g, " ")
      : count.toString();

  return (
    <span>
      {formattedValue}
      {suffix}
    </span>
  );
}

/**
 * Section Chiffres Clés - Page À Propos
 * Transition énergétique insulaire avec statistiques animées
 */
export default function AProposChiffresSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Assertions de validation
  console.assert(CHIFFRES_DATA.length >= 4, "Au moins 4 chiffres clés requis");
  console.assert(
    CHIFFRES_DATA.every((c) => c.value > 0),
    "Toutes les valeurs doivent être positives"
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-edf-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-edf-green/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-medium mb-6">
            <Factory className="w-4 h-4" />
            EDF PEI en chiffres
          </span>

          <h2 className="heading-lg text-edf-blue mb-6">
            Transition énergétique{" "}
            <span className="text-edf-orange">insulaire</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            S&apos;inscrivant pleinement dans la raison d&apos;être du Groupe,{" "}
            <strong className="text-edf-blue">EDF PEI</strong> s&apos;est donné
            pour ambition de participer activement aux objectifs de{" "}
            <strong className="text-edf-green">transition énergétique</strong>{" "}
            des territoires insulaires en les accompagnant dans le développement
            des énergies renouvelables.
          </p>
        </motion.div>

        {/* Grille des chiffres clés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {CHIFFRES_DATA.map((chiffre, index) => {
            const Icon = chiffre.icon;
            const colorClass =
              chiffre.color === "edf-orange"
                ? "text-edf-orange"
                : chiffre.color === "edf-green"
                ? "text-edf-green"
                : "text-edf-blue";

            return (
              <motion.div
                key={chiffre.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white p-6 h-full border border-gray-100 shadow-sm hover:shadow-lg hover:border-edf-blue/20 transition-all duration-300 relative overflow-hidden">
                  {/* Ligne colorée en haut */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-${chiffre.color}`}
                    style={{
                      backgroundColor:
                        chiffre.color === "edf-orange"
                          ? "var(--edf-orange)"
                          : chiffre.color === "edf-green"
                          ? "var(--edf-green)"
                          : "var(--edf-blue)",
                    }}
                  />

                  {/* Icône */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center mb-4 ${colorClass}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Valeur animée */}
                  <div className={`text-4xl font-bold ${colorClass} mb-2`}>
                    <AnimatedCounter
                      target={chiffre.value}
                      suffix={chiffre.suffix}
                      isInView={isInView}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {chiffre.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {chiffre.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Texte complémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-edf-blue text-white p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl leading-relaxed">
              Cette ambition se traduit par la{" "}
              <strong className="text-edf-orange">
                conversion à la biomasse liquide
              </strong>{" "}
              de nos centrales moteurs à La Réunion, puis prochainement en
              Guadeloupe et Martinique, et enfin par la construction de notre{" "}
              <strong className="text-edf-green">
                nouvelle centrale en Guyane
              </strong>{" "}
              avec ce combustible dès 2026.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

