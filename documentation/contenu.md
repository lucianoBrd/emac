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
