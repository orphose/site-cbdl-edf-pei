import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité | CBDL EDF PEI",
  description:
    "Déclaration d'accessibilité du site de la Centrale Bioénergie du Larivot, établie conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.",
};

/**
 * Déclaration d'accessibilité (RGAA) — camaïeu bleu, mise en page sobre
 * sur le gabarit des pages légales : colonne de lecture max-w-3xl,
 * sous-sections en heading-3 espacées.
 */
export default function AccessibilitePage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Accessibilité"
        eyebrow="Engagement"
        title="Déclaration d'accessibilité"
        subtitle="Un site accessible à tous"
        description="EDF PEI s'engage à rendre son site internet accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005."
        camaieu="bleu"
      />

      <div className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-lead text-edf-bleu-nuit/75 leading-relaxed">
              À cette fin, EDF PEI met en œuvre la stratégie et les actions
              suivantes : élaboration d&apos;un schéma pluriannuel de mise en
              accessibilité et d&apos;un plan d&apos;actions annuel, qui seront
              publiés prochainement.
            </p>
            <p className="text-edf-bleu-nuit/75 leading-relaxed mt-4">
              Cette déclaration d&apos;accessibilité s&apos;applique au site{" "}
              <strong className="font-semibold">centraledularivot.fr</strong>.
            </p>

            <section aria-labelledby="accessibilite-conformite-heading">
              <h2
                id="accessibilite-conformite-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                État de conformité
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                centraledularivot.fr est{" "}
                <strong className="font-semibold">non conforme</strong> avec le
                Référentiel Général d&apos;Amélioration de l&apos;Accessibilité
                (RGAA), version 4.1.2, à défaut d&apos;avoir réalisé un audit de
                conformité. Un audit est planifié et ses résultats seront
                publiés dès qu&apos;ils seront disponibles.
              </p>
            </section>

            <section aria-labelledby="accessibilite-etablissement-heading">
              <h2
                id="accessibilite-etablissement-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Établissement de cette déclaration d&apos;accessibilité
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Cette déclaration a été établie le 28 mai 2026.
              </p>
            </section>

            <section aria-labelledby="accessibilite-contact-heading">
              <h2
                id="accessibilite-contact-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Retour d&apos;information et contact
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Si vous n&apos;arrivez pas à accéder à un contenu ou à un
                service, vous pouvez contacter le responsable du site pour être
                orienté vers une alternative accessible ou obtenir le contenu
                sous une autre forme.
              </p>
              <p className="text-edf-bleu-nuit/75 leading-relaxed mt-4">
                Adresse e-mail :{" "}
                <a
                  href="mailto:centraledularivot@edf.fr"
                  className="text-edf-bleu-action underline underline-offset-4 transition-colors hover:text-edf-blue"
                >
                  centraledularivot@edf.fr
                </a>
              </p>
            </section>

            <section aria-labelledby="accessibilite-recours-heading">
              <h2
                id="accessibilite-recours-heading"
                className="heading-3 text-edf-bleu-nuit mt-10 mb-3"
              >
                Voies de recours
              </h2>
              <p className="text-edf-bleu-nuit/75 leading-relaxed">
                Cette procédure est à utiliser dans le cas suivant : vous avez
                signalé au responsable du site un défaut d&apos;accessibilité
                qui vous empêche d&apos;accéder à un contenu ou à l&apos;un des
                services et vous n&apos;avez pas obtenu de réponse
                satisfaisante.
              </p>
              <p className="text-edf-bleu-nuit/75 leading-relaxed mt-4">
                Plusieurs moyens sont à votre disposition :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-edf-bleu-nuit/75 leading-relaxed">
                <li>
                  <a
                    href="https://formulaire.defenseurdesdroits.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-edf-bleu-action underline underline-offset-4 transition-colors hover:text-edf-blue"
                  >
                    Écrire un message au Défenseur des droits
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.defenseurdesdroits.fr/carte-des-delegues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-edf-bleu-action underline underline-offset-4 transition-colors hover:text-edf-blue"
                  >
                    Contacter le délégué du Défenseur des droits dans votre
                    région
                  </a>
                </li>
                <li>
                  Envoyer un courrier par la poste (gratuit, ne pas mettre de
                  timbre) à&nbsp;:
                  <br />
                  Défenseur des droits
                  <br />
                  Libre réponse 71120
                  <br />
                  75342 Paris CEDEX 07
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
