import { ArtCollection, TagCollection } from "@utils/types.d.ts";
import { Db } from "@utils/db.ts";
import { DEFAULT_LNG, TALENTS } from "@utils/constants.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { UrlBasePath } from "@/env.ts";


// API "Collection"
export const handler = async (
  req: Request,
  ctx: RouteContext,
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

  const isAlone = url.searchParams.has("alone");
  const isNotAlone = url.searchParams.has("notalone");

  query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";

  query = url.searchParams.get("slug") || "";
  const slugFilter = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("type") || "";
  const type = query.length ? encodeURIComponent(query) : "";

  // Contenu concernant un seul artiste
  query = url.searchParams.get("aloneartistslug") || "";
  const aloneArtistSlug = query.length ? encodeURIComponent(query) : "";

  // Œuvre identifiée
  query = url.searchParams.get("id") || "";
  const idFilter = query.length ? query : "";

  // Œuvres
  let isArtworks;
  type !== "histocharacters" ? isArtworks = true : isArtworks = false;

  // Personnages historiques
  let isHistocharacters;
  type === "histocharacters" ? isHistocharacters = true : isHistocharacters = false;

  // Période historique
  query = url.searchParams.get("years") || "";
  const yearsFilter = query.length ? query : "";
  let hasYears;
  yearsFilter === "" ? hasYears = false : hasYears = true;
  const years = yearsFilter.split(",", 2);
  const beginFilter = years[0];
  const endFilter = years[1];

  
  const db = Db.getInstance();
  let results: Array<ArtCollection> | null = null;

  let artQuery = db.selectFrom("art")
    .innerJoin("artist", "art.owner_id", "artist.id")
    .innerJoin("movement", "art.movement_id", "movement.id")
    .select([
      "first_name", "last_name", "avatar_url",
      "art.id",
      "movement.font as font",
      "movement.slug as movement_slug",
      "polyptych", "frame",
      "url", "url_2", "url_3", "url_4", "url_5",
      "gap_1", "gap_2", "gap_3", "gap_4", "gap_5",
      // ajouter la classe 'art-wide' si l'œuvre est toute seule
      sql<{custom_css: string}>`
        CASE
          WHEN ${isAlone} AND "custom_css" <> 'art-wide'
          THEN "custom_css" || ' art-wide'
          ELSE "custom_css"
        END
      `.as("custom_css"),
      "year",
      "height_cm", "width_cm",
      "color",
      "artist.slug as artist_slug",
      "copyright",
      // agréger les tags en JSON
      sql<TagCollection[]>`
        COALESCE(
          (
            SELECT json_group_array(json(tag_json))
            FROM (
              SELECT json_object(
                'id', t.id,
                'name', name,
                'slug', t.slug
              ) AS tag_json
              FROM art_tag at
              JOIN tag t ON t.id = at.tag_id
              WHERE at.art_id = art.id
              ORDER BY name
            )
          ),
          json('[]')
        )
      `.as('tags')
    ])
    .$if(lng === 'fr', (qb) => qb.select("movement.name as movement"))
    .$if(lng === 'en', (qb) => qb.select("movement.name_en as movement"))
    .$if(isArtworks && lng === 'fr', (qb) => qb.select("art.name as name"))
    .$if(isArtworks && lng === 'en', (qb) => qb.select(sql<string>`CASE WHEN art.name_en IS NOT NULL THEN art.name_en ELSE art.name END`.as("name")))
    .$if(isArtworks && lng === 'fr', (qb) => qb.select("art.info as info"))
    .$if(isArtworks && lng === 'en', (qb) => qb.select("art.info_en as info"))
    .$if(isHistocharacters, (qb) => qb.select("histocharactername as name"))
    .$if(isHistocharacters, (qb) => qb.select("histocharacterbirthyear as birthyear"))
    .$if(isHistocharacters, (qb) => qb.select("histocharacterdeathyear as deathyear"))
    .$if(isHistocharacters && lng === 'fr', (qb) => qb.select("histocharacterinfo as info"))
    .$if(isHistocharacters && lng === 'en', (qb) => qb.select("histocharacterinfo_en as info"))
    .where("copyright", "!=", 2)
    .$if(isArtworks && lng === 'en', (qb) =>
      qb.where((eb) =>
        eb.or([
          eb('art.name_en', 'like', `%${nameFilter}%`),
          eb('art.name', 'like', `%${nameFilter}%`)
        ])
      )
    )
    .$if(isArtworks && lng === 'fr', (qb) => qb.where('art.name', 'like', `%${nameFilter}%`))
    .$if(isHistocharacters, (qb) => qb.where("histocharactername", "like", "%" + nameFilter + "%"))
    .$if(isAlone, (qb) => qb.where("art.id", "=", parseInt(idFilter)));

  switch (type) {
    case "artist":
      artQuery = artQuery
        .where("artist.slug", "=", slugFilter);
      break;

    case "famousart":
      artQuery = artQuery
        .where("art.famous_order", "is not", null)
        .orderBy(sql`random()`)
        .limit(10)
      break;

    case "histocharacters":
      artQuery = artQuery
        .where("histocharacter", "=", 1)
        .$if(hasYears, (qb) =>
          qb.where(
            sql`((histocharacterbirthyear BETWEEN ${beginFilter} AND ${endFilter}) OR (histocharacterdeathyear BETWEEN ${beginFilter} AND ${endFilter}))`,
          ))
        .orderBy(({ fn }) => fn("lower", ["histocharactername"]))
      break;

    case "movement":
      artQuery = artQuery
        .where("movement.slug", "=", slugFilter)
        .where("artist.slug", "not in", TALENTS)
        .$if(aloneArtistSlug !== '', (qb) => qb.where("artist.slug", "=", aloneArtistSlug))
        .$if(isNotAlone, (qb) => qb.orderBy(sql`random()`))
        .orderBy(sql`random()`)
        .$if(isArtworks && lng === 'en', (qb) => qb.orderBy(({ fn }) => fn('lower', [sql`COALESCE(art.name_en, art.name)`])))
        .$if(isArtworks && lng === 'fr', (qb) => qb.orderBy(({ fn }) => fn('lower', ['art.name'])))
        .limit(50)
      break;

    case "tag":
      artQuery = artQuery
        .where((eb) =>
          eb.exists(
            db.selectFrom("art_tag as at")
              .innerJoin("tag as t", "t.id", "at.tag_id")
              .select(sql`1`)
              .whereRef("at.art_id", "=", "art.id")
              .where("t.slug", "=", slugFilter)
          )
        )
        .$if(aloneArtistSlug !== '', (qb) => qb.where("artist.slug", "=", aloneArtistSlug))
        .$if(isNotAlone, (qb) => qb.orderBy(sql`random()`))
        .orderBy(sql`random()`)
        .$if(isArtworks && lng === 'en', (qb) => qb.orderBy(({ fn }) => fn('lower', [sql`COALESCE(art.name_en, art.name)`])))
        .$if(isArtworks && lng === 'fr', (qb) => qb.orderBy(({ fn }) => fn('lower', ['art.name'])))
        .limit(50);
      break;

    case "talentsart":
      artQuery = artQuery
        .where("artist.slug", "in", TALENTS)
        .orderBy(sql`random()`)
        .limit(10)
      break;

    default:
      return ctx.renderNotFound();
  }

  results = (await artQuery.execute()).map(row => ({
    ...row,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : (row.tags || [])
  }));  


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
