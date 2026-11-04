# Contribuer

[Retour au README](../README.md)

1. Créer une branche à partir de `main`.
2. Effectuer les modifications sur cette branche.
3. Exécuter les vérifications ci-dessous.
4. Créer une pull request vers `main` et faire relire les changements.
5. Après fusion, GitHub Actions reconstruit et déploie le site automatiquement.

## Format et lint

Pour corriger le format et les erreurs de lint corrigeables automatiquement :

```bash
npm run format
npm run lint:fix
```

Relire les modifications avant de les enregistrer dans Git. Le formatage ignore
les fichiers exclus par `.gitignore`, notamment les sorties de compilation et
les fichiers temporaires.

Pour vérifier sans modifier les fichiers :

```bash
npm run format:check
npm run lint
```

Le hook [pre-push](../.github/hook/pre-push) lance ces deux vérifications sans
modifier les fichiers et bloque le push si l'une échoue. En cas d'échec, corriger
les problèmes, puis enregistrer les modifications avant de pousser à nouveau.

## Tests

```bash
npm run test:content
npm run test:audio
npm run build
npm run test:seo
npm run test:pwa
```

Les tests SEO et PWA contrôlent les fichiers de `dist/emac/browser` : la
compilation doit donc réussir avant leur exécution.

## Vérifications sur les pull requests

Le workflow [Pull Request Checks](../.github/workflows/pull-request.yml) lance
trois contrôles distincts avec Node.js 24 et les dépendances de `package-lock.json` :

- `format:check` : format Prettier, hors fichiers ignorés par Git.
- `lint` : analyse ESLint.
- `Tests` : validation du contenu, cache audio, compilation, SEO et PWA.

Une nouvelle modification de la PR annule les vérifications précédentes encore
en cours. Le déploiement est décrit dans le [guide de publication](deploiement.md).
