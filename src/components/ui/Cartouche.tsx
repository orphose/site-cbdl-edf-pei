import Image from "next/image";
import { IMAGES } from "@/lib/media";

type Camaieu = "bleu" | "orange" | "vert";

/**
 * Couleurs de fond du cartouche (charte EDF 2021, p. 34-36).
 * Règles strictes :
 *   - Toujours CARRÉ (jamais rectangulaire)
 *   - 1/3 haut blanc (logo), 2/3 bas couleur (texte)
 *   - Jamais en transparence (la charte n'autorise pas plus de 10%, on s'en dispense)
 *   - Un seul camaïeu par composition
 */
const CARTOUCHE_BG: Record<Camaieu, string> = {
  bleu: "bg-edf-blue",
  orange: "bg-edf-orange",
  vert: "bg-edf-green-dark",
};

type CartoucheSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<CartoucheSize, { root: string; logo: number; text: string }> = {
  sm: { root: "w-24 h-24", logo: 56, text: "text-xs" },
  md: { root: "w-32 h-32", logo: 72, text: "text-sm" },
  lg: { root: "w-40 h-40", logo: 88, text: "text-base" },
};

interface CartoucheProps {
  /** Texte court positionné dans la zone colorée (≤ 3 lignes). */
  label: React.ReactNode;
  camaieu?: Camaieu;
  size?: CartoucheSize;
  className?: string;
}

/**
 * Cartouche carré EDF — signature visuelle pour hero, réseaux sociaux, goodies.
 *
 * Usage : un seul cartouche par composition, placé en angle (haut-gauche, bas-droite).
 * Pour les fonds sombres, utiliser le logo blanc en miniature ; charte p.34.
 */
export default function Cartouche({
  label,
  camaieu = "bleu",
  size = "md",
  className = "",
}: CartoucheProps) {
  const { root, logo, text } = SIZE_MAP[size];

  return (
    <div
      className={`relative inline-flex flex-col ${root} ${className}`}
      aria-label="Cartouche EDF"
    >
      {/* 1/3 haut — fond blanc, logo EDF couleurs */}
      <div className="basis-1/3 bg-white flex items-center justify-center">
        <Image
          src={IMAGES.logo.couleurs}
          alt="EDF"
          width={logo}
          height={Math.round(logo * 0.4)}
          className="h-auto w-auto max-h-[70%] object-contain"
          priority={false}
        />
      </div>

      {/* 2/3 bas — couleur camaïeu + texte blanc */}
      <div
        className={`basis-2/3 ${CARTOUCHE_BG[camaieu]} flex items-center justify-center px-3`}
      >
        <p className={`${text} text-white font-semibold leading-tight text-center uppercase tracking-wide`}>
          {label}
        </p>
      </div>
    </div>
  );
}
