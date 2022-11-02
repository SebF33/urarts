# PROJET AVEC FRAMEWORK
![logo_urarts](/.github/logo_urarts.png)

**Titre : Urarts**

**Auteur : Sébastien Flouriot (SebF33)**

**Cahier des charges :**
Afficher des collections d’œuvres d’art par artiste et rendre les ressources manipulables.

:construction: Work in Progress


## :link: Liens
:earth_africa: **Site web :** https://urarts.fly.dev

:clapper: **Démo :** https://

:octocat: **GitHub :** https://github.com/SebF33/urarts


## :computer: Développement
**Description technique :** Environnement d'exécution moderne et sécurisé avec transmission des données en JSON.

**Langage :** TypeScript.

[![Deno](/.github/Deno.png)](https://deno.land) [![Fresh](/.github/Fresh.png)](https://fresh.deno.dev) [![Trex](/.github/Trex.png)](https://deno.land/x/trex) [![SQLite](/.github/SQLite.png)](https://www.sqlite.org/index.html) [![Ky](/.github/Ky.png)](https://github.com/sindresorhus/ky) [![Twind](/.github/Twind.png)](https://twind.dev) [![Everblush](/.github/Everblush.png)](https://everblush.github.io) [![Fly.io](/.github/Fly.io.png)](https://fly.io) 

:toolbox: **Technologies :**
- [Deno](https://deno.land/manual)
- [Fresh](https://fresh.deno.dev/docs/introduction)
- [Trex](https://github.com/crewdevio/Trex)
- [SQLite](https://github.com/dyedgreen/deno-sqlite)
- [Kysely](https://koskimas.github.io/kysely)
- [Ky](https://github.com/sindresorhus/ky)
- [Twind](https://twind.dev/handbook/introduction.html)
- [Everblush](https://github.com/Everblush/everblush)
- [Fly.io](https://fly.io/docs/getting-started/deno)


### ![Deno_tiny](/.github/Deno_tiny.png) Deno
Démarrer le projet :
`deno task start`

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

Augmenter la mémoire virtuelle :
`flyctl scale memory 512 -a urarts`

Déployer :
`flyctl deploy`

Ouvrir dans le navigateur :
`flyctl open`


![avatar](/.github/avatar.png)