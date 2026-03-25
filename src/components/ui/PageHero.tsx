import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Camaïeu EDF — chaque page utilise un seul camaïeu.
 * Charte EDF 2021, p.19 : dégradés clair (haut-gauche) → foncé (bas-droite), angle 120deg.
 */
type Camaieu = "bleu" | "orange" | "vert";

/**
 * Dégradé CLAIR → FONCÉ au sein du même camaïeu (120deg).
 * Charte p.19 : "la couleur la plus claire en haut à gauche
 * vers la couleur la plus sombre en bas à droite"
 */
const GRADIENT_MAP: Record<Camaieu, string> = {
  bleu:   "linear-gradient(120deg, #1089FF 0%, #001A70 100%)",
  orange: "linear-gradient(120deg, #FFB210 0%, #FE5716 100%)",
  vert:   "linear-gradient(120deg, #88D910 0%, #4F9E30 100%)",
};

/** Barre accent en bas — tonalité claire + tonalité foncée du même camaïeu */
const ACCENT_BAR_MAP: Record<Camaieu, [string, string]> = {
  bleu:   ["bg-edf-blue-light", "bg-edf-blue"],
  orange: ["bg-edf-orange-light", "bg-edf-orange"],
  vert:   ["bg-edf-green-light", "bg-edf-green-dark"],
};

interface PageHeroProps {
  breadcrumbLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  /**
   * Mot(s) mis en exergue dans le sous-titre par la GRAISSE (bold).
   * Charte p.26 : sur fond coloré, la mise en exergue se fait
   * uniquement par la graisse, jamais par la couleur.
   */
  accentWord?: string;
  description: string;
  /** Camaïeu EDF de la page (défaut: bleu) */
  camaieu?: Camaieu;
}

/**
 * Hero unifié pour les pages secondaires.
 *
 * Conformité charte EDF 2021 :
 * — Dégradé mono-camaïeu clair→foncé, angle 120deg (p.19)
 * — Texte blanc uniquement sur fond coloré (p.18, p.26)
 * — Mise en exergue par graisse sur fond coloré, pas par couleur (p.26)
 * — Un seul camaïeu par composition (p.17)
 */
export default function PageHero({
  breadcrumbLabel,
  badge,
  title,
  subtitle,
  accentWord,
  description,
  camaieu = "bleu",
}: PageHeroProps) {
  /**
   * Mise en exergue par la GRAISSE uniquement (charte p.26).
   * Sur fond coloré/dégradé, pas de texte en couleur — seulement du bold blanc.
   */
  const renderSubtitle = () => {
    if (!accentWord) return subtitle;

    const index = subtitle.toLowerCase().indexOf(accentWord.toLowerCase());
    if (index === -1) return subtitle;

    const before = subtitle.slice(0, index);
    const match = subtitle.slice(index, index + accentWord.length);
    const after = subtitle.slice(index + accentWord.length);

    return (
      <>
        {before}
        <strong className="text-white font-bold">{match}</strong>
        {after}
      </>
    );
  };

  const [barLight, barDark] = ACCENT_BAR_MAP[camaieu];

  return (
    <section
      className="relative overflow-hidden pt-[72px] md:pt-[80px]"
      style={{ background: GRADIENT_MAP[camaieu] }}
    >
      <div className="container-custom relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

          {/* Badge */}
          <div className="hero-fade-in" style={{ animationDelay: "0s" }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-xs font-medium mb-6 border border-white/20 uppercase tracking-widest">
              {badge}
            </span>
          </div>

          {/* Titre principal — blanc pur */}
          <h1
            className="heading-lg font-bold text-white mb-4 tracking-tight hero-fade-in"
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>

          {/* Sous-titre — blanc, exergue par graisse uniquement */}
          <p
            className="text-xl md:text-2xl text-white/90 font-light mb-6 hero-fade-in"
            style={{ animationDelay: "0.16s" }}
          >
            {renderSubtitle()}
          </p>

          {/* Description — blanc atténué */}
          <p
            className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed hero-fade-in"
            style={{ animationDelay: "0.24s" }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Barre accent — clair + foncé du même camaïeu */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 flex"
        aria-hidden="true"
      >
        <div className={`flex-[3] ${barLight}`} />
        <div className={`flex-1 ${barDark}`} />
      </div>
    </section>
  );
}
