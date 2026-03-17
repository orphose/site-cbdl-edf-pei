"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { IMAGES } from "@/lib/media";
import { NAV_LINKS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";

/**
 * Header/Navigation du site
 * Header personnalisé sans NextUI pour un contrôle total de la hauteur
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

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      // Focus trap
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

    // Focus le premier lien du menu à l'ouverture
    const firstLink = menuRef.current?.querySelector("a");
    firstLink?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = useCallback((href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }, [pathname]);

  // Scroll effect pour le header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifier si un admin est connecté
  useEffect(() => {
    const supabase = createClient();
    
    // Vérifier la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session?.user);
    });

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-[72px] md:h-[100px] transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-white shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo EDF PEI */}
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Image
              src={IMAGES.logo.couleurs}
              alt="EDF PEI Centrale du Larivot Logo"
              width={200}
              height={80}
              className="h-14 md:h-20 w-auto"
              priority
            />
          </motion.div>
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors pb-1 ${
                  isActive(link.href)
                    ? "text-edf-blue border-b-2 border-edf-orange"
                    : "text-gray-700 hover:text-edf-blue"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Bouton Admin - visible uniquement si connecté */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 bg-edf-blue text-white text-sm font-medium hover:bg-edf-blue-light transition-colors"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            </motion.div>
          )}
        </nav>

        {/* Bouton menu mobile */}
        <button
          ref={hamburgerRef}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-gray-700 transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-gray-700 transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-gray-700 transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <motion.nav
          ref={menuRef}
          id="mobile-menu"
          role="navigation"
          aria-label="Menu principal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-[72px] md:top-[100px] left-0 right-0 bg-edf-blue shadow-lg"
        >
          <div className="py-4">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`block px-6 py-3 text-white transition-colors ${
                    isActive(link.href) ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Bouton Admin mobile - visible uniquement si connecté */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
              >
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-6 py-3 text-white bg-edf-orange hover:bg-edf-orange-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Administration
                </Link>
              </motion.div>
            )}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
