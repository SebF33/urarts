import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEnglish from "./en/translation.ts";
import translationFrench from "./fr/translation.ts";

export const defaultNS = "translation";

const options = {
  // ordre à partir duquel la langue de l'utilisateur doit être détectée
  order: [
    "localStorage", // stocke les préférences des utilisateurs et peut être utilisé pour des données plus persistantes
    "cookie", // cookies utilisés pour se souvenir des préférences des utilisateurs au fil des sessions
    "querystring", // permet de définir explicitement la langue via un paramètre URL (?lng=fr)
    "sessionStorage", // stocke les données pour la durée de la session de la page
    "navigator", // vérifie les paramètres de langue du navigateur (langue préférée de l'utilisateur pour la navigation)
    "htmlTag", // examine l'attribut "lang" de la balise "html"
    "path", // extrait la langue du chemin URL (/fr/page)
    "subdomain", // extrait la langue du sous-domaine (fr.example.com)
  ],

  // clés ou paramètres à partir desquels rechercher la langue
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // mettre en cache la langue de l'utilisateur
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // langues à ne pas persister (cookie, localStorage)

  // expiration et domaine pour le cookie défini
  cookieMinutes: 10,
  cookieDomain: "urarts.art",
};

export const resources = {
  en: { translation: translationEnglish },
  fr: { translation: translationFrench },
};

i18next
  .use(LanguageDetector)
  .init({
    //debug: true,
    defaultNS,
    detection: options,
    fallbackLng: "en",
    ns: ["translation"],
    resources,
    supportedLngs: ["en", "fr"],
  });
