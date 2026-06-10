"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Chip,
} from "@nextui-org/react";
import {
  Users,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  AlertCircle,
  Save,
  Check,
  GripVertical,
  Search,
} from "lucide-react";
import Image from "next/image";
import { getMediaUrl } from "@/lib/supabase";
import type { Partnership, PartnershipFormData, ViewMode } from "@/types/admin";
import MediaUploader from "@/components/admin/MediaUploader";
import AIGenerator from "@/components/admin/AIGenerator";

// EDF color palette
const COLOR_PALETTE = {
  Orange: [
    { hex: "#FE5716", name: "Foncé" },
    { hex: "#FF861D", name: "Moyen" },
    { hex: "#FFB210", name: "Clair" },
  ],
  Bleu: [
    { hex: "#001A70", name: "Foncé" },
    { hex: "#1057C8", name: "Moyen" },
    { hex: "#1089FF", name: "Clair" },
  ],
  Vert: [
    { hex: "#4F9E30", name: "Foncé" },
    { hex: "#88D910", name: "Moyen" },
    { hex: "#C0E410", name: "Clair" },
  ],
};

interface PartnershipEditorProps {
  partnerships: Partnership[];
  viewMode: ViewMode;
  editingPartnership: Partnership | null;
  partnershipForm: PartnershipFormData;
  setPartnershipForm: (form: PartnershipFormData) => void;
  saving: boolean;
  saveSuccess: boolean;
  saveError: string | null;
  uploading: boolean;
  uploadProgress: number;
  uploadError: string;
  partnershipFileInputRef: React.RefObject<HTMLInputElement | null>;
  onCreatePartnership: () => void;
  onEditPartnership: (item: Partnership) => void;
  onDeletePartnership: (id: string) => void;
  onSavePartnership: () => void;
  onBackToList: () => void;
  onPartnershipFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReorder: (orderedIds: string[]) => void;
}

export default function PartnershipEditor({
  partnerships,
  viewMode,
  editingPartnership,
  partnershipForm,
  setPartnershipForm,
  saving,
  saveSuccess,
  saveError,
  uploading,
  uploadProgress,
  uploadError,
  partnershipFileInputRef,
  onCreatePartnership,
  onEditPartnership,
  onDeletePartnership,
  onSavePartnership,
  onBackToList,
  onPartnershipFileSelect,
  onReorder,
}: PartnershipEditorProps) {
  if (viewMode === "list") {
    return (
      <PartnershipList
        partnerships={partnerships}
        onCreatePartnership={onCreatePartnership}
        onEditPartnership={onEditPartnership}
        onDeletePartnership={onDeletePartnership}
        onReorder={onReorder}
      />
    );
  }

  return (
    <PartnershipForm
      editingPartnership={editingPartnership}
      partnershipForm={partnershipForm}
      setPartnershipForm={setPartnershipForm}
      saving={saving}
      saveSuccess={saveSuccess}
      saveError={saveError}
      uploading={uploading}
      uploadProgress={uploadProgress}
      uploadError={uploadError}
      partnershipFileInputRef={partnershipFileInputRef}
      onSavePartnership={onSavePartnership}
      onBackToList={onBackToList}
      onPartnershipFileSelect={onPartnershipFileSelect}
    />
  );
}

// --- Partnership List ---

function PartnershipList({
  partnerships,
  onCreatePartnership,
  onEditPartnership,
  onDeletePartnership,
  onReorder,
}: {
  partnerships: Partnership[];
  onCreatePartnership: () => void;
  onEditPartnership: (item: Partnership) => void;
  onDeletePartnership: (id: string) => void;
  onReorder: (orderedIds: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      partnerships.filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      ),
    [partnerships, q]
  );

  // Le glisser-déposer n'a de sens que sur la liste complète, dans l'ordre.
  const canReorder = q === "";

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) {
      setDragId(null);
      return;
    }
    const ids = partnerships.map((p) => p.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from === -1 || to === -1) {
      setDragId(null);
      return;
    }
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    onReorder(ids);
    setDragId(null);
  };

  return (
    <Card radius="none" shadow="none" className="mt-6 border border-edf-gris-clair">
      <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-edf-gris-clair">
        <div>
          <h2 className="text-lg font-bold text-edf-bleu-nuit">
            Gestion des partenariats
          </h2>
          <p className="text-sm text-edf-bleu-nuit/70">
            Glissez les lignes pour réordonner l&apos;affichage sur le site
          </p>
        </div>
        <Button
          radius="none" className="bg-edf-blue text-white font-medium"
          startContent={<Plus className="w-4 h-4" />}
          onPress={onCreatePartnership}
        >
          Nouveau partenaire
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        {partnerships.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-admin-bg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-edf-blue" />
            </div>
            <h3 className="text-lg font-bold text-edf-bleu-nuit mb-2">
              Ajoutez votre premier partenaire
            </h3>
            <p className="text-edf-bleu-nuit/70 text-sm mb-6 max-w-md mx-auto">
              Les partenariats apparaîtront sur la page dédiée du site.
            </p>
            <Button
              onPress={onCreatePartnership}
              className="bg-edf-blue text-white"
              radius="none"
            >
              Créer un partenariat
            </Button>
          </div>
        ) : (
          <div>
            <div className="px-6 py-4 border-b border-edf-gris-clair">
              <Input
                aria-label="Rechercher un partenaire"
                size="sm"
                placeholder="Rechercher un partenaire…"
                value={query}
                onValueChange={setQuery}
                startContent={<Search className="w-4 h-4 text-edf-bleu-nuit/40" />}
                isClearable
                onClear={() => setQuery("")}
                classNames={{
                  inputWrapper: "bg-white border border-edf-gris-clair rounded-none",
                  base: "sm:max-w-xs",
                }}
              />
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-14 text-edf-bleu-nuit/70 text-sm">
                Aucun partenaire ne correspond à cette recherche.
              </div>
            ) : (
              <ul className="divide-y divide-edf-gris-clair/70 list-none">
                {filtered.map((item) => (
                  <li
                    key={item.id}
                    draggable={canReorder}
                    onDragStart={() => canReorder && setDragId(item.id)}
                    onDragOver={(e) => canReorder && e.preventDefault()}
                    onDrop={() => canReorder && handleDrop(item.id)}
                    onDragEnd={() => setDragId(null)}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                      dragId === item.id ? "bg-edf-bleu-action/5 opacity-60" : "hover:bg-admin-bg"
                    }`}
                  >
                    {canReorder ? (
                      <span
                        className="cursor-grab active:cursor-grabbing text-edf-gris-clair hover:text-edf-bleu-nuit/70 touch-none"
                        aria-hidden="true"
                        title="Glisser pour réordonner"
                      >
                        <GripVertical className="w-5 h-5" />
                      </span>
                    ) : (
                      <span className="w-5" aria-hidden="true" />
                    )}

                    {item.logo_url ? (
                      <div className="w-10 h-10 overflow-hidden bg-admin-bg flex-shrink-0">
                        <Image
                          src={getMediaUrl(item.logo_url)}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 flex-shrink-0"
                        style={{ backgroundColor: `${item.color ?? "#001A70"}1a` }}
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-edf-bleu-nuit truncate">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-xs text-edf-bleu-nuit/70 truncate">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.is_active ? (
                      <Chip color="success" variant="flat" size="sm" radius="none">
                        Actif
                      </Chip>
                    ) : (
                      <Chip color="default" variant="flat" size="sm" radius="none">
                        Inactif
                      </Chip>
                    )}

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Modifier ${item.name}`}
                        onPress={() => onEditPartnership(item)}
                        radius="none" className="text-edf-bleu-nuit/70 hover:text-edf-bleu-action"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Supprimer ${item.name}`}
                        onPress={() => onDeletePartnership(item.id)}
                        radius="none" className="text-edf-bleu-nuit/70 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

// --- Partnership Form ---

function PartnershipForm({
  editingPartnership,
  partnershipForm,
  setPartnershipForm,
  saving,
  saveSuccess,
  saveError,
  uploading,
  uploadProgress,
  uploadError,
  partnershipFileInputRef,
  onSavePartnership,
  onBackToList,
  onPartnershipFileSelect,
}: Omit<
  PartnershipEditorProps,
  | "partnerships"
  | "viewMode"
  | "onCreatePartnership"
  | "onEditPartnership"
  | "onDeletePartnership"
  | "onReorder"
>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <Card radius="none" shadow="none" className="border border-edf-gris-clair">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-edf-gris-clair">
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              isIconOnly
              onPress={onBackToList}
              radius="none" className="text-edf-bleu-nuit/70"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-lg font-bold text-edf-bleu-nuit">
                {editingPartnership
                  ? "Modifier le partenaire"
                  : "Nouveau partenaire"}
              </h2>
              <p className="text-sm text-edf-bleu-nuit/70">
                {editingPartnership
                  ? "Modifiez les informations"
                  : "Ajoutez un partenaire"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saveError && (
              <Chip
                color="danger"
                variant="flat"
                startContent={<AlertCircle className="w-4 h-4" />}
              >
                {saveError}
              </Chip>
            )}
            {saveSuccess && (
              <Chip
                color="success"
                variant="flat"
                startContent={<Check className="w-4 h-4" />}
              >
                Enregistré
              </Chip>
            )}
            <Button
              radius="none"
              className="bg-edf-blue text-white font-medium"
              startContent={saving ? null : <Save className="w-4 h-4" />}
              onPress={onSavePartnership}
              isLoading={saving}
              isDisabled={!partnershipForm.name}
            >
              {editingPartnership ? "Enregistrer" : "Créer"}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          {/* Assistant IA */}
          <AIGenerator
            type="partnership"
            description={
              <>Décrivez le partenariat, l&apos;IA génère <strong>titre + description</strong></>
            }
            placeholder="Ex: Partenariat avec la miellerie de Macouria pour installer des ruches sur le site et favoriser la biodiversité locale..."
            onGeneratePartnership={(data) => {
              setPartnershipForm({
                ...partnershipForm,
                name: data.name || partnershipForm.name,
                description: data.description || partnershipForm.description,
              });
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="partnership-name"
                    className="block text-sm font-medium text-edf-bleu-nuit"
                  >
                    Titre du partenariat{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      partnershipForm.name.length > 80
                        ? "text-red-600 font-medium"
                        : "text-edf-bleu-nuit/70"
                    }`}
                  >
                    {partnershipForm.name.length}/80
                  </span>
                </div>
                <Input
                  id="partnership-name"
                  placeholder="Ex: Électrification du village Palikour"
                  value={partnershipForm.name}
                  onChange={(e) => {
                    if (e.target.value.length <= 80) {
                      setPartnershipForm({
                        ...partnershipForm,
                        name: e.target.value,
                      });
                    }
                  }}
                  size="lg"
                  classNames={{
                    inputWrapper: `bg-white rounded-none border ${
                      partnershipForm.name.length > 70
                        ? "border-edf-orange-light"
                        : "border-edf-gris-clair"
                    }`,
                  }}
                />
                {partnershipForm.name.length > 70 && (
                  <p className="text-xs text-edf-orange-text mt-1">
                    Approche de la limite
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="partnership-description"
                    className="block text-sm font-medium text-edf-bleu-nuit"
                  >
                    Description
                  </label>
                  <span
                    className={`text-xs ${
                      partnershipForm.description.length > 280
                        ? "text-red-600 font-medium"
                        : "text-edf-bleu-nuit/70"
                    }`}
                  >
                    {partnershipForm.description.length}/280
                  </span>
                </div>
                <textarea
                  id="partnership-description"
                  placeholder="Décrivez le partenariat et son impact..."
                  value={partnershipForm.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 280) {
                      setPartnershipForm({
                        ...partnershipForm,
                        description: e.target.value,
                      });
                    }
                  }}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white border text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action resize-none ${
                    partnershipForm.description.length > 250
                      ? "border-edf-orange-light"
                      : "border-edf-gris-clair"
                  }`}
                />
                {partnershipForm.description.length > 250 && (
                  <p className="text-xs text-edf-orange-text mt-1">
                    Approche de la limite (
                    {280 - partnershipForm.description.length} caractères
                    restants)
                  </p>
                )}
              </div>

              {/* Color palette */}
              <div>
                <label className="block text-sm font-medium text-edf-bleu-nuit mb-3">
                  Couleur de l&apos;étiquette
                </label>

                <div className="space-y-3">
                  {Object.entries(COLOR_PALETTE).map(([groupName, colors]) => (
                    <div key={groupName} className="flex items-center gap-2">
                      <span className="text-xs text-edf-bleu-nuit/70 w-16">
                        {groupName}
                      </span>
                      <div className="flex gap-2">
                        {colors.map((color) => (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() =>
                              setPartnershipForm({
                                ...partnershipForm,
                                color: color.hex,
                              })
                            }
                            className={`w-10 h-10 transition-all ${
                              partnershipForm.color === color.hex
                                ? "ring-2 ring-offset-2 ring-edf-bleu-nuit scale-110"
                                : "hover:scale-105"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-edf-bleu-nuit/70">Aperçu :</span>
                  <span
                    className="px-3 py-1.5 text-xs font-medium text-white"
                    style={{ backgroundColor: partnershipForm.color }}
                  >
                    PARTENARIAT LOCAL
                  </span>
                </div>
              </div>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              <MediaUploader
                imageUrl={partnershipForm.logo_url}
                onClear={() =>
                  setPartnershipForm({
                    ...partnershipForm,
                    logo_url: "",
                  })
                }
                fileInputRef={partnershipFileInputRef}
                onFileSelect={onPartnershipFileSelect}
                uploading={uploading}
                uploadProgress={uploadProgress}
                uploadError={uploadError}
                label="Photo du partenariat"
                objectFit="contain"
                emptyIcon="upload"
              />

              {/* Active toggle */}
              <div
                role="switch"
                aria-checked={partnershipForm.is_active}
                tabIndex={0}
                className="p-4 bg-admin-bg cursor-pointer hover:bg-edf-gris-clair/50 transition-colors"
                onClick={() =>
                  setPartnershipForm({
                    ...partnershipForm,
                    is_active: !partnershipForm.is_active,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setPartnershipForm({
                      ...partnershipForm,
                      is_active: !partnershipForm.is_active,
                    });
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-edf-bleu-nuit">Actif</p>
                    <p className="text-sm text-edf-bleu-nuit/70">Visible sur le site</p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                      partnershipForm.is_active ? "bg-edf-green-dark" : "bg-edf-gris-clair"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        partnershipForm.is_active
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
