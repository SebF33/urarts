import { ArtCollection } from "@utils/types.tsx";
import { Db } from "@utils/db.ts";
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);

  let query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("slug") || "";
  const slugFilter = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("type") || "";
  const type = query.length ? encodeURIComponent(query) : "";

  const db = Db.getInstance();
  let results: Array<ArtCollection> | null = null;

  if (type === "artist") {
    results = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "first_name",
        "last_name",
        "art.id",
        "art.name as name",
        "movement.font as font",
        "polyptych",
        "frame",
        "url",
        "url_2",
        "url_3",
        "url_4",
        "url_5",
      ])
      .where("artist.slug", "=", slugFilter)
      .where("art.name", "like", "%" + nameFilter + "%")
      .execute();
  } else if (type === "movement") {
    results = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "first_name",
        "last_name",
        "art.id",
        "art.name as name",
        "polyptych",
        "frame",
        "url",
        "url_2",
        "url_3",
        "url_4",
        "url_5",
      ])
      .where("movement.slug", "=", slugFilter)
      .where("art.name", "like", "%" + nameFilter + "%")
      .orderBy("art.name")
      .execute();
  } else return ctx.renderNotFound();

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
