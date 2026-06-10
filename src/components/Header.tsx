"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { IMAGES } from "@/lib/media";
import { NAV_LINKS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";

/**
 * Header / navigation principale.
 *
 * Design system : fond blanc permanent (charte EDF — nav blanc ou blanc bleuté),
 * texte Bleu Nuit, état actif marqué par une barre Bleu Action collée au bas
 * du header ("you are here" évident, Krug). Aucune animation d'entrée : la
 * navigation est un repère stable.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Fermer le menu mobile avec Escape + focus trap + body scroll lock
  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableEls = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    const firstLink = menuRef.current?.querySelector("a");
    firstLink?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifier si un admin est connecté
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session?.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-2" : "border-b border-edf-gris-clair"
      }`}
    >
      <div className="container-custom h-full flex items-center justify-between gap-6">
        {/* Logo EDF PEI — toujours en haut à gauche (charte) */}
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="EDF PEI — Centrale Bioénergie du Larivot, accueil"
        >
          <Image
            src={IMAGES.logo.couleurs}
            alt="EDF PEI"
            width={180}
            height={72}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:flex items-center self-stretch gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center h-full px-3 text-[0.9375rem] transition-colors ${
                  active
                    ? "text-edf-bleu-action font-semibold"
                    : "text-edf-bleu-nuit font-medium hover:text-edf-bleu-action"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.name}
                {/* Barre active — repère "vous êtes ici" */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-[3px] transition-colors ${
                    active ? "bg-edf-bleu-action" : "bg-transparent"
                  }`}
                />
              </Link>
            );
          })}

          {/* Utilitaire Presse — séparé de la navigation de contenu */}
          <Link
            href="/presse"
            className={`ml-4 inline-flex items-center min-h-11 px-5 border-2 text-sm font-semibold transition-colors ${
              isActive("/presse")
                ? "border-edf-bleu-nuit bg-edf-bleu-nuit text-white"
                : "border-edf-bleu-nuit text-edf-bleu-nuit hover:bg-edf-bleu-nuit hover:text-white"
            }`}
            aria-current={isActive("/presse") ? "page" : undefined}
          >
            Presse
          </Link>

          {/* Accès admin — visible uniquement si connecté */}
          {isAdmin && (
            <Link
              href="/admin"
              className="ml-2 inline-flex items-center gap-2 min-h-11 px-4 bg-edf-blue text-white text-sm font-semibold hover:bg-edf-blue-mid transition-colors"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              Admin
            </Link>
          )}
        </nav>

        {/* Bouton menu mobile — cible tactile 48px (Fitts) */}
        <button
          ref={hamburgerRef}
          className="lg:hidden inline-flex items-center justify-center min-w-12 min-h-12 p-3 -mr-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="w-6 h-[1.125rem] relative flex flex-col justify-between" aria-hidden="true">
            <span
              className={`w-full h-0.5 bg-edf-bleu-nuit transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-edf-bleu-nuit transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-edf-bleu-nuit transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile — panneau blanc cohérent avec la nav desktop */}
      {isMenuOpen && (
        <nav
          ref={menuRef}
          id="mobile-menu"
          aria-label="Navigation principale"
          className="lg:hidden absolute top-16 inset-x-0 bg-white border-t border-edf-gris-clair shadow-4 max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          <ul className="py-2">
            {[...NAV_LINKS, { name: "Presse", href: "/presse" as const }].map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center min-h-12 px-5 py-3 text-base transition-colors ${
                      active
                        ? "bg-edf-blanc-bleute text-edf-bleu-action font-semibold"
                        : "text-edf-bleu-nuit font-medium hover:bg-edf-blanc-bleute"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {isAdmin && (
              <li className="mt-2 border-t border-edf-gris-clair">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 min-h-12 px-5 py-3 text-base font-semibold text-white bg-edf-blue hover:bg-edf-blue-mid transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                  Administration
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
