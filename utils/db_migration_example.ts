import { Db, DbSchema } from "@utils/db.ts";
import { Kysely, sql } from "kysely";

async function up(db: Kysely<DbSchema>): Promise<void> {
  // Table "Artistes"
  await db.schema
    .createTable("artist")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "text")
    .addColumn("last_name", "text", (col) => col.notNull())
    .addColumn("gender", "text", (col) => col.notNull())
    .addColumn("avatar_url", "text")
    .addColumn("signature", "text")
    .addColumn("color", "text", (col) => col.defaultTo(sql`"#141b1e"`))
    .addColumn("slug", "text", (col) => col.notNull())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  // Table "Arts"
  await db.schema
    .createTable("art")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("owner_id", "integer", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("movement_id", "integer", (col) => col.notNull())
    .addColumn("polyptych", "integer", (col) => col.defaultTo(sql`1`))
    .addColumn("frame", "integer", (col) => col.defaultTo(sql`2`))
    .addColumn("url", "text", (col) => col.notNull())
    .addColumn("url_2", "text")
    .addColumn("url_3", "text")
    .addColumn("url_4", "text")
    .addColumn("url_5", "text")
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addForeignKeyConstraint(
      "art_owner_id_fk",
      ["owner_id"],
      "artist",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "art_movement_id_fk",
      ["movement_id"],
      "movement",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  // Index "art_owner_id_index"
  await db.schema
    .createIndex("art_owner_id_index")
    .on("art")
    .column("owner_id")
    .execute();

  // Index "art_movement_id_index"
  await db.schema
    .createIndex("art_movement_id_index")
    .on("art")
    .column("movement_id")
    .execute();

  // Table "Mouvements"
  await db.schema
    .createTable("movement")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("font", "text", (col) => col.defaultTo(sql`"brush"`))
    .addColumn("slug", "text", (col) => col.notNull())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.insertInto("movement").values({
    name: "Art déco",
    slug: "artdeco",
  }).execute();

  await db.insertInto("artist").values({
    first_name: "Tamara",
    last_name: "de Lempicka",
    gender: "Femme",
    avatar_url: "/arts/de lempicka/Tamara dans la Bugatti verte.jpg",
    signature: "/signs/de lempicka.png",
    color: "#318b8c",
    slug: "delempicka",
  }).execute();
  await db.insertInto("art").values({
    name: "Adam et Ève",
    movement_id: 1,
    url: "/arts/de lempicka/Adam et Ève.jpg",
    owner_id: 1,
  }).execute();
}

async function down(db: Kysely<DbSchema>): Promise<void> {
  await db.schema.dropTable("art").ifExists().execute();
  await db.schema.dropTable("artist").ifExists().execute();
  await db.schema.dropTable("movement").ifExists().execute();
}

async function run() {
  const { args } = Deno;

  const db = Db.getInstance();

  if (args.includes("--up")) {
    await up(db);
  } else if (args.includes("--down")) {
    await down(db);
  } else {
    await down(db);
    await up(db);
  }
}

if (import.meta.main) {
  run();
}
