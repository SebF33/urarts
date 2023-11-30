// Fichier de config Twind v1
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { defineConfig, Preset } from "@twind/core";
import { Options } from "$fresh/plugins/twindv1.ts";
import presetAutoprefix from "twind-preset-autoprefix"; //provides a CSS vendor prefixer and property alias mapper
import presetTailWind from "twind-preset-tailwind/base"; //adds all Tailwind v3 classes

export default {
  ...defineConfig({
    presets: [
      presetAutoprefix(),
      presetTailWind({
        colors: {
          ...colorScheme[currentColorScheme],
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
          "6xl": "3.75rem",
          "7xl": "4.5rem",
          "8xl": "6rem",
          "9xl": "8rem",
        },
      }) as Preset<any>,
    ],
  }),
  selfURL: import.meta.url,
} as Options;
