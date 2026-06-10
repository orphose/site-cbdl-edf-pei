import type { Metadata } from "next";
import { Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Espace Presse | CBDL EDF PEI",
  description: "Espace presse de la Centrale Bioénergie du Larivot — Contacts et ressources médias.",
};

/** Chiffres clés du projet — contenu éditorial conservé à l'identique. */
const PROJET_EN_BREF = [
  "Puissance installée : 120 MW",
  "7 moteurs de nouvelle génération",
  "500 000 tonnes de CO2 évitées par an",
  "Plus de 500 emplois directs et indirects",
  "Investissement de plus de 600 millions d'euros",
];

/**
 * Espace Presse — camaïeu bleu (registre institutionnel).
 * Contact presse en carte (.card-edf) sur fond blanc, puis bloc
 * secondaire « Le projet en bref » sur fond blanc bleuté (alternance).
 */
export default function PressePage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Presse"
        eyebrow="Espace médias"
        title="Espace Presse"
        subtitle="Ressources et contacts médias"
        accentWord="contacts médias"
        description="Retrouvez les informations et contacts dédiés aux journalistes et professionnels des médias."
        camaieu="bleu"
      />

      {/* Contact presse — une seule couleur d'icône par section (bleu) */}
      <section className="section bg-white" aria-labelledby="presse-contact-heading">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 id="presse-contact-heading" className="heading-3 text-edf-bleu-nuit mb-3">
              Contact presse
            </h2>
            <p className="text-edf-bleu-nuit/75 leading-relaxed">
              Pour toute demande d&apos;information, interview ou demande de visuels,
              veuillez contacter le service communication d&apos;EDF PEI.
            </p>

            <div className="card-edf p-7 mt-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <span className="icon-square" aria-hidden="true">
                  <Mail className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="heading-4 text-edf-bleu-nuit mb-2">
                    Service Communication EDF PEI
                  </h3>
                  <p className="text-edf-bleu-nuit/75 leading-relaxed mb-2">
                    Pour les demandes presse relatives à la Centrale Bioénergie du Larivot :
                  </p>
                  <a
                    href="mailto:centraledularivot@edf.fr"
                    className="inline-flex items-center min-h-11 text-edf-bleu-action font-semibold underline underline-offset-4 transition-colors hover:text-edf-blue"
                  >
                    centraledularivot@edf.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le projet en bref — bloc secondaire, alternance blanc bleuté */}
      <section className="section section-alt" aria-labelledby="presse-projet-heading">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 id="presse-projet-heading" className="heading-3 text-edf-bleu-nuit mb-3">
              Le projet en bref
            </h2>
            <p className="text-edf-bleu-nuit/75 leading-relaxed">
              La Centrale Bioénergie du Larivot est un projet clé pour la transition
              énergétique de la Guyane. Elle permettra de produire une électricité
              100% renouvelable grâce à la biomasse liquide.
            </p>
            <ul role="list" className="space-y-3 mt-6">
              {PROJET_EN_BREF.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-edf-bleu-nuit/75 leading-relaxed"
                >
                  {/* Puce carrée — rappel du cartouche EDF */}
                  <span className="w-2 h-2 mt-2.5 shrink-0 bg-edf-bleu-action" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
