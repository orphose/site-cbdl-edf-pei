import PageHero from "@/components/ui/PageHero";

export default function ChantierHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Le Chantier"
      badge="Construction & Emploi"
      title="Le Chantier"
      subtitle={
        <>
          Un projet à la{" "}
          <span className="text-edf-orange-bright font-semibold">hauteur</span>{" "}
          du{" "}
          <span className="text-edf-green-bright font-semibold">territoire</span>
        </>
      }
      description={
        <>
          Plus qu&apos;une infrastructure énergétique, la future centrale
          bioénergie du Larivot est un{" "}
          <span className="text-white font-semibold">projet d&apos;avenir</span>{" "}
          pour un territoire en pleine croissance économique et un vecteur
          d&apos;emplois durables.
        </>
      }
    />
  );
}
