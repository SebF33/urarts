import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEnglish from "./en/translation.ts";
import translationFrench from "./fr/translation.ts";

export const defaultNS = "en";

const options = {
  order: ["navigator", "querystring", "cookie", "localStorage", "htmlTag"],
};

export const resources = {
  en: {
    translation: translationEnglish,
  },
  fr: {
    translation: translationFrench,
  },
};

i18next.use(LanguageDetector).init({
  //debug: true,
  defaultNS,
  detection: options,
  resources,
  supportedLngs: ["en", "fr"],
});
