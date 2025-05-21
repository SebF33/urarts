import { DbSchema } from "@utils/db.ts";
import { Kysely, sql } from "kysely";

// Tables
export async function upTables(db: Kysely<DbSchema>): Promise<void> {
  // Table "Pays"
  await db.schema
    .createTable("country")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("name_en", "varchar", (col) => col.notNull().unique())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  // Table "Artistes"
  await db.schema
    .createTable("artist")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("country_id", "integer", (col) => col.notNull())
    .addColumn("first_name", "varchar")
    .addColumn("last_name", "varchar", (col) => col.notNull())
    .addColumn("gender", "varchar", (col) => col.notNull())
    .addColumn("birthyear", "varchar(4)", (col) => col.notNull())
    .addColumn(
      "deathyear",
      "varchar(4)",
      (col) => col.defaultTo(sql`""`).notNull(),
    )
    .addColumn("avatar_url", "varchar", (col) => col.notNull())
    .addColumn(
      "avatar_info",
      "varchar",
      (col) =>
        col.defaultTo(
          sql`"Détail d’un autoportrait de l’artiste."`,
        ).notNull(),
    )
    .addColumn(
      "avatar_info_en",
      "varchar",
      (col) =>
        col.defaultTo(
          sql`"Detail of a self-portrait of the artist."`,
        ).notNull(),
    )
    .addColumn("signature", "varchar")
    .addColumn("quote", "varchar")
    .addColumn(
      "color",
      "varchar(7)",
      (col) => col.defaultTo(sql`"#dadada"`).notNull(),
    )
    .addColumn(
      "secondary_color",
      "varchar(7)",
      (col) => col.defaultTo(sql`"#232a2d"`).notNull(),
    )
    .addColumn("site_web", "varchar")
    .addColumn(
      "info",
      "varchar(500)",
      (col) =>
        col.defaultTo(
          sql`"La description n’est pas encore disponible pour cet(te) artiste. Son style et ses particularités seront bientôt décrits."`,
        ),
    )
    .addColumn(
      "info_en",
      "varchar(500)",
      (col) =>
        col.defaultTo(
          sql`"Description is not yet available for this artist. Its style and particularities will soon be described."`,
        ),
    )
    .addColumn("copyright", "integer", (col) => col.defaultTo(sql`0`).notNull())
    .addColumn("slug", "varchar", (col) => col.notNull().unique())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addForeignKeyConstraint(
      "artist_country_id_fk",
      ["country_id"],
      "country",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  // Table "Mouvements"
  await db.schema
    .createTable("movement")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("name_en", "varchar", (col) => col.notNull())
    .addColumn(
      "font",
      "varchar",
      (col) => col.defaultTo(sql`"brush"`).notNull(),
    )
    .addColumn(
      "info",
      "varchar(500)",
      (col) =>
        col.defaultTo(
          sql`"La description est à faire pour ce mouvement. Il faut y indiquer le style et les particularités, ainsi que quelques artistes."`,
        ).notNull(),
    )
    .addColumn(
      "info_en",
      "varchar(500)",
      (col) =>
        col.defaultTo(
          sql`"The description is to be made for this movement. It is necessary to indicate the style and particularities, as well as some artists."`,
        ).notNull(),
    )
    .addColumn("slug", "varchar", (col) => col.notNull().unique())
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
    .addColumn("movement_id", "integer", (col) => col.notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("polyptych", "integer", (col) => col.defaultTo(sql`1`).notNull())
    .addColumn("frame", "integer", (col) => col.defaultTo(sql`2`).notNull())
    .addColumn("url", "varchar", (col) => col.notNull())
    .addColumn("url_2", "varchar")
    .addColumn("url_3", "varchar")
    .addColumn("url_4", "varchar")
    .addColumn("url_5", "varchar")
    .addColumn("gap_1", "varchar")
    .addColumn("gap_2", "varchar")
    .addColumn("gap_3", "varchar")
    .addColumn("gap_4", "varchar")
    .addColumn("gap_5", "varchar")
    .addColumn("custom_css", "varchar", (col) => col.defaultTo(sql`"art-default"`))
    .addColumn(
      "info",
      "varchar",
      (col) =>
        col.defaultTo(
          sql`"La description n’est pas encore disponible pour cette œuvre."`,
        ).notNull(),
    )
    .addColumn(
      "info_en",
      "varchar",
      (col) =>
        col.defaultTo(
          sql`"Description is not yet available for this artwork."`,
        ).notNull(),
    )
    .addColumn("famous_order", "integer")
    .addColumn(
      "histocharacter",
      "integer",
      (col) => col.defaultTo(sql`0`).notNull(),
    )
    .addColumn("histocharactername", "varchar")
    .addColumn("histocharacterbirthyear", "integer")
    .addColumn("histocharacterdeathyear", "integer")
    .addColumn(
      "histocharacterinfo",
      "varchar",
      (col) =>
        col.defaultTo(
          sql`"La description n’est pas disponible pour ce personnage historique."`,
        ),
    )
    .addColumn(
      "histocharacterinfo_en",
      "varchar",
      (col) =>
        col.defaultTo(
          sql`"Description is not available for this historical figure."`,
        ),
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

  // Table "Sujets"
  await db.schema
    .createTable("topic")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("name_en", "varchar", (col) => col.notNull().unique())
    .addColumn("slug", "varchar", (col) => col.notNull().unique())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  // Table "Anecdotes"
  await db.schema
    .createTable("fact")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("topic_slug", "varchar", (col) => col.notNull())
    .addColumn(
      "target_slug",
      "varchar",
      (col) => col.defaultTo(sql`"null"`).notNull(),
    )
    .addColumn("msg", "varchar", (col) => col.notNull())
    .addColumn("msg_en", "varchar", (col) => col.notNull())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  // Table "Tags"
  await db.schema
    .createTable("tag")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("name_en", "varchar", (col) => col.notNull().unique())
    .addColumn("slug", "varchar", (col) => col.notNull().unique())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  // Table de liaison "Arts/Tags"
  await db.schema
    .createTable("art_tag")
    .ifNotExists()
    .addColumn("art_id", "integer", (col) => col.notNull())
    .addColumn("tag_id", "integer", (col) => col.notNull())
    .addForeignKeyConstraint(
      "art_tag_art_fk",
      ["art_id"],
      "art",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "art_tag_tag_fk",
      ["tag_id"],
      "tag",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addUniqueConstraint("art_tag_unique", ["art_id", "tag_id"])
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

  // Index "artist_country_id_index"
  await db.schema
    .createIndex("artist_country_id_index")
    .on("artist")
    .column("country_id")
    .execute();
}
