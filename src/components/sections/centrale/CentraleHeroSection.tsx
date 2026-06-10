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
      description="120 MW de puissance garantie pour sécuriser l'alimentation électrique du territoire et accompagner la croissance de la Guyane."
      camaieu="bleu"
    />
  );
}
