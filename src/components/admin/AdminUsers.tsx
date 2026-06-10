"use client";

import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { Shield, UserCog } from "lucide-react";
import type { Profile, UserRole } from "@/lib/database.types";

const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Administrateur",
  editor: "Éditeur",
};

/**
 * Gestion des administrateurs et de leurs rôles (réservée aux admins).
 *
 * — Admin : accès complet, dont la gestion des utilisateurs.
 * — Éditeur : gestion des contenus uniquement.
 *
 * La création de comptes se fait depuis le tableau de bord Supabase
 * (Authentication → Users) : un profil est ensuite créé automatiquement.
 */
export default function AdminUsers({
  profiles,
  currentUserId,
  onChangeRole,
}: {
  profiles: Profile[];
  currentUserId: string;
  onChangeRole: (id: string, role: UserRole) => void;
}) {
  return (
    <Card radius="none" shadow="none" className="mt-6 border border-edf-gris-clair">
      <CardHeader className="px-6 py-4 border-b border-edf-gris-clair">
        <div className="flex items-center gap-2">
          <UserCog className="w-5 h-5 text-edf-blue" />
          <div>
            <h2 className="text-lg font-bold text-edf-bleu-nuit">
              Utilisateurs &amp; rôles
            </h2>
            <p className="text-sm text-edf-bleu-nuit/60">
              Gérez les accès au back-office
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="divide-y divide-edf-gris-clair/70 list-none">
          {profiles.map((profile) => {
            const isSelf = profile.id === currentUserId;
            return (
              <li
                key={profile.id}
                className="flex flex-wrap items-center gap-3 px-6 py-4"
              >
                <div className="w-10 h-10 bg-edf-blue/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-edf-blue uppercase">
                    {(profile.email ?? "?").charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-edf-bleu-nuit truncate">
                    {profile.full_name || profile.email || "Sans nom"}
                    {isSelf && (
                      <span className="ml-2 text-xs text-edf-bleu-nuit/50">(vous)</span>
                    )}
                  </p>
                  {profile.full_name && (
                    <p className="text-xs text-edf-bleu-nuit/50 truncate">
                      {profile.email}
                    </p>
                  )}
                </div>

                {profile.role === "admin" && (
                  <Chip
                    size="sm"
                    variant="flat"
                    radius="none"
                    color="primary"
                    startContent={<Shield className="w-3 h-3" />}
                  >
                    {ROLE_LABEL.admin}
                  </Chip>
                )}

                {/* Sélecteur de rôle — désactivé sur son propre compte
                    pour éviter de se retirer l'accès admin par mégarde. */}
                <select
                  aria-label={`Rôle de ${profile.email}`}
                  value={profile.role}
                  disabled={isSelf}
                  onChange={(e) =>
                    onChangeRole(profile.id, e.target.value as UserRole)
                  }
                  className="px-3 py-2 text-sm bg-white border border-edf-gris-clair text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="admin">{ROLE_LABEL.admin}</option>
                  <option value="editor">{ROLE_LABEL.editor}</option>
                </select>
              </li>
            );
          })}
        </ul>
        <p className="px-6 py-4 text-xs text-edf-bleu-nuit/50 border-t border-edf-gris-clair">
          Pour ajouter un compte : Supabase → Authentication → Users. Le profil
          est créé automatiquement et apparaît ici.
        </p>
      </CardBody>
    </Card>
  );
}
