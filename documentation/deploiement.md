# Déploiement et SEO

[Retour au README](../README.md)

## Publication automatique

Le workflow [Automatic Deploy to GitHub Pages](../.github/workflows/main.yml)
s'exécute à chaque push sur `main`, y compris après la fusion d'une pull request
ou un enregistrement Pages CMS sur cette branche.

Avec Node.js 24, il installe les dépendances via `npm ci`, valide le contenu,
compile le site, vérifie le SEO, la PWA et le cache audio, puis publie sur GitHub
Pages. Si une étape échoue, la publication est interrompue.

Le déploiement utilise le secret GitHub Actions `GH_PAGES`, transmis à la commande
de publication via `GH_TOKEN`. Ce secret doit être configuré dans les paramètres
du dépôt ; il ne doit pas être enregistré dans les fichiers du site.

## Publication manuelle

Depuis un environnement disposant des droits GitHub nécessaires :

```bash
npm run github-build
npm run github-deploy
```

`github-build` appelle la compilation de production. `github-deploy` publie
`dist/emac/browser` sur le dépôt configuré dans `package.json`.
Lancer les [vérifications de contribution](contribution.md) avant de publier.

## SEO et publication statique

`npm run build` prérend les pages Angular, puis génère `sitemap.xml`,
`robots.txt` et `404.html` dans `dist/emac/browser` pour GitHub Pages.
Les pages des promotions et leurs galeries sont déduites de `PromotionDB.list`.
Une galerie vide ne produit pas de page indexable.

Chaque page possède son contenu HTML, son titre, sa description, son URL canonique
avec slash final et ses métadonnées de partage. Les pages d'erreur portent `noindex`.
GitHub Pages sert `404.html` avec un statut HTTP 404 pour les chemins inexistants.
Le déploiement utilise `--no-notfound` pour conserver cette page personnalisée.

`npm run generate-mpa` reste disponible pour régénérer les fichiers SEO après
une compilation ; cette commande ne copie plus l'accueil sur les autres pages.
Pour changer de domaine, mettre à jour `SITE_URL` dans `meta.service.ts` et
`base` dans `scripts/finalize-static.mjs`.
