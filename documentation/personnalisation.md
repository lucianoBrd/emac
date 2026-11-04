# Personnalisation

[Retour au README](../README.md)

## Styles SCSS

Les styles globaux sont définis dans `src/styles.scss`, qui importe le thème
`public/assets/scss/app.scss`. Les composants possèdent aussi leurs propres
fichiers SCSS.

`app.scss` charge Bootstrap, les styles du carrousel Owl, les icônes, le thème
EMAC et les notifications Toastr. `inner-page.scss` charge les variables et les
règles du thème, y compris les variantes responsive, sombre et RTL.

Pour modifier le rendu, partir de ces fichiers et vérifier le résultat sur les
pages de l'école, des promotions et des galeries, sur ordinateur et mobile.

## Navigation

Deux composants de navigation sont disponibles dans
`src/app/shared/components/navigation` :

- `menu` : menu horizontal.
- `center-menu` : menu avec logo centré.

Ils utilisent `NavService`, dans `src/app/shared/service/nav.service.ts`, et
gèrent l'ouverture du menu sur les petits écrans. Les liens vers les promotions
suivent le contenu publié.

## Thème et textes communs

`src/app/shared/data/config.ts` contient `ConfigDB`, notamment :

- `inMaintenance` pour le mode maintenance.
- `data.settings.layout_type` pour la direction du thème (`ltr` ou `rtl`).
- `data.settings.layout_version` pour la variante (`light` ou `dark`).
- `wordings` pour les libellés communs de l'interface.

Le comportement de changement de thème est géré par
`src/app/shared/service/customizer.service.ts`.

Les textes et médias de l'école et des promotions se modifient depuis
[Pages CMS](../README.md#gestion-des-promotions-avec-pages-cms).
Leur organisation technique est décrite dans le [guide du contenu](contenu.md).

## Dépendances visuelles

Les bibliothèques utilisées comprennent Bootstrap, ng-bootstrap, ngx-toastr,
ng-gallery, ngx-masonry et ngx-owl-carousel-o. Consulter
[package.json](../package.json) pour la liste et les versions du projet.
