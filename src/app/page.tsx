/**
 * Page d'accueil - Centrale Bioénergie du Larivot
 * 
 * Structure:
 * 1. HeroSection - Titre principal et vidéo
 * 2. PresentationSection - 100% renouvelable, 3 cards
 * 3. BenefitsSection - 4 bénéfices clés
 * 4. AirQualitySection - Qualité de l'air + vidéo
 * 5. TimelineSection - Étapes de construction
 * 6. PreservationSection - Biodiversité + stats
 * 7. PartnershipsSection - Partenariats locaux (carousel)
 * 8. NewsSection - Actualités
 * 9. LocationSection - Carte de localisation
 */

import {
  HeroSection,
  PresentationSection,
  BenefitsSection,
  AirQualitySection,
  TimelineSection,
  PreservationSection,
  PartnershipsSection,
  NewsSection,
  LocationSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero avec vidéo */}
      <HeroSection />

      {/* Section 2: Présentation centrale 100% renouvelable */}
      <PresentationSection />

      {/* Section 3: Bénéfices */}
      <BenefitsSection />

      {/* Section 4: Qualité de l'air */}
      <AirQualitySection />

      {/* Section 5: Timeline de construction */}
      <TimelineSection />

      {/* Section 6: Préservation environnement */}
      <PreservationSection />

      {/* Section 7: Partenariats locaux */}
      <PartnershipsSection />

      {/* Section 8: Actualités */}
      <NewsSection />

      {/* Section 9: Localisation */}
      <LocationSection />
    </>
  );
}
