import Image from "next/image";
import { IMAGES } from "@/lib/media";

/** Camaïeux du site : bleu (dominant) + vert (touches environnement). */
type Camaieu = "bleu" | "vert";

/**
 * Couleurs de fond du cartouche (charte EDF 2021, p.34-36).
 * Règles strictes :
 *   - Toujours CARRÉ (jamais rectangulaire)
 *   - Bichromie : 1/3 haut blanc (logo), 2/3 bas couleur (texte)
 *   - Jamais en transparence
 *   - Un seul camaïeu par composition
 */
const CARTOUCHE_BG: Record<Camaieu, string> = {
  bleu: "bg-edf-blue",
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
 * Cartouche carré EDF — signature visuelle de la marque.
 * Un seul cartouche par composition, placé en angle.
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
      className={`relative inline-flex flex-col shadow-3 ${root} ${className}`}
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
      <div className={`basis-2/3 ${CARTOUCHE_BG[camaieu]} flex items-center justify-center px-3`}>
        <p className={`${text} text-white font-semibold leading-tight text-center uppercase tracking-wide`}>
          {label}
        </p>
      </div>
    </div>
  );
}
