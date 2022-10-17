import { Kysely, sql } from "kysely";
import { Db, DbSchema } from "@utils/db.ts";

async function up(db: Kysely<DbSchema>): Promise<void> {
  // Table "Artistes"
  await db.schema
    .createTable("artist")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text", (col) => col.notNull())
    .addColumn("gender", "text", (col) => col.notNull())
    .addColumn("avatar_url", "text", (col) => col.notNull())
    .addColumn("signature", "text")
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
    .addColumn("movement", "text", (col) => col.notNull())
    .addColumn("url", "text", (col) => col.notNull())
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
    .execute();

  // Index
  await db.schema
    .createIndex("art_owner_id_index")
    .on("art")
    .column("owner_id")
    .execute();

  // Données "Artiste"
  await db.insertInto("artist").values({
    first_name: "Tamara",
    last_name: "de Lempicka",
    gender: "Femme",
    avatar_url: "/arts/de lempicka/Tamara dans la Bugatti verte.jpg",
    slug: "lempicka",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Eugène",
    last_name: "Delacroix",
    gender: "Homme",
    avatar_url: "/arts/delacroix/Autoportrait au gilet vert.jpg",
    signature: "/signs/delacroix.png",
    slug: "delacroix",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Paul",
    last_name: "Gauguin",
    gender: "Homme",
    avatar_url: "/arts/gauguin/Autoportrait au chapeau.jpg",
    signature: "/signs/gauguin.png",
    slug: "gauguin",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Pablo",
    last_name: "Picasso",
    gender: "Homme",
    avatar_url: "/arts/picasso/Autoportrait.jpg",
    signature: "/signs/picasso.png",
    slug: "picasso",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Rembrandt",
    last_name: "Harmenszoon van Rijn",
    gender: "Homme",
    avatar_url:
      "/arts/rembrandt/Autoportrait avec fourrure, chaîne en or et boucles d'oreille.jpg",
    slug: "rembrandt",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Vincent",
    last_name: "van Gogh",
    gender: "Homme",
    avatar_url: "/arts/van gogh/Autoportrait.jpg",
    signature: "/signs/van gogh.png",
    slug: "vangogh",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Édouard",
    last_name: "Manet",
    gender: "Homme",
    avatar_url: "/arts/manet/Autoportrait à la palette.jpg",
    slug: "manet",
  }).execute();
  await db.insertInto("artist").values({
    first_name: "Frida",
    last_name: "Kahlo",
    gender: "Femme",
    avatar_url: "/arts/kahlo/Autoportrait.jpg",
    signature: "/signs/kahlo.png",
    slug: "kahlo",
  }).execute();

  // Données "Art"
  await db.insertInto("art").values({
    name: "Adam and Eve",
    movement: "Art déco",
    url: "/arts/de lempicka/Adam and Eve.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Arums",
    movement: "Art déco",
    url: "/arts/de lempicka/Arums.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Bouquet of Violets",
    movement: "Art déco",
    url: "/arts/de lempicka/Bouquet of Violets.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Lemon",
    movement: "Art déco",
    url: "/arts/de lempicka/Lemon.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "New York",
    movement: "Art déco",
    url: "/arts/de lempicka/New York.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Roses in a Vase",
    movement: "Art déco",
    url: "/arts/de lempicka/Roses in a Vase.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Roses",
    movement: "Art déco",
    url: "/arts/de lempicka/Roses.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "The Pink Shirt I",
    movement: "Art déco",
    url: "/arts/de lempicka/The Pink Shirt I.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "The Slave",
    movement: "Art déco",
    url: "/arts/de lempicka/The Slave.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "The Sleeping Girl",
    movement: "Art déco",
    url: "/arts/de lempicka/The Sleeping Girl.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "The Two Girlfriends",
    movement: "Art déco",
    url: "/arts/de lempicka/The Two Girlfriends.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "La Chambre de Van Gogh à Arles",
    movement: "Postimpressionnisme",
    url: "/arts/van gogh/La Chambre de Van Gogh à Arles.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "La Maison blanche, la nuit",
    movement: "Postimpressionnisme",
    url: "/arts/van gogh/La Maison blanche, la nuit.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "La Nuit étoilée",
    movement: "Postimpressionnisme",
    url: "/arts/van gogh/La Nuit étoilée.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Mangeurs de pommes de terre",
    movement: "Réalisme",
    url: "/arts/van gogh/Les Mangeurs de pommes de terre.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Tournesols",
    movement: "Postimpressionnisme",
    url: "/arts/van gogh/Les Tournesols.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Portrait du docteur Gachet avec branche de digitale",
    movement: "Postimpressionnisme",
    url:
      "/arts/van gogh/Portrait du docteur Gachet avec branche de digitale.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Terrasse du café le soir",
    movement: "Postimpressionnisme",
    url: "/arts/van gogh/Terrasse du café le soir.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Femmes d'Alger dans leur appartement",
    movement: "Romantisme",
    url: "/arts/delacroix/Femmes d'Alger dans leur appartement.jpg",
    owner_id: 2,
  }).execute();
  await db.insertInto("art").values({
    name: "La Liberté guidant le peuple",
    movement: "Romantisme",
    url: "/arts/delacroix/La Liberté guidant le peuple.jpg",
    owner_id: 2,
  }).execute();
  await db.insertInto("art").values({
    name: "La Mort de Sardanapale",
    movement: "Romantisme",
    url: "/arts/delacroix/La Mort de Sardanapale.jpg",
    owner_id: 2,
  }).execute();
  await db.insertInto("art").values({
    name: "Scènes des massacres de Scio",
    movement: "Romantisme",
    url: "/arts/delacroix/Scènes des massacres de Scio.jpg",
    owner_id: 2,
  }).execute();
}

async function down(db: Kysely<DbSchema>): Promise<void> {
  await db.schema.dropTable("art").ifExists().execute();
  await db.schema.dropTable("artist").ifExists().execute();
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
