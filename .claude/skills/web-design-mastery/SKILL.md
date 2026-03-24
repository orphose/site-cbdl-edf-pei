---
name: web-design-mastery
description: >
  Référence experte ultra-complète pour le design web, synthétisant "Atomic Design" (Frost),
  "Principles of Beautiful Web Design" (Beaird) et "Refactoring UI" (Wathan & Schoger).
  Déclencher dès que la demande touche à la conception, critique, amélioration, audit ou
  refactorisation d'une interface — même sans mention explicite de "design". Couvre : design
  systems, atomic design, pattern libraries, hiérarchie visuelle, layout, grille, spacing systems,
  responsive, couleur (HSL, palettes, WCAG), typographie (type scales, fontes, line-height),
  imagerie, profondeur (ombres, élévation), texture, finitions (accent borders, empty states),
  processus (feature-first, style tiles). Déclencher aussi pour : choix de couleurs, "ça fait moche",
  review de maquette, composant UI, landing page, dashboard, e-commerce, app mobile, design tokens,
  choix de fonte, espacement, ombres, accessibilité visuelle, ou tout principe visuel d'interface.
---

# Web Design Mastery
## Référence complète : Atomic Design (Frost) + Beautiful Web Design (Beaird) + Refactoring UI (Wathan & Schoger)

---

## ROUTING : quel fichier de référence lire ?

Avant toute réponse, identifier la nature de la demande et charger le(s) fichier(s) correspondant(s) :

### Frost — Systèmes & Atomic Design

| Domaine | Fichier |
|---|---|
| Modularité web, problème de la métaphore « page », style guides, frameworks UI | `references/01-frost-systemes.md` |
| Atomic Design : atomes, molécules, organismes, templates, pages — définitions et règles exactes | `references/02-frost-methodologie.md` |
| Pattern Lab, outils de pattern library, données dynamiques, viewport testing | `references/03-frost-outils.md` |
| Workflow collaboratif, inventaire UI, process design/dev, livrables, waterfall vs. itératif | `references/04-frost-workflow.md` |
| Maintenance, gouvernance, holy grail, équipes makers/users, communication, évolution | `references/05-frost-maintenance.md` |

### Beaird — Principes Visuels

| Domaine | Fichier |
|---|---|
| Layout, composition, grille, règle des tiers, balance, unité, emphase, anatomie de page | `references/06-beaird-layout.md` |
| Couleur : psychologie, température, valeur, saturation, schémas, palettes, hex | `references/07-beaird-couleur.md` |
| Texture : points, lignes, formes, volume/profondeur, patterns CSS, styles de texture | `references/08-beaird-texture.md` |
| Typographie : fontes, espacement, alignement, catégories, taille CSS, ponctuation | `references/09-beaird-typographie.md` |
| Imagerie : sélection, sources, recadrage, Photoshop, formats, bordures CSS | `references/10-beaird-imagerie.md` |

### Wathan & Schoger — Refactoring UI

| Domaine | Fichier |
|---|---|
| Processus de démarrage : feature-first, detail later, cycles courts, personnalité, systématisation | `references/11-wathan-processus.md` |
| Hiérarchie visuelle : font weight/color vs size, labels, actions, sémantique vs visuel | `references/12-wathan-hierarchie.md` |
| Layout & spacing : white space, spacing system non-linéaire, grilles vs fixe, sizing relatif, ambiguïté | `references/13-wathan-layout.md` |
| Typographie : type scale (modular vs hand-crafted), fontes, line-height, baseline, letter-spacing | `references/14-wathan-typographie.md` |
| Couleur : HSL, palettes 9 teintes, perceived brightness, rotation de hue, gris saturés, accessibilité | `references/15-wathan-couleur.md` |
| Profondeur & ombres : simulation lumière, élévation, two-part shadows, flat depth, overlapping | `references/16-wathan-profondeur.md` |
| Images : photos, texte sur images (overlay, colorize), scaling, contenu user-uploaded | `references/17-wathan-images.md` |
| Finitions : supercharge defaults, accent borders, backgrounds décoratifs, empty states, fewer borders, think outside the box | `references/18-wathan-finitions.md` |

**Règle :** Pour les demandes couvrant plusieurs domaines, lire tous les fichiers concernés avant de répondre.

---

## PRINCIPES TRANSVERSAUX (les trois ouvrages)

### Du côté de Frost (systèmes)
1. **Concevoir des systèmes, pas des pages** — L'unité de mesure est le composant, pas la page
2. **Modularité obligatoire** — Multi-device + multi-contexte = seul un système de composants réutilisables tient à l'échelle
3. **Atomic design = modèle mental, non processus linéaire** — On traverse les niveaux dans les deux sens simultanément
4. **DRY (Don't Repeat Yourself)** — Un seul endroit pour chaque pattern ; toute modification se propage
5. **Le navigateur est la vérité** — Les comps statiques sont des hypothèses ; seul le browser confirme ou infirme
6. **Collaboration cross-disciplinaire** — Designers + devs + PMs côte à côte, jamais en séquence waterfall
7. **Le système est un produit vivant** — Jamais terminé, toujours en évolution, nécessite maintenance active

### Du côté de Beaird (visuels)
1. **Design = communication** — Usabilité ET esthétique sont inséparables
2. **Contenu d'abord** — Le design sert le contenu ; jamais l'inverse
3. **Good design is timeless** — Fuir les tendances au profit de principes durables
4. **Tout est relation** — La qualité tient aux rapports entre éléments, pas aux éléments isolés
5. **Intention à chaque pixel** — Aucun élément ne doit être « haphazard »
6. **Papier avant ordinateur** — Esquisser d'abord

### Du côté de Wathan & Schoger (pragmatisme)
1. **Start with a feature, not a layout** — Commencer par la fonctionnalité, pas le chrome
2. **Hierarchy is Everything** — La hiérarchie visuelle est le facteur n°1 d'un design "qui a l'air bien"
3. **Systemize everything** — Prédéfinir des valeurs contraintes pour chaque propriété visuelle (couleur, spacing, type, shadows, border-radius)
4. **Detail comes later** — Low-fi d'abord, grayscale d'abord, couleur ensuite
5. **Less is more (borders, labels, complexity)** — Enlever avant d'ajouter : moins de borders, moins de labels, plus d'espace
6. **Don't design too much** — Cycles courts, plus petite version utile, itération sur le réel
7. **Emulate light** — La profondeur vient de la simulation cohérente d'une source lumineuse
8. **Think outside the box** — Les conventions ne sont pas des contraintes

---

## MAPPING DES COMPLÉMENTARITÉS ENTRE OUVRAGES

Les trois ouvrages se complètent. Voici les axes où ils convergent ou se renforcent :

| Sujet | Frost | Beaird | Wathan & Schoger |
|---|---|---|---|
| **Layout / Grille** | Breakpoints, fluid design | Règle des tiers, golden ratio, grille de composition | Grids are overrated, spacing system, don't fill the screen |
| **Couleur** | — | Théorie, psychologie, schémas harmoniques | HSL pratique, palettes 9 teintes, perceived brightness, hue rotation |
| **Typographie** | — | Catégories, espacement, fontes web | Type scale, line-height proportional, baseline alignment, letter-spacing |
| **Hiérarchie** | Niveaux atomiques | Emphase, contraste, placement | Weight vs contrast, labels, actions pyramid, de-emphasize competitors |
| **Ombres / Profondeur** | — | Texture, volume, CSS effects | Light simulation, elevation system, two-part shadows, flat depth |
| **Images** | — | Sélection, recadrage, formats, bordures | Text on images, scaling, user-uploaded content |
| **Processus** | Inventaire UI, element collages, style tiles | Papier d'abord, questions client | Feature-first, cycles courts, grayscale-first |
| **Systèmes** | Atomic design, pattern library, gouvernance | — | Constrained value sets (spacing, color, type, shadows) |
| **Finitions** | — | — | Accent borders, supercharged defaults, empty states, fewer borders |

---

## CHECKLIST UNIVERSELLE D'ÉVALUATION D'UNE INTERFACE

### Système (Frost)
- [ ] Les composants sont-ils atomisés (atomes → molécules → organismes) ?
- [ ] Existe-t-il une pattern library reflétant l'état réel du produit ?
- [ ] Les patterns sont-ils DRY (pas de duplication) ?
- [ ] Les noms de patterns sont-ils context-agnostiques ?
- [ ] La grille des breakpoints a-t-elle été testée sur toute la résolution spectrum ?
- [ ] Y a-t-il une gouvernance clairement définie ?

### Hiérarchie & Structure (Wathan & Schoger)
- [ ] Chaque élément a-t-il un rôle clair (primaire / secondaire / tertiaire) ?
- [ ] La hiérarchie est-elle portée par weight + color, pas seulement par size ?
- [ ] Les labels sont-ils minimisés (données auto-descriptives, combinées, ou labels secondaires) ?
- [ ] Les actions ont-elles des niveaux visuels distincts (primary solid, secondary outline, tertiary link) ?
- [ ] L'espacement est-il non-ambigu (intra-groupe < inter-groupe) ?
- [ ] Les propriétés visuelles viennent-elles d'un système contraint (spacing scale, type scale, color palette, shadow set) ?

### Visuel (Beaird)
- [ ] La grille/composition respecte-t-elle la règle des tiers ou le ratio d'or ?
- [ ] La balance (sym. ou asym.) est-elle intentionnelle et effective ?
- [ ] L'unité est-elle présente (proximité + répétition) ?
- [ ] Y a-t-il un ou plusieurs points d'emphase clairs (contraste, isolation, placement) ?
- [ ] Le schéma de couleurs est-il harmonieux et accessible (contrast ratio ≥ 4.5:1) ?
- [ ] La typographie est-elle lisible (espacement, taille, alignement, ≤ 4 fontes) ?
- [ ] Les textures renforcent-elles l'identité sans noyer le contenu ?
- [ ] Les images sont-elles pertinentes, intéressantes ou séduisantes ?

### Polissage (Wathan & Schoger)
- [ ] Les defaults (listes, liens, quotes, inputs) sont-ils supercharged ?
- [ ] Y a-t-il des accent borders pour ajouter de la couleur ?
- [ ] Les backgrounds monotones sont-ils décorés (gradient, pattern, shape) ?
- [ ] Les empty states sont-ils designés (illustration, CTA, masquage des éléments inutiles) ?
- [ ] Les borders inutiles sont-elles remplacées par box-shadow, fond différent ou espacement ?
- [ ] Les composants sont-ils pensés de façon créative (au-delà des conventions) ?

---

## AIDE CONTEXTUELLE PAR TYPE DE PROJET

### Site vitrine
- **Impact visuel** : `06-beaird-layout.md` § emphase + `18-wathan-finitions.md` § accent borders, backgrounds
- **Storytelling** : `06-beaird-layout.md` § flow visuel + `12-wathan-hierarchie.md`
- **CTA** : `12-wathan-hierarchie.md` § Semantics Are Secondary (primary/secondary actions)
- **Photos hero** : `17-wathan-images.md` § text on images + `10-beaird-imagerie.md`

### SaaS / Dashboard
- **Densité d'info** : `13-wathan-layout.md` § dense UIs exception + `12-wathan-hierarchie.md` § labels
- **Hiérarchie** : `12-wathan-hierarchie.md` § all concepts + `14-wathan-typographie.md`
- **"Ça fait plat"** : `16-wathan-profondeur.md` § elevation system + shadows + `18-wathan-finitions.md` § accent borders, supercharge defaults
- **États complexes** : `18-wathan-finitions.md` § empty states
- **Systèmes** : `11-wathan-processus.md` § Limit Your Choices + `13-wathan-layout.md` § spacing system

### E-commerce
- **Confiance** : `07-beaird-couleur.md` § psychologie + `11-wathan-processus.md` § personality
- **Fiches produit** : `12-wathan-hierarchie.md` § labels + `17-wathan-images.md` § user-uploaded content
- **Conversion** : `12-wathan-hierarchie.md` § action hierarchy + `06-beaird-layout.md` § emphase
- **Contenu user** : `17-wathan-images.md` § beware user-uploaded content

### App mobile-first
- **Touch targets** : `13-wathan-layout.md` § spacing system (minimum 48px touch targets)
- **Navigation thumb-zone** : `06-beaird-layout.md` § placement
- **Performance** : `17-wathan-images.md` § scaling + `10-beaird-imagerie.md` § formats
- **Responsive** : `13-wathan-layout.md` § shrink the canvas + `13-wathan-layout.md` § relative sizing doesn't scale

### Design System
- **Tokens** : `11-wathan-processus.md` § Limit Your Choices + `13-wathan-layout.md` § spacing system + `14-wathan-typographie.md` § type scale + `15-wathan-couleur.md` § shades + `16-wathan-profondeur.md` § elevation system
- **Composants** : `02-frost-methodologie.md` + `18-wathan-finitions.md` § think outside the box
- **Documentation** : `03-frost-outils.md` + `05-frost-maintenance.md`
- **Scalabilité** : `05-frost-maintenance.md` § gouvernance

### Landing page
- **Above-the-fold** : `06-beaird-layout.md` § emphase + `12-wathan-hierarchie.md` § hierarchy
- **Persuasion** : `12-wathan-hierarchie.md` § action hierarchy + `11-wathan-processus.md` § personality
- **Photos hero** : `17-wathan-images.md` § text needs consistent contrast
- **Finitions** : `18-wathan-finitions.md` § all concepts

---

## ORDRE D'APPLICATION POUR UN PROJET DE ZÉRO

1. **Découverte** → `06-beaird-layout.md` § Processus de design / questions client
2. **Inventaire UI** (si refonte) → `04-frost-workflow.md` § Interface inventory
3. **Architecture d'information** → `04-frost-workflow.md` § Content & display patterns
4. **Feature-first** → `11-wathan-processus.md` § Start with a feature + Don't design too much
5. **Direction visuelle** → `04-frost-workflow.md` § 20-second gut test + style tiles + element collages + `11-wathan-processus.md` § Choose a personality
6. **Systèmes de valeurs** → `11-wathan-processus.md` § Limit Your Choices + `13-wathan-layout.md` § Spacing system + `14-wathan-typographie.md` § Type scale + `15-wathan-couleur.md` § Define your shades + `16-wathan-profondeur.md` § Elevation system
7. **Layout & grille** → `06-beaird-layout.md` § Grid theory + `13-wathan-layout.md` § Grids are overrated
8. **Hiérarchie visuelle** → `12-wathan-hierarchie.md` § tous les concepts
9. **Décomposition atomique** → `02-frost-methodologie.md` § Les 5 niveaux
10. **Couleur** → `07-beaird-couleur.md` § Schémas + `15-wathan-couleur.md` § HSL + palettes
11. **Typographie** → `09-beaird-typographie.md` + `14-wathan-typographie.md`
12. **Texture & Profondeur** → `08-beaird-texture.md` + `16-wathan-profondeur.md`
13. **Imagerie** → `10-beaird-imagerie.md` + `17-wathan-images.md`
14. **Finitions** → `18-wathan-finitions.md` § tous les concepts
15. **Pattern Library** → `03-frost-outils.md` § Caractéristiques d'une bonne library
16. **Maintenance** → `05-frost-maintenance.md` § Gouvernance + holy grail + équipes

---

## VALEURS CLÉS DE RÉFÉRENCE RAPIDE

| Propriété | Valeur / Recommandation | Source |
|---|---|---|
| Contrast ratio (texte normal) | ≥ 4.5:1 (WCAG AA) | Wathan, Beaird |
| Contrast ratio (texte large ≥ ~18px) | ≥ 3:1 (WCAG AA) | Wathan |
| Line length optimale | 45-75 caractères par ligne (20-35em) | Wathan |
| Nombre de fontes max | ≤ 4 dans un design | Beaird |
| Font weights UI | 400-500 (normal) + 600-700 (emphasis). Jamais < 400 en UI. | Wathan |
| Spacing scale base | 16px, puis facteurs/multiples non-linéaires | Wathan |
| Type scale (hand-crafted) | 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72 | Wathan |
| Greys dans la palette | 8-10 teintes | Wathan |
| Primary color teintes | 5-10 (idéal: 9 → 100 à 900) | Wathan |
| Elevation shadows | 5 niveaux | Wathan |
| Hue rotation max | 20-30° pour éclaircir/assombrir sans changer la couleur | Wathan |
| Spacing adjacent values | ≥ 25% de différence relative | Wathan |
| Golden ratio | 1:1.618 | Beaird |
| Rule of thirds | Grille 3×3, intersections = focal points | Beaird |
| Border radius cohérence | Un seul style (arrondi OU carré) par interface | Wathan |
