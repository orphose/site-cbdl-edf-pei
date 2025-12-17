/**
 * API Route pour générer du contenu avec Claude
 * Utilisé par l'assistant de rédaction IA dans l'admin
 */
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// Validation des paramètres requis
function assertEnvVar(value: string | undefined, name: string): asserts value is string {
  if (!value) {
    throw new Error(`Variable d'environnement ${name} manquante`);
  }
}

// Types pour la requête
interface GenerateRequest {
  type: "news" | "partnership";
  prompt: string;
  maxLength?: number;
}

// Prompts système selon le type de contenu
const SYSTEM_PROMPTS = {
  news: `Tu es un rédacteur professionnel pour EDF PEI (Énergies Nouvelles Réparties) en Guyane française.
Tu rédiges des actualités pour la Centrale Bioénergie du Larivot (CBDL), une centrale biomasse innovante.

Règles de rédaction :
- Ton professionnel mais accessible
- Style journalistique concis
- Mets en avant les bénéfices pour la Guyane (emplois, énergie renouvelable, développement durable)
- Respecte la limite de caractères demandée
- Écris en français
- Ne commence pas par "Voici" ou des formules similaires, écris directement le contenu`,

  partnership: `Tu es un rédacteur pour EDF PEI en Guyane française.
Tu décris des partenariats locaux pour la Centrale Bioénergie du Larivot (CBDL).

Règles de rédaction :
- Maximum 280 caractères (TRÈS IMPORTANT - compte les caractères)
- Ton chaleureux et engagé
- Mets en avant l'ancrage local et les bénéfices pour la communauté guyanaise
- Montre l'engagement d'EDF PEI pour le développement durable
- Écris en français
- Ne commence pas par "Voici" ou des formules similaires, écris directement la description`,
};

export async function POST(request: NextRequest) {
  try {
    // Vérifier la clé API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    assertEnvVar(apiKey, "ANTHROPIC_API_KEY");

    // Parser la requête
    const body: GenerateRequest = await request.json();
    const { type, prompt, maxLength } = body;

    // Validation
    if (!type || !prompt) {
      return NextResponse.json(
        { error: "Type et prompt requis" },
        { status: 400 }
      );
    }

    if (!["news", "partnership"].includes(type)) {
      return NextResponse.json(
        { error: "Type invalide (news ou partnership)" },
        { status: 400 }
      );
    }

    // Initialiser le client Anthropic
    const anthropic = new Anthropic({
      apiKey,
    });

    // Construire le message utilisateur avec la limite de caractères
    const userMessage = type === "partnership"
      ? `Écris une description de partenariat (MAXIMUM 280 caractères) pour : ${prompt}`
      : maxLength
        ? `Écris une actualité (environ ${maxLength} caractères) sur : ${prompt}`
        : `Écris une actualité sur : ${prompt}`;

    // Appeler Claude
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5", // Modèle le plus récent disponible
      max_tokens: 1000,
      temperature: 0.7,
      system: SYSTEM_PROMPTS[type],
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // Extraire le texte de la réponse
    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Réponse inattendue de Claude");
    }

    let generatedText = content.text.trim();

    // Pour les partenariats, tronquer si nécessaire
    if (type === "partnership" && generatedText.length > 280) {
      // Trouver la dernière phrase complète avant 280 caractères
      const truncated = generatedText.substring(0, 277);
      const lastPeriod = truncated.lastIndexOf(".");
      if (lastPeriod > 200) {
        generatedText = truncated.substring(0, lastPeriod + 1);
      } else {
        generatedText = truncated + "...";
      }
    }

    return NextResponse.json({
      success: true,
      content: generatedText,
      length: generatedText.length,
    });
  } catch (error) {
    console.error("Erreur génération IA:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

