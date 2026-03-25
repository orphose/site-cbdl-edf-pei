import Breadcrumbs from "@/components/Breadcrumbs";

type AccentColor = "orange" | "green";

const ACCENT_MAP: Record<AccentColor, string> = {
  orange: "bg-edf-orange",
  green: "bg-edf-green",
};

interface PageHeroProps {
  breadcrumbLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  /** Mot(s) accentué(s) dans le sous-titre — un seul camaïeu par page */
  accentWord?: string;
  description: string;
  accentColor?: AccentColor;
}

/**
 * Hero unifié pour les pages secondaires.
 *
 * Principes appliqués (charte EDF 2021 + Refactoring UI + Krug) :
 * — Un seul camaïeu accent par composition (pas de mélange orange+vert)
 * — Hauteur contenue (pas de min-h excessif pour une page intérieure)
 * — Hiérarchie typographique claire : badge → titre → sous-titre → description
 * — Espacement généreux et prévisible quel que soit le contenu
 * — Fond dégradé EDF sans ornements parasites (pas de cercles/motifs)
 * — Animations CSS pures (pas de dépendance JS pour le contenu above-the-fold)
 */
export default function PageHero({
  breadcrumbLabel,
  badge,
  title,
  subtitle,
  accentWord,
  description,
  accentColor = "orange",
}: PageHeroProps) {
  // Highlight l'accentWord dans le sous-titre avec la couleur accent unique
  const renderSubtitle = () => {
    if (!accentWord) return subtitle;

    const index = subtitle.toLowerCase().indexOf(accentWord.toLowerCase());
    if (index === -1) return subtitle;

    const before = subtitle.slice(0, index);
    const match = subtitle.slice(index, index + accentWord.length);
    const after = subtitle.slice(index + accentWord.length);

    const colorClass =
      accentColor === "orange"
        ? "text-edf-orange-bright"
        : "text-edf-green-bright";

    return (
      <>
        {before}
        <span className={`${colorClass} font-semibold`}>{match}</span>
        {after}
      </>
    );
  };

  return (
    <section
      className="relative overflow-hidden pt-[72px] md:pt-[80px]"
      style={{ background: "var(--gradient-hero)" }}
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

          {/* Titre principal */}
          <h1
            className="heading-lg font-bold text-white mb-4 tracking-tight hero-fade-in"
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>

          {/* Sous-titre avec accent unique */}
          <p
            className="text-xl md:text-2xl text-white/90 font-light mb-6 hero-fade-in"
            style={{ animationDelay: "0.16s" }}
          >
            {renderSubtitle()}
          </p>

          {/* Description */}
          <p
            className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed hero-fade-in"
            style={{ animationDelay: "0.24s" }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Barre accent EDF — camaïeu bleu + accent unique */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 flex"
        aria-hidden="true"
      >
        <div className="flex-[3] bg-edf-blue-mid" />
        <div className={`flex-1 ${ACCENT_MAP[accentColor]}`} />
      </div>
    </section>
  );
}
