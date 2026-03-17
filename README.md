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

## 🎨 Palette de couleurs (Inspirée EDF)

| Variable | Couleur | Usage |
|----------|---------|-------|
| `--edf-blue` | `#0d2240` | Couleur principale |
| `--edf-orange` | `#ff6b35` | Accents, CTAs |
| `--edf-green` | `#00a86b` | Écologie, succès |

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
