"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Flower2,
  Heart,
  TreePine,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getMediaUrl } from "@/lib/supabase";
import { getActivePartnerships } from "@/lib/api";
import type { Partnership } from "@/lib/database.types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SectionHeader from "@/components/ui/SectionHeader";

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  flower: Flower2,
  heart: Heart,
  "tree-pine": TreePine,
};

/**
 * Section Partenariats — carousel centré, données Supabase.
 * Camaïeu bleu unique (les couleurs stockées en base sont ignorées
 * au profit de la charte).
 */
export default function PartnershipsSection() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    async function loadPartnerships() {
      try {
        const data = await getActivePartnerships();
        setPartnerships(data);
      } catch (error) {
        console.error("Erreur chargement partenariats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPartnerships();
  }, []);

  const nextSlide = useCallback(() => {
    if (partnerships.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % partnerships.length);
  }, [partnerships.length]);

  const prevSlide = useCallback(() => {
    if (partnerships.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + partnerships.length) % partnerships.length);
  }, [partnerships.length]);

  // Navigation clavier
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (loading) {
    return (
      <section
        role="status"
        aria-busy="true"
        aria-live="polite"
        className="section bg-white"
      >
        <span className="sr-only">Chargement des partenariats…</span>
        <div className="container-custom">
          <div className="img-skeleton h-4 w-32 mb-6" />
          <div className="img-skeleton h-10 w-full max-w-xl mb-12" />
          <div className="flex justify-center">
            <div className="img-skeleton w-full max-w-[850px] h-[340px]" />
          </div>
        </div>
      </section>
    );
  }

  if (partnerships.length === 0) {
    return (
      <section className="section bg-white" aria-labelledby="section-partnerships-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Partenariats"
            heading={
              <>
                Ancrage local et <span className="text-edf-bleu-action">partenariats</span>
              </>
            }
            id="section-partnerships-heading"
            description="Les premiers partenaires locaux du projet seront présentés ici très prochainement."
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className="section bg-white overflow-hidden"
      aria-labelledby="section-partnerships-heading"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Partenariats"
          heading={
            <>
              Ancrage local et <span className="text-edf-bleu-action">partenariats</span>
            </>
          }
          id="section-partnerships-heading"
          className="mb-12"
        />
      </div>

      {/* Carousel centré */}
      <div
        className="relative h-[520px] md:h-[380px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Partenariats"
      >
        <div aria-live="polite" className="sr-only">
          Partenariat {currentIndex + 1} sur {partnerships.length} :{" "}
          {partnerships[currentIndex]?.name}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {partnerships.map((partnership, index) => {
            let position = index - currentIndex;

            if (position > partnerships.length / 2) {
              position -= partnerships.length;
            } else if (position < -partnerships.length / 2) {
              position += partnerships.length;
            }

            const isActive = position === 0;
            const isPrev = position === -1;
            const isNext = position === 1;
            const isVisible = Math.abs(position) <= 1;

            if (!isVisible) return null;

            let translateX = "0%";
            let scale = 1;
            let opacity = 1;
            let zIndex = 20;

            if (isPrev) {
              translateX = "-75%";
              scale = 0.85;
              opacity = 0.4;
              zIndex = 10;
            } else if (isNext) {
              translateX = "75%";
              scale = 0.85;
              opacity = 0.4;
              zIndex = 10;
            }

            return (
              <motion.div
                key={partnership.id}
                className="absolute w-[85%] md:w-[55%] max-w-[850px]"
                initial={false}
                animate={{ x: translateX, scale, opacity, zIndex }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 300, damping: 30 }
                }
                style={{ zIndex }}
                aria-hidden={!isActive}
              >
                <PartnershipCard partnership={partnership} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="container-custom">
        <div className="flex justify-center items-center gap-5 mt-8">
          <button
            onClick={prevSlide}
            aria-label="Partenariat précédent"
            className="inline-flex items-center justify-center w-12 h-12 border-2 border-edf-blue text-edf-blue hover:bg-edf-blue hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Indicateurs carrés */}
          <div className="flex" role="tablist" aria-label="Sélection de partenariat">
            {partnerships.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="p-2 flex items-center justify-center min-w-11 min-h-11"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Partenariat ${index + 1} sur ${partnerships.length}`}
              >
                <span
                  className={`block h-2.5 transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-edf-bleu-action w-7"
                      : "bg-edf-gris-clair hover:bg-edf-blue-mid w-2.5"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Partenariat suivant"
            className="inline-flex items-center justify-center w-12 h-12 border-2 border-edf-blue text-edf-blue hover:bg-edf-blue hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

interface PartnershipCardProps {
  partnership: Partnership;
  isActive: boolean;
}

function PartnershipCard({ partnership, isActive }: PartnershipCardProps) {
  const Icon = ICON_MAP[partnership.icon_name || "zap"] || Zap;
  const imageUrl = partnership.logo_url ? getMediaUrl(partnership.logo_url) : null;
  const hasRealImage = imageUrl && !imageUrl.includes("/images/");

  return (
    <article
      className={`bg-white overflow-hidden transition-shadow duration-300 ${
        isActive ? "shadow-4" : "shadow-2"
      }`}
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="h-[200px] md:h-[340px] relative bg-edf-blanc-bleute">
          {hasRealImage ? (
            <Image
              src={imageUrl}
              alt={partnership.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 425px, 85vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <span
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-edf-blue mb-3"
                aria-hidden="true"
              >
                <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </span>
              <p className="text-caption text-center">Photo à venir</p>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="min-h-[200px] md:h-[340px] p-6 md:p-8 flex flex-col justify-center">
          <p className="eyebrow mb-3">Partenariat local</p>
          <h3 className="heading-4 text-edf-bleu-nuit mb-3 line-clamp-2">
            {partnership.name}
          </h3>
          <p className="text-edf-bleu-nuit/75 leading-relaxed text-sm line-clamp-4 md:line-clamp-5">
            {partnership.description}
          </p>
        </div>
      </div>
    </article>
  );
}
