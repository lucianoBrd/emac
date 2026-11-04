# Application web progressive (PWA)

[Retour au README](../README.md)

Le site peut être installé depuis le menu du navigateur sur les appareils compatibles.
Sur iPhone ou iPad, ouvrir le site dans Safari, puis utiliser **Partager > Sur l'écran d'accueil**.
L'application s'ouvre ensuite dans une fenêtre autonome avec son icône EMAC.
L'installation et le service worker nécessitent HTTPS en production ; localhost est
accepté pour les essais.

Le service worker Angular est activé uniquement en production. Il précharge
le code de l'application et conserve les images et polices locales au fil des
consultations. Après une première visite en ligne et l'installation du cache,
les pages peuvent être ouvertes hors connexion. Les images jamais consultées,
les polices Google, les vidéos et les contenus externes ne sont pas garantis hors
connexion. Les vidéos ne sont pas mises en cache.

### Chants disponibles hors connexion

La lecture d'un chant en ligne déclenche sa mise en cache complète en arrière-plan,
sans attendre le téléchargement pour commencer l'écoute. Ouvrir un album seul
ne télécharge pas ses morceaux. Le chant devient disponible hors connexion une
fois son téléchargement terminé ; une écoute très brève suivie d'une coupure
réseau peut ne pas suffire.

Le cache audio est limité à **80 Mio**, **20 morceaux** et **20 Mio par morceau**.
Les morceaux les moins récemment utilisés sont supprimés en premier lorsque la
limite est atteinte. Les fichiers expirent après **30 jours**. Seuls les fichiers
audio complets du dossier local `assets/music` sont conservés ; les réponses HTTP
partielles (`206`) et les fichiers externes sont exclus.

Les chants en cache sont lus depuis une URL `blob:` locale : le navigateur gère
la lecture et le déplacement dans le morceau hors connexion. Le cache est distinct
du préchargement PWA et ne télécharge aucun album lors de l'installation.
Le navigateur peut libérer ce stockage ; une erreur de quota n'empêche pas la
lecture en ligne. Les limites se règlent dans `AUDIO_CACHE_LIMITS`, dans
`src/app/shared/service/audio-cache.ts`.

### Navigation et essais

Les navigations utilisent la stratégie `freshness` : en ligne, les pages HTML
prérendues sont demandées au serveur pour conserver le comportement SEO ; hors
connexion, l'application utilise son cache. Les erreurs 404 et la maintenance
sont exclues du repli de navigation. Le navigateur recherche automatiquement les
mises à jour ; les onglets déjà ouverts peuvent conserver leur version jusqu'à
leur fermeture et leur réouverture.

Pour tester, exécuter `npm run build`, puis servir `dist/emac/browser` avec un
serveur HTTP local. Dans les outils de développement du navigateur, vérifier
**Application > Manifest / Service Workers**, attendre l'activation du service
worker, puis tester une navigation avec le réseau désactivé. `npm start` utilise
la configuration de développement sans service worker.

La configuration du cache se trouve dans `ngsw-config.json`, le manifeste dans
`public/manifest.webmanifest` et les icônes dans `public/icons`.

Pour vérifier le cache audio : `npm run test:audio` contrôle les limites, l'expiration,
les téléchargements concurrents et le rejet des réponses incomplètes. Dans le
navigateur, lancer un chant en ligne, attendre son apparition dans
**Application > Cache Storage > emac-audio-v1**, puis recharger la page hors
connexion et relancer le chant, y compris en déplaçant la barre de progression.
