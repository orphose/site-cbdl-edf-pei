import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Camaïeu du hero — un camaïeu directeur PAR PAGE (charte : un seul
 * camaïeu par support) :
 * — bleu (La Centrale), vert (Bénéfices), orange (Le Chantier) :
 *   dégradés saturés, texte blanc ;
 * — orange-clair (Actualités), bleu-clair (À propos) : effet lumineux
 *   charte p.20 (couleur + blanc), texte Bleu Nuit — le blanc ne passe
 *   pas les contrastes WCAG sur orange clair (1,9:1) ni bleu clair (3,5:1).
 */
type Camaieu = "bleu" | "vert" | "orange" | "bleu-clair" | "orange-clair";

interface CamaieuConfig {
  /** Dégradé 120deg, clair (haut-gauche) → soutenu (bas-droite), charte p.19-20 */
  gradient: string;
  /** Motif baguette (p.44-46) et symbole flèche (p.47) du camaïeu parent */
  motif: string;
  fleche: string;
  /** Tonalité du texte : white sur fonds saturés, dark (Bleu Nuit) sur fonds clairs */
  tone: "white" | "dark";
}

const CAMAIEU_MAP: Record<Camaieu, CamaieuConfig> = {
  bleu: {
    gradient: "var(--gradient-bleu)",
    motif: "/images/charte/motifs/motif-bleu.png",
    fleche: "/images/charte/symboles/fleche-bleu.png",
    tone: "white",
  },
  vert: {
    gradient: "var(--gradient-vert)",
    motif: "/images/charte/motifs/motif-vert.png",
    fleche: "/images/charte/symboles/fleche-vert.png",
    tone: "white",
  },
  orange: {
    gradient: "var(--gradient-orange)",
    motif: "/images/charte/motifs/motif-orange.png",
    fleche: "/images/charte/symboles/fleche-orange.png",
    tone: "white",
  },
  "bleu-clair": {
    gradient: "var(--gradient-bleu-clair)",
    motif: "/images/charte/motifs/motif-bleu.png",
    fleche: "/images/charte/symboles/fleche-bleu.png",
    tone: "dark",
  },
  "orange-clair": {
    gradient: "var(--gradient-orange-clair)",
    motif: "/images/charte/motifs/motif-orange.png",
    fleche: "/images/charte/symboles/fleche-orange.png",
    tone: "dark",
  },
};

/** Classes de texte selon la tonalité du fond */
const TONE_STYLES = {
  white: {
    eyebrow: "eyebrow eyebrow--on-dark",
    title: "text-white",
    subtitle: "text-white/90",
    description: "text-white/80",
  },
  dark: {
    eyebrow: "eyebrow eyebrow--bleu-nuit",
    title: "text-edf-bleu-nuit",
    subtitle: "text-edf-bleu-nuit/90",
    description: "text-edf-bleu-nuit/80",
  },
} as const;

interface PageHeroProps {
  breadcrumbLabel: string;
  /** Surtitre court au-dessus du H1. */
  eyebrow: string;
  title: string;
  subtitle: string;
  /**
   * Mot(s) du sous-titre mis en exergue par la GRAISSE.
   * Sur fond coloré, l'exergue se fait uniquement par la graisse (charte p.26).
   */
  accentWord?: string;
  description: string;
  camaieu?: Camaieu;
}

/**
 * Hero unifié des pages secondaires.
 *
 * Conformité charte EDF 2021 :
 * — dégradé mono-camaïeu clair→foncé 120deg (p.19)
 * — effet lumineux couleur + blanc pour les déclinaisons claires (p.20)
 * — motif baguette en arrière-plan subtil (p.44-46)
 * — un seul symbole (flèche) par composition (p.47)
 * — exergue par graisse (p.26), contrastes WCAG AA (charte web)
 */
export default function PageHero({
  breadcrumbLabel,
  eyebrow,
  title,
  subtitle,
  accentWord,
  description,
  camaieu = "bleu",
}: PageHeroProps) {
  const config = CAMAIEU_MAP[camaieu];
  const tone = TONE_STYLES[config.tone];

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
        <strong className="font-bold">{match}</strong>
        {after}
      </>
    );
  };

  return (
    <section
      className="relative overflow-hidden pt-16 md:pt-20"
      style={{ background: config.gradient }}
    >
      {/* Motif baguette — subtil, côté droit */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Image
          src={config.motif}
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
      </div>

      {/* Symbole flèche — décoratif, bas-droite */}
      <div
        className="absolute bottom-4 right-8 md:bottom-8 md:right-16 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <Image src={config.fleche} alt="" fill className="object-contain" sizes="128px" />
      </div>

      <div className="container-custom relative z-10 py-14 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} tone={config.tone} />

          <p className={`${tone.eyebrow} mb-5 hero-fade-in`} style={{ animationDelay: "0s" }}>
            {eyebrow}
          </p>

          <h1
            className={`heading-1 ${tone.title} hero-fade-in`}
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>

          <p
            className={`text-xl md:text-2xl ${tone.subtitle} mt-4 hero-fade-in`}
            style={{ animationDelay: "0.16s" }}
          >
            {renderSubtitle()}
          </p>

          <p
            className={`text-lead ${tone.description} max-w-2xl mt-5 hero-fade-in`}
            style={{ animationDelay: "0.24s" }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
