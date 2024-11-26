import { Cookie, getCookies, setCookie } from "cookie";
import {
  DEFAULT_LNG,
  URL_GA,
  URL_GT,
  URL_URARTS_1,
  URL_URARTS_2,
} from "@utils/constants.ts";
import { FreshContext } from "$fresh/server.ts";
import i18next from "i18next";


export async function handler(req: Request, ctx: FreshContext) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const domain = url.hostname;
  let lng: string | null = cookies.i18next;
  //let lng: string | null = url.searchParams.get("lng") || cookies.i18next;

  if (!lng) {
    // valeur par défaut si aucune langue n'est spécifiée
    lng = DEFAULT_LNG;

    // valeur selon le domaine
    if (domain === "urarts.fr") lng = "fr";
    //if (domain === "urarts.art" || domain === "urarts.fly.dev") lng = "en";
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
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload;",
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' ${URL_GT} ${URL_GA} 'unsafe-inline' 'unsafe-eval' 'inline-speculation-rules'; object-src 'none'; base-uri 'none'; style-src 'self' 'unsafe-inline'; child-src 'self'; img-src 'self' ${URL_GA} data: blob: ${URL_URARTS_1} ${URL_URARTS_2}; media-src 'self' data: blob: ${URL_URARTS_1} ${URL_URARTS_2}; connect-src 'self' ${URL_URARTS_1} ${URL_URARTS_2} ${URL_GA} ${URL_GT}; font-src 'self'; worker-src 'self'; frame-src 'self'; frame-ancestors 'self';`,
  );

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
  setCookie(response.headers, cookie);

  return response;
}
