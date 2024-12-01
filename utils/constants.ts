import { Any } from "any";

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
