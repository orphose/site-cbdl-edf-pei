import PageHero from "@/components/ui/PageHero";

export default function BeneficesHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Bénéfices"
      badge="Environnement & Développement Durable"
      title="Bénéfices"
      subtitle={
        <>
          Au cœur des{" "}
          <span className="text-edf-orange-bright font-semibold">défis</span>{" "}
          du{" "}
          <span className="text-edf-green-bright font-semibold">péyi</span>{" "}
          Guyane
        </>
      }
      description={
        <>
          Une démarche{" "}
          <span className="text-white font-semibold">écoresponsable</span> :
          réduction de la consommation d&apos;eau et amélioration de la qualité de l&apos;air.
        </>
      }
      circleTopColor="green"
      accentColor="green"
    />
  );
}
