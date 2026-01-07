import { Any } from "any";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { TagConst } from "@utils/types.d.ts";


// Constantes globales
export const DEFAULT_LNG = "en";
export const DEFAULT_NAV_THEME = "header-paper";
export const DELAY_API_CALL = 150;
export const DELAY_CHART_REACH_HREF = 400;
export const DELAY_DEBOUNCE = 300;
export const DELAY_DISPLAY = 20;
export const DELAY_DISPLAY_FOOTER = 200;
export const DELAY_DISPLAY_WATERDROP = 150;
export const DELAY_LEONARDO_CALL = 250;
export const DELAY_LEONARDO_FACT_TRIGGER = Math.floor(Math.random() * (18000 - 8000)) + 8000;
export const DELAY_LEONARDO_FIRST_CALL = 3000;
export const DELAY_LEONARDO_REACH_ART = 10;
export const DELAY_MODAL_CLOSE = 350;
export const DELAY_MODAL_TRIGGER = 80;
export const DELAY_REACH_ART = 1150;
export const DELAY_REACH_ART_FROM_MODAL = 400;
export const DELAY_REACH_HREF = 200;
export const DELAY_TOOLTIP_TRIGGER = 200;
export const NAV_THEME_KEY = "navTheme";
export const SECONDARY_NAV_THEME = "wave-colors";


export const INDICATORS_MOVEMENTS: string[] = [
  "artdeco",
  "baroque",
  "cubism",
  "impressionism",
  "realism",
  "italianrenaissance",
  "surrealism",
];


export const NATIONALITIES: string[] = [
  "Allemagne",
  "Armenia",
  "Arménie",
  "Austria",
  "Autriche",
  "Belarus",
  "Belgique",
  "Belgium",
  "Biélorussie",
  "Canada",
  "Chine",
  "Colombia",
  "Colombie",
  "Croatia",
  "Croatie",
  "Czechoslovakia",
  "Danemark",
  "Denmark",
  "Espagne",
  "Estonia",
  "Estonie",
  "États-Unis d'Amérique",
  "Finland",
  "Finlande",
  "France",
  "Germany",
  "Grèce",
  "Greece",
  "Hongrie",
  "Hungary",
  "Italie",
  "Italy",
  "Japan",
  "Japon",
  "Mexico",
  "Mexique",
  "Monde",
  "Netherlands",
  "Norvège",
  "Norway",
  "Pays-Bas",
  "People's Republic of China",
  "Poland",
  "Pologne",
  "Portugal",
  "Royaume-Uni",
  "Russian Federation",
  "Russie",
  "Slovenia",
  "Slovénie",
  "Spain",
  "Suède",
  "Suisse",
  "Sweden",
  "Switzerland",
  "Tchécoslovaquie",
  "Türkiye",
  "Turquie",
  "Ukraine",
  "United Kingdom",
  "United States of America",
  "Vietnam",
];


export const NB_LOADING_ARTS = 4;
export const NB_LOADING_ARTISTS = 10;

export const TALENTS: string[] = ["albert", "mimi"];

export const URL_GA = "*.google-analytics.com";
export const URL_GT = "https://www.googletagmanager.com";
export const URL_URARTS_ART = "https://www.urarts.art";
export const URL_URARTS_DEV = "https://urarts.fly.dev";
export const URL_URARTS_FR = "https://www.urarts.fr";


export const PLACEHOLDERS_BY_TYPE: Record<string, string[]> = {
  artistssearch: [
    "Claude Monet...",
    "de Vinci...",
    "Edvard Munch...",
    "Hokusai...",
    "Klimt...",
    "Michel-Ange...",
    "Mondrian...",
    "Rembrandt...",
    "Rosa Bonheur...",
    "Rubens...",
    "Vermeer...",
    "Vigée Le Brun...",
    "Vincent van Gogh...",
  ],
  artssearch: [
    "L'atelier...",
    "La bataille...",
    "Le jardin...",
    "Rose...",
    "Vénus...",
  ],
  collectionsearch: [
    "Allégorie...",
    "Fille...",
    "Fleurs...",
    "Nature morte...",
    "Portrait...",
  ],
  famousartsidebar: [
    "La Cène...",
    "La Joconde...",
    "La Nuit étoilée...",
    "Le Baiser...",
    "Les Ménines...",
  ],
  histosearch: [
    "Charles...",
    "George...",
    "Henri...",
    "Jacques...",
    "Louis...",
    "Napoléon...",
    "Rousseau...",
  ],
  talentsartsidebar: [
    "Bouddha...",
    "Famille...",
    "Mélancolie...",
    "Réflexion...",
    "Un port...",
  ],
};


export const TAGS: TagConst[] = [
  { 
    name: "Abstrait", name_en: "Abstract", slug: "abstract",
    info: "L’art abstrait explore formes, couleurs et lignes sans représentation figurative, laissant place à l’émotion et à l’interprétation.",
    info_en: "Abstract art explores shapes, colors, and lines without figurative representation, leaving room for emotion and interpretation.",
    type: 0
  },
  { 
    name: "Algeria", name_en: "Algérie", slug: "algeria",
    info: "L’Algérie a inspiré l’art orientaliste avec ses paysages désertiques, ses scènes de rue et son patrimoine architectural unique.",
    info_en: "Algeria inspired Orientalist art with its desert landscapes, street scenes, and unique architectural heritage.",
    type: 1
  },
  { 
    name: "Allégorie", name_en: "Allegory", slug: "allegory",
    info: "L’allégorie utilise des figures et des symboles pour représenter des idées abstraites, morales ou philosophiques.",
    info_en: "Allegory uses figures and symbols to represent abstract, moral, or philosophical ideas.",
    type: 0
  },
  { 
    name: "Allemagne", name_en: "Germany", slug: "germany",
    info: "L’Allemagne a inspiré des œuvres marquées par le Romantisme, l’Expressionnisme et la modernité artistique.",
    info_en: "Germany has inspired works marked by Romanticism, Expressionism, and modern artistic movements.",
    type: 1
  },
  { 
    name: "Amour", name_en: "Love", slug: "love",
    info: "L’amour est un thème universel de l’art, exprimé par la tendresse, la passion ou la tragédie.",
    info_en: "Love is a universal theme in art, expressed through tenderness, passion, or tragedy.",
    type: 0
  },
  { 
    name: "Animaux", name_en: "Animals", slug: "animals",
    info: "Les animaux, symboliques ou réalistes, incarnent la force, la nature ou la fidélité dans l’art.",
    info_en: "Animals, whether symbolic or realistic, embody strength, nature, or loyalty in art.",
    type: 0
  },
  { 
    name: "Architecture", name_en: "Architecture", slug: "architecture",
    info: "L’architecture est représentée dans l’art comme décor, motif ou sujet, témoignant du génie humain.",
    info_en: "Architecture is depicted in art as setting, motif, or subject, showcasing human ingenuity.",
    type: 0
  },
  { 
    name: "Arménie", name_en: "Armenia", slug: "armenia",
    info: "L’Arménie offre un héritage artistique mêlant influences chrétiennes, miniatures et paysages symboliques.",
    info_en: "Armenia offers an artistic heritage blending Christian influences, miniatures, and symbolic landscapes.",
    type: 1
  },
  { 
    name: "Art asiatique", name_en: "Asian Art", slug: "asian-art",
    info: "L’art asiatique englobe des traditions variées, allant de la calligraphie et la peinture à l’architecture et la sculpture.",
    info_en: "Asian art encompasses diverse traditions, ranging from calligraphy and painting to architecture and sculpture.",
    type: 0
  },
  { 
    name: "Autoportrait", name_en: "Self-portrait", slug: "self-portrait",
    info: "L’autoportrait est une introspection de l’artiste, révélant son image, son rôle ou son état intérieur.",
    info_en: "The self-portrait is an introspection of the artist, revealing their image, role, or inner state.",
    type: 0
  },
  { 
    name: "Autriche", name_en: "Austria", slug: "austria",
    info: "L’Autriche a marqué l’art par le Baroque, le Romantisme et la Sécession viennoise avec Klimt et Schiele.",
    info_en: "Austria shaped art through Baroque, Romanticism, and the Viennese Secession with Klimt and Schiele.",
    type: 1
  },
  { 
    name: "Belgique", name_en: "Belgium", slug: "belgium",
    info: "La Belgique est associée aux primitifs flamands, au Symbolisme et au Surréalisme de Magritte.",
    info_en: "Belgium is associated with Flemish Primitives, Symbolism, and Magritte’s Surrealism.",
    type: 1
  },
  { 
    name: "Biélorussie", name_en: "Belarus", slug: "belarus",
    info: "La Biélorussie porte une tradition picturale imprégnée de folklore et de réalismes socialistes.",
    info_en: "Belarus carries a pictorial tradition influenced by folklore and socialist realism.",
    type: 1
  },
  { 
    name: "Brou de noix", name_en: "Walnut Ink", slug: "walnut-ink",
    info: "Le brou de noix, obtenu à partir de coques de noix, est utilisé comme encre ou teinte naturelle dans l’art.",
    info_en: "Walnut ink, made from walnut husks, is used as a natural dye or ink in art.",
    type: 2
  },
  { 
    name: "Canada", name_en: "Canada", slug: "canada",
    info: "Le Canada a inspiré des paysages grandioses et l’art autochtone au riche Symbolisme.",
    info_en: "Canada inspired grand landscapes and Indigenous art with rich Symbolism.",
    type: 1
  },
  { 
    name: "Chine", name_en: "People's Republic of China", slug: "china",
    info: "La Chine possède une tradition artistique millénaire faite de calligraphie, peinture et symboles philosophiques.",
    info_en: "China has a millennia-old artistic tradition of calligraphy, painting, and philosophical symbols.",
    type: 1
  },
  { 
    name: "Colombie", name_en: "Colombia", slug: "colombia",
    info: "La Colombie mêle héritage précolombien, couleurs vives et figures contemporaines comme Botero.",
    info_en: "Colombia blends pre-Columbian heritage, vivid colors, and contemporary figures like Botero.",
    type: 1
  },
  { 
    name: "Croatie", name_en: "Croatia", slug: "croatia",
    info: "La Croatie offre un art imprégné d’influences méditerranéennes et slaves.",
    info_en: "Croatia offers art steeped in Mediterranean and Slavic influences.",
    type: 1
  },
  { 
    name: "Danemark", name_en: "Denmark", slug: "denmark",
    info: "Le Danemark a enrichi l’art avec le romantisme, le design et la peinture scandinave.",
    info_en: "Denmark enriched art with Romanticism, design, and Scandinavian painting.",
    type: 1
  },
  { 
    name: "Danse", name_en: "Dance", slug: "dance",
    info: "La danse est représentée en art comme mouvement gracieux, rythme et expression corporelle.",
    info_en: "Dance is represented in art as graceful movement, rhythm, and bodily expression.",
    type: 0
  },
  { 
    name: "Dessin", name_en: "Drawing", slug: "drawing",
    info: "Le dessin est la base de la création artistique, servant d’étude, de croquis ou d’œuvre achevée.",
    info_en: "Drawing is the foundation of artistic creation, serving as study, sketch, or finished work.",
    type: 0
  },
  { 
    name: "Égypte", name_en: "Egypt", slug: "egypt",
    info: "L’art égyptien antique privilégie la symbolique, l’éternité et la représentation codifiée des dieux et pharaons.",
    info_en: "Ancient Egyptian art emphasizes symbolism, eternity, and codified depictions of gods and pharaohs.",
    type: 1
  },
  { 
    name: "Espagne", name_en: "Spain", slug: "spain",
    info: "L’Espagne a marqué l’art avec Vélasquez, Goya, Picasso et le Surréalisme de Dalí.",
    info_en: "Spain influenced art with Velázquez, Goya, Picasso, and Dalí’s Surrealism.",
    type: 1
  },
  {
    name: "Estonie", name_en: "Estonia", slug: "estonia",
    info: "L’Estonie possède une scène artistique marquée par le folklore, l’art textile et les influences nordiques et soviétiques.",
    info_en: "Estonia has an art scene shaped by folklore, textile arts, and both Nordic and Soviet influences.",
    type: 1
  },
  { 
    name: "États-Unis d'Amérique", name_en: "United States of America", slug: "usa",
    info: "L’art américain reflète le réalisme, l’expressionnisme abstrait et le pop art.",
    info_en: "American art reflects Realism, Abstract Expressionism, and Pop Art.",
    type: 1
  },
  { 
    name: "Fantastique", name_en: "Fantasy", slug: "fantasy",
    info: "Le fantastique représente créatures et univers imaginaires nourris de mythes et de rêves.",
    info_en: "Fantasy depicts creatures and imaginary worlds inspired by myths and dreams.",
    type: 0
  },
  { 
    name: "Feu", name_en: "Fire", slug: "fire",
    info: "Le feu symbolise la passion, la destruction ou la lumière dans les représentations artistiques.",
    info_en: "Fire symbolizes passion, destruction, or light in artistic representations.",
    type: 0
  },
  { 
    name: "Fleurs", name_en: "Flowers", slug: "flowers",
    info: "Les fleurs expriment la beauté, la fragilité ou la symbolique des saisons.",
    info_en: "Flowers express beauty, fragility, or the symbolism of seasons.",
    type: 0
  },
  { 
    name: "Finlande", name_en: "Finland", slug: "finland",
    info: "La Finlande a produit un art marqué par la nature nordique et le Symbolisme.",
    info_en: "Finland produced art marked by Nordic nature and Symbolism.",
    type: 1
  },
  { 
    name: "France", name_en: "France", slug: "france",
    info: "La France est un centre majeur de l’histoire de l’art, de l’Impressionnisme au Cubisme.",
    info_en: "France is a major center of art history, from Impressionism to Cubism.",
    type: 1
  },
  { 
    name: "Grèce", name_en: "Greece", slug: "greece",
    info: "L’art grec antique a posé les bases de la sculpture et de l’harmonie classique.",
    info_en: "Ancient Greek art laid the foundations of sculpture and classical harmony.",
    type: 1
  },
  { 
    name: "Guerre", name_en: "War", slug: "war",
    info: "La guerre est représentée par la violence, l’héroïsme ou la mémoire des conflits.",
    info_en: "War is depicted through violence, heroism, or the memory of conflicts.",
    type: 0
  },
  { 
    name: "Histoire", name_en: "History", slug: "history",
    info: "L’histoire inspire des fresques, récits et portraits d’événements marquants.",
    info_en: "History inspires frescoes, narratives, and portraits of major events.",
    type: 0
  },
  { 
    name: "Hongrie", name_en: "Hungary", slug: "hungary",
    info: "La Hongrie exprime un art marqué par le folklore et l’avant-garde moderne.",
    info_en: "Hungary expresses art shaped by folklore and modern avant-garde.",
    type: 1
  },
  { 
    name: "Inde", name_en: "India", slug: "india",
    info: "L’art de l’Inde s’étend des temples richement sculptés aux miniatures raffinées, imprégné de spiritualité hindoue, bouddhique et moghole.",
    info_en: "Indian art ranges from richly carved temples to refined miniatures, infused with Hindu, Buddhist, and Mughal spirituality.",
    type: 1
  },
  { 
    name: "Industrie", name_en: "Industry", slug: "industry",
    info: "L’industrie est représentée dans l’art moderne comme symbole de progrès ou d’aliénation.",
    info_en: "Industry is depicted in modern art as a symbol of progress or alienation.",
    type: 0
  },
  { 
    name: "Intérieur", name_en: "Interior", slug: "interior",
    info: "L’intérieur est un motif récurrent représentant la vie domestique, les objets familiers et l’intimité des espaces clos.",
    info_en: "Interior scenes are a recurring theme depicting domestic life, familiar objects, and the intimacy of enclosed spaces.",
    type: 0
  },
  { 
    name: "Israël", name_en: "Israel", slug: "israel",
    info: "L’art en Israël reflète un carrefour de traditions anciennes et d’expressions modernes, mêlant héritage biblique et création contemporaine.",
    info_en: "Art in Israel reflects a crossroads of ancient traditions and modern expressions, blending biblical heritage with contemporary creation.",
    type: 1
  },
  { 
    name: "Italie", name_en: "Italy", slug: "italy",
    info: "L’Italie est le berceau de la Renaissance et d’innovations majeures dans l’art.",
    info_en: "Italy is the cradle of the Renaissance and major artistic innovations.",
    type: 1
  },
  { 
    name: "Japon", name_en: "Japan", slug: "japan",
    info: "Le Japon offre une tradition visuelle unique entre estampes, calligraphies et modernité.",
    info_en: "Japan offers a unique visual tradition between prints, calligraphy, and modernity.",
    type: 1
  },
  { 
    name: "Le temps", name_en: "Time", slug: "time",
    info: "Le temps est un thème artistique majeur, symbolisé par les saisons, l’éphémère, les horloges ou le cycle de la vie.",
    info_en: "Time is a major artistic theme, symbolized by seasons, ephemerality, clocks, or the cycle of life.",
    type: 0
  },
  { 
    name: "Mer", name_en: "Sea", slug: "sea",
    info: "La mer inspire les artistes comme force naturelle, espace mythique ou décor poétique.",
    info_en: "The sea inspires artists as natural force, mythical space, or poetic setting.",
    type: 0
  },
  { 
    name: "Mexique", name_en: "Mexico", slug: "mexico",
    info: "Le Mexique mêle héritage préhispanique et muralisme moderne avec Rivera et Kahlo.",
    info_en: "Mexico blends pre-Hispanic heritage and modern muralism with Rivera and Kahlo.",
    type: 1
  },
  { 
    name: "Monarchie", name_en: "Monarchy", slug: "monarchy",
    info: "La monarchie inspire l’art par ses fastes, ses portraits officiels et ses symboles du pouvoir.",
    info_en: "Monarchy inspires art through its splendor, official portraits, and symbols of power.",
    type: 0
  },
  { 
    name: "Monde", name_en: "World", slug: "world",
    info: "Le monde comme sujet artistique illustre la diversité des cultures et paysages.",
    info_en: "The world as an artistic subject illustrates the diversity of cultures and landscapes.",
    type: 1
  },
  { 
    name: "Montagnes", name_en: "Mountains", slug: "mountains",
    info: "Les montagnes incarnent la grandeur, la spiritualité et la nature sublime.",
    info_en: "Mountains embody grandeur, spirituality, and the sublime in nature.",
    type: 0
  },
  { 
    name: "Mort", name_en: "Death", slug: "death",
    info: "La mort est un thème universel, représentée par vanités, symboles et allégories.",
    info_en: "Death is a universal theme, represented by vanitas, symbols, and allegories.",
    type: 0
  },
  { 
    name: "Musique", name_en: "Music", slug: "music",
    info: "La musique en art évoque l’harmonie, le rythme ou la représentation des musiciens.",
    info_en: "Music in art evokes harmony, rhythm, or depictions of musicians.",
    type: 0
  },
  { 
    name: "Mythologie", name_en: "Mythology", slug: "mythology",
    info: "La mythologie fournit des récits symboliques et des personnages intemporels.",
    info_en: "Mythology provides symbolic narratives and timeless characters.",
    type: 0
  },
  { 
    name: "Nature", name_en: "Nature", slug: "nature",
    info: "La nature est représentée comme source d’inspiration, décor ou symbole vital.",
    info_en: "Nature is depicted as inspiration, setting, or vital symbol.",
    type: 0
  },
  { 
    name: "Nature morte", name_en: "Still Life", slug: "still-life",
    info: "La nature morte met en scène objets et aliments, explorant beauté et fragilité.",
    info_en: "Still life depicts objects and food, exploring beauty and fragility.",
    type: 0
  },
  { 
    name: "Norvège", name_en: "Norway", slug: "norway",
    info: "La Norvège reflète dans l’art ses paysages nordiques et son Symbolisme mystique.",
    info_en: "Norway reflects in art its Nordic landscapes and mystical Symbolism.",
    type: 1
  },
  { 
    name: "Nu", name_en: "Nude", slug: "nude",
    info: "Le nu représente le corps humain idéalisé ou naturaliste, thème central de l’art.",
    info_en: "The nude represents the human body, idealized or naturalistic, a central theme in art.",
    type: 0
  },
  { 
    name: "Or", name_en: "Gold", slug: "gold",
    info: "L’or, symbole de richesse et de lumière, est utilisé dans l’art pour sa brillance et sa valeur spirituelle. Les feuilles d’or ornent icônes, manuscrits et peintures, ajoutant une dimension sacrée ou somptueuse aux œuvres.",
    info_en: "Gold, symbol of wealth and light, is used in art for its brilliance and spiritual value. Gold leaf adorns icons, manuscripts, and paintings, adding a sacred or sumptuous dimension to artworks.",
    type: 0
  },
  { 
    name: "Pays-Bas", name_en: "Netherlands", slug: "netherlands",
    info: "Les Pays-Bas brillent par l’âge d’or de la peinture flamande et hollandaise.",
    info_en: "The Netherlands shine through the Golden Age of Flemish and Dutch painting.",
    type: 1
  },
  { 
    name: "Paysage", name_en: "Landscape", slug: "landscape",
    info: "Le paysage est un sujet majeur, reflétant la nature, la lumière et l’émotion.",
    info_en: "Landscape is a major subject, reflecting nature, light, and emotion.",
    type: 0
  },
  { 
    name: "Pologne", name_en: "Poland", slug: "poland",
    info: "La Pologne a produit un art riche en traditions nationales et en modernité.",
    info_en: "Poland produced art rich in national traditions and modernity.",
    type: 1
  },
  { 
    name: "Polynésie française", name_en: "French Polynesia", slug: "french-polynesia",
    info: "La Polynésie française a nourri l’imaginaire occidental, notamment à travers les œuvres de Gauguin et les représentations exotiques de ses îles.",
    info_en: "French Polynesia has fueled Western imagination, notably through Gauguin’s works and exotic representations of its islands.",
    type: 1
  },
  { 
    name: "Portrait", name_en: "Portrait", slug: "portrait",
    info: "Le portrait cherche à saisir l’apparence et la personnalité d’un individu.",
    info_en: "Portrait seeks to capture an individual’s appearance and personality.",
    type: 0
  },
  { 
    name: "Portugal", name_en: "Portugal", slug: "portugal",
    info: "Le Portugal exprime son art entre azulejos, Baroque et modernité.",
    info_en: "Portugal expresses its art through azulejos, Baroque, and modernity.",
    type: 1
  },
  { 
    name: "Religion", name_en: "Religion", slug: "religion",
    info: "La religion a inspiré fresques, icônes et symboles spirituels à travers les siècles.",
    info_en: "Religion inspired frescoes, icons, and spiritual symbols throughout the centuries.",
    type: 0
  },
  { 
    name: "Rêve", name_en: "Dream", slug: "dream",
    info: "Le rêve nourrit l’imaginaire artistique entre visions oniriques et surréalistes.",
    info_en: "Dreams fuel artistic imagination between oneiric and surreal visions.",
    type: 0
  },
  { 
    name: "Russie", name_en: "Russian Federation", slug: "russia",
    info: "La Russie est marquée par l’icône orthodoxe, l’avant-garde et le Réalisme.",
    info_en: "Russia is marked by Orthodox icons, the avant-garde, and Realism.",
    type: 1
  },
  { 
    name: "Royaume-Uni", name_en: "United Kingdom", slug: "uk",
    info: "Le Royaume-Uni a donné Turner, les préraphaélites et l’art contemporain.",
    info_en: "The United Kingdom produced Turner, the Pre-Raphaelites, and contemporary art.",
    type: 1
  },
  { 
    name: "Science", name_en: "Science", slug: "science",
    info: "La science, dans l’art, explore la connaissance, l’expérimentation, les technologies et la fascination pour l’univers.",
    info_en: "Science in art explores knowledge, experimentation, technology, and fascination with the universe.",
    type: 0
  },
  { 
    name: "Slovénie", name_en: "Slovenia", slug: "slovenia",
    info: "La Slovénie reflète une identité artistique entre traditions slaves et modernité.",
    info_en: "Slovenia reflects an artistic identity between Slavic traditions and modernity.",
    type: 1
  },
  { 
    name: "Suède", name_en: "Sweden", slug: "sweden",
    info: "La Suède a enrichi l’art de son symbolisme et de ses paysages nordiques.",
    info_en: "Sweden enriched art with its symbolism and Nordic landscapes.",
    type: 1
  },
  { 
    name: "Suisse", name_en: "Switzerland", slug: "switzerland",
    info: "La Suisse est associée au paysage alpin et à l’art moderne.",
    info_en: "Switzerland is associated with Alpine landscapes and modern art.",
    type: 1
  },
  { 
    name: "Tchécoslovaquie", name_en: "Czechoslovakia", slug: "czechoslovakia",
    info: "La Tchécoslovaquie a développé un art entre Cubisme, Surréalisme et tradition populaire.",
    info_en: "Czechoslovakia developed art between Cubism, Surrealism, and folk tradition.",
    type: 1
  },
  { 
    name: "Temps", name_en: "Weather", slug: "weather",
    info: "Le temps, dans l’art, incarne les forces de la nature — pluie, vent, nuages ou éclairs — et évoque les ambiances, les émotions ou les bouleversements.",
    info_en: "Weather in art embodies natural forces — rain, wind, clouds, or lightning — and evokes moods, emotions, or dramatic shifts.",
    type: 0
  },
  { 
    name: "Transport", name_en: "Transport", slug: "transport",
    info: "Le transport est un motif moderne, symbole de mouvement et de progrès.",
    info_en: "Transport is a modern motif, symbol of movement and progress.",
    type: 0
  },
  { 
    name: "Trompe-l'œil", name_en: "Trompe-l'oeil", slug: "trompe-l-oeil",
    info: "Le trompe-l’œil joue sur l’illusion visuelle pour troubler le spectateur.",
    info_en: "Trompe-l’œil plays on visual illusion to trick the viewer.",
    type: 0
  },
  { 
    name: "Turquie", name_en: "Türkiye", slug: "turkey",
    info: "La Turquie incarne un carrefour culturel entre Orient et Occident, avec un art riche mêlant traditions ottomanes, calligraphie et modernité.",
    info_en: "Turkey embodies a cultural crossroads between East and West, with rich art blending Ottoman traditions, calligraphy, and modernity.",
    type: 1
  },  
  { 
    name: "Ukraine", name_en: "Ukraine", slug: "ukraine",
    info: "L’Ukraine exprime un art influencé par les icônes, le folklore et l’avant-garde.",
    info_en: "Ukraine expresses art influenced by icons, folklore, and the avant-garde.",
    type: 1
  },
  { 
    name: "Urbain", name_en: "Urban", slug: "urban",
    info: "Le thème urbain reflète la vie moderne, l’architecture des villes, les foules et l’évolution du paysage citadin.",
    info_en: "The urban theme reflects modern life, city architecture, crowds, and the evolving urban landscape.",
    type: 0
  },
  { 
    name: "Vietnam", name_en: "Vietnam", slug: "vietnam",
    info: "Le Vietnam mêle traditions picturales asiatiques et art moderne engagé.",
    info_en: "Vietnam blends Asian pictorial traditions and engaged modern art.",
    type: 1
  }
];


export const ART_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
};

export const ARTIST_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    margin: "auto",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
};

export const FAMOUS_ART_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    position: "relative",
    width: "100%",
    margin: "auto",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
};


export const BG_STYLE: Record<string, { background: string; backgroundSize: string }> = {
  abstract: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/abstract.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  abstractart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/abstractart.png)`,
    backgroundSize: "clamp(300px, 29.7vw, 570px)",
  },
  academicart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/academicart.png)`,
    backgroundSize: "clamp(300px, 37.0vw, 710px)",
  },
  algeria: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/algeria.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  allegory: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/allegory.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  americanrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/americanrealism.png)`,
    backgroundSize: "clamp(300px, 39.1vw, 750px)",
  },
  analyticalrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/analyticalrealism.png)`,
    backgroundSize: "clamp(300px, 43.8vw, 840px)",
  },
  animals: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/animals.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  architecture: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/architecture.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  artdeco: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/artdeco.png)`,
    backgroundSize: "clamp(300px, 46.9vw, 900px)",
  },
  artnouveau: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/artnouveau.png)`,
    backgroundSize: "clamp(300px, 18.8vw, 360px)",
  },
  asianArt: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/asian-art.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  austria: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/austria.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  baroque: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/baroque.png)`,
    backgroundSize: "clamp(300px, 31.3vw, 600px)",
  },
  china: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/china.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  classicism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/classicism.png)`,
    backgroundSize: "clamp(300px, 31.8vw, 610px)",
  },
  cloisonnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/cloisonnism.png)`,
    backgroundSize: "clamp(300px, 32.3vw, 620px)",
  },
  conceptualart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/conceptualart.png)`,
    backgroundSize: "clamp(300px, 20.8vw, 400px)",
  },
  cubism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/cubism.png)`,
    backgroundSize: "clamp(300px, 20.8vw, 400px)",
  },
  dadaism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/dadaism.png)`,
    backgroundSize: "clamp(300px, 23.4vw, 450px)",
  },
  dance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/dance.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  death: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/death.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  drawing: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/drawing.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  dream: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/dream.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  earlyrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/earlyrenaissance.png)`,
    backgroundSize: "clamp(300px, 37.5vw, 720px)",
  },
  egypt: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/egypt.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  estonia: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/estonia.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  expressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/expressionnism.png)`,
    backgroundSize: "clamp(300px, 31.8vw, 610px)",
  },
  fantasy: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/fantasy.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  fauvism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/fauvism.png)`,
    backgroundSize: "clamp(300px, 25.0vw, 480px)",
  },
  fire: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/fire.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  flowers: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/flowers.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  france: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/france.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  frenchPolynesia: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/french-polynesia.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  futurism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/futurism.png)`,
    backgroundSize: "clamp(300px, 29.7vw, 570px)",
  },
  greece: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/greece.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  highrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/highrenaissance.png)`,
    backgroundSize: "clamp(300px, 39.1vw, 750px)",
  },
  history: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/history.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  impressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/impressionnism.png)`,
    backgroundSize: "clamp(300px, 31.3vw, 600px)",
  },
  india: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/india.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  industry: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/industry.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  interior: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/interior.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  intimism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/intimism.png)`,
    backgroundSize: "clamp(300px, 31.8vw, 610px)",
  },
  israel: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/israel.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  italianrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/italianrenaissance.png)`,
    backgroundSize: "clamp(300px, 40.6vw, 780px)",
  },
  japonism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/japonism.png)`,
    backgroundSize: "clamp(300px, 44.3vw, 850px)",
  },
  kitsch: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/kitsch.png)`,
    backgroundSize: "clamp(300px, 24.5vw, 470px)",
  },
  landscape: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/landscape.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  love: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/love.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  magicalrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/magicalrealism.png)`,
    backgroundSize: "clamp(300px, 29.2vw, 560px)",
  },
  mannerism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/mannerism.png)`,
    backgroundSize: "clamp(300px, 15.1vw, 290px)",
  },
  monarchy: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/monarchy.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  mountains: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/mountains.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  music: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/music.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  mythology: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/mythology.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  naiveart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/naiveart.png)`,
    backgroundSize: "clamp(300px, 24.5vw, 470px)",
  },
  nature: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/nature.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  neoclassicism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/neoclassicism.png)`,
    backgroundSize: "clamp(300px, 40.1vw, 770px)",
  },
  neoimpressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/neoimpressionnism.png)`,
    backgroundSize: "clamp(300px, 29.7vw, 570px)",
  },
  neoplasticism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/neoplasticism.png)`,
    backgroundSize: "clamp(300px, 52.1vw, 1000px)",
  },
  northernrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/northernrenaissance.png)`,
    backgroundSize: "clamp(300px, 45.8vw, 880px)",
  },
  nude: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/nude.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  orientalism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/orientalism.png)`,
    backgroundSize: "clamp(300px, 29.2vw, 560px)",
  },
  orphism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/orphism.png)`,
    backgroundSize: "clamp(300px, 30.2vw, 580px)",
  },
  portrait: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/portrait.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  postimpressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/postimpressionnism.png)`,
    backgroundSize: "clamp(300px, 28.1vw, 540px)",
  },
  precisionism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/precisionism.png)`,
    backgroundSize: "clamp(300px, 52.1vw, 1000px)",
  },
  preraphaelitism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/preraphaelitism.png)`,
    backgroundSize: "clamp(300px, 30.2vw, 580px)",
  },
  qingdynasty: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/qingdynasty.png)`,
    backgroundSize: "clamp(300px, 26.0vw, 500px)",
  },
  realism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/realism.png)`,
    backgroundSize: "clamp(300px, 46.9vw, 900px)",
  },
  regionalism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/regionalism.png)`,
    backgroundSize: "clamp(300px, 37.5vw, 720px)",
  },
  religion: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/religion.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  rococo: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/rococo.png)`,
    backgroundSize: "clamp(300px, 43.8vw, 840px)",
  },
  romanticism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/romanticism.png)`,
    backgroundSize: "clamp(300px, 24.0vw, 460px)",
  },
  russia: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/russia.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  science: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/science.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  sea: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/sea.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  selfPortrait: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/self-portrait.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  stillLife: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/still-life.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  streetart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/streetart.png)`,
    backgroundSize: "clamp(300px, 33.9vw, 650px)",
  },
  suprematism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/suprematism.png)`,
    backgroundSize: "clamp(300px, 36.5vw, 700px)",
  },
  surrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/surrealism.png)`,
    backgroundSize: "clamp(300px, 21.9vw, 420px)",
  },
  symbolism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/symbolism.png)`,
    backgroundSize: "clamp(300px, 12.5vw, 240px)",
  },
  synthetism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/synthetism.png)`,
    backgroundSize: "clamp(300px, 28.6vw, 550px)",
  },
  transport: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/transport.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  trompeLOeil: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/trompe-l-oeil.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  uk: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/uk.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  ukiyoe: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/ukiyoe.png)`,
    backgroundSize: "clamp(300px, 21.9vw, 420px)",
  },
  unclassified: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/default.png)`,
    backgroundSize: "clamp(300px, 25.0vw, 480px)",
  },
  urban: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/urban.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  usa: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/usa.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  walnutInk: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/walnut-ink.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  war: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/war.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
  weather: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/weather.png)`,
    backgroundSize: "clamp(300px, 39.6vw, 760px)",
  },
};
