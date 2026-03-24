# Frost — Chapitre 2 : Atomic Design Methodology
## Atoms, Molecules, Organisms, Templates, and Pages

---

## 1. L'analogie chimique

### Origine de la métaphore
Frost s'inspire de la chimie (cours de lycée avec M. Rae) : les réactions chimiques montrent comment les éléments atomiques se combinent en molécules, qui se combinent en organismes plus complexes.

**La table périodique des éléments HTML** (Josh Duck) : tous les sites web, apps, intranets — tout est composé des mêmes éléments HTML. À partir de ce jeu fini de briques, on peut appliquer le même processus que dans la nature.

### Définitions de base
- **Atomes** : briques fondamentales de la matière. Propriétés uniques, ne peuvent être décomposées sans perdre leur sens. (Atomes = protons + électrons + neutrons, mais l'atome est la plus petite **unité fonctionnelle**.)
- **Molécules** : groupes d'atomes liés chimiquement. Prennent de nouvelles propriétés uniques, plus tangibles et opérationnelles.
- **Organismes** : assemblages de molécules fonctionnant comme une unité. Structures relativement complexes, d'une cellule unique à des organismes sophistiqués comme l'humain.

---

## 2. Les 5 niveaux de l'Atomic Design

**Principe fondamental :** Atomic design is **not a linear process**, but rather a **mental model** to help us think of our user interfaces as both a cohesive whole and a collection of parts **at the same time**. Ne pas interpréter comme "Étape 1 : atomes ; Étape 2 : molécules..." mais comme un modèle mental permettant de travailler simultanément sur l'UI finale et le design system sous-jacent.

---

### NIVEAU 1 : ATOMES

**Définition exacte de Frost :**
*"The atoms of our interfaces serve as the foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like form labels, inputs, buttons, and others that can't be broken down any further without ceasing to be functional."*

#### Ce que sont les atomes
- Éléments HTML de base : labels, inputs, buttons, liens, titres (h1-h6), images, paragraphes, select, textarea, checkbox, radio, etc.
- Éléments visuels : couleurs de marque, typographies de base, icônes isolées
- Design tokens : valeurs d'espacement, border-radius, ombres, opacités

#### Propriétés des atomes
Chaque atome possède des propriétés intrinsèques uniques qui influencent son application dans le système global :
- Exemple : les **dimensions d'une hero image** sont une propriété de l'atome image
- Exemple : la **taille de police d'un h1** est une propriété de l'atome heading
- L'analogie : un atome d'hydrogène a 1 électron vs. hélium qui en a 2 → ces différences ont des effets profonds sur leurs applications (l'hydrogène est extrêmement inflammable, l'hélium est inerte — cf. Hindenburg)

#### Rôle des atomes dans une pattern library
En contexte de pattern library, les atomes **démontrent tous les styles de base d'un seul regard** — référence utile pour le développement et la maintenance du design system.

**Limite des atomes en isolation :** *"like atoms in the natural world, interface atoms don't exist in a vacuum and only really come to life with application."*

---

### NIVEAU 2 : MOLÉCULES

**Définition exacte de Frost :**
*"In interfaces, molecules are relatively simple groups of UI elements functioning together as a unit."*

#### Exemple canonique
Label (atome) + Input texte (atome) + Bouton "Search" (atome) = **Formulaire de recherche** (molécule)

*"When combined, these abstract atoms suddenly have purpose. The label atom now defines the input atom. Clicking the button atom now submits the form. The result is a simple, portable, reusable component that can be dropped in anywhere search functionality is needed."*

#### Le Single Responsibility Principle (SRP)
*"Creating simple components helps UI designers and developers adhere to the single responsibility principle, an age-old computer science precept that encourages a 'do one thing and do it well' mentality. Burdening a single pattern with too much complexity makes software unwieldy."*

#### Avantages concrets des molécules
- **Tests facilités** : composant simple = tests simples et ciblés
- **Réutilisabilité** : la molécule "search form" peut être utilisée dans header, sidebar, page de résultats
- **Cohérence** : le même pattern = le même comportement partout dans l'interface

#### Exemples de molécules courantes
- Champ de recherche = label + input + bouton
- Carte d'article = image thumbnail + titre h3 + extrait de texte
- Item de navigation = icône + libellé + lien
- Widget de notation = étoiles + compteur d'avis + lien voir avis
- Breadcrumb = home + séparateur + page actuelle
- Bouton d'action = icône + label

---

### NIVEAU 3 : ORGANISMES

**Définition exacte de Frost :**
*"Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. These organisms form distinct sections of an interface."*

#### La progression depuis la molécule
Le formulaire de recherche (molécule) + logo (atome) + navigation principale (molécule) = **Header** (organisme)

*"The header forms a standalone section of an interface, even though it contains several smaller pieces of interface with their own unique properties and functionality."*

#### Deux types d'organismes

**Hétérogènes** (éléments dissimilaires) :
- Header de site = logo + navigation principale + barre de recherche + nav utilitaire
- Footer = liens multiple + réseaux sociaux + copyright

**Homogènes** (même molécule répétée) :
- Grille de produits e-commerce = product card molecule × N
- Exemple réel : Gap.com — category page = même molécule "product item" répétée en grille

*"Building up from molecules to more elaborate organisms provides designers and developers with an important sense of context. Organisms demonstrate those smaller, simpler components in action and serve as distinct patterns that can be used again and again."*

#### Quand utiliser les organismes
- La grille de produits peut être employée partout où un groupe de produits doit être affiché : listings catégorie, résultats de recherche, produits similaires
- Les organismes sont **assez autonomes** pour être compris indépendamment de leur contexte

---

### NIVEAU 4 : TEMPLATES

**Rupture avec la chimie :**
*"Now, friends, it's time to say goodbye to our chemistry analogy. The language of atoms, molecules, and organisms carries with it a helpful hierarchy for us to deliberately construct the components of our design systems. But ultimately we must step into language that is more appropriate for our final output and makes more sense to our clients, bosses, and colleagues."*

**Définition exacte de Frost :**
*"Templates are page-level objects that place components into a layout and articulate the design's underlying content structure."*

#### Ce que fait un template
- Réunit des organismes et autres composants pour former le **squelette d'une page**
- Montre les composants **fonctionnant ensemble dans le contexte d'un layout**
- Se concentre sur la **structure sous-jacente du contenu**, pas sur le contenu final

#### Contenu structurel vs. contenu réel
Mark Boulton : *"You can create good experiences without knowing the content. What you can't do is create good experiences without knowing your content structure. What is your content **made from**, not what your content **is**."*

→ Les templates définissent les zones de contenu : tailles d'images, longueurs de caractères pour titres et textes, nombre d'items dans une liste, etc.

#### Questions à poser sur un template
Un template robuste répond à :
- Que se passe-t-il si le titre a 5 mots vs. 50 mots ?
- Que se passe-t-il si l'image est portrait vs. paysage ?
- Que se passe-t-il si la liste a 2 items vs. 200 items ?
- Que se passe-t-il si un utilisateur a beaucoup de droits vs. peu ?

#### Exemple : Time Inc.
Le template de homepage de Time Inc. montre les components-clés en action tout en illustrant la structure du contenu (tailles d'images, longueurs de caractères) avant même de connaître le contenu réel.

---

### NIVEAU 5 : PAGES

**Définition exacte de Frost :**
*"Pages are specific instances of templates that show what a UI looks like with real representative content in place."*

#### Rôle fondamental des pages
*"The page stage is the most concrete stage of atomic design. […] This is what users will see and interact with when they visit your experience. This is what your stakeholders will sign off. And this is where you see all those components coming together to form a beautiful and functional user interface."*

#### La page comme test du système
*"Pages are essential for testing the effectiveness of the underlying design system. It is at the page stage that we're able to take a look at how all those patterns hold up when real content is applied to the design system. Does everything look great and function as it should? If the answer is no, then we can loop back and modify our molecules, organisms, and templates to better address our content's needs."*

#### Variations de templates au niveau page
Les pages permettent d'articuler des **variations de templates**, cruciales pour la robustesse :
- Un utilisateur avec 1 item dans son panier vs. 10 items
- Dashboard avec activité récente vs. dashboard first-time user (section supprimée)
- Titre d'article de 40 caractères vs. 340 caractères
- Utilisateur admin (boutons supplémentaires) vs. utilisateur standard

*"In all of these examples, the underlying templates are the same, but the user interfaces change to reflect the dynamic nature of the content. These variations directly influence how the underlying molecules, organisms, and templates are constructed."*

#### La boucle de feedback pages → système
*"We must create systems that establish reusable design patterns and also accurately reflect the reality of the content we're putting inside of those patterns."*

Problèmes découverts au niveau page → corrections au niveau système → toutes les instances du pattern bénéficient de la correction.

---

## 3. Avantages de l'Atomic Design

### Le tout et les parties simultanément
*"One of the biggest advantages atomic design provides is the ability to quickly shift between abstract and concrete. We can simultaneously see our interfaces broken down to their atomic elements and also see how those elements combine together to form our final experiences."*

Frank Chimero (*The Shape of Design*) : *"The painter, when at a distance from the easel, can assess and analyze the whole of the work from this vantage. He scrutinizes and listens, chooses the next stroke to make, then approaches the canvas to do it. Then, he steps back again to see what he's done in relation to the whole."*

Atomic design = **danse entre les contextes** comme le peintre qui va et vient entre le détail et la vision d'ensemble. Les atomes/molécules/organismes influencent le tout, et le tout influence les parties. Les deux sont inextricablement liés.

### Séparation propre entre structure et contenu
*"A well-crafted design system caters to the content that lives inside it, and well-crafted content is aware of how it's presented in the context of a UI."*

Atomic design fournit un langage pour discuter à la fois de la **structure des patterns** et du **contenu qui va dedans**. Le squelette (templates) et le contenu (pages) s'influencent mutuellement — reconnu et embrassé par la méthode.

Exemple : visualiser le squelette de contenu (même molécule "person block" répétée) vs. le résultat avec contenu réel (certains noms s'étendent sur 5 lignes → problème à corriger au niveau atomique).

---

## 4. La question du naming

### Pourquoi "atomes, molécules, organismes" ?
*"The issue with terms like components and modules is that a sense of hierarchy can't be deduced from the names alone. Atoms, molecules, and organisms imply a hierarchy that anyone with a basic knowledge of chemistry can hopefully wrap their head around."*

### La taxonomie peut être adaptée
GE Design Team : quand ils ont présenté la taxonomie atomique à leurs collègues, ils ont reçu des regards confus. Leur taxonomie finale : "Principles", "Basics", "Components", "Templates", "Features", "Applications" → a permis à tout le monde de s'aligner.

**Conclusion :** *"Atomic design is not rigid dogma. Ultimately, whatever taxonomy you choose to work with should help you and your organization communicate more effectively in order to craft an amazing UI design system."*

### "Atomic design" comme buzzword
Encapsule les concepts de design et développement modulaires → utile pour convaincre les parties prenantes et parler avec les collègues.

---

## 5. Atomic Design s'applique à toutes les interfaces (pas seulement le web)

Frost applique la méthodologie à Instagram (app native mobile) :
- **Atomes** : icônes, éléments texte, image principale, avatar
- **Molécules** : barre de navigation basse, barre d'actions photo (like/comment)
- **Organismes** : l'entité "photo" complète (user info + timestamp + photo + actions + like count + caption) → **cornerstone de toute l'expérience Instagram**
- **Templates** : structure d'ensemble montrant le squelette de contenu (username, avatar, photo, like count, caption)
- **Pages** : Instagram avec vrai contenu

**Précision importante :** *"Let me be clear about this: atomic design has nothing to do with web-specific subjects like CSS or JavaScript architecture."* L'atomic design traite de la conception des systèmes d'interface **indépendamment de la technologie** utilisée pour les créer.

---

## 6. Résumé des 5 niveaux

| Niveau | Définition | Exemple |
|---|---|---|
| **Atomes** | Éléments HTML indivisibles, propriétés intrinsèques | `<label>`, `<input>`, `<button>`, `<h1>`, couleur de marque |
| **Molécules** | Groupes simples d'atomes fonctionnant comme unité, SRP | Search form = label + input + button |
| **Organismes** | Composants complexes formant des sections distinctes | Header = logo + nav + search |
| **Templates** | Squelettes page avec structure de contenu, sans contenu réel | Homepage template avec zones définies |
| **Pages** | Instances de templates avec contenu représentatif réel | Homepage avec titre "Moving People" + photo Beyoncé |

---

## 7. Citations clés du chapitre

> *"Atomic design is not a linear process, but rather a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time."*

> *"Pages are essential for testing the effectiveness of the underlying design system."*

> *"We must create systems that establish reusable design patterns and also accurately reflect the reality of the content we're putting inside of those patterns."*

> *"It would be foolish to design buttons and other elements in isolation, then cross our fingers and hope everything comes together to form a cohesive whole."*

---

## Connexions avec les autres références du skill

- **Hiérarchie dans les composants** → `12-wathan-hierarchie.md` § Not All Elements Are Equal (classifier primaire/secondaire/tertiaire à chaque niveau atomique)
- **Actions dans les organismes** → `12-wathan-hierarchie.md` § Semantics Are Secondary (pyramide primary/secondary/tertiary pour les boutons)
- **Penser au-delà des conventions** → `18-wathan-finitions.md` § Think Outside the Box (dropdowns, tables, radios : les organismes peuvent être réinventés)
- **Layout des templates** → `13-wathan-layout.md` § Grids Are Overrated + You Don't Have to Fill the Whole Screen
