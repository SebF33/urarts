import { Any } from "any";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

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
export const DELAY_MODAL_CLOSE = 500;
export const DELAY_MODAL_TRIGGER = 80;
export const DELAY_REACH_ART = 1150;
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

type Tag = {
  name: string;
  name_en: string;
  slug: string;
};
export const TAGS: Tag[] = [
  { name: "Abstrait", name_en: "Abstract", slug: "abstract" },
  { name: "Allégorie", name_en: "Allegory", slug: "allegory" },
  { name: "Allemagne", name_en: "Germany", slug: "germany" },
  { name: "Amour", name_en: "Love", slug: "love" },
  { name: "Animaux", name_en: "Animals", slug: "animals" },
  { name: "Architecture", name_en: "Architecture", slug: "architecture" },
  { name: "Arménie", name_en: "Armenia", slug: "armenia" },
  { name: "Autoportrait", name_en: "Self-portrait", slug: "self-portrait" },
  { name: "Autriche", name_en: "Austria", slug: "austria" },
  { name: "Belgique", name_en: "Belgium", slug: "belgium" },
  { name: "Biélorussie", name_en: "Belarus", slug: "belarus" },
  { name: "Canada", name_en: "Canada", slug: "canada" },
  { name: "Chine", name_en: "People's Republic of China", slug: "china" },
  { name: "Colombie", name_en: "Colombia", slug: "colombia" },
  { name: "Croatie", name_en: "Croatia", slug: "croatia" },
  { name: "Danemark", name_en: "Denmark", slug: "denmark" },
  { name: "Danse", name_en: "Dance", slug: "dance" },
  { name: "Égypte", name_en: "Egypt", slug: "egypt" },
  { name: "Espagne", name_en: "Spain", slug: "spain" },
  { name: "États-Unis d'Amérique", name_en: "United States of America", slug: "usa" },
  { name: "Fantastique", name_en: "Fantasy", slug: "fantasy" },
  { name: "Feu", name_en: "Fire", slug: "fire" },
  { name: "Fleurs", name_en: "Flowers", slug: "flowers" },
  { name: "Finlande", name_en: "Finland", slug: "finland" },
  { name: "France", name_en: "France", slug: "france" },
  { name: "Grèce", name_en: "Greece", slug: "greece" },
  { name: "Guerre", name_en: "War", slug: "war" },
  { name: "Histoire", name_en: "History", slug: "history" },
  { name: "Hongrie", name_en: "Hungary", slug: "hungary" },
  { name: "Industrie", name_en: "Industry", slug: "industry" },
  { name: "Italie", name_en: "Italy", slug: "italy" },
  { name: "Japon", name_en: "Japan", slug: "japan" },
  { name: "Mer", name_en: "Sea", slug: "sea" },
  { name: "Mexique", name_en: "Mexico", slug: "mexico" },
  { name: "Monde", name_en: "World", slug: "world" },
  { name: "Montagnes", name_en: "Mountains", slug: "mountains" },
  { name: "Mort", name_en: "Death", slug: "death" },
  { name: "Musique", name_en: "Music", slug: "music" },
  { name: "Mythologie", name_en: "Mythology", slug: "mythology" },
  { name: "Nature", name_en: "Nature", slug: "nature" },
  { name: "Nature morte", name_en: "Still Life", slug: "still-life" },
  { name: "Norvège", name_en: "Norway", slug: "norway" },
  { name: "Nu", name_en: "Nude", slug: "nude" },
  { name: "Pays-Bas", name_en: "Netherlands", slug: "netherlands" },
  { name: "Paysage", name_en: "Landscape", slug: "landscape" },
  { name: "Pologne", name_en: "Poland", slug: "poland" },
  { name: "Portrait", name_en: "Portrait", slug: "portrait" },
  { name: "Portugal", name_en: "Portugal", slug: "portugal" },
  { name: "Religion", name_en: "Religion", slug: "religion" },
  { name: "Rêve", name_en: "Dream", slug: "dream" },
  { name: "Russie", name_en: "Russian Federation", slug: "russia" },
  { name: "Royaume-Uni", name_en: "United Kingdom", slug: "uk" },
  { name: "Slovénie", name_en: "Slovenia", slug: "slovenia" },
  { name: "Suède", name_en: "Sweden", slug: "sweden" },
  { name: "Suisse", name_en: "Switzerland", slug: "switzerland" },
  { name: "Tchécoslovaquie", name_en: "Czechoslovakia", slug: "czechoslovakia" },
  { name: "Temps", name_en: "Weather", slug: "weather" },
  { name: "Transport", name_en: "Transport", slug: "transport" },
  { name: "Trompe-l'œil", name_en: "Trompe-l'oeil", slug: "trompe-l-oeil" },
  { name: "Ukraine", name_en: "Ukraine", slug: "ukraine" },
  { name: "Vietnam", name_en: "Vietnam", slug: "vietnam" },
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
