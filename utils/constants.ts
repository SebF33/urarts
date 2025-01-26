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
export const URL_GA = "https://www.google-analytics.com";
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
  artabstrait: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/artabstrait.png)`,
    backgroundSize: "570px",
  },
  artdeco: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/artdeco.png)`,
    backgroundSize: "900px",
  },
  artnaif: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/artnaif.png)`,
    backgroundSize: "470px",
  },
  baroque: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/baroque.png)`,
    backgroundSize: "600px",
  },
  classicisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/classicisme.png)`,
    backgroundSize: "610px",
  },
  cubisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/cubisme.png)`,
    backgroundSize: "400px",
  },
  dadaisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/dadaisme.png)`,
    backgroundSize: "450px",
  },
  dynastieqing: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/dynastieqing.png)`,
    backgroundSize: "500px",
  },
  fauvisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/fauvisme.png)`,
    backgroundSize: "480px",
  },
  hauterenaissance: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/hauterenaissance.png)`,
    backgroundSize: "750px",
  },
  impressionnisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/impressionnisme.png)`,
    backgroundSize: "600px",
  },
  japonisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/japonisme.png)`,
    backgroundSize: "850px",
  },
  kitsch: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/kitsch.png)`,
    backgroundSize: "470px",
  },
  manierisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/manierisme.png)`,
    backgroundSize: "290px",
  },
  nonclasse: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/nonclasse.png)`,
    backgroundSize: "440px",
  },
  orientalisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/orientalisme.png)`,
    backgroundSize: "560px",
  },
  preraphaelisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/preraphaelisme.png)`,
    backgroundSize: "580px",
  },
  rococo: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/rococo.png)`,
    backgroundSize: "840px",
  },
  romantisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/romantisme.png)`,
    backgroundSize: "460px",
  },
  streetart: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/streetart.png)`,
    backgroundSize: "650px",
  },
  surrealisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/surrealisme.png)`,
    backgroundSize: "420px",
  },
  symbolisme: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/symbolisme.png)`,
    backgroundSize: "240px",
  },
  ukiyoe: {
    background: `${colorScheme[currentColorScheme].white} url(../textures/ukiyoe.png)`,
    backgroundSize: "420px",
  },
};
