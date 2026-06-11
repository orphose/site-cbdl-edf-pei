"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Compteur animé 0 → end au moment où l'élément entre dans le viewport.
 *
 * Résilience mobile : une chaîne requestAnimationFrame peut être abandonnée
 * par le navigateur (changement d'application sur iOS, onglet gelé) — sans
 * filet, le compteur resterait figé en cours de route, définitivement,
 * puisque l'animation ne se joue qu'une fois. D'où :
 *   1. valeur finale posée directement si l'onglet est masqué ou si
 *      l'utilisateur préfère réduire les animations ;
 *   2. minuterie de secours qui force la valeur finale à l'échéance,
 *      même si la chaîne rAF est morte (les timeouts, eux, reprennent
 *      au dégel de la page).
 */
export function useCountUp(end: number, duration: number = 1.5) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  // Marge VERTICALE uniquement : un rétrécissement latéral ("-50px" sur les
  // quatre côtés) rendait indétectable un compteur étroit collé au bord
  // gauche sur mobile — il affichait « 0 », restait étroit, donc jamais
  // détecté, donc jamais animé.
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || document.visibilityState === "hidden") {
      setCount(end);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);

    // Filet de sécurité : garantit la valeur finale quoi qu'il arrive.
    const failSafe = window.setTimeout(
      () => setCount(end),
      duration * 1000 + 250
    );

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(failSafe);
    };
  }, [isInView, end, duration]);

  return { count, ref };
}
