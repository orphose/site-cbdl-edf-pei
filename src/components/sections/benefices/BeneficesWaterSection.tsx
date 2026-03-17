"use client";

import { IMAGES, VIDEOS } from "@/lib/media";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Section ÉCONOMIE D'EAU - Une gestion responsable de l'eau
 */
export default function BeneficesWaterSection() {
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
    <section aria-labelledby="benefices-water-heading" className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Colonne gauche - Contenu */}
          <div className="flex flex-col">
            {/* En-tête */}
            <SectionHeader
              badge="Économie d'eau"
              badgeColor="blue"
              heading={<>Une gestion{" "}<span className="text-edf-blue">responsable</span>{" "}de l&apos;eau</>}
              className="mb-12"
              id="benefices-water-heading"
            />
            <motion.div {...fadeInUp} className="mb-12 -mt-6">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                La consommation en eau de la future Centrale Bioénergie du
                Larivot sera{" "}
                <strong className="text-edf-blue">40 fois inférieure</strong>{" "}
                à celle de l&apos;ancienne centrale de Dégrad-des-Cannes.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Elle traduit un progrès significatif dans la préservation
                des ressources en eau. Cette avancée a été rendue possible
                grâce à l&apos;utilisation d&apos;aéroréfrigérants secs, une
                innovation qui ne génère aucun ruissellement d&apos;eau et
                évite la dispersion de l&apos;humidité dans l&apos;air.
              </p>
            </motion.div>

            {/* Statistique principale */}
            <motion.div
              {...fadeInUpDelay(0.1)}
              className="bg-edf-blue text-white p-8"
            >
              <div className="flex items-center gap-6">
                <div className="text-6xl font-bold">40x</div>
                <div>
                  <div className="text-xl font-semibold">moins de consommation</div>
                  <div className="text-blue-200">par rapport à Dégrad-des-Cannes</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite - Vidéo */}
          <motion.div
            {...fadeInUpDelay(0.15)}
            className="relative h-full"
          >
            <div className="relative h-full min-h-[400px] overflow-hidden shadow-xl">
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

              {/* Bordure */}
              <div className="absolute inset-0 border-2 border-edf-blue/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

