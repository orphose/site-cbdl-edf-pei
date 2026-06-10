"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  Mail,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { IMAGES } from "@/lib/media";

interface AdminAuthProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  authError: string;
  authLoading: boolean;
  handleLogin: () => void;
}

/**
 * Écran de connexion du back-office — design system EDF :
 * fond Blanc Bleuté, carte carrée, eyebrow, bouton primaire Bleu Action.
 */
export default function AdminAuth({
  email,
  setEmail,
  password,
  setPassword,
  authError,
  authLoading,
  handleLogin,
}: AdminAuthProps) {
  return (
    <div className="min-h-screen bg-admin-bg flex flex-col">
      {/* Liseré de marque */}
      <div className="h-1 bg-edf-blue" aria-hidden="true" />

      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-11 text-sm text-edf-bleu-nuit/70 hover:text-edf-bleu-action transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour au site
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md hero-fade-in">
          <form
            className="bg-white border border-edf-gris-clair shadow-3 p-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Identité */}
            <div className="flex flex-col items-center text-center mb-8">
              <Image
                src={IMAGES.logo.couleurs}
                alt="EDF PEI"
                width={150}
                height={60}
                className="h-12 w-auto mb-5"
                priority
              />
              <p className="eyebrow eyebrow--bleu-nuit mb-2">Back-office</p>
              <h1 className="text-xl font-bold text-edf-bleu-nuit">
                Centrale Bioénergie du Larivot
              </h1>
            </div>

            <div className="space-y-5">
              {authError && (
                <p
                  role="alert"
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{authError}</span>
                </p>
              )}

              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium text-edf-bleu-nuit mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-edf-bleu-nuit/40"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    placeholder="prenom.nom@exemple.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-13 pl-11 pr-4 bg-admin-bg border border-edf-gris-clair text-base text-edf-bleu-nuit placeholder:text-edf-bleu-nuit/50 focus:outline-none focus:border-edf-bleu-action focus:ring-2 focus:ring-edf-bleu-action/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-edf-bleu-nuit mb-2"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-edf-bleu-nuit/40"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-13 pl-11 pr-4 bg-admin-bg border border-edf-gris-clair text-base text-edf-bleu-nuit placeholder:text-edf-bleu-nuit/50 focus:outline-none focus:border-edf-bleu-action focus:ring-2 focus:ring-edf-bleu-action/20 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <span
                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                )}
                {authLoading ? "Connexion…" : "Accéder au tableau de bord"}
              </button>

              <p className="text-center text-xs text-edf-bleu-nuit/70">
                Accès réservé aux administrateurs autorisés
              </p>
            </div>
          </form>

          <p className="text-center text-xs text-edf-bleu-nuit/70 mt-8">
            © {new Date().getFullYear()} EDF PEI — Tous droits réservés
          </p>
        </div>
      </main>
    </div>
  );
}
