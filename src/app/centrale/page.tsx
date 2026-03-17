/**
 * Page Centrale - Centrale Bioénergie du Larivot
 * 
 * Structure:
 * 1. CentraleHeroSection - Hero avec titre "LA CENTRALE"
 * 2. CentraleWhySection - POURQUOI - Un projet clé pour le territoire
 * 3. CentraleDescriptionSection - DESCRIPTION - Électricité 100% renouvelable
 * 4. CentraleEmpriseSection - EMPRISE - Une emprise au sol limitée
 * 5. CentraleBirthSection - NAISSANCE DU PROJET - Concertation publique + galerie
 */

import {
  CentraleHeroSection,
  CentraleWhySection,
  CentraleDescriptionSection,
  CentraleEmpriseSection,
  CentraleBirthSection,
} from "@/components/sections/centrale";

export default function CentralePage() {
  return (
    <>
      {/* Section 1: Hero - LA CENTRALE */}
      <CentraleHeroSection />

      {/* Section 2: POURQUOI - Un projet clé pour le territoire */}
      <CentraleWhySection />

      {/* Section 3: DESCRIPTION - Électricité 100% renouvelable */}
      <CentraleDescriptionSection />

      {/* Section 4: EMPRISE - Une emprise au sol limitée */}
      <CentraleEmpriseSection />

      {/* Section 5: NAISSANCE DU PROJET - Concertation publique */}
      <CentraleBirthSection />
    </>
  );
}
