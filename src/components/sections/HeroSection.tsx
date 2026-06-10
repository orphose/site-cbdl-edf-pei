"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Link from "next/link";
import { VIDEOS } from "@/lib/media";
import Cartouche from "@/components/ui/Cartouche";

/**
 * Hero de la page d'accueil.
 * Composition 50/50 dans le flux : message à gauche sur fond blanc,
 * vidéo de modélisation à droite signée par le cartouche EDF (charte p.34).
 */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Force la lecture de la vidéo au montage
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  // Lecture de la vidéo dans la modal
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play();
    }
  }, [isModalOpen]);

  // Fermer la modal avec Escape + scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
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
      <section className="bg-white pt-16 md:pt-20" aria-labelledby="hero-heading">
        <div className="grid lg:grid-cols-2 items-stretch">
          {/* Colonne gauche — message */}
          <div className="flex items-center order-2 lg:order-1">
            <div className="w-full max-w-2xl ml-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-24">
              <p className="eyebrow mb-5 hero-fade-in" style={{ animationDelay: "0s" }}>
                EDF PEI — Guyane française
              </p>

              <h1
                id="hero-heading"
                className="heading-display text-edf-blue hero-fade-in"
                style={{ animationDelay: "0.08s" }}
              >
                Centrale Bioénergie du Larivot
              </h1>

              <p
                className="text-xl md:text-2xl text-edf-bleu-nuit mt-5 hero-fade-in"
                style={{ animationDelay: "0.16s" }}
              >
                Une énergie <strong className="font-semibold">verte</strong> et{" "}
                <strong className="font-semibold">garantie</strong> pour la Guyane.
              </p>

              <p
                className="text-lead text-edf-bleu-nuit/75 max-w-xl mt-4 hero-fade-in"
                style={{ animationDelay: "0.24s" }}
              >
                Un projet clé qui permettra à la Guyane de franchir une étape
                significative vers le{" "}
                <span className="text-edf-green-text font-semibold">
                  100&nbsp;% énergie renouvelable
                </span>
                .
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 mt-9 hero-fade-in"
                style={{ animationDelay: "0.32s" }}
              >
                <Link href="/centrale" className="btn btn-primary">
                  Découvrir le projet
                </Link>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-secondary"
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                  Voir la vidéo
                </button>
              </div>
            </div>
          </div>

          {/* Colonne droite — vidéo signée par le cartouche EDF */}
          <div className="relative order-1 lg:order-2 h-64 sm:h-80 lg:h-auto lg:min-h-[calc(100vh-5rem)] bg-edf-blue overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={VIDEOS.modelisation2} type="video/mp4" />
            </video>
            <p className="sr-only">
              Modélisation 3D de la future Centrale Bioénergie du Larivot
            </p>

            {/* Cartouche EDF — signature de marque, angle bas-gauche */}
            <div className="absolute bottom-5 left-5 hidden sm:block hero-fade-in">
              <Cartouche
                label={
                  <>
                    Énergie verte
                    <br />
                    &amp; garantie
                  </>
                }
                camaieu="bleu"
                size="md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal vidéo */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Vidéo de modélisation 3D de la centrale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-edf-bleu-nuit/95 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Fermer la vidéo"
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" aria-hidden="true" />
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-edf-bleu-nuit"
              >
                <source src={VIDEOS.modelisation2} type="video/mp4" />
              </video>
            </motion.div>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/85 text-sm">
              Appuyez sur Échap ou cliquez à l&apos;extérieur pour fermer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
