// Anglais
const translation = {
  about: {
    msg:
        `<p class="mb-4 text-2xl leading-5">The <strong>Urarts</strong> site is created with passion for <strong>Art</strong> and <strong>Dev</strong>.</p>
      <p class="mb-4 text-xl leading-5">
      <span class="font-bold underline">Means used</span>: TypeScript, Deno, Fresh, Kysely, Ky, Twind, Everblush, Alpine.js, Tippy.js, Chart.js, noUiSlider, Fly.io, Illustrator, Photoshop.</p>
      <p class="text-xl leading-5">
      <span class="font-bold underline">Copyright Policy</span>: Urarts shows public domain artwork and attempts to obtain permission for copyrighted ones.
      The purpose of this site is to use these historical works for informational and educational purposes.
      Visuals are low resolution images not suitable for commercial use.
      Please contact the creator of the site via his email address
      <a href="mailto:sebastien.flouriot@urarts.art" class="relative underline z-10">sebastien.flouriot@urarts.art</a> in the event of a request or dispute relating to the exploitation of these visuals.</p>`,
  },
  arts: {
    preview: "Preview",
  },
  common: {
    no_results: "No results",
  },
  error: {
    notfound: {
      msg: "Page not found:",
      title: "Error 404!",
    },
    server: {
      msg: "Internal server problem:",
      title: "Error 500!",
    },
  },
  indicator: {
    doughnut_title: "artists available by nationality",
    polararea_title: "arts available by movement",
  },
  logo: {
    msg:
      `<p><strong style="font-size:1.3em;text-decoration:underline">Copyright policy:</strong></p>
    <p style="margin-top:6px;line-height:1.1">Urarts shows public domain artwork and attempts to obtain permission for copyrighted ones.<br>
    The purpose of this site is to use these historical works for informational and educational purposes.<br>
    The visuals are low resolution images not suitable for commercial use.</p>
    <p style="margin-top:8px;line-height:1.1">Please contact the site creator via their email address
    <a href="mailto:sebastien.flouriot@urarts.art" style="text-decoration:underline">sebastien.flouriot@urarts.art</a>
    in the event of a request or dispute related to the use of these visuals.</p>`,
  },
  nav: {
    about: "About Urarts...",
    api: "A sample of the API.",
    artists: "Artists",
    arts: "Arts",
    histocharacters: "Historical figures.",
    home: "Home",
    indicators: "Indicators for Urarts.",
    mimi: "An exceptional talent.",
    movements: "Movements",
    talents: "Talents",
    women: "Women artists.",
  },
  paper: {
    famousart: "Some of the most famous arts...",
    name: "Name(s):",
    names: "Name(s):",
    talentsart: "Some works by talented artists...",
  },
  slider: {
    value_large: "Year ",
  },
  title: {
    about: "About",
    artists: "Artists",
    arts: "Arts",
    histocharacters: "Historical figures",
    indicators: "Indicators",
    movements: "Movements",
    talents: "Talents",
    women: "Women artists",
  },
} as const;

export default translation;
