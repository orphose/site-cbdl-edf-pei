"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Navigation } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUpDelay } from "@/lib/motion-variants";
import { FAQ_ITEMS } from "@/lib/constants";

/**
 * Section Informations pratiques — FAQ + localisation.
 * Layout 2 colonnes desktop (FAQ 60 % | carte 40 %), empilé en mobile.
 */
export default function InfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-white" aria-labelledby="section-info-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Informations pratiques"
          heading={
            <>
              Questions fréquentes &amp;{" "}
              <span className="text-edf-bleu-action">localisation</span>
            </>
          }
          id="section-info-heading"
          className="mb-12"
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* FAQ */}
          <motion.div {...fadeInUpDelay(0.05)} className="lg:col-span-3">
            <div className="border-t border-edf-gris-clair">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                const headingId = `faq-heading-${index}`;
                const panelId = `faq-panel-${index}`;
                return (
                  <div key={index} className="border-b border-edf-gris-clair">
                    <h3>
                      <button
                        id={headingId}
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className={`flex justify-between items-center gap-4 w-full min-h-12 py-5 text-left transition-colors ${
                          isOpen ? "text-edf-bleu-action" : "text-edf-bleu-nuit hover:text-edf-bleu-action"
                        }`}
                      >
                        <span className="font-semibold text-base md:text-lg">
                          {item.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="shrink-0"
                          aria-hidden="true"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={headingId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-edf-bleu-nuit/75 pb-6 leading-relaxed max-w-prose">
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

          {/* Carte + accès */}
          <motion.div {...fadeInUpDelay(0.1)} className="lg:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden shadow-2 bg-edf-blanc-bleute">
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

            <div className="bg-edf-blanc-bleute p-6 mt-4 flex items-start gap-4">
              <span className="icon-square" aria-hidden="true">
                <Navigation className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-edf-bleu-nuit mb-1">Accès</h3>
                <p className="text-edf-bleu-nuit/75 text-sm leading-relaxed">
                  À 15 minutes de Cayenne, accessible par la RN1 en direction de Kourou.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
