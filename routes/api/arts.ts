import { HandlerContext } from "$fresh/server.ts";
import { Db } from "@utils/db.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") || "";
  const filter = query.length ? encodeURIComponent(query) : "";

  const db = Db.getInstance();
  const results = await db.selectFrom("art")
    .innerJoin("person", "art.owner_id", "person.id").select([
      "name",
      "first_name",
      "last_name",
      "gender",
      "avatar_url",
      "movement",
      "url",
      "art.modified_at",
    ]).where("name", "like", "%" + filter + "%").execute();

  return Promise.resolve(
    new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    }),
  );
};
