import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      ...colorScheme[currentColorScheme],
    },
    extend: {
      fontFamily: {
        brush: ["Caveat Brush", "cursive"],
        japanese: "Kashima Brush",
        street: "Five Boroughs Handwriting",
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    screens: {
      xs: "300px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  darkMode: "class",
  mode: "silent",
  preflight: {
    "@import":
      `url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap')`,
    "@font-face": [
      {
        fontFamily: "Five Boroughs Handwriting",
        src: 'url(/fonts/FiveBoroughsHandwriting.otf) format("opentype")',
      },
      {
        fontFamily: "Kashima Brush",
        src: 'url(/fonts/Kashima.otf) format("opentype")',
      },
    ],
  },
} as Options;
