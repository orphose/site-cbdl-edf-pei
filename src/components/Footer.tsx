"use client";

import { Mail, MapPin, ExternalLink, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/media";
import { NAV_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/constants";

const SOCIAL_LINKS = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/edf" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/EDFofficiel" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/user/EDFCommunityManagem" },
];

/**
 * Footer du site.
 * Charte EDF : fond Bleu Foncé #001A70, texte blanc, logo EDF version blanche,
 * effet lumineux (halo blanc/bleu clair) en signature de marque.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark glow-effect">
      <div className="container-custom pt-16 md:pt-20 pb-10">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14">
          {/* Marque et contact */}
          <div className="lg:col-span-5">
            <Image
              src={IMAGES.logo.blanc}
              alt="EDF PEI"
              width={180}
              height={72}
              className="h-12 w-auto object-contain mb-5"
            />
            <p className="text-lg font-semibold">Centrale Bioénergie du Larivot</p>
            <p className="text-white/80 text-sm mt-2 mb-8 max-w-sm leading-relaxed">
              Un projet clé pour la transition énergétique de la Guyane vers le
              100&nbsp;% renouvelable.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="icon-square icon-square--light icon-square--sm" aria-hidden="true">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Adresse</p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    20 PL de La Défense
                    <br />
                    92050 Paris, Cedex 42
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="icon-square icon-square--light icon-square--sm" aria-hidden="true">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <a
                    href="mailto:centraledularivot@edf.fr"
                    className="text-white/80 text-sm underline-offset-4 hover:underline hover:text-white transition-colors"
                  >
                    centraledularivot@edf.fr
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-3" aria-label="Pied de page — pages du site">
            <h2 className="text-base font-semibold mb-5">Le projet</h2>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-11 py-2 text-sm text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informations et réseaux */}
          <div className="lg:col-span-4">
            <h2 className="text-base font-semibold mb-5">Informations</h2>
            <ul className="space-y-1 mb-8">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-11 py-2 text-sm text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Lien Groupe EDF */}
            <a
              href="https://www.edf.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-4 border border-white/20 hover:bg-white/10 transition-colors group"
            >
              <span>
                <span className="block font-semibold text-sm">Groupe EDF</span>
                <span className="block text-white/70 text-xs mt-0.5">
                  Découvrir le groupe — edf.fr
                </span>
              </span>
              <ExternalLink
                className="w-5 h-5 text-white/70 group-hover:text-white transition-colors shrink-0"
                aria-hidden="true"
              />
            </a>

            {/* Réseaux sociaux */}
            <p className="text-sm font-semibold mt-8 mb-3">Suivez-nous</p>
            <ul className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 border border-white/20 text-white/80 hover:bg-white hover:text-edf-blue transition-colors"
                      aria-label={`${social.name} (nouvelle fenêtre)`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Barre légale */}
        <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/70 text-sm">
            © {currentYear} EDF PEI. Tous droits réservés.
          </p>
          <p className="text-white/70 text-sm text-center md:text-right">
            Centrale Bioénergie du Larivot — Guyane française · Site créé par{" "}
            <a
              href="https://orphose.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              orphose.studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
