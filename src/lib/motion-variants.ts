/**
 * Presets d'animation Framer Motion partages
 * Remplace les props motion copiees-collees dans chaque composant
 */
import type { Variants } from "framer-motion";

/** Fade-in vers le haut — animation standard pour les blocs de contenu */
export const fadeInUp = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.3 },
};

/** Fade-in vers le haut avec delai personnalise */
export const fadeInUpDelay = (delay: number) => ({
  ...fadeInUp,
  transition: { duration: 0.3, delay },
});

/** Fade-in depuis la gauche */
export const fadeInLeft = {
  initial: { opacity: 0, x: -50 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.3 },
};

/** Fade-in depuis la droite */
export const fadeInRight = {
  initial: { opacity: 0, x: 50 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.3 },
};

/** Conteneur avec stagger pour listes animees */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

/** Item enfant pour stagger container */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

/** Animation hero avec support useReducedMotion */
export const heroAnimation = (reduced: boolean, delay: number = 0) => ({
  initial: reduced ? undefined : ({ opacity: 0, y: 30 } as const),
  animate: reduced ? undefined : ({ opacity: 1, y: 0 } as const),
  transition: reduced ? undefined : { duration: 0.3, delay },
});
