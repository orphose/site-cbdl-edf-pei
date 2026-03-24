# Refactoring UI — Processus & Démarrage (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Starting from Scratch" de Refactoring UI.
Philosophie : concevoir en partant de la fonctionnalité, pas du chrome.
L'objectif est de produire des interfaces utilisables le plus vite possible
en évitant la paralysie décisionnelle.

---

### Start with a Feature, Not a Layout

**Principe** — Ne jamais commencer par le shell (navigation, sidebar, header).
Commencer par un morceau de fonctionnalité réelle. L'app est une collection
de features ; sans en avoir conçu quelques-unes, on manque d'information
pour décider de la navigation.

**Règle / Heuristique** — Identifier la feature la plus critique du produit.
Lister les éléments d'interface nécessaires (champs, boutons, listes).
Designer uniquement cette feature. Le reste viendra naturellement une fois
que les patterns émergent.

**Exemple** — Service de réservation de vols : commencer par le formulaire
de recherche (ville départ, destination, dates, bouton recherche). Pas besoin
de header ni de footer à ce stade. Google a réussi avec juste un champ
de recherche.

**Pièges** — Commencer par "designer l'app" (le shell) mène à la frustration.
On prend des décisions de navigation sans connaître le contenu qu'elle
doit desservir.

**Connexions** — Voir aussi → Detail Comes Later, Don't Design Too Much,
`04-frost-workflow.md` § content-first approach.

---

### Detail Comes Later

**Principe** — Aux premières étapes, ne pas se bloquer sur les détails
bas-niveau (typefaces, shadows, icons). Commencer low-fidelity.

**Règle / Heuristique** —
1. **Sketcher au Sharpie** (astuce Jason Fried / Basecamp) : l'épaisseur
   du trait interdit l'obsession du détail.
2. **Designer en niveaux de gris** : force à utiliser spacing, contraste
   et taille pour créer la hiérarchie. La couleur viendra ensuite.
3. **Ne pas sur-investir** : wireframes et sketches sont jetables.
   L'utilisateur ne peut rien faire d'un mockup statique.

**Exemple** — Un formulaire d'inscription conçu en grayscale force à
distinguer titre/label/input/bouton uniquement par taille et poids,
ce qui produit une hiérarchie plus robuste.

**Pièges** — Introduire la couleur trop tôt masque les problèmes de
hiérarchie. Le design "a l'air bien" grâce aux couleurs mais la structure
est faible.

**Connexions** — Voir aussi → Choose a Personality, `06-beaird-layout.md`
§ processus de design (papier avant ordinateur).

---

### Don't Design Too Much

**Principe** — Ne pas designer toutes les features avant de passer à
l'implémentation. Travailler par cycles courts.

**Règle / Heuristique** —
1. **Work in cycles** : designer la version simple → l'implémenter →
   itérer sur le design réel → passer à la feature suivante.
2. **Be a pessimist** : ne jamais impliquer dans le design une
   fonctionnalité qu'on n'est pas prêt à construire. Designer la plus
   petite version utile ("smallest useful version") qu'on peut livrer.
3. Les nice-to-have se designent plus tard. Toujours avoir un fallback
   livrable.

**Exemple** — Système de commentaires : ne pas inclure les pièces jointes
dans le design initial si l'implémentation est complexe. Un système de
commentaires sans attachments > pas de système du tout.

**Pièges** — Tenter de résoudre tous les edge cases dans l'abstrait
(2000 contacts ? événements simultanés ? erreurs de formulaire ?) mène
à la paralysie. Ces problèmes se résolvent mieux sur l'interface réelle.

**Connexions** — Voir aussi → `04-frost-workflow.md` § itération,
`02-frost-methodologie.md` § atomic design n'est pas linéaire.

---

### Choose a Personality

**Principe** — Tout design a une personnalité. Celle-ci est déterminée
par des facteurs concrets, pas abstraits.

**Règle / Heuristique** — Quatre leviers principaux :

| Levier | Effet |
|---|---|
| **Typeface** | Serif = élégant/classique. Sans-serif arrondie = playful. Sans-serif neutre = sobre/professionnel. |
| **Couleur** | Bleu = sûr/familier. Or = premium/sophistiqué. Rose = fun/décontracté. |
| **Border radius** | Petit = neutre. Grand = playful. Zéro = sérieux/formel. |
| **Langage (microcopy)** | Ton impersonnel = officiel. Ton casual/amical = approchable. |

**Important** — Rester cohérent : ne pas mélanger coins carrés et coins
arrondis dans la même interface.

**Exemple** — Un dashboard bancaire : serif sobre + bleu + border-radius
faible + ton formel. Une app fitness : sans-serif ronde + couleurs vives +
border-radius large + ton décontracté.

**Pièges** — Emprunter trop de codes visuels aux concurrents directs :
on ressemble à une copie de seconde zone. S'inspirer du secteur,
pas d'un concurrent spécifique.

**Connexions** — Voir aussi → `07-beaird-couleur.md` § psychologie
des couleurs, `09-beaird-typographie.md` § catégories de fontes.

---

### Limit Your Choices (Systématiser tout)

**Principe** — Avoir des millions de couleurs et des milliers de fontes
à disposition est paralysant. Concevoir sans contraintes rend chaque
micro-décision torturante car il y a toujours plusieurs bons choix.

**Règle / Heuristique** —
1. **Define systems in advance** : ne pas choisir ad hoc. Prédéfinir
   un set restreint de valeurs pour chaque propriété.
2. **Design by process of elimination** : avec un système contraint,
   tester la valeur du milieu puis les voisines. La meilleure option
   est évidente car les différences sont visibles.
3. **Systematize everything** : font size, font weight, line height,
   color, margin, padding, width, height, box shadows, border radius,
   border width, opacity.

**Exemple** — Au lieu de choisir entre 120px et 125px de large, avoir
une échelle où les options sont 96px, 128px, 160px. Le choix est
instantané par comparaison visuelle.

**Pièges** — Définir un système linéaire (multiples de 4px) n'aide pas
vraiment car la différence relative entre valeurs adjacentes n'est pas
perceptuellement uniforme. → Voir § Spacing System.

**Connexions** — Voir aussi → Establish a Spacing and Sizing System,
Establish a Type Scale, Define Your Shades Up Front, You Need More
Colors Than You Think.
