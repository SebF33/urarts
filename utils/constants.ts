import { Any } from "any";

// Constantes globales
export const DELAY_API_CALL = 150;
export const DELAY_DEBOUNCE = 300;
export const DELAY_DISPLAY = 20;
export const DELAY_DISPLAY_FOOTER = 200;
export const DELAY_DISPLAY_WATERDROP = 150;
export const DELAY_LEONARDO_CALL = 250;
export const DELAY_LEONARDO_REACH_ART = 10;
export const DELAY_REACH_ART = 1150;
export const DELAY_REACH_HREF = 200;
export const DELAY_TOOLTIP_TRIGGER = 200;
export const NB_LOADING_ARTS = 5;
export const NB_LOADING_ARTISTS = 10;
export const TALENTS = ["albert","mimi"];

export const ART_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}

export const ARTIST_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    margin: 'auto',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const FAMOUS_ART_IMG_WRAPPER: Record<string, Any> = {
  wrap: {
    position: 'relative',
    width: '100%',
    margin: 'auto',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}