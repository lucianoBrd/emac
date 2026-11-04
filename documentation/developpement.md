# Développement

[Retour au README](../README.md)

Le projet utilise Angular 21, TypeScript et SCSS. Les versions des dépendances
sont définies dans [package.json](../package.json) et verrouillées dans
[package-lock.json](../package-lock.json).

Pour installer et lancer le projet, suivre le [README](../README.md#lancer-le-projet-en-local).

## Commandes

| Commande                   | Usage                                                                      |
| -------------------------- | -------------------------------------------------------------------------- |
| `npm ci`                   | Installer les dépendances verrouillées et générer les données de contenu.  |
| `npm start`                | Lancer le serveur de développement et surveiller le contenu.               |
| `npm start -- --port 4300` | Lancer le serveur sur un autre port.                                       |
| `npm run watch`            | Compiler en continu en mode développement et surveiller le contenu.        |
| `npm run content:generate` | Valider et générer manuellement les données de contenu.                    |
| `npm run build`            | Générer les données, compiler en production et finaliser le site statique. |
| `npm run generate-mpa`     | Régénérer les fichiers SEO après une compilation.                          |

La compilation de production écrit le site dans `dist/emac/browser`.
Le serveur de développement n'active pas le service worker ; consulter le
[guide PWA](pwa.md) pour les essais hors connexion.

## Générer du code Angular

Utiliser le CLI installé dans le projet :

```bash
npm run ng -- generate component component-name
npm run ng -- generate --help
```

## Structure du projet

```text
.github/
  hook/                    Hook pre-push
  workflows/               Vérifications des PR et déploiement
content/
  emac.json                Fiche de l'école
  promotions/              Fiches des promotions
documentation/             Guides du projet
public/
  assets/                  Images, musique, polices et thème SCSS
  icons/                   Icônes PWA
  manifest.webmanifest     Manifeste de l'application
scripts/                   Génération du contenu, site statique et tests
src/
  app/
    emac/                  Page de l'école
    maintenance/           Page de maintenance
    page-not-found/        Page d'erreur
    promotions/            Pages des promotions
    shared/                Composants, données, modèles et services partagés
    app.routes.ts          Routes de l'application
  index.html               Document HTML principal
  main.ts                  Point d'entrée navigateur
  main.server.ts           Point d'entrée serveur pour le prérendu
  styles.scss              Styles globaux
angular.json               Configuration Angular
ngsw-config.json           Configuration du service worker
.pages.yml                 Configuration Pages CMS
```

Le [guide du contenu](contenu.md) détaille les fichiers sources et générés.
Les commandes de tests, de format et de lint sont regroupées dans le
[guide de contribution](contribution.md).

## Tests Angular et end-to-end

`npm test` lance le runner Karma configuré dans `angular.json`. Le dépôt ne
contient actuellement aucun fichier de test Angular `*.spec.ts` ; les tests
existants sont ceux listés dans le guide de contribution.

Aucun outil end-to-end n'est configuré dans le projet.

## Résoudre un problème de lancement

- Si une dépendance manque, exécuter `npm ci` à la racine du dépôt.
- Si un contenu est invalide, exécuter `npm run content:generate` et corriger le
  champ ou le média indiqué dans le message d'erreur.
- Si le port 4200 est occupé, choisir un autre port avec
  `npm start -- --port 4300`.
- En cas d'erreur SCSS, vérifier les imports et les fichiers du thème dans
  `public/assets/scss` ainsi que l'installation des dépendances.
