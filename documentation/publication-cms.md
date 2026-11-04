# Publication automatique depuis Pages CMS

[Retour au README](../README.md)

## Fonctionnement

Après activation, les responsables continuent d'enregistrer leurs fiches et
médias sur `cms/contenu` dans Pages CMS. Le workflow
[CMS Publication](../.github/workflows/cms-publication.yml) :

1. Ouvre une PR vers `main`, ou réutilise celle déjà ouverte pour cette branche.
2. Met la branche à jour depuis `main` si nécessaire. Cette mise à jour déclenche
   de nouvelles vérifications.
3. Attend la réussite de **format:check**, **lint** et **Tests**.
4. Fusionne la PR seulement si ces trois contrôles GitHub Actions ont réussi
   sur le dernier commit et que la branche est à jour.
5. Laisse le workflow de déploiement publier le site après la fusion sur `main`.

La protection de `main` reste appliquée à l'application d'automatisation. Aucun
contournement administrateur et aucune exception de branche ne sont nécessaires.

La fusion est effectuée par le workflow après la CI ; il n'est pas nécessaire
d'activer l'option GitHub **Allow auto-merge**. La PR conserve l'historique des
vérifications et est fusionnée en squash.

## Configuration initiale par un administrateur

### 1. Créer et installer une GitHub App dédiée

Dans les paramètres du compte GitHub propriétaire, ouvrir **Developer settings >
GitHub Apps > New GitHub App** :

- Choisir un nom unique, par exemple `emac-cms-publication`.
- Utiliser l'URL du dépôt comme page d'accueil.
- Désactiver le webhook : cette application utilise uniquement GitHub Actions.
- Accorder ces permissions de dépôt : **Contents: Read and write**,
  **Pull requests: Read and write**, **Checks: Read-only**.
- Installer l'application uniquement sur le dépôt `emac`.

Ne pas ajouter cette application à la liste de contournement des règles de
`main`. Depuis la page de l'application, relever son **Client ID** et générer
une clé privée. La clé doit rester privée et ne doit pas être ajoutée au dépôt.

### 2. Configurer les variables et secrets du dépôt

Dans **Settings > Secrets and variables > Actions** du dépôt :

| Type     | Nom                   | Valeur                               |
| -------- | --------------------- | ------------------------------------ |
| Variable | `CMS_APP_CLIENT_ID`   | Client ID de la GitHub App           |
| Secret   | `CMS_APP_PRIVATE_KEY` | Contenu complet de la clé privée PEM |

Le workflow crée un jeton temporaire limité à `emac`, avec les trois permissions
ci-dessus. Le jeton est révoqué en fin de job par l'action officielle
[create-github-app-token](https://github.com/actions/create-github-app-token).

Une GitHub App permet aux PR créées et aux mises à jour effectuées par le bot de
déclencher la CI sans approbation manuelle des workflows. Les événements produits
avec `GITHUB_TOKEN` ont des restrictions de déclenchement ; voir la
[documentation GitHub](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow).

### 3. Installer le workflow sur main

Fusionner manuellement la PR qui ajoute ce workflow, son script et ses tests.
Cette première fusion reste manuelle puisque l'automatisation elle-même modifie
du code.

Vérifier aussi :

- La règle sur `main` exige `format:check`, `lint` et `Tests`, avec branche à jour.
- Les squash merges sont autorisés dans **Settings > General > Pull Requests**.
- **Automatically delete head branches** est désactivé si la branche permanente
  `cms/contenu` doit être réutilisée après chaque publication.

### 4. Démarrer avec la branche CMS existante

Pour une branche `cms/contenu` qui existait avant l'installation du workflow :

1. Ouvrir **Actions > CMS Publication > Run workflow** sur la branche `main`.
2. Saisir `cms/contenu` dans le champ de branche à publier.
3. Lancer le workflow. Il ouvre la PR et met la branche à jour si nécessaire.

Ce lancement manuel permet de démarrer même si l'ancienne branche CMS ne contient
pas encore le nouveau workflow. Ensuite, les enregistrements Pages CMS le
déclenchent automatiquement. Les autres branches `cms/*` sont également prises
en charge lorsqu'elles contiennent le workflow.

## Limites et intervention manuelle

L'automatisation n'autorise la fusion que pour les chemins suivants :

- `content/emac.json` ;
- `content/promotions/<nom>.json` ;
- images et vidéos dans `public/assets/images` ;
- fichiers audio dans `public/assets/music`.

Une PR qui modifie aussi le code, `.pages.yml`, un workflow ou les dépendances
reste à relire et fusionner manuellement. Les renommages sont vérifiés sur leur
ancien et leur nouveau chemin. Aucun fichier de la branche CMS n'est exécuté
par le job de publication : son script est chargé depuis `main`.

Une PR en brouillon n'est pas fusionnée. Si la CI échoue, corriger le contenu ou
le format indiqué par les contrôles, puis enregistrer à nouveau. Si la mise à
jour de la branche rencontre un conflit, le résoudre sur GitHub ou localement.
Une nouvelle modification rend les anciens résultats CI insuffisants : le
workflow attend ceux du nouveau commit. GitHub conserve le dernier contrôle des
règles de fusion, y compris si `main` change entre-temps.

Une fusion manuelle réussie reste possible ; pour reprendre une PR après sa sortie
du mode brouillon, relancer sa CI. Le workflow n'efface pas la branche CMS.

## Vérifications locales

```bash
npm run test:cms
```

Ces tests simulent les réponses GitHub : création et réutilisation de PR, branche
à mettre à jour, commit modifié, CI en échec ou ignorée, dépôt fork, brouillon et
fichiers hors périmètre. Ils ne créent ni ne fusionnent de PR réelle.
