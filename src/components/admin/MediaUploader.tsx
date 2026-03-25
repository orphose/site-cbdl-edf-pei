"use client";

import { Progress, Button } from "@nextui-org/react";
import {
  X,
  Image as ImageIcon,
  Upload,
  Plus,
} from "lucide-react";
import Image from "next/image";

interface MediaUploaderProps {
  /** Current image URL */
  imageUrl: string;
  /** Callback to clear the image */
  onClear: () => void;
  /** Ref for the hidden file input */
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  /** File select handler */
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Upload in progress */
  uploading: boolean;
  /** Upload progress percentage */
  uploadProgress: number;
  /** Upload error message */
  uploadError: string;
  /** Label text */
  label: string;
  /** Image fit mode */
  objectFit?: "cover" | "contain";
  /** Icon to show when empty */
  emptyIcon?: "image" | "upload";
}

export default function MediaUploader({
  imageUrl,
  onClear,
  fileInputRef,
  onFileSelect,
  uploading,
  uploadProgress,
  uploadError,
  label,
  objectFit = "cover",
  emptyIcon = "image",
}: MediaUploaderProps) {
  const EmptyIcon = emptyIcon === "upload" ? Upload : ImageIcon;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-edf-blue/50 transition-colors">
        {imageUrl ? (
          <div className="relative">
            <Image
              src={imageUrl}
              alt="Aperçu"
              width={300}
              height={200}
              className={`w-full ${objectFit === "contain" ? "h-32 object-contain bg-white" : "h-40 object-cover"} rounded-lg`}
            />
            <Button
              size="sm"
              isIconOnly
              variant="flat"
              className="absolute top-2 right-2 bg-white/90"
              onPress={onClear}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-8 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <EmptyIcon className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Cliquez pour uploader
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, WebP (max 5MB)
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={onFileSelect}
          className="hidden"
        />
        {uploading && (
          <Progress
            value={uploadProgress}
            className="mt-3"
            color="primary"
            size="sm"
          />
        )}
        {uploadError && (
          <p className="text-xs text-red-500 mt-2">{uploadError}</p>
        )}
      </div>
    </div>
  );
}

// Gallery component for news
interface GalleryUploaderProps {
  gallery: string[];
  onRemove: (index: number) => void;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GalleryUploader({
  gallery,
  onRemove,
  galleryInputRef,
  onFileSelect,
}: GalleryUploaderProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Galerie photos
        </label>
        <span className="text-xs text-gray-400">{gallery.length}/8</span>
      </div>

      {/* Grille des photos de la galerie */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {gallery.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={url}
              alt={`Galerie ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <Button
              size="sm"
              isIconOnly
              variant="flat"
              className="absolute top-1 right-1 bg-white/90 min-w-6 w-6 h-6"
              onPress={() => onRemove(index)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* Bouton ajouter si moins de 8 photos */}
      {gallery.length < 8 && (
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-edf-blue/50 transition-colors cursor-pointer"
          onClick={() => galleryInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Plus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Ajouter des photos
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {8 - gallery.length} emplacement
              {gallery.length < 7 ? "s" : ""} disponible
              {gallery.length < 7 ? "s" : ""}
            </p>
          </div>
        </div>
      )}

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
}
