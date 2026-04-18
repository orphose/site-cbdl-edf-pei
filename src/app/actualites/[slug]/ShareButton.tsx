"use client";

import { useCallback, useState } from "react";
import { Share2 } from "lucide-react";
import Toast from "@/components/ui/Toast";

interface ShareButtonProps {
  title: string;
  excerpt: string;
}

interface ToastState {
  message: string;
  kind: "success" | "error" | "info";
}

/**
 * Bouton de partage natif (`navigator.share`) avec fallback presse-papier.
 * Affiche un toast en cas de succès, d'erreur ou de copie.
 */
export default function ShareButton({ title, excerpt }: ShareButtonProps) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url });
        setToast({ message: "Article partagé.", kind: "success" });
      } catch (err) {
        const name = err instanceof Error ? err.name : "";
        if (name === "AbortError") return;
        setToast({ message: "Le partage a échoué.", kind: "error" });
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setToast({
        message: "Lien copié dans le presse-papier.",
        kind: "success",
      });
    } catch {
      setToast({
        message: "Impossible de copier le lien automatiquement.",
        kind: "error",
      });
    }
  }, [title, excerpt]);

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] bg-edf-blanc-bleute hover:bg-edf-gris-clair transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </button>

      {toast && (
        <Toast
          message={toast.message}
          kind={toast.kind}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
