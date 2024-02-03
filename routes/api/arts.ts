import { Db } from "@utils/db.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

export const handler = async (
  req: Request,
  _ctx: RouteContext,
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
    .where(
      sql`(art.name LIKE ${"%" + filter + "%"}
      OR last_name LIKE ${"%" + filter + "%"}
      OR (art.name || ' ' || last_name) LIKE ${"%" + filter + "%"}
      OR (last_name || ' ' || art.name) LIKE ${"%" + filter + "%"})`
    )  
    .where("artist.slug", "not in", TALENTS)
    .orderBy(({ fn }) => fn("lower", ["art.name"]))
    .orderBy(({ fn }) => fn("lower", ["last_name"]))
    .limit(20)
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
