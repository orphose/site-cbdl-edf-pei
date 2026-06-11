import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@/providers/NextUIProvider";
import SiteShell from "@/components/SiteShell";

/**
 * Polices de caractères
 * Work Sans: police complémentaire EDF pour le B2C (Google Font libre)
 * Conforme charte EDF 2021 — alternative à EDF 2020 (propriétaire)
 * Graisses 400+ uniquement (lisibilité UI)
 */
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Base de résolution des URLs absolues des métadonnées (og:image…).
 * Production : NEXT_PUBLIC_SITE_URL ; previews Vercel : URL du déploiement.
 */
const METADATA_BASE = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");

/**
 * Métadonnées du site
 */
export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Centrale Bioénergie du Larivot | EDF PEI",
  description:
    "La Centrale Bioénergie du Larivot en Guyane - Une énergie verte et garantie pour accompagner la transition énergétique vers le 100% renouvelable.",
  keywords: [
    "EDF PEI",
    "Centrale du Larivot",
    "Guyane",
    "Énergie renouvelable",
    "Bioénergie",
    "Biomasse",
    "Cayenne",
    "Transition énergétique",
  ],
  authors: [{ name: "EDF PEI" }],
  openGraph: {
    title: "Centrale Bioénergie du Larivot | EDF PEI",
    description:
      "Une énergie verte et garantie pour la Guyane. Le projet qui fera franchir au territoire une étape décisive vers le 100 % énergie renouvelable.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Centrale Bioénergie du Larivot",
    images: [
      {
        url: "/images/site/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vue aérienne de la Centrale Bioénergie du Larivot — EDF PEI, Guyane française",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centrale Bioénergie du Larivot | EDF PEI",
    description:
      "Une énergie verte et garantie pour la Guyane. Vers le 100 % énergie renouvelable.",
    images: ["/images/site/og-image.jpg"],
  },
};

/**
 * Layout principal de l'application
 * Inclut le Header, le contenu principal et le Footer
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${workSans.variable} antialiased`}
      >
        <NextUIProvider>
          <SiteShell>{children}</SiteShell>
        </NextUIProvider>
      </body>
    </html>
  );
}
