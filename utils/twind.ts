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
      },
    },
  },
  darkMode: "class",
  mode: "silent",
  preflight: {
    "@import": [
      `url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap')`,
    ],
  },
};
if (IS_BROWSER) setup(config);
