"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Play, X } from "lucide-react";
import { VIDEOS } from "@/lib/media";

/**
 * Section Hero - Section 1
 * Fond blanc avec texte à gauche et vidéo pleine hauteur à droite (50/50)
 * La vidéo commence directement sous la navbar
 */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Force la lecture de la vidéo au montage
  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (video) {
        try {
          video.muted = true;
          await video.play();
        } catch (error) {
          console.log("Autoplay bloqué par le navigateur");
        }
      }
    };

    playVideo(videoRef.current);
    playVideo(mobileVideoRef.current);
  }, []);

  // Gérer la lecture de la vidéo dans la modal
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play();
    }
  }, [isModalOpen]);

  // Fermer la modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="relative h-screen">
        {/* Colonne droite - Vidéo fixée en haut à droite */}
        <div className="hidden lg:block fixed top-[100px] right-0 w-1/2 h-[calc(100vh-100px)] bg-edf-blue z-0 overflow-hidden">
          {/* Vidéo de modélisation */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEOS.modelisation2} type="video/mp4" />
          </video>
          
          {/* Overlay léger pour améliorer la lisibilité si besoin */}
          <div className="absolute inset-0 bg-edf-blue/10" />
        </div>

        {/* Colonne gauche - Contenu texte */}
        <div className="relative z-10 w-full lg:w-1/2 min-h-screen flex items-center bg-white pt-[100px]">
          <div className="px-8 lg:px-16 py-12 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-edf-green/10 text-edf-green text-sm font-medium mb-8">
                Guyane • Énergie Renouvelable
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="heading-xl text-black mb-4 uppercase"
            >
              Centrale bioénergie
              <br />
              <span className="text-edf-blue">du Larivot</span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-700 font-light mb-6"
            >
              UNE ÉNERGIE{" "}
              <span className="text-edf-green font-semibold">VERTE</span> ET{" "}
              <span className="text-edf-orange font-semibold">GARANTIE</span>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-600 text-lg max-w-xl mb-10"
            >
              Un projet clé qui permettra à la Guyane de franchir une étape
              significative vers le{" "}
              <strong className="text-edf-blue-dark">
                100% énergie renouvelable
              </strong>
              .
            </motion.p>

            {/* Boutons CTA - Style carré conforme EDF */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-edf-blue text-white font-semibold px-8 hover:bg-edf-blue-light transition-all"
                radius="none"
              >
                Découvrir le projet
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-edf-blue-dark text-edf-blue-dark hover:bg-edf-blue-dark hover:text-white transition-all"
                radius="none"
                startContent={<Play className="w-4 h-4" />}
                onPress={() => setIsModalOpen(true)}
              >
                Voir la vidéo
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Version mobile de la vidéo */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-64 bg-edf-blue z-20 overflow-hidden">
          <video
            ref={mobileVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEOS.modelisation2} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-edf-blue/20" />
        </div>
      </section>

      {/* Modal vidéo */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Conteneur vidéo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                <source src={VIDEOS.modelisation2} type="video/mp4" />
              </video>
            </motion.div>

            {/* Texte indicatif */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              Appuyez sur Échap ou cliquez à l&apos;extérieur pour fermer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
