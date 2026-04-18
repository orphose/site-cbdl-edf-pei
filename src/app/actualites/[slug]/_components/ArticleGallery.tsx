"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ArticleGalleryProps {
  images: string[];
}

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-edf-bleu-nuit mb-6">Galerie photos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative aspect-square cursor-pointer group overflow-hidden shadow-md"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={url}
                alt={`Photo ${index + 1}`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galerie photos — image ${lightboxIndex + 1} sur ${images.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Button
              isIconOnly
              variant="light"
              aria-label="Fermer la galerie"
              className="absolute top-4 right-4 text-white z-10 min-w-[48px] min-h-[48px]"
              onPress={() => setLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </Button>

            {lightboxIndex > 0 && (
              <Button
                isIconOnly
                variant="light"
                aria-label="Image précédente"
                className="absolute left-4 text-white z-10 min-w-[56px] min-h-[56px]"
                onPress={() => setLightboxIndex(lightboxIndex - 1)}
              >
                <ChevronLeft className="w-10 h-10" />
              </Button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {lightboxIndex < maxIndex && (
              <Button
                isIconOnly
                variant="light"
                aria-label="Image suivante"
                className="absolute right-4 text-white z-10 min-w-[56px] min-h-[56px]"
                onPress={() => setLightboxIndex(lightboxIndex + 1)}
              >
                <ChevronRight className="w-10 h-10" />
              </Button>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
