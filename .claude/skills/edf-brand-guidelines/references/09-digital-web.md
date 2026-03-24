# Digital & Web — Charte EDF 2021

## Principes généraux digital

L'identité digitale EDF est :
- **Plus digitale** : cartouche carré adapté aux interfaces
- **Plus lumineuse** : effet lumineux, blancs, couleurs vives
- **Plus accessible** : couleurs web spécifiques pour les contrastes

---

## Couleurs web spécifiques

> Ces couleurs **remplacent** certaines couleurs print sur les interfaces digitales pour garantir l'accessibilité (conformité WCAG).

### Tableau complet

| Couleur | HEX | Usage exclusif |
|---------|-----|----------------|
| **Bleu Nuit** | `#00155A` | Textes courants, titres, labels — remplace le noir `#000000` et gris foncé `#333333` |
| **Bleu Action** | `#005BFF` | Boutons CTA, hyperliens — garantit contraste et visibilité sur fond blanc/bleuté |
| **Blanc Bleuté** | `#E9F1F9` | Fonds de sections, arrière-plans — remplace le gris neutre, plus proche de la marque |

### Couleurs de la palette principale utilisables sur le web
Les 9 couleurs de la palette restent utilisables pour :
- Fond de blocs colorés
- Arrière-plans de sections
- Badges, tags, étiquettes
- Graphiques et data visualisations

### Ce qu'il ne faut PAS faire sur le web
❌ Utiliser `#000000` pour les textes → utiliser `#00155A` (Bleu Nuit)  
❌ Utiliser le gris pur `#333333` ou `#666666` pour les titres → utiliser `#00155A`  
❌ Utiliser orange foncé `#FE5716` comme couleur de lien → utiliser `#005BFF` (Bleu Action)  
❌ Utiliser fond gris neutre → utiliser `#E9F1F9` (Blanc Bleuté)  

---

## Typographie web

**Police unique sur le web : EDF Regular**

Elle est utilisée sur l'ensemble des sites web du Groupe EDF pour :
- Renforcer la présence de la marque
- Assurer la cohérence sur tous les sites

### Hiérarchie typographique web recommandée

```css
/* Variables CSS EDF */
--color-text-primary: #00155A;      /* Bleu Nuit */
--color-text-secondary: #10367A;    /* Bleu Logo */
--color-link: #005BFF;              /* Bleu Action */
--color-bg-light: #E9F1F9;          /* Blanc Bleuté */
--color-orange-main: #FE5716;       /* Orange Foncé */
--color-orange-mid: #FF861D;        /* Orange Moyen */
--color-orange-light: #FFB210;      /* Orange Clair */
--color-blue-dark: #001A70;         /* Bleu Foncé */
--color-blue-mid: #1057C8;          /* Bleu Moyen */
--color-blue-light: #1089FF;        /* Bleu Clair */
--color-green-dark: #4F9E30;        /* Vert Foncé */
--color-green-mid: #88D910;         /* Vert Moyen */
--color-green-light: #C0E410;       /* Vert Clair */

/* Tailles */
--font-h1: 40px;
--font-h2: 32px;
--font-h3: 24px;
--font-body: 16px;
--font-small: 14px;
--font-label: 12px;
```

---

## Site web — Structure de page

### Hero / Bandeau principal
- Visuel full-width avec dominante de couleur forte
- Cartouche carré (blanc ou couleur) positionné à gauche
- Logo EDF en haut à gauche, à 1-2F du bord
- Fond alternatif possible : aplat couleur ou dégradé

### Navigation
- Fond blanc ou Blanc Bleuté (#E9F1F9)
- Texte navigation en Bleu Nuit (#00155A)
- CTA en Bleu Action (#005BFF) ou Orange Foncé (#FE5716)

### Sections de contenu
- Alternance fond blanc et fond Blanc Bleuté (#E9F1F9)
- Titres de section en Bleu Nuit (#00155A) ou couleur du camaïeu
- Corps de texte en Bleu Nuit (#00155A)

### Cards / Vignettes
Chaque card peut suivre la composition EDF :
- Visuel en haut (ou à gauche) avec dominante de couleur
- Zone texte inférieure correspondant au camaïeu de l'image
- Logo ou picto dans la zone texte

### Footer
- Fond Bleu Foncé (#001A70) ou Bleu Logo (#10367A)
- Texte blanc
- Logo EDF version blanche

---

## Application mobile

### Deux modes supportés

**Light mode :**
- Fond blanc ou Blanc Bleuté (#E9F1F9)
- Textes en Bleu Nuit (#00155A)
- Accents couleur selon contexte/section

**Dark mode :**
- Fond Bleu Foncé (#001A70) ou très sombre
- Textes blancs
- Éléments UI en camaïeu clair (bleu clair, orange clair)

### Composants UI mobiles
- **Boutons primaires :** Fond Bleu Action (#005BFF) ou Orange Foncé (#FE5716), texte blanc
- **Boutons secondaires :** Fond transparent, bordure Bleu Action, texte Bleu Action
- **Tabs navigation :** Icône + label, actif en couleur de marque
- **Données/chiffres clés :** Taille large, couleur de marque, en EDF Regular
- **Listes/items :** Séparateur discret, icône-puce en couleur de marque

---

## PowerPoint / Présentations

### Format de référence
**1280 × 720 px** (HD 16:9)  
Cartouche de référence : **540 × 540 px**

### Dégradés dans PowerPoint
- Type : Linéaire
- Angle : 60°
- Position couleur foncée : 100%
- Position couleur claire : 10%

### Spacing digital restreint
Logo peut être positionné à **1F** du bord si le format est trop contraint.

### Slides types
1. **Couverture** : Grande image + cartouche centré ou haut gauche + titre fort
2. **Séparateur de section** : Aplat de couleur plein + cartouche blanc + numéro/titre
3. **Slide de contenu** : Fond blanc/bleuté + éléments structurés + logo en coin
4. **Slide data** : Grands chiffres en couleur de marque + visuels iconographiques
5. **Slide citation** : Photo portrait + cartouche avec citation entre guillemets

---

## Réseaux sociaux — Spécifications techniques

### Instagram (carré 1:1 — 1080×1080 px)
- Composition centrée ou asymétrique avec cartouche
- Logo EDF à 1F du bord
- Texte lisible sans zoom sur mobile

### Twitter / X (1600×900 px ou 1200×675 px)
- Cartouche carré de pleine hauteur à gauche ou droite
- Espace pour le visuel dans la partie restante

### LinkedIn (1200×627 px)
- Composition similaire à Twitter
- Ton plus professionnel (camaïeu bleu ou vert recommandé)

### Stories (1080×1920 px vertical)
- Cartouche de toute largeur en haut ou bas
- Visuel plein fond
- Texte centré dans la zone cartouche

---

## Accessibilité web (WCAG)

### Ratios de contraste minimaux
- Texte normal (< 18px) : **4.5:1**
- Texte grand (≥ 18px ou ≥ 14px gras) : **3:1**
- Composants UI et graphiques : **3:1**

### Combinaisons validées EDF
| Texte | Fond | Ratio approx. |
|-------|------|---------------|
| Bleu Nuit #00155A | Blanc #FFFFFF | ~17:1 ✅ |
| Bleu Nuit #00155A | Blanc Bleuté #E9F1F9 | ~15:1 ✅ |
| Blanc #FFFFFF | Bleu Action #005BFF | ~7:1 ✅ |
| Blanc #FFFFFF | Orange Foncé #FE5716 | ~3.5:1 ✅ (grand texte) |
| Blanc #FFFFFF | Bleu Foncé #001A70 | ~18:1 ✅ |

### À éviter pour l'accessibilité
❌ Texte orange sur fond blanc (contraste insuffisant pour corps de texte)  
❌ Texte vert clair #C0E410 sur fond blanc (très faible contraste)  
❌ Texte bleu clair #1089FF sur fond blanc (insuffisant en corps de texte)  
