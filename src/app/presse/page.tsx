import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Espace Presse | CBDL EDF PEI",
  description: "Espace presse de la Centrale Bioénergie du Larivot — Contacts et ressources médias.",
};

export default function PressePage() {
  return (
    <>
      <PageHero
        breadcrumbLabel="Presse"
        badge="Espace médias"
        title="Espace Presse"
        subtitle="Ressources et contacts médias"
        description="Retrouvez les informations et contacts dédiés aux journalistes et professionnels des médias."
        accentColor="orange"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="heading-md text-edf-bleu-nuit mb-6">Contact presse</h2>
            <p className="text-edf-gris-fonce mb-8">
              Pour toute demande d&apos;information, interview ou demande de visuels,
              veuillez contacter le service communication d&apos;EDF PEI.
            </p>

            <div className="bg-edf-blanc-bleute p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-edf-blue flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-edf-bleu-nuit mb-2">
                    Service Communication EDF PEI
                  </h3>
                  <p className="text-edf-gris-fonce mb-2">
                    Pour les demandes presse relatives à la Centrale Bioénergie du Larivot :
                  </p>
                  <a
                    href="mailto:centraledularivot@edf.fr"
                    className="text-edf-bleu-action hover:underline font-medium"
                  >
                    centraledularivot@edf.fr
                  </a>
                </div>
              </div>
            </div>

            <h2 className="heading-md text-edf-bleu-nuit mb-6">Le projet en bref</h2>
            <p className="text-edf-gris-fonce mb-4">
              La Centrale Bioénergie du Larivot est un projet clé pour la transition
              énergétique de la Guyane. Elle permettra de produire une électricité
              100% renouvelable grâce à la biomasse liquide.
            </p>
            <ul className="list-disc list-inside text-edf-gris-fonce space-y-2">
              <li>Puissance installée : 120 MW</li>
              <li>7 moteurs de nouvelle génération</li>
              <li>500 000 tonnes de CO2 évitées par an</li>
              <li>Plus de 500 emplois directs et indirects</li>
              <li>Investissement de plus de 600 millions d&apos;euros</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
