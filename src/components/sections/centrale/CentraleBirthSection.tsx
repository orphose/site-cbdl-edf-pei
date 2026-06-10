"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  FileText,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getMediaUrl } from "@/lib/supabase";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion-variants";

/**
 * Photos de la galerie
 */
const GALLERY_PHOTOS = [
  { id: 1, src: getMediaUrl("photo_gal_1.jpg"), title: "Centrale Bioénergie du Larivot" },
  { id: 2, src: getMediaUrl("photo_gal_2.jpg"), title: "Vue aérienne du site" },
  { id: 3, src: getMediaUrl("photo_gal_3.jpg"), title: "Installation des équipements" },
  { id: 4, src: getMediaUrl("photo_gal_4.jpg"), title: "Travaux de construction" },
  { id: 5, src: getMediaUrl("photo_gal_5.jpg"), title: "Avancement du chantier" },
  { id: 6, src: getMediaUrl("photo_gal_6.jpg"), title: "Infrastructure moderne" },
  { id: 7, src: getMediaUrl("photo_gal_7.jpg"), title: "Moteurs haute performance" },
  { id: 8, src: getMediaUrl("photo_gal_8.jpg"), title: "Zone industrielle" },
  { id: 9, src: getMediaUrl("photo_gal_9.jpg"), title: "Environnement préservé" },
  { id: 10, src: getMediaUrl("photo_gal_10.jpg"), title: "Développement durable" },
  { id: 11, src: getMediaUrl("photo_gal_11.jpg"), title: "Équipe projet" },
  { id: 12, src: getMediaUrl("photo_gal_12.jpg"), title: "Inauguration" },
];

/**
 * Étapes de la naissance du projet — registre institutionnel :
 * camaïeu bleu unique.
 */
const TIMELINE_ITEMS = [
  {
    icon: FileText,
    date: "30 Mars 2017",
    title: "PPE Guyane",
    description:
      "Inscription du projet dans la Programmation Pluriannuelle de l'Énergie de Guyane.",
  },
  {
    icon: Users,
    date: "2018-2019",
    title: "Concertation Publique",
    description:
      "Dialogue avec les acteurs locaux et la population pour co-construire le projet.",
  },
  {
    icon: Calendar,
    date: "2021",
    title: "Décret Biocarburants",
    description:
      "Décret du 27 août 2021 confirmant l'utilisation de la biomasse liquide renouvelable.",
  },
];

/**
 * Section NAISSANCE DU PROJET — concertation publique + galerie photos.
 * Fond Blanc Bleuté, accents bleus (registre institutionnel).
 */
export default function CentraleBirthSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const showPrevious = useCallback(() => {
    setSelectedPhoto((prev) =>
      prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : null
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedPhoto((prev) =>
      prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : null
    );
  }, []);

  /* Navigation clavier de la visionneuse (Échap, flèches) */
  useEffect(() => {
    if (selectedPhoto === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      else if (event.key === "ArrowLeft") showPrevious();
      else if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, showPrevious, showNext]);

  return (
    <section aria-labelledby="centrale-birth-heading" className="section section-alt">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Naissance du Projet"
          heading={
            <>
              La Centrale bioénergie du Larivot est le fruit d&apos;une{" "}
              <span className="text-edf-bleu-action">concertation publique</span>
            </>
          }
          description={
            <>
              Le projet est inscrit dans la{" "}
              <strong className="font-semibold">
                Programmation Pluriannuelle de l&apos;Énergie de Guyane
              </strong>{" "}
              (décret du 30 mars 2017), qui définit les investissements
              nécessaires à la sécurité électrique du territoire.
            </>
          }
          id="centrale-birth-heading"
          className="mb-14"
        />

        {/* Étapes de la concertation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {TIMELINE_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div key={item.title} variants={staggerItem} className="card-pop-wrap">
                <article className="card-edf card-pop h-full px-6 pb-6 pt-12">
                  <span className="icon-square" aria-hidden="true">
                    <IconComponent className="w-6 h-6" />
                  </span>

                  <p className="text-sm font-semibold text-edf-bleu-action mb-2">
                    {item.date}
                  </p>

                  <h3 className="heading-4 text-edf-bleu-nuit mb-2">{item.title}</h3>

                  <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Galerie de photos */}
        <motion.div {...fadeInUp}>
          {/* Titre de la galerie */}
          <div className="flex items-center gap-3 mb-8">
            <span className="icon-square" aria-hidden="true">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h3 className="heading-3 text-edf-bleu-nuit">Galerie Photos</h3>
            <span className="text-caption">({GALLERY_PHOTOS.length} photos)</span>
          </div>

          {/* Grille de photos */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none"
          >
            {GALLERY_PHOTOS.map((photo, index) => (
              <motion.li key={photo.id} variants={staggerItem}>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(index)}
                  aria-label={`Agrandir la photo : ${photo.title}`}
                  className="group relative block w-full aspect-square overflow-hidden img-skeleton cursor-zoom-in"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />

                  {/* Voile au survol */}
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-edf-blue/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />

                  {/* Affordance zoom */}
                  <span
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 bg-white/90 shadow-2">
                      <ZoomIn className="w-5 h-5 text-edf-blue" />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visionneuse plein écran */}
        {selectedPhoto !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo agrandie : ${GALLERY_PHOTOS[selectedPhoto].title}`}
            className="fixed inset-0 z-50 bg-edf-blue/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Bouton fermer */}
            <button
              type="button"
              aria-label="Fermer la visionneuse"
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6 text-white" aria-hidden="true" />
            </button>

            {/* Navigation précédent */}
            <button
              type="button"
              aria-label="Photo précédente"
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
            >
              <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
            </button>

            {/* Image */}
            <div
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_PHOTOS[selectedPhoto].src}
                alt={GALLERY_PHOTOS[selectedPhoto].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {/* Compteur */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-edf-blue/70 to-transparent p-6">
                <p className="text-white/80 text-sm">
                  {selectedPhoto + 1} / {GALLERY_PHOTOS.length}
                </p>
              </div>
            </div>

            {/* Navigation suivant */}
            <button
              type="button"
              aria-label="Photo suivante"
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
            >
              <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
