"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, Zap, Flower2, Heart, TreePine } from "lucide-react";
import Image from "next/image";

/**
 * Données des partenariats locaux
 */
const PARTNERSHIPS = [
  {
    id: 1,
    icon: Zap,
    title: "Électrification du village Palikour",
    description:
      "EDF PEI travaille en étroite collaboration avec le village Palikour et la municipalité de Matoury pour promouvoir un développement durable et réfléchi de la Guyane. L'électrification du village favorise un accès juste et équilibré aux ressources énergétiques, stimule les opportunités de croissance et renforce l'égalité des chances pour tous.",
    image: "/village_palikour_1.jpg",
    color: "#001A70",
  },
  {
    id: 2,
    icon: Flower2,
    title: "Installation de ruches à miel sur le site",
    description:
      "Au dernier trimestre 2022, la Miellerie de Macouria a initié une action ambitieuse et innovante : installer des ruches à miel sur le site de la future centrale bioénergie du Larivot. Cette action favorise la pollinisation des espèces végétales avoisinantes et dynamise la biodiversité régionale.",
    image: "/miellerie_macouria_1.jpg",
    color: "#FFB210",
  },
  {
    id: 3,
    icon: Heart,
    title: "Soutien à l'Association Protecta",
    description:
      "EDF PEI apporte un soutien financier important à l'Association Protecta, gestionnaire de la Ferme Pédagogique du Larivot, un écosystème foisonnant qui offre aux jeunes Guyanais l'opportunité d'explorer la biodiversité locale.",
    image: "/ferme_peda_1.jpg",
    color: "#001A70",
  },
  {
    id: 4,
    icon: TreePine,
    title: "Le Palmetum de Macouria",
    description:
      "EDF PEI a souhaité participer à ce jardin botanique à la suite de la découverte, sur son site, de plans de palmiers présentant un intérêt patrimonial. Ces plans d'Astrocaryum murumuru ont été replantés sur le site du Palmetum.",
    image: "/palmetum_macouria_1.jpg",
    color: "#88D910",
  },
];

/**
 * Section Partenariats - Section 7
 * Carousel centré avec carte active au milieu - transitions fluides
 */
export default function PartnershipsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PARTNERSHIPS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PARTNERSHIPS.length) % PARTNERSHIPS.length);
  };

  // Calcul des index pour les cartes visibles (précédente, active, suivante)
  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + PARTNERSHIPS.length) % PARTNERSHIPS.length;
  };

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
      <div className="relative z-10 h-[420px] md:h-[380px]">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Toutes les cartes avec animation fluide */}
          {PARTNERSHIPS.map((partnership, index) => {
            // Calcul de la position relative par rapport à la carte active
            let position = index - currentIndex;
            
            // Gestion du wrap-around pour l'effet infini
            if (position > PARTNERSHIPS.length / 2) {
              position -= PARTNERSHIPS.length;
            } else if (position < -PARTNERSHIPS.length / 2) {
              position += PARTNERSHIPS.length;
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
            {PARTNERSHIPS.map((_, index) => (
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
  partnership: typeof PARTNERSHIPS[0];
  isActive: boolean;
}

function PartnershipCard({ partnership, isActive }: PartnershipCardProps) {
  const Icon = partnership.icon;
  const hasRealImage = partnership.image && !partnership.image.includes("/images/");
  
  return (
    <Card className={`bg-white border-none overflow-hidden transition-shadow duration-300 ${
      isActive ? "shadow-2xl" : "shadow-xl"
    }`}>
      <CardBody className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div
            className="h-[180px] md:h-[340px] relative"
            style={{ backgroundColor: `${partnership.color}15` }}
          >
            {hasRealImage ? (
              <Image
                src={partnership.image}
                alt={partnership.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: partnership.color }}
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
          <div className="h-[180px] md:h-[340px] p-5 md:p-8 flex flex-col justify-center">
            <span
              className="inline-block self-start px-3 py-1 text-xs font-medium mb-3 text-white"
              style={{ backgroundColor: partnership.color }}
            >
              PARTENARIAT LOCAL
            </span>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 line-clamp-2">
              {partnership.title}
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
