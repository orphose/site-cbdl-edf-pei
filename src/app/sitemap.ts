import type { MetadataRoute } from "next";
import { getPublishedNews } from "@/lib/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.centrale-larivot.fr";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/centrale", changeFrequency: "monthly", priority: 0.9 },
  { path: "/benefices", changeFrequency: "monthly", priority: 0.8 },
  { path: "/chantier", changeFrequency: "weekly", priority: 0.8 },
  { path: "/actualites", changeFrequency: "daily", priority: 0.9 },
  { path: "/a-propos", changeFrequency: "yearly", priority: 0.5 },
  { path: "/presse", changeFrequency: "monthly", priority: 0.6 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const news = await getPublishedNews(100);
    newsEntries = news.map((item) => ({
      url: `${SITE_URL}/actualites/${item.slug}`,
      lastModified: new Date(item.updated_at ?? item.published_at ?? now),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Supabase indisponible au build : on ne bloque pas la génération du sitemap
  }

  return [...staticEntries, ...newsEntries];
}
