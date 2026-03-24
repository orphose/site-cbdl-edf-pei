# Frost — Chapitre 1 : Designing Systems
## "Create design systems, not pages"

---

## 1. Le problème de la métaphore « page »

### Origine historique
La métaphore de la page est ancrée dans la genèse documentaire du Web : Tim Berners-Lee a inventé le World Wide Web pour partager des **documents** entre chercheurs du CERN. Cette origine académique a gravé « page » dans le vocabulaire de l'internet dès le premier jour.

### Pourquoi cette métaphore nuit concrètement
Les erreurs de périmètre induites par la pensée « page » :
- *"We're a startup looking to launch a five-page website this October"* → suppose que toutes les pages ont la même complexité
- *"Brad, how long will the home page take to build?"* → impossible à répondre sans connaître les composants
- *"How are we ever going to redesign this university website that contains over 30,000 pages?!"* → 30 000 pages peuvent n'être que 3 content types et 2 layouts

**Frost :** *"Ultimately, a project's level of effort is much better determined by the functionality and **components** contained within those pages, rather than on the quantity of pages themselves."*

### La page = fiction stable sur un medium fluide
Le web est un medium **fluide, interactif, interdépendant**. Une page n'est pas une unité uniforme, isolée, quantifiable. La page est trop grossière pour raisonner correctement sur la complexité réelle.

---

## 2. Pourquoi la modularité est devenue obligatoire

### L'explosion des appareils
*"Disruption will only accelerate. The quantity and diversity of connected devices — many of which we haven't imagined yet — will explode, as will the quantity and diversity of the people around the world who use them. Our existing standards, workflows, and infrastructure won't hold up. Today's onslaught of devices is already pushing them to the breaking point. They can't withstand what's ahead."* — Future-Friendly Manifesto

Aujourd'hui : smartphones, tablettes, phablets, netbooks, laptops, desktops, TVs, consoles, montres, voitures, signalétique numérique. Demain : tout ce qu'on n'a pas encore imaginé.

### Précédents industriels de la modularité
- **Révolution industrielle** : Ford = pièces interchangeables + chaîne d'assemblage → uniformité, fiabilité, sécurité, rapidité
- **Informatique** : programmation orientée objet → *separation of concerns*, *single responsibility principle*
- **Web 2000s** : YUI, jQuery UI = premières bibliothèques de composants
- **CSS modulaire** : OOCSS, SMACSS, BEM → architecture CSS modularisée

### La modularité touche tous les aspects
- **Stratégie** : rénovations incrémentales vs. bulldozer complet tous les 3-8 ans
- **Contenu** : COPE (Create Once, Publish Everywhere) — NPR, Karen McGrane
- **Code** : patterns JavaScript, architectures CSS modulaires
- **Design** : on n'a plus le temps de créer des centaines de comps PSD

### Le problème des redesigns massifs (Big Bang)
Quand une refonte majeure lance des changements drastiques : les utilisateurs dégringolent ce que Jared Spool appelle *"the Magic Escalator of Acquired Knowledge"*. Des années d'apprentissage de l'interface précédente sont effacées. Sans changement fondamental de process, l'histoire se répète : New-And-Shiny™ devient Old-And-Crusty™. Les organisations repoussent les updates jusqu'au prochain big bang, se paralysant elles-mêmes.

**La solution** : s'inspirer des startups lean → MVPs + livraisons fréquentes + itérations sur feedback utilisateur.

### Agile vs. agile (capital A vs. lowercase a)
- **Agile** (majuscule) = méthodologie spécifique avec manifeste, Scrum, Lean
- **agile** (minuscule) = désir informel d'un process efficace, empruntant certains principes sans l'adopter en entier
- Brett Harned : *"We want to be more agile; we're embracing change, continuing improvement, being as flexible as possible, and adapting as we see fit."*
- Même sans Agile complet : équipes cross-disciplinaires, aller dans l'environnement final plus vite, livrer tôt et souvent, décomposer les grosses tâches en plus petites

### Design visuel modulaire
Stephen Hay : *"Presenting fully baked Photoshop comps 'is the most effective way to show your clients what their website will never look like.'"*

Andy Clarke sur le concept de « design atmosphere » : *"Atmosphere describes the feelings we get that are evoked by colour, texture and typography. […] The atmosphere of a design doesn't depend on layout. It's independent of arrangement and visual placement. It will be seen, or felt, at every screen size and on every device."*

→ Les outils statiques (Photoshop, Sketch) excellent pour définir l'atmosphère de design. Mauvais pour définir un système complet.

---

## 3. Les style guides et leurs types

### Définition
*"The cornerstones of good design systems are style guides, which document and organize design materials while providing guidelines, usage, and guardrails."*

### Les 6 types de style guides

#### 1. Brand identity guidelines
Définissent les assets et matériaux qui rendent une entreprise unique : logos, typographie, palettes de couleurs, messages (mission, taglines), collateral (templates business cards, PowerPoint). Répondent à : *"Comment tout le monde dans l'organisation parle d'une seule voix ?"* et *"Quels Pantone utiliser ?"*

#### 2. Design language guidelines
Direction de design plus difficile à définir que la brand identity. Exemple canonique : **Material Design de Google** — définit philosophie de design, objectifs, principes généraux, applications spécifiques. Moins gravé dans le marbre que les brand guidelines : Google pourra un jour remplacer Material Design par un nouveau langage tout en conservant sa brand identity.

#### 3. Voice and tone guidelines
- La **voix** reste constante jour après jour
- Le **ton** change selon la situation et les émotions du lecteur
- Exemple : **MailChimp** — définit comment le ton doit changer selon le type de contenu (carte de crédit refusée → passer du ton enjoué au ton sérieux)

#### 4. Writing style guides
Standards pour les auteurs contribuant du contenu : grammaire, ponctuation, style rédactionnel. Exemple : Dalhousie University's writing style guide — liste concise de principes et best practices.

#### 5. Code style guides
Conventions, patterns, exemples pour l'écriture du code. GitHub's code style guide couvre HTML, CSS, JavaScript, Ruby. Objectif : code lisible, scalable, maintenable. Empêcher chaque développeur de faire sa propre cuisine.

#### 6. Pattern libraries (front-end style guides / UI libraries / component libraries)
**The main event.** Le reste de l'ouvrage se concentre sur ceux-ci.

---

## 4. Bénéfices des style guides

### Consistance et cohérence
Exemple vécu de Frost : site d'assurance santé → 5 clics = 4 interfaces distinctes, certaines datant de 1999. Résultat : l'utilisateur ne fait plus confiance à l'interface pour traiter son paiement correctement. **L'incohérence détruit la confiance.**

Les style guides encouragent la réutilisation de patterns existants. Même les tierces parties (portails de paiement externalisés, sites localisés) peuvent mieux correspondre à l'expérience principale.

### Vocabulaire partagé
*"What does 'utility toolbar' mean? Does everyone understand what a 'touch slider hero' is?"*

Sans style guide : des disciplines différentes utilisent des noms différents pour le même composant. Les individus inventent leurs propres conventions. Exemple Starbucks : nommer les patterns 'Blocks Three-Up' permet à toute l'équipe de parler le même langage.

*"Style guides establish a consistent, shared vocabulary between everyone involved in a project, encouraging collaboration between disciplines and reducing communication breakdowns."*

### Éducation (Anna Debenham, *Front-End Style Guides*)
*"A style guide can show clients that websites are systems rather than collections of pages."*

Les style guides luttent contre ce que Frost appelle le **"special snowflake syndrome"** : certains départements croient avoir des problèmes uniques et exigent des solutions sur-mesure. En exposant le design system via le style guide, ces "special snowflakes" comprennent mieux pourquoi leurs demandes de designs custom se heurtent à de la résistance.

### Workflow empathique
Un bon style guide informe designers et développeurs des outils disponibles + fournit les règles d'usage. Forcer les décisions à prendre en compte le système global rend le "going rogue" plus difficile et le "greater good" plus facile.

### Tests facilités
Isoler un composant dans le pattern library permet de localiser précisément ce qui casse, les inconsistances cross-browser, et les problèmes de performance.

### Vitesse
Federico Holgado (MailChimp) : après avoir créé les patterns pour les 4 écrans principaux, lors du passage aux autres sections du site → *"man, this system will actually work here and this system will actually work here and here."*

*"It's true that devising an interface design system and creating a custom pattern library initially takes a lot of time, thought, and effort. But once the pattern library is established, subsequent design and development becomes much faster."*

### Valeur à long terme
Les style guides s'améliorent avec le temps. Analytics, user testing, A/B testing, expérience → incorporated dans le style guide qui devient le hub de la vérité et des best practices. Même lors d'une refonte majeure, les briques structurelles (forms, buttons, headings) restent souvent les mêmes.

---

## 5. Défis et obstacles des style guides

### Le hard sell
La mentalité court-termiste des organisations. Les bénéfices à long terme sont évidents pour qui pense stratégiquement. Le défi : convaincre ceux enfermés dans la logique trimestre par trimestre.

### La contrainte de temps
*"Style guides are time-consuming to create."* La pression pour sortir le produit détourne de l'effort nécessaire.

### Projet auxiliaire vs. partie intégrante
*"Pattern libraries are often treated as auxiliary projects, rather than as the component parts of the final product."* Résultat : elles tombent dans la catégorie "nice to have" et sont sacrifiées dès que les délais se resserrent. Comme l'accessibilité, les pattern libraries ne doivent pas être un "line item" séparé mais une pratique intégrée par défaut.

### Maintenance et gouvernance
Sans stratégie de maintenance, les style guides finissent à la poubelle comme les PSDs et PDFs. *"Style guides will be thrown in the trash and abandoned without a proper strategy in place for who will manage, maintain, and enforce them."*

### Confusion d'audience
Perçues comme des outils pour designers OU développeurs uniquement → perdent de la visibilité → inefficaces. Trop vagues = intimidant pour les non-designers. Trop techniques = intimidant pour les non-devs.

### Manque de contexte
La plupart des pattern libraries n'indiquent pas **où, quand et comment** utiliser leurs composants. Sans contexte, les designers et développeurs ne savent pas quels patterns sont globaux vs. locaux, ce qui rend difficile de savoir quelles pages retester lors d'une modification.

### Manque de méthodologie
*"I often feel like many pattern libraries are little more than loosely arranged sprays of modules."* Les modules sont documentés mais sans hiérarchie ni structure cohérente.

---

## 6. Frameworks UI (Bootstrap, Foundation) : avantages et limites

### Avantages
- **Vitesse** : patterns cross-browser testés, prototypage rapide
- **Communauté** : support, aide, exemples
- **Bootstrap = repo le plus populaire de GitHub** (77 000 stars à l'écriture du livre)
- **Freelances** : prendre plus de projets, générer plus de revenus
- **Startups** : lancer des MVPs plus vite

### Limites
- **Effet "sci-fi jumpsuit"** : quand tout le monde utilise les mêmes boutons, grilles, dropdowns → les interfaces se ressemblent. Nike, Adidas, Puma sur Bootstrap = quasi indiscernables.
- **Bloat** : les utilisateurs téléchargent le CSS/JS de composants qu'ils n'utilisent pas → pages plus lentes
- **Sur-customisation** : au bout d'un moment, modifier le framework pour l'adapter à ses besoins prend plus de temps que l'avantage de départ en vitesse
- **Naming conventions** : "jumbotron" peut être incompatible avec la lexique existante d'une organisation

**Dave Rupert** : *"Responsive deliverables should look a lot like fully-functioning Twitter Bootstrap-style systems custom tailored for your clients' needs."* → Create **"tiny Bootstraps for every client"** — pas Bootstrap pour tout le monde, mais votre propre système pour chaque client.

**Conclusion** : L'idée des frameworks est bonne (cohérence, vitesse, composants testés). Mais il faut créer **son** système, pas utiliser un framework générique.

---

## 7. Distinction entre les types de style guides

| Type | Contenu | Audience |
|---|---|---|
| Brand identity | Logos, couleurs, typographie, collateral | Marketing, partenaires externes |
| Design language | Philosophie et direction de design | Design, product |
| Voice & Tone | Comment parler à l'utilisateur | Rédaction, marketing, support |
| Writing | Grammaire, ponctuation, style | Tous les auteurs de contenu |
| Code | Conventions de code | Développeurs |
| Pattern library | Composants UI documentés | Design, dev, PM, stakeholders |

L'idéal : un **hub centralisé** regroupant tous ces types sous un même toit (cf. Intuit's Harmony design system).

---

## 8. Citations clés du chapitre

> *"We're not designing pages, we're designing systems of components."* — Stephen Hay

> *"As an industry, we sell websites like paintings. Instead, we should be selling beautiful and easy access to content, agnostic of device, screen size, or context."* — Dan Mall

> *"Education is as important as documentation. A style guide can show clients that websites are systems rather than collections of pages."* — Anna Debenham

> *"Content needs to be structured and structuring alters your content, designing alters content. It's not 'content then design', or 'content or design'. It's 'content and design'."* — Mark Boulton

---

## Connexions avec les autres références du skill

- **Systématiser les valeurs** → `11-wathan-processus.md` § Limit Your Choices (spacing, color, type, shadows : même philosophie de contrainte systématique)
- **Design tokens concrets** → `13-wathan-layout.md` § Spacing System, `14-wathan-typographie.md` § Type Scale, `15-wathan-couleur.md` § Define Your Shades, `16-wathan-profondeur.md` § Elevation System
- **Concevoir des systèmes, pas des pages** → `11-wathan-processus.md` § Start with a Feature (même idée : l'unité n'est pas la page mais le composant/la feature)
