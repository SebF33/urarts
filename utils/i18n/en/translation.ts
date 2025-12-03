// Anglais
const translation = {
  about: {
    legal:
      `<h2 class="text-2xl font-semibold mb-4">📄 Legal Notice – Urarts.art</h2>
      <section>
        <h3 class="font-semibold text-lg mb-2">1. Site Publisher</h3>
        <p>
          The website <strong>Urarts.art</strong> is published by Sébastien Flouriot,<br />
          contact email address: sebastien.flouriot@urarts.art.
        </p>
        <p class="mt-2">
          Publication manager: Sébastien Flouriot.
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">2. Hosting Provider</h3>
        <p>
          The website <strong>Urarts.art</strong> is hosted by: Infomaniak.<br />
          Website: https://www.infomaniak.com
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">3. Intellectual Property</h3>
        <p>
          The name <strong>“Urarts”</strong> is a registered trademark with the French National Institute of Industrial Property (INPI).
        </p>
        <p>
          Any use, reproduction, imitation, or exploitation, in whole or in part, of this trademark, without prior written authorization from its owner, is strictly prohibited and constitutes an infringement within the meaning of Articles L.713-2 and following of the French Intellectual Property Code.
        </p>
        <p>
          The website <strong>Urarts.art</strong>, its content (texts, graphics, logos, structure, source code, database, etc.) are protected by copyright law.
        </p>
        <p>
          Any reproduction, representation, modification, or distribution, in whole or in part, without written authorization, is prohibited.
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">4. Purpose of the Website</h3>
        <p>
          The website <strong>Urarts.art</strong> aims to promote, share, and educate about visual arts.
        </p>
        <p>
          It allows users to view online exhibitions of artworks, discover artists, and access cultural and educational content.
        </p>
        <p>
          The site does not provide an art sales service but is a cultural and educational platform dedicated to promoting artistic heritage.
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">5. Personal Data Protection</h3>
        <p>
          Information collected by <strong>Urarts.art</strong> is processed in accordance with the General Data Protection Regulation (GDPR) and French legislation in force.
        </p>
        <p>
          No personal data is shared with third parties without consent.  
          You may exercise your right to access, rectify, or delete your data by writing to: sebastien.flouriot@urarts.art.
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">6. Liability</h3>
        <p>
          The website <strong>Urarts.art</strong> strives to ensure the accuracy and regular updating of its content, but cannot be held responsible for any errors or omissions.
        </p>
        <p>
          The publisher reserves the right to modify, suspend, or discontinue the site at any time.
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">7. External Links</h3>
        <p>
          Hyperlinks may redirect users to other websites.<br />
          <strong>Urarts.art</strong> has no control over these external resources and declines any responsibility regarding their content.
        </p>
      </section>
      <section>
        <h3 class="font-semibold text-lg mb-2">8. Trademark Notice</h3>
        <p>
          <strong>Urarts®</strong> is a registered trademark with the INPI, operated through the website
          <a
            href="https://www.urarts.art"
            class="underline hover:text-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.urarts.art
          </a>.
        </p>
      </section>`,
    msg:
      `<p class="mb-4 text-lg md:text-xl leading-5">The <strong>Urarts</strong> site is created with passion for <strong>Art</strong> and <strong>Dev</strong>.</p>
      <p class="mb-4 text-lg md:text-xl leading-5">
      <span class="font-bold underline">Means used</span>: TypeScript, Deno, Fresh, Kysely, Ky, Twind, Everblush, Alpine.js, Motion, Tippy.js, Chart.js, noUiSlider, Fly.io, Illustrator, Photoshop.</p>
      <p class="mb-4 text-lg md:text-xl leading-5">
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
    according_to: "according to",
    art: "artwork",
    back_to_the_artist: "Back to the artist",
    no_results: "No results",
    without_year: "Without year",
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
    between_the_year: "between the year",
    and_year: "and year",
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
    hover_movement:
      "or hover over the name of a movement to paint a preview of a related artwork.",
    iam:
      `<p class="text-[1rem] leading-none mt-1 mb-4">I am <strong>Leonardo</strong>, your guide in your research on <strong>Art</strong>!</p>`,
    lng: "Choose your language:",
    movement: "Here is the artistic movement",
    movements_available: "artistic movements available",
    nationality_period:
      "Choose a nationality and the period of existence of the artist(s) sought.",
    nav_theme: "to change the navigation bar theme.",
    nav_worldmap: "to travel through Art.",
    new_artists: "Discover the latest artists added:",
    new_public_domain_artists:
      "Check out the artists in the public domain this year:",
    off: "Click the icon or my eyes to mute me.",
    or_click: "...or click on",
    page_about:
      `<h2>You are on the <span class="underline">about page</span> of the Urarts website.</h2>`,
    page_about_msg:
      `<p class="text-[1rem] leading-none mt-3">Mona Lisa is watching you...</p>`,
    page_artists:
      `<h2>You are on the <span class="underline">artists page</span>.</h2>`,
    page_arts:
      `<h2>You are on the <span class="underline">artwork names page</span>.</h2>`,
    page_histocharacters:
      `<h2>You are on the <span class="underline">historical figures page</span>.</h2>`,
    page_histocharacters_msg:
      `<p class="text-[1rem] leading-none mt-3">Choose the period of the character(s) sought.</p>`,
    page_home_msg:
      `<p class="text-[1rem] leading-none">Click on the portrait of an artist to access their artwork...</p>`,
    page_home_msg_2: "The artwork of the moment is entitled",
    page_indicators:
      `<h2>You are on the <span class="underline">indicators page</span> of the Urarts site.</h2>`,
    page_indicators_msg:
      `<p class="text-[1rem] leading-none mt-3">Click on the widget legend to evolve the data visualization.</p>`,
    page_movements:
      `<h2>You are on the <span class="underline">movement names page</span>.</h2>`,
    page_talents:
      `<h2>You are on the <span class="underline">talent page</span>.</h2>`,
    page_women:
      `<h2>You are on the <span class="underline">women artists page</span>.</h2>`,
    page_women_msg:
      `<p class="text-[1rem] leading-none mt-1">Click on the portrait of an artist to access her artwork.</p>`,
    page_worldmap:
      `<h2>I drew you a <span class="underline">world map</span>.</h2>`,
    page_worldmap_msg:
      `<p class="text-[1rem] leading-none mt-3">Click on the countries to travel through the Art of each culture.</p>`,
    redirect:
      `<p class="text-[1rem] leading-none">Please redirect to <a href="https://www.urarts.art" class="bold underline cursor-pointer">https://www.urarts.art</a> to take full advantage of my features.</p>`,
    search_among: "Do your search among",
    unclassified_arts: "<h2>Here are the unclassified artwork.</h2>",
    warning: "My work began in French, the English translation is in progress.",
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
  meta: {
    about: {
      desc: "About Urarts...",
      title: "Urarts - About",
    },
    artists: {
      desc: "The best artists in the world.",
      title: "Urarts - Artists",
    },
    arts: {
      desc: "All the most beautiful works of art in the world.",
      title: "Urarts - Artworks",
    },
    copyright: {
      desc: "Artists under copyright.",
      title: "Urarts - Copyright",
    },
    collection: {
      desc: "The most beautiful works of",
      title: "- Collection",
    },
    histocharacters: {
      desc: "Historical characters.",
      title: "Urarts - Historical Characters",
    },
    home: {
      desc: "What are the most beautiful works of art in the world?",
      title: "Urarts - Home",
    },
    indicators: {
      desc: "Indicators for Urarts.",
      title: "Urarts - Indicators",
    },
    movements: {
      desc: "The main artistic movements.",
      title: "Urarts - Movements",
    },
    scroll_to_bottom: "Scroll to bottom",
    scroll_to_top: "Scroll to top",
    talents: {
      desc: "The talents.",
      title: "Urarts - Talents",
    },
    women: {
      desc: "Women artists.",
      title: "Urarts - Women Artists",
    },
    worldmap: {
      desc: "The world map.",
      title: "Urarts - World Map",
    },
  },
  modal: {
    description: "Description:",
    panel_far_left: "(Panel on the far left)",
    panel_far_right: "(Panel on the far right)",
    panel_left: "(Panel on the left)",
    panel_right: "(Panel on the right)",
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
    copyright:
      "The artist’s artwork is not yet available for copyright reasons.",
    famousart: "Some of the most famous masterpieces...",
    name: "Name(s):",
    talentsart: "Some artwork by talented artists...",
    welcome: "Discover, explore and share the beauty of Art.",
    worldmap: "World map",
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
    worldmap: "World map",
  },
  worldmap: {
    artists: "Artists",
    discover: "Discover",
    no_artist: "No artists found.",
    no_artwork: "No artworks found.",
    representations: "Places represented",
  },
} as const;

export default translation;
