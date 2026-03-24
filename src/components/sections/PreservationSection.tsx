"use client";

import { VIDEOS } from "@/lib/media";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, Calendar, Euro } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft } from "@/lib/motion-variants";

/**
 * Données des statistiques de préservation
 */
const PRESERVATION_STATS = [
  {
    value: "150",
    unit: "",
    label: "hectares de surface sanctuarisée",
    icon: TreePine,
  },
  {
    value: "10",
    unit: "",
    label: "hectares d'emprise",
    icon: TreePine,
  },
  {
    value: "25",
    unit: "ans",
    label: "d'exploitation de la centrale",
    icon: Calendar,
  },
  {
    value: "99",
    unit: "ans",
    label: "de préservation du site",
    icon: Calendar,
  },
  {
    value: "+400.000€",
    unit: "",
    label: "pour la préservation du site",
    icon: Euro,
  },
];

function CountUpStat({ value, unit }: { value: string; unit: string }) {
  // Extract numeric part
  const numericMatch = value.match(/(\d[\d.]*)/);
  const prefix = value.match(/^([^\d]*)/)?.[1] || "";
  const suffix = value.match(/[\d.]+(.*)/)?.[1] || "";
  const numericValue = numericMatch ? parseInt(numericMatch[1].replace(/\./g, "")) : 0;

  const { count, ref } = useCountUp(numericValue);

  // Format the count back with dots for thousands
  const formattedCount = numericValue >= 1000
    ? count.toLocaleString("fr-FR")
    : count.toString();

  return (
    <span ref={ref} className="text-4xl font-bold text-edf-blue">
      {prefix}{formattedCount}{suffix}
    </span>
  );
}

/**
 * Section Préservation - Section 6
 * Valoriser et protéger l'environnement
 */
export default function PreservationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force la lecture de la vidéo au montage
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay bloqué par le navigateur");
        }
      }
    };

    playVideo();
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="section-preservation-heading">
      {/* Fond décoratif végétal */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5" aria-hidden="true">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;%3E%3Cpath d=&quot;M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z&quot; fill=&quot;%2300a86b&quot;/%3E%3C/svg%3E')] bg-repeat bg-[length:50px_50px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête */}
        <SectionHeader
          badge="Biodiversité"
          badgeColor="green"
          heading={<>Valoriser et <span className="text-edf-green">protéger</span></>}
          id="section-preservation-heading"
          className="max-w-4xl mb-4"
        />
        <div className="max-w-4xl mb-16">
          <h3 className="text-2xl text-edf-bleu-nuit font-light mb-6">
            Préserver l&apos;environnement et la biodiversité
          </h3>
          <p className="text-edf-gris-fonce text-lg max-w-3xl">
            Un espace <strong className="text-edf-green">10 fois plus vaste</strong> que la
            superficie de la centrale, dédié à la préservation de la
            biodiversité locale, cela représente un investissement de plus de{" "}
            <strong className="text-edf-blue">400 000 €</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Statistiques */}
          <motion.div
            {...fadeInLeft}
            className="grid grid-cols-2 gap-6"
          >
            {PRESERVATION_STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`p-6 bg-gradient-to-br from-gray-50 to-white border border-edf-gris-clair shadow-sm ${
                  index === 4 ? "col-span-2" : ""
                }`}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <CountUpStat value={stat.value} unit={stat.unit} />
                  {stat.unit && (
                    <span className="text-lg text-edf-green font-medium">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p className="text-edf-gris-fonce text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Vidéo zone sanctuarisée */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden shadow-xl">
              {/* Vidéo de sanctuarisation */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={VIDEOS.sanctuarisation} type="video/mp4" />
              </video>
              <p className="sr-only">Vue aérienne de la zone de sanctuarisation environnementale du site du Larivot</p>

              {/* Bordure */}
              <div className="absolute inset-0 border-2 border-edf-green/20 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-4 -right-4 bg-edf-green text-white px-6 py-3 shadow-lg"
            >
              <span className="font-bold">10x</span>
              <span className="text-sm ml-1">plus vaste</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

