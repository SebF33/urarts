// Français
const translation = {
  about: {
    msg:
      `<p class="mb-4 text-xl md:text-2xl leading-5">Le site <strong>Urarts</strong> est réalisé avec passion pour l’<strong>Art</strong> et le <strong>Dév</strong>.</p>
      <p class="mb-4 text-xl md:text-2xl leading-5">
      <span class="font-bold underline">Moyens utilisés</span> : TypeScript, Deno, Fresh, Kysely, Ky, Twind, Everblush, Alpine.js, Motion, Tippy.js, Chart.js, noUiSlider, Fly.io, Illustrator, Photoshop.</p>
      <p class="text-xl md:text-2xl leading-5">
      <span class="font-bold underline">Politique de droit d’auteur</span> : Urarts montre des œuvres d’art du domaine public et tente d’obtenir l’autorisation pour celles protégées par le droit d’auteur.
      Le but de ce site est d’utiliser ces œuvres historiques à des fins d’information et d’éducation.
      Les visuels sont des images à faible résolution non adaptées à un usage commercial.
      Veuillez vous adresser au créateur du site via son adresse email
      <a href="mailto:sebastien.flouriot@urarts.art" class="relative underline z-10">sebastien.flouriot@urarts.art</a> en cas de demande ou de litige liés à l’exploitation de ces visuels.</p>`,
  },
  artists: {
    artist: "Artiste :",
    nationality: "Nationalité :",
  },
  arts: {
    preview: "Aperçu",
    public_domain: "Domaine public",
  },
  common: {
    art: "œuvre",
    no_results: "Pas de résultats",
  },
  currentLng: "fr",
  error: {
    notfound: {
      msg: "Page introuvable :",
      title: "Erreur 404 !",
    },
    server: {
      msg: "Problème interne du serveur :",
      title: "Erreur 500 !",
    },
  },
  indicator: {
    doughnut_title: "artistes disponibles par nationalité",
    polararea_title: "œuvres d’art disponibles par mouvement",
  },
  leonardo: {
    art: "Voici l’œuvre",
    artist: "Voici l’artiste",
    artists_available: "artistes disponibles",
    artists_displayed: "Artistes affichés",
    arts_available: "œuvres disponibles",
    arts_currently_available: "œuvre(s) sont actuellement disponible(s).",
    between_the_year: "entre l’an",
    and_year: "et l’an",
    characters_displayed_between: "Personnages affichés entre l’an",
    click: "Cliquez",
    discover: "Découvrez",
    discover_artist: "Découvrez l’artiste",
    discover_arts: "Découvrez les autres œuvres du même artiste",
    error: "Erreur de l’API Leonardo.",
    fact: "Le saviez-vous ?",
    for: "pour",
    from: "de",
    from_artist: "de l’artiste",
    here: "ici",
    hover_art: "ou survolez le nom d’une œuvre pour peindre son aperçu.",
    hover_movement:
      "ou survolez le nom d’un mouvement pour peindre l’aperçu d’une œuvre associée.",
    iam:
      `<p class="text-[1rem] leading-none mt-1 mb-4">Je suis <strong>Leonardo</strong>, votre guide dans vos recherches sur l’<strong>Art</strong> !</p>`,
    lng: "Choisissez votre langue :",
    movement: "Voici le mouvement artistique",
    movements_available: "mouvements artistiques disponibles",
    nationality_period:
      "Choisissez une nationalité et la période d’existence du ou des artiste(s) recherché(s).",
    nav_theme: "pour changer le thème de la barre de navigation.",
    nav_worldmap: "pour voyager à travers l’Art.",
    new_artists: "Découvrez les derniers artistes ajoutés :",
    new_public_domain_artists:
      "Découvrez les artistes dans le domaine public cette année :",
    off: "Cliquez sur l’icône ou sur mes yeux pour me désactiver.",
    or_click: "...ou cliquez sur",
    page_about:
      `<h2>Vous êtes sur la <span class="underline">page "à propos"</span> du site Urarts.</h2>`,
    page_about_msg:
      `<p class="text-[1rem] leading-none mt-3">Mona Lisa vous observe...</p>`,
    page_artists:
      `<h2>Vous êtes sur la <span class="underline">page des artistes</span>.</h2>`,
    page_arts:
      `<h2>Vous êtes sur la <span class="underline">page des noms d’œuvres d’art</span>.</h2>`,
    page_histocharacters:
      `<h2>Vous êtes sur la <span class="underline">page des personnages historiques</span>.</h2>`,
    page_histocharacters_msg:
      `<p class="text-[1rem] leading-none mt-3">Choisissez la période du ou des personnage(s) recherché(s).</p>`,
    page_home_msg:
      `<p class="text-[1rem] leading-none">Cliquez sur le portrait d’un(e) artiste pour accéder à ses œuvres...</p>`,
    page_home_msg_2: "L’œuvre du moment s’intitule",
    page_indicators:
      `<h2>Vous êtes sur la <span class="underline">page des indicateurs</span> du site Urarts.</h2>`,
    page_indicators_msg:
      `<p class="text-[1rem] leading-none mt-3">Cliquez sur la légende des widgets pour faire évoluer la visualisation des données.</p>`,
    page_movements:
      `<h2>Vous êtes sur la <span class="underline">page des noms de mouvements</span>.</h2>`,
    page_talents:
      `<h2>Vous êtes sur la <span class="underline">page des talents</span>.</h2>`,
    page_women:
      `<h2>Vous êtes sur la <span class="underline">page des femmes artistes</span>.</h2>`,
    page_women_msg:
      `<p class="text-[1rem] leading-none mt-1">Cliquez sur le portrait d’une artiste pour accéder à ses œuvres.</p>`,
    page_worldmap:
      `<h2>Je vous ai dessiné une <span class="underline">carte du Monde</span>.</h2>`,
    page_worldmap_msg:
      `<p class="text-[1rem] leading-none mt-3">Cliquez sur les pays pour voyager à travers l’Art de chaque culture.</p>`,
    redirect:
      `<p class="text-[1rem] leading-none">Veuillez vous rediriger sur <a href="https://www.urarts.art" class="bold underline cursor-pointer">https://www.urarts.art</a> pour profiter pleinement de mes fonctionnalités.</p>`,
    search_among: "Faites votre recherche parmi",
    unclassified_arts: "<h2>Voici les œuvres non classées.</h2>",
    warning: "Mes travaux ont commencé en français, la traduction anglaise est en cours.",
    welcome: `<h2>Bonjour et bienvenue sur <strong>Urarts</strong>...</h2>`,
  },
  logo: {
    msg:
      `<p><strong style="font-size:1.3em;text-decoration:underline">Politique de droit d’auteur :</strong></p>
    <p style="margin-top:6px;line-height:1.1">Urarts montre des œuvres d’art du domaine public et tente d’obtenir l’autorisation pour celles protégées par le droit d’auteur.<br>
    Le but de ce site est d’utiliser ces œuvres historiques à des fins d’information et d’éducation.<br>
    Les visuels sont des images à faible résolution non adaptées à un usage commercial.</p>
    <p style="margin-top:8px;line-height:1.1">Veuillez vous adresser au créateur du site via son adresse email
    <a href="mailto:sebastien.flouriot@urarts.art" style="text-decoration:underline">sebastien.flouriot@urarts.art</a>
    en cas de demande ou de litige liés à l’exploitation de ces visuels.</p>`,
  },
  meta: {
    about: {
      desc: "À propos de Urarts...",
      title: "Urarts - À propos",
    },
    artists: {
      desc: "Les meilleurs artistes au monde.",
      title: "Urarts - Artistes",
    },
    arts: {
      desc: "Toutes les plus belles œuvres d’art au monde.",
      title: "Urarts - Œuvres",
    },
    copyright: {
      desc: "Artistes sous copyright.",
      title: "Urarts - Copyright",
    },
    collection: {
      desc: "Les plus belles œuvres de",
      title: "- Collection",
    },
    histocharacters: {
      desc: "Les personnages historiques.",
      title: "Urarts - Personnages historiques",
    },
    home: {
      desc: "Quelles sont les plus belles œuvres d’art au monde ?",
      title: "Urarts - Accueil",
    },
    indicators: {
      desc: "Indicateurs pour Urarts.",
      title: "Urarts - Indicateurs",
    },
    movements: {
      desc: "Les principaux mouvements artistiques.",
      title: "Urarts - Mouvements",
    },
    talents: {
      desc: "Les talents.",
      title: "Urarts - Talents",
    },
    women: {
      desc: "Les femmes artistes.",
      title: "Urarts - Femmes artistes",
    },
    worldmap: {
      desc: "La carte du Monde.",
      title: "Urarts - Carte du Monde",
    },
  },
  modal: {
    description: "Description :",
    panel_far_left: "(Panneau tout à gauche)",
    panel_far_right: "(Panneau tout à droite)",
    panel_left: "(Panneau à gauche)",
    panel_right: "(Panneau à droite)",
  },
  nav: {
    about: "À propos de Urarts...",
    api: "Un échantillon de l’API.",
    artists: "Artistes",
    arts: "Œuvres",
    histocharacters: "Les personnages historiques.",
    home: "Accueil",
    indicators: "Les indicateurs pour Urarts.",
    mimi: "Un talent exceptionnel.",
    movements: "Mouvements",
    talents: "Talents",
    women: "Les femmes artistes.",
  },
  paper: {
    copyright:
      "Les œuvres de l’artiste ne sont pas encore disponibles pour des raisons de droit d’auteur.",
    famousart: "Quelques-uns des chefs-d’œuvre les plus célèbres...",
    name: "Nom(s) :",
    talentsart: "Quelques œuvres d’artistes talentueux...",
    worldmap: "Carte du Monde",
  },
  slider: {
    value_large: "An ",
  },
  title: {
    about: "À propos",
    artists: "Artistes",
    arts: "Œuvres",
    histocharacters: "Personnages historiques",
    indicators: "Indicateurs",
    movements: "Mouvements",
    talents: "Talents",
    women: "Femmes artistes",
    worldmap: "Carte du Monde",
  },
  worldmap: {
    artists: "Artistes",
    discover: "Découvrir",
    no_artist: "Aucun artiste trouvé.",
    no_artwork: "Aucune œuvre trouvée.",
    representations: "Représentations",
  },
} as const;

export default translation;
