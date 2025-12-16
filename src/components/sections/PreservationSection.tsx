"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, Calendar, Euro } from "lucide-react";

/**
 * Données des statistiques de préservation
 */
const PRESERVATION_STATS = [
  {
    value: "150",
    unit: "",
    label: "hectares de surface sanctuarisée",
    icon: TreePine,
  },
  {
    value: "10",
    unit: "",
    label: "hectares d'emprise",
    icon: TreePine,
  },
  {
    value: "25",
    unit: "ans",
    label: "d'exploitation de la centrale",
    icon: Calendar,
  },
  {
    value: "99",
    unit: "ans",
    label: "de préservation du site",
    icon: Calendar,
  },
  {
    value: "+400.000€",
    unit: "",
    label: "pour la préservation du site",
    icon: Euro,
  },
];

/**
 * Section Préservation - Section 6
 * Valoriser et protéger l'environnement
 */
export default function PreservationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force la lecture de la vidéo au montage
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay bloqué par le navigateur");
        }
      }
    };

    playVideo();
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Fond décoratif végétal */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;%3E%3Cpath d=&quot;M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z&quot; fill=&quot;%2300a86b&quot;/%3E%3C/svg%3E')] bg-repeat bg-[length:50px_50px]" />
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
          <span className="inline-block px-4 py-2 bg-edf-green/10 text-edf-green text-sm font-medium mb-6">
            Biodiversité
          </span>
          <h2 className="heading-lg text-black mb-6 uppercase max-w-[65%]">
            Valoriser et <span className="text-edf-green">protéger</span>
          </h2>
          <h3 className="text-2xl text-gray-700 font-light mb-6 uppercase">
            Préserver l&apos;environnement et la biodiversité
          </h3>
          <p className="text-gray-600 text-lg">
            Un espace <strong className="text-edf-green">10 fois plus vaste</strong> que la
            superficie de la centrale, dédié à la préservation de la
            biodiversité locale, cela représente un investissement de plus de{" "}
            <strong className="text-edf-orange">400 000 €</strong>.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Statistiques */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {PRESERVATION_STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm ${
                  index === 4 ? "col-span-2" : ""
                }`}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-edf-blue">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-lg text-edf-green font-medium">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Vidéo zone sanctuarisée */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden shadow-xl">
              {/* Vidéo de sanctuarisation */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/sanctuarisation_video.mp4" type="video/mp4" />
              </video>

              {/* Bordure */}
              <div className="absolute inset-0 border-2 border-edf-green/20 pointer-events-none" />
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-edf-green text-white px-6 py-3 shadow-lg"
            >
              <span className="font-bold">10x</span>
              <span className="text-sm ml-1">plus vaste</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

