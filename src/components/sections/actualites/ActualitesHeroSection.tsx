import PageHero from "@/components/ui/PageHero";

/**
 * Hero de la page Actualités — registre vivant/événementiel :
 * camaïeu ORANGE CLAIR (effet lumineux, texte Bleu Nuit).
 */
export default function ActualitesHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Actualités"
      eyebrow="Actualités & Événements"
      title="Actualités"
      subtitle="Le projet au fil des mois"
      accentWord="au fil des mois"
      description="Avancées du chantier, rendez-vous et temps forts : suivez la vie de la Centrale Bioénergie du Larivot."
      camaieu="orange-clair"
    />
  );
}
