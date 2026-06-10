# Design System — Centrale Bioénergie du Larivot (EDF PEI)

Référence d'implémentation du design du site, conforme à la **charte graphique Groupe EDF 2021**
et aux bonnes pratiques UI/UX (WCAG AA, hiérarchie visuelle, conventions web).
Toute nouvelle interface du site public DOIT suivre ce document.

---

## 1. Direction colorielle

**Camaïeu directeur : BLEU** (« expert et rassurant ») avec **touches de VERT** réservées
au registre environnemental (bioénergie, biodiversité, eau, air). Cette association
« bleu + touches de vert » est explicitement autorisée par la charte (p.17).

> ⛔ **L'orange est interdit dans l'UI de ce site** (le mélange de trois camaïeux est un
> interdit absolu de la charte). L'orange n'apparaît que dans le logo EDF, qui est immuable.
> ⛔ Jamais de couleurs Tailwind génériques (`blue-500`, `emerald-400`, `amber-500`…).
> Uniquement les tokens ci-dessous.

### Tokens (CSS custom properties + utilities Tailwind v4)

| Token | Hex | Utility | Usage |
|---|---|---|---|
| `--edf-bleu-nuit` | `#00155A` | `text-edf-bleu-nuit` | Textes courants, titres, labels (remplace le noir) |
| `--edf-bleu-action` | `#005BFF` | `bg/text-edf-bleu-action` | Liens, boutons primaires, accents UI |
| `--edf-blanc-bleute` | `#E9F1F9` | `bg-edf-blanc-bleute` | Fonds de sections alternés |
| `--edf-blue` | `#001A70` | `bg-edf-blue` | Fonds sombres (footer, sections dark), titres |
| `--edf-blue-mid` | `#1057C8` | `bg-edf-blue-mid` | Hover boutons, data-viz |
| `--edf-blue-light` | `#1089FF` | `text-edf-blue-light` | Accents SUR FOND SOMBRE uniquement |
| `--edf-green-dark` | `#4F9E30` | `text-edf-green-dark` | Icônes vertes, grands titres verts (≥24px) |
| `--edf-green-text` | `#3C7A24` | `text-edf-green-text` | Texte vert ≤ 18px sur fond clair (5:1) |
| `--edf-green` | `#88D910` | — | Décor sur fond bleu foncé UNIQUEMENT |
| `--edf-green-light` | `#C0E410` | — | Décor sur fond bleu foncé UNIQUEMENT |
| `--edf-gris-moyen` | `#595959` | `text-edf-gris-moyen` | Légendes/captions uniquement (7:1) |
| `--edf-gris-clair` | `#E0E0E0` | `border-edf-gris-clair` | Bordures uniquement, jamais en texte |

### Règles de contraste (WCAG AA — non négociables)
- Texte < 24px sur blanc : uniquement Bleu Nuit, Bleu Foncé, Bleu Action, `#3C7A24`, `#595959`.
- `#4F9E30` sur blanc : uniquement texte ≥ 24px bold ou icônes (3.3:1).
- `#88D910`, `#C0E410`, `#1089FF` : JAMAIS en texte sur fond clair. Autorisés sur `#001A70`.
- Sur fond bleu foncé : texte blanc (`text-white`, opacités ≥ 75%).

### Dégradés (parcimonie — heros de pages secondaires uniquement)
Toujours clair (haut-gauche) → foncé (bas-droite), 120deg :
- Bleu : `linear-gradient(120deg, #1089FF 0%, #001A70 100%)` (`.gradient-bleu`)
- Vert : `linear-gradient(120deg, #88D910 0%, #4F9E30 100%)` (`.gradient-vert`)

### Effet lumineux (signature de marque)
Sur fonds bleu foncé, halos radiaux blancs/bleu clair (`.glow-effect`), jamais de halos orange.

---

## 2. Typographie

**Work Sans** uniquement (police complémentaire officielle EDF, libre — EDF 2020 est
propriétaire et indisponible hors Brandcenter). Graisses : 400, 500, 600, 700. Jamais < 400.

| Classe | Taille | Usage |
|---|---|---|
| `.heading-display` | clamp 40→60px, 700, lh 1.05 | H1 accueil uniquement |
| `.heading-1` | clamp 32→44px, 700, lh 1.1 | H1 pages secondaires |
| `.heading-2` | clamp 28→36px, 700, lh 1.15 | H2 sections |
| `.heading-3` | 24px, 600, lh 1.3 | H3 cards / sous-blocs |
| `.heading-4` | 20px, 600, lh 1.4 | H4 |
| `.text-lead` | 18px, lh 1.7 | Chapeaux, descriptions de section |
| corps | 16px, lh 1.65 | Texte courant |
| `.text-caption` | 14px | Métadonnées, légendes |
| `.eyebrow-label` | 13px, 600, uppercase, tracking 0.08em | Surtitres |

**Mise en exergue** (charte p.26) : graisse OU couleur, jamais les deux sur la même phrase.
Sur fond coloré : exergue par la graisse uniquement (`<strong>`), texte blanc.
Sur fond clair : mot-clé en `text-edf-bleu-action` ou `text-edf-green-dark` (si ≥ 24px).

Longueur de ligne : `max-w-prose` / `max-w-3xl` (45–75 caractères).

---

## 3. Géométrie & profondeur

- **`border-radius: 0` PARTOUT** (boutons, cards, badges, images, inputs). Le carré est la
  signature EDF (cartouche). Seule exception : scrollbar/skeletons (2px).
- Ombres teintées bleu nuit, 5 niveaux : utilities `shadow-1` … `shadow-5`.
  Cards au repos : `shadow-1` ou bordure. Hover : `shadow-3` + `-translate-y-0.5`.
- **⛔ Aucune bordure colorée sur les blocs** (ni latérale, ni supérieure, ni
  inférieure) : c'est le tic visuel des templates génériques. La couleur est
  portée par les `icon-square`, les grands chiffres (`stat-value`), les fonds
  teintés (`bg-edf-blanc-bleute`) et l'eyebrow. Les cards reposent sur la
  bordure neutre `border-edf-gris-clair` + l'élévation au hover.
- **Ornements de carte** (en remplacement des bordures colorées) :
  - `.card-pop` (+ `.card-pop-wrap`, variante `--center`) : l'icône carrée
    chevauche le bord supérieur de la carte — écho du cartouche EDF ;
  - `.card-pop-left` (+ `.card-pop-left-wrap`) : idem sur le bord gauche,
    pour les cartes en liste ;
  - `.card-motif` (`--vert`, `--orange`, bleu par défaut) : motif baguette
    officiel en filigrane dans l'angle bas-droit, intensifié au hover ;
  - numéro géant en filigrane (piliers numérotés) ;
  - petit carré camaïeu (`w-2.5 h-2.5`) au-dessus des chiffres clés.
- Pas de `backdrop-blur` décoratif, pas de blobs flous colorés hors `.glow-effect`.

---

## 4. Composants (classes globales dans `globals.css`)

| Classe | Description |
|---|---|
| `.btn` | Base bouton : h-12 (48px), px-7, 600, radius 0, focus ring |
| `.btn-primary` | Fond Bleu Action, texte blanc, hover Bleu Foncé |
| `.btn-secondary` | Bordure 2px Bleu Nuit, texte Bleu Nuit, hover inversé |
| `.btn-on-dark` | Fond blanc, texte Bleu Foncé, hover Blanc Bleuté (pour fonds sombres) |
| `.btn-outline-dark` | Bordure blanche, texte blanc, hover fond blanc/10 (fonds sombres) |
| `.link-arrow` | Lien tertiaire Bleu Action + flèche, underline au hover |
| `.eyebrow` | Surtitre de section : carré 8px plein + label uppercase |
| `.eyebrow--green` | Variante verte (sections environnement) |
| `.eyebrow--on-dark` | Variante sur fond sombre (carré + texte blancs) |
| `.card-edf` | Card blanche, bordure grise 1px, radius 0, hover shadow-3 |
| `.section` | `py` fluide 64→112px |
| `.section-alt` | Fond Blanc Bleuté |
| `.section-dark` | Fond Bleu Foncé + texte blanc |
| `.icon-square` | Conteneur d'icône 48px carré (fond bleu foncé OU vert foncé, icône blanche) |
| `.stat-value` | Grand chiffre clé (32→44px, 700, Bleu Foncé par défaut) |
| `.glow-effect` | Halo lumineux blanc pour `.section-dark` |
| `.container-custom` | max-w 1280px + padding latéral responsive |
| `.skip-link` | Lien d'évitement accessible |

### Hiérarchie des actions (1 primaire max par vue)
1. Primaire : `.btn .btn-primary` — 2. Secondaire : `.btn .btn-secondary` — 3. Tertiaire : `.link-arrow`.

### En-têtes de section
Toujours via `<SectionHeader>` (`src/components/ui/SectionHeader.tsx`) :
eyebrow → H2 → description. Props : `eyebrow`, `heading` (ReactNode — exergue via
`<span className="text-edf-bleu-action">`), `description`, `tone` (`blue` | `green`),
`onDark`, `align`, `className`, `id`.

### Heros de pages secondaires
Toujours via `<PageHero>` : dégradé mono-camaïeu + motif baguette + breadcrumb + H1.
`camaieu="bleu"` par défaut ; `camaieu="vert"` UNIQUEMENT pour la page Bénéfices (environnement).

### Icônes (lucide-react)
- Toujours dans `.icon-square` (ou inline 20px alignées au texte).
- **Une seule couleur d'icône par section** (bleu OU vert, selon le registre sémantique).
- Max 3 pictos « mis en avant » par écran (charte) ; les listes à puces-icônes restent sobres.

---

## 5. Layout & espacement

- Échelle d'espacement Tailwind standard ; verticalité des sections via `.section`.
- Alternance stricte des fonds de sections : blanc → blanc bleuté → blanc… ; une seule
  `.section-dark` par page maximum (moment fort).
- Grilles : `gap-6`/`gap-8` ; cards d'égale hauteur (`h-full`).
- Mobile-first ; cibles tactiles ≥ 44px ; `min-h-[48px]` sur les liens de menus.

---

## 6. Mouvement

Presets dans `src/lib/motion-variants.ts` uniquement (pas de props motion ad hoc) :
- `fadeInUp` (8px, 0.45s), `fadeInUpDelay(d)`, `staggerContainer` (0.08), `staggerItem`.
- Jamais d'animation sur le header/nav. Pas de rotation/scale décoratifs.
- `prefers-reduced-motion` est géré globalement dans `globals.css` — ne pas le retirer.

---

## 7. Accessibilité (rappels bloquants)

- Un seul `<h1>` par page ; hiérarchie de titres sans saut.
- `aria-labelledby` sur chaque `<section>` pointant vers l'id du H2.
- Images décoratives : `alt=""` + `aria-hidden`. Images porteuses de sens : alt descriptif.
- Focus visible conservé (outline 2px Bleu Action) ; `.skip-link` en premier élément focusable.
- Liens explicites (pas de « cliquez ici ») ; `aria-current="page"` sur la nav active.

---

## 8. Interdits récapitulatifs

1. ⛔ Orange / ambre dans l'UI (réservé au logo EDF).
2. ⛔ Mélange bleu + vert + autre teinte dans une même composition ; le vert reste une « touche ».
3. ⛔ `border-radius` > 0 sur les composants (pas de `rounded-*`, pas de pills).
4. ⛔ Couleurs hors tokens (`#hex` ad hoc, classes Tailwind `*-500`…).
5. ⛔ Texte noir `#000` ou gris en titres → Bleu Nuit.
6. ⛔ NextUI dans les composants du site public (réservé à l'admin).
7. ⛔ Vert moyen/clair ou bleu clair en texte sur fond blanc.
8. ⛔ Plus d'un symbole charte (+ / − / >) par composition ; transparences de cartouche > 10%.
