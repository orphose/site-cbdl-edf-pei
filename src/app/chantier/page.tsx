/**
 * Page Chantier — registre industriel/institutionnel (camaïeu bleu).
 *
 * Structure et alternance des fonds :
 * 1. ChantierHeroSection — hero "LE CHANTIER" (dégradé bleu)
 * 2. ChantierConsortiumSection — CONSORTIUM, partenariat local (blanc)
 * 3. ChantierEconomicSection — RETOMBÉES ÉCONOMIQUES (blanc bleuté)
 * 4. ChantierEnvironmentSection — ENVIRONNEMENT, touches de vert (blanc)
 * 5. ChantierSecuritySection — SÉCURITÉ, moment fort (bleu foncé + glow)
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
