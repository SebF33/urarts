import { colorScheme, currentColorScheme } from "@utils/colors.ts";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./routes/**/*.{ts,tsx}",
    "./islands/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colorScheme[currentColorScheme],
      },
    },
  },
} satisfies Config;
