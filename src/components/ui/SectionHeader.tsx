"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion-variants";

type Tone = "blue" | "green";
type Align = "left" | "center";

interface SectionHeaderProps {
  /** Surtitre court (1 à 3 mots) affiché au-dessus du titre. */
  eyebrow: string;
  /**
   * Titre H2. Pour la mise en exergue (charte p.26) : graisse OU couleur,
   * jamais les deux — ex. <span className="text-edf-bleu-action">mot</span>.
   */
  heading: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Registre coloriel de l'eyebrow : "blue" par défaut,
   * "green" réservé aux sections environnementales.
   */
  tone?: Tone;
  /** Sur fond Bleu Foncé (.section-dark) */
  onDark?: boolean;
  align?: Align;
  className?: string;
  id?: string;
}

/**
 * En-tête de section unifié : eyebrow → H2 → description.
 * Toutes les sections du site public passent par ce composant
 * pour garantir une hiérarchie visuelle constante.
 */
export default function SectionHeader({
  eyebrow,
  heading,
  description,
  tone = "blue",
  onDark = false,
  align = "left",
  className = "",
  id,
}: SectionHeaderProps) {
  const eyebrowClass = onDark
    ? "eyebrow eyebrow--on-dark"
    : tone === "green"
      ? "eyebrow eyebrow--green"
      : "eyebrow";

  const headingColor = onDark ? "text-white" : "text-edf-bleu-nuit";
  const descriptionColor = onDark ? "text-white/80" : "text-edf-bleu-nuit/75";
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <motion.div {...fadeInUp} className={`max-w-3xl ${alignClass} ${className}`}>
      <p className={`${eyebrowClass} mb-4 ${align === "center" ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2 id={id} className={`heading-2 ${headingColor}`}>
        {heading}
      </h2>
      {description && (
        <p className={`text-lead ${descriptionColor} mt-5`}>{description}</p>
      )}
    </motion.div>
  );
}
