import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import type { News } from "@/lib/database.types";

export default async function ArticleNotFound() {
  // Propose 3 articles récents en secours (Cooper § "forthcoming").
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("id, title, slug, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  const recent = (data as Pick<News, "id" | "title" | "slug" | "published_at">[]) ?? [];

  return (
    <div className="pt-[72px] md:pt-[100px]">
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-edf-bleu-nuit mb-4">
          Actualité introuvable
        </h1>
        <p className="text-edf-gris-fonce mb-10 max-w-xl mx-auto">
          Cette actualité n&apos;existe pas ou a été dépubliée. Retrouvez les
          dernières publications ci-dessous.
        </p>

        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-edf-bleu-action text-white font-semibold hover:bg-edf-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Toutes les actualités
        </Link>

        {recent.length > 0 && (
          <div className="mt-16 grid gap-4 max-w-2xl mx-auto text-left">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-edf-gris-fonce">
              Dernières publications
            </h2>
            <ul className="divide-y divide-edf-gris-clair border border-edf-gris-clair">
              {recent.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/actualites/${item.slug}`}
                    className="block px-4 py-3 min-h-[48px] hover:bg-edf-blanc-bleute transition-colors"
                  >
                    <p className="font-semibold text-edf-bleu-nuit">
                      {item.title}
                    </p>
                    {item.published_at && (
                      <p className="text-xs text-edf-gris-fonce mt-1">
                        {new Date(item.published_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
