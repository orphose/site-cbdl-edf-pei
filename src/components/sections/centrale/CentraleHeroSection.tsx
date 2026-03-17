import PageHero from "@/components/ui/PageHero";

export default function CentraleHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="La Centrale"
      badge="Infrastructure Énergétique"
      title={<>La <span className="text-white">Centrale</span></>}
      subtitle={
        <>
          Une infrastructure{" "}
          <span className="text-edf-green-bright font-semibold">moderne</span> et{" "}
          <span className="text-edf-orange-bright font-semibold">fiable</span>
        </>
      }
      description="Pour assurer la continuité de l'approvisionnement en électricité sur le territoire et soutenir ainsi la croissance démographique et économique en Guyane."
    />
  );
}
