# Refactoring UI — Couleur (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Working with Color" de Refactoring UI.
Approche ultra-pratique : HSL comme format de travail, construction
de palettes à 8-10 teintes par couleur, gestion de la luminosité perçue,
température des gris, et accessibilité sans compromis esthétique.

---

### Ditch Hex for HSL

**Principe** — Hex et RGB sont les formats les plus courants mais
les moins utiles. Des couleurs visuellement proches (deux bleus) ont
des codes hex radicalement différents. HSL représente les attributs
que l'œil perçoit : hue, saturation, lightness.

**Règle / Heuristique** —
- **Hue** : position sur le cercle chromatique (0° = rouge, 120° = vert,
  240° = bleu). Mesurée en degrés.
- **Saturation** : 0% = gris (aucune couleur), 100% = vif et intense.
  À saturation 0%, la hue n'a aucun effet.
- **Lightness** : 0% = noir pur, 100% = blanc pur, 50% = couleur pure
  à la hue donnée.

**HSL vs HSB** — Ne pas confondre :
- HSB (design tools) : 100% brightness ≠ blanc sauf si saturation = 0.
  À sat 100% + brightness 100% = sat 100% + lightness 50% en HSL.
- HSL (navigateurs) : lightness 100% = toujours blanc.
  **Pour le web, utiliser HSL.**

**Connexions** — Voir aussi → `07-beaird-couleur.md` § roue chromatique,
valeur et saturation.

---

### You Need More Colors Than You Think

**Principe** — Les générateurs de palettes à 5 couleurs sont séduisants
mais inutilisables pour construire une vraie UI. Il faut un set beaucoup
plus complet.

**Règle / Heuristique** — Trois catégories de couleurs :

1. **Greys** (8-10 teintes) : texte, fonds, panneaux, form controls.
   Éviter le noir pur (paraît artificiel). Commencer par un gris très
   foncé et monter progressivement jusqu'au blanc.

2. **Primary color(s)** (5-10 teintes) : 1-2 couleurs pour les actions
   primaires, navigation active, identité visuelle.
   Ultra-light = fond teinté (alertes). Dark = texte coloré.

3. **Accent colors** (5-10 teintes chacune) : semantic states
   (rouge=destructif, jaune=warning, vert=positif) + highlights
   (teal, pink pour features spotlight). Utilisées avec parcimonie.

**Total** : pour une UI complexe, ~10 couleurs × 5-10 teintes = 50-100
valeurs dans la palette.

**Connexions** — Voir aussi → Define Your Shades Up Front,
Don't Let Lightness Kill Your Saturation.

---

### Define Your Shades Up Front

**Principe** — Ne pas utiliser `lighten()` ou `darken()` dynamiquement.
Cela produit 35 bleus légèrement différents. Définir un set fixe
de teintes à l'avance.

**Règle / Heuristique** — Processus en 4 étapes :

1. **Choisir la couleur de base (500)** : la teinte qui fonctionnerait
   bien comme fond de bouton. Pas de formule ; se fier à l'œil.

2. **Trouver les extrêmes** :
   - **Darkest (900)** : réservée au texte sur cette couleur.
   - **Lightest (100)** : fond teinté (background d'alerte, badge).
   Penser à un composant alerte pour calibrer ces deux extrêmes.

3. **Remplir les gaps** : commencer par 700 et 300 (milieu des gaps).
   Puis 800, 600, 400, 200. Chaque teinte = compromis visuel parfait
   entre ses voisines.

4. **9 teintes** : 100, 200, 300, 400, 500, 600, 700, 800, 900.
   Facile à diviser, assez pour ne pas se sentir limité.

**Pour les greys** : même processus. La base importe moins ; commencer
par les extrêmes (texte le plus foncé + fond off-white le plus clair).

**Important** — Le système est un point de départ. Ajuster si nécessaire
en usage réel. Se fier à l'œil, pas aux chiffres. Mais éviter d'ajouter
de nouvelles teintes trop souvent.

**Connexions** — Voir aussi → Don't Let Lightness Kill Your Saturation,
Greys Don't Have to Be Grey.

---

### Don't Let Lightness Kill Your Saturation

**Principe** — En HSL, quand lightness approche 0% ou 100%, l'impact
de la saturation s'affaiblit. Une même saturation à 50% lightness
paraît plus colorée qu'à 90% lightness. Il faut augmenter la saturation
quand on s'éloigne de 50% pour éviter des teintes délavées.

**Règle / Heuristique** — Si la saturation est déjà à 100%, on ne peut
plus l'augmenter. Solution : utiliser la luminosité perçue (perceived
brightness) qui varie selon la hue.

**Perceived brightness** — Formule (RGB) :
`√(0.299 × R² + 0.587 × G² + 0.114 × B²)`

Trois minimums locaux : rouge (0°), vert (120°), bleu (240°).
Trois maximums locaux : jaune (60°), cyan (180°), magenta (300°).

**Changer la luminosité en tournant la hue** :
- Pour éclaircir → tourner vers la hue lumineuse la plus proche
  (60°, 180°, 300°).
- Pour assombrir → tourner vers la hue sombre la plus proche
  (0°, 120°, 240°).

**Exemple** — Palette jaune : en assombrissant, tourner la hue vers
l'orange. Les teintes foncées paraissent chaudes et riches au lieu
de ternes et marron.

**Limite** — Ne pas tourner de plus de 20-30°, sinon la couleur semble
être une couleur différente, pas une teinte plus claire/foncée.

**Connexions** — Voir aussi → Define Your Shades Up Front,
`07-beaird-couleur.md` § roue chromatique et température.

---

### Greys Don't Have to Be Grey

**Principe** — Un "vrai" gris a 0% de saturation. En pratique, beaucoup
de gris perçus sont saturés, ce qui leur donne une température (chaud/froid).

**Règle / Heuristique** —
- **Cool greys** : saturer avec du bleu.
- **Warm greys** : saturer avec du jaune ou orange.
- Augmenter la saturation pour les teintes proches de 0% et 100%
  lightness (sinon elles semblent délavées par rapport aux gris médians).
- Doser selon l'effet voulu : subtil ou prononcé.

**Exemple** — Interface fintech : greys saturés bleu → sensation
de sérieux, technologie. App bien-être : greys saturés jaune/orange
→ sensation de chaleur, accueil.

**Connexions** — Voir aussi → `07-beaird-couleur.md` § température
des couleurs.

---

### Accessible Doesn't Have to Mean Ugly

**Principe** — WCAG recommande un ratio de contraste ≥ 4.5:1 pour
le texte normal (< ~18px) et ≥ 3:1 pour le texte large. Atteindre
ces ratios avec des couleurs exige des techniques spécifiques.

**Règle / Heuristique** —

1. **Flip the contrast** : texte blanc sur fond coloré foncé demande
   un fond très foncé (attrape l'attention). Alternative : texte coloré
   foncé sur fond coloré clair → la couleur est présente mais
   n'interfère pas avec le reste de la page.

2. **Rotate the hue** : pour du texte coloré secondaire sur fond coloré
   foncé, augmenter la lightness approche du blanc et tue la différence
   avec le texte primaire. Tourner la hue vers une couleur plus lumineuse
   (cyan, magenta, jaune) augmente le contraste perçu sans perdre
   la couleur.

3. **Don't rely on color alone** : les daltoniens ne distinguent pas
   rouge/vert. Toujours doubler l'information couleur avec un autre
   signal : icône (↑/↓), pattern, texte, contraste de luminosité
   (clair vs foncé plutôt que deux couleurs distinctes pour les graphes).

**Valeurs clés** :
- Texte normal : ≥ 4.5:1
- Texte large (≥ ~18px) : ≥ 3:1

**Exemple** — Metric cards : rouge/vert pour trends → ajouter ↑ pour
positif, ↓ pour négatif. Graphe multi-lignes → utiliser des luminosités
différentes (ligne foncée vs ligne claire) plutôt que des couleurs
différentes.

**Connexions** — Voir aussi → Don't Use Grey Text on Colored Backgrounds,
`07-beaird-couleur.md` § contraste et accessibilité.
