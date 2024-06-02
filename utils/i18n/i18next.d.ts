import { defaultNS, resources } from "./config.ts";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources.en;
  }
}

export type Language = "en" | "fr";