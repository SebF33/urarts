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
        }
      }) as Preset<unknown>,
    ],
  }),
  selfURL: import.meta.url,
} as Options;
