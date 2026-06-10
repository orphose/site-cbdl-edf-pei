"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

/**
 * Composant de recherche client-side pour les actualités
 * Filtre les cartes affichées côté client via CSS
 */
export default function ActualitesSearch({ newsCount }: { newsCount: number }) {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-10 max-w-md">
      <label htmlFor="actualites-search" className="sr-only">
        Rechercher une actualité
      </label>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-edf-gris-moyen pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="actualites-search"
          type="search"
          placeholder="Rechercher une actualité..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-11 pr-12 bg-white border border-edf-gris-clair text-edf-bleu-nuit text-sm placeholder:text-edf-gris-moyen focus:border-edf-bleu-action transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-edf-gris-moyen hover:text-edf-bleu-nuit transition-colors"
            aria-label="Effacer la recherche"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {query && (
        <p className="text-caption mt-2">
          Recherche : &quot;{query}&quot; parmi {newsCount} actualités
        </p>
      )}
    </div>
  );
}
