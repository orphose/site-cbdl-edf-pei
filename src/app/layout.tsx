import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@/providers/NextUIProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Polices de caractères
 * Work Sans: police complémentaire EDF pour le B2C (Google Font libre)
 * Conforme charte EDF 2021 — alternative à EDF 2020 (propriétaire)
 */
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Métadonnées du site
 */
export const metadata: Metadata = {
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
      "Un projet clé qui permettra à la Guyane de franchir une étape significative vers le 100% énergie renouvelable.",
    type: "website",
    locale: "fr_FR",
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
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
