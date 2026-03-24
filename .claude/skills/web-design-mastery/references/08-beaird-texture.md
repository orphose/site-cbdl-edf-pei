# Beaird — Chapitre 3 : Texture

---

## 1. Définition et rôle de la texture

*"Texture is anything that gives a distinctive appearance or feel to the surface of a design or object."*

Le web ne peut pas donner des échardes à un visiteur, mais il peut **évoquer le souvenir** d'une surface. La texture est le moyen de personnaliser un design au-delà du layout et de la couleur.

*"Not every web site has to be beautiful, but every web site can be."*

L'émergence du CSS a donné aux designers beaucoup de contrôle sur l'apparence — mais le problème est que beaucoup ne savent pas où commencer pour personnaliser. La texture est la réponse.

**5 éléments constitutifs de la texture :**
Points → Lignes → Formes → Volume & Profondeur → Motifs

---

## 2. Points

*"Just as the pixel is the fundamental element of digital images, the point (or dot) is the fundamental element of graphic design, and can be used to build any graphic element."*

### Nature des points
- Un point (ou dot) est l'unité fondamentale du design graphique
- Analogie technique : 1 pixel = 1 point sur l'écran
- À 1024×768px = 786 432 pixels organisés en 768 rangées × 1024 colonnes
- **Les points n'ont pas d'échelle sans cadre de référence** : un point sur un billboard peut sembler un point de ponctuation de près, mais est grand comme une tête de loin

### Pouvoir des points
Groupés ensemble, les points créent des lignes, des formes, et du volume.
**Exemple halftone :** portrait en points serrés = tramage.
**Exemple Minipops (Craig Robinson, flipflopflyin.com) :** portraits de célébrités en pixels extrêmement petits — Hannibal du A-Team reconnaissable avec son cigare même en mini-pixels.

---

## 3. Lignes

*"The line is the most common element of graphic design, and is among the most expressive."*

Deux points connectés = une ligne. Sur le web, on pense aux lignes comme borders CSS ou soulignements de liens — mais elles ont bien plus d'usages.

### Table des émotions évoquées par type de ligne

| Type de ligne | Émotion / Effet |
|---|---|
| Diagonale | Mouvement, énergie cinétique, "potentiel" (comme un domino qui tombe) |
| Horizontale | Stabilité, calme, horizon, sérénité |
| Verticale | Force, élévation, formalisme |
| Zigzag / angles aigus | Danger, frénésie, tension, agitation |
| Courbe douce et roulante | Fluidité, relaxation, douceur |
| 90 degrés, angles droits | Mécanique, précision, technique, digital |
| Expressif / organique (écriture, graffiti, croquis) | Humain, artisanal, spontané, créatif |

### Application pratique
- **Background de lignes horizontales** : texture et intérêt, sentiment de stabilité
- **Background de lignes diagonales** : les yeux se déplacent constamment → sensation "sur le qui-vive" → design plus énergique
- **Scanner des croquis artisanaux** : intégrer des lignes tracées à la main (Illustrator brushes, scan papier) → **humaniser un medium très digital**

*"As the Web is such a rigid and technical medium, it's easy to forget about fundamental art tools like pens and brushes."*

---

## 4. Formes (Shapes)

### Formes géométriques
Cercles, triangles, rectangles, flèches, étoiles, diamants, ellipses, signes +, demi-cercles, etc.
- Courbes précises, angles et lignes droites
- **Sentiment : technique, mécanique, digital**
- Difficiles à dessiner à la main (nécessitent compas, rapporteur, règle) — mais c'est le **mode par défaut** d'un ordinateur

**Problème :** le web est intrinsèquement rectangulaire (CSS positioning, même les tables → rectangles). Ce n'est pas parce que les blocs sont rectangulaires qu'ils doivent le sembler.

### Formes organiques / freeform
Courbes non-géométriques, angles aléatoires, lignes irrégulières.
- **Sentiment : informel, spontané, naturel, libre, humain**
- Représentent : contours de produits, gestes humains, gribouillis organiques

**Transformation graduelle :** un carré peut être progressivement transformé en forme freeform en arrondissant les coins et en ajoutant des irrégularités.

### Stratégies pour masquer la rectangularité du web

#### 1. Images en background
Utiliser une image circulaire/ovale comme background → illusion d'un bloc de texte non-rectangulaire.
**⚠️ Problème :** si le texte déborde l'image ou que l'utilisateur redimensionne la fonte → l'illusion se brise. Solution : **masquer** plutôt que réaliser de vrais blocs non-rectangulaires.

#### 2. Coins arrondis (border-radius)
*"Boxes with rounded-off corners soften the layout, creating a more organic, smooth feel."*

*"Remember when I asked if you could make a web site design feel like a wet bar of soap? Well, rounded corners like the ones used on Six Apart's web site are a step in that general direction."*

Techniques de l'époque (pré-CSS3 natif) :
- "Creating Custom Corners & Borders" (Søren Madsen, A List Apart) — CSS avancé + images custom
- "Thrashbox" (Ryan Thrash) — même technique
- "Nifty Corners" (Alessandro Fulciniti) — JavaScript injecte des balises `<b>` avec marges CSS → coins simples sans images
- "Spiffy Corners" (Greg Johnson) — même idée sans JavaScript, tags `<b>` directs dans le HTML
- **Spanky Corners** (Alex Walker, SitePoint) — le meilleur : formulaire en ligne qui génère code + images nécessaires

**Aujourd'hui :** CSS `border-radius` est nativement supporté.

#### 3. Formes organiques via images
**Fish Marketing website :** utilise des formes familières organiques → image de poisson sur billot + déchirure dans le papier parchemin + tranches de citron + couperet dépassant du bord du billot. Les formes des images définissent le layout.

**"Economy of line" test :** tracer uniquement les lignes principales d'un layout. Si le layout semble toujours complet avec uniquement des lignes → il passe le test. Fish Marketing passe le test : son layout reste reconnaissable même sans couleur ni photographie.

---

## 5. Volume et profondeur

### Perspective
*"When we see a road that disappears into the horizon, we don't assume that the width of the road actually decreases to a single point."*

Les objets semblent plus petits en s'éloignant → **point de fuite**. Utiliser des angles convergeants pour créer de la profondeur dans les graphiques.

### Proportion
*"We humans rely on the relative proportion of adjacent objects to determine not only the size of those objects, but their location in three-dimensional space."*

Deux chevaux dans l'image — le plus petit semble plus loin, mais on sait qu'ils ont probablement la même taille réelle. Modifier la proportion crée de la profondeur.

### Lumière et ombre
**L'outil le plus puissant pour créer profondeur et volume.**

*"Even with accurate perspective and proportion, a composition without highlights and shadowing will look flat. Light and shadow establish visual contrast and help to create the illusion of three-dimensional depth with two-dimensional media."*

#### Les 3 cercles de Beaird (exemples de traitement)

**Cercle 1 : Drop shadow basique**
Simple ombre portée = le cercle semble flotter au-dessus de la surface.

**Cercle 2 : Gradient linéaire + ombre inclinée**
Gradient linéaire + ombre inclinée vers le bas à droite → suggère un cercle 2D posé sur une surface angulée. La proximité de l'ombre du bas plutôt que du haut = sens du mouvement → le haut du cercle semble tomber vers ou s'éloigner de l'œil.

**Cercle 3 : Gradient radial**
Aspect sphérique grâce au highlight et aux ombres créés par le gradient. L'ombre projetée correspond à la source de lumière → crédibilité du volume.

#### Menu 3D (exemple pratique)
Des boutons arrondis plats semblent déjà décoller du fond grâce aux couleurs complémentaires et aux coins arrondis. Pour les rendre vraiment 3D : imaginer qu'ils sont faits d'une céramique brillante avec des courbes comme des bonbons à moitié fondus → **split gradient simulant le reflet de lumière**.

#### Nuby on Rails (Geoffrey Grosenbach)
Logo block en forme de Post-it Note™ :
- Perspective courbée
- Ombrage dégradé
- Ombre portée réaliste
- Échelle et proportion : le grand bloc blanc semble être un document imprimé posé à côté du post-it
- *"Real-world inspiration is the key to adding realistic depth to graphic elements."*

**Méthodes CSS pour la profondeur :**
- Drop shadows en CSS (CSS Drop Shadows II: Fuzzy Shadows, Sergio Villarreal, A List Apart)
- Gradients CSS modernes
- `box-shadow` CSS natif (CSS3)

---

## 6. Motifs (Patterns)

### Historique et renaissance
Dans les années 90, les backgrounds tuilés (eau, pierre, ciel étoilé, métal, toile) réduisaient la taille des fichiers pour les modems 56K. Bien qu'associés au passé honteux du web design, **les patterns tuilés n'ont pas disparu** — ils sont probablement plus utilisés qu'on ne le pense.

### Les 5 propriétés CSS de background

```css
/* 1. Couleur de fond */
background-color: #00b2cc;
/* "transparent" est la valeur par défaut */
/* Éviter les noms HTML (Aquamarine, BlanchedAlmond...) → seuls 16 sanctionnés W3C */

/* 2. Image de fond */
background-image: url('animalcracker.png');
/* Valeurs : url('filename') ou none */

/* 3. Répétition */
background-repeat: repeat;       /* horizontal ET vertical (défaut) */
background-repeat: repeat-x;     /* horizontal uniquement + fond coloré pour le reste */
background-repeat: repeat-y;     /* vertical uniquement */
background-repeat: no-repeat;    /* pas de tuilage */

/* 4. Attachement */
background-attachment: scroll;   /* suit le scroll (défaut) */
background-attachment: fixed;    /* fixe par rapport au viewport → effet parallax */
/* Note historique : IE6 ne respectait fixed que pour l'élément body */

/* 5. Position */
background-position: center top;    /* keywords */
background-position: 50% 0%;        /* pourcentages équivalents */
background-position: 200px 300px;   /* 300px du haut, 200px de la gauche */
/* ⚠️ Firefox/Opera ne permettaient pas de mélanger keywords/% et mesures */

/* Shorthand (combine tout) */
background: color image repeat position attachment;
/* Exemple complet : */
#hihopickles {
  background: #FF9900 url('animalcracker.png') repeat-x bottom left fixed;
}
```

### Exemple Veerle Pieters
Design élaboré avec **plusieurs backgrounds répétés discrets** :
1. **Barre décorative en header** = image tuilée horizontalement (body element) → semble être une série continue de bandes colorées
2. **Background du div content** = image 715×7px à 4 couleurs tuilée verticalement → illusion de deux colonnes séparées (4KB seulement)
3. **Bullets customisées** = pas techniquement un background mais images similaires en couleur/forme au logo → renforce l'identité visuelle

---

## 7. Construire la texture : styles et atmosphères

### Style 1 : Vieilli, usé, nostalgique (Worn & Weathered)
Pour évoquer la nature intemporelle, l'histoire nostalgique d'un sujet.

**Éléments visuels caractéristiques :**
- Palette de couleurs terreuses et analogues
- Fonds non-unis mais avec motifs de points similaires → **effet grainé/bruité** → variation de couleur donne de la texture à chaque bloc
- Corners arrondis pour softener les blocs rectangulaires
- **Bords "ébréchés"** : segments manquants dans les lignes → apparence usée
- Drop shadows sur éléments "posés" sur la surface (métal, mouches, photos)
- Photos avec bords usés et ombres courbées → semblent se décoller du fond
- **"Coin cornée"** : triangle clair avec ombre portée → le coin semble roulé, pas coupé

**Exemples :**
- *Tattered Fly* : carte au fond granuleux, boîte à mouches, flies, moulinet avec ombres réalistes
- *Jason Santa Maria's old book design* : layout simulant un vieux livre → spine à gauche, tache d'eau dans le coin supérieur droit, backgrounds pattern → peu d'images mais fort effet

*"Like a comfortable pair of jeans with holes in the knees, or a faded stack of postcards with tattered edges, there is validity and honor in things that show wear and tear from the passage of time."*

**Tendance popularisée par Cameron Moll (2004)** : *"That Wicked Worn Look"* → série d'articles qui ont inspiré des dizaines de designers.

### Style 2 : Cartoon et ludique (Whimsical)
Pour les audiences jeunes ou pour rendre un sujet adulte (ex : assurance) plus accessible.

**Éléments visuels caractéristiques :**
- Formes plates et simplifiées (pas de simulation 3D)
- Palette vive et saturée, multiples couleurs
- Corners très arrondis
- Scènes illustrées (paysages, personnages cartoon)
- Blocs de contenu semi-transparents sur illustration de fond

**Exemples :**
- *Yes Insurance (Technophobia)* : paysage cartoon en backdrop, blocs blancs translucides avec tops/bottoms arrondis → simplifie le sujet difficile de l'assurance
- *Let's Play Music (Pete Jones)* : notes de musique en pattern sur fond, coins arrondis, palette changeant par section → même si l'audience est des adultes (parents, professeurs), le client voulait un look coloré et enfantin

### Style 3 : Web 2.0 / High Gloss
*"If a site does not have gradients, it's not Web 2.0."*

**Éléments visuels caractéristiques :**
- **Gradients partout** : headers, boutons, backgrounds → à appliquer proprement et subtilement
- **Coins arrondis** systématiques
- **Whitespace généreux** → rien n'est cramé ou forcé
- **Grands titres** : taglines et headers en très grande police
- **Split gradient** : simule le reflet de lumière sur une barre laquée 3D (gradient du milieu vers le haut = partie supérieure réfléchissante)
- Boîtes de contenu semi-transparentes superposées

**Exemples :**
- *Mozilla Firefox site* : gradients bleus et oranges dans le header + gradient subtil dans la barre → download area verte arrondie → whitespace généreux = rien n'est cramé
- *New Bamboo* : barre de navigation glossy verte au sommet + split gradient simulant réflexion sur barre laquée 3D + content box semi-transparente superposée + ombres portées dégradées

*"Large fonts and the Web 2.0 style are design trends that will likely be around for a few more years—at least until Web 3.0 is out of beta."*

### Créer ses propres tendances texturales
La connaissance de l'histoire de l'art expand le "visual toolbox" :
- Patterns architecturaux de la Haute Renaissance
- Le réalisme (influence sur Van Gogh, Cézanne, rupture avec les règles de texture)
- Le modernisme → design trends d'aujourd'hui

---

## 8. Ordre de construction de la texture (extérieur vers intérieur)

Pour un layout fixe :
1. **Background du body** (le plus extérieur) → pattern + ombre portée du container
2. **Bloc header** (scan-lines, highlight, texture d'identité)
3. **Content container** (coins arrondis, drop shadow)
4. **Sidebar / colonnes** (gradient subtil, zebra-stripes)
5. **Éléments inline** (boutons, formulaires, modules)

**Exemple Florida Country Tile :**
1. Background = pinwheel tile pattern à 5% d'opacité en bleu → discret mais présent
2. Header = scan-lines à 1px + highlight coin supérieur droit → focal point
3. Content container = coin supérieur droit arrondi + drop shadow → dimension sur le header photo
4. Sidebar = gradient dans le header rouge + zebra-stripe fond gauche→droite dans la zone formulaire

**Conseil technique pour les patterns CSS :**
- Créer d'abord en noir et blanc → contraste élevé → réutilisable
- Tester le tuilage avec Pattern puis Edit > Define Pattern de Photoshop
- Réduire l'opacité (ici 5%) pour la subtilité
- Viser une image légère → PNG 64 couleurs = 4.5KB pour 150×1350px

---

## Connexions avec les autres références du skill

- **Ombres et élévation** → `16-wathan-profondeur.md` § Emulate a Light Source, Use Shadows to Convey Elevation, Shadows Can Have Two Parts (système d'ombres à 5 niveaux)
- **Profondeur sans ombres (flat design)** → `16-wathan-profondeur.md` § Even Flat Designs Can Have Depth (couleur + solid shadows + overlapping)
- **Patterns en background** → `18-wathan-finitions.md` § Decorate Your Backgrounds (patterns, shapes, gradients subtils)
- **Moins de borders** → `18-wathan-finitions.md` § Use Fewer Borders (alternatives : box-shadow, fonds différents, espacement)
- **Layering par chevauchement** → `16-wathan-profondeur.md` § Overlap Elements to Create Layers
