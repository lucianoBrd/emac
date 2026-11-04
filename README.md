# EMAC

École militaire des aspirants de Coëtquidan.
Première version du site de l'EMAC.

Ce site permet l'affichage d'informations concernant :

- l'EMAC
- les promotions de l'EMAC

## Gestion des promotions avec Pages CMS

Les responsables gèrent les promotions depuis [Pages CMS](https://app.pagescms.org),
avec des formulaires pour les dates, les textes, les images, les galeries et les
chants. Les modifications sont enregistrées dans GitHub ; après une modification
sur `main`, GitHub Actions vérifie le contenu, reconstruit le site et le publie.
La mise en ligne prend le temps du workflow. En cas de validation ou compilation
incorrecte, le déploiement est interrompu et le site publié reste disponible.

### Connexion initiale par un administrateur

1. Publier ces fichiers sur le dépôt GitHub `lucianoBrd/emac`.
2. Ouvrir [app.pagescms.org](https://app.pagescms.org) et se connecter avec GitHub.
3. Installer l'application GitHub Pages CMS sur le compte propriétaire, en
   sélectionnant le dépôt `emac`.
4. Ouvrir le dépôt et choisir la branche `main`. Pages CMS lit automatiquement
   la configuration `.pages.yml`.
5. Donner accès aux responsables autorisés via les permissions GitHub ou les
   [collaborateurs Pages CMS](https://pagescms.org/docs/configuration/collaborators/).

Cette connexion doit être effectuée avec le compte du propriétaire du dépôt.
Aucun jeton GitHub n'est ajouté aux fichiers publics du site.
Voir le [guide officiel de connexion](https://pagescms.org/docs/quick-start/).

### Ajouter ou modifier une promotion

1. Dans **Promotions**, ouvrir une fiche ou créer une nouvelle entrée.
2. À la création, choisir un nom de fichier stable, par exemple
   `capitaine-exemple.json` : minuscules, chiffres et tirets uniquement.
   Ce nom détermine l'URL `/promotions/capitaine-exemple/`.
3. Renseigner le nom, le numéro unique, les dates et l'insigne. Les dates sont
   enregistrées sous la forme `YYYY-MM-DD`.
4. Ajouter les paragraphes avec l'éditeur de texte mis en forme. Compléter au
   besoin les sections facultatives : bannière, insigne, chant, album, galerie,
   réseaux sociaux et décorations.
5. Pour une galerie, choisir **Photo**, **Vidéo locale** ou **YouTube**. Pour
   YouTube, saisir un lien `https://www.youtube.com/embed/IDENTIFIANT` et sa miniature.
6. Cocher **Publier sur le site** et enregistrer pour mettre en ligne. Une nouvelle
   fiche est un brouillon par défaut ; elle peut être complétée avant publication.
7. Vérifier le workflow dans l'onglet **Actions** du dépôt.

Les identifiants techniques, les titres communs et les références aux images sont
générés automatiquement. Le menu, les pages prérendues et le sitemap suivent les
promotions publiées. Les noms de fichiers ne peuvent pas être renommés depuis le
CMS, afin de conserver les URL. La suppression y est désactivée ; décocher
**Publier sur le site** retire une fiche du site, avec une réponse 404 sur son
ancienne URL. Conserver au moins une promotion publiée.

Les médias sont rangés dans `public/assets/images` et `public/assets/music`.
La configuration accepte les images, vidéos locales et fichiers audio selon le
champ utilisé. Une validation contrôle les fichiers manquants, leur format et
la casse des noms avant publication.

### Modifier les informations de l'EMAC

Dans Pages CMS, ouvrir la fiche **EMAC**. Elle regroupe les titres et descriptions
SEO, les mots-clés, la bannière et son insigne, la présentation de l'école,
l'histoire, le chant et son enregistrement, les traditions et les liens sociaux.
Les textes longs utilisent l'éditeur de texte mis en forme ; les images et
fichiers audio utilisent les mêmes bibliothèques que les promotions.

Enregistrer la fiche sur `main` déclenche les vérifications et la publication
GitHub Actions. Les champs obligatoires, les fichiers référencés et les liens
sont contrôlés avant la compilation. L'URL de l'accueil reste `/`.
Les identifiants de l'école, des sections et des couplets sont automatiques.

Le contenu est conservé dans `content/emac.json`. Le fichier TypeScript
`src/app/shared/data/emac.ts` charge les données générées ; il n'est plus
nécessaire de le modifier pour changer les informations de l'école.
`npm start` surveille aussi ce contenu et le recharge après validation.

## Lancer le projet en local

Installer **Node.js 24** et npm, comme dans les workflows GitHub Actions.
Le CLI Angular du projet est installé avec les dépendances ; aucune installation
globale n'est nécessaire.

```bash
git clone https://github.com/lucianoBrd/emac.git
cd emac
npm ci
npm start
```

Ouvrir `http://localhost:4200/`. Le serveur recharge automatiquement les
modifications du code et du contenu. Une erreur de validation du contenu est
affichée dans le terminal ; la dernière version valide est conservée.

## Documentation

- [Contribuer et vérifier les changements](documentation/contribution.md)
- [Développement, commandes et structure du projet](documentation/developpement.md)
- [Organisation et génération du contenu](documentation/contenu.md)
- [Personnalisation du thème et de la navigation](documentation/personnalisation.md)
- [Déploiement et SEO](documentation/deploiement.md)
- [PWA et chants hors connexion](documentation/pwa.md)
