# 🖼️ Images à ajouter au portfolio

Liste exhaustive des visuels qu'il reste à fournir pour remplacer les placeholders.

## ⚙️ Conseils techniques avant de commencer

- **Format recommandé** : `.webp` (3 à 5× plus léger que JPG/PNG, qualité identique)
- **Largeur max** : 1200 px (suffisant pour affichage retina)
- **Outil de conversion gratuit** : https://squoosh.app (Google)
- **Outil de compression sans perte** : https://tinypng.com
- **Dossier de destination** : `images/` (créer des sous-dossiers si besoin : `images/airbnb/`, `images/fregahouse/`, etc.)

## ✅ Pages déjà complètes (avec vraies images)

- `experience-fregahouse.html`
- `index.html`, `apropos.html`, `competences.html`, `projets.html`, `blog.html`, `contact.html`
- `experiences.html`

## 📌 Pages à compléter

### `experience-airbnb.html`

| # | Placeholder actuel | Image à fournir |
|---|---|---|
| 1 | « Photo du logement » (mission 1) | Photo extérieure ou principale de L'Oasis |
| 2 | « Capture annonce Airbnb » (mission 2) | Screenshot du listing Airbnb (vue principale) |
| 3 | « Photo du logement » (mission 3) | Photo intérieure (salon, cuisine, terrasse) |
| 4 | « Captures avis clients » (mission 4) | Screenshot d'une ou deux reviews 5⭐ |
| 5 | « Tableau de bord Airbnb » (mission 5) | Screenshot du dashboard hôte (stats, taux d'occupation) |

### `experience-meetup.html`

| # | Placeholder actuel | Image à fournir |
|---|---|---|
| 1 | Logo / identité Meet'up | Logo créé (Canva, Figma) |
| 2 | Mockup application | Capture d'écran ou maquette |
| 3 | Visuels de communication | Stories Instagram, posts, flyers |

### `experience-community.html`

| # | Placeholder actuel | Image à fournir |
|---|---|---|
| 1 | Posts Instagram | Carrousel ou capture du feed |
| 2 | Stories / formats | Captures des stories produites |
| 3 | Statistiques d'engagement | Screenshot Insights Instagram/Meta |

### `experience-jardin.html`

| # | Placeholder actuel | Image à fournir |
|---|---|---|
| 1 | Schéma concept | Mind map ou schéma du service |
| 2 | Logo & charte graphique | Logo final + palette de couleurs |
| 3 | Screenshot du site | Capture de https://www.lejardindurepos.fr/ |
| 4 | Visuels communication | Flyers, posts, supports créés |
| 5 | Galerie (3 photos) | Avant/après d'entretien, photos terrain |

## 🔄 Comment intégrer une image une fois prête

1. Place le fichier dans `images/airbnb/oasis-terrasse.webp` (par exemple)
2. Dans le HTML, remplace :
   ```html
   <div class="image-placeholder"><span>Photo du logement — à ajouter</span></div>
   ```
   par :
   ```html
   <img src="images/airbnb/oasis-terrasse.webp" alt="Terrasse de l'appartement L'Oasis à Marseille" class="detail-img" loading="lazy">
   ```
3. La classe `.detail-img` est déjà stylée dans `style.css` — pas besoin de toucher au CSS.

## 📊 État d'avancement

- [ ] `experience-airbnb.html` (5 images)
- [ ] `experience-meetup.html` (3 images)
- [ ] `experience-community.html` (3 images)
- [ ] `experience-jardin.html` (5 images)

**Total : 16 visuels à produire/récupérer.**
