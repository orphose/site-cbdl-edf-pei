import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Tonalité du fond : white = texte blanc (fonds saturés), dark = Bleu Nuit (fonds clairs) */
  tone?: "white" | "dark";
}

const TONE_STYLES = {
  white: {
    list: "text-white/75",
    separator: "text-white/50",
    link: "hover:text-white",
    current: "text-white",
  },
  dark: {
    list: "text-edf-bleu-nuit/70",
    separator: "text-edf-bleu-nuit/40",
    link: "hover:text-edf-bleu-nuit",
    current: "text-edf-bleu-nuit",
  },
} as const;

/**
 * Fil d'Ariane — affiché sur fond coloré (heros de pages secondaires).
 */
export default function Breadcrumbs({ items, tone = "white" }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }, ...items];
  const styles = TONE_STYLES[tone];

  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${styles.list}`}>
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className={`w-3.5 h-3.5 ${styles.separator}`} aria-hidden="true" />
            )}
            {item.href && index < allItems.length - 1 ? (
              <Link
                href={item.href}
                className={`inline-flex items-center min-h-11 ${styles.link} underline-offset-4 hover:underline transition-colors`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${styles.current} font-medium`} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
