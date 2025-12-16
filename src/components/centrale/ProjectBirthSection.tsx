"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { 
  FileText, 
  Users, 
  Calendar, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn
} from "lucide-react";

/**
 * Timeline de concertation publique
 */
const CONCERTATION_TIMELINE = [
  {
    year: "2016",
    title: "Débat public",
    description: "Lancement du débat public pour informer et recueillir les avis des citoyens.",
    icon: Users,
    color: "#001A70",
  },
  {
    year: "2017",
    title: "PPE Guyane",
    description: "Inscription du projet dans la Programmation Pluriannuelle de l'Énergie, validée par décret le 30 Mars 2017.",
    icon: FileText,
    color: "#88D910",
  },
  {
    year: "2018-2020",
    title: "Études et autorisations",
    description: "Études environnementales approfondies et obtention des autorisations nécessaires.",
    icon: Calendar,
    color: "#FFB210",
  },
  {
    year: "2021",
    title: "Validation finale",
    description: "Décret du 27 août 2021 confirmant l'utilisation de la biomasse liquide 100% renouvelable.",
    icon: CheckCircle2,
    color: "#001A70",
  },
];

/**
 * Galerie de photos du projet
 */
const GALLERY_IMAGES = [
  {
    src: "/modelisation_photo_1.png",
    alt: "Modélisation 3D de la centrale",
    title: "Vue aérienne",
  },
  {
    src: "/ferme_peda_1.jpg",
    alt: "Ferme pédagogique",
    title: "Ferme pédagogique",
  },
  {
    src: "/miellerie_macouria_1.jpg",
    alt: "Miellerie de Macouria",
    title: "Miellerie de Macouria",
  },
  {
    src: "/palmetum_macouria_1.jpg",
    alt: "Palmetum de Macouria",
    title: "Palmetum de Macouria",
  },
  {
    src: "/village_palikour_1.jpg",
    alt: "Village Palikour",
    title: "Village Palikour",
  },
  {
    src: "/qualite_air_photo_1.jpg",
    alt: "Station qualité de l'air",
    title: "Qualité de l'air",
  },
  {
    src: "/visuel_biomasse_1.png",
    alt: "Cycle de la biomasse",
    title: "Cycle biomasse",
  },
  {
    src: "/emprise_cbdl_vs_solaire.png",
    alt: "Comparaison d'emprise",
    title: "Emprise au sol",
  },
  {
    src: "/modelisation_photo_1.png",
    alt: "Vue de la centrale",
    title: "Vue détaillée",
  },
  {
    src: "/ferme_peda_1.jpg",
    alt: "Activités pédagogiques",
    title: "Éducation",
  },
  {
    src: "/miellerie_macouria_1.jpg",
    alt: "Production locale",
    title: "Partenariats",
  },
  {
    src: "/palmetum_macouria_1.jpg",
    alt: "Biodiversité",
    title: "Environnement",
  },
];

/**
 * Section NAISSANCE DU PROJET - Concertation publique + galerie
 */
export default function ProjectBirthSection() {
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Ouvre la lightbox avec l'image sélectionnée
   */
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  /**
   * Ferme la lightbox
   */
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  /**
   * Navigation dans la lightbox
   */
  const navigateLightbox = (direction: "prev" | "next") => {
    const maxIndex = GALLERY_IMAGES.length - 1;
    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    } else {
      setCurrentImageIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-semibold mb-6 uppercase tracking-wider">
            Naissance du projet
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase">
            La Centrale bioénergie du Larivot est le fruit d&apos;une{" "}
            <span className="text-edf-blue">concertation publique</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Le projet du Larivot est inscrit dans la Programmation Pluriannuelle de l&apos;Énergie 
            de Guyane, validée par décret le 30 Mars 2017, définissant les nouveaux investissements 
            nécessaires à la sécurité du système électrique du territoire.
          </p>
        </motion.div>

        {/* Timeline de concertation */}
        <div ref={timelineRef} className="mb-20">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Ligne de progression */}
            <div className="absolute top-[50px] left-0 right-0 h-1 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-edf-blue via-edf-green to-edf-orange rounded-full"
                initial={{ width: "0%" }}
                animate={isTimelineInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-8">
              {CONCERTATION_TIMELINE.map((step, index) => {
                const IconComponent = step.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Point sur la ligne */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isTimelineInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                      className="relative mb-6"
                    >
                      {/* Cercle animé */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: step.color }}
                        initial={{ scale: 1, opacity: 0.3 }}
                        animate={isTimelineInView ? {
                          scale: [1, 1.4, 1],
                          opacity: [0.2, 0, 0.2],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />

                      {/* Cercle principal */}
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl relative z-10 border-4 border-white"
                        style={{
                          background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                          boxShadow: `0 8px 30px ${step.color}30`,
                        }}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Badge année */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isTimelineInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20"
                      >
                        <div
                          className="bg-white px-3 py-1 rounded-full shadow-lg text-sm font-bold"
                          style={{ color: step.color }}
                        >
                          {step.year}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Contenu texte */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isTimelineInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
                      className="text-center mt-4"
                    >
                      <h3
                        className="font-bold text-lg mb-2 uppercase"
                        style={{ color: step.color }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {CONCERTATION_TIMELINE.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                    }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: step.color }}
                    >
                      {step.year}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Galerie de photos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <h3 className="heading-md text-black uppercase">
              Galerie <span className="text-edf-green">photos</span>
            </h3>
            <p className="text-gray-500 mt-2">
              Découvrez le projet en images
            </p>
          </div>

          {/* Grille de photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square cursor-pointer overflow-hidden bg-gray-100"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-edf-blue/0 group-hover:bg-edf-blue/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                    <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">{image.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[currentImageIndex].src}
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Navigation suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Titre et compteur */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-medium mb-2">
              {GALLERY_IMAGES[currentImageIndex].title}
            </p>
            <p className="text-white/60 text-sm">
              {currentImageIndex + 1} / {GALLERY_IMAGES.length}
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}

