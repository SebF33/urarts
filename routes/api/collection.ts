import { ArtCollection } from "@utils/types.tsx";
import { Db } from "@utils/db.ts";
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);

  let query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";

  query = url.searchParams.get("slug") || "";
  const slugFilter = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("type") || "";
  const type = query.length ? encodeURIComponent(query) : "";

  const db = Db.getInstance();
  let results: Array<ArtCollection> | null = null;

  let artQuery = db.selectFrom("art")
    .innerJoin("artist", "art.owner_id", "artist.id")
    .innerJoin("movement", "art.movement_id", "movement.id")
    .select([
      "first_name",
      "last_name",
      "art.id",
      "art.name as name",
      "movement.name as movement",
      "polyptych",
      "frame",
      "url",
      "url_2",
      "url_3",
      "url_4",
      "url_5",
      "art.info as info",
    ])
    .where("art.name", "like", "%" + nameFilter + "%");

  switch (type) {
    case "artist":
      artQuery = artQuery
        .where("artist.slug", "=", slugFilter);
      break;

    case "histocharacters":
      artQuery = artQuery
        .where("histocharacter", "=", 1)
        .orderBy("art.name");
      break;

    case "movement":
      artQuery = artQuery
        .where("movement.slug", "=", slugFilter)
        .orderBy("art.name");
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
