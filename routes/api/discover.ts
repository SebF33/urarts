import { Db } from "@utils/db.ts";
import { DEFAULT_LNG } from "@utils/constants.ts";
import { define } from "@/utils.ts";
import { DisplayCopyrightedArtist, UrlBasePath } from "@/env.ts";
import { sql } from "kysely";


// API "Découverte de l'Art"
export const handler = define.handlers({
  async GET(ctx): Promise<Response> {
    const url = ctx.url;

    const lng = url.searchParams.get("lng") || DEFAULT_LNG;
    const limit = Number(url.searchParams.get("limit") || 8);

    const db = Db.getInstance();
    const rows = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "art.id",
        "art.url",
        "art.year",
        "art.width_cm",
        "art.height_cm",
        "artist.copyright",
        "artist.first_name",
        "artist.last_name",
        "artist.avatar_url",
        "artist.slug as artist_slug",
        "movement.slug as movement_slug",
      ])
      .$if(lng === "fr", (qb) =>
        qb.select([
          "art.name as name",
          "art.info as info",
          "movement.name as movement",
        ]))
      .$if(lng === "en", (qb) =>
        qb.select([
          "art.name_en as name",
          "art.info_en as info",
          "movement.name_en as movement",
        ]))
      .select((eb) => [
        sql<string>`
        COALESCE(
          (
            SELECT json_group_array(json(tag_json))
            FROM (
              SELECT json_object(
                'id', t.id,
                'slug', t.slug,
                'name', ${lng === "fr" ? sql`t.name` : sql`t.name_en`}
              ) AS tag_json
              FROM art_tag at
              JOIN tag t ON t.id = at.tag_id
              WHERE at.art_id = art.id
              ORDER BY ${lng === "fr" ? sql`t.name` : sql`t.name_en`}
            )
          ),
          json('[]')
        )
      `.as("tags"),
      ])
      .$if(
        !DisplayCopyrightedArtist,
        (qb) => qb.where("artist.copyright", "!=", 2),
      )
      .where("art.url", "is not", null)
      .orderBy(sql`random()`)
      .limit(limit)
      .execute();

    const results = rows.map((row: any) => ({
      ...row,
      tags: typeof row.tags === "string"
        ? JSON.parse(row.tags)
        : row.tags ?? [],
    }));


    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": UrlBasePath,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    });
  },
});
