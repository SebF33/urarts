import { FreshContext } from "$fresh/server.ts";
import { Cookie, getCookies, setCookie } from "cookie";
import i18next from "i18next";

export async function handler(req: Request, ctx: FreshContext) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const domain = url.hostname;
  let lng: string | null = cookies.i18next;

  if (!lng) {
    // valeur par défaut si aucune langue n'est spécifiée
    lng = "en";

    // valeur selon le domaine
    if (domain === "urarts.art" || domain === "urarts.fly.dev") lng = "en";
    if (domain === "urarts.fr") lng = "fr";
  }

  // définir la langue dans i18next
  await i18next.changeLanguage(lng);

  // mettre à jour le cookie
  const response = await ctx.next();

  const cookie: Cookie = {
    name: "i18next",
    value: lng,
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    domain: domain,
    path: "/",
  };
  setCookie(response.headers, cookie);

  return response;
}
