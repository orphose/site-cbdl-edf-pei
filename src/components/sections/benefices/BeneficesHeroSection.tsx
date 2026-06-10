import PageHero from "@/components/ui/PageHero";

/**
 * Hero de la page Bénéfices — seule page du site au camaïeu VERT
 * (registre environnemental, charte p.17 : bleu + touches de vert).
 */
export default function BeneficesHeroSection() {
  return (
    <PageHero
      breadcrumbLabel="Bénéfices"
      eyebrow="Environnement & Développement durable"
      title="Bénéfices"
      subtitle="Au cœur des défis du péyi Guyane"
      accentWord="péyi"
      description="Une démarche écoresponsable : réduction de la consommation d'eau et amélioration de la qualité de l'air."
      camaieu="vert"
    />
  );
}
