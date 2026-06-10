import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité | CBDL EDF PEI",
  description: "Politique de confidentialité et de protection des données personnelles.",
};

/** Contenu éditorial conservé à l'identique. */
const DONNEES_COLLECTEES = [
  "Les données de navigation anonymisées (pages visitées, durée de visite)",
  "Les données techniques (type de navigateur, résolution d'écran)",
];

const DROITS_RGPD = [
  "Droit d'accès à vos données personnelles",
  "Droit de rectification",
  "Droit à l'effacement",
  "Droit à la limitation du traitement",
  "Droit à la portabilité",
  "Droit d'opposition",
];

/**
 * Politique de confidentialité — camaïeu bleu, mise en page sobre :
 * colonne de lecture max-w-3xl, sous-sections en heading-3,
 * listes à puces carrées (rappel du cartouche EDF).
 */
export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Confidentialité"
        eyebrow="Protection des données"
        title="Politique de confidentialité"
        subtitle="Protection de vos données personnelles"
        description="EDF PEI s'engage à protéger la vie privée des utilisateurs de ce site conformément au RGPD."
        camaieu="bleu"
      />

      <div className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <section aria-labelledby="confidentialite-responsable-heading">
              <h2
                id="confidentialite-responsable-heading"
                className="heading-3 text-edf-bleu-nuit mb-3"
              >
                Responsable du traitement
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Le responsable du traitement des données personnelles est EDF PEI,
                filiale à 100% du groupe EDF, dont le siège social est situé au
                20 Place de La Défense, 92050 Paris La Défense Cedex.
              </p>
            </section>

            <section aria-labelledby="confidentialite-donnees-heading">
              <h2
                id="confidentialite-donnees-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Données collectées
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Ce site ne collecte aucune donnée personnelle de manière directe.
                Les seules données techniques collectées sont :
              </p>
              <ul role="list" className="space-y-3 mt-4">
                {DONNEES_COLLECTEES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-edf-bleu-nuit/75 leading-relaxed"
                  >
                    <span
                      className="w-2 h-2 mt-2.5 shrink-0 bg-edf-bleu-action"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="confidentialite-cookies-heading">
              <h2
                id="confidentialite-cookies-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Cookies
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Ce site utilise uniquement des cookies techniques nécessaires à son
                bon fonctionnement. Aucun cookie publicitaire ou de traçage n&apos;est utilisé.
              </p>
            </section>

            <section aria-labelledby="confidentialite-droits-heading">
              <h2
                id="confidentialite-droits-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Vos droits
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD),
                vous disposez des droits suivants :
              </p>
              <ul role="list" className="space-y-3 mt-4">
                {DROITS_RGPD.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-edf-bleu-nuit/75 leading-relaxed"
                  >
                    <span
                      className="w-2 h-2 mt-2.5 shrink-0 bg-edf-bleu-action"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="confidentialite-contact-heading">
              <h2
                id="confidentialite-contact-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Contact
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Pour exercer vos droits ou pour toute question relative à la protection
                de vos données, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
                <a
                  href="mailto:centraledularivot@edf.fr"
                  className="text-edf-bleu-action underline underline-offset-4 transition-colors hover:text-edf-blue"
                >
                  centraledularivot@edf.fr
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
