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
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Contenu (Markdown)
      </label>
      {/* Toolbar Markdown */}
      <div className="flex items-center gap-1 mb-2 p-2 bg-gray-100 rounded-t-xl border border-gray-200 border-b-0">
        <button
          type="button"
          onClick={() => insertMarkdown("**", "**")}
          className="px-2 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200 rounded"
          title="Gras"
        >
          G
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("*", "*")}
          className="px-2 py-1 text-xs italic text-gray-700 hover:bg-gray-200 rounded"
          title="Italique"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("## ")}
          className="px-2 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200 rounded"
          title="Titre"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("- ")}
          className="px-2 py-1 text-xs text-gray-700 hover:bg-gray-200 rounded"
          title="Liste"
        >
          Liste
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("[", "](url)")}
          className="px-2 py-1 text-xs text-gray-700 hover:bg-gray-200 rounded"
          title="Lien"
        >
          Lien
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setContentPreview(!contentPreview)}
          className={`px-3 py-1 text-xs rounded ${
            contentPreview
              ? "bg-edf-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {contentPreview ? "Éditer" : "Aperçu"}
        </button>
      </div>
      {contentPreview ? (
        <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-b-xl text-sm min-h-[288px] prose prose-sm max-w-none">
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <p className="text-gray-400 italic">Aucun contenu à afficher</p>
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
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-b-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-y font-mono"
        />
      )}
    </div>
  );
}
