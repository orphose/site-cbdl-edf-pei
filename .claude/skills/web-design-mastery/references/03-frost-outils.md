# Frost — Chapitre 3 : Tools of the Trade

> **Sommaire** : 1. Ce qu'est Pattern Lab — 2. Russian nesting dolls — 3. Données dynamiques — 4. Pseudo-patterns — 5. Viewport tools — 6. Code view — 7. Documentation vivante — 8. Pattern lineage — 9. Caractéristiques d'une bonne library — 10. Structure de fichiers — 11. Autres outils

## Pattern Lab et qualités d'une pattern library efficace

---

## 1. Ce qu'est (et n'est pas) Pattern Lab

### Ce qu'est Pattern Lab
- Un **outil de génération de site statique** pour construire des systèmes de design atomiques
- Un **outil de documentation et d'annotation** de patterns
- Un **kit de démarrage** pour pattern library

### Ce que Pattern Lab N'est PAS
- **Pas** un framework UI comme Bootstrap ou Foundation
- **Pas** dépendant d'un langage, d'une bibliothèque ou d'un style
- **Pas** un remplacement pour un CMS

### Design délibérément minimaliste
Le design de Pattern Lab "out of the box" est intentionnellement dépouillé pour **éviter d'être classifié comme framework UI**. Pattern Lab ne vous donne aucune réponse sur comment designer ou architecturer votre code front-end. Vous devez faire ce travail vous-même.

*"The look and feel, naming conventions, syntax, structure, libraries, and scripts you choose to use to create your UI are entirely up to you and your team."*

### Aspect technique
Pattern Lab utilise PHP ou Node.js comme moteur. Mais l'output final est du HTML, CSS, JavaScript **backend-agnostic** → votre site final n'a pas besoin d'être en PHP ou Node.

---

## 2. Le principe des Russian nesting dolls (Matryoshka)

**Principe central de Pattern Lab :** Les plus petits patterns (atomes) sont inclus dans de plus grands (molécules), qui sont inclus dans de plus grands encore (organismes), puis dans les templates.

Cela maintient les choses **DRY** (Don't Repeat Yourself) : modifier un pattern répercute automatiquement le changement partout où ce pattern est utilisé. *"This Russian nesting doll approach considerably speeds up your workflow, and certainly beats the pants off sifting through hundreds of Photoshop documents for every instance of a pattern."*

### Syntaxe d'inclusion (Mustache)
Pattern Lab utilise le langage de templating **Mustache** :
```mustache
{{> atom-thumbnail }}
```
Le `>` indique à Pattern Lab d'inclure le pattern "thumbnail" classé comme atome.

### Exemple réel : Time Inc.
**Molécule block-post** :
```html
<div class="block-post">
  <a href="{{ url }}">
    {{> atoms-thumb }}
    <h3>{{ headline }}</h3>
    <p>{{ excerpt }}</p>
  </a>
</div>
```

Cette molécule peut être incluse partout : `{{> molecules-block-post }}`

**Organisme header** :
```html
<header role="banner">
  {{> atoms-logo }}
  {{> molecules-primary-nav }}
  {{> molecules-search }}
</header>
```

Inclus partout avec : `{{> organisms-header }}`

**Template homepage** :
```mustache
{{> organisms-header }}
<main role="main">
  {{# hero }}
    {{> molecules-hero }}
  {{/ hero }}
  <section>
    {{# experience-block }}
      {{> molecules-block-main }}
    {{/ experience-block }}
    {{# experience-feature }}
      {{> organisms-story-feature }}
    {{/ experience-feature }}
  </section>
  {{# factoid-advertising }}
    {{> organisms-factoid }}
  {{/ factoid-advertising }}
  ...
</main>
{{> organisms-footer }}
```

Note : certains patterns reçoivent un nom unique via `{{# factoid-advertising }}{{> organisms-factoid }}{{/ factoid-advertising }}` pour pouvoir y attacher des données dynamiques.

---

## 3. Données dynamiques dans Pattern Lab

### Le problème du design "best-case scenario"
Les designers ont tendance à ne concevoir que les cas parfaits : nom = "Sara Smith" sur une ligne ; photo de profil idéale ; profil complètement rempli ; deux colonnes exactement de la même hauteur. **Ces cas idéaux n'existent presque jamais dans le monde réel.**

### JSON pour données dynamiques
Pattern Lab utilise JSON (aussi YAML, Markdown, autres formats) pour définir et swapper le contenu dynamique.

**data.json** (données par défaut) :
```json
"hero": {
  "headline": "Lorem Ipsum",
  "img": {
    "src": "/images/sample/fpo_hero.png",
    "alt": "Hero Image"
  }
}
```

**00-homepage.json** (données page spécifique) override les defaults :
```json
"hero": {
  "headline": "Moving People",
  "img": {
    "src": "/images/hero_beyonce.jpg",
    "alt": "Beyonce"
  }
}
```

### Avantages de la séparation structure/données
1. **Séparation propre** : modifier le contenu n'affecte pas la structure, et vice versa
2. **CMS ad hoc** : simule un CMS sans installer WordPress/Drupal juste pour des variations UI
3. **Blueprint pour les devs back-end** : montre clairement quelles parties sont statiques vs. dynamiques → facilite l'intégration
4. **Contribution des non-devs** : rédacteurs, content people, designers peuvent gérer le contenu sans toucher au code de structure

---

## 4. Pseudo-patterns : variantes de UI

### Le problème
Articuler les variations UI (meilleur cas, pire cas, tout ce qui est entre les deux) dans des outils statiques est fastidieux et rarement fait. Mais si on veut des systèmes qui adressent toutes les variables et réalités du contenu, on doit prendre ces "et si ?" en compte.

### Questions cruciales à couvrir
- Que se passe-t-il si l'utilisateur n'a pas de photo de profil ?
- Que se passe-t-il si 87 items dans le panier ?
- Que se passe-t-il si un titre contient 400 caractères ?
- Que se passe-t-il pour un utilisateur admin vs. standard ?
- Que se passe-t-il si l'article n'a aucun commentaire vs. 7 niveaux de commentaires imbriqués ?
- Que se passe-t-il si on doit afficher un message urgent sur le dashboard ?

### La solution : pseudo-patterns
Fichier `dashboard~admin.json` dans le dossier `/pages/` :
- Le `~` indique un pseudo-pattern
- Hérite automatiquement de toutes les données de `dashboard.json`
- Peut append ou override des données supplémentaires

```json
"isAdmin": true
```

Dans le template :
```html
<div class="block">
  <img src="{{ img }}" alt="{{ name }}" />
  <h3>{{ name }}</h3>
  <h4>{{ title }}</h4>
  {{# isAdmin }}
    {{> molecules-block-actions }}
  {{/ isAdmin }}
</div>
```

Si `isAdmin` = true → inclut les boutons edit/delete. Si false ou absent → ne les inclut pas.

*"You can extend this technique to dramatically alter the entire UI (like altering the primary navigation, showing additional panels on the dashboard, adding extra controls) just by changing a single variable."*

---

## 5. Viewport tools : tester sur tout le spectre de résolution

### Réfuter le testing sur devices spécifiques
Les premiers outils de responsive design se concentraient sur des largeurs populaires (320px iPhone portrait, 480px iPhone landscape, 768px iPad portrait). **Mais le web est bien plus divers que 3 vues.**

### L'outil "ish."
Créé par Frost, intégré dans Pattern Lab :
- Bouton "small" → viewport small-ish (aléatoire dans la plage)
- Bouton "medium" → viewport medium-ish
- Bouton "large" → viewport large-ish

*"These randomized values help designers and developers better consider the entire resolution spectrum rather than a handful of popular device dimensions."*

**Valeur éducative :** Aide à éduquer clients et collègues que le design system doit fonctionner quelle que soit la taille du viewport. Les amène à comprendre que le responsive n'est pas "desktop + mobile" mais un **spectre continu**.

### Container queries (vision)
Frost anticipe les container queries (alors encore en développement) : permettre aux éléments de s'adapter selon leur container parent plutôt que le viewport entier. Cela permettrait de créer des composants véritablement fluides qui s'adaptent à n'importe quel container — fondement des systèmes de patterns portables.

*"The more fluid a UI component is, the more resilient and versatile it becomes."*

---

## 6. Code view : voir le code sous-jacent

### Pourquoi exposer le code
- Accélère le développement (copier-coller)
- Aide les équipes à enforcer des conventions de syntaxe et de style
- Particulièrement utile quand beaucoup de développeurs travaillent sur la codebase

### Types de code à exposer
Varient selon l'organisation, mais généralement :
- HTML du pattern
- Code de templating (Mustache, Twig, Handlebars...)
- CSS spécifique au pattern
- JavaScript associé

**Exemple Salesforce Lightning** : expose le HTML + tout le (S)CSS du pattern.

**Exemple Lonely Planet (Rizzo)** : le plus avancé — expose uniquement le **code d'inclusion** du pattern (template usage), car pattern library et environnement de production partagent le même code. Il suffit aux développeurs de coller l'include pour utiliser le pattern.

Pattern Lab expose : HTML compilé + code de templating.

---

## 7. Documentation vivante et annotations

### Le problème des specs PDFs
Les wireframes et specs PDF contiennent des insights précieux, mais sont jetés à la poubelle dès que le projet passe en production. **La documentation doit être baked into the living design system.**

### Descriptions de patterns dans Pattern Lab
Créer un fichier Markdown correspondant au nom du pattern (ex: `pattern-name.md`) → la description apparaît dans la liste de la library.

### Annotations interactives
Feature clé de Pattern Lab : **attacher des annotations à n'importe quel élément UI** et les voir dans le contexte du design vivant et respirant. Quand les annotations sont activées, chaque élément annoté reçoit un numéro → un clic saute à l'annotation correspondante.

*"This allows teams to view pattern considerations within the context of the full UI."*

---

## 8. Pattern lineage : contexte d'utilisation

### Le problème
En regardant des patterns dans une library, la question naturelle est : *"Great, but where is this component actually used?"*

### La solution : lineage automatique
Grâce à l'approche Russian nesting dolls, Pattern Lab peut afficher :
- **Quels patterns composent** un composant donné
- **Où ce composant est utilisé** dans le design system

**Exemple concret :**
Molécule `media-block` (image + titre + texte + groupe de boutons) :
- Contient : `atoms-square` (image thumbnail) + `molecules-button-bar` (groupe de boutons)
- Utilisée dans : `media-block-list` organisme

### Utilité pratique
*"Let's say we wanted to make changes to a particular pattern, like doubling the size of an image or adding an additional element: we'd immediately know which patterns and templates would need to be retested and QA'd to ensure nothing breaks with the changes."*

Aide aussi à identifier les patterns **redondants ou sous-utilisés** pour les éliminer avant le lancement.

---

## 9. Caractéristiques d'une pattern library efficace (indépendant de l'outil)

Quelle que soit la plateforme ou l'outil choisi, une bonne pattern library doit :

1. **Fournir des descriptions et annotations** pour chaque pattern
2. **Exposer le code pertinent** (HTML, templating, CSS, JavaScript) selon les besoins de l'équipe
3. **Permettre de visualiser les patterns sur tout le spectre de résolution** (pas seulement 3 breakpoints)
4. **Permettre de montrer les variations de patterns** (ex : tabs actifs ou désactivés)
5. **Permettre d'injecter dynamiquement du contenu représentatif réel** dans les structures
6. **Fournir des informations contextuelles** : quels patterns composent ce composant, et où est-il utilisé

*"At the end of the day, it's not about the tools we use to create pattern libraries, but rather how we use them."*

---

## 10. Structure de fichiers Pattern Lab

```
patterns/
├── 00-atoms/
│   ├── 00-global/
│   ├── 01-text/
│   ├── 02-lists/
│   ├── 03-images/
│   ├── 04-forms/
│   └── 05-buttons/
├── 01-molecules/
│   ├── 00-text/
│   ├── 01-navigation/
│   ├── 02-blocks/
│   └── 03-media/
├── 02-organisms/
│   ├── 00-global/
│   ├── 01-article/
│   └── 02-sections/
├── 03-templates/
└── 04-pages/
```

*"The most important consideration is to establish naming and categorization that is most effective for your team."* Les dossiers peuvent être renommés et réorganisés selon les besoins.

---

## 11. Autres outils de pattern library

Pattern Lab n'est pas le seul outil. Frost liste des ressources sur **styleguides.io**. Points à évaluer pour tout outil :
- Comment s'intègre-t-il à l'infrastructure existante de l'organisation ?
- Comment s'aligne-t-il avec le workflow de l'équipe ?
- Quelle technologie utilise-t-il (PHP, Node, Ruby...) ?
- Permet-il les 6 qualités listées ci-dessus ?

---

## Connexions avec les autres références du skill

- **Tester dans le browser** → `11-wathan-processus.md` § Detail Comes Later (grayscale d'abord, navigateur = vérité)
- **Empty states dans Pattern Lab** → `18-wathan-finitions.md` § Don't Overlook Empty States (les données dynamiques de Pattern Lab aident à voir les cas vides)
