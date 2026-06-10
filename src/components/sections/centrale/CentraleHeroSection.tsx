import PageHero from "@/components/ui/PageHero";

/**
 * Hero de la page Centrale — registre institutionnel/technique :
 * camaïeu BLEU (le vert est réservé au registre environnemental).
 */
export default function CentraleHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="La Centrale"
      eyebrow="Infrastructure énergétique"
      title="La Centrale"
      subtitle="Une infrastructure moderne et fiable"
      accentWord="moderne"
      description="Pour assurer la continuité de l'approvisionnement en électricité sur le territoire et soutenir la croissance démographique et économique en Guyane."
      camaieu="bleu"
    />
  );
}
