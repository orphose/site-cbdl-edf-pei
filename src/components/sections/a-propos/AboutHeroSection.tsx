import PageHero from "@/components/ui/PageHero";

export default function AboutHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="À propos"
      badge="Notre identité"
      title="À propos"
      subtitle="Producteur d'électricité insulaire responsable"
      accentWord="responsable"
      description="EDF PEI, filiale à 100% du groupe EDF, conçoit, construit et exploite des centrales électriques de dernière génération dans les régions d'outre-mer et en Corse."
      camaieu="bleu"
    />
  );
}
