import { Db } from "@utils/db.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

export const handler = async (
  req: Request,
  _ctx: RouteContext,
): Promise<Response> => {
  const url = new URL(req.url);

  // Genre
  let query = url.searchParams.get("gender") || "";
  const genderFilter = query.length ? query : "";
  let hasGender;
  genderFilter === "" ? hasGender = false : hasGender = true;

  // Nom
  query = url.searchParams.get("name") || "";
  const nameFilter = query.length ? query : "";

  // Nationalité
  query = url.searchParams.get("nationality") || "";
  const nationalityFilter = query.length ? query : "Monde";
  let isCountry = false;
  let isWorld = false;
  nationalityFilter === "Monde" ? isWorld = true : isCountry = true;

  // Période
  query = url.searchParams.get("years") || "";
  const yearsFilter = query.length ? query : "";
  let hasYears;
  yearsFilter === "" ? hasYears = false : hasYears = true;
  const years = yearsFilter.split(",", 2);
  const beginFilter = years[0];
  const endFilter = years[1];

  const db = Db.getInstance();
  const results = await db.selectFrom("artist")
    .select([
      "id",
      "first_name",
      "last_name",
      "gender",
      "nationality",
      "birthyear",
      "deathyear",
      "avatar_url",
      "signature",
      "color",
      "site_web",
      "info",
      "slug",
    ])
    .$if(hasGender, (qb) => qb.where("gender", "=", genderFilter))
    .$if(hasYears, (qb) =>
      qb.where(
        sql`((birthyear BETWEEN ${beginFilter} AND ${endFilter}) OR (deathyear BETWEEN ${beginFilter} AND ${endFilter}))`,
      ))
    .$if(isCountry, (qb) => qb.where("nationality", "=", nationalityFilter))
    .$if(isWorld, (qb) => qb.where("nationality", "like", "%"))
    .where("slug", "not in", TALENTS)
    .where(({ eb, or }) =>
      or([
        eb("first_name", "like", "%" + nameFilter + "%"),
        eb("last_name", "like", "%" + nameFilter + "%"),
      ])
    )
    .orderBy(({ fn }) => fn("lower", ["last_name"]))
    .orderBy(({ fn }) => fn("lower", ["first_name"]))
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
