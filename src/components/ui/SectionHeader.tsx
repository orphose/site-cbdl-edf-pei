"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion-variants";

type BadgeColor = "orange" | "green" | "blue";

/**
 * Couleurs des badges — toutes les combinaisons respectent WCAG AA (≥ 4.5:1).
 * Les teintes foncées (`orange-dark`, `green-text`) remplacent les versions
 * vives qui ne passaient pas sur un fond clair 10%.
 */
const BADGE_BG: Record<BadgeColor, string> = {
  orange: "bg-edf-orange/15",
  green: "bg-edf-green/20",
  blue: "bg-edf-blue/10",
};

const BADGE_TEXT: Record<BadgeColor, string> = {
  orange: "text-edf-orange-dark",
  green: "text-edf-green-text",
  blue: "text-edf-blue",
};

interface SectionHeaderProps {
  badge: string;
  badgeColor?: BadgeColor;
  heading: React.ReactNode;
  headingColor?: "black" | "white";
  description?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionHeader({
  badge,
  badgeColor = "green",
  heading,
  headingColor = "black",
  description,
  className = "",
  id,
}: SectionHeaderProps) {
  const textColor = headingColor === "white" ? "text-white" : "text-edf-bleu-nuit";

  return (
    <motion.div {...fadeInUp} className={className}>
      <span
        className={`inline-block px-4 py-2 ${BADGE_BG[badgeColor]} ${BADGE_TEXT[badgeColor]} text-sm font-semibold uppercase tracking-wide mb-6`}
      >
        {badge}
      </span>
      <h2 id={id} className={`heading-lg ${textColor} mb-6`}>
        {heading}
      </h2>
      {description && (
        <p className="text-edf-gris-fonce text-lg leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
