/**
 * Constantes partagees du site CBDL EDF PEI
 * Source unique pour les donnees utilisees dans plusieurs composants
 */

export const NAV_LINKS = [
  { name: "Accueil", href: "/" },
  { name: "Centrale", href: "/centrale" },
  { name: "Bénéfices", href: "/benefices" },
  { name: "Chantier", href: "/chantier" },
  { name: "Actualités", href: "/actualites" },
  { name: "À propos", href: "/a-propos" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { name: "Presse", href: "/presse" },
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Politique de confidentialité", href: "/confidentialite" },
] as const;

export const PROJECT_STATS = {
  power: { value: "120", unit: "MW", label: "Puissance générée" },
  engines: { value: "7", unit: "", label: "Moteurs nouvelle génération" },
  co2: { value: "500K", unit: "t", label: "CO₂ évitées par an" },
  renewable: { value: "100%", unit: "", label: "Énergie renouvelable" },
  investment: { value: "600", unit: "M€", label: "Investissement total" },
  jobs: { value: "500+", unit: "", label: "Emplois créés" },
  construction: { value: "3", unit: "ans", label: "De construction" },
  commissioning: { value: "2026", unit: "", label: "Mise en service" },
} as const;

export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que la biomasse ?",
    answer:
      "La biomasse désigne l'ensemble des matières organiques d'origine végétale ou animale pouvant être transformées en énergie. Dans le cas de la Centrale Bioénergie du Larivot, il s'agit principalement de bois issu de la gestion durable des forêts guyanaises et de résidus agricoles.",
  },
  {
    question: "La centrale va-t-elle polluer ?",
    answer:
      "La centrale est conçue pour respecter les normes environnementales les plus strictes. Elle utilise des technologies de filtration avancées pour réduire les émissions. De plus, le bilan carbone de la biomasse est considéré comme neutre, car le CO₂ émis lors de la combustion est compensé par le CO₂ absorbé lors de la croissance des végétaux.",
  },
  {
    question: "Quels bénéfices pour les habitants ?",
    answer:
      "Le projet génère des emplois locaux durables (environ 80 emplois directs et 200 indirects), contribue à la sécurité énergétique de la Guyane, et participe à la transition vers les énergies renouvelables. Il favorise également le développement de la filière bois locale.",
  },
  {
    question: "Quand la centrale sera-t-elle opérationnelle ?",
    answer:
      "La mise en service de la Centrale Bioénergie du Larivot est prévue pour accompagner la croissance des besoins énergétiques de la Guyane. Les différentes phases de construction suivent un calendrier rigoureux pour garantir une livraison dans les délais prévus.",
  },
  {
    question: "Comment le site naturel est-il préservé ?",
    answer:
      "EDF PEI a mis en place un programme de sanctuarisation environnementale qui protège les écosystèmes locaux. Des mesures compensatoires incluent la préservation de zones humides, le suivi de la faune et de la flore, et la création de corridors écologiques.",
  },
] as const;
