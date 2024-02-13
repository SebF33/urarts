import { Any } from "any";

export const DELAY_API_CALL = 150;
export const DELAY_DISPLAY = 20;
export const DELAY_LEONARDO_CALL = 250;
export const DELAY_LEONARDO_REACH_ART = 10;
export const DELAY_REACH_ART = 1150;
export const DELAY_REACH_HREF = 200;
export const DELAY_TOOLTIP_TRIGGER = 200;
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