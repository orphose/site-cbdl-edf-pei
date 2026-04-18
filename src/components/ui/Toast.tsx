"use client";

import { useEffect } from "react";
import { CheckCircle2, X, AlertTriangle, Info } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface ToastProps {
  message: string;
  kind?: ToastKind;
  /** Durée en ms avant fermeture auto (0 pour désactiver) */
  duration?: number;
  onClose: () => void;
  /** Contenu d'action optionnel (ex: bouton Annuler pour undo) */
  action?: React.ReactNode;
}

const KIND_STYLES: Record<ToastKind, { bg: string; icon: React.ElementType }> = {
  success: { bg: "bg-edf-blue text-white", icon: CheckCircle2 },
  error: { bg: "bg-red-600 text-white", icon: AlertTriangle },
  info: { bg: "bg-edf-bleu-nuit text-white", icon: Info },
};

/**
 * Notification ponctuelle affichée en haut à droite.
 * - `role="status"` + `aria-live="polite"` pour les lecteurs d'écran.
 * - Fermeture auto après `duration` (défaut 4s). Passez 0 pour désactiver.
 * - L'animation CSS `.toast-enter` respecte `prefers-reduced-motion`.
 */
export default function Toast({
  message,
  kind = "success",
  duration = 4000,
  onClose,
  action,
}: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  const { bg, icon: Icon } = KIND_STYLES[kind];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast-enter fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 shadow-lg max-w-sm ${bg}`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      <p className="text-sm flex-1">{message}</p>
      {action}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la notification"
        className="flex-shrink-0 inline-flex items-center justify-center min-w-[32px] min-h-[32px] hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
