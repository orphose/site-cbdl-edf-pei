/**
 * Presets d'animation Framer Motion partagés
 * Mouvement sobre et cohérent : fades courts, déplacements ≤ 12px.
 * prefers-reduced-motion est neutralisé globalement dans globals.css.
 */
import type { Variants } from "framer-motion";

/** Fade-in vers le haut — animation standard pour les blocs de contenu */
export const fadeInUp = {
  initial: { opacity: 0, y: 12 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: "easeOut" as const },
};

/** Fade-in vers le haut avec délai personnalisé */
export const fadeInUpDelay = (delay: number) => ({
  ...fadeInUp,
  transition: { duration: 0.45, ease: "easeOut" as const, delay },
});

/** Fade-in depuis la gauche */
export const fadeInLeft = {
  initial: { opacity: 0, x: -16 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: "easeOut" as const },
};

/** Fade-in depuis la droite */
export const fadeInRight = {
  initial: { opacity: 0, x: 16 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: "easeOut" as const },
};

/** Conteneur avec stagger pour listes animées */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Item enfant pour stagger container */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/** Animation hero avec support useReducedMotion */
export const heroAnimation = (reduced: boolean, delay: number = 0) => ({
  initial: reduced ? undefined : ({ opacity: 0, y: 12 } as const),
  animate: reduced ? undefined : ({ opacity: 1, y: 0 } as const),
  transition: reduced ? undefined : { duration: 0.45, ease: "easeOut" as const, delay },
});
