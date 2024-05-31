import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEnglish from "./en/translation.ts";
import translationFrench from "./fr/translation.ts";

export const defaultNS = "en";

const options = {
  // order and from where user language should be detected
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "sessionStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain",
  ],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expiry and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "urarts.art",
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
