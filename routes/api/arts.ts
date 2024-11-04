import { Db } from "@utils/db.ts";
import { DEFAULT_LNG, TALENTS } from "@utils/constants.ts";
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
  const name = query.length ? query : "";

  // Aléatoire
  const random = url.searchParams.has("random");
  

  const db = Db.getInstance();
  const results = await db.selectFrom("art")
    .innerJoin("artist", "art.owner_id", "artist.id")
    .innerJoin("movement", "art.movement_id", "movement.id")
    .select([
      "art.id",
      "art.name as name",
      "first_name", "last_name",
      "gender",
      "avatar_url",
      "color",
      "artist.slug as slug",
      "polyptych",
      "url",
    ])
    .$if(lng === 'fr', (qb) => qb.select("movement.name as movement"))
    .$if(lng === 'en', (qb) => qb.select("movement.name_en as movement"))
    .where("copyright", "!=", 2)
    .$if( ! random, (qb) => qb.where(
      sql`(art.name LIKE ${"%" + name + "%"}
      OR last_name LIKE ${"%" + name + "%"}
      OR (art.name || ' ' || last_name) LIKE ${"%" + name + "%"}
      OR (last_name || ' ' || art.name) LIKE ${"%" + name + "%"})`
    ))
    .where("artist.slug", "not in", TALENTS)
    .$if( ! random, (qb) => qb.orderBy(({ fn }) => fn("lower", ["art.name"])))
    .$if( ! random, (qb) => qb.orderBy(({ fn }) => fn("lower", ["last_name"])))
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
