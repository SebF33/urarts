import { Db, DbSchema } from "@utils/db.ts";
import { Kysely, sql } from "kysely";

async function up(db: Kysely<DbSchema>): Promise<void> {
  // Table "Artistes"
  await db.schema
    .createTable("artist")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text")
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

  // Tamara de Lempicka
  await db.insertInto("artist").values({
    first_name: "Tamara",
    last_name: "de Lempicka",
    gender: "Femme",
    avatar_url: "/arts/de lempicka/Tamara dans la Bugatti verte.jpg",
    slug: "lempicka",
  }).execute();
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

  // Eugène Delacroix
  await db.insertInto("artist").values({
    first_name: "Eugène",
    last_name: "Delacroix",
    gender: "Homme",
    avatar_url: "/arts/delacroix/Autoportrait au gilet vert.jpg",
    signature: "/signs/delacroix.png",
    slug: "delacroix",
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

  // Paul Gauguin
  await db.insertInto("artist").values({
    first_name: "Paul",
    last_name: "Gauguin",
    gender: "Homme",
    avatar_url: "/arts/gauguin/Autoportrait au chapeau.jpg",
    signature: "/signs/gauguin.png",
    slug: "gauguin",
  }).execute();

  // Pablo Picasso
  await db.insertInto("artist").values({
    first_name: "Pablo",
    last_name: "Picasso",
    gender: "Homme",
    avatar_url: "/arts/picasso/Autoportrait.jpg",
    signature: "/signs/picasso.png",
    slug: "picasso",
  }).execute();

  // Rembrandt
  await db.insertInto("artist").values({
    first_name: "Rembrandt",
    gender: "Homme",
    avatar_url:
      "/arts/rembrandt/Autoportrait avec fourrure, chaîne en or et boucles d'oreille.jpg",
    slug: "rembrandt",
  }).execute();

  // Vincent van Gogh
  await db.insertInto("artist").values({
    first_name: "Vincent",
    last_name: "van Gogh",
    gender: "Homme",
    avatar_url: "/arts/van gogh/Autoportrait.jpg",
    signature: "/signs/van gogh.png",
    slug: "vangogh",
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

  // Édouard Manet
  await db.insertInto("artist").values({
    first_name: "Édouard",
    last_name: "Manet",
    gender: "Homme",
    avatar_url: "/arts/manet/Autoportrait à la palette.jpg",
    slug: "manet",
  }).execute();

  // Frida Kahlo
  await db.insertInto("artist").values({
    first_name: "Frida",
    last_name: "Kahlo",
    gender: "Femme",
    avatar_url: "/arts/kahlo/Autoportrait.jpg",
    signature: "/signs/kahlo.png",
    slug: "kahlo",
  }).execute();

  // Gustav Klimt
  await db.insertInto("artist").values({
    first_name: "Gustav",
    last_name: "Klimt",
    gender: "Homme",
    avatar_url: "/arts/klimt/Autoportrait.jpg",
    signature: "/signs/klimt.png",
    slug: "klimt",
  }).execute();
  await db.insertInto("art").values({
    name: "La Vie et la Mort",
    movement: "Art nouveau",
    url: "/arts/klimt/La Vie et la Mort.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "Portrait d'Adele Bloch-Bauer I",
    movement: "Art nouveau",
    url: "/arts/klimt/Portrait d'Adele Bloch-Bauer I.jpg",
    owner_id: 9,
  }).execute();

  // Michel-Ange
  await db.insertInto("artist").values({
    first_name: "Michel-Ange",
    gender: "Homme",
    avatar_url: "/arts/michel-ange/Autoportrait.jpg",
    slug: "michel-ange",
  }).execute();
  await db.insertInto("art").values({
    name: "La Conversion de saint Paul",
    movement: "Renaissance italienne",
    url: "/arts/michel-ange/La Conversion de saint Paul.jpg",
    owner_id: 10,
  }).execute();
  await db.insertInto("art").values({
    name: "La Création d'Adam",
    movement: "Haute Renaissance",
    url: "/arts/michel-ange/La Création d'Adam.jpg",
    owner_id: 10,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Jugement dernier",
    movement: "Renaissance italienne",
    url: "/arts/michel-ange/Le Jugement dernier.jpg",
    owner_id: 10,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Tourment de saint Antoine",
    movement: "Renaissance italienne",
    url: "/arts/michel-ange/Le Tourment de saint Antoine.jpg",
    owner_id: 10,
  }).execute();

  // Léonard de Vinci
  await db.insertInto("artist").values({
    first_name: "Léonard",
    last_name: "de Vinci",
    gender: "Homme",
    avatar_url: "/arts/de vinci/Portrait d'un vieil homme.jpg",
    slug: "vinci",
  }).execute();
  await db.insertInto("art").values({
    name: "La Joconde",
    movement: "Haute Renaissance",
    url: "/arts/de vinci/La Joconde.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "Sainte Anne, la Vierge et l'Enfant Jésus jouant avec un agneau",
    movement: "Haute Renaissance",
    url:
      "/arts/de vinci/Sainte Anne, la Vierge et l'Enfant Jésus jouant avec un agneau.jpg",
    owner_id: 11,
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
