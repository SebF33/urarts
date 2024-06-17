// Français
const translation = {
  about: {
    msg:
      `<p class="mb-4 text-2xl leading-5">Le site <strong>Urarts</strong> est réalisé avec passion pour l’<strong>Art</strong> et le <strong>Dév</strong>.</p>
    <p class="mb-4 text-xl leading-5">
    <span class="font-bold underline">Moyens utilisés</span> : TypeScript, Deno, Fresh, Kysely, Ky, Twind, Everblush, Alpine.js, Tippy.js, Chart.js, noUiSlider, Fly.io, Illustrator, Photoshop.</p>
    <p class="text-xl leading-5">
    <span class="font-bold underline">Politique de droit d’auteur</span> : Urarts montre des œuvres d’art du domaine public et tente d’obtenir l’autorisation pour celles protégées par le droit d’auteur.
    Le but de ce site est d’utiliser ces œuvres historiques à des fins d’information et d’éducation.
    Les visuels sont des images à faible résolution non adaptées à un usage commercial.
    Veuillez vous adresser au créateur du site via son adresse email
    <a href="mailto:sebastien.flouriot@urarts.art" class="relative underline z-10">sebastien.flouriot@urarts.art</a> en cas de demande ou de litige liés à l’exploitation de ces visuels.</p>`,
  },
  arts: {
    preview: "Aperçu",
  },
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
  logo: {
    msg:
      `<p><strong style="font-size:1.3em;text-decoration:underline">Politique de droit d'auteur :</strong></p>
    <p style="margin-top:6px;line-height:1.1">Urarts montre des œuvres d'art du domaine public et tente d'obtenir l'autorisation pour celles protégées par le droit d'auteur.<br>
    Le but de ce site est d'utiliser ces œuvres historiques à des fins d'information et d'éducation.<br>
    Les visuels sont des images à faible résolution non adaptées à un usage commercial.</p>
    <p style="margin-top:8px;line-height:1.1">Veuillez vous adresser au créateur du site via son adresse email
    <a href="mailto:sebastien.flouriot@urarts.art" style="text-decoration:underline">sebastien.flouriot@urarts.art</a>
    en cas de demande ou de litige liés à l'exploitation de ces visuels.</p>`,
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
    famousart: "Œuvres d’art parmi les plus célèbres...",
    name: "Nom(s) :",
    names: "Prénom(s), nom(s) :",
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
  },
} as const;

export default translation;
