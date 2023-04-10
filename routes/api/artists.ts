import { Db } from "@utils/db.ts";
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);

  let query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";

  query = url.searchParams.get("nationality") || "";
  const nationalityFilter = query.length ? query : "";

  const db = Db.getInstance();
  const results = await db.selectFrom("artist")
    .select([
      "id",
      "first_name",
      "last_name",
      "gender",
      "nationality",
      "avatar_url",
      "signature",
      "slug",
    ])
    .where((qb) =>
      qb
        .orWhere("first_name", "like", "%" + nameFilter + "%")
        .orWhere("last_name", "like", "%" + nameFilter + "%")
    )
    .where("nationality", "like", "%" + nationalityFilter + "%")
    .where("slug", "!=", "mimi")
    .orderBy("last_name")
    .orderBy("first_name")
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
