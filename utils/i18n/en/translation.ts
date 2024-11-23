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
  artists: {
    artist: "Artist:",
    nationality: "Nationality:",
  },
  arts: {
    preview: "Preview",
    public_domain: "Public domain",
  },
  common: {
    no_results: "No results",
  },
  currentLng: "en",
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
  leonardo: {
    art: "Here is the artwork",
    artist: "Here is the artist",
    artists_available: "artists available",
    artists_displayed: "Artists displayed",
    arts_available: "artwork available",
    arts_currently_available: "artwork are currently available.",
    between_the_year: "between the year", and_year: "and year",
    characters_displayed_between: "Characters displayed between the year",
    click: "Click",
    discover: "Discover",
    discover_artist: "Discover the artist",
    discover_arts: "Discover other artwork by the same artist",
    error: "Leonardo API error.",
    fact: "Did you know?",
    for: "for",
    from: "from",
    from_artist: "of the artist",
    here: "here",
    hover_art: "or hover over the name of an artwork to paint its preview.",
    hover_movement: "or hover over the name of a movement to paint a preview of a related artwork.",
    iam: `<p class="text-[1rem] leading-none mt-1 mb-4">I am <strong>Leonardo</strong>, your guide in your research on <strong>Art</strong>!</p>`,
    lng: "Choose your language:",
    movement: "Here is the artistic movement",
    movements_available: "artistic movements available",
    nationality_period: "Choose a nationality and the period of existence of the artist(s) sought.",
    nav_theme: "to change the navigation bar theme.",
    new_artists: "Discover the latest artists added:",
    off: "Click the icon or my eyes to mute me.",
    page_about: `<h2>You are on the <span class="underline">about page</span> of the Urarts website.</h2>`,
    page_about_msg: `<p class="text-[1rem] leading-none mt-3">Mona Lisa is watching you...</p>`,
    page_artists: `<h2>You are on the <span class="underline">artists page</span>.</h2>`,
    page_arts: `<h2>You are on the <span class="underline">artwork names page</span>.</h2>`,
    page_histocharacters: `<h2>You are on the <span class="underline">historical figures page</span>.</h2>`,
    page_histocharacters_msg: `<p class="text-[1rem] leading-none mt-3">Choose the period of the character(s) sought.</p>`,
    page_home_msg: `<p class="text-[1rem] leading-none">Click on the portrait of an artist to access their artwork.</p>`,
    page_home_msg_2: "The artwork of the moment is entitled",
    page_indicators: `<h2>You are on the <span class="underline">indicators page</span> of the Urarts site.</h2>`,
    page_indicators_msg: `<p class="text-[1rem] leading-none mt-3">Click on the widget legend to evolve the data visualization.</p>`,
    page_movements: `<h2>You are on the <span class="underline">movement names page</span>.</h2>`,
    page_talents: `<h2>You are on the <span class="underline">talent page</span>.</h2>`,
    page_women: `<h2>You are on the <span class="underline">women artists page</span>.</h2>`,
    page_women_msg: `<p class="text-[1rem] leading-none mt-1">Click on the portrait of an artist to access her artwork.</p>`,
    search_among: "Do your search among",
    unclassified_arts: "<h2>Here are the unclassified artwork.</h2>",
    welcome: `<h2>Hello and welcome to <strong>Urarts</strong>...</h2>`,
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
  modal: {
    description: "Description:",
  },
  nav: {
    about: "About Urarts...",
    api: "A sample of the API.",
    artists: "Artists",
    arts: "Artworks",
    histocharacters: "Historical figures.",
    home: "Home",
    indicators: "Indicators for Urarts.",
    mimi: "An exceptional talent.",
    movements: "Movements",
    talents: "Talents",
    women: "Women artists.",
  },
  paper: {
    copyright: "The artist’s artwork is not yet available for copyright reasons.",
    famousart: "Some of the most famous arts...",
    name: "Name(s):",
    talentsart: "Some artwork by talented artists...",
  },
  slider: {
    value_large: "Year ",
  },
  title: {
    about: "About",
    artists: "Artists",
    arts: "Artworks",
    histocharacters: "Historical figures",
    indicators: "Indicators",
    movements: "Movements",
    talents: "Talents",
    women: "Women artists",
  },
} as const;

export default translation;
