"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/motion-variants";
import { IMAGES } from "@/lib/media";

/**
 * Statistiques économiques du projet — mono-camaïeu bleu
 * (registre socio-économique).
 */
const ECONOMIC_STATS = [
  {
    value: "250-500",
    unit: "",
    label: "personnes mobilisées",
    sublabel: "en moyenne / pics d'activité",
  },
  {
    value: "1 200",
    unit: "",
    label: "emplois",
    sublabel: "directs et indirects",
  },
  {
    value: "130",
    unit: "M€",
    label: "retombées directes",
    sublabel: "pour le territoire guyanais",
  },
];

/**
 * Section RETOMBÉES ÉCONOMIQUES — une contribution au développement
 * socio-économique de la Guyane. Fond blanc bleuté, accents bleus.
 */
export default function ChantierEconomicSection() {
  return (
    <section className="section section-alt" aria-labelledby="chantier-economic-heading">
      <div className="container-custom">
        {/* En-tête de section */}
        <SectionHeader
          eyebrow="Retombées Économiques"
          heading={
            <>
              Une contribution au{" "}
              <span className="text-edf-bleu-action">développement</span>{" "}
              socio-économique
            </>
          }
          description="Un impact humain, social et économique positif pour la Guyane."
          id="chantier-economic-heading"
          className="mb-14"
        />

        {/* Chiffres clés — grands chiffres en couleur de marque (charte) */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {ECONOMIC_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="bg-white border border-edf-gris-clair border-t-4 border-t-edf-bleu-action p-6"
            >
              <dd className="flex items-baseline gap-1">
                <span className="stat-value">{stat.value}</span>
                {stat.unit && (
                  <span className="text-xl font-semibold text-edf-bleu-action">
                    {stat.unit}
                  </span>
                )}
              </dd>
              <dt className="mt-2">
                <span className="block font-semibold text-edf-bleu-nuit">
                  {stat.label}
                </span>
                <span className="block text-caption mt-0.5">{stat.sublabel}</span>
              </dt>
            </motion.div>
          ))}
        </motion.dl>

        {/* Contenu détaillé */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Colonne gauche — texte */}
          <motion.div {...fadeInLeft}>
            {/* Impact humain */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-edf-bleu-action" aria-hidden="true" />
                <h3 className="heading-4 text-edf-bleu-nuit">
                  Un impact humain et social positif
                </h3>
              </div>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Le chantier de construction mobilisera en moyenne{" "}
                <strong className="font-semibold">250 personnes</strong> et
                jusqu&apos;à <strong className="font-semibold">500</strong> lors
                des pics d&apos;activité. Ce projet nécessitera au total{" "}
                <strong className="font-semibold">1 200 emplois</strong> directs
                et indirects pour sa construction et son fonctionnement.
              </p>
            </div>

            {/* Impact économique */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-edf-bleu-action" aria-hidden="true" />
                <h3 className="heading-4 text-edf-bleu-nuit">
                  Un impact économique majeur
                </h3>
              </div>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Ce projet d&apos;envergure devrait générer plus de{" "}
                <strong className="font-semibold">130 millions d&apos;euros</strong>{" "}
                de retombées directes pour le territoire guyanais,{" "}
                <strong className="font-semibold">
                  sans aucun impact sur la facture d&apos;électricité des guyanais
                </strong>
                . Cet investissement massif d&apos;EDF PEI démontre un engagement
                fort pour un développement économique responsable et pérenne.
              </p>
            </div>
          </motion.div>

          {/* Colonne droite — images */}
          <motion.div {...fadeInRight} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden shadow-2">
                <Image
                  src={IMAGES.environnement.gestionResp}
                  alt="Gestion responsable du chantier"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden shadow-2 mt-8">
                <Image
                  src={IMAGES.partenariats.fermePeda}
                  alt="Impact local du projet"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
