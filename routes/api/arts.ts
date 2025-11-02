import { Db } from "@utils/db.ts";
import { DEFAULT_LNG, TALENTS } from "@utils/constants.ts";
import { normalizeText } from "@utils/db/common.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { UrlBasePath } from "@/env.ts";


// API "Œuvres d'art"
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

  // Noms
  query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";
  const normalizedNameFilter = normalizeText(nameFilter);

  // Tag
  query = url.searchParams.get("tag") || "";
  const tag = query.length ? query : "";
  const tagColumn = lng === "en" ? "tag.name_en" : "tag.name";

  // Aléatoire
  const random = url.searchParams.has("random");

  // Lieux géographiques
  const geolocation = url.searchParams.has("geolocation");
  

  const db = Db.getInstance();
  const results = await db.selectFrom("art")
    .innerJoin("artist", "art.owner_id", "artist.id")
    .innerJoin("movement", "art.movement_id", "movement.id")
    .$if( !! tag, (qb) =>
      qb
        .innerJoin("art_tag", "art.id", "art_tag.art_id")
        .innerJoin("tag", "art_tag.tag_id", "tag.id")
    )
    .select([
      "art.id",
      "first_name", "last_name",
      "gender",
      "avatar_url",
      "color",
      "artist.slug as slug",
      "polyptych",
      "url",
    ])
    .$if(lng === 'fr', (qb) => qb.select("art.name as name"))
    .$if(lng === 'en', (qb) => qb.select(sql<string>`CASE WHEN art.name_en IS NOT NULL THEN art.name_en ELSE art.name END`.as("name")))
    .$if(lng === 'fr', (qb) => qb.select("movement.name as movement"))
    .$if(lng === 'en', (qb) => qb.select("movement.name_en as movement"))
    .where("copyright", "!=", 2)
    .where("artist.slug", "not in", TALENTS)
    .$if(!random && lng === 'en', (qb) =>
      qb.where(sql<string>`
        (
          art.name_en_normalized LIKE ${"%" + normalizedNameFilter + "%"}
          OR art.name_normalized LIKE ${"%" + normalizedNameFilter + "%"}
          OR last_name_normalized LIKE ${"%" + normalizedNameFilter + "%"}
          OR ((art.name_en_normalized || ' ' || last_name_normalized) LIKE ${"%" + normalizedNameFilter + "%"})
          OR ((art.name_normalized || ' ' || last_name_normalized) LIKE ${"%" + normalizedNameFilter + "%"})
          OR ((last_name_normalized || ' ' || art.name_en_normalized) LIKE ${"%" + normalizedNameFilter + "%"})
          OR ((last_name_normalized || ' ' || art.name_normalized) LIKE ${"%" + normalizedNameFilter + "%"})
        )
      `)
    )
    .$if( ! random && lng === 'fr', (qb) =>
      qb.where(sql<string>`
        (
          art.name_normalized LIKE ${"%" + normalizedNameFilter + "%"}
          OR last_name_normalized LIKE ${"%" + normalizedNameFilter + "%"}
          OR (art.name_normalized || ' ' || last_name_normalized) LIKE ${"%" + normalizedNameFilter + "%"}
          OR (last_name_normalized || ' ' || art.name_normalized) LIKE ${"%" + normalizedNameFilter + "%"}
        )
      `)
    )
    .$if(geolocation, (qb) => qb.where("geolocation", "=", 1))
    .$if( !! tag, (qb) => qb.where(tagColumn, "=", tag))
    .$if( ! random && lng === 'en', (qb) => qb.orderBy(({ fn }) => fn('lower', [sql`COALESCE(art.name_en_normalized, art.name_normalized)`])))
    .$if( ! random && lng === 'fr', (qb) => qb.orderBy(({ fn }) => fn('lower', ['art.name_normalized'])))      
    .$if( ! random, (qb) => qb.orderBy(({ fn }) => fn("lower", ["last_name_normalized"])))
    .$if(random, (qb) => qb.orderBy(sql`random()`))
    .limit(20)
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
