import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité | CBDL EDF PEI",
  description: "Politique de confidentialité et de protection des données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Confidentialité"
        badge="Protection des données"
        title="Politique de confidentialité"
        subtitle="Protection de vos données personnelles"
        description="EDF PEI s'engage à protéger la vie privée des utilisateurs de ce site conformément au RGPD."
        accentColor="orange"
      />

      <section className="section-padding bg-white">
        <div className="container-custom prose-readable">
          <h2 className="heading-md text-edf-bleu-nuit mb-6">Responsable du traitement</h2>
          <p className="text-edf-gris-fonce mb-8">
            Le responsable du traitement des données personnelles est EDF PEI,
            filiale à 100% du groupe EDF, dont le siège social est situé au
            20 Place de La Défense, 92050 Paris La Défense Cedex.
          </p>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Données collectées</h2>
          <p className="text-edf-gris-fonce mb-4">
            Ce site ne collecte aucune donnée personnelle de manière directe.
            Les seules données techniques collectées sont :
          </p>
          <ul className="list-disc list-inside text-edf-gris-fonce mb-8 space-y-2">
            <li>Les données de navigation anonymisées (pages visitées, durée de visite)</li>
            <li>Les données techniques (type de navigateur, résolution d&apos;écran)</li>
          </ul>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Cookies</h2>
          <p className="text-edf-gris-fonce mb-8">
            Ce site utilise uniquement des cookies techniques nécessaires à son
            bon fonctionnement. Aucun cookie publicitaire ou de traçage n&apos;est utilisé.
          </p>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Vos droits</h2>
          <p className="text-edf-gris-fonce mb-4">
            Conformément au Règlement Général sur la Protection des Données (RGPD),
            vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside text-edf-gris-fonce mb-8 space-y-2">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition</li>
          </ul>

          <h2 className="heading-md text-edf-bleu-nuit mb-6">Contact</h2>
          <p className="text-edf-gris-fonce">
            Pour exercer vos droits ou pour toute question relative à la protection
            de vos données, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
            <a href="mailto:centraledularivot@edf.fr" className="text-edf-bleu-action hover:underline">
              centraledularivot@edf.fr
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
