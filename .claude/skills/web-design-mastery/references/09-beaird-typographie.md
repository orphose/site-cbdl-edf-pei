# Beaird — Chapitre 4 : Typographie

> **Sommaire** : 1. Importance — 2. Contraintes web — 3. Anatomie d'un caractère — 4. Espacement — 5. Alignement — 6. Catégories de fontes — 7. Choix de fontes — 8. Taille CSS — 9. Caractères spéciaux — 10. Application pratique

---

## 1. Pourquoi la typographie est essentielle

*"Let's face it: the core purpose of all web design is communication. Whether we're talking about an online ecommerce store, a web presence for a Fortune 500 company, or a profile for a social networking site, typography is a vital component."*

La typographie est **la substance du branding, la clé de la communication non-verbale, une pièce essentielle du design web.** Regarder un magazine, allumer la télé, faire les courses → des centaines d'usages créatifs et efficaces de la typographie.

**La profession typographique** : avant la composition numérique, chaque lettre de chaque fonte devait être sculptée dans du bois ou coulée en plomb, encrée, puis pressée sur papier. Un métier artisanal exigeant une attention extrême aux détails.

---

## 2. Contraintes du web : les fontes disponibles

### Le problème fondamental
*"When it comes to the Web and choosing fonts for text that will be displayed in a browser, it doesn't matter if you have five, or 5,000, fonts installed; you have to think in terms of the lowest common denominator."*

Le nombre de familles de fontes supportées par **défaut sur les deux OS principaux** est très réduit.

### Les 9 fontes "web-safe"
Disponibles par défaut sur Windows et Mac OS X :
- **Serif :** Georgia, Times New Roman
- **Sans-serif :** Arial, Trebuchet MS, Verdana
- **Monospace :** Courier New, Lucida Console
- **Spéciales :** Impact, Comic Sans MS

**Limitation :** Pour quelqu'un connaissant Helvetica Neue, Futura, Univers → devoir choisir entre Arial, Trebuchet, et Verdana ressemble à *"using a screwdriver to drive in a nail."*

### La propriété CSS font-family avec fallbacks
```css
font-family: 'Calisto MT', Georgia, 'Times New Roman', serif;
```

Logique :
1. Calisto MT (fonte désirée, pour les rares utilisateurs qui l'ont)
2. Georgia (premier backup → safe list)
3. Times New Roman (proche équivalent)
4. serif (generic family → dernier recours absolu)

**Note CSS :** tout nom de famille de fonte contenant des espaces doit être **entre guillemets**.

**Generic families CSS :** serif, sans-serif, cursive (script/handlettered), fantasy (novelty), monospace.

### Solutions pour fontes non-standard

#### 1. Texte en image
Avantage : contrôle total sur la fonte affichée.
Inconvénient : uniquement pour du texte statique qui change peu souvent. Impossible pour les titres d'articles de blog ou tout contenu dynamique.

*"Constantly creating and uploading new text graphics would be a monotonous task, even for a designer who's a pro at using image-editing software."*

#### 2. sIFR (Scalable Inman Flash Replacement)
Inventé par Shaun Inman, amélioré par Mike Davidson et Mark Wubben.

**Fonctionnement :** Flash peut embarquer des fontes et les afficher en anti-aliased. JavaScript peut remplacer des objets HTML par des Flash movies. Combinés → sIFR remplace le texte HTML par le rendu de la fonte voulue dans un Flash movie.

**Avantages :**
- Solution accessible (dégrade gracieusement)
- Si Flash non installé ou JavaScript désactivé → texte browser normal affiché
- Supporters : ABC News (utilise Futura pour les headlines), Nike

**Limitation :** Uniquement pour les headings, pas le body text.

---

## 3. Anatomie d'un caractère

### Les 15 termes essentiels

| Terme | Définition |
|---|---|
| **Baseline** | Ligne imaginaire horizontale sur laquelle reposent la plupart des caractères |
| **Cap height** | Ligne imaginaire marquant la hauteur des majuscules (en dessous du maximum de la fonte) |
| **Crossbar** | Trait horizontal reliant deux lignes dans "A" et "H". Un cross stroke (ex: f, t) ne connecte pas deux lignes |
| **Serif** | Petits traits terminaux aux extrémités de certaines fontes |
| **Meanline** | Ligne imaginaire horizontale marquant le bord supérieur des minuscules. Pas toujours exactement centrée entre baseline et cap height |
| **Bowl** | Courbe arrondie enfermant un espace négatif dans "D", "o", "g" |
| **Descender** | Partie inférieure des lettres g, j, p, q, y qui s'étend sous la baseline. Aussi dans les old-style numerals |
| **Counter** | Espace négatif à l'intérieur d'une lettre. Fermé dans "A", "o", "P". Ouvert dans "G", "u", "c" |
| **Stem** | Trait principal vertical ou diagonal d'un caractère (parties verticales de "I", "H", tous les traits de "W") |
| **Tittle** | **Terme favori de Beaird !** Le point au-dessus du "j" et du "i" |
| **Terminal** | Extrémité d'un stem ou trait sans serif (visible dans le "c" de certaines fontes serif) |
| **Ascender** | Extension d'une minuscule au-dessus de la meanline : b, d, f, h, k, l, t |
| **Leg** | Traits inférieurs angulés dans "K", "R", "Q" (aussi appelés tails) |
| **Ligature** | Fusion de deux caractères ("fi", "fl", "ae") pour un meilleur équilibre esthétique des espacements |
| **X-height** | Hauteur de la lettre "x" minuscule = distance entre baseline et meanline |

**Old-style numerals :** chiffres avec ascenders et descenders (comme en Georgia) → censés mieux se fondre avec les chiffres romains minuscules + superbes intégrés dans du texte.

---

## 4. Espacement du texte (Text Spacing)

*"Many typographic decisions are based on spacing."*

### Espacement horizontal

#### Kerning
Ajustement de l'espace entre **deux lettres spécifiques**. La plupart des fontes ont des règles built-in pour les paires de lettres ("Wa" = beaucoup plus serré que "WV"). Généralement suffisant pour la lisibilité. **Non réglable lettre par lettre en CSS.**

#### Tracking (letter-spacing CSS)
Ajustement uniforme de l'espace entre tous les caractères.

```css
p { letter-spacing: 2px; }   /* plus aéré, ouvert */
p { letter-spacing: -1px; }  /* trop serré = risque pour la lisibilité */
```

*"If you want your text to have a more open, airy feel, try adding a pixel or two to the tracking value."*

#### Word-spacing CSS
Affecte l'espace entre les mots (valeur positive ou négative, ou keyword "normal").

### Espacement vertical

#### Leading (line-height CSS)
Terme venu du letterpress : les bandes de plomb vierges séparant les lignes de métal. "Set solid" = sans espaceur ajouté.

**Le problème par défaut :** l'espacement inter-lignes par défaut des navigateurs est très serré.

*"Text with added vertical space is much easier to read."*

```css
p { line-height: 1.4; }     /* sans unité = multiplicateur de la taille de police */
p { line-height: 24px; }    /* valeur fixe */
p { line-height: 140%; }    /* pourcentage */
```

**Recommandation :** 1.4 à 1.6 pour le corps de texte. Trop grand = les lignes semblent déconnectées.

---

## 5. Alignement du texte (Text Alignment)

### Left (gauche) — défaut et recommandé
Meilleure lisibilité : l'œil retrouve le début de chaque ligne facilement.

### Right (droite)
Labels de formulaire à droite de leurs champs, éléments de sidebar, effets typographiques, textes arabes/hébreux.

### Center (centré)
Titres courts, poésie, callouts. **Pas pour les longs blocs de texte** → difficile de suivre le retour à la ligne.

### Justify (justifié)
Impression → généralement OK. Web → **PROBLÈME : "les rivières"** (rivers).

*"When text is justified, a word processing program or browser tries to adjust the spaces between each word to make the text fill the line perfectly. The result […] tends to produce an abundance of awkward gaps in the text. These gaps have a tendency to line up in a visually distracting river-like pattern that flows vertically down the paragraph."*

**Conseil :** éviter le justify pour les corps de texte web.

---

## 6. Les 6 catégories de fontes

### 1. Serif
**Caractéristique :** petits traits terminaux (serifs) aux extrémités des hampes.

**Sous-catégories avec exemples :**
- **Old Style** (Garamond) : traits de connexion diagonal entre les serifs, contraste minime entre traits fins et épais. Fontes de création du 15-17ème siècle → très lisibles en corps de texte.
- **Transitional** (Times New Roman, Baskerville) : légèrement plus contrastés que Old Style, serifs plus nets. Ponts entre Old Style et Modern.
- **Modern** (Bodoni, Didot) : contraste dramatique entre traits fins et épais. Serifs horizontaux parfaitement fins. Style formel et élégant.
- **Slab Serif** (Clarendon, Courier) : serifs épais et carrés, peu ou pas de contraste entre traits. Robustes et directes. Courier = monospace. Les Slab Serif western semblent musclés et autoritaires.

**Usage web :** acceptables pour les headings. Pour le body text, la résolution peut rendre les serifs flous sur certains écrans (mais les écrans modernes haute résolution ont largement résolu ce problème).

### 2. Sans-serif
**Caractéristique :** pas d'empattements, traits généralement uniformes.

**Sous-catégories :**
- **Grotesque** (Arial, Helvetica) : très légère variation de l'épaisseur des traits, "R" avec jambe droite. Les premières sans-serifs créées.
- **Geometric** (Futura) : construites à partir de formes géométriques simples, trait uniforme. Un "o" = cercle parfait.
- **Humanist** (Gill Sans, Frutiger, Verdana) : influencées par les formes de letterpress, variation subtile de l'épaisseur, feel plus organique.

**Usage web :** **meilleure lisibilité en body text sur écran** (les pixels rendent les serifs moins nets). Verdana conçue spécifiquement pour les écrans basse résolution.

### 3. Handwritten / Script
**Caractéristique :** imitent l'écriture manuscrite ou la calligraphie.

**Sous-catégories :**
- **Calligraphic** (scripts élégants basés sur letterpress) : lettres ne se connectent pas
- **Connected scripts** (lettres liées) : la plupart des fontes "handwriting" modernes

**⚠️ Règle absolue :** utiliser UNIQUEMENT pour des titres courts, logos, signatures, accents. **JAMAIS en corps de texte** → illisible à petite taille. Aucun cas d'usage légitimement long.

*"Handwritten font chosen for 'Florida Style' tagline = Zapfino → casual yet elegant look."*

### 4. Display / Decorative / Novelty
**Caractéristique :** forte personnalité, souvent thématiques, créées pour être utilisées en grand.

**Usage :** logos, titres, affiches, identity. **JAMAIS en corps de texte.**

**Exemple HP "The Computer is Personal Again" campaign :** fonte custom novelty = une part de gribouillage de cahier de notes, une part de Nightmare Before Christmas → renforce le thème personnel de la campagne.

**Où trouver des novelty fonts :** 1001fonts.com, dafont.com, wantedfonts.com (gratuit/shareware) + FontShop, Veer, MyFonts (payant).

### 5. Monospace (Fixed-width)
**Caractéristique :** chaque caractère a exactement la même largeur.

**Usage :** blocs de code, données tabulées, rendu de terminal/machine à écrire. Courier = slab serif monospace.

### 6. Symbol / Dingbat
**Caractéristique :** séries de symboles, icônes, ornements plutôt que lettres.

**Avantage :** fontes vectorielles → scalables sans perte de qualité à n'importe quelle taille. Utiles comme graphiques de support et icônes.

**Difficulté :** trouver le glyphe voulu nécessite de parcourir la moitié de l'alphabet (Beaird tape souvent la moitié de l'alphabet avant de trouver son glyphe).

Wingdings et Webdings = pré-installés Windows. Des centaines d'autres sur le web, souvent thématiques.

---

## 7. Choisir les bonnes fontes

*"Even if you understand all the technical aspects of letterforms and typeface categories, and have access to all the fonts in the world, you can still have difficulty choosing the right ones. That's because font selection is based just as heavily on artistic license and emotional association as it is on technical issues."*

### Méthode de sélection

**Étape 1 : Définir les émotions à évoquer**
- La société est-elle hip et jeune, ou sage et établie ?
- Contenu thématique (Luau, fiesta mexicaine) ou identité formelle ?
- Quelles associations émotionnelles la fonte doit-elle créer ?

**Étape 2 : Penser aux références culturelles**
Logos vus depuis l'enfance, pochettes d'album, manuels scolaires, signalétique → ces typographies ont façonné des perceptions. Utiliser ces associations.

**Exercice de Joe's Restaurant :**
Regarder 20 fontes et choisir celles qui évoquent :
- Bistro italien casual
- Restaurant 5 étoiles en milieu métropolitain
- Bar bas de gamme au bord d'un port

Aucune réponse absolue — mais certaines fontes ne fonctionnent clairement pas dans chaque cas. Réduire progressivement à 2-3 candidates puis 1.

*"Remember that there are no bad fonts—just inappropriate ones."*

**Si incertitude entre deux :** demander à un ami/collègue : *"Which one makes you feel more [adjective]?"* → remplacer [adjective] par l'émotion cible.

### Règles de sélection des fontes

1. **Maximum 4 fontes par projet** (idéalement 2-3)
2. **Ne pas combiner 2 serifs différents** dans le même projet
3. **Ne pas combiner 2 sans-serifs différents** dans le même projet
4. Utiliser l'une pour les titres + l'autre pour le body text = combination classique
5. Le sans-serif est généralement **plus lisible en petit** sur écran → utiliser pour le corps de texte

---

## 8. Taille du texte en CSS

### Le problème historique des pixels
CSS `font-size: 14px;` = non redimensionnable dans Internet Explorer 6 (considère px comme unité absolue). IE7 offre un page zoom mais pas de text resize. **Accessibilité compromise.**

### La solution : le "62.5% trick"
*"My favorite approach involves setting a font size of ten pixels on the body element, and em units for the rest of the document."*

```css
body { font-size: 62.5%; }  /* 1em = 10px (default 16px × 62.5% = 10px) */
p    { font-size: 1.4em; }  /* = 14px */
h1   { font-size: 2.4em; }  /* = 24px */
h2   { font-size: 1.8em; }  /* = 18px */
small { font-size: 1.1em; } /* = 11px */
```

**Avantages :** précision pixel-par-pixel souhaitée + texte redimensionnable dans IE6+ + arithmétique simple (décaler la virgule).

**Em = unité relative :** 1em = taille de la police de l'élément parent. La valeur de 1em change selon la taille de fonte de l'élément parent.

---

## 9. Caractères spéciaux et ponctuation typographique

Un traitement de texte remplace automatiquement les guillemets droits par des guillemets courbes. En HTML, on doit utiliser des entités.

### Entités HTML essentielles

| Entité | Caractère | Description |
|---|---|---|
| `&lt;` | < | Inférieur à |
| `&gt;` | > | Supérieur à |
| `&amp;` | & | Esperluette |
| `&lsquo;` | ' | Guillemet simple gauche |
| `&rsquo;` | ' | Guillemet simple droit / apostrophe |
| `&ldquo;` | " | Guillemet double gauche |
| `&rdquo;` | " | Guillemet double droit |
| `&laquo;` | « | Guillemet anglais gauche |
| `&raquo;` | » | Guillemet anglais droit |
| `&reg;` | ® | Marque déposée |
| `&trade;` | ™ | Trademark |
| `&copy;` | © | Copyright |
| `&cent;` | ¢ | Cent |
| `&pound;` | £ | Livre sterling |
| `&euro;` | € | Euro |
| `&yen;` | ¥ | Yen |
| `&frac14;` | ¼ | Un quart |
| `&frac12;` | ½ | Un demi |
| `&frac34;` | ¾ | Trois quarts |

**Chaque entité a aussi un équivalent numérique :** `&copy;` = `&#169;` → même résultat.

**Pourquoi ne pas coller directement les caractères :** selon l'encodage du fichier HTML, coller des caractères "spéciaux" peut produire du gibberish. De plus, `<` et `>` déclenchent l'interprétation HTML.

---

## 10. Application pratique : décisions typographiques finales

**Questions à résoudre lors du passage en HTML/CSS :**
1. Quel alignement pour chaque élément de texte ?
2. Quelle taille de fonte pour chaque niveau de hiérarchie ?
3. Utiliser des images pour les headings (statiques) ou une solution de remplacement (sIFR) ?
4. Quelles fontes HTML pour le texte dynamique ?
5. Quelles fontes alternatives (CSS fallbacks) pour chaque font-family ?

**Règle sur le body text vs. headers (Florida Country Tile) :**
- Body text → sans-serif (plus lisible en petit sur écran)
- Headlines copy → Georgia serif (plus grande taille → serifs bien rendus)
- Titres homepage → Trajan Pro (transitional serif) + Zapfino (handwritten) → contrast entre formel et personnel

**Philosophie :** définir ces choix typographiques tôt dans le process — **le client doit avoir une idée précise de l'apparence finale du site** bien avant le développement.

---

## Connexions avec les autres références du skill

- **Type scale systématique** → `14-wathan-typographie.md` § Establish a Type Scale (échelle hand-crafted : 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72)
- **Choix de fontes pragmatique** → `14-wathan-typographie.md` § Use Good Fonts (≥ 5 weights, system font stack, ignorer les fontes < 10 styles)
- **Line-height proportionnel** → `14-wathan-typographie.md` § Line-Height Is Proportional (inversement proportionnel à la taille de police)
- **Alignement baseline** → `14-wathan-typographie.md` § Baseline, Not Center
- **Letter-spacing** → `14-wathan-typographie.md` § Use Letter-Spacing Effectively (tighten headlines, increase for all-caps)
- **Longueur de ligne** → `14-wathan-typographie.md` § Keep Your Line Length in Check (45-75 caractères, 20-35em)
- **Hiérarchie par weight/color plutôt que size seule** → `12-wathan-hierarchie.md` § Size Isn't Everything
- **Personnalité par la typographie** → `11-wathan-processus.md` § Choose a Personality (serif=classique, rounded sans=playful, neutral sans=sobre)
