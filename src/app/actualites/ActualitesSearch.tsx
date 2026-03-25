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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-edf-gris-moyen" />
        <input
          type="search"
          placeholder="Rechercher une actualité..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white border border-edf-gris-clair text-edf-bleu-nuit text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-edf-gris-moyen hover:text-edf-bleu-nuit"
            aria-label="Effacer la recherche"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {query && (
        <p className="text-sm text-edf-gris-moyen mt-2">
          Recherche : &quot;{query}&quot; parmi {newsCount} actualités
        </p>
      )}
    </div>
  );
}
