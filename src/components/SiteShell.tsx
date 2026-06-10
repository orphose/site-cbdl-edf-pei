"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Enveloppe le site public avec le Header et le Footer.
 *
 * Sur les routes `/admin`, le chrome public n'est PAS monté du tout
 * (pas seulement masqué) : on évite ainsi les doublons de landmarks
 * (deux <header>, deux <nav>, deux <footer>), le client Supabase et les
 * écouteurs de scroll inutiles du Header, et le footer corporate sous
 * le back-office. Le back-office fournit sa propre interface.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#contenu" className="skip-link">
        Aller au contenu principal
      </a>
      <Header />
      <main id="contenu" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
