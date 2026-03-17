import PageHero from "@/components/ui/PageHero";

export default function AboutHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="À propos"
      badge="Notre identité"
      title="À propos"
      subtitle={
        <>
          Producteur d&apos;électricité{" "}
          <span className="text-edf-orange-bright font-semibold">insulaire</span>{" "}
          <span className="text-edf-green-bright font-semibold">responsable</span>
        </>
      }
      description={
        <>
          <span className="text-white font-semibold">EDF PEI</span>, filiale à 100% du groupe EDF,
          conçoit, construit et exploite des centrales électriques de{" "}
          <span className="text-edf-orange-bright">dernière génération</span>{" "}
          dans les régions d&apos;outre-mer et en Corse. Ces territoires non interconnectés
          au réseau métropolitain doivent disposer de leurs propres capacités de production
          pour garantir leur approvisionnement électrique.
        </>
      }
    />
  );
}
