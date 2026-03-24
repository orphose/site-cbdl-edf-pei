# Refactoring UI — Typographie (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Designing Text" de Refactoring UI.
Approche pragmatique et systémique de la typographie orientée UI :
type scales, choix de fontes, line-height, alignement, letter-spacing.

---

### Establish a Type Scale

**Principe** — La plupart des interfaces utilisent trop de tailles
de police, parfois chaque valeur de 10px à 24px. Cela crée de
l'inconsistance et ralentit le travail.

**Règle / Heuristique** —

**Modular scales** (approche mathématique) :
- Base 16px + ratio (ex: 4:5 "major third", 2:3 "perfect fifth",
  1:1.618 "golden ratio"). Chaque taille = précédente × ratio.
- **Problèmes** : (1) valeurs fractionnelles (31.25px, 39.063px) →
  rendu subpixel incohérent entre navigateurs. Arrondir manuellement.
  (2) Pas assez de tailles pour le travail UI. Avec un ratio 3:4,
  on obtient 12, 16, 21, 28 → on manque de valeurs intermédiaires.

**Hand-crafted scales** (approche recommandée) :
- Choisir les valeurs manuellement. Pas de souci de subpixel.
  Contrôle total.
- **Échelle pratique** : `12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72`
  Suffisamment contrainte pour accélérer les décisions, assez riche
  pour ne jamais manquer une taille utile.

**Anti-pattern — em units** : les em sont relatifs à la taille
courante. Dans des éléments imbriqués, les tailles computées sortent
de l'échelle (1.25em dans un parent à 20px = un enfant à 0.875em
donne 17.5px, pas dans l'échelle). **Utiliser px ou rem uniquement.**

**Connexions** — Voir aussi → Limit Your Choices, `09-beaird-typographie.md`
§ taille CSS, Establish a Spacing System.

---

### Use Good Fonts

**Principe** — Séparer les bonnes fontes des mauvaises est intimidant
sans expérience. Quelques heuristiques fiables compensent le manque
de goût typographique.

**Règle / Heuristique** —

1. **Play it safe** : pour du travail UI, une sans-serif neutre.
   En dernier recours, le system font stack :
   `-apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue`

2. **Ignorer les fontes avec < 5 weights** : les familles riches
   en graisses (10+ styles, italiques compris) sont généralement
   mieux conçues. Sur Google Fonts, filtrer par "number of styles ≥ 10"
   élimine 85% des options, laissant ~50 sans-serifs.

3. **Optimize for legibility** : les fontes pour headlines ont
   un letter-spacing serré et un x-height court. Les fontes pour body
   ont un letter-spacing large et un x-height grand. Ne pas utiliser
   de fontes condensées à petit x-height pour du texte UI.

4. **Trust the wisdom of the crowd** : trier par popularité sur
   les directories de fontes.

5. **Steal from people who care** : inspecter les fontes des sites
   bien designés.

**Pièges** — Choisir une fonte "cool" sans vérifier sa lisibilité
à petite taille. Les fontes headline ne fonctionnent pas en body
même avec plus de letter-spacing.

**Connexions** — Voir aussi → Choose a Personality, `09-beaird-typographie.md`
§ catégories et caractéristiques.

---

### Keep Your Line Length in Check

**Principe** — Adapter le texte au layout au lieu d'optimiser l'expérience
de lecture est une erreur courante. Des lignes trop longues nuisent
à la lisibilité.

**Règle / Heuristique** —
- **Optimal : 45-75 caractères par ligne** (CPL).
- En CSS : `max-width: 20-35em` (relatif à la taille de fonte courante).
- Aller au-delà de 75 CPL est risqué ; rester dans la zone 45-75
  pour la sécurité.
- Si le contenu contient des images ou composants larges, limiter
  la largeur du texte indépendamment. Mixer des largeurs différentes
  dans la même zone de contenu produit un résultat plus soigné.

**Connexions** — Voir aussi → Line-Height Is Proportional,
`09-beaird-typographie.md` § mesure et lisibilité.

---

### Baseline, Not Center

**Principe** — Quand on mélange des tailles de fontes sur une même ligne
(titre + actions), l'instinct est de centrer verticalement. C'est incorrect.

**Règle / Heuristique** — Aligner par la baseline (ligne imaginaire
sur laquelle reposent les lettres). L'œil perçoit déjà cette référence ;
l'alignement baseline produit un résultat plus propre et simple
que le centrage vertical qui décale les baselines.

**Exemple** — Card header : titre 24px à gauche, action 14px à droite.
Aligner les deux sur leur baseline, pas centrer verticalement.

**Pièges** — Quand les textes sont espacés, le mauvais alignement
est moins visible. Quand ils sont proches, le décalage devient évident.

**Connexions** — Voir aussi → `09-beaird-typographie.md` § alignement.

---

### Line-Height Is Proportional

**Principe** — Un line-height de 1.5 est un bon point de départ
mais pas une valeur universelle. Le line-height optimal dépend
de deux facteurs : la longueur de ligne et la taille de police.

**Règle / Heuristique** —

1. **Proportionnel à la longueur de ligne** : contenu étroit →
   line-height court (~1.5). Contenu large → line-height plus grand
   (jusqu'à 2). Plus l'œil doit voyager horizontalement, plus
   il risque de perdre sa ligne.

2. **Inversement proportionnel à la taille de police** :
   - Texte petit → line-height plus grand (l'œil a besoin d'aide).
   - Titres grands → line-height peut descendre à 1 (l'œil n'a pas
     besoin d'aide, et un grand espacement semble disjoint).

**Résumé** :
| Contexte | Line-height |
|---|---|
| Body text, largeur normale | ~1.5 |
| Body text, très large | 1.75-2 |
| Petits captions/labels | 1.5-1.75 |
| Headlines grandes | 1-1.25 |

**Connexions** — Voir aussi → Keep Your Line Length in Check,
Establish a Type Scale.

---

### Not Every Link Needs a Color

**Principe** — Dans un bloc de texte non-lien, les liens doivent
être visuellement cliquables (couleur, underline). Mais dans une UI
où presque tout est un lien, ce traitement est surchargé.

**Règle / Heuristique** —
1. Pour les liens dans du texte continu → couleur distincte + underline.
2. Pour les liens de navigation/UI → traitement plus subtil :
   font-weight plus lourd ou couleur plus foncée.
3. Pour les liens auxiliaires (pas sur le chemin principal) →
   n'ajouter l'underline ou le changement de couleur qu'au hover.

**Connexions** — Voir aussi → Semantics Are Secondary (hiérarchie
des actions).

---

### Align with Readability in Mind

**Principe** — Le texte doit être aligné selon la direction de la langue
(gauche pour les langues occidentales). Les autres alignements ont
leur place mais exigent de la prudence.

**Règle / Heuristique** —
1. **Don't center long form text** : center est bien pour headlines
   ou blocs courts indépendants. Au-delà de 2-3 lignes → left-align.
   Si un bloc centré est trop long, réécrire plus court.
2. **Right-align numbers** : dans un tableau, aligner les nombres
   à droite pour que les décimales s'alignent → comparaison facilitée.
3. **Hyphenate justified text** : le justify sans hyphénation crée
   des "rivers" (espaces blancs irréguliers). Activer `hyphens: auto`.
   Le justified fonctionne mieux en contexte éditorial (magazine en ligne).

**Connexions** — Voir aussi → `09-beaird-typographie.md` § alignement,
Keep Your Line Length in Check.

---

### Use Letter-Spacing Effectively

**Principe** — Le letter-spacing par défaut d'une fonte est optimisé
pour son usage prévu. En général, ne pas y toucher. Deux exceptions.

**Règle / Heuristique** —

1. **Tighten headlines** : les fontes à large letter-spacing (ex: Open Sans)
   paraissent trop aérées en gros titres. Réduire le letter-spacing
   pour mimer le look condensé des fontes headline (ex: Oswald).
   **Attention** : l'inverse ne fonctionne pas — augmenter le letter-spacing
   d'une fonte headline ne la rend pas lisible en body.

2. **All-caps → augmenter le letter-spacing** : en "sentence case",
   les ascenders/descenders créent de la variation visuelle naturelle.
   En all-caps, toutes les lettres ont la même hauteur → le spacing
   par défaut les rend moins distinguables. Augmenter le letter-spacing
   compense ce manque de variation et améliore la lisibilité.

**Connexions** — Voir aussi → `09-beaird-typographie.md` § espacement,
Use Good Fonts § fontes headline vs body.
