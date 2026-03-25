"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
}: PartnershipEditorProps) {
  if (viewMode === "list") {
    return (
      <PartnershipList
        partnerships={partnerships}
        onCreatePartnership={onCreatePartnership}
        onEditPartnership={onEditPartnership}
        onDeletePartnership={onDeletePartnership}
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
}: {
  partnerships: Partnership[];
  onCreatePartnership: () => void;
  onEditPartnership: (item: Partnership) => void;
  onDeletePartnership: (id: string) => void;
}) {
  return (
    <Card className="mt-6 border border-gray-100 shadow-sm">
      <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Gestion des partenariats
          </h2>
          <p className="text-sm text-gray-500">Gérez vos partenaires</p>
        </div>
        <Button
          className="bg-edf-blue text-white font-medium"
          startContent={<Plus className="w-4 h-4" />}
          onPress={onCreatePartnership}
        >
          Nouveau partenaire
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        {partnerships.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-edf-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-edf-blue" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Ajoutez votre premier partenaire
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
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
          <Table
            aria-label="Liste des partenariats"
            classNames={{
              th: "bg-gray-50 text-gray-600 font-semibold",
              td: "py-4",
            }}
          >
            <TableHeader>
              <TableColumn>NOM</TableColumn>
              <TableColumn>CATÉGORIE</TableColumn>
              <TableColumn>STATUT</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Aucun partenariat">
              {partnerships.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.logo_url && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={getMediaUrl(item.logo_url)}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.color && (
                          <div
                            className="w-3 h-3 rounded-full mt-1"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.category ? (
                      <Chip
                        size="sm"
                        variant="flat"
                        className="bg-edf-blue/10 text-edf-blue"
                      >
                        {item.category}
                      </Chip>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.is_active ? (
                      <Chip color="success" variant="flat" size="sm">
                        Actif
                      </Chip>
                    ) : (
                      <Chip color="default" variant="flat" size="sm">
                        Inactif
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Modifier ${item.name}`}
                        onPress={() => onEditPartnership(item)}
                        className="text-gray-600 hover:text-edf-blue"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        aria-label={`Supprimer ${item.name}`}
                        onPress={() => onDeletePartnership(item.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              isIconOnly
              onPress={onBackToList}
              className="text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {editingPartnership
                  ? "Modifier le partenaire"
                  : "Nouveau partenaire"}
              </h2>
              <p className="text-sm text-gray-500">
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
                    className="block text-sm font-medium text-gray-700"
                  >
                    Titre du partenariat{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      partnershipForm.name.length > 80
                        ? "text-red-500 font-medium"
                        : "text-gray-400"
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
                    inputWrapper: `bg-gray-50 border ${
                      partnershipForm.name.length > 70
                        ? "border-orange-300"
                        : "border-gray-200"
                    }`,
                  }}
                />
                {partnershipForm.name.length > 70 && (
                  <p className="text-xs text-orange-500 mt-1">
                    Approche de la limite
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="partnership-description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <span
                    className={`text-xs ${
                      partnershipForm.description.length > 280
                        ? "text-red-500 font-medium"
                        : "text-gray-400"
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
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-none ${
                    partnershipForm.description.length > 250
                      ? "border-orange-300"
                      : "border-gray-200"
                  }`}
                />
                {partnershipForm.description.length > 250 && (
                  <p className="text-xs text-orange-500 mt-1">
                    Approche de la limite (
                    {280 - partnershipForm.description.length} caractères
                    restants)
                  </p>
                )}
              </div>

              {/* Color palette */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Couleur de l&apos;étiquette
                </label>

                <div className="space-y-3">
                  {Object.entries(COLOR_PALETTE).map(([groupName, colors]) => (
                    <div key={groupName} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">
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
                            className={`w-10 h-10 rounded-lg transition-all ${
                              partnershipForm.color === color.hex
                                ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
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
                  <span className="text-xs text-gray-500">Aperçu :</span>
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
                className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
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
                    <p className="font-medium text-gray-900">Actif</p>
                    <p className="text-sm text-gray-500">Visible sur le site</p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                      partnershipForm.is_active ? "bg-green-500" : "bg-gray-300"
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
