"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay } from "@/lib/motion-variants";

/**
 * Section Localisation - Section 8 (suite)
 * Carte de localisation de la centrale
 */
export default function LocationSection() {
  return (
    <section className="section-padding bg-edf-blanc-bleute relative overflow-hidden" aria-labelledby="section-location-heading">
      <div className="container-custom relative z-10">
        {/* En-tête */}
        <SectionHeader
          badge="Localisation"
          badgeColor="orange"
          heading={<>Localisation de la <span className="text-edf-orange">centrale</span></>}
          description="La centrale bioénergie du Larivot est située en Guyane française, à proximité de Cayenne."
          id="section-location-heading"
          className="max-w-4xl mb-12"
        />

        {/* Carte */}
        <motion.div
          {...fadeInUpDelay(0.1)}
          className="relative"
        >
          {/* Container de la carte */}
          <div className="relative aspect-[2/1] overflow-hidden shadow-xl bg-edf-blue-light">
            {/* Placeholder pour Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63611.87893940849!2d-52.35!3d4.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d17e4f3c8b9a8af%3A0x4b5e2c6e2e8e8e8e!2sLarivot%2C%20Guyane%20fran%C3%A7aise!5e0!3m2!1sfr!2sfr!4v1702500000000!5m2!1sfr!2sfr"
              title="Carte de localisation de la Centrale Bioénergie du Larivot, Guyane française"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

          {/* Carte info supplémentaire */}
          <motion.div
            {...fadeInUpDelay(0.2)}
            className="mt-4 md:mt-0 md:absolute md:right-8 md:top-8 bg-white shadow-lg p-4 md:p-6 md:max-w-xs"
          >
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-edf-green/10 flex items-center justify-center flex-shrink-0">
                <Navigation className="w-4 h-4 md:w-5 md:h-5 text-edf-green" />
              </div>
              <h4 className="font-bold text-edf-bleu-nuit text-sm md:text-base">Accès</h4>
            </div>
            <p className="text-edf-gris-fonce text-sm">
              À 15 minutes de Cayenne, accessible par la RN1 en direction de Kourou.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

