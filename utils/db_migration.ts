import { Db, DbSchema } from "@utils/db.ts";
import { Kysely } from "kysely";
import { upArtistArt } from "@utils/db/artist_art.ts";
import { upCountry } from "@utils/db/country.ts";
import { upFact } from "@utils/db/fact.ts";
import { upMovement } from "@utils/db/movement.ts";
import { upTables } from "@utils/db/tables.ts";
import { upTopic } from "@utils/db/topic.ts";

async function down(db: Kysely<DbSchema>): Promise<void> {
  await db.schema.dropTable("art").ifExists().execute();
  await db.schema.dropTable("artist").ifExists().execute();
  await db.schema.dropTable("movement").ifExists().execute();
  await db.schema.dropTable("fact").ifExists().execute();
  await db.schema.dropTable("topic").ifExists().execute();
  await db.schema.dropTable("country").ifExists().execute();
}

async function run() {
  const { args } = Deno;

  const db = Db.getInstance();

  if (args.includes("--up")) {
    await upTables(db);
    await upCountry(db);
    await upTopic(db);
    await upFact(db);
    await upMovement(db);
    await upArtistArt(db);
  } else if (args.includes("--down")) {
    await down(db);
  } else {
    await down(db);
    await upTables(db);
    await upCountry(db);
    await upTopic(db);
    await upFact(db);
    await upMovement(db);
    await upArtistArt(db);
  }
}

if (import.meta.main) {
  run();
}
