/**
 * Page d'accueil - Centrale Bioénergie du Larivot
 *
 * Composition (alternance blanc / blanc bleuté, un seul moment sombre) :
 * 1. HeroSection          — blanc, message + vidéo signée cartouche
 * 2. PresentationSection  — blanc, 3 cards + chiffres clés
 * 3. BenefitsSection      — blanc bleuté, 4 bénéfices
 * 4. AirQualitySection    — bleu foncé + effet lumineux (moment fort)
 * 5. TimelineSection      — blanc, étapes de construction
 * 6. PreservationSection  — blanc bleuté, biodiversité (touches vertes)
 * 7. PartnershipsSection  — blanc, carousel partenariats
 * 8. NewsSection          — blanc bleuté, actualités
 * 9. InfoSection          — blanc, FAQ + localisation
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
    </>
  );
}
