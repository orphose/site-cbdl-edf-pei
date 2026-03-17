import type { Metadata } from "next";

/**
 * Métadonnées de la section admin
 */
export const metadata: Metadata = {
  title: "Administration | CBDL",
  description: "Panneau d'administration du site CBDL",
  robots: "noindex, nofollow",
};

/**
 * Layout de la section admin
 * Sans Header/Footer pour une interface dédiée
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}

