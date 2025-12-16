"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, FileText, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

/**
 * Photos de la galerie
 */
const GALLERY_PHOTOS = [
  { id: 1, src: "/photo_gal_1.jpg", title: "Centrale Bioénergie du Larivot" },
  { id: 2, src: "/photo_gal_2.jpg", title: "Vue aérienne du site" },
  { id: 3, src: "/photo_gal_3.jpg", title: "Installation des équipements" },
  { id: 4, src: "/photo_gal_4.jpg", title: "Travaux de construction" },
  { id: 5, src: "/photo_gal_5.jpg", title: "Avancement du chantier" },
  { id: 6, src: "/photo_gal_6.jpg", title: "Infrastructure moderne" },
  { id: 7, src: "/photo_gal_7.jpg", title: "Moteurs haute performance" },
  { id: 8, src: "/photo_gal_8.jpg", title: "Zone industrielle" },
  { id: 9, src: "/photo_gal_9.jpg", title: "Environnement préservé" },
  { id: 10, src: "/photo_gal_10.jpg", title: "Développement durable" },
  { id: 11, src: "/photo_gal_11.jpg", title: "Équipe projet" },
  { id: 12, src: "/photo_gal_12.jpg", title: "Inauguration" },
];

/**
 * Section NAISSANCE DU PROJET - Concertation publique
 */
export default function CentraleBirthSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #001A70 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-semibold mb-6 uppercase tracking-wide">
            Naissance du Projet
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            La Centrale bioénergie du Larivot est le fruit d&apos;une{" "}
            <span className="text-edf-blue">concertation publique</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Le projet du Larivot est inscrit dans la{" "}
            <strong className="text-edf-blue">
              Programmation Pluriannuelle de l&apos;Énergie de Guyane
            </strong>
            , validée par décret le 30 Mars 2017, définissant les nouveaux 
            investissements nécessaires à la sécurité du système électrique 
            du territoire.
          </p>
        </motion.div>

        {/* Timeline de la concertation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              icon: FileText,
              date: "30 Mars 2017",
              title: "PPE Guyane",
              description:
                "Inscription du projet dans la Programmation Pluriannuelle de l'Énergie de Guyane.",
              color: "#001A70",
            },
            {
              icon: Users,
              date: "2018-2019",
              title: "Concertation Publique",
              description:
                "Dialogue avec les acteurs locaux et la population pour co-construire le projet.",
              color: "#88D910",
            },
            {
              icon: Calendar,
              date: "2021",
              title: "Décret Biocarburants",
              description:
                "Décret du 27 août 2021 confirmant l'utilisation de la biomasse liquide renouvelable.",
              color: "#FFB210",
            },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="relative bg-white border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Icône */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                  }}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Date */}
                <div
                  className="text-sm font-semibold mb-2"
                  style={{ color: item.color }}
                >
                  {item.date}
                </div>

                {/* Titre */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Numéro décoratif */}
                <div
                  className="absolute top-4 right-4 text-5xl font-bold leading-none opacity-[0.05] select-none"
                  style={{ color: item.color }}
                >
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Galerie de photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Titre de la galerie */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-edf-green rounded-xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Galerie Photos
            </h3>
            <span className="text-sm text-gray-400">
              ({GALLERY_PHOTOS.length} photos)
            </span>
          </div>

          {/* Grille de photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_PHOTOS.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSelectedPhoto(index)}
              >
                {/* Image */}
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {photo.title}
                    </p>
                  </div>
                </div>

                {/* Icône zoom */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-edf-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Bouton fermer */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation précédent */}
              <button
                className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((prev) =>
                    prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : null
                  );
                }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <motion.div
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-4xl aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={GALLERY_PHOTOS[selectedPhoto].src}
                  alt={GALLERY_PHOTOS[selectedPhoto].title}
                  fill
                  className="object-contain"
                />
                {/* Titre */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-lg font-medium">
                    {GALLERY_PHOTOS[selectedPhoto].title}
                  </p>
                  <p className="text-white/60 text-sm">
                    {selectedPhoto + 1} / {GALLERY_PHOTOS.length}
                  </p>
                </div>
              </motion.div>

              {/* Navigation suivant */}
              <button
                className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((prev) =>
                    prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : null
                  );
                }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

