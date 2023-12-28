import { ArtCollection } from "@utils/types.tsx";
import { Db } from "@utils/db.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

export const handler = async (
  req: Request,
  ctx: RouteContext,
): Promise<Response> => {
  const url = new URL(req.url);

  let query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";

  query = url.searchParams.get("slug") || "";
  const slugFilter = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("type") || "";
  const type = query.length ? encodeURIComponent(query) : "";

  // Œuvres
  let isArtworks;
  type !== "histocharacters" ? isArtworks = true : isArtworks = false;

  // Personnages historiques
  let isHistocharacters;
  type === "histocharacters"
    ? isHistocharacters = true
    : isHistocharacters = false;

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
      "first_name",
      "last_name",
      "art.id",
      "movement.font as font",
      "movement.name as movement",
      "movement.slug as movement_slug",
      "polyptych",
      "frame",
      "url",
      "url_2",
      "url_3",
      "url_4",
      "url_5",
      "color",
      "artist.slug as artist_slug",
    ])
    .$if(isArtworks, (qb) => qb.select("art.name as name"))
    .$if(isArtworks, (qb) => qb.select("art.info as info"))
    .$if(isHistocharacters, (qb) => qb.select("histocharactername as name"))
    .$if(
      isHistocharacters,
      (qb) => qb.select("histocharacterbirthyear as birthyear"),
    )
    .$if(
      isHistocharacters,
      (qb) => qb.select("histocharacterdeathyear as deathyear"),
    )
    .$if(isHistocharacters, (qb) => qb.select("histocharacterinfo as info"))
    .where("copyright", "!=", 2)
    .$if(
      isArtworks,
      (qb) => qb.where("art.name", "like", "%" + nameFilter + "%"),
    )
    .$if(
      isHistocharacters,
      (qb) => qb.where("histocharactername", "like", "%" + nameFilter + "%"),
    );

  switch (type) {
    case "artist":
      artQuery = artQuery
        .where("artist.slug", "=", slugFilter);
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
        .orderBy(({ fn }) => fn("lower", ["art.name"]))
      break;

    default:
      return ctx.renderNotFound();
  }

  results = await artQuery.execute();

  return Promise.resolve(
    new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    }),
  );
};
