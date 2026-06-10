"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Sparkles, Wand2, AlertCircle } from "lucide-react";
import { generateSlug } from "@/hooks/useNewsManager";
import type { NewsFormData, PartnershipFormData } from "@/types/admin";

interface AIGeneratorProps {
  type: "news" | "partnership";
  onGenerateNews?: (data: Partial<NewsFormData>) => void;
  onGeneratePartnership?: (data: Partial<PartnershipFormData>) => void;
  /** Description content shown in the AI panel */
  description: React.ReactNode;
  /** Placeholder text for the prompt textarea */
  placeholder: string;
}

export default function AIGenerator({
  type,
  onGenerateNews,
  onGeneratePartnership,
  description,
  placeholder,
}: AIGeneratorProps) {
  const [aiMode, setAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      setAiError("Décrivez ce que vous souhaitez rédiger");
      return;
    }

    setAiGenerating(true);
    setAiError("");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          prompt: aiPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la génération");
      }

      if (type === "news" && onGenerateNews) {
        onGenerateNews({
          title: data.title || undefined,
          slug: data.title ? generateSlug(data.title) : undefined,
          excerpt: data.excerpt || undefined,
          content: data.content || undefined,
        });
      } else if (type === "partnership" && onGeneratePartnership) {
        onGeneratePartnership({
          name: data.title || undefined,
          description: data.description || undefined,
        });
      }

      setAiPrompt("");
      setAiMode(false);
    } catch (error) {
      console.error("Erreur IA:", error);
      setAiError(
        error instanceof Error ? error.message : "Erreur de génération"
      );
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => {
          setAiMode(!aiMode);
          setAiPrompt("");
          setAiError("");
        }}
        className={`flex items-center gap-2 min-h-11 px-4 text-sm font-semibold transition-colors ${
          aiMode
            ? "bg-edf-blue text-white"
            : "border-2 border-edf-bleu-action text-edf-bleu-action hover:bg-edf-bleu-action hover:text-white"
        }`}
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        {aiMode ? "Fermer l'assistant IA" : "Rédiger avec l'assistant IA"}
      </button>

      {aiMode && (
        <div className="mt-4 p-5 bg-admin-bg border border-edf-gris-clair">
          <p className="text-sm text-edf-bleu-nuit mb-3 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-edf-bleu-action" aria-hidden="true" />
            {description}
          </p>
          <textarea
            placeholder={placeholder}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white border border-edf-gris-clair text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action resize-none"
          />
          {aiError && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              {aiError}
            </p>
          )}
          <div className="flex justify-end gap-2 mt-3">
            <Button
              size="sm"
              radius="none"
              variant="flat"
              className="bg-white border border-edf-gris-clair text-edf-bleu-nuit"
              onPress={() => {
                setAiMode(false);
                setAiPrompt("");
                setAiError("");
              }}
            >
              Annuler
            </Button>
            <Button
              size="sm"
              radius="none"
              className="bg-edf-bleu-action text-white font-semibold"
              startContent={
                aiGenerating ? null : <Sparkles className="w-4 h-4" />
              }
              isLoading={aiGenerating}
              onPress={generateWithAI}
            >
              {aiGenerating ? "Génération..." : "Générer tout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
