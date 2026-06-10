import PageHero from "@/components/ui/PageHero";

/**
 * Hero de la page Chantier — registre construction/énergie humaine :
 * camaïeu ORANGE (un camaïeu directeur par page).
 */
export default function ChantierHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Le Chantier"
      eyebrow="Construction & Emploi"
      title="Le Chantier"
      subtitle="Un projet à la hauteur du territoire"
      accentWord="territoire"
      description="Plus qu'une infrastructure énergétique, un projet d'avenir porté par les savoir-faire guyanais, pour un territoire en pleine croissance."
      camaieu="orange"
    />
  );
}
