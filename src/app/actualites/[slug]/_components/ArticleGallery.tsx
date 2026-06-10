"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion-variants";

interface ArticleGalleryProps {
  images: string[];
}

/** Bouton de contrôle carré de la lightbox (fond Bleu Nuit). */
const LIGHTBOX_BTN_CLASS =
  "inline-flex h-12 w-12 items-center justify-center border-2 border-white text-white hover:bg-white hover:text-edf-blue transition-colors";

export default function ArticleGallery({ images }: ArticleGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const maxIndex = images.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => Math.max(0, prev - 1));
      if (e.key === "ArrowRight") setLightboxIndex((prev) => Math.min(maxIndex, prev + 1));
    },
    [lightboxOpen, maxIndex],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setLightboxIndex((prev) => Math.min(maxIndex, prev + 1));
      else setLightboxIndex((prev) => Math.max(0, prev - 1));
    }
    touchStartX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-12">
        <motion.h2 {...fadeInUp} className="heading-3 text-edf-bleu-nuit mb-6">
          Galerie photos
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((url, index) => (
            <motion.button
              key={index}
              variants={staggerItem}
              type="button"
              aria-label={`Agrandir la photo ${index + 1} sur ${images.length}`}
              className="relative aspect-square cursor-pointer group overflow-hidden border border-edf-gris-clair"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={url}
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-edf-blue/0 group-hover:bg-edf-blue/15 transition-colors"
                aria-hidden="true"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie photos — image ${lightboxIndex + 1} sur ${images.length}`}
          className="fixed inset-0 z-50 bg-edf-bleu-nuit/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            aria-label="Fermer la galerie"
            className={`${LIGHTBOX_BTN_CLASS} absolute top-4 right-4 z-10`}
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {lightboxIndex > 0 && (
            <button
              type="button"
              aria-label="Image précédente"
              className={`${LIGHTBOX_BTN_CLASS} absolute left-4 z-10`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1} sur ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {lightboxIndex < maxIndex && (
            <button
              type="button"
              aria-label="Image suivante"
              className={`${LIGHTBOX_BTN_CLASS} absolute right-4 z-10`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
