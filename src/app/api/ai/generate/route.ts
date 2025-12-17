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
}

// Prompts système selon le type de contenu
const SYSTEM_PROMPTS = {
  news: `Tu es un rédacteur professionnel pour EDF PEI (Énergies Nouvelles Réparties) en Guyane française.
Tu rédiges des actualités pour la Centrale Bioénergie du Larivot (CBDL), une centrale biomasse innovante.

Tu dois générer un JSON avec exactement cette structure :
{
  "title": "Titre de l'actualité (max 80 caractères, accrocheur)",
  "excerpt": "Résumé court pour les listes (max 150 caractères)",
  "content": "Contenu complet de l'actualité (2-3 paragraphes)"
}

Règles de rédaction :
- Ton professionnel mais accessible
- Style journalistique concis
- Mets en avant les bénéfices pour la Guyane (emplois, énergie renouvelable, développement durable)
- Écris en français
- Retourne UNIQUEMENT le JSON, sans texte avant ou après`,

  partnership: `Tu es un rédacteur pour EDF PEI en Guyane française.
Tu décris des partenariats locaux pour la Centrale Bioénergie du Larivot (CBDL).

Tu dois générer un JSON avec exactement cette structure :
{
  "title": "Titre du partenariat (max 80 caractères)",
  "description": "Description du partenariat (MAXIMUM 280 caractères, TRÈS IMPORTANT)"
}

Règles de rédaction :
- Ton chaleureux et engagé
- Mets en avant l'ancrage local et les bénéfices pour la communauté guyanaise
- Montre l'engagement d'EDF PEI pour le développement durable
- Écris en français
- Retourne UNIQUEMENT le JSON, sans texte avant ou après`,
};

export async function POST(request: NextRequest) {
  try {
    // Vérifier la clé API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    assertEnvVar(apiKey, "ANTHROPIC_API_KEY");

    // Parser la requête
    const body: GenerateRequest = await request.json();
    const { type, prompt } = body;

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

    // Construire le message utilisateur
    const userMessage = type === "partnership"
      ? `Génère le titre et la description pour ce partenariat : ${prompt}`
      : `Génère le titre, le résumé et le contenu pour cette actualité : ${prompt}`;

    // Appeler Claude Opus 4.5
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5-20251101",
      max_tokens: 2000,
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

    // Parser le JSON de la réponse
    let generatedContent;
    try {
      // Nettoyer le texte pour extraire le JSON
      let jsonText = content.text.trim();
      
      // Enlever les backticks markdown si présents
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.slice(7);
      } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith("```")) {
        jsonText = jsonText.slice(0, -3);
      }
      jsonText = jsonText.trim();
      
      generatedContent = JSON.parse(jsonText);
    } catch {
      // Si le parsing échoue, retourner le texte brut
      console.error("Erreur parsing JSON, texte brut:", content.text);
      throw new Error("Format de réponse invalide");
    }

    // Valider et tronquer si nécessaire
    if (type === "partnership") {
      // Tronquer le titre si > 80 caractères
      if (generatedContent.title && generatedContent.title.length > 80) {
        generatedContent.title = generatedContent.title.substring(0, 77) + "...";
      }
      // Tronquer la description si > 280 caractères
      if (generatedContent.description && generatedContent.description.length > 280) {
        const truncated = generatedContent.description.substring(0, 277);
        const lastPeriod = truncated.lastIndexOf(".");
        if (lastPeriod > 200) {
          generatedContent.description = truncated.substring(0, lastPeriod + 1);
        } else {
          generatedContent.description = truncated + "...";
        }
      }
    } else {
      // Actualités : tronquer le titre si > 80 caractères
      if (generatedContent.title && generatedContent.title.length > 80) {
        generatedContent.title = generatedContent.title.substring(0, 77) + "...";
      }
      // Tronquer l'extrait si > 150 caractères
      if (generatedContent.excerpt && generatedContent.excerpt.length > 150) {
        generatedContent.excerpt = generatedContent.excerpt.substring(0, 147) + "...";
      }
    }

    return NextResponse.json({
      success: true,
      ...generatedContent,
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
