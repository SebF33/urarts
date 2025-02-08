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
  "China",
  "Chine",
  "Colombia",
  "Colombie",
  "Czechoslovakia",
  "Danemark",
  "Denmark",
  "Espagne",
  "États-Unis",
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
  "Poland",
  "Pologne",
  "Portugal",
  "Royaume-Uni",
  "Russia",
  "Russie",
  "Spain",
  "Suède",
  "Suisse",
  "Sweden",
  "Switzerland",
  "Tchécoslovaquie",
  "Ukraine",
  "United Kingdom",
  "United States",
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

export const ART_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
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
    background: `${colorScheme[currentColorScheme].white} url(../textures/abstractart.png)`,
    backgroundSize: "570px",
  },
  academicart: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/academicart.png)`,
    backgroundSize: "710px",
  },
  americanrealism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/americanrealism.png)`,
    backgroundSize: "750px",
  },
  analyticalrealism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/analyticalrealism.png)`,
    backgroundSize: "840px",
  },
  artdeco: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/artdeco.png)`,
    backgroundSize: "900px",
  },
  artnouveau: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/artnouveau.png)`,
    backgroundSize: "360px",
  },
  baroque: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/baroque.png)`,
    backgroundSize: "600px",
  },
  classicism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/classicism.png)`,
    backgroundSize: "610px",
  },
  cloisonnism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/cloisonnism.png)`,
    backgroundSize: "620px",
  },
  conceptualart: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/conceptualart.png)`,
    backgroundSize: "400px",
  },
  cubism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/cubism.png)`,
    backgroundSize: "400px",
  },
  dadaism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/dadaism.png)`,
    backgroundSize: "450px",
  },
  earlyrenaissance: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/earlyrenaissance.png)`,
    backgroundSize: "720px",
  },
  expressionnism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/expressionnism.png)`,
    backgroundSize: "610px",
  },
  fauvism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/fauvism.png)`,
    backgroundSize: "480px",
  },
  futurism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/futurism.png)`,
    backgroundSize: "570px",
  },
  highrenaissance: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/highrenaissance.png)`,
    backgroundSize: "750px",
  },
  impressionnism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/impressionnism.png)`,
    backgroundSize: "600px",
  },
  intimism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/intimism.png)`,
    backgroundSize: "610px",
  },
  italianrenaissance: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/italianrenaissance.png)`,
    backgroundSize: "780px",
  },
  japonism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/japonism.png)`,
    backgroundSize: "850px",
  },
  kitsch: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/kitsch.png)`,
    backgroundSize: "470px",
  },
  magicalrealism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/magicalrealism.png)`,
    backgroundSize: "560px",
  },
  mannerism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/mannerism.png)`,
    backgroundSize: "290px",
  },
  naiveart: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/naiveart.png)`,
    backgroundSize: "470px",
  },
  neoclassicism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/neoclassicism.png)`,
    backgroundSize: "770px",
  },
  neoimpressionnism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/neoimpressionnism.png)`,
    backgroundSize: "570px",
  },
  neoplasticism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/neoplasticism.png)`,
    backgroundSize: "1000px",
  },
  northernrenaissance: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/northernrenaissance.png)`,
    backgroundSize: "880px",
  },
  orientalism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/orientalism.png)`,
    backgroundSize: "560px",
  },
  orphism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/orphism.png)`,
    backgroundSize: "580px",
  },
  postimpressionnism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/postimpressionnism.png)`,
    backgroundSize: "540px",
  },
  preraphaelitism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/preraphaelitism.png)`,
    backgroundSize: "580px",
  },
  qingdynasty: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/qingdynasty.png)`,
    backgroundSize: "500px",
  },
  realism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/realism.png)`,
    backgroundSize: "900px",
  },
  regionalism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/regionalism.png)`,
    backgroundSize: "720px",
  },
  rococo: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/rococo.png)`,
    backgroundSize: "840px",
  },
  romanticism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/romanticism.png)`,
    backgroundSize: "460px",
  },
  streetart: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/streetart.png)`,
    backgroundSize: "650px",
  },
  suprematism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/suprematism.png)`,
    backgroundSize: "700px",
  },
  surrealism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/surrealism.png)`,
    backgroundSize: "420px",
  },
  symbolism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/symbolism.png)`,
    backgroundSize: "240px",
  },
  synthetism: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/synthetism.png)`,
    backgroundSize: "550px",
  },
  ukiyoe: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/ukiyoe.png)`,
    backgroundSize: "420px",
  },
  unclassified: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/default.png)`,
    backgroundSize: "480px",
  },
};
