import { Db } from "@utils/db.ts";
import { DEFAULT_LNG, TALENTS } from "@utils/constants.ts";
import { DisplayCopyrightedArtist, UrlBasePath } from "@/env.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";


// API "Artistes"
export const handler = async (
  req: Request,
  _ctx: RouteContext,
): Promise<Response> => {

  // Déterminer si l'origine de la demande est autorisée
  const requestOrigin = req.headers.get("Origin") || req.headers.get("Referer") || "";
  const isAllowedOrigin = requestOrigin.startsWith(UrlBasePath);
  if (!isAllowedOrigin) {
    return new Response(JSON.stringify({ error: "Access Denied" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }


  let query
  const url = new URL(req.url);

  // Langue
  query = url.searchParams.get("lng") || "";
  const lng = query.length ? encodeURIComponent(query) : DEFAULT_LNG;

  // Genre
  query = url.searchParams.get("gender") || "";
  const genderFilter = query.length ? query : "";
  let hasGender;
  genderFilter === "" ? hasGender = false : hasGender = true;

  // Noms
  query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";

  // Nationalité
  query = url.searchParams.get("nationality") || "";
  const nationalityFilter = query.length ? query : "Monde";
  let isCountry = false;
  let isWorld = false;
  nationalityFilter === "Monde" ? isWorld = true : isCountry = true;

  // Période
  query = url.searchParams.get("years") || "";
  const yearsFilter = query.length ? query : "";
  let hasYears;
  yearsFilter === "" ? hasYears = false : hasYears = true;
  const years = yearsFilter.split(",", 2);
  const beginFilter = years[0];
  const endFilter = years[1];

  const db = Db.getInstance();
  const results = await db.selectFrom("artist")
    .innerJoin("country", "artist.country_id", "country.id")
    .select([
      "artist.id",
      "first_name", "last_name", "gender",
      "birthyear", "deathyear",
      "avatar_url", "signature", "color", "site_web",
      "slug",
    ])
    .$if(!DisplayCopyrightedArtist, (qb) => qb.where("artist.copyright", "!=", 2))
    .$if(lng === 'fr', (qb) => qb.select("info"))
    .$if(lng === 'en', (qb) => qb.select("info_en as info"))
    .$if(lng === 'fr', (qb) => qb.select("country.name as nationality"))
    .$if(lng === 'en', (qb) => qb.select("country.name_en as nationality"))
    .$if(hasGender, (qb) => qb.where("gender", "=", genderFilter))
    .$if(hasYears, (qb) =>
      qb.where(
        sql`((birthyear BETWEEN ${beginFilter} AND ${endFilter}) OR (deathyear BETWEEN ${beginFilter} AND ${endFilter}))`,
      ))
    .$if(isCountry && lng === 'fr', (qb) => qb.where("country.name", "=", nationalityFilter))
    .$if(isCountry && lng === 'en', (qb) => qb.where("country.name_en", "=", nationalityFilter))
    .$if(isWorld, (qb) => qb.where("country.name", "like", "%"))
    .where("slug", "not in", TALENTS)
    .where(
      sql`(first_name LIKE ${"%" + nameFilter + "%"}
      OR last_name LIKE ${"%" + nameFilter + "%"}
      OR (first_name || ' ' || last_name) LIKE ${"%" + nameFilter + "%"}
      OR (last_name || ' ' || first_name) LIKE ${"%" + nameFilter + "%"})`
    )    
    .orderBy(({ fn }) => fn("lower", ["last_name"]))
    .orderBy(({ fn }) => fn("lower", ["first_name"]))
    .execute();

  
  return Promise.resolve(
    new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": UrlBasePath,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    }),
  );
};
