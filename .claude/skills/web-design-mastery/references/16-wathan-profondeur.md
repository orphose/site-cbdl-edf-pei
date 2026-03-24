# Refactoring UI — Profondeur & Ombres (Wathan & Schoger)

---

## Vue d'ensemble

Ce fichier couvre le chapitre "Creating Depth" de Refactoring UI.
Comment simuler la lumière, utiliser les ombres pour communiquer
l'élévation, et créer de la profondeur même dans un design flat.

---

### Emulate a Light Source

**Principe** — La profondeur perçue dans une UI vient de la simulation
d'une source lumineuse venant du haut. Les surfaces orientées vers le haut
(ciel) sont plus claires ; celles orientées vers le bas sont plus foncées.

**Règle / Heuristique** —

**Éléments surélevés (raised)** :
1. L'utilisateur regarde légèrement vers le bas → on voit le bord supérieur,
   pas l'inférieur.
2. Bord supérieur = plus clair que la face (top border ou inset box-shadow
   avec offset vertical léger).
3. Ombre portée sous l'élément = petit box-shadow foncé avec offset vertical
   léger et blur radius faible (2-3px). Ombre nette, pas diffuse.
4. **Choisir la couleur claire manuellement** — ne pas utiliser
   `rgba(255,255,255,0.x)` qui désature la couleur sous-jacente.

**Éléments encastrés (inset)** :
1. On voit le bord inférieur (face au ciel → plus clair). Bottom border
   ou inset shadow avec offset vertical négatif.
2. Le dessus de l'élément est dans l'ombre (la "lèvre" supérieure bloque
   la lumière). Petit inset box-shadow foncé avec offset vertical positif.
3. Applicable aux inputs, checkboxes, "wells".

**Pièges** — Ne pas chercher le photo-réalisme. Emprunter quelques indices
visuels du monde réel suffit. Trop de subtilité rend l'interface chargée
et peu claire.

**Connexions** — Voir aussi → Use Shadows to Convey Elevation,
`08-beaird-texture.md` § volume et profondeur.

---

### Use Shadows to Convey Elevation

**Principe** — Les ombres communiquent la position d'un élément sur l'axe Z
virtuel. Plus l'ombre est grande et diffuse, plus l'élément semble proche
de l'utilisateur (et donc attire plus l'attention).

**Règle / Heuristique** —

| Élévation | Usage typique | Caractéristiques de l'ombre |
|---|---|---|
| Basse | Boutons | Petite, blur serré |
| Moyenne | Dropdowns, popovers | Taille moyenne, blur moyen |
| Haute | Modales, dialogs | Grande, blur élevé |

**Elevation system** — Définir un set fixe de 5 ombres (comme on le fait
pour les couleurs et l'espacement). Du plus petit au plus grand,
les tailles augmentent de façon à peu près linéaire.

**Interaction** — Les ombres peuvent changer dynamiquement :
- Drag & drop : ajouter une ombre plus grande quand l'élément est "soulevé"
  → l'utilisateur voit qu'il peut déplacer.
- Button click : réduire ou supprimer l'ombre → impression d'enfoncement.

**Logique** — Ne pas penser "quelle ombre pour ce composant" mais
"à quelle élévation ce composant doit-il être" et lui assigner l'ombre
correspondante.

**Connexions** — Voir aussi → Shadows Can Have Two Parts,
Emulate a Light Source, `08-beaird-texture.md` § ombres CSS.

---

### Shadows Can Have Two Parts

**Principe** — Les meilleures ombres utilisent deux box-shadows superposés,
chacun avec un rôle distinct.

**Règle / Heuristique** —

1. **Shadow 1 — "Direct light" shadow** :
   Grande et douce. Offset vertical notable, grand blur radius.
   Simule l'ombre projetée par une source de lumière directe.

2. **Shadow 2 — "Ambient occlusion" shadow** :
   Serrée et foncée. Petit offset vertical, petit blur radius.
   Simule la zone sous l'objet où même la lumière ambiante ne pénètre pas.

**Avantage** : la shadow 1 reste subtile tandis que la shadow 2 garde
les bords de l'élément bien définis.

**Ajustement par élévation** : plus l'élément est "haut", plus la shadow 2
(ambient occlusion) s'estompe. À la plus haute élévation, elle peut
disparaître complètement. À la plus basse élévation, elle est la plus visible.

**Exemple CSS** :
```css
/* Élévation basse */
box-shadow:
  0 1px 3px rgba(0,0,0,0.12),  /* ambient */
  0 1px 2px rgba(0,0,0,0.24);  /* direct */

/* Élévation haute */
box-shadow:
  0 14px 28px rgba(0,0,0,0.15), /* direct */
  0 10px 10px rgba(0,0,0,0.08); /* ambient - plus subtile */
```

**Connexions** — Voir aussi → Use Shadows to Convey Elevation.

---

### Even Flat Designs Can Have Depth

**Principe** — Le flat design (pas d'ombres, pas de gradients) peut
communiquer la profondeur par d'autres moyens.

**Règle / Heuristique** —

1. **Depth with color** :
   - Élément plus clair que le fond → semble surélevé.
   - Élément plus foncé que le fond → semble encastré.
   Fonctionne particulièrement bien avec des nuances d'une même couleur.

2. **Solid shadows** : ombre à offset vertical court, **sans blur radius**.
   L'élément semble décollé de la page tout en restant "flat".

**Exemple** — Card sur fond gris clair (#f7f7f7) : donner un fond blanc
(#fff) la fait sembler surélevée. Alternativement, ajouter
`box-shadow: 0 4px 0 #d1d5db` (solide, sans blur).

**Connexions** — Voir aussi → Emulate a Light Source (pour le design
non-flat), `08-beaird-texture.md` § volume sans 3D.

---

### Overlap Elements to Create Layers

**Principe** — Le chevauchement crée une sensation de multi-couches
(layering) très efficace pour la profondeur.

**Règle / Heuristique** —

1. **Card qui déborde de sa section** : au lieu de contenir une card
   dans un bloc, la décaler pour qu'elle chevauche la transition
   entre deux backgrounds différents.

2. **Élément plus haut que son parent** : un composant qui dépasse
   des deux côtés du conteneur crée un layer distinct.

3. **Chevauchement d'images** : risque de "clash" visuel.
   Solution : "invisible border" (bordure de la même couleur que le fond)
   pour créer un gap entre les images tout en maintenant l'illusion
   de superposition.

4. **Applicable aux petits composants** : contrôles de carousel décalés
   sur les bords de l'image.

**Connexions** — Voir aussi → Even Flat Designs Can Have Depth,
`06-beaird-layout.md` § continuité et flux visuel.
