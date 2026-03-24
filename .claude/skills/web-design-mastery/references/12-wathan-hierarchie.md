# Refactoring UI — Hiérarchie Visuelle (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Hierarchy is Everything" de Refactoring UI.
Thèse centrale : la hiérarchie visuelle est le facteur n°1 pour qu'une
interface "ait l'air bien". Ce n'est pas une question de talent artistique
mais de décisions structurelles sur l'importance relative des éléments.

---

### Not All Elements Are Equal

**Principe** — La hiérarchie visuelle détermine l'importance perçue de
chaque élément. Quand tout se bat pour l'attention, l'interface est bruyante
et chaotique. En dé-accentuant délibérément les éléments secondaires et
tertiaires, le résultat est immédiatement plus agréable — même sans changer
couleurs, fontes ou layout.

**Règle / Heuristique** — Pour toute interface, classifier chaque élément
en primaire / secondaire / tertiaire avant de styliser quoi que ce soit.
Le style doit refléter cette classification.

**Connexions** — Voir aussi → Size Isn't Everything, Emphasize by
De-Emphasizing, Labels Are a Last Resort, Semantics Are Secondary.

---

### Size Isn't Everything

**Principe** — Trop s'appuyer sur la taille de police pour contrôler la
hiérarchie mène à du contenu primaire trop gros et du secondaire trop petit.

**Règle / Heuristique** — Utiliser font weight et couleur pour moduler
la hiérarchie, pas seulement la taille :
- **Texte primaire** : couleur foncée (pas nécessairement gigantesque)
- **Texte secondaire** : gris moyen
- **Texte tertiaire** : gris clair

Limites de font-weight pour le travail UI :
- **Normal** : 400 ou 500 (selon la fonte)
- **Emphasis** : 600 ou 700
- **Jamais < 400** pour du texte UI (trop dur à lire en petite taille ;
  acceptable uniquement pour les grands titres)

Pour dé-accentuer du texte, préférer couleur plus claire ou taille réduite
plutôt qu'un font-weight plus léger.

**Exemple** — Un titre de card en 600 weight + couleur foncée peut être
plus petit qu'un titre en 400 weight et rester plus proéminent grâce
au poids visuel.

**Pièges** — Se limiter à 2-3 couleurs de texte et 2 font-weights.
Au-delà, la hiérarchie s'effondre par surabondance de niveaux.

**Connexions** — Voir aussi → Balance Weight and Contrast, `06-beaird-layout.md`
§ Emphase.

---

### Don't Use Grey Text on Colored Backgrounds

**Principe** — Le gris sur fond blanc fonctionne car on réduit le contraste.
Sur un fond coloré, le même gris ne produit pas cet effet ; il faut réduire
le contraste par rapport à la couleur de fond, pas juste utiliser du gris.

**Règle / Heuristique** —
1. **Ne pas** utiliser `opacity` sur du texte blanc pour créer la hiérarchie :
   le texte paraît terne, délavé, voire disabled. Sur image/pattern,
   le fond transparaît à travers le texte.
2. **À la place** : choisir manuellement une couleur de même hue que le fond,
   en ajustant saturation et lightness jusqu'à ce que le contraste soit
   satisfaisant.

**Exemple** — Sur fond bleu (#2563EB), au lieu de `color: rgba(255,255,255,0.5)`,
choisir un bleu clair désaturé comme `hsl(217, 70%, 75%)`.

**Pièges** — L'approche opacity semble rapide mais produit toujours
un résultat inférieur. Particulièrement problématique sur les images.

**Connexions** — Voir aussi → Accessible Doesn't Have to Mean Ugly,
`07-beaird-couleur.md` § valeur et saturation.

---

### Emphasize by De-Emphasizing

**Principe** — Quand l'élément principal ne ressort pas assez et qu'on
ne peut plus l'accentuer, la solution est de dé-accentuer ses concurrents.

**Règle / Heuristique** —
1. Identifier ce qui entre en compétition visuelle avec l'élément cible.
2. Réduire l'impact de ces éléments concurrents (couleur plus douce,
   taille réduite, poids allégé).
3. Applicable aux micro-éléments (nav items) comme aux macro-sections
   (sidebar qui concurrence le contenu principal → retirer son fond).

**Exemple** — Nav active qui ne ressort pas malgré une couleur différente :
donner aux items inactifs une couleur beaucoup plus douce. Sidebar trop
présente : retirer la couleur de fond pour la laisser sur le fond de page.

**Pièges** — L'instinct est d'ajouter toujours plus (couleur plus vive,
taille plus grande) à l'élément cible. Souvent la soustraction sur
les concurrents est plus efficace.

**Connexions** — Voir aussi → Not All Elements Are Equal, `06-beaird-layout.md`
§ Emphase par contraste et isolation.

---

### Labels Are a Last Resort

**Principe** — Le format label:value naïf écrase la hiérarchie en donnant
à chaque donnée la même importance. Souvent, le format ou le contexte
suffit à rendre un label superflu.

**Règle / Heuristique** — Trois stratégies par ordre de préférence :

1. **Pas de label du tout** si le format parle (email, téléphone, prix)
   ou si le contexte est clair (nom de département sous un nom de personne).
2. **Combiner label et valeur** en une phrase naturelle :
   "In stock: 12" → "12 left in stock". "Bedrooms: 3" → "3 bedrooms".
3. **Label secondaire** (si vraiment nécessaire, ex: dashboard scannable) :
   réduire taille, contraste, font-weight du label. La donnée est le hero.

**Exception** — Pages très denses en informations (specs techniques) :
l'utilisateur scanne les labels ("depth", "weight"), pas les valeurs.
Dans ce cas, le label peut être en couleur foncée et la valeur en couleur
plus claire. Ne pas trop dé-accentuer la valeur pour autant.

**Connexions** — Voir aussi → Separate Visual Hierarchy from Document
Hierarchy, `06-beaird-layout.md` § unité et proximité.

---

### Separate Visual Hierarchy from Document Hierarchy

**Principe** — Les balises sémantiques (h1, h2, h3) ne doivent pas dicter
le style visuel. En UI applicative, beaucoup de titres de sections agissent
comme des labels, pas comme des headings — ils ne devraient pas voler
l'attention.

**Règle / Heuristique** —
1. Choisir l'élément HTML pour des raisons sémantiques/accessibilité.
2. Styliser indépendamment pour créer la meilleure hiérarchie visuelle.
3. Les titres de sections peuvent être petits, voire masqués visuellement
   (présents dans le markup pour l'accessibilité).

**Exemple** — "Manage Account" en h1 sémantique mais stylisé comme
un petit label gris, car le contenu de la section est ce qui compte.

**Pièges** — Par habitude, on stylise les h1 en gros et gras. En UI app,
cela crée des titres disproportionnés qui dominent au détriment du contenu.

**Connexions** — Voir aussi → Labels Are a Last Resort.

---

### Balance Weight and Contrast

**Principe** — Le texte gras "pèse" plus car il couvre plus de surface
(plus de pixels de texte vs. pixels de fond). Ce rapport surface/hiérarchie
s'applique à d'autres éléments, notamment les icônes.

**Règle / Heuristique** —
1. **Contrast compense weight** : pour dé-accentuer un élément lourd
   (icône solid, texte bold), réduire son contraste (couleur plus douce).
2. **Weight compense contrast** : pour accentuer un élément à faible
   contraste (border 1px trop subtile en couleur douce), augmenter
   son épaisseur plutôt que de foncer la couleur (qui rendrait le design
   harsh et noisy).

**Exemple** — Icône à côté de texte : l'icône (surtout solid) écrase le texte.
Lui donner une couleur grise plus claire la ramène au niveau du texte.

**Connexions** — Voir aussi → Size Isn't Everything, `08-beaird-texture.md`
§ épaisseur des lignes.

---

### Semantics Are Secondary

**Principe** — Pour les actions (boutons), la hiérarchie prime sur la
sémantique. Chaque action s'inscrit dans une pyramide d'importance.

**Règle / Heuristique** — Trois niveaux d'actions :
| Niveau | Traitement |
|---|---|
| **Primaire** | Solid, fond à contraste élevé. Évident. |
| **Secondaire** | Outline, ou fond à contraste faible. Clair mais pas dominant. |
| **Tertiaire** | Style lien. Découvrable mais discret. |

**Cas spécial — Actions destructives** : "destructif" ne signifie pas
automatiquement "gros, rouge, bold". Si l'action destructive n'est pas
la primaire de la page → traitement secondaire/tertiaire. Réserver
le rouge bold pour l'étape de confirmation où l'action destructive est
effectivement la primaire.

**Exemple** — Page de profil avec "Save changes" (primaire, solid bleu),
"Cancel" (secondaire, outline), "Delete account" (tertiaire, style lien).
Le dialogue de confirmation montre ensuite "Delete" en rouge solid.

**Pièges** — Donner un traitement primaire à un bouton "Delete" sur
une page où "Save" est l'action principale crée une hiérarchie inversée
et augmente le risque d'erreur.

**Connexions** — Voir aussi → Not All Elements Are Equal,
`06-beaird-layout.md` § Emphase.
