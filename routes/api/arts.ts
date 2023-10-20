import { Db } from "@utils/db.ts";
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);
  const query = url.searchParams.get("name") || "";
  const filter = query.length ? query : "";

  const db = Db.getInstance();
  const results = await db.selectFrom("art")
    .innerJoin("artist", "art.owner_id", "artist.id")
    .innerJoin("movement", "art.movement_id", "movement.id")
    .select([
      "art.id",
      "art.name as name",
      "first_name",
      "last_name",
      "gender",
      "avatar_url",
      "color",
      "artist.slug as slug",
      "movement.name as movement",
      "polyptych",
      "url",
    ])
    .where("copyright", "!=", 2)
    .where("art.name", "like", "%" + filter + "%")
    .where("artist.slug", "!=", "mimi")
    .orderBy("art.name")
    .orderBy("last_name")
    .execute();

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
