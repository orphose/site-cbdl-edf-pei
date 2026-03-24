"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion-variants";

type BadgeColor = "orange" | "green" | "blue";

const BADGE_BG: Record<BadgeColor, string> = {
  orange: "bg-edf-orange/10",
  green: "bg-edf-green/10",
  blue: "bg-edf-blue/10",
};

const BADGE_TEXT: Record<BadgeColor, string> = {
  orange: "text-edf-orange",
  green: "text-edf-green",
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
        className={`inline-block px-4 py-2 ${BADGE_BG[badgeColor]} ${BADGE_TEXT[badgeColor]} text-sm font-medium uppercase tracking-wide mb-6`}
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
