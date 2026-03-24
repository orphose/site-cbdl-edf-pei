# Beaird — Chapitre 1 : Layout and Composition

> **Sommaire** : 1. Processus de design — 2. Anatomie d'une page web — 3. Grid theory — 4. Balance — 5. Unity — 6. Emphasis — 7. Layouts courants — 8. Largeur fixe vs. liquide

---

## 1. Le processus de design

### Phase 1 : Découverte (Discovery)
La découverte consiste à rencontrer les clients et à comprendre ce qu'ils font. Ce n'est pas une étape "design" en apparence, mais **c'est la seule façon de créer un design approprié et efficace**.

**Avant la première réunion :**
- Googler le client même si on pense tout savoir
- Si on ne trouve pas l'entreprise spécifiquement, se renseigner sur l'industrie

**En réunion :**
- Écouter plus que parler
- Apporter un carnet de notes → **PAS un ordinateur**
  - *"Computers have screens, and people tend to stare at them."*
  - Si technologie absolument nécessaire → dictaphone uniquement
  - Un carnet est moins menaçant pour le client souvent peu à l'aise avec la tech
- La réunion n'est pas pour impressionner, vendre, ou parler de design
- Les réunions peuvent avoir lieu dans un café ou au restaurant → relation plus personnelle

**Questions obligatoires à poser :**
1. Que fait l'entreprise ?
2. Quel est votre rôle dans l'entreprise ? (essentiel si cette personne sera votre interlocuteur principal)
3. L'entreprise possède-t-elle un logo ou une brand existante ?
4. Quel est votre objectif dans le développement d'un site web ?
5. Quelles informations souhaitez-vous fournir en ligne ?
6. Qui est votre audience cible ? Partage-t-elle des caractéristiques démographiques communes (âge, sexe, localisation) ?
7. Qui sont vos concurrents ? Ont-ils des sites web ?

**Éviter :** jargon technique si le client est un développeur, ou de parler de design spécifique si vous êtes designer. *"Semantic markup, fluid and fixed layouts, and color schemes will likely mean very little to the client. Worse still, these types of conversations can bring misguided design opinions your way even before you get a chance to start thinking about the design yourself."*

### Phase 2 : Implémentation (Implementation)
*"Regardless of the project, try not to get caught up in the technology associated with building web sites—at least not at first."*

**La règle d'or : commencer sur papier**
*"It's easy to lose focus on the design if you start thinking about the layout in front of a computer."*

- Ignorer les limitations des navigateurs et du CSS
- Se concentrer sur l'apparence finale souhaitée
- Utiliser n'importe quel carnet (un spiral 79¢ suffit)
- Tout écrire/dessiner avec n'importe quel stylo disponible

**Processus typique de Beaird :**
1. Esquisser plusieurs layouts possibles sur papier
2. Choisir le layout préféré
3. Ouvrir Photoshop → outil rectangle pour bloquer les zones
4. Définir le layout, expérimenter couleurs de fond et avant-plan
5. Continuer jusqu'à obtenir un comp à montrer au client

**Définition d'un "comp" :** abréviation de "comprehensive dummy" — simulation complète d'un layout créé avant de prototyper en HTML. Terme venu du print.

### La définition d'un bon design (double prisme)
Il existe deux standpoints pour juger si un design est "bon" :
1. **Usabilité** : fonctionnalité, présentation efficace de l'information, efficience
2. **Esthétique** : présentation, animations, graphismes

*"Some designers get caught up in the aesthetics and forget about the user, and some usability gurus get lost in their user testing and forget about visual appeal. In order to reach people and retain their interest, it's essential to maximize both."*

*"The most important thing to keep in mind is that design is about communication."*

Un bon design web satisfait ces 3 critères :

**Critère 1 : Les utilisateurs sont attirés par le design mais guidés vers le contenu**
La priorité numéro 1 des professionnels de l'usabilité : le temps qu'il faut aux utilisateurs pour scanner la page à la recherche de l'information voulue. Le design ne doit pas être un obstacle — il doit être un conduit entre l'utilisateur et l'information.

**Critère 2 : Les utilisateurs peuvent naviguer intuitivement**
- La navigation principale doit être clairement visible
- Chaque lien doit avoir un libellé descriptif
- La navigation doit changer d'apparence au survol (hover)
- La page ou section active doit être indiquée
- Navigation secondaire, champs de recherche, liens sortants ne doivent pas dominer la page

**Critère 3 : Chaque page est reconnaissable comme appartenant au même site**
Même si le layout de la homepage est très différent des pages internes, un thème ou style cohérent doit exister sur toutes les pages. Exemple Ordered List (Steve Smith) : les blocs de contenu sont différents mais la répétition de l'identité, la navigation et la palette limitée (noir, blanc, vert, cyan) unifient toutes les pages.

---

## 2. Anatomie d'une page web

Beaird compare ça aux mots de poésie magnétique sur un frigo : des millions d'arrangements possibles, mais seuls quelques-uns ont du sens.

### Les 6 blocs constitutifs

#### 1. Containing Block (bloc conteneur)
Tout site web possède un conteneur — body tag, div contenant tout, ou (à éviter) une table. Sans conteneur, les éléments dérivent hors du browser.

**Largeur :**
- **Liquid (liquide)** : s'étend pour remplir toute la largeur du browser
- **Fixed (fixe)** : même largeur quelle que soit la taille de la fenêtre

#### 2. Logo / Identity
Le bloc identité doit contenir le logo ou le nom de l'entreprise et apparaître **en haut de chaque page** du site. Renforce la reconnaissance de marque et indique aux utilisateurs que les pages qu'ils consultent font partie d'un même site.

Note : "identity" ≠ "branding". Identity = aspect visuel du branding. Branding = processus plus large incluant publicité, recherche marché, feedback client.

#### 3. Navigation
*"It's essential that the site's navigation system is easy to find and use."*

- Les utilisateurs s'attendent à voir la navigation **tout en haut de la page**
- Navigation verticale (côté gauche) ou horizontale (en haut) → aussi proche du haut que possible
- Au minimum, tous les items de navigation principale doivent être **"above the fold"**
- Navigation secondaire, champs de recherche, liens sortants → **ne doivent pas être des éléments dominants**. Faciles à trouver, séparés visuellement du contenu → permettent aux utilisateurs de se concentrer sur l'information

**Le "fold"** : limite basse du contenu visible sans scroll. Métaphore du journal plié. À 800×600 pixels, en comptant chrome du navigateur, barre d'adresse et barre de statut → fold à ~400px du haut.

#### 4. Content (contenu)
*"Content is king."*

Un visiteur typique entre et quitte un site en quelques secondes. Si les visiteurs ne trouvent pas ce qu'ils cherchent → ferment le navigateur ou passent à un autre site.

**Impératif :** maintenir le bloc de contenu principal comme **focal point du design** pour ne pas gâcher ces secondes précieuses.

#### 5. Footer (pied de page)
En bas de la page. Contient habituellement : copyright, contact, informations légales, liens vers les sections principales.

En séparant le dernier contenu du bas du browser, le footer indique aux utilisateurs qu'ils sont au bas de la page.

#### 6. Whitespace (espace négatif)
*"The graphic design term whitespace (or negative space) literally refers to any area of a page that's not covered by type or illustrations."*

Les designers novices (et beaucoup de clients) ressentent le besoin de remplir chaque centimètre d'une page.

*"Having empty space on a page is every bit as important as having content. Without carefully planned whitespace, a design will feel closed in, like a crowded room. Whitespace helps a design to 'breathe' by guiding the user's eye around a page, but also helps to create balance and unity."*

---

## 3. Grid theory (théorie de la grille)

*"Using a grid is not just about making things be square and line up: it's about proportion as well."*

### Le ratio d'or (Golden Ratio / Divine Proportion)
- Phi (Φ) = 1.6180339... → nombre irrationnel
- Observé partout dans la nature (spirale du tournesol, diamètre du disque central / diamètre total = 1/Φ)
- Les Pythagoriciens l'ont découvert et y ont vu une inspiration divine
- Défini mathématiquement par Pythagore et ses disciples comme des ratios plutôt que des unités simples
- Utilisé par les artistes de la Renaissance pour leurs peintures, sculptures, architecture
- **Une ligne divisée par le ratio d'or → le grand segment = ~1.618× le petit**
- Applications : diviser 100cm par 1.62 = 61.73cm

### La règle des tiers (Rule of Thirds)
Version simplifiée du ratio d'or, sans calculatrice :

*"A line bisected by the golden ratio is divided into two sections, one of which is approximately twice the size of the other. Dividing a composition into thirds is an easy way to apply divine proportion without getting out your calculator."*

#### Méthode pratique sur papier
1. Dessiner un rectangle
2. Diviser horizontalement en tiers
3. Diviser verticalement en tiers
4. Subdiviser le tiers supérieur en tiers supplémentaires
5. Diviser chaque colonne en deux

→ Résultat : une grille de travail pour positionner les éléments.

#### Application du grid
- Le plus grand bloc d'abord (généralement le contenu) → placer dans les 2/3 inférieurs droits
- Navigation → dans le tiers central de la colonne gauche
- Identité → texte côté gauche du contenu, image sur le menu
- Footer → sous le contenu, dans la colonne droite de la grille

**Astuce anti-ennui :** *"It's very tempting to arrange all your elements along one particular line, but try not to let this happen—it's not very interesting visually. Instead, consider pushing part of the block over that line."*

**Résistance à la tentation de centrer :**
*"Another tendency for non-designers working on layouts is to center-align everything on a page. The grid system prevents us from doing that."*

---

## 4. Balance

*"In a figurative sense, the concept of visual balance is similar to that of physical balance illustrated by a seesaw. Just as physical objects have weight, so do the elements of a layout."*

### Balance symétrique (Formal Balance)
Les éléments de chaque côté d'un axe central sont identiques ou équivalents.

**Variantes :**
- **Symétrie horizontale** : centrer le contenu ou équilibrer entre colonnes — la plus courante sur le web
- **Symétrie bilatérale** : équilibre sur plus d'un axe → surtout en logo et print design
- **Symétrie radiale** : éléments également espacés autour d'un point central → aussi plus rare sur le web

**Effet :** stable, formel, institutionnel.

### Balance asymétrique (Informal Balance)
*"Rather than having mirror images on either side of the layout, asymmetrical balance involves objects of differing size, shape, tone, or placement. These objects are arranged so that, despite their differences, they equalize the weight of the page."*

Un grand objet d'un côté + plusieurs petits objets de l'autre = toujours équilibré.

**Exemple (Jeremy Darty) :** grand flamant rose à gauche + petits flamants + petits blocs texte à droite → équilibre asymétrique + application de la règle des tiers.

**La photo des trois pierres :** couvrir l'une des trois pierres → toute la composition semble déséquilibrée et inachevée. *"It's as if the entire composition is in a picture frame hanging by a single nail on the wall."*

**Application web courante :**
Layout 2 colonnes → grande colonne très claire (bon contraste pour le texte) + petite colonne navigation souvent plus sombre ou avec bordure → balance asymétrique naturelle.

**Exemple Hicksdesign (John Hicks) :** heavy brown sidebar fixe à droite + contenu scrollable à gauche → intérêt et balance constants.

---

## 5. Unity (Unité)

*"Design theory describes unity as referring to the way in which the different elements of a composition interact with one another. A unified layout is one that works as a whole rather than being identified as separate pieces."*

**Raison historique de la mention** : c'est l'une des raisons pour lesquelles les web designers ont toujours détesté les frames HTML — elles détruisent l'unité.

### Proximity (Proximité)
*"Placing objects close together within a layout creates a focal point toward which the eye will gravitate."*

**Application CSS :** ajuster les marges et paddings des éléments HTML communs (h1-h3, paragraphes, blockquotes, images) pour créer des groupes.

**Règle pratique du heading :**
Deux colonnes de texte identiques → la différence : dans l'une, le heading est équidistant du paragraphe précédent et suivant → ressemble à un séparateur plutôt qu'à un titre. Dans l'autre, le heading est plus proche du paragraphe qui le **suit** → conformément à la règle de proximité, appartient clairement à ce bloc de texte.

### Repetition (Répétition)
*"Repetition of colors, shapes, textures, or similar objects helps to tie a web page design together so that it feels like a cohesive unit."*

9 traits rouges côte à côte parmi d'autres traits → forment un groupe unifié parce qu'ils **répètent** une forme, une couleur et une texture.

**Exemple pratique :** listes à puces — le bullet précédant chaque item est un indicateur visuel que les éléments font partie d'un tout.

**Exemple Left Justified (Andrew Krespanis) :** utilisation répétée d'une texture de bois rouge dans le header, le menu et les bordures de page → **maintient littéralement le design ensemble**.

---

## 6. Emphasis (Emphase)

*"Emphasis is about making a particular element draw the viewer's attention."*

### Placement
Le **centre direct d'une composition** est l'endroit où les utilisateurs regardent en premier → toujours le plus fort pour créer de l'emphase. Plus un élément s'éloigne du centre → moins il sera remarqué en premier.

### Continuance
*"When our eyes start moving in one direction, they tend to continue along that path until a more dominant feature comes along."*

Exemple : un splotch plus grand capte l'œil en premier, mais une flèche pointe vers un objet plus petit → l'œil est inévitablement conduit vers le plus petit.

**Application web :** le bord gauche des headings, texte et images forme naturellement une ligne verticale → "ligne de continuance". La règle des tiers permet d'aligner d'autres éléments sur les lignes de la grille pour exploiter cet effet.

### Isolation
*"An item that stands out from its surroundings will tend to demand attention."*

Contraire de la proximité (qui crée groupe et unité).

### Contrast (Contraste)
*"Contrast is defined as the juxtaposition of dissimilar graphic elements, and is the most common method used to create emphasis in a layout. The concept is simple: the greater the difference between a graphic element and its surroundings, the more that element will stand out."*

Contraste possible par : couleur, taille, forme.

**Exemple Woot.com :** bouton "I want one!" — oval shape unique dans un design rectangulaire + espace blanc autour → contraste ET isolation → emphase double. *"The owners of Woot really want you to click that button."*

### Proportion
*"If we place an object in an environment that's of larger or smaller scale than the object itself, that object will appear larger or smaller than it does in real life."*

Singe géant superposé sur Manhattan → contraste de couleurs + différence de proportion → l'œil dit immédiatement "quelque chose ne va pas" → fixation sur le singe.

**Application : miniaturisation.** Un mini-personnage dans un header se démarque parce que contraste + isolation + proportion hors norme.

### Applications CSS natives pour l'emphase
- **blockquote** : indente gauche et droite → isolation → emphase
- **position: absolute** : sort de son flux → positionnement stratégique
- **NE JAMAIS utiliser** `<blink>` : contraste répété indéfiniment → fatigue et irritation
- **NE JAMAIS utiliser** `<marquee>` : même raison

*"Design is just as much about what we leave out as it is about what we put in."*

---

## 7. Layouts courants

### Left-column Navigation
Le **standard de facto**. *"Regardless of whether we're talking about liquid or fixed-width layout design, the left-column navigation format is the de facto standard."* Beaird estime qu'il a conçu ~75% de ses sites avec ce layout.

**Avantages :** familier, rassurant, sécurisant.
**Inconvénients :** manque de créativité, tous les sites commencent à se ressembler.

### Right-column Navigation
Difficile de trouver des sites qui mettent la navigation principale à droite — courant pour sous-navigation, publicité ou sous-contenu.

**Avantage :** en cultures occidentales, les yeux scannent de gauche à droite → le contenu principal est vu en premier.

*"If you want your design to be different from the average web site, but you still want users to be able to find your navigation, you should give a right-column layout a try."*

### Three-column Navigation
Colonne centrale large (contenu) + deux colonnes latérales étroites.
**Attention :** le whitespace est essentiel pour éviter l'encombrement. De nombreux sites à 3 colonnes passent à 2 colonnes sur les pages internes.

### Getting Inspired (Sources d'inspiration)

Beaird liste des galeries CSS pour observer les layouts existants et identifier les tendances : CSS Zen Garden (l'original), CSS Beauty, Stylegala, CSS Vault, Design Interact. L'objectif n'est pas de copier mais de voir au-delà des couleurs et textures pour identifier les boîtes qui constituent le layout.

### Morgue File (Dossier d'inspiration)

**Principe** — Technique apprise en école de design : pour tout grand projet, collecter et classer des captures d'écran, images, ads, illustrations qui pourraient servir d'inspiration. Nommé "morgue file" par tradition.

**Application web** — Prendre des captures d'écran de sites admirés et les classer dans des dossiers : leftnav, rightnav, 3column, oddball. Ce repository est utile à chaque nouveau projet quand on cherche comment d'autres designers ont résolu un problème similaire (ex: traitement d'un background, navigation atypique).

**Méthode** — Screenshot de la fenêtre browser (Alt+PrintScreen PC, Shift+Cmd+4 Mac) → coller dans un éditeur d'images → sauvegarder dans le dossier thématique.

**Connexions** — Voir aussi → `11-wathan-processus.md` § Choose a Personality (observer le secteur), `18-wathan-finitions.md` § Leveling Up (look for decisions you wouldn't have made, rebuild favorite interfaces).

### Tendances émergentes (Fresh Trends)

**Expansive Footer Navigation :**
Plutôt que de limiter le footer aux liens principaux et au copyright → étendre cet espace pour inclure : informations de contact, navigation étendue du site, contenu supplémentaire (blogrolls, linkrolls, badges Flickr). La navigation principale ne doit pas être dans le footer — uniquement de la navigation "bonus".

**Three Columns with Content First :**
Contenu sur la colonne gauche (pas au centre). Approche plus moderne et professionnelle. Transition naturelle vers 2 colonnes sur les pages internes : la colonne de contenu s'élargit vers la droite sans avoir à se déplacer.

---

## 8. Largeur fixe vs. liquide

### Tableau comparatif

| Critère | Fixed-width | Liquid-width |
|---|---|---|
| Contrôle du designer | Total | Limité |
| Whitespace planifié | Possible | Difficile |
| Lisibilité (lignes courtes) | Meilleure | Variable selon résolution |
| Adaptation aux résolutions | Non | Oui |
| Scroll horizontal | Risque | Moins de risque |
| Exécution | Plus simple | Plus complexe |
| Peut paraître | Petit dans large browser | Manque de whitespace |

### La préférence de Beaird
*"I've designed more fixed-width layouts than liquid."* Raison : contrôle sur l'affichage du contenu et le travail avec l'espace de fond.

### Variable Fixed-width Layout (Richard Rutter)
Terme légèrement oxymorique : layout fixe qui se réarrange à certains breakpoints. Ex. : Colly Logic (Simon Collison) → browser à 800px = 2 colonnes ; à 1024px = 3 colonnes.

### Résolution d'écran
*"The most important factor in web design is the end user."*

Si le site cible des professionnels du web ou des gens avec équipement récent → on peut dépasser 800px. **Règle absolue :** ne pas forcer le scroll horizontal → nauséabond pour l'utilisateur.

**Exemple A List Apart :** conçu au-delà de 800px, mais tout le contenu réel reste visible sans scroll même à 800×600. À 1024×768 : colonne supplémentaire droite apparaît (fonctionnalités, liens, publicité) → ajoute structure sans être indispensable.
