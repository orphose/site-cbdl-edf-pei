# Refactoring UI — Layout & Spacing (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Layout and Spacing" de Refactoring UI.
Thèse : l'espace blanc est sous-utilisé, les grilles sont surévaluées,
le sizing relatif ne scale pas. La solution : des systèmes d'espacement
non-linéaires et une approche pragmatique du layout.

---

### Start with Too Much White Space

**Principe** — Le white space devrait être retiré, pas ajouté. En pratique,
les designers ajoutent le minimum de margin/padding pour que ça ne soit
pas activement mauvais. Résultat : l'interface est correcte mais jamais
spacieuse ni élégante.

**Règle / Heuristique** —
1. Commencer par donner beaucoup trop d'espace à chaque élément.
2. Retirer progressivement jusqu'à satisfaction.
3. Ce qui semble "un peu trop" en isolation sera souvent "juste assez"
   dans le contexte de l'UI complète.

**Exception — Dense UIs** : dashboards où beaucoup d'information doit
être visible simultanément. La densité est alors un choix délibéré,
pas un défaut. Il est plus évident de savoir quand retirer de l'espace
que quand en ajouter.

**Connexions** — Voir aussi → Establish a Spacing and Sizing System,
Avoid Ambiguous Spacing, `06-beaird-layout.md` § whitespace.

---

### Establish a Spacing and Sizing System

**Principe** — Ne pas choisir entre 120px et 125px pixel par pixel.
Utiliser un set contraint de valeurs défini en avance, avec des écarts
non-linéaires (plus serrés en bas, plus espacés en haut).

**Règle / Heuristique** —

1. **Pas de scale linéaire** : "tout multiple de 4px" ne résout pas
   le problème. À 12px, +4px = +33%. À 500px, +4px = +0.8%.
   Les deux valeurs adjacentes doivent différer d'au moins ~25%.

2. **Base = 16px** : se divise bien et correspond à la taille de police
   par défaut des navigateurs.

3. **Construire par facteurs et multiples** : valeurs serrées en bas,
   espacées en haut.

4. **Échelle pratique recommandée** :
   `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768`

5. **Usage** : pour chaque décision de taille/espacement, prendre
   la valeur du milieu, tester les voisines, le meilleur choix
   est immédiatement évident.

**Exemple** — Besoin d'espace sous un élément : essayer 24px. Trop peu ?
Essayer 32px. Trop ? C'est 24px. Le processus d'élimination est rapide
car les différences entre valeurs adjacentes sont visibles.

**Pièges** — Ne pas créer toutes les valeurs en avance ; ajouter au fur
et à mesure. Mais toujours penser "système" et éviter de prendre
la même micro-décision deux fois.

**Connexions** — Voir aussi → Limit Your Choices, Establish a Type Scale,
Define Your Shades Up Front.

---

### You Don't Have to Fill the Whole Screen

**Principe** — Ce n'est pas parce qu'on a 1400px de large qu'il faut
tout étaler. Si 600px suffisent, utiliser 600px. Étaler inutilement
rend l'interface plus difficile à interpréter.

**Règle / Heuristique** —
1. Donner à chaque élément l'espace dont il a besoin, pas plus.
2. Ne pas rendre tout full-width juste parce que la navigation l'est.
3. **Shrink the canvas** : en responsive, commencer par ~400px (mobile)
   puis agrandir. On change moins de choses qu'on ne le croit.
4. **Thinking in columns** : si un composant est optimisé pour une
   largeur étroite mais le contexte est large, le casser en colonnes
   (ex: formulaire + texte explicatif en deux colonnes) plutôt que
   de l'étirer.

**Exemple** — Formulaire de paramètres : optimal à 500px de large.
Sur écran 1200px : ne pas l'étirer à 1000px. Le placer à 500px et
utiliser l'espace restant pour du texte d'aide ou le laisser vide.

**Pièges** — Forcer des éléments à être larges pour "remplir" crée
des formulaires difficiles à lire et des layouts déséquilibrés.

**Connexions** — Voir aussi → Grids Are Overrated,
`06-beaird-layout.md` § grille et composition.

---

### Grids Are Overrated

**Principe** — Les grilles 12-colonnes simplifient les décisions de layout
mais ne doivent pas devenir une religion. Beaucoup d'éléments fonctionnent
mieux avec des largeurs fixes qu'avec des pourcentages.

**Règle / Heuristique** —

1. **Not all elements should be fluid** : une sidebar à 25% (3 colonnes)
   grandit/rétrécit inutilement avec l'écran. Mieux : sidebar fixe
   (ex: 280px) + zone principale flexible.

2. **Don't shrink until you need to** : donner un `max-width` aux composants
   et ne réduire que quand l'écran est plus petit que ce max.
   Évite les situations absurdes où un card est plus large sur un écran
   moyen (8 colonnes) que sur un grand (6 colonnes).

3. **Don't use percentages unless you want scaling** : dans un composant,
   utiliser des largeurs fixes pour les éléments qui ont une taille
   optimale connue.

**Exemple** — Login card : `max-width: 500px; width: 100%`. Sur grand
écran : 500px centrée. Sur petit écran : s'adapte naturellement.
Pas besoin de colonnes du tout.

**Pièges** — Sidebar en pourcentage qui à 2560px fait 640px (trop large)
et à 768px fait 192px (trop étroite). Les grilles fluides exigent
des ajustements constants à chaque breakpoint.

**Connexions** — Voir aussi → Relative Sizing Doesn't Scale,
You Don't Have to Fill the Whole Screen.

---

### Relative Sizing Doesn't Scale

**Principe** — Les tailles relatives (em, proportions fixes entre éléments)
ne se maintiennent pas à travers les contextes. Ce qui fonctionne
sur desktop ne fonctionne pas à la même proportion sur mobile.

**Règle / Heuristique** —

1. **Grands éléments shrink plus vite que les petits** : sur mobile,
   la différence entre petit et grand doit être moins extrême.
   Headline à 2.5x le body sur desktop → 1.5-1.7x sur mobile.

2. **Les propriétés d'un composant ne scalent pas proportionnellement** :
   un bouton large n'est pas un bouton normal zoomé. Le padding doit
   être disproportionnellement plus généreux sur les gros boutons
   et plus serré sur les petits.

3. **Freedom to fine-tune independently** : traiter chaque propriété
   (font-size, padding, margin) comme indépendante à chaque breakpoint.

**Exemple** — Bouton 16px + padding 16h/12v. En large : 18px + 24h/16v
(padding proportionnellement plus large). En small : 14px + 12h/8v
(padding proportionnellement plus serré). Le small "a l'air" petit,
le large "a l'air" grand, au lieu de sembler juste zoomé.

**Pièges** — Encoder des relations fixes (2.5em) et s'attendre
à ce qu'elles fonctionnent partout. Il n'y a pas de relation réelle
entre les tailles à différents breakpoints.

**Connexions** — Voir aussi → Establish a Type Scale § éviter em,
Line-Height Is Proportional.

---

### Avoid Ambiguous Spacing

**Principe** — Quand il n'y a pas de séparateur visible (border, fond),
l'espacement est le seul signal de regroupement. Un espacement ambigu
empêche l'utilisateur de savoir quel élément appartient à quel groupe.

**Règle / Heuristique** — **Plus d'espace autour du groupe que dedans.**
Quand on relie des éléments par proximité, l'espace inter-groupes doit
être significativement supérieur à l'espace intra-groupe.

**Cas typiques** :
- **Formulaires** : espace label→input < espace entre groupes de champs.
  Sinon, un label peut sembler appartenir au champ précédent.
- **Titres de sections** : plus d'espace avant le titre (qui le sépare
  de la section précédente) que après (qui le lie à sa section).
- **Listes à puces** : l'espace entre puces doit être > le line-height
  d'une puce multi-lignes.
- **Layout horizontal** : même règle pour les éléments côte à côte.

**Pièges** — Utiliser un espacement uniforme partout. Toujours vérifier
visuellement si le regroupement est immédiatement clair.

**Connexions** — Voir aussi → `06-beaird-layout.md` § proximité et unité
(Gestalt), Start with Too Much White Space.
