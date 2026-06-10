import {
  BeneficesHeroSection,
  BeneficesWaterSection,
  BeneficesAirQualitySection,
  BeneficesERCSection,
} from "@/components/sections/benefices";

/**
 * Page Bénéfices — registre environnemental (camaïeu vert en touches).
 * Alternance des fonds : hero (dégradé vert) → blanc → blanc bleuté → blanc.
 */
export default function BeneficesPage() {
  return (
    <>
      <BeneficesHeroSection />
      <BeneficesWaterSection />
      <BeneficesAirQualitySection />
      <BeneficesERCSection />
    </>
  );
}
