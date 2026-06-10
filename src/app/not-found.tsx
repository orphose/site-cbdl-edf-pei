import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable | Centrale Bioénergie du Larivot",
};

/**
 * Page 404 globale — sobre, conforme au design system.
 */
export default function NotFound() {
  return (
    <section className="section bg-white pt-32 md:pt-40">
      <div className="container-custom text-center">
        <p className="eyebrow justify-center mb-5">Erreur 404</p>
        <h1 className="heading-1 text-edf-blue">Page introuvable</h1>
        <p className="text-lead text-edf-bleu-nuit/75 max-w-xl mx-auto mt-5">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retrouvez toutes les informations sur le projet depuis l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
          <Link href="/" className="btn btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/actualites" className="btn btn-secondary">
            Voir les actualités
          </Link>
        </div>
      </div>
    </section>
  );
}
