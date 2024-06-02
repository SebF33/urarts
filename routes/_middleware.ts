import { FreshContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "cookie";
import i18next from "i18next";

export async function handler(req: Request, ctx: FreshContext) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const domain = url.hostname;
  let lng: string | null = url.searchParams.get("lng") || cookies.i18next;

  if (!lng) {
    // la valeur par défaut est "en" si aucune langue n'est spécifiée
    lng = "en";

    if (domain === "urarts.art" || domain === "urarts.fly.dev") lng = "en";
    if (domain === "urarts.fr") lng = "fr";

    url.searchParams.set("lng", lng);

    return new Response(null, {
      status: 302,
      headers: { Location: url.toString() },
    });
  }

  // définir la langue détectée dans i18next
  await i18next.changeLanguage(lng);

  // mettre à jour le cookie si nécessaire
  const response = await ctx.next();

  setCookie(response.headers, {
    name: "i18next",
    value: lng,
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    domain: domain,
    path: "/",
  });

  return response;
}
