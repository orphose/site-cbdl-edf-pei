import PageHero from "@/components/ui/PageHero";

export default function ActualitesHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Actualités"
      badge="Actualités & Événements"
      title="ACTUALITÉS"
      accentColor="orange"
      subtitle={
        <>
          Toute l&apos;actualité du{" "}
          <span className="text-edf-orange-bright font-semibold">projet</span>{" "}
          <span className="text-edf-green-bright font-semibold">CBDL</span>
        </>
      }
      description={
        <>
          Suivez les{" "}
          <span className="text-white font-semibold">dernières avancées</span>{" "}
          de la Centrale Bioénergie du Larivot et restez informé des événements importants.
        </>
      }
    />
  );
}
