import {
  BeneficesHeroSection,
  BeneficesWaterSection,
  BeneficesAirQualitySection,
  BeneficesERCSection,
} from "@/components/sections/benefices";

/**
 * Page Bénéfices
 * Présente les avantages environnementaux de la centrale
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

