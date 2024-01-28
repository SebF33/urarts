# PROJET AVEC FRAMEWORK
![logo_urarts](/.github/logo_urarts.png)

**Titre : Urarts**

**Auteur : Sébastien Flouriot (SebF33)**

**Cahier des charges :**
Afficher des collections d’œuvres d’art par artiste et rendre les ressources manipulables.

:construction: Work in Progress


## :link: Liens
:earth_africa: **Site web :** https://www.urarts.art

:octocat: **GitHub :** https://github.com/SebF33/urarts


## :computer: Développement
**Description technique :** Environnement d'exécution moderne et sécurisé avec transmission des données en JSON.

**Langage :** TypeScript.

[![Deno](/.github/Deno.png)](https://deno.land) [![Fresh](/.github/Fresh.png)](https://fresh.deno.dev) [![SQLite](/.github/SQLite.png)](https://www.sqlite.org/index.html) [![Kysely](/.github/Kysely.png)](https://kysely.dev) [![Ky](/.github/Ky.png)](https://github.com/sindresorhus/ky) [![Twind](/.github/Twind.png)](https://twind.style) [![Everblush](/.github/Everblush.png)](https://everblush.github.io) [![Alpine.js](/.github/Alpine.js.png)](https://alpinejs.dev) [![Tippy.js](/.github/Tippy.js.png)](https://atomiks.github.io/tippyjs) [![Chart.js](/.github/Chart.js.png)](https://www.chartjs.org) [![Fly.io](/.github/Fly.io.png)](https://fly.io) 

:toolbox: **Technologies :**
- [Deno](https://deno.land/manual)
- [Fresh](https://fresh.deno.dev/docs/introduction)
- [SQLite](https://github.com/dyedgreen/deno-sqlite)
- [Kysely](https://kysely-org.github.io/kysely)
- [Ky](https://github.com/sindresorhus/ky)
- [Twind](https://twind.style/installation)
- [Everblush](https://github.com/Everblush/everblush)
- [Alpine.js](https://alpinejs.dev/start-here)
- [Tippy.js](https://atomiks.github.io/tippyjs/v6/getting-started)
- [Chart.js](https://www.chartjs.org/docs/latest)
- [noUiSlider](https://refreshless.com/nouislider)
- [Fly.io](https://fly.io/docs/getting-started/deno)


### ![Deno_tiny](/.github/Deno_tiny.png) Deno
Démarrer le projet :
`deno task preview`

Lancer la base de données :
`deno task migrate`

Créer la base de données et remplir avec des données :
`deno task migrate_up`

Effacer la base de données :
`deno task migrate_down`


### ![Fly.io_tiny](/.github/Fly.io_tiny.png) Fly.io
Créer une application :
`flyctl launch`

Créer un volume persistant pour SQLite :
`flyctl volumes create urarts_data --size 20 --app urarts`

Augmenter la mémoire de la machine virtuelle :
`flyctl scale memory 512 -a urarts`

Déployer :
`flyctl deploy`

Ouvrir dans le navigateur :
`flyctl open`


[![Made with Fresh](https://fresh.deno.dev/fresh-badge-dark.svg)](https://fresh.deno.dev)


<p align="center">
  <img align="center" width="100" src="https://raw.githubusercontent.com/sebf33/sebf33/master/assets/avatar.png" />
</p>