import PageHero from "@/components/ui/PageHero";

/**
 * Hero de la page Chantier — registre industriel/institutionnel,
 * camaïeu bleu directeur (charte EDF 2021).
 */
export default function ChantierHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Le Chantier"
      eyebrow="Construction & Emploi"
      title="Le Chantier"
      subtitle="Un projet à la hauteur du territoire"
      accentWord="territoire"
      description="Plus qu'une infrastructure énergétique, la future centrale bioénergie du Larivot est un projet d'avenir pour un territoire en pleine croissance économique."
      camaieu="bleu"
    />
  );
}
