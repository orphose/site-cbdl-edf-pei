# Refactoring UI — Images (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Working with Images" de Refactoring UI.
Gestion des photos (stock/pro), texte sur images, scaling, et contenu
uploadé par les utilisateurs.

---

### Use Good Photos

**Principe** — De mauvaises photos ruinent un design, même si tout
le reste est parfait. La qualité photo n'est pas une question d'appareil
mais de lumière, composition et couleur.

**Règle / Heuristique** —
1. **Photographe professionnel** pour des besoins spécifiques au projet.
2. **Stock haute qualité** pour des besoins génériques (Unsplash, etc.).
3. **Jamais** utiliser des placeholders en se disant qu'on prendra
   des photos au smartphone plus tard. Ça ne fonctionne jamais.

**Connexions** — Voir aussi → `10-beaird-imagerie.md` § sélection
et sources d'images.

---

### Text Needs Consistent Contrast

**Principe** — Poser du texte sur une photo de fond est difficile
car les photos ont des zones très claires et très sombres. Le texte blanc
se perd dans les zones claires ; le texte foncé dans les zones foncées.

**Règle / Heuristique** — 4 techniques pour réduire la dynamique :

1. **Overlay semi-transparent** :
   - Noir → atténue les zones claires, le texte blanc ressort.
   - Blanc → éclaire les zones foncées, le texte foncé ressort.

2. **Lower image contrast** : réduire le contraste de l'image elle-même.
   Ajuster la luminosité pour compenser. Plus de contrôle que l'overlay
   car on n'assombrit/éclaircit pas uniformément.

3. **Colorize** : désaturer l'image + appliquer un solid fill en
   blend mode "multiply". Unifie les tons et peut s'accorder
   avec les couleurs de marque.

4. **Text shadow** : halo subtil (grand blur radius, pas d'offset)
   autour du texte. Augmente le contraste localement. Combiner
   avec une légère réduction du contraste global de l'image.

**Pièges** — Utiliser une seule technique et espérer que ça suffise.
Souvent, combiner overlay + text shadow donne le meilleur résultat.

**Connexions** — Voir aussi → `10-beaird-imagerie.md` § techniques
de traitement, Accessible Doesn't Have to Mean Ugly.

---

### Everything Has an Intended Size

**Principe** — Chaque asset graphique (icône, screenshot, logo) a une
taille prévue par son créateur. Le scaler au-delà ou en deçà dégrade
la qualité perçue, même en vectoriel.

**Règle / Heuristique** —

1. **Don't scale up icons** : les icônes dessinées à 16-24px paraissent
   "chunky" et manquent de détail à 3-4x leur taille.
   **Alternative** : enfermer l'icône dans une forme (cercle/carré)
   avec fond coloré. L'icône reste à sa taille prévue ; la forme
   remplit l'espace.

2. **Don't scale down screenshots** : une capture plein écran réduite
   à 70% rend le texte 16px en texte 4px illisible.
   **Alternatives** :
   - Capturer à une taille d'écran plus petite (ex: layout tablette).
   - Montrer un extrait (partial screenshot).
   - Redessiner une version simplifiée (texte remplacé par des lignes,
     détails retirés).

3. **Don't scale down icons either** : un logo 128px réduit en favicon
   16px devient illisible.
   **Alternative** : redessiner une version ultra-simplifiée à la taille
   cible (favicon dédié).

**Connexions** — Voir aussi → `10-beaird-imagerie.md` § formats
et optimisation, Supercharge the Defaults § icônes.

---

### Beware User-Uploaded Content

**Principe** — Le contenu uploadé par les utilisateurs échappe au contrôle
du designer (aspect ratio, couleurs, qualité). Prévoir des garde-fous.

**Règle / Heuristique** —

1. **Control shape and size** : afficher les images dans des conteneurs
   fixes, centrées et croppées (`background-size: cover` ou
   `object-fit: cover`). Ne jamais laisser l'aspect ratio intrinsèque
   casser le layout.

2. **Prevent background bleed** : quand le fond de l'image est similaire
   au fond de la page, l'image perd ses contours.
   - **Pas de border** (risque de clash avec les couleurs de l'image).
   - **Inset box-shadow subtil** : `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1)`.
     La plupart des gens ne le remarqueront même pas.
   - **Bordure semi-transparente interne** : `border: 1px solid rgba(0,0,0,0.05)`
     si l'aspect inset ne convient pas.

**Contexte spécifique — E-commerce / profils / UGC platforms** :
ces techniques sont essentielles car les images sont la responsabilité
des utilisateurs, pas du designer.

**Connexions** — Voir aussi → `10-beaird-imagerie.md` § bordures CSS,
Control shape → `06-beaird-layout.md` § grille.
