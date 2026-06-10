import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * Métadonnées de la section admin
 */
export const metadata: Metadata = {
  title: "Administration | CBDL",
  description: "Panneau d'administration du site CBDL",
  robots: "noindex, nofollow",
};

/**
 * Layout de la section admin — sans Header/Footer publics (cf. SiteShell).
 *
 * Garde côté serveur : un utilisateur authentifié qui n'a pas de rôle
 * staff (admin/editor) est redirigé. Les visiteurs non connectés voient
 * l'écran de connexion rendu par la page (client). Cette garde complète
 * le RLS de la base (défense en profondeur).
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
      redirect("/");
    }
  }

  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
