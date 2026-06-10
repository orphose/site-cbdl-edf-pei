"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInRight } from "@/lib/motion-variants";
import { VIDEOS } from "@/lib/media";

/**
 * Statistiques de préservation — registre environnemental (touches de vert).
 */
const PRESERVATION_STATS = [
  { value: "150", unit: "ha", label: "de surface sanctuarisée" },
  { value: "10", unit: "ha", label: "d'emprise de la centrale" },
  { value: "25", unit: "ans", label: "d'exploitation de la centrale" },
  { value: "99", unit: "ans", label: "de préservation du site" },
  { value: "+400 000", unit: "€", label: "investis pour la préservation du site", wide: true },
];

function CountUpStat({ value }: { value: string }) {
  const numericMatch = value.match(/(\d[\d\s.]*)/);
  const prefix = value.match(/^([^\d]*)/)?.[1] || "";
  const numericValue = numericMatch
    ? parseInt(numericMatch[1].replace(/[\s.]/g, ""))
    : 0;

  const { count, ref } = useCountUp(numericValue);

  const formattedCount =
    numericValue >= 1000 ? count.toLocaleString("fr-FR") : count.toString();

  return (
    <span ref={ref} className="stat-value">
      {prefix}
      {formattedCount}
    </span>
  );
}

/**
 * Section Préservation — valoriser et protéger la biodiversité.
 * Fond blanc bleuté, accents verts (registre environnemental).
 */
export default function PreservationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="section section-alt" aria-labelledby="section-preservation-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Biodiversité"
          tone="green"
          heading={
            <>
              Préserver l&apos;environnement et{" "}
              <span className="text-edf-green-dark">la biodiversité</span>
            </>
          }
          description={
            <>
              Un espace <strong className="font-semibold">10 fois plus vaste</strong> que
              la superficie de la centrale, dédié à la préservation de la biodiversité
              locale — un investissement de plus de 400&nbsp;000&nbsp;€.
            </>
          }
          id="section-preservation-heading"
          className="mb-14"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Statistiques */}
          <motion.dl {...fadeInLeft} className="grid grid-cols-2 gap-4">
            {PRESERVATION_STATS.map((stat) => (
              <div
                key={stat.label}
                className={`bg-white border border-edf-gris-clair border-t-4 border-t-edf-green-dark p-6 ${
                  stat.wide ? "col-span-2" : ""
                }`}
              >
                <dd className="flex items-baseline gap-1">
                  <CountUpStat value={stat.value} />
                  {stat.unit && (
                    <span className="text-lg font-semibold text-edf-green-text">
                      {stat.unit}
                    </span>
                  )}
                </dd>
                <dt className="text-sm text-edf-bleu-nuit/75 mt-2">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>

          {/* Vidéo zone sanctuarisée */}
          <motion.div {...fadeInRight} className="relative">
            <div className="relative aspect-video overflow-hidden shadow-3">
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
              <p className="sr-only">
                Vue aérienne de la zone de sanctuarisation environnementale du site du
                Larivot
              </p>
            </div>

            {/* Étiquette factuelle — angle bas-droite */}
            <p className="absolute -bottom-4 right-4 bg-edf-green-dark text-white px-5 py-2.5 shadow-2 text-sm">
              <strong className="font-bold">10×</strong> plus vaste que l&apos;emprise
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
