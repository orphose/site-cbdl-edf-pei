# Frost — Chapitre 4 : The Atomic Workflow

> **Sommaire** : 1. Les personnes avant tout — 2. Quand établir un design system — 3. Pitcher un design system — 4. Interface inventory — 5. (Re)setter les attentes — 6. Direction lo-fi — 7. Processus de build — 8. Front-end = design — 9. Checklist workflow

## People, process, and making design systems happen

---

## 1. Les personnes avant tout

*"The not-so-secret secret about creating effective design systems: it all comes down to people truly collaborating and communicating with one another."*

Mark Boulton : *"The design process is weird and complicated, because **people** are weird and complicated."*

Technologie parfaite + outils dernier cri + individus talentueux = encore un résultat médiocre si les gens ne coopèrent pas et ne communiquent pas. Il faut changer les mentalités **avant** d'implémenter les outils.

---

## 2. Quand établir un design system

**Réponse courte : maintenant.**

### Moments naturels pour lancer un design system
- Conjointement à un projet de design ou refonte
- Lors d'une migration de plateforme
- Comme projet autonome (si les stakeholders approuvent)

### "Ask forgiveness, not permission"
Si les clients ou patrons ne savent pas qu'on crée un design system, c'est OK. Le tout, c'est d'avoir quelque chose de tangible à montrer :

**Approche Lego (Wolfram Nagel, *Multiscreen UX Design*) :**
- **Mauvaise approche** : vider toutes les briques sur la table et chercher dans le tas → se concentre uniquement sur le produit final en ignorant les parties
- **Bonne approche** : prendre le temps d'organiser les briques d'abord → travail plus méthodique, économie de temps énorme, meilleur résultat

*"As far as your clients and stakeholders are concerned, the final product is still being produced. So long as you're showing progress on the final work, you can decide how much of your internal process you're willing to expose."*

---

## 3. Pitcher un design system : arguments business

### L'argument universel
*"Do you like saving time and money? Yes or no?"*

### Arguments traduits en termes business
- **Expériences cohérentes** → les utilisateurs maîtrisent l'interface plus vite → plus de conversions → **plus d'argent**
- **Accélération du workflow** → réutilisation de composants établis → déploiement de nouvelles features plus rapide
- **Vocabulaire partagé** → moins de réunions superflues, moins de malentendus → **productivité**
- **Tests simplifiés** → accessibilité baked-in → interfaces accessibles à plus d'utilisateurs, **moins de risques légaux**
- **Fondation future-friendly** → A/B testing, optimisations → rollés dans le système vivant → **amélioration perpétuelle**

---

## 4. Interface inventory (inventaire UI)

### Définition
*"An interface inventory is a comprehensive collection of the bits and pieces that make up your user interface."*

Analogue au content inventory, sauf qu'on inventorie les composants plutôt que le contenu.

### Pourquoi c'est puissant
*"You don't need to be a designer to recognize that having 37 unique button styles probably isn't a good idea."*

Montrer l'inventaire à un CEO suffit à rendre évident pourquoi une approche systématique est nécessaire.

### Le processus en 5 étapes

#### Étape 1 : Réunir les troupes
**ESSENTIEL** : ne pas le faire seul. *"It's absolutely essential to get all members of the team to experience the pain of an inconsistent UI for them to start thinking systematically."*

Réunir des représentants de toutes les disciplines : UX designers, visual designers, front-end devs, back-end devs, copywriters, content strategists, PMs, business owners, QA, et autres stakeholders. **Plus il y a de monde, mieux c'est.**

#### Étape 2 : Préparer l'outil de screenshots
Tout le monde doit utiliser **le même outil** pour combiner facilement les résultats :
- PowerPoint ou Keynote
- Photoshop ou Sketch
- Evernote Web Clipper
- Google Docs ou Microsoft Word
- **Google Slides** (Frost a créé un template dispo en ligne) → canvas libre pour le positionnement, découpé en slides par catégorie, web-based donc facile à partager

#### Étape 3 : L'exercice de screenshots
**Règle** : capturer **une instance de chaque pattern unique**, pas toutes les instances.

Attribuer à chaque participant une catégorie UI :
- **Global elements** : header, footer, éléments partagés sur toute l'expérience
- **Navigation** : navigation principale, footer nav, pagination, breadcrumbs, contrôles de composants interactifs
- **Types d'images** : logos, hero images, avatars, thumbnails, backgrounds
- **Icônes** : magnifying glasses, social icons, arrows, hamburgers, spinners, favicons
- **Formulaires** : inputs, textareas, selects, checkboxes, switches, radio buttons, sliders
- **Boutons** : primary, secondary, big, small, disabled, active, loading, boutons qui ressemblent à des text links
- **Headings** : h1 à h6 et toutes leurs variations typographiques
- **Blocks** (aussi appelés touts, callouts, summaries, ads, hero units) : collections de headings + images + summary text
- **Lists** : unordered, ordered, definition, bulleted, numbered, lined, striped
- **Interactive components** : accordions, tabs, carousels, functional modules avec des parties mobiles
- **Media** : players vidéo, players audio, rich media
- **Third-party components** : widgets, iframes, stock tickers, social buttons, tracking scripts
- **Advertising** : tous les formats et dimensions
- **Messaging** : alerts, success, errors, warnings, validation, loaders, popups, tooltips
- **Colors** : toutes les couleurs uniques (outils comme CSS Stats, Stylify Me)
- **Animation** : enregistrement d'écran de tout ce qui bouge, fait des transitions, tremble, se déplace

**Timing :** 30 à 90 minutes maximum pour un premier passage. Timer + musique de fond pour maintenir un rythme soutenu.

**Creuser partout :** Les organisations ont tendance à favoriser certaines parties de l'expérience (homepage...) au détriment d'autres (FAQs, pages 404, termes légaux, sizing charts). Tout documenter — les utilisateurs perçoivent la marque comme une entité unique.

#### Étape 4 : Présentation des résultats
Après l'exercice, **pause obligatoire** (manger, café, s'étirer).

Chaque participant présente sa catégorie au groupe pendant 5-10 minutes :
- Démonter la rationale derrière les patterns existants
- Kick-starter une conversation sur les naming conventions
- Générer de l'excitation pour une interface plus cohérente

*"It's fascinating to hear the inconsistent names designers, developers, product owners, and other stakeholders all have for the same UI pattern."* → Différents noms pour le même composant ("utility bar", "admin nav", "floating action area") → opportunité de créer un vocabulaire partagé.

#### Étape 5 : Définir les prochaines étapes
Combiner tous les slides en un **über-document**. Puis :
- Quels patterns garder, lesquels éliminer, lesquels fusionner ?
- Quels noms adopter ?
- Comment transformer l'inventaire en pattern library vivante ?

### Bénéfices de l'inventaire
1. **Capture tous les patterns et incohérences** → expose la redondance
2. **Obtient le buy-in organisationnel** → la diversité des participants aide tout le monde à comprendre la valeur d'une UI cohérente
3. **Établit le scope de travail** → évalue l'effort pour concevoir/construire chaque composant, anticipe les difficultés
4. **Pose les fondations du design system** → première étape pour une pattern library complète + établit le vocabulaire partagé

---

## 5. (Re)setter les attentes

### Redéfinir le design
*"The bidirectional and interactive nature of the web adds many more dimensions to what constitutes good design."*

Le web ≠ poster. Le web a : vitesse, taille d'écran, environnement, capacités technologiques, form-factor, ergonomics, usabilité, accessibilité, contexte, préférences utilisateur.

Dan Mall : *"As an industry, we sell websites like paintings. Instead, we should be selling beautiful and easy access to content, agnostic of device, screen size, or context."*

### Étendre la définition du "bon design digital"
Au-delà de l'esthétique visuelle :
- **Embrasser l'ubiquité du web** → design systems accessibles et résilients, inclusifs
- **Créer des layouts et composants flexibles** → fonctionnent sur n'importe quelle dimension
- **Traiter la performance comme principe de design essentiel** → expériences rapides qui respectent les utilisateurs
- **Progressive enhancement** → expérience core solide, puis enrichissements pour les devices modernes
- **Systèmes future-friendly** → résister au test du temps, anticiper les changements

### Mort au waterfall
Scénario waterfall classique → *"homepage_v9_final_for-review_FINAL_bradEdits_for-handoff.psd"* → le front-end dev voit : 7 typefaces, 9 button styles, layout desktop-centrique, contenu utilisateur parfait mais improbable.

**Problèmes du waterfall :**
- Suppose que le travail doit s'écouler séquentiellement (UX → design → dev)
- Chaque discipline "lance" son travail à la suivante comme dans une chaîne de montage
- Retour d'information trop tardif
- Attentes irréalistes générées par les comps statiques

**La vérité :** *"The digital world isn't constrained by the same limitations as the physical one. Pixels are cheap. Changes can happen in an instant, hypotheses can be quickly tested out, and designs and code can be iterated on again and again."*

### Un process plus collaboratif
- Le travail en parallèle ≠ tout le monde à fond tout le temps
- La majeure partie de l'UX research se fait tôt, mais ça ne doit pas bloquer les autres
- Chaque discipline continue à consulter les autres même quand son travail actif majeur est fait
- **Communication constante, feedback loops serrées, vraie collaboration** = le ciment du process

---

## 6. Établir la direction : livrables lo-fi

### Le "20-second gut test"
Exercice idéal lors du kick-off meeting :

1. Choisir 20-30 sites pertinents (mix industrie spécifique + sites visuellement intéressants d'autres industries)
2. Optionnel : Photoshop le logo du client sur chaque site pour plus de réalisme
3. Montrer chaque site pendant **20 secondes**
4. Chaque participant vote sur une échelle de 1 à 10 :
   - 1 = "If this were our site I would quit my job and cry myself to sleep"
   - 10 = "If this were our site I would be absolutely ecstatic!"
5. Demander aux participants de considérer les propriétés visuelles : typographie, couleur, densité, layout, style d'illustration, vibe général
6. Après l'exercice : discuter les 5 scores les plus bas, les 5 plus hauts, et les plus controversés (scores très écartés)
7. Les participants expliquent leur attraction ou répulsion → travailler les différences d'opinion

**Résultat :** expose les stakeholders à diverses directions esthétiques tôt dans le process, les aide à travailler leurs différences de goût, arrive à des valeurs esthétiques partagées.

### Content and display patterns (étape UX)
Plutôt que des wireframes haute-fidélité qui font des suppositions sur le layout et la fonctionnalité technique :

**Approche lo-fi :**
- Esquisses montrant ce qui apparaît sur un écran et dans quel ordre général
- Architecture de l'information basique = liste à puces + une conversation
- **Mobile-first** : les contraintes du petit écran forcent à se concentrer sur le contenu et la hiérarchie essentiels

**Spreadsheet pour content + display patterns :**
Colonnes simples articulant quels display patterns aller sur quel template, avec leur hiérarchie relative et leur rôle. *"If you read the leftmost column vertically, you're effectively looking at the mobile-first view of what the UI could be."*

Questions cruciales : *"What content and display patterns go on this page? And in what general order?"*

**Exemple Jennifer Brook / TechCrunch :** définition de patterns site-wide gestuels qui **ne font aucune supposition** sur l'esthétique ou la fonctionnalité — juste une direction.

### Style tiles
Designer Samantha Warren : deliverable **plus tangible qu'un mood board mais moins HF qu'un comp complet**.

Contenu : couleur, typographie, texture, icônes, autres aspects de l'atmosphère de design — sans supposition sur le layout, sans polish.

**Avantages :**
- Conçus beaucoup plus vite que des comps complets
- Feedback et discussion possibles beaucoup plus tôt
- Facilitent la conversation sur les valeurs stakeholders : *"Does this style tile resonate better with you? Why?"*
- **Renforcent la pensée système** : présenter des swatches de couleurs, exemples de typo, textures éduque les stakeholders aux **ingrédients** plutôt qu'aux pages

### Element collages
Dan Mall : entre style tiles et comps complets.

Collections d'explorations de composants UI — appliquent l'atmosphère de design à des éléments d'interface réels, **libres de layout et de présentation très polie**.

*"It's very clear these collages aren't an actual website, but stakeholders can still get a sense of what the site could look like."*

→ Discussions sur la direction esthétique → idées et direction supplémentaires → comme la nature lo-fi permet d'itérer et évoluer les idées rapidement.

### Front-end prep chef
*"In the restaurant business, an important yet unsung role is that of the prep chef."*

Analogie : le prep chef hache les légumes, marine la viande, prépare les salades à l'avance → la cuisine peut se concentrer sur la collaboration et la cuisine.

**Les front-end devs doivent être les prep chefs du web design process.**

*"If developers aren't coding from day one of the project, there's something wrong with the process."*

Quoi coder dès le jour 1 sans connaître la direction de design :
- Configurer l'environnement de développement (Git repos, serveurs dev, CMSes, outils)
- **Marquer des patterns anticipés** selon le type de projet :
  - E-commerce : site search, panier, page produit, homepage, checkout
  - Service en ligne : formulaires d'inscription/login, flux "mot de passe oublié", dashboard
  - Presque tout : header, footer, zone de contenu principale → templates shell + markup de base
- Ce markup sera brut au départ, mais fournit un **point de départ crucial pour la collaboration**

*"This front-end prep chef work frees up developers' time to collaborate **with** designers, rather than working **after** design is complete."*

---

## 7. Du concept au complet : le processus de build

### L'analogie de la sculpture
Un process digital réussi ressemble à la sculpture soustractive : l'artiste et son client ont une idée générale au départ, mais la vision ne sera pleinement réalisée qu'à la fin. La forme devient plus précise à chaque passe.

*"It's essential to get stakeholders comfortable with reviewing works in progress rather than fully baked designs and code."*

### Rôle des comps statiques (post-PSD era)
Frost à un client après element collages : *"These element collages look great, but it's like you're asking me to comment on how beautiful a face is by showing me the nose."*

→ Les comps complets sont pertinents **après** que la direction esthétique soit établie via lo-fi.

**Quand créer un comp complet :**
- Quand le client est "feeling good" à propos des explorations element collage
- Pour montrer les patterns dans leur contexte de layout complet
- Pour obtenir l'approbation sur la direction globale du design

**Quand s'arrêter de travailler en statique :**
Si le feedback stakeholder dit : *"Can we move this from here to here? Can we add a gray border? Can we increase the size of this image?"* → **passer dans le navigateur**. Ces corrections mineures s'adressent mieux en browser.

### "Designing in the browser" → "Deciding in the browser"
*"Let's change the phrase 'designing in the browser' to 'deciding in the browser'."* — Dan Mall

*"Once the designs are in the browser, they should stay in the browser."*

Le navigateur force à adresser :
- Layout sur tout le spectre de résolution
- Données dynamiques (longueurs de caractères variables, tailles d'images)
- Interaction et animation
- Performance
- Ergonomics
- Rendu des couleurs et du texte
- Pixel density
- Scrolling performance
- Comportements spécifiques aux browsers

### La boucle itérative back-and-forth
- Front-end devs créent, stylisent et connectent les patterns
- Designers réagissent aux implémentations browser + créent des "spot comps" statiques pour corriger des details responsive au niveau organisme
- Ce va-et-vient entre outils statiques et browser → code front-end de plus en plus solide et stable

*"The beautiful thing about a pattern-based workflow is that as each pattern becomes more fully baked, any template that includes the pattern will become more fully baked as well. That means the level of effort to create new templates decreases dramatically over the course of the project, until eventually creating a new template mostly involves stitching together existing patterns."*

---

## 8. Front-end development = partie du design

### Le malentendu fondamental
*"There's a fundamental misunderstanding that all coding is ultra-geeky programming, which simply isn't the case. HTML is not a programming language. CSS is not a programming language."*

HTML et CSS construisent les user interfaces — les mêmes que celles que les designers créent dans Photoshop et Sketch.

**Conséquence organisationnelle :** les designers et les front-end devs siègent souvent sur des étages différents, dans des bâtiments différents, parfois dans des pays différents. *"Creating a division between designers and front-end developers is an absolutely terrible idea."*

**Principe :** traiter le front-end development comme une **partie essentielle du processus de design**.

Quand on montre aux stakeholders uniquement des images statiques → ils peuvent seulement commenter des images statiques → **mauvaises attentes**.

En amenant le design dans le navigateur rapidement → confronter les stakeholders aux réalités du medium final beaucoup plus tôt dans le process.

---

## 9. Checklist du workflow atomique

**UX designers** peuvent créer :
- Esquisses lo-fi établissant l'architecture de l'information basique
- Content + display patterns anticipés

**Visual designers** peuvent :
- Faire le 20-second gut test pour établir les valeurs esthétiques
- Créer des style tiles et element collages pour explorer les directions

**Front-end developers** peuvent :
- Configurer les dépendances du projet
- Stub out les templates de base
- Écrire le markup structurel pour les patterns anticipés

**Tout ça en parallèle, jamais en silos.**

---

## Connexions avec les autres références du skill

- **Feature-first avant le shell** → `11-wathan-processus.md` § Start with a Feature, Not a Layout
- **Cycles courts** → `11-wathan-processus.md` § Don't Design Too Much (work in cycles, smallest useful version)
- **Grayscale d'abord** → `11-wathan-processus.md` § Detail Comes Later (même conseil : couleur en dernier)
- **Personality du produit** → `11-wathan-processus.md` § Choose a Personality (4 leviers : typeface, couleur, border-radius, langage)
- **Direction visuelle** → `06-beaird-layout.md` § Processus de design (papier avant ordinateur), Morgue File
