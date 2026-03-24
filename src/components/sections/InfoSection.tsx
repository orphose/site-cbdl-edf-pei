"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, fadeInUpDelay } from "@/lib/motion-variants";
import { FAQ_ITEMS } from "@/lib/constants";

/**
 * Section Informations pratiques - FAQ + Localisation
 * Layout 2 colonnes desktop (FAQ 60% | Carte 40%), empilé en mobile
 */
export default function InfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-edf-blanc-bleute" aria-labelledby="section-info-heading">
      <div className="container-custom">
        {/* En-tête */}
        <SectionHeader
          badge="Informations pratiques"
          badgeColor="orange"
          heading={<>Questions fréquentes & <span className="text-edf-orange">localisation</span></>}
          id="section-info-heading"
          className="mb-12"
        />

        {/* Contenu 2 colonnes */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Colonne gauche — FAQ (3/5 = 60%) */}
          <motion.div
            {...fadeInUpDelay(0.1)}
            className="lg:col-span-3"
          >
            <div className="divide-y divide-edf-gris-clair">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                const headingId = `faq-heading-${index}`;
                const panelId = `faq-panel-${index}`;
                return (
                  <div key={index}>
                    <h3>
                      <button
                        id={headingId}
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="flex justify-between items-center w-full py-5 text-left"
                      >
                        <span className="text-edf-bleu-nuit font-medium text-lg pr-4">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-edf-gris-moyen" aria-hidden="true" />
                        </motion.div>
                      </button>
                    </h3>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={headingId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-edf-gris-fonce pb-5 leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Colonne droite — Carte + Accès (2/5 = 40%) */}
          <motion.div
            {...fadeInUpDelay(0.2)}
            className="lg:col-span-2"
          >
            {/* Carte */}
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg bg-edf-blue-light">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
