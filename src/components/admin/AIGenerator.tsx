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
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
          aiMode
            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
            : "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 hover:from-purple-100 hover:to-indigo-100 border border-purple-200"
        }`}
      >
        <Sparkles className="w-4 h-4" />
        {aiMode ? "Fermer l'assistant IA" : "Rédiger avec l'assistant IA"}
      </button>

      {aiMode && (
        <div className="mt-4 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
          <p className="text-sm text-purple-800 mb-3 flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            {description}
          </p>
          <textarea
            placeholder={placeholder}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 resize-none"
          />
          {aiError && (
            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {aiError}
            </p>
          )}
          <div className="flex justify-end gap-2 mt-3">
            <Button
              size="sm"
              variant="flat"
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
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
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
