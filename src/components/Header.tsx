"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { IMAGES } from "@/lib/media";
import { createClient } from "@/utils/supabase/client";

/**
 * Liens de navigation du site
 */
const NAV_LINKS = [
  { name: "Accueil", href: "/" },
  { name: "Centrale", href: "/centrale" },
  { name: "Bénéfices", href: "/benefices" },
  { name: "Chantier", href: "/chantier" },
  { name: "Actualités", href: "/actualites" },
  { name: "À propos", href: "/a-propos" },
];

/**
 * Header/Navigation du site
 * Header personnalisé sans NextUI pour un contrôle total de la hauteur
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[100px]">
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
              className="h-20 w-auto"
              priority
            />
          </motion.div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-edf-blue transition-colors"
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
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-[100px] left-0 right-0 bg-edf-blue shadow-lg"
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
                  className="block px-6 py-3 text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
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
