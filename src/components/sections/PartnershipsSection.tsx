"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button, Skeleton } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, Zap, Flower2, Heart, TreePine, LucideIcon } from "lucide-react";
import Image from "next/image";
import { getMediaUrl } from "@/lib/supabase";
import { getActivePartnerships } from "@/lib/api";
import type { Partnership } from "@/lib/database.types";

/**
 * Mapping des noms d'icônes vers les composants Lucide
 */
const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  flower: Flower2,
  heart: Heart,
  "tree-pine": TreePine,
};

/**
 * Section Partenariats - Section 7
 * Carousel centré avec carte active au milieu - transitions fluides
 * Données dynamiques depuis Supabase
 */
export default function PartnershipsSection() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chargement des partenariats
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

  const nextSlide = () => {
    if (partnerships.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % partnerships.length);
  };

  const prevSlide = () => {
    if (partnerships.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + partnerships.length) % partnerships.length);
  };

  // Écran de chargement
  if (loading) {
    return (
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="container-custom">
          <Skeleton className="h-8 w-32 mb-6 rounded-lg" />
          <Skeleton className="h-12 w-96 mb-12 rounded-lg" />
          <div className="flex justify-center">
            <Skeleton className="w-[850px] h-[340px] rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  // Si pas de partenariats
  if (partnerships.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-edf-green/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-edf-orange/5 to-transparent" />
      </div>

      {/* En-tête */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-12"
        >
          <span className="inline-block px-4 py-2 bg-edf-orange/10 text-edf-orange text-sm font-medium mb-6">
            Partenariats
          </span>
          <h2 className="heading-lg text-black mb-4 uppercase max-w-[65%]">
            Ancrage local et{" "}
            <span className="text-edf-orange">PARTENARIATS</span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel centré */}
      <div className="relative z-10 h-[520px] md:h-[380px]">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Toutes les cartes avec animation fluide */}
          {partnerships.map((partnership, index) => {
            // Calcul de la position relative par rapport à la carte active
            let position = index - currentIndex;
            
            // Gestion du wrap-around pour l'effet infini
            if (position > partnerships.length / 2) {
              position -= partnerships.length;
            } else if (position < -partnerships.length / 2) {
              position += partnerships.length;
            }

            // Déterminer les styles selon la position
            const isActive = position === 0;
            const isPrev = position === -1;
            const isNext = position === 1;
            const isVisible = Math.abs(position) <= 1;

            if (!isVisible) return null;

            // Calcul des transformations
            let translateX = "0%";
            let scale = 1;
            let opacity = 1;
            let zIndex = 20;

            if (isPrev) {
              translateX = "-75%";
              scale = 0.85;
              opacity = 0.5;
              zIndex = 10;
            } else if (isNext) {
              translateX = "75%";
              scale = 0.85;
              opacity = 0.5;
              zIndex = 10;
            }

            return (
              <motion.div
                key={partnership.id}
                className="absolute w-[85%] md:w-[55%] max-w-[850px]"
                initial={false}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{ zIndex }}
              >
                <PartnershipCard 
                  partnership={partnership} 
                  isActive={isActive}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="container-custom relative z-30">
        <div className="flex justify-center items-center gap-6 mt-8">
          <Button
            isIconOnly
            variant="bordered"
            className="border-edf-blue text-edf-blue hover:bg-edf-blue hover:text-white transition-all"
            radius="none"
            onPress={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Indicateurs */}
          <div className="flex gap-2">
            {partnerships.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-edf-orange w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
                }`}
              />
            ))}
          </div>

          <Button
            isIconOnly
            variant="bordered"
            className="border-edf-blue text-edf-blue hover:bg-edf-blue hover:text-white transition-all"
            radius="none"
            onPress={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Composant carte de partenariat
 */
interface PartnershipCardProps {
  partnership: Partnership;
  isActive: boolean;
}

function PartnershipCard({ partnership, isActive }: PartnershipCardProps) {
  const Icon = ICON_MAP[partnership.icon_name || "zap"] || Zap;
  const color = partnership.color || "#001A70";
  const imageUrl = partnership.logo_url ? getMediaUrl(partnership.logo_url) : null;
  const hasRealImage = imageUrl && !imageUrl.includes("/images/");
  
  return (
    <Card className={`bg-white border-none overflow-hidden transition-shadow duration-300 ${
      isActive ? "shadow-2xl" : "shadow-xl"
    }`}>
      <CardBody className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div
            className="h-[200px] md:h-[340px] relative"
            style={{ backgroundColor: `${color}15` }}
          >
            {hasRealImage ? (
              <Image
                src={imageUrl}
                alt={partnership.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <p className="text-gray-500 text-xs md:text-sm text-center">
                  📷 Photo du partenariat
                </p>
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="h-auto min-h-[200px] md:h-[340px] p-5 md:p-8 flex flex-col justify-center">
            <span
              className="inline-block self-start px-3 py-1 text-xs font-medium mb-3 text-white"
              style={{ backgroundColor: color }}
            >
              PARTENARIAT LOCAL
            </span>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 line-clamp-2">
              {partnership.name}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm line-clamp-4 md:line-clamp-5">
              {partnership.description}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
