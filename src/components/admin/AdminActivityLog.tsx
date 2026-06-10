"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { History, Plus, Pencil, Trash2 } from "lucide-react";
import type { AuditEntry } from "@/lib/database.types";

const PAGE_SIZE = 15;

const ACTION_META = {
  create: { label: "Création", color: "success" as const, Icon: Plus },
  update: { label: "Modification", color: "primary" as const, Icon: Pencil },
  delete: { label: "Suppression", color: "danger" as const, Icon: Trash2 },
};

const ENTITY_LABEL: Record<string, string> = {
  news: "Actualité",
  partnerships: "Partenariat",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Journal d'activité — lecture seule. Alimenté par les triggers de la base
 * (SECURITY DEFINER), donc fidèle et infalsifiable côté client.
 */
export default function AdminActivityLog({
  entries,
}: {
  entries: AuditEntry[];
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = useMemo(
    () => entries.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [entries, safePage]
  );

  return (
    <Card radius="none" shadow="none" className="mt-6 border border-edf-gris-clair">
      <CardHeader className="px-6 py-4 border-b border-edf-gris-clair">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-edf-blue" />
          <div>
            <h2 className="text-lg font-bold text-edf-bleu-nuit">
              Journal d&apos;activité
            </h2>
            <p className="text-sm text-edf-bleu-nuit/70">
              Historique des créations, modifications et suppressions
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {entries.length === 0 ? (
          <div className="text-center py-14 text-edf-bleu-nuit/70 text-sm">
            Aucune activité enregistrée pour le moment.
          </div>
        ) : (
          <>
            <ul className="divide-y divide-edf-gris-clair/70 list-none">
              {pageItems.map((entry) => {
                const meta = ACTION_META[entry.action];
                const Icon = meta.Icon;
                return (
                  <li
                    key={entry.id}
                    className="flex items-center gap-4 px-6 py-3"
                  >
                    <Chip
                      size="sm"
                      variant="flat"
                      radius="none"
                      color={meta.color}
                      startContent={<Icon className="w-3 h-3" />}
                    >
                      {meta.label}
                    </Chip>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-edf-bleu-nuit truncate">
                        <span className="text-edf-bleu-nuit/70">
                          {ENTITY_LABEL[entry.entity] ?? entry.entity} :
                        </span>{" "}
                        <span className="font-medium">
                          {entry.entity_label ?? "—"}
                        </span>
                      </p>
                      <p className="text-xs text-edf-bleu-nuit/70 truncate">
                        {entry.actor_email ?? "Système"}
                      </p>
                    </div>
                    <time className="text-xs text-edf-bleu-nuit/70 whitespace-nowrap">
                      {formatDate(entry.created_at)}
                    </time>
                  </li>
                );
              })}
            </ul>
            {pageCount > 1 && (
              <div className="flex justify-center py-4 border-t border-edf-gris-clair">
                <Pagination
                  total={pageCount}
                  page={safePage}
                  onChange={setPage}
                  size="sm"
                  classNames={{ cursor: "bg-edf-blue rounded-none", item: "rounded-none" }}
                />
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
}
