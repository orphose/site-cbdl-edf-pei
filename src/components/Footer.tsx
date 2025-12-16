"use client";

import { Link } from "@nextui-org/react";
import { Mail, MapPin, ExternalLink, Phone, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/media";

/**
 * Liens du footer organisés par catégorie
 */
const FOOTER_LINKS = {
  pages: [
    { name: "Accueil", href: "/" },
    { name: "Centrale", href: "/centrale" },
    { name: "Bénéfices", href: "/benefices" },
    { name: "Chantier", href: "/chantier" },
    { name: "Actualités", href: "/actualites" },
    { name: "À propos", href: "/a-propos" },
  ],
  legal: [
    { name: "Presse", href: "/presse" },
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
  ],
};

const SOCIAL_LINKS = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/edf" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/EDFofficiel" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/user/EDFCommunityManagem" },
];

/**
 * Footer du site
 * Design moderne et épuré avec informations de contact EDF PEI
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-edf-blue text-white overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-edf-orange/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-8 lg:px-12 py-20">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Colonne Logo et Contact - 5 colonnes */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="mb-8">
                <Image
                  src={IMAGES.logo.blanc}
                  alt="EDF PEI"
                  width={180}
                  height={70}
                  className="h-14 w-auto object-contain mb-4"
                />
                <p className="text-white/70 text-lg font-light">
                  Centrale Bioénergie du Larivot
                </p>
                <p className="text-white/50 text-sm mt-2 max-w-sm">
                  Un projet clé pour la transition énergétique de la Guyane vers le 100% renouvelable.
                </p>
              </div>

              {/* Informations de contact */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-edf-orange/20 transition-colors">
                    <MapPin className="w-5 h-5 text-edf-orange" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Adresse</p>
                    <p className="text-white/60 text-sm">
                      20 PL de La Défense<br />
                      92050 Paris, Cedex 42
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-edf-orange/20 transition-colors">
                    <Mail className="w-5 h-5 text-edf-orange" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Email</p>
                    <Link
                      href="mailto:centraledularivot@edf.fr"
                      className="text-white/60 text-sm hover:text-edf-orange transition-colors"
                    >
                      centraledularivot@edf.fr
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-edf-orange/20 transition-colors">
                    <Phone className="w-5 h-5 text-edf-orange" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Téléphone</p>
                    <Link
                      href="tel:+33123456789"
                      className="text-white/60 text-sm hover:text-edf-orange transition-colors"
                    >
                      +33 1 23 45 67 89
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne Pages - 3 colonnes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Pages
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-edf-orange" />
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.pages.map((link, index) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-edf-orange group-hover:w-3 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Légal & Groupe EDF - 4 colonnes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Informations
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-edf-orange" />
            </h4>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-edf-orange group-hover:w-3 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Lien Groupe EDF */}
            <div className="p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Link
                href="https://www.edf.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-white group"
              >
                <div>
                  <p className="font-medium text-sm">Groupe EDF</p>
                  <p className="text-white/50 text-xs">Découvrir le groupe</p>
                </div>
                <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-edf-orange transition-colors" />
              </Link>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <p className="text-sm text-white/60 mb-4">Suivez-nous</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-edf-orange transition-colors group"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Copyright et crédits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} EDF PEI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-white/40 text-xs">
            <span>Centrale Bioénergie du Larivot</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Guyane française</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">
              Site créé par{" "}
              <Link
                href="https://orphose.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-edf-orange transition-colors"
              >
                orphose.studio
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
