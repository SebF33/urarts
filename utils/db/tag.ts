import { DbSchema } from "@utils/db.ts";
import { Kysely } from "kysely";
import { TAGS } from "@utils/constants.ts";

export async function upTag(db: Kysely<DbSchema>): Promise<void> {
  for (const tag of TAGS) {
    await db
      .insertInto("tag")
      .values({
        name: tag.name,
        name_en: tag.name_en,
        slug: tag.slug,
      })
      .execute();
  }
}
