# Frost — Chapitre 5 : Maintaining Design Systems
## Making design systems stand the test of time

---

## 1. Le risque d'obsolescence du style guide

*"A style guide is an artifact of design process. A design system is a living, funded product with a roadmap & backlog, serving an ecosystem."* — Nathan Curtis

La distinction est fondamentale :
- **Artéfact** : quelque chose qu'on trouverait sur un site archéologique ou dans un musée → figé, gelé dans le temps
- **Système vivant** : entité qui respire, s'adapte, évolue

*"Once the pattern library ceases to reflect the current state of the products it serves, it becomes obsolete."*

Quand la pattern library n'est plus à jour → la maintenance du site dégénère en une série de hotfixes et de changements ad hoc → tout le soin apporté au design system original est annulé.

---

## 2. Le changement de mentalité : "design system first"

### Passer de "on fait des sites web" à "on fait un système"
Les produits finaux restent la priorité de l'attention. La pattern library existe comme un "offshoot" documentaire → elle se détache et glisse dans l'abîme.

**La bonne mentalité :** reconnaître que le design system **sous-tend** les produits finaux ET les pattern libraries.

### La friction amicale ("friendly friction")
Cette mentalité "design system first" insère une friction dans le processus de maintenance. *"That friction can be friendly."* Elle force à se demander comment chaque amélioration, demande client, ajout de feature affecte l'ensemble du système plutôt qu'un seul morceau.

**Exemple concret :** dropdown custom sur la page produit sous-performant vs. dropdown natif browser → deux réponses possibles :
1. **Mauvaise réponse** : retirer le dropdown custom de cette page uniquement
2. **Bonne réponse** : se demander "Si ce dropdown custom ne performe pas bien ici, peut-être qu'il ne performe pas bien ailleurs" → auditer → modifier globalement le pattern dropdown dans le design system → toutes les instances bénéficient de l'amélioration

*"Broken behavior and opportunities to enhance the UI will often be realized at the **application** level, but those changes should often be acted on at the **system** level."*

### La redéfinition de "terminé"
Le print et les médias physiques créent des objets permanents et tangibles — une notion de finalité qui n'existe pas sur le web.

*"A design system shouldn't be a project with a finite scope, but rather a product meant to grow and evolve over time."* — Nathan Curtis

*"Focusing on style guide delivery as the climax is the wrong story to tell. A system isn't a project with an end, it's the origin story of a living and evolving product that'll serve other products."*

---

## 3. Les 10 commandements du design system durable

### 1. Make it official
**Parcours :**
1. **Make a thing** : démarrer — choisir un projet pilote, suivre le processus du chapitre 4, empaqueter les UI patterns dans une pattern library
2. **Show that it's useful** : démontrer comment le système a économisé du temps et de l'argent, projeter les bénéfices à l'échelle d'un investissement officiel, faire témoigner des membres d'autres disciplines
3. **Make it official** : avec l'approbation, mettre en place : personnes dédiées, plan de gouvernance, product roadmap

Si les décideurs refusent malgré tout → ne pas se décourager. Continuer à développer le système en mode grassroots. *"As more people benefit from the system, you'll end up with a grassroots-supported system that can help push the endeavor through."*

### 2. Make it adaptable
*"The living part of a living design system means that it needs to roll with the punches, adapt to feedback, be iterated on, and evolve alongside the products it serves."*

Questions de gouvernance à répondre avant de commencer :
- Que se passe-t-il quand un pattern existant ne convient pas à une application spécifique ? (modifier, recommander un autre, créer un nouveau ?)
- Comment gérer les nouvelles demandes de patterns ?
- Comment déprécier les anciens patterns ?
- Que se passe-t-il lors d'un bug ?
- Qui approuve les changements au design system ?
- Qui maintient la documentation à jour ?
- Qui effectue réellement les changements aux patterns ?
- Comment les changements du design system se déploient-ils dans les applications live ?
- Comment les gens apprennent-ils les changements ?

*"Make it as easy as possible for users and makers to communicate."* → Slack/Yammer dédié, office hours régulières, bug tracker approprié.

**Regular "state of the union" meetings :** réunions périodiques avec makers, users et stakeholders pour discuter de ce qui fonctionne, ce qui doit être amélioré, les priorités et la roadmap.

### 3. Make it maintainable : les 3 types de changements

#### Modification de patterns
Raisons légitimes : ajout de features, bug fixes, tweaks visuels subtils ou majeurs, améliorations de performance, améliorations d'accessibilité, refactoring de code, mises à jour des best practices UX.

*"Keeping patterns fresh is essential for the long-term health of the design system. Nobody wants to use and maintain a Web 2.0-looking design system full of bevels and crusty code!"*

#### Ajout de patterns
Des lacunes apparaîtront inévitablement quand le système est appliqué à plus de produits. Question clé avant d'ajouter :

*"Is this a one-off situation or something that can be leveraged in other applications?"*

Stratégie : supposer que c'est un one-off jusqu'à ce qu'une équipe différente ait le même besoin. *"If the team working on Application 2 looks at Application 1 and says, 'I want that!' perhaps that's a good indicator that a one-off pattern should be added to the pattern library."*

⚠️ *"If every whim results in a brand new pattern, the design system will become a bloated and unwieldy Wild West."*

#### Suppression / dépréciation de patterns
Raisons : mauvaise idée a posteriori, l'industrie a évolué, pattern jamais utilisé, beaucoup de feedback négatif.

**Sass Deprecate (Salesforce)** : utilitaire qui flag les patterns allant vers la dépréciation, via des variables Sass et du styling → donne un avertissement préalable aux users, recommande un pattern alternatif.

#### Le Saint-Graal : synchronisation parfaite

*"The design system holy grail involves creating an environment where the pattern library and live applications are perfectly in sync."*

→ Modifier un pattern UI = changement automatiquement reflété dans la pattern library ET dans toutes les applications en production.

**Lonely Planet (Rizzo)** : premier à implémenter le saint-graal. Architecture smart → API pour leurs UI patterns, consommée à la fois par leur pattern library et leur environnement de production. Résultat : application live et documentation toujours en parfaite synchronisation.

**Partager le code front-end :**
- CSS et JavaScript présentationnel → relativement facile → compiler en un seul fichier, CDN + URL versionnée (ex: `http://mycdn.com/1.3.5/styles.css`)
- Markup → plus difficile → logique applicative et markup souvent imbriqués

**Solution : langages de templating comme pont**
Si le design system utilise un templating language (Mustache, Handlebars, Twig, Underscore, Jade, Nunjucks...) et que l'environnement de production utilise le même → les patterns peuvent être partagés entre les deux.

Exemple Phase2 Technology : Pattern Lab (Twig) + Drupal (Twig) → parfaite synchronisation. Drupal peut directement inclure, étendre et embarquer les templates Twig de Pattern Lab **sans duplication de templates**.

*"Is your culture holy grail compatible?"* → Pas toujours possible pour les grandes entreprises décentralisées, les organisations gouvernementales. Le Draft U.S. Web Digital Standards : système idéal pour gouvernement fédéral mais la nature décentralisée rend la synchronisation automatique difficile. **Solution minimale valide quand même.**

### 4. Make it cross-disciplinary
*"A style guide has the opportunity to serve as a watering hole for the entire organization."*

Exemple du carousel homepage (site e-commerce) → implique : business owners + copywriters + art directors + UX designers + front-end devs + back-end devs.

*"Treating a style guide solely as a developer resource limits its potential."* Faciliter la contribution de chaque discipline à la documentation.

### 5. Make it approachable
*"People tend to gravitate towards attractive things."*

Un style guide beau, invitant, facile à naviguer → plus d'usage, plus de visibilité, plus d'engagement des non-développeurs.

Ne pas attendre la perfection pour commencer. Process :
1. Make a thing (fonctionnel)
2. Show that it's useful
3. Make it official (avec une belle UI pour le style guide)

*"Making a good-looking style guide isn't just design for design's sake; it reflects an organization's commitment to making and maintaining a thoughtful, deliberate design system."*

### 6. Make it visible

**Communication des changements :**
- **Change logs** : "Voici ce qui a changé ce mois-ci"
- **Roadmap** : "Voici ce qui arrive dans les prochains mois"
- **Success stories** : "L'équipe X a lancé cette application en utilisant le design system"
- **Tips and tricks** : best practices pour utiliser les boutons du système

Communiquer partout où l'équipe se retrouve : Slack, Basecamp, GitHub, wikis, Yammer, email lists, blogs, intranets.

Exemple Shyp (Micah Sivitz) : quand un pull request est créé → notification automatique dans le channel #Design Slack → annonce à l'équipe qu'un changement est proposé et que du feedback est requis.

**Rendre le style guide publiquement accessible** → augmente la visibilité, crée une accountability organisationnelle, excellent outil de recrutement. *"Designers, developers, and people working in other disciplines want to work for organizations that embrace modern digital best practices."*

Jina Bolton : a rejoint Salesforce après avoir vu leur style guide. *"When I saw it I thought it was beautiful and it's why I wanted to join this team."*

**Pas de trade secrets ici :** *"These are UI patterns, not nuclear codes."*

### 7. Make it bigger
Inclure d'autres documentations utiles sous le même toit :
- Voice and tone
- Brand guidelines
- Code guidelines
- Design principles
- Writing guidelines
- Patterns pour plateformes natives (iOS, Android) aux côtés des patterns web

Exemple Intuit Harmony : inclut pattern library web + patterns iOS + patterns Android → boutons pour switcher entre les 3 pour chaque composant, permettant de documenter les divergences quand elles existent.

*"Creating a centralized style guide hub builds more awareness of best practices, increasing the documentation's effectiveness."*

### 8. Make it context-agnostic
*"The more agnostic pattern names are, the more versatile and reusable they become."*

**Erreur courante** : nommer les composants selon où ils vivent → "homepage carousel" → utilisable uniquement sur la homepage.

**Correction** : "carousel" → utilisable partout.

**Autre erreur** : nommer les display patterns selon le contenu qu'ils contiennent → "product card" → limite le contenu.

**Correction** : "card" → peut contenir produits, promotions, localisations, etc.

**Exercice de naming :** flouter le contenu d'un pattern pour que les noms reflètent la **structure** plutôt que le contenu. L'inventaire UI aide aussi car il détache les patterns de leur contexte de page.

### 9. Make it contextual
*"You need to demonstrate context for design system users to understand how and where to properly use them."*

Comment montrer le contexte :
- **Screenshots ou vidéos** du composant en action dans une vraie application
- **Material Design** : docs riches en photos, vidéos, détails d'usage → compréhension claire du comportement
- **Informations de lineage** : quels patterns composent ce composant, où ce composant est utilisé (cf. Pattern Lab lineage, chapitre 3)

### 10. Make it last
*"Focusing on style guide delivery as the climax is the wrong story to tell."*

Maintenir le design system sur le long terme :
- Le plus grand ennemi : la négligence (*"The biggest existential threat to any system is neglect."* — Alex Schleifer, Airbnb)
- Rendre les updates aussi sans friction que possible
- Investir dans une infrastructure technique permettant de déployer les changements facilement
- Former régulièrement les utilisateurs

Même lors d'une future refonte radicale : les briques structurelles (buttons, forms, tabs) resteront. La pattern library est une fondation réutilisable. *"Don't throw the baby out with the bathwater!"*

---

## 4. Équipes makers et users

### Distinction fondamentale
*"There will inevitably be people at the organization who help **make and maintain** the design system, and there will be people who will be **users** of the design system."*

Pas tout le monde n'a besoin de contribuer directement — mais **quelqu'un** (ou plusieurs personnes) doit en être propriétaire.

**Design system makers :** créent, maintiennent et gouvernent le système. Vue d'ensemble de l'ensemble de l'écosystème.

**Design system users :** équipes qui prennent le système et appliquent ses patterns à des applications spécifiques. Vue au ras du sol sur des applications particulières.

Jina Bolton (Salesforce) : *"The Design System informs our Product Design. Our Product Design informs the Design System."*

### Les deux doivent maintenir une relation étroite
*"Makers provide a birds-eye perspective of the entire ecosystem the design system serves, while users provide an on-the-ground perspective focused on specific applications of the system."*

Communication fréquente essentielle pour que les patterns définis dans le système servent les besoins des applications ET que la documentation soit claire.

### Makeup par taille d'organisation

**Grandes organisations :**
Salesforce → ~12 personnes à temps plein dédiées au design systems team. Gère le système pour des milliers d'utilisateurs internes ET des développeurs externes sur la plateforme Salesforce.

**Petites organisations :**
Membres de l'équipe portent de nombreux chapeaux. Gouverner le design system devient une responsabilité supplémentaire → doit être prise en charge par des membres senior ayant l'expérience pour prendre de bonnes décisions et l'autorité pour enforcer le système.

**Agences et consultants externes :**
Désavantage : ils n'appartiennent pas à l'organisation client → leur influence est intrinsèquement limitée. Avantage : peuvent fournir une perspective que les insiders ne voient pas. Peuvent *"teach them to fish"* — établir des stratégies de maintenance à long terme, mettre les bonnes personnes et processus en place.

### Composition cross-disciplinaire
*"All disciplines — UX designers, visual designers, content strategists, front-end developers, back-end developers, product managers, project managers, executives, and other stakeholders — have unique perspectives that can undoubtedly inform and shape the work."*

- **Actifs (font le travail)** : UX designers, visual designers, front-end devs
- **Consultatifs** : back-end engineers (décisions architecturales), executives (initiatives importantes), design system users (besoins des applications)

---

## 5. Formation et support des utilisateurs

### Formation : tactiques
1. **Pair sessions** : travailler ensemble sur un projet → le plus time-intensive mais le plus efficace pour la collaboration et la compréhension
2. **Workshops** : sessions immersives (full-day) ou walk-throughs rapides → face-à-face, hands-on
3. **Webinars** : pour former à grande échelle → prévoir du temps Q&A (audio ET texte)
4. **Tutoriels** : série de blog posts + screencasts → double utilité (formation + référence permanente)
5. **Onboarding** : intégrer la formation au design system dans l'intégration des nouveaux employés

### Support : mécanismes
1. **Issue trackers** (JIRA, GitHub Issues) : pour reporter bugs et avoir des conversations techniques
2. **Office hours** : plages horaires régulières où l'équipe design system répond aux questions
3. **Slack / chat tools** : nature temps-réel → maintient la conversation active
4. **Forums communautaires** (Stack Overflow, GitHub) : support grassroots qui évite que les makers deviennent un goulot d'étranglement
5. **Outreach proactif** : les makers contactent activement les devs qui utilisent le système pour détecter problèmes et préoccupations

### Encourager les contributions utilisateurs
- **Pull requests** : inviter les users à soumettre des changements
- **Interviews individuelles et roundtable discussions** : parler régulièrement aux personnes qui touchent ces patterns quotidiennement
- **Requests for feedback** : avant des décisions impactant beaucoup de monde : *"We're considering deprecating our carousel pattern and would like to hear what you think."*
- **Surveys** : questions rapides sur l'efficacité de la documentation
- **Regular "state of the union" meetings** : roadmap, leçons apprises, suggestions — enregistrer et distribuer

---

## 6. Synthèse : récapitulatif des 10 commandements

| Commandement | Action concrète |
|---|---|
| **Make it official** | Budget, temps, personnes dédiées + roadmap produit |
| **Make it adaptable** | Plan de gouvernance clair, réponses aux questions de changement |
| **Make it maintainable** | Holy grail (synchro prod/library), faible friction pour les updates |
| **Make it cross-disciplinary** | Watering hole pour toute l'organisation, pas juste les devs |
| **Make it approachable** | Style guide beau, facile à naviguer, invitant |
| **Make it visible** | Change logs, roadmap, evangelism, rendre public |
| **Make it bigger** | Brand, voice & tone, code, design principles, writing, native platforms |
| **Make it context-agnostic** | Nommer selon la structure, pas le contexte ou le contenu |
| **Make it contextual** | Lineage, exemples en contexte réel, vidéos/screenshots |
| **Make it last** | Fondation solide, éviter la négligence, formation continue |

---

## Connexions avec les autres références du skill

- **Constrained value sets = fondation du système** → `11-wathan-processus.md` § Limit Your Choices, `13-wathan-layout.md` § Spacing System, `14-wathan-typographie.md` § Type Scale, `15-wathan-couleur.md` § Shades, `16-wathan-profondeur.md` § Elevation System
- **Nommer context-agnostic** → `12-wathan-hierarchie.md` § Labels Are a Last Resort (même principe : le nom ne doit pas être lié au contexte)
