import { signal } from "@preact/signals";

import i18next from "i18next";
import "@utils/i18n/config.ts";

export const artistsYearsSignal = signal<number[]>([]);
export const artModalOpenSignal = signal<boolean>(false);
export const histocharactersYearsSignal = signal<number[]>([]);
export const isClickableSignal = signal<boolean>(true);
export const languageSignal = signal<string>(i18next.language);
export const nationalitySignal = signal<string>("France");

// Pour établir le contexte d'un contenu qui concerne un(e) seul(e) artiste
export const isForAloneArtistSignal = signal<boolean>(false);
export const artistAvatarSignal = signal<string>("");
export const artistNameSignal = signal<string>("");
export const artistSlugSignal = signal<string>("");

// Pour établir le contexte d'un contenu qui concerne une seule œuvre
export const isForAloneArtworkSignal = signal<boolean>(false);