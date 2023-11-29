import { Db, DbSchema } from "@utils/db.ts";
import { Kysely, sql } from "kysely";

async function up(db: Kysely<DbSchema>): Promise<void> {
  // Table "Artistes"
  await db.schema
    .createTable("artist")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "varchar")
    .addColumn("last_name", "varchar", (col) => col.notNull())
    .addColumn("gender", "varchar", (col) => col.notNull())
    .addColumn("nationality", "varchar", (col) => col.notNull())
    .addColumn("avatar_url", "varchar")
    .addColumn("signature", "varchar")
    .addColumn("quote", "varchar")
    .addColumn("color", "varchar", (col) => col.defaultTo(sql`"#141b1e"`))
    .addColumn("site_web", "varchar")
    .addColumn(
      "info",
      "varchar(500)",
      (col) =>
        col.defaultTo(
          sql`"La description est à faire pour cet(te) artiste. Il faut y indiquer son origine, son style et ses particularités qui font ce pourquoi il ou elle est célèbre."`,
        ),
    )
    .addColumn("slug", "varchar", (col) => col.notNull())
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
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("movement_id", "integer", (col) => col.notNull())
    .addColumn("polyptych", "integer", (col) => col.defaultTo(sql`1`))
    .addColumn("frame", "integer", (col) => col.defaultTo(sql`2`))
    .addColumn("url", "varchar", (col) => col.notNull())
    .addColumn("url_2", "varchar")
    .addColumn("url_3", "varchar")
    .addColumn("url_4", "varchar")
    .addColumn("url_5", "varchar")
    .addColumn(
      "info",
      "varchar",
      (col) => col.defaultTo(sql`"Description à faire."`),
    )
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
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("font", "varchar", (col) => col.defaultTo(sql`"brush"`))
    .addColumn(
      "info",
      "varchar(500)",
      (col) =>
        col.defaultTo(
          sql`"La description est à faire pour ce mouvement. Il faut y indiquer son style et ses particularités."`,
        ),
    )
    .addColumn("slug", "varchar", (col) => col.notNull())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  //1
  await db.insertInto("movement").values({
    name: "Art déco",
    slug: "artdeco",
  }).execute();

  // Tamara de Lempicka
  await db.insertInto("artist").values({
    first_name: "Tamara",
    last_name: "de Lempicka",
    gender: "Femme",
    nationality: "Pologne",
    avatar_url: "/arts/de lempicka/Tamara dans une Bugatti verte.jpg",
    signature: "/signs/de lempicka.png",
    quote:
      "Mon but : ne copie jamais. Crée un nouveau style, clair, des couleurs lumineuses, et perçois l’élégance dans tes modèles.",
    color: "#318b8c",
    site_web: "https://www.delempicka.org",
    info:
      "Elle occupe une place à part dans l'art du XXe siècle malgré une production modeste, ses œuvres évoquent et reflètent le style et la mode des années folles de l'entre-deux-guerres. Avec une stylisation néo-cubiste, ses œuvres, principalement des portraits, se caractérisent par un modelé accentué, des couleurs vives mais dans une gamme restreinte, mises en valeur par des fonds gris ou noirs.",
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
