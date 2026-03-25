import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Camaïeu EDF — chaque page utilise un seul camaïeu.
 * Les dégradés vont du foncé vers le clair au sein du même camaïeu (charte EDF 2021).
 */
type Camaieu = "bleu" | "orange" | "vert";

/** Dégradé foncé → clair au sein du même camaïeu (120deg) */
const GRADIENT_MAP: Record<Camaieu, string> = {
  bleu:   "linear-gradient(120deg, #001A70 0%, #1089FF 100%)",
  orange: "linear-gradient(120deg, #FE5716 0%, #FFB210 100%)",
  vert:   "linear-gradient(120deg, #4F9E30 0%, #88D910 100%)",
};

/** Barre accent en bas — tonalité foncée + tonalité claire du même camaïeu */
const ACCENT_BAR_MAP: Record<Camaieu, [string, string]> = {
  bleu:   ["bg-edf-blue", "bg-edf-blue-light"],
  orange: ["bg-edf-orange", "bg-edf-orange-light"],
  vert:   ["bg-edf-green-dark", "bg-edf-green-light"],
};

/** Couleur du mot accentué dans le sous-titre */
const ACCENT_TEXT_MAP: Record<Camaieu, string> = {
  bleu:   "text-edf-orange-bright",   // contraste sur fond bleu
  orange: "text-white",               // contraste sur fond orange
  vert:   "text-white",               // contraste sur fond vert
};

interface PageHeroProps {
  breadcrumbLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  /** Mot(s) accentué(s) dans le sous-titre */
  accentWord?: string;
  description: string;
  /** Camaïeu EDF de la page (défaut: bleu) */
  camaieu?: Camaieu;
}

/**
 * Hero unifié pour les pages secondaires.
 *
 * Principes appliqués (charte EDF 2021 + Refactoring UI + Krug) :
 * — Dégradé mono-camaïeu foncé → clair (jamais de mélange entre camaïeux)
 * — Hiérarchie typographique claire : badge → titre → sous-titre → description
 * — Espacement généreux et prévisible quel que soit le contenu
 * — Animations CSS pures (pas de dépendance JS pour le contenu above-the-fold)
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
        <span className={`${ACCENT_TEXT_MAP[camaieu]} font-semibold`}>{match}</span>
        {after}
      </>
    );
  };

  const [barDark, barLight] = ACCENT_BAR_MAP[camaieu];

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

          {/* Titre principal */}
          <h1
            className="heading-lg font-bold text-white mb-4 tracking-tight hero-fade-in"
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>

          {/* Sous-titre avec accent */}
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

      {/* Barre accent — foncé + clair du même camaïeu */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 flex"
        aria-hidden="true"
      >
        <div className={`flex-[3] ${barDark}`} />
        <div className={`flex-1 ${barLight}`} />
      </div>
    </section>
  );
}
