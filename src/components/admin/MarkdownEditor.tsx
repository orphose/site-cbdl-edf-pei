"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  onChange,
}: MarkdownEditorProps) {
  const [contentPreview, setContentPreview] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Fonctions d'insertion Markdown
  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = content;
    const selected = text.substring(start, end);
    const newText =
      text.substring(0, start) + before + selected + after + text.substring(end);
    onChange(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  };

  return (
    <div>
      <label
        htmlFor="news-content"
        className="block text-sm font-medium text-edf-bleu-nuit mb-2"
      >
        Contenu (Markdown)
      </label>
      {/* Toolbar Markdown */}
      <div className="flex items-center gap-1 p-2 bg-admin-bg border border-edf-gris-clair border-b-0">
        <button
          type="button"
          onClick={() => insertMarkdown("**", "**")}
          className="px-2 py-1 text-xs font-bold text-edf-bleu-nuit hover:bg-edf-gris-clair"
          title="Gras"
        >
          G
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("*", "*")}
          className="px-2 py-1 text-xs italic text-edf-bleu-nuit hover:bg-edf-gris-clair"
          title="Italique"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("## ")}
          className="px-2 py-1 text-xs font-bold text-edf-bleu-nuit hover:bg-edf-gris-clair"
          title="Titre"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("- ")}
          className="px-2 py-1 text-xs text-edf-bleu-nuit hover:bg-edf-gris-clair"
          title="Liste"
        >
          Liste
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("[", "](url)")}
          className="px-2 py-1 text-xs text-edf-bleu-nuit hover:bg-edf-gris-clair"
          title="Lien"
        >
          Lien
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setContentPreview(!contentPreview)}
          className={`px-3 py-1 text-xs ${
            contentPreview
              ? "bg-edf-blue text-white"
              : "text-edf-bleu-nuit hover:bg-edf-gris-clair"
          }`}
        >
          {contentPreview ? "Éditer" : "Aperçu"}
        </button>
      </div>
      {contentPreview ? (
        <div className="w-full px-4 py-3 bg-white border border-edf-gris-clair text-sm min-h-[288px] prose prose-sm max-w-none">
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <p className="text-edf-bleu-nuit/40 italic">Aucun contenu à afficher</p>
          )}
        </div>
      ) : (
        <textarea
          id="news-content"
          ref={contentRef}
          placeholder="Contenu complet de l'actualité (supporte le Markdown)"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 bg-white border border-edf-gris-clair text-sm text-edf-bleu-nuit focus:outline-none focus:ring-2 focus:ring-edf-bleu-action/20 focus:border-edf-bleu-action resize-y font-mono"
        />
      )}
    </div>
  );
}
