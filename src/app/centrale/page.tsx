/**
 * Page Centrale - Centrale Bioénergie du Larivot
 *
 * Structure (alternance des fonds — voir DESIGN_SYSTEM.md) :
 * 1. CentraleHeroSection - PageHero camaïeu bleu (registre institutionnel)
 * 2. CentraleWhySection - POURQUOI - fond blanc, accents bleus
 * 3. CentraleDescriptionSection - DESCRIPTION - moment fort : fond bleu foncé
 *    + effet lumineux, touches de vert (registre renouvelable)
 * 4. CentraleEmpriseSection - EMPRISE - fond blanc, touches de vert
 *    (registre environnemental)
 * 5. CentraleBirthSection - NAISSANCE DU PROJET - fond blanc bleuté,
 *    accents bleus + galerie photos
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
