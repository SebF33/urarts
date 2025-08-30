import { Any } from "any";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { TagConst } from "@utils/types.d.ts";

// Constantes globales
export const DEFAULT_LNG = "en";
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

export const INDICATORS_MOVEMENTS: string[] = [
  "artdeco",
  "baroque",
  "cubism",
  "impressionnism",
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
  "Ukraine",
  "United Kingdom",
  "United States of America",
  "Vietnam",
];

export const NB_LOADING_ARTS = 5;
export const NB_LOADING_ARTISTS = 10;

export const TALENTS: string[] = ["albert", "mimi"];

export const URL_GA = "*.google-analytics.com";
export const URL_GT = "https://www.googletagmanager.com";
export const URL_URARTS_ART = "https://www.urarts.art";
export const URL_URARTS_DEV = "https://urarts.fly.dev";
export const URL_URARTS_FR = "https://www.urarts.fr";

export const TAGS: TagConst[] = [
  { 
    name: "Abstrait", name_en: "Abstract", slug: "abstract",
    info: "L’art abstrait explore formes, couleurs et lignes sans représentation figurative, laissant place à l’émotion et à l’interprétation.",
    info_en: "Abstract art explores shapes, colors, and lines without figurative representation, leaving room for emotion and interpretation."
  },
  { 
    name: "Allégorie", name_en: "Allegory", slug: "allegory",
    info: "L’allégorie utilise des figures et des symboles pour représenter des idées abstraites, morales ou philosophiques.",
    info_en: "Allegory uses figures and symbols to represent abstract, moral, or philosophical ideas."
  },
  { 
    name: "Allemagne", name_en: "Germany", slug: "germany",
    info: "L’Allemagne a inspiré des œuvres marquées par le Romantisme, l’Expressionnisme et la modernité artistique.",
    info_en: "Germany has inspired works marked by Romanticism, Expressionism, and modern artistic movements."
  },
  { 
    name: "Amour", name_en: "Love", slug: "love",
    info: "L’amour est un thème universel de l’art, exprimé par la tendresse, la passion ou la tragédie.",
    info_en: "Love is a universal theme in art, expressed through tenderness, passion, or tragedy."
  },
  { 
    name: "Animaux", name_en: "Animals", slug: "animals",
    info: "Les animaux, symboliques ou réalistes, incarnent la force, la nature ou la fidélité dans l’art.",
    info_en: "Animals, whether symbolic or realistic, embody strength, nature, or loyalty in art."
  },
  { 
    name: "Architecture", name_en: "Architecture", slug: "architecture",
    info: "L’architecture est représentée dans l’art comme décor, motif ou sujet, témoignant du génie humain.",
    info_en: "Architecture is depicted in art as setting, motif, or subject, showcasing human ingenuity."
  },
  { 
    name: "Arménie", name_en: "Armenia", slug: "armenia",
    info: "L’Arménie offre un héritage artistique mêlant influences chrétiennes, miniatures et paysages symboliques.",
    info_en: "Armenia offers an artistic heritage blending Christian influences, miniatures, and symbolic landscapes."
  },
  { 
    name: "Art asiatique", name_en: "Asian Art", slug: "asian-art",
    info: "L’art asiatique englobe des traditions variées, allant de la calligraphie et la peinture à l’architecture et la sculpture.",
    info_en: "Asian art encompasses diverse traditions, ranging from calligraphy and painting to architecture and sculpture."
  },
  { 
    name: "Autoportrait", name_en: "Self-portrait", slug: "self-portrait",
    info: "L’autoportrait est une introspection de l’artiste, révélant son image, son rôle ou son état intérieur.",
    info_en: "The self-portrait is an introspection of the artist, revealing their image, role, or inner state."
  },
  { 
    name: "Autriche", name_en: "Austria", slug: "austria",
    info: "L’Autriche a marqué l’art par le baroque, le romantisme et la Sécession viennoise avec Klimt et Schiele.",
    info_en: "Austria shaped art through Baroque, Romanticism, and the Viennese Secession with Klimt and Schiele."
  },
  { 
    name: "Belgique", name_en: "Belgium", slug: "belgium",
    info: "La Belgique est associée aux primitifs flamands, au symbolisme et au surréalisme de Magritte.",
    info_en: "Belgium is associated with Flemish Primitives, Symbolism, and Magritte’s Surrealism."
  },
  { 
    name: "Biélorussie", name_en: "Belarus", slug: "belarus",
    info: "La Biélorussie porte une tradition picturale imprégnée de folklore et de réalismes socialistes.",
    info_en: "Belarus carries a pictorial tradition influenced by folklore and socialist realism."
  },
  { 
    name: "Brou de noix", name_en: "Walnut Ink", slug: "walnut-ink",
    info: "Le brou de noix, obtenu à partir de coques de noix, est utilisé comme encre ou teinte naturelle dans l’art.",
    info_en: "Walnut ink, made from walnut husks, is used as a natural dye or ink in art."
  },
  { 
    name: "Canada", name_en: "Canada", slug: "canada",
    info: "Le Canada a inspiré des paysages grandioses et l’art autochtone au riche symbolisme.",
    info_en: "Canada inspired grand landscapes and Indigenous art with rich symbolism."
  },
  { 
    name: "Chine", name_en: "People's Republic of China", slug: "china",
    info: "La Chine possède une tradition artistique millénaire faite de calligraphie, peinture et symboles philosophiques.",
    info_en: "China has a millennia-old artistic tradition of calligraphy, painting, and philosophical symbols."
  },
  { 
    name: "Colombie", name_en: "Colombia", slug: "colombia",
    info: "La Colombie mêle héritage précolombien, couleurs vives et figures contemporaines comme Botero.",
    info_en: "Colombia blends pre-Columbian heritage, vivid colors, and contemporary figures like Botero."
  },
  { 
    name: "Croatie", name_en: "Croatia", slug: "croatia",
    info: "La Croatie offre un art imprégné d’influences méditerranéennes et slaves.",
    info_en: "Croatia offers art steeped in Mediterranean and Slavic influences."
  },
  { 
    name: "Danemark", name_en: "Denmark", slug: "denmark",
    info: "Le Danemark a enrichi l’art avec le romantisme, le design et la peinture scandinave.",
    info_en: "Denmark enriched art with Romanticism, design, and Scandinavian painting."
  },
  { 
    name: "Danse", name_en: "Dance", slug: "dance",
    info: "La danse est représentée en art comme mouvement gracieux, rythme et expression corporelle.",
    info_en: "Dance is represented in art as graceful movement, rhythm, and bodily expression."
  },
  { 
    name: "Dessin", name_en: "Drawing", slug: "drawing",
    info: "Le dessin est la base de la création artistique, servant d’étude, de croquis ou d’œuvre achevée.",
    info_en: "Drawing is the foundation of artistic creation, serving as study, sketch, or finished work."
  },
  { 
    name: "Égypte", name_en: "Egypt", slug: "egypt",
    info: "L’art égyptien antique privilégie la symbolique, l’éternité et la représentation codifiée des dieux et pharaons.",
    info_en: "Ancient Egyptian art emphasizes symbolism, eternity, and codified depictions of gods and pharaohs."
  },
  { 
    name: "Espagne", name_en: "Spain", slug: "spain",
    info: "L’Espagne a marqué l’art avec Vélasquez, Goya, Picasso et le surréalisme de Dalí.",
    info_en: "Spain influenced art with Velázquez, Goya, Picasso, and Dalí’s Surrealism."
  },
  { 
    name: "États-Unis d'Amérique", name_en: "United States of America", slug: "usa",
    info: "L’art américain reflète le réalisme, l’expressionnisme abstrait et le pop art.",
    info_en: "American art reflects Realism, Abstract Expressionism, and Pop Art."
  },
  { 
    name: "Fantastique", name_en: "Fantasy", slug: "fantasy",
    info: "Le fantastique représente créatures et univers imaginaires nourris de mythes et de rêves.",
    info_en: "Fantasy depicts creatures and imaginary worlds inspired by myths and dreams."
  },
  { 
    name: "Feu", name_en: "Fire", slug: "fire",
    info: "Le feu symbolise la passion, la destruction ou la lumière dans les représentations artistiques.",
    info_en: "Fire symbolizes passion, destruction, or light in artistic representations."
  },
  { 
    name: "Fleurs", name_en: "Flowers", slug: "flowers",
    info: "Les fleurs expriment la beauté, la fragilité ou la symbolique des saisons.",
    info_en: "Flowers express beauty, fragility, or the symbolism of seasons."
  },
  { 
    name: "Finlande", name_en: "Finland", slug: "finland",
    info: "La Finlande a produit un art marqué par la nature nordique et le symbolisme.",
    info_en: "Finland produced art marked by Nordic nature and Symbolism."
  },
  { 
    name: "France", name_en: "France", slug: "france",
    info: "La France est un centre majeur de l’histoire de l’art, de l’impressionnisme au cubisme.",
    info_en: "France is a major center of art history, from Impressionism to Cubism."
  },
  { 
    name: "Grèce", name_en: "Greece", slug: "greece",
    info: "L’art grec antique a posé les bases de la sculpture et de l’harmonie classique.",
    info_en: "Ancient Greek art laid the foundations of sculpture and classical harmony."
  },
  { 
    name: "Guerre", name_en: "War", slug: "war",
    info: "La guerre est représentée par la violence, l’héroïsme ou la mémoire des conflits.",
    info_en: "War is depicted through violence, heroism, or the memory of conflicts."
  },
  { 
    name: "Histoire", name_en: "History", slug: "history",
    info: "L’histoire inspire des fresques, récits et portraits d’événements marquants.",
    info_en: "History inspires frescoes, narratives, and portraits of major events."
  },
  { 
    name: "Hongrie", name_en: "Hungary", slug: "hungary",
    info: "La Hongrie exprime un art marqué par le folklore et l’avant-garde moderne.",
    info_en: "Hungary expresses art shaped by folklore and modern avant-garde."
  },
  { 
    name: "Industrie", name_en: "Industry", slug: "industry",
    info: "L’industrie est représentée dans l’art moderne comme symbole de progrès ou d’aliénation.",
    info_en: "Industry is depicted in modern art as a symbol of progress or alienation."
  },
  { 
    name: "Italie", name_en: "Italy", slug: "italy",
    info: "L’Italie est le berceau de la Renaissance et d’innovations majeures dans l’art.",
    info_en: "Italy is the cradle of the Renaissance and major artistic innovations."
  },
  { 
    name: "Japon", name_en: "Japan", slug: "japan",
    info: "Le Japon offre une tradition visuelle unique entre estampes, calligraphies et modernité.",
    info_en: "Japan offers a unique visual tradition between prints, calligraphy, and modernity."
  },
  { 
    name: "Mer", name_en: "Sea", slug: "sea",
    info: "La mer inspire les artistes comme force naturelle, espace mythique ou décor poétique.",
    info_en: "The sea inspires artists as natural force, mythical space, or poetic setting."
  },
  { 
    name: "Mexique", name_en: "Mexico", slug: "mexico",
    info: "Le Mexique mêle héritage préhispanique et muralisme moderne avec Rivera et Kahlo.",
    info_en: "Mexico blends pre-Hispanic heritage and modern muralism with Rivera and Kahlo."
  },
  { 
    name: "Monde", name_en: "World", slug: "world",
    info: "Le monde comme sujet artistique illustre la diversité des cultures et paysages.",
    info_en: "The world as an artistic subject illustrates the diversity of cultures and landscapes."
  },
  { 
    name: "Montagnes", name_en: "Mountains", slug: "mountains",
    info: "Les montagnes incarnent la grandeur, la spiritualité et la nature sublime.",
    info_en: "Mountains embody grandeur, spirituality, and the sublime in nature."
  },
  { 
    name: "Mort", name_en: "Death", slug: "death",
    info: "La mort est un thème universel, représentée par vanités, symboles et allégories.",
    info_en: "Death is a universal theme, represented by vanitas, symbols, and allegories."
  },
  { 
    name: "Musique", name_en: "Music", slug: "music",
    info: "La musique en art évoque l’harmonie, le rythme ou la représentation des musiciens.",
    info_en: "Music in art evokes harmony, rhythm, or depictions of musicians."
  },
  { 
    name: "Mythologie", name_en: "Mythology", slug: "mythology",
    info: "La mythologie fournit des récits symboliques et des personnages intemporels.",
    info_en: "Mythology provides symbolic narratives and timeless characters."
  },
  { 
    name: "Nature", name_en: "Nature", slug: "nature",
    info: "La nature est représentée comme source d’inspiration, décor ou symbole vital.",
    info_en: "Nature is depicted as inspiration, setting, or vital symbol."
  },
  { 
    name: "Nature morte", name_en: "Still Life", slug: "still-life",
    info: "La nature morte met en scène objets et aliments, explorant beauté et fragilité.",
    info_en: "Still life depicts objects and food, exploring beauty and fragility."
  },
  { 
    name: "Norvège", name_en: "Norway", slug: "norway",
    info: "La Norvège reflète dans l’art ses paysages nordiques et son symbolisme mystique.",
    info_en: "Norway reflects in art its Nordic landscapes and mystical symbolism."
  },
  { 
    name: "Nu", name_en: "Nude", slug: "nude",
    info: "Le nu représente le corps humain idéalisé ou naturaliste, thème central de l’art.",
    info_en: "The nude represents the human body, idealized or naturalistic, a central theme in art."
  },
  { 
    name: "Pays-Bas", name_en: "Netherlands", slug: "netherlands",
    info: "Les Pays-Bas brillent par l’âge d’or de la peinture flamande et hollandaise.",
    info_en: "The Netherlands shine through the Golden Age of Flemish and Dutch painting."
  },
  { 
    name: "Paysage", name_en: "Landscape", slug: "landscape",
    info: "Le paysage est un sujet majeur, reflétant la nature, la lumière et l’émotion.",
    info_en: "Landscape is a major subject, reflecting nature, light, and emotion."
  },
  { 
    name: "Pologne", name_en: "Poland", slug: "poland",
    info: "La Pologne a produit un art riche en traditions nationales et en modernité.",
    info_en: "Poland produced art rich in national traditions and modernity."
  },
  { 
    name: "Portrait", name_en: "Portrait", slug: "portrait",
    info: "Le portrait cherche à saisir l’apparence et la personnalité d’un individu.",
    info_en: "Portrait seeks to capture an individual’s appearance and personality."
  },
  { 
    name: "Portugal", name_en: "Portugal", slug: "portugal",
    info: "Le Portugal exprime son art entre azulejos, baroque et modernité.",
    info_en: "Portugal expresses its art through azulejos, Baroque, and modernity."
  },
  { 
    name: "Religion", name_en: "Religion", slug: "religion",
    info: "La religion a inspiré fresques, icônes et symboles spirituels à travers les siècles.",
    info_en: "Religion inspired frescoes, icons, and spiritual symbols throughout the centuries."
  },
  { 
    name: "Rêve", name_en: "Dream", slug: "dream",
    info: "Le rêve nourrit l’imaginaire artistique entre visions oniriques et surréalistes.",
    info_en: "Dreams fuel artistic imagination between oneiric and surreal visions."
  },
  { 
    name: "Russie", name_en: "Russian Federation", slug: "russia",
    info: "La Russie est marquée par l’icône orthodoxe, l’avant-garde et le réalisme.",
    info_en: "Russia is marked by Orthodox icons, the avant-garde, and realism."
  },
  { 
    name: "Royaume-Uni", name_en: "United Kingdom", slug: "uk",
    info: "Le Royaume-Uni a donné Turner, les préraphaélites et l’art contemporain.",
    info_en: "The United Kingdom produced Turner, the Pre-Raphaelites, and contemporary art."
  },
  { 
    name: "Slovénie", name_en: "Slovenia", slug: "slovenia",
    info: "La Slovénie reflète une identité artistique entre traditions slaves et modernité.",
    info_en: "Slovenia reflects an artistic identity between Slavic traditions and modernity."
  },
  { 
    name: "Suède", name_en: "Sweden", slug: "sweden",
    info: "La Suède a enrichi l’art de son symbolisme et de ses paysages nordiques.",
    info_en: "Sweden enriched art with its symbolism and Nordic landscapes."
  },
  { 
    name: "Suisse", name_en: "Switzerland", slug: "switzerland",
    info: "La Suisse est associée au paysage alpin et à l’art moderne.",
    info_en: "Switzerland is associated with Alpine landscapes and modern art."
  },
  { 
    name: "Tchécoslovaquie", name_en: "Czechoslovakia", slug: "czechoslovakia",
    info: "La Tchécoslovaquie a développé un art entre cubisme, surréalisme et tradition populaire.",
    info_en: "Czechoslovakia developed art between Cubism, Surrealism, and folk tradition."
  },
  { 
    name: "Temps", name_en: "Weather", slug: "weather",
    info: "Le temps est représenté comme cycle, instant fugitif ou élément dramatique.",
    info_en: "Weather is depicted as cycle, fleeting moment, or dramatic element."
  },
  { 
    name: "Transport", name_en: "Transport", slug: "transport",
    info: "Le transport est un motif moderne, symbole de mouvement et de progrès.",
    info_en: "Transport is a modern motif, symbol of movement and progress."
  },
  { 
    name: "Trompe-l'œil", name_en: "Trompe-l'oeil", slug: "trompe-l-oeil",
    info: "Le trompe-l’œil joue sur l’illusion visuelle pour troubler le spectateur.",
    info_en: "Trompe-l’œil plays on visual illusion to trick the viewer."
  },
  { 
    name: "Ukraine", name_en: "Ukraine", slug: "ukraine",
    info: "L’Ukraine exprime un art influencé par les icônes, le folklore et l’avant-garde.",
    info_en: "Ukraine expresses art influenced by icons, folklore, and the avant-garde."
  },
  { 
    name: "Vietnam", name_en: "Vietnam", slug: "vietnam",
    info: "Le Vietnam mêle traditions picturales asiatiques et art moderne engagé.",
    info_en: "Vietnam blends Asian pictorial traditions and engaged modern art."
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
  abstractart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/abstractart.png)`,
    backgroundSize: "570px",
  },
  academicart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/academicart.png)`,
    backgroundSize: "710px",
  },
  americanrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/americanrealism.png)`,
    backgroundSize: "750px",
  },
  analyticalrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/analyticalrealism.png)`,
    backgroundSize: "840px",
  },
  artdeco: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/artdeco.png)`,
    backgroundSize: "900px",
  },
  artnouveau: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/artnouveau.png)`,
    backgroundSize: "360px",
  },
  baroque: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/baroque.png)`,
    backgroundSize: "600px",
  },
  classicism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/classicism.png)`,
    backgroundSize: "610px",
  },
  cloisonnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/cloisonnism.png)`,
    backgroundSize: "620px",
  },
  conceptualart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/conceptualart.png)`,
    backgroundSize: "400px",
  },
  cubism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/cubism.png)`,
    backgroundSize: "400px",
  },
  dadaism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/dadaism.png)`,
    backgroundSize: "450px",
  },
  earlyrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/earlyrenaissance.png)`,
    backgroundSize: "720px",
  },
  expressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/expressionnism.png)`,
    backgroundSize: "610px",
  },
  fauvism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/fauvism.png)`,
    backgroundSize: "480px",
  },
  futurism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/futurism.png)`,
    backgroundSize: "570px",
  },
  highrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/highrenaissance.png)`,
    backgroundSize: "750px",
  },
  impressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/impressionnism.png)`,
    backgroundSize: "600px",
  },
  intimism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/intimism.png)`,
    backgroundSize: "610px",
  },
  italianrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/italianrenaissance.png)`,
    backgroundSize: "780px",
  },
  japonism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/japonism.png)`,
    backgroundSize: "850px",
  },
  kitsch: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/kitsch.png)`,
    backgroundSize: "470px",
  },
  magicalrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/magicalrealism.png)`,
    backgroundSize: "560px",
  },
  mannerism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/mannerism.png)`,
    backgroundSize: "290px",
  },
  naiveart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/naiveart.png)`,
    backgroundSize: "470px",
  },
  neoclassicism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/neoclassicism.png)`,
    backgroundSize: "770px",
  },
  neoimpressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/neoimpressionnism.png)`,
    backgroundSize: "570px",
  },
  neoplasticism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/neoplasticism.png)`,
    backgroundSize: "1000px",
  },
  northernrenaissance: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/northernrenaissance.png)`,
    backgroundSize: "880px",
  },
  orientalism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/orientalism.png)`,
    backgroundSize: "560px",
  },
  orphism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/orphism.png)`,
    backgroundSize: "580px",
  },
  postimpressionnism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/postimpressionnism.png)`,
    backgroundSize: "540px",
  },
  preraphaelitism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/preraphaelitism.png)`,
    backgroundSize: "580px",
  },
  qingdynasty: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/qingdynasty.png)`,
    backgroundSize: "500px",
  },
  realism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/realism.png)`,
    backgroundSize: "900px",
  },
  regionalism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/regionalism.png)`,
    backgroundSize: "720px",
  },
  rococo: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/rococo.png)`,
    backgroundSize: "840px",
  },
  romanticism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/romanticism.png)`,
    backgroundSize: "460px",
  },
  streetart: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/streetart.png)`,
    backgroundSize: "650px",
  },
  suprematism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/suprematism.png)`,
    backgroundSize: "700px",
  },
  surrealism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/surrealism.png)`,
    backgroundSize: "420px",
  },
  symbolism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/symbolism.png)`,
    backgroundSize: "240px",
  },
  synthetism: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/synthetism.png)`,
    backgroundSize: "550px",
  },
  ukiyoe: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/ukiyoe.png)`,
    backgroundSize: "420px",
  },
  unclassified: {
    background: `${colorScheme[currentColorScheme].gray} url(../textures/default.png)`,
    backgroundSize: "480px",
  },
};
