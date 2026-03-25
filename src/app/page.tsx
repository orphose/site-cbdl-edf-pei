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
 * 9. InfoSection - FAQ + Localisation
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
  InfoSection,
} from "@/components/sections";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="relative z-10">
        <PresentationSection />
        <BenefitsSection />
        <AirQualitySection />
        <TimelineSection />
        <PreservationSection />

        <ErrorBoundary>
          <PartnershipsSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <NewsSection />
        </ErrorBoundary>

        <InfoSection />
      </div>
    </>
  );
}
