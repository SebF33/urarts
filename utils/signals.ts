import { signal } from "@preact/signals";

import i18next from "i18next";
import "@utils/i18n/config.ts";

export const languageSignal = signal<string>(i18next.language);
export const nationalitySignal = signal<string>("France");
export const yearsSignal = signal<number[]>([]);
