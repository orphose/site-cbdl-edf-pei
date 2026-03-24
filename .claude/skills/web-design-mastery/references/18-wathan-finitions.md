# Refactoring UI — Finitions & Polissage (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Finishing Touches" de Refactoring UI.
Techniques de polissage pour transformer un design "correct" en un design
"soigné" : supercharge des defaults, borders accent, backgrounds,
empty states, séparation sans borders, et pensée non-conventionnelle.

---

### Supercharge the Defaults

**Principe** — Pas besoin d'ajouter de nouveaux éléments pour donner
du caractère. On peut vivifier ce qui existe déjà en le remplaçant
par une version plus riche.

**Règle / Heuristique** —

| Élément par défaut | Version supercharged |
|---|---|
| Puces (bullet list) | Icônes (checkmarks, flèches, icônes thématiques : cadenas pour sécurité, etc.) |
| Guillemets de citation | Grand guillemet décoratif, taille augmentée, couleur d'accent |
| Liens | Couleur + font-weight customs, ou underline épaisse et colorée qui chevauche partiellement le texte |
| Checkboxes / radios | Customs avec couleur de marque pour l'état sélectionné |

**Pièges** — Ne pas en abuser au point de surcharger. L'objectif est
d'ajouter de la personnalité, pas de la distraction.

**Connexions** — Voir aussi → Think Outside the Box, Add Color with
Accent Borders, Choose a Personality.

---

### Add Color with Accent Borders

**Principe** — Quand on n'est pas graphiste et qu'on n'a pas de belles
photos ou illustrations, un simple rectangle coloré peut faire
une grande différence.

**Règle / Heuristique** — Placements typiques pour un accent border :
- **Top d'une card** : barre de couleur en haut.
- **Navigation active** : indicateur coloré sur l'item actif (top ou left).
- **Side d'un message d'alerte** : bordure gauche colorée.
- **Sous un headline** : petit trait coloré en accent.
- **Top du layout entier** : barre de couleur en haut de la page.

**Technique** — Aucune compétence graphique requise. C'est littéralement
un rectangle coloré. Peut utiliser un gradient pour plus de dynamisme.

**Connexions** — Voir aussi → `07-beaird-couleur.md` § accent colors,
Decorate Your Backgrounds.

---

### Decorate Your Backgrounds

**Principe** — Même avec une bonne hiérarchie, un bon espacement
et une bonne typographie, un design peut paraître plat/monotone.
Décorer les backgrounds ajoute de la vie sans changer la structure.

**Règle / Heuristique** —

1. **Changer la couleur de fond** : colorer une section pour la distinguer.
   Gradient subtil (deux hues à < 30° d'écart) pour un look plus dynamique.

2. **Repeating pattern** : motif répétable subtil (ex: Hero Patterns).
   Peut couvrir tout le fond ou seulement un bord (pattern linéaire).
   **Contraste bas** entre fond et pattern pour ne pas nuire à la lisibilité.

3. **Shape ou illustration** : formes géométriques simples ou petits
   morceaux de pattern placés à des positions spécifiques. Même une carte
   du monde simplifiée peut fonctionner.
   **Contraste bas** obligatoire pour ne pas interférer avec le contenu.

**Connexions** — Voir aussi → `08-beaird-texture.md` § motifs CSS
et patterns, Add Color with Accent Borders.

---

### Don't Overlook Empty States

**Principe** — Le designer passe du temps à créer des maquettes avec
des données réalistes, mais l'utilisateur réel voit d'abord un écran vide.
L'empty state est la première interaction — il mérite autant d'attention
que l'état peuplé.

**Règle / Heuristique** —
1. Image ou illustration pour capter l'attention.
2. CTA proéminent pour encourager la prochaine action.
3. Masquer les éléments d'UI inutiles (tabs, filtres) tant qu'il n'y a
   pas de contenu à filtrer/trier.
4. L'empty state est une opportunité d'être intéressant et engageant
   — pas juste "No data found".

**Contexte spécifique** :
- **SaaS / Dashboard** : l'empty state est le onboarding de facto.
  Guider l'utilisateur vers sa première action.
- **E-commerce** : panier vide → suggestion de produits populaires.
- **App mobile-first** : l'empty state doit être léger, rapide à charger.

**Connexions** — Voir aussi → `04-frost-workflow.md` § design des états,
Supercharge the Defaults.

---

### Use Fewer Borders

**Principe** — Les borders sont le réflexe par défaut pour séparer
les éléments, mais trop de borders rendent le design chargé et bruyant.

**Règle / Heuristique** — Trois alternatives aux borders :

1. **Box shadow** : outline un élément comme une border mais en plus
   subtil. Fonctionne surtout quand l'élément n'a pas le même fond
   que son parent.

2. **Deux couleurs de fond différentes** : donner des fonds légèrement
   différents aux éléments adjacents suffit souvent. Si on utilise déjà
   deux fonds + une border, essayer de retirer la border.

3. **Plus d'espacement** : augmenter l'espace entre les groupes
   d'éléments est la façon la plus propre de créer de la séparation
   sans ajouter de nouveau décor visuel.

**Pièges** — Combiner les trois techniques avec des borders crée
une redondance visuelle. Choisir un seul mécanisme de séparation.

**Connexions** — Voir aussi → Avoid Ambiguous Spacing, `08-beaird-texture.md`
§ lignes et formes, Even Flat Designs Can Have Depth.

---

### Think Outside the Box

**Principe** — Beaucoup de conventions sur l'apparence des composants
(dropdown = liste blanche avec shadow, table = colonnes de texte brut,
radio = cercles + labels) sont des idées reçues. On peut faire beaucoup
plus créatif.

**Règle / Heuristique** —

| Composant | Version conventionnelle | Idées alternatives |
|---|---|---|
| **Dropdown** | Liste de liens | Sections, multi-colonnes, texte de support, icônes colorées |
| **Table** | 1 donnée par colonne | Combiner colonnes reliées + hiérarchie (nom + email dans une seule cellule), ajouter images/couleurs |
| **Radio buttons** | Cercles + labels | Selectable cards avec description et icônes |

**Heuristique** — Si une colonne de table n'a pas besoin d'être sortable,
elle peut être combinée avec une colonne liée pour créer de la hiérarchie.

**Exercice pratique** (Leveling Up) :
1. **Look for decisions you wouldn't have made** : observer les designs
   qu'on admire, identifier les choix surprenants (datepicker à fond inversé,
   bouton dans un input, deux couleurs de texte dans un headline).
2. **Rebuild favorite interfaces** : recréer sans DevTools pour découvrir
   les tricks (reduce line-height for headings, letter-spacing for uppercase,
   multiple shadows).

**Connexions** — Voir aussi → Supercharge the Defaults, Choose a Personality,
`04-frost-workflow.md` § element collages, `02-frost-methodologie.md`
§ créativité dans les organismes.
