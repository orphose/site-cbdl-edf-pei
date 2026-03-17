"use client";

import { NextUIProvider as Provider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

/**
 * Provider NextUI qui wrappe l'application
 * Permet d'utiliser les composants NextUI avec la navigation Next.js
 */
export function NextUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Provider navigate={router.push}>
      {children}
    </Provider>
  );
}

