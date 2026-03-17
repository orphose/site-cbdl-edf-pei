"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp } from "@/lib/motion-variants";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white" aria-labelledby="section-faq-heading">
      <div className="container-custom">
        <motion.div
          {...fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <SectionHeader
            badge="FAQ"
            badgeColor="orange"
            heading={<>Questions <span className="text-edf-orange">fréquentes</span></>}
            id="section-faq-heading"
            className="mb-12"
          />

          <div className="divide-y divide-gray-200">
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
                      <span className="text-gray-900 font-medium text-lg pr-4">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
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
                        <p className="text-gray-600 pb-5 leading-relaxed">
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
      </div>
    </section>
  );
}
