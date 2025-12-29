import { Db, DbSchema } from "@utils/db.ts";
import { Kysely } from "kysely";
import { upArtistArt1 } from "@utils/db/artist_art/artist_art_1.ts";
import { upArtistArt2 } from "@utils/db/artist_art/artist_art_2.ts";
import { upArtistArt3 } from "@utils/db/artist_art/artist_art_3.ts";
import { upArtistArt4 } from "@utils/db/artist_art/artist_art_4.ts";
import { upArtistArt5 } from "@utils/db/artist_art/artist_art_5.ts";
import { upArtistArt6 } from "@utils/db/artist_art/artist_art_6.ts";
import { upArtistArt7 } from "@utils/db/artist_art/artist_art_7.ts";
import { upArtistArt8 } from "@utils/db/artist_art/artist_art_8.ts";
import { upArtistArt9 } from "@utils/db/artist_art/artist_art_9.ts";
import { upArtistArt10 } from "@utils/db/artist_art/artist_art_10.ts";
import { upArtistArt11 } from "@utils/db/artist_art/artist_art_11.ts";
import { upArtistArt12 } from "@utils/db/artist_art/artist_art_12.ts";
import { upArtistArt13 } from "@utils/db/artist_art/artist_art_13.ts";
import { upArtistArt14 } from "@utils/db/artist_art/artist_art_14.ts";
import { upArtistArt15 } from "@utils/db/artist_art/artist_art_15.ts";
import { upArtistArt16 } from "@utils/db/artist_art/artist_art_16.ts";
import { upCountry } from "@utils/db/country.ts";
import { upFact } from "@utils/db/fact.ts";
import { upMovement } from "@utils/db/movement.ts";
import { upTables } from "@utils/db/tables.ts";
import { upTag } from "@utils/db/tag.ts";
import { upTopic } from "@utils/db/topic.ts";

async function down(db: Kysely<DbSchema>): Promise<void> {
  await db.schema.dropTable("art_tag").ifExists().execute();
  await db.schema.dropTable("art").ifExists().execute();
  await db.schema.dropTable("artist").ifExists().execute();
  await db.schema.dropTable("movement").ifExists().execute();
  await db.schema.dropTable("fact").ifExists().execute();
  await db.schema.dropTable("topic").ifExists().execute();
  await db.schema.dropTable("country").ifExists().execute();
  await db.schema.dropTable("tag").ifExists().execute();
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
    await upTag(db);
    await upArtistArt1(db);
    await upArtistArt2(db);
    await upArtistArt3(db);
    await upArtistArt4(db);
    await upArtistArt5(db);
    await upArtistArt6(db);
    await upArtistArt7(db);
    await upArtistArt8(db);
    await upArtistArt9(db);
    await upArtistArt10(db);
    await upArtistArt11(db);
    await upArtistArt12(db);
    await upArtistArt13(db);
    await upArtistArt14(db);
    await upArtistArt15(db);
    await upArtistArt16(db);
  } else if (args.includes("--down")) {
    await down(db);
  } else {
    await down(db);
    await upTables(db);
    await upCountry(db);
    await upTopic(db);
    await upFact(db);
    await upMovement(db);
    await upTag(db);
    await upArtistArt1(db);
    await upArtistArt2(db);
    await upArtistArt3(db);
    await upArtistArt4(db);
    await upArtistArt5(db);
    await upArtistArt6(db);
    await upArtistArt7(db);
    await upArtistArt8(db);
    await upArtistArt9(db);
    await upArtistArt10(db);
    await upArtistArt11(db);
    await upArtistArt12(db);
    await upArtistArt13(db);
    await upArtistArt14(db);
    await upArtistArt15(db);
    await upArtistArt16(db);
  }
}

if (import.meta.main) {
  run();
}
