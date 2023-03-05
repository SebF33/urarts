import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export * from "twind";
export { css } from "twind/css";

export const config: Configuration = {
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
};
if (IS_BROWSER) setup(config);
