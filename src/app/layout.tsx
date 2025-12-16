import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@/providers/NextUIProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Polices de caractères
 * Geist: police moderne et épurée inspirée de Vercel
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
