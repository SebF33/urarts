import { Cookie, getCookies, setCookie } from "cookie";
import { DEFAULT_LNG } from "@utils/constants.ts";
import { define } from "@/utils.ts";
import i18next from "i18next";


export const handler = define.middleware(async (ctx) => {
  const req = ctx.req;
  const url = ctx.url;

  const cookies = getCookies(req.headers);
  const domain = url.hostname;

  let lng: string | null = cookies.i18next;
  //let lng: string | null = url.searchParams.get("lng") || cookies.i18next;

  // aucune langue n'est spécifiée
  if (!lng) {
    // valeur par défaut si aucune langue n'est détectée
    lng = DEFAULT_LNG;
    // récupérer la première langue préférée du navigateur
    const acceptLanguage = req.headers.get("accept-language");
    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim())
        .map((lang) => lang.split("-")[0]);
      const browserLang = languages.length > 0 ? languages[0] : null;

      if (browserLang && ["en", "fr"].includes(browserLang)) {
        lng = browserLang;
      }
    }
  }

  // définir la langue dans i18next
  await i18next.changeLanguage(lng);

  /*
  // mettre à jour l'URL avec la langue si elle n'est pas présente ou incorrecte
  if (url.searchParams.get("lng") !== lng) {
    url.searchParams.set("lng", lng);
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.toString(),
      },
    });
  }
  */

  const response = await ctx.next();

  // en-têtes de sécurité
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload;");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // mettre à jour le cookie
  const cookie: Cookie = {
    name: "i18next",
    value: lng,
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    domain: domain,
    path: "/",
    secure: true,
    httpOnly: true,
  };
  setCookie(headers, cookie);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
