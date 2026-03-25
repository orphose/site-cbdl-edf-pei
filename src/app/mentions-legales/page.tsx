import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales | CBDL EDF PEI",
  description: "Mentions légales du site de la Centrale Bioénergie du Larivot.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Mentions légales"
        badge="Informations juridiques"
        title="Mentions légales"
        subtitle="Informations réglementaires"
        description="Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
      />

      <section className="section-padding bg-white">
        <div className="container-custom prose-readable">
          <h2 className="heading-md text-edf-bleu-nuit mb-6">Éditeur du site</h2>
          <p className="text-edf-gris-fonce mb-4">
            EDF PEI (Production Électrique Insulaire)<br />
            Filiale à 100% du groupe EDF<br />
            20 Place de La Défense<br />
            92050 Paris La Défense Cedex
          </p>
          <p className="text-edf-gris-fonce mb-8">
            Directeur de la publication : Direction Générale EDF PEI
          </p>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Hébergement</h2>
          <p className="text-edf-gris-fonce mb-8">
            Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Propriété intellectuelle</h2>
          <p className="text-edf-gris-fonce mb-8">
            L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est protégé
            par le droit d&apos;auteur et le droit des marques. Toute reproduction, représentation,
            modification, publication ou adaptation de tout ou partie des éléments du site est
            interdite sans autorisation préalable écrite d&apos;EDF PEI.
          </p>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Données personnelles</h2>
          <p className="text-edf-gris-fonce mb-8">
            Pour toute question relative à la protection de vos données personnelles,
            veuillez consulter notre{" "}
            <a href="/confidentialite" className="text-edf-bleu-action hover:underline">
              politique de confidentialité
            </a>.
          </p>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Crédits</h2>
          <p className="text-edf-gris-fonce mb-4">
            Conception et développement : orphose.studio
          </p>
          <p className="text-edf-gris-fonce">
            Photographies et modélisations 3D : EDF PEI
          </p>
        </div>
      </section>
    </>
  );
}
