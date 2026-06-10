# 🌿 Centrale Bioénergie du Larivot - Site Web

Site web officiel de la Centrale Bioénergie du Larivot en Guyane française, développé pour EDF PEI.

## 🚀 Technologies utilisées

- **Next.js 16** - Framework React avec App Router
- **NextUI** - Composants UI modernes
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **TypeScript** - Typage statique

## 📁 Structure du projet

```
src/
├── app/
│   ├── globals.css      # Styles globaux et variables CSS
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
├── components/
│   ├── Header.tsx       # Navigation
│   ├── Footer.tsx       # Pied de page
│   └── sections/        # Sections de la page d'accueil
│       ├── HeroSection.tsx
│       ├── PresentationSection.tsx
│       ├── BenefitsSection.tsx
│       ├── AirQualitySection.tsx
│       ├── TimelineSection.tsx
│       ├── PreservationSection.tsx
│       ├── PartnershipsSection.tsx
│       ├── NewsSection.tsx
│       └── LocationSection.tsx
└── providers/
    └── NextUIProvider.tsx
```

## 🎨 Design system (Charte EDF 2021)

Le design du site suit la **charte graphique Groupe EDF 2021** : camaïeu directeur
**bleu** + touches de **vert** (registre environnemental), radius 0 (signature carré),
couleurs web accessibles WCAG AA. Référence complète : [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

| Variable | Couleur | Usage |
|----------|---------|-------|
| `--edf-bleu-nuit` | `#00155A` | Textes et titres (remplace le noir) |
| `--edf-bleu-action` | `#005BFF` | Liens, boutons, accents UI |
| `--edf-blanc-bleute` | `#E9F1F9` | Fonds de sections alternés |
| `--edf-blue` | `#001A70` | Fonds sombres (footer, moments forts) |
| `--edf-green-dark` | `#4F9E30` | Touches environnementales (icônes, titres) |

> ⚠️ L'orange EDF est réservé au logo (immuable) — jamais dans l'UI (un seul
> mélange de camaïeux autorisé par la charte : bleu + touches de vert).

## 🖼️ Médias à ajouter

Les emplacements suivants sont prévus pour les médias :

### Images (dans `/public/images/`)
- `timeline.png` - Image de la timeline de construction
- `palikour.jpg` - Photo du village Palikour
- `ruches.jpg` - Photo des ruches
- `protecta.jpg` - Photo Association Protecta
- `palmetum.jpg` - Photo du Palmetum
- `news-1.jpg`, `news-2.jpg`, `news-3.jpg` - Images actualités

### Vidéos (dans `/public/videos/`)
- `modelisation-centrale.mp4` - Vidéo de modélisation 3D
- `zone-sanctuarisee.mp4` - Vidéo de la zone préservée

## 🛠️ Installation

```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 📝 Sections de la page d'accueil

1. **Hero** - Titre principal avec vidéo de modélisation
2. **Présentation** - 100% renouvelable, 3 cards technologie
3. **Bénéfices** - 4 avantages clés du projet
4. **Qualité de l'air** - Levier écologique avec vidéo
5. **Timeline** - Étapes de construction 2023-2026
6. **Préservation** - Biodiversité et statistiques
7. **Partenariats** - Carousel des partenaires locaux
8. **Actualités** - 3 dernières news
9. **Localisation** - Carte Google Maps

## 📧 Contact

- **Email** : centraledularivot@edf.fr
- **Adresse** : 20 PL de La Défense, 92050 Paris Cedex 42

## 📄 Licence

Copyright © 2024 EDF PEI. Tous droits réservés.
