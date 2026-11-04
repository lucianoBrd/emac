# Organisation du contenu

[Retour au README](../README.md)

- `content/promotions/*.json` : une fiche par promotion, source du contenu.
- `content/emac.json` : la fiche de l’école.
- `scripts/generate-content.mjs` : validation et génération de tous les contenus.
- `scripts/generate-emac.mjs` : adaptation de la fiche EMAC aux composants.
- `src/app/shared/data/emac.generated.json` : contenu EMAC généré et ignoré par Git.
- `.pages.yml` : formulaires, médias et droits de modification dans Pages CMS.
- `scripts/generate-promotions.mjs` : validation et adaptation aux modèles Angular.
- `src/app/shared/data/promotions.generated.json` : fichier généré et ignoré par Git.
- `src/app/shared/data/promotion.ts` : chargement et conversion des dates.
- `src/app/shared/models` : modèles des composants.

`npm install` / `npm ci` et `npm run build` génèrent automatiquement les données.
`npm start` et `npm run watch` surveillent les fichiers de contenu ; une
modification valide est rechargée, une modification invalide est signalée dans le
terminal en conservant la dernière version valide. Pour générer manuellement :
`npm run content:generate`. Pour les tests de validation : `npm run test:content`.
La configuration des formulaires est aussi la source de validation des champs.

## Chemins des médias dans Pages CMS

Les champs image et fichier des fiches JSON utilisent les préfixes publics
définis par `media.output` dans `.pages.yml` : `/assets/images/...` pour les
images et vidéos, `/assets/music/...` pour les chants. Le `/` initial est
nécessaire pour que Pages CMS convertisse le chemin public vers le fichier du
dépôt, par exemple `/assets/images/logo/emac.svg` vers
`public/assets/images/logo/emac.svg`, et affiche son aperçu dans l'éditeur.

Les fichiers restent dans `public/assets` ; ne pas ajouter `public/` dans les
valeurs des fiches. `npm run test:content` vérifie aussi la correspondance des
chemins enregistrés avec les bibliothèques de médias et les fichiers du dépôt.
