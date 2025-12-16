"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

/**
 * Section Localisation - Section 8 (suite)
 * Carte de localisation de la centrale
 */
export default function LocationSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-12"
        >
          <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-medium mb-6">
            Localisation
          </span>
          <h2 className="heading-lg text-black mb-4 uppercase max-w-[65%]">
            Localisation de la <span className="text-edf-orange">centrale</span>
          </h2>
          <p className="text-gray-600">
            La centrale bioénergie du Larivot est située en Guyane française,
            à proximité de Cayenne.
          </p>
        </motion.div>

        {/* Carte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Container de la carte */}
          <div className="relative aspect-[2/1] overflow-hidden shadow-xl bg-edf-blue-light">
            {/* Placeholder pour Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63611.87893940849!2d-52.35!3d4.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d17e4f3c8b9a8af%3A0x4b5e2c6e2e8e8e8e!2sLarivot%2C%20Guyane%20fran%C3%A7aise!5e0!3m2!1sfr!2sfr!4v1702500000000!5m2!1sfr!2sfr"
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-6 -right-6 md:right-8 md:bottom-auto md:top-8 bg-white shadow-lg p-6 max-w-xs"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-edf-green/10 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-edf-green" />
              </div>
              <h4 className="font-bold text-black">Accès</h4>
            </div>
            <p className="text-gray-600 text-sm">
              À 15 minutes de Cayenne, accessible par la RN1 en direction de Kourou.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

