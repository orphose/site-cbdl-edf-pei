import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales | CBDL EDF PEI",
  description: "Mentions légales du site de la Centrale Bioénergie du Larivot.",
};

/**
 * Mentions légales — camaïeu bleu, mise en page sobre :
 * colonne de lecture max-w-3xl, sous-sections en heading-3 espacées.
 */
export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Mentions légales"
        eyebrow="Informations juridiques"
        title="Mentions légales"
        subtitle="Informations réglementaires"
        description="Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
        camaieu="bleu"
      />

      <div className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <section aria-labelledby="mentions-editeur-heading">
              <h2 id="mentions-editeur-heading" className="heading-3 text-edf-bleu-nuit mb-3">
                Éditeur du site
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                EDF PEI (Production Électrique Insulaire)<br />
                Filiale à 100% du groupe EDF<br />
                20 Place de La Défense<br />
                92050 Paris La Défense Cedex
              </p>
              <p className="text-edf-bleu-nuit/75 leading-relaxed mt-4">
                Directeur de la publication : Direction Générale EDF PEI
              </p>
            </section>

            <section aria-labelledby="mentions-hebergement-heading">
              <h2
                id="mentions-hebergement-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Hébergement
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              </p>
            </section>

            <section aria-labelledby="mentions-propriete-heading">
              <h2
                id="mentions-propriete-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Propriété intellectuelle
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est protégé
                par le droit d&apos;auteur et le droit des marques. Toute reproduction, représentation,
                modification, publication ou adaptation de tout ou partie des éléments du site est
                interdite sans autorisation préalable écrite d&apos;EDF PEI.
              </p>
            </section>

            <section aria-labelledby="mentions-donnees-heading">
              <h2
                id="mentions-donnees-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Données personnelles
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Pour toute question relative à la protection de vos données personnelles,
                veuillez consulter notre{" "}
                <Link
                  href="/confidentialite"
                  className="text-edf-bleu-action underline underline-offset-4 transition-colors hover:text-edf-blue"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="mentions-credits-heading">
              <h2
                id="mentions-credits-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Crédits
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Conception et développement : orphose.studio
              </p>
              <p className="text-edf-bleu-nuit/75 leading-relaxed mt-4">
                Photographies et modélisations 3D : EDF PEI
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
