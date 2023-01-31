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
  const results = await db.selectFrom("artist")
    .select([
      "id",
      "first_name",
      "last_name",
      "gender",
      "avatar_url",
      "signature",
      "slug",
    ])
    .where((qb) =>
      qb
        .orWhere("first_name", "like", "%" + filter + "%")
        .orWhere("last_name", "like", "%" + filter + "%")
    )
    .orderBy("first_name")
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
