import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Fil d'Ariane — affiché sur fond coloré (heros de pages secondaires).
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }, ...items];

  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
            )}
            {item.href && index < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="inline-flex items-center min-h-11 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
