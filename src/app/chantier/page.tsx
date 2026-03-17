/**
 * Page Chantier - Centrale Bioénergie du Larivot
 * 
 * Structure:
 * 1. ChantierHeroSection - Hero "LE CHANTIER"
 * 2. ChantierConsortiumSection - CONSORTIUM - Partenariat local
 * 3. ChantierEconomicSection - RETOMBÉES ÉCONOMIQUES
 * 4. ChantierEnvironmentSection - ENVIRONNEMENT - Chantier écoresponsable
 * 5. ChantierSecuritySection - SÉCURITÉ - Priorité absolue
 */

import {
  ChantierHeroSection,
  ChantierConsortiumSection,
  ChantierEconomicSection,
  ChantierEnvironmentSection,
  ChantierSecuritySection,
} from "@/components/sections/chantier";

export default function ChantierPage() {
  return (
    <>
      {/* Section 1: Hero - LE CHANTIER */}
      <ChantierHeroSection />

      {/* Section 2: CONSORTIUM - Engagement entreprises guyanaises */}
      <ChantierConsortiumSection />

      {/* Section 3: RETOMBÉES ÉCONOMIQUES */}
      <ChantierEconomicSection />

      {/* Section 4: ENVIRONNEMENT - Chantier respectueux */}
      <ChantierEnvironmentSection />

      {/* Section 5: SÉCURITÉ - Priorité absolue */}
      <ChantierSecuritySection />
    </>
  );
}

