"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInLeft, fadeInRight, fadeInUpDelay } from "@/lib/motion-variants";
import { VIDEOS } from "@/lib/media";

/**
 * Section ÉCONOMIE D'EAU — une gestion responsable de l'eau.
 * Fond blanc, registre environnemental : eyebrow verte, accent border
 * vert foncé, exergue verte ≥ 24px uniquement (charte EDF 2021).
 */
export default function BeneficesWaterSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="section bg-white" aria-labelledby="benefices-water-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Colonne gauche — contenu */}
          <motion.div {...fadeInLeft} className="flex flex-col">
            <SectionHeader
              eyebrow="Économie d'eau"
              tone="green"
              heading={
                <>
                  Une gestion <span className="text-edf-green-dark">responsable</span>{" "}
                  de l&apos;eau
                </>
              }
              id="benefices-water-heading"
              className="mb-8"
            />

            <div className="mb-10 space-y-4">
              <p className="text-lead text-edf-bleu-nuit/75">
                La consommation en eau de la future Centrale Bioénergie du Larivot
                sera <strong className="font-semibold">40 fois inférieure</strong> à
                celle de l&apos;ancienne centrale de Dégrad-des-Cannes.
              </p>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Cette avancée repose sur des aéroréfrigérants secs : aucun
                ruissellement d&apos;eau, aucune dispersion d&apos;humidité
                dans l&apos;air.
              </p>
            </div>

            {/* Chiffre clé — accent border verte (signature baguette) */}
            <motion.dl
              {...fadeInUpDelay(0.1)}
              className="mt-auto bg-white border border-edf-gris-clair p-8"
            >
              <span className="block w-2.5 h-2.5 bg-edf-green-dark mb-3" aria-hidden="true" />
              <dd className="flex items-baseline gap-1">
                <span className="stat-value">40</span>
                <span className="text-xl font-semibold text-edf-green-text">x</span>
              </dd>
              <dt className="mt-2">
                <span className="block font-semibold text-edf-bleu-nuit">
                  moins de consommation
                </span>
                <span className="block text-caption mt-0.5">
                  par rapport à Dégrad-des-Cannes
                </span>
              </dt>
            </motion.dl>
          </motion.div>

          {/* Colonne droite — vidéo */}
          <motion.div {...fadeInRight} className="relative h-full">
            <div className="relative h-full min-h-[400px] overflow-hidden shadow-3">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={VIDEOS.ressourceEau2} type="video/mp4" />
              </video>
              <p className="sr-only">
                Vue aérienne de la ressource en eau autour du site du Larivot
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
