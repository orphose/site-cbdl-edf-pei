import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Camaïeu du hero — bleu par défaut (registre institutionnel),
 * vert UNIQUEMENT pour le registre environnemental (page Bénéfices).
 * L'orange est exclu de l'UI du site (un seul mélange autorisé : bleu + vert).
 */
type Camaieu = "bleu" | "vert";

/**
 * Dégradé charte : clair (haut-gauche) → foncé (bas-droite), 120deg.
 */
const GRADIENT_MAP: Record<Camaieu, string> = {
  bleu: "linear-gradient(120deg, #1089FF 0%, #001A70 100%)",
  vert: "linear-gradient(120deg, #88D910 0%, #4F9E30 100%)",
};

/** Motif baguette officiel (charte p.44-46) — un par camaïeu */
const MOTIF_MAP: Record<Camaieu, string> = {
  bleu: "/images/charte/motifs/motif-bleu.png",
  vert: "/images/charte/motifs/motif-vert.png",
};

/** Symbole flèche EDF (charte p.47) — max 1 symbole par composition */
const FLECHE_MAP: Record<Camaieu, string> = {
  bleu: "/images/charte/symboles/fleche-bleu.png",
  vert: "/images/charte/symboles/fleche-vert.png",
};

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
 * — motif baguette en arrière-plan subtil (p.44-46)
 * — un seul symbole (flèche) par composition (p.47)
 * — texte blanc sur fond coloré, exergue par graisse (p.18, p.26)
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
        <strong className="font-bold text-white">{match}</strong>
        {after}
      </>
    );
  };

  return (
    <section
      className="relative overflow-hidden pt-16 md:pt-20"
      style={{ background: GRADIENT_MAP[camaieu] }}
    >
      {/* Motif baguette — subtil, côté droit */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Image
          src={MOTIF_MAP[camaieu]}
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
        <Image src={FLECHE_MAP[camaieu]} alt="" fill className="object-contain" sizes="128px" />
      </div>

      <div className="container-custom relative z-10 py-14 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

          <p className="eyebrow eyebrow--on-dark mb-5 hero-fade-in" style={{ animationDelay: "0s" }}>
            {eyebrow}
          </p>

          <h1
            className="heading-1 text-white hero-fade-in"
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 mt-4 hero-fade-in"
            style={{ animationDelay: "0.16s" }}
          >
            {renderSubtitle()}
          </p>

          <p
            className="text-lead text-white/80 max-w-2xl mt-5 hero-fade-in"
            style={{ animationDelay: "0.24s" }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
