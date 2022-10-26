import { Db } from "@utils/db.ts";
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);
  const query = url.searchParams.get("name") || "";
  const filter = query.length ? encodeURIComponent(query) : "";

  const db = Db.getInstance();
  const results = await db.selectFrom("art")
    .innerJoin("artist", "art.owner_id", "artist.id").select([
      "art.id",
      "name",
      "first_name",
      "last_name",
      "gender",
      "avatar_url",
      "slug",
      "movement",
      "url",
    ]).where("name", "like", "%" + filter + "%")
    .orderBy("name")
    .execute();

  return Promise.resolve(
    new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    }),
  );
};
