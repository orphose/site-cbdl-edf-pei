import Image from "next/image";
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

/** Motif EDF officiel (charte p.44-46) — un par camaïeu */
const MOTIF_MAP: Record<Camaieu, string> = {
  bleu:   "/images/charte/motifs/motif-bleu.png",
  orange: "/images/charte/motifs/motif-orange.png",
  vert:   "/images/charte/motifs/motif-vert.png",
};

/** Symbole flèche EDF (charte p.47) — un par camaïeu */
const FLECHE_MAP: Record<Camaieu, string> = {
  bleu:   "/images/charte/symboles/fleche-bleu.png",
  orange: "/images/charte/symboles/fleche-orange.png",
  vert:   "/images/charte/symboles/fleche-vert.png",
};

/** Barre accent en bas — couleur la plus foncée du camaïeu, unie */
const ACCENT_BAR_MAP: Record<Camaieu, string> = {
  bleu:   "bg-edf-blue",
  orange: "bg-edf-orange",
  vert:   "bg-edf-green-dark",
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
 * — Motif officiel en arrière-plan subtil (p.44-46)
 * — Symbole flèche décoratif (p.47)
 * — Texte blanc uniquement sur fond coloré (p.18, p.26)
 * — Mise en exergue par graisse, pas par couleur (p.26)
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

  const barColor = ACCENT_BAR_MAP[camaieu];

  return (
    <section
      className="relative overflow-hidden pt-[72px] md:pt-[80px]"
      style={{ background: GRADIENT_MAP[camaieu] }}
    >
      {/* Motif EDF officiel — subtil, côté droit (charte p.44-46) */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={MOTIF_MAP[camaieu]}
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
      </div>

      {/* Symbole flèche EDF — décoratif, bas-droite (charte p.47) */}
      <div
        className="absolute bottom-4 right-8 md:bottom-8 md:right-16 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={FLECHE_MAP[camaieu]}
          alt=""
          fill
          className="object-contain"
          sizes="128px"
        />
      </div>

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

      {/* Barre accent unie — couleur foncée du camaïeu */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${barColor}`}
        aria-hidden="true"
      />
    </section>
  );
}
