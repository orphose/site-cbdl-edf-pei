import {
  AboutHeroSection,
  AboutTransitionSection,
  AboutExpertiseSection,
  AboutIndustrySection,
} from "@/components/sections/a-propos";

/**
 * Page À propos - EDF PEI
 * Présente l'entreprise, sa mission et son expertise
 * 
 * Structure:
 * 1. AboutHeroSection - Introduction EDF PEI
 * 2. AboutTransitionSection - Mission + chiffres clés
 * 3. AboutExpertiseSection - Expertise territoriale
 * 4. AboutIndustrySection - Excellence industrielle
 */
export default function AProposPage() {
  return (
    <>
      {/* Section 1: Hero - Producteur responsable */}
      <AboutHeroSection />

      {/* Section 2: Transition énergétique + statistiques */}
      <AboutTransitionSection />

      {/* Section 3: Expertise - Atout pour les territoires */}
      <AboutExpertiseSection />

      {/* Section 4: Excellence industrielle */}
      <AboutIndustrySection />
    </>
  );
}
