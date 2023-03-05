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

  //1
  await db.insertInto("movement").values({
    name: "Art déco",
    slug: "artdeco",
  }).execute();
  //2
  await db.insertInto("movement").values({
    name: "Art naïf",
    slug: "artnaif",
  }).execute();
  //3
  await db.insertInto("movement").values({
    name: "Art nouveau",
    slug: "artnouveau",
  }).execute();
  //4
  await db.insertInto("movement").values({
    name: "Baroque",
    slug: "baroque",
  }).execute();
  //5
  await db.insertInto("movement").values({
    name: "Cloisonnisme",
    slug: "cloisonnisme",
  }).execute();
  //6
  await db.insertInto("movement").values({
    name: "Cubisme",
    slug: "cubisme",
  }).execute();
  //7
  await db.insertInto("movement").values({
    name: "Expressionnisme",
    slug: "expressionnisme",
  }).execute();
  //8
  await db.insertInto("movement").values({
    name: "Fauvisme",
    slug: "fauvisme",
  }).execute();
  //9
  await db.insertInto("movement").values({
    name: "Haute Renaissance",
    slug: "hauterenaissance",
  }).execute();
  //10
  await db.insertInto("movement").values({
    name: "Impressionnisme",
    slug: "impressionnisme",
  }).execute();
  //11
  await db.insertInto("movement").values({
    name: "Maniérisme",
    slug: "manierisme",
  }).execute();
  //12
  await db.insertInto("movement").values({
    name: "Néo-classicisme",
    slug: "neoclassicisme",
  }).execute();
  //13
  await db.insertInto("movement").values({
    name: "Pop art",
    slug: "popart",
  }).execute();
  //14
  await db.insertInto("movement").values({
    name: "Hyperréalisme",
    slug: "hyperrealisme",
  }).execute();
  //15
  await db.insertInto("movement").values({
    name: "Pointillisme",
    slug: "pointillisme",
  }).execute();
  //16
  await db.insertInto("movement").values({
    name: "Postimpressionnisme",
    slug: "postimpressionnisme",
  }).execute();
  //17
  await db.insertInto("movement").values({
    name: "Première Renaissance",
    slug: "premiererenaissance",
  }).execute();
  //18
  await db.insertInto("movement").values({
    name: "Réalisme",
    slug: "realisme",
  }).execute();
  //19
  await db.insertInto("movement").values({
    name: "Régionalisme",
    slug: "regionalisme",
  }).execute();
  //20
  await db.insertInto("movement").values({
    name: "Renaissance italienne",
    slug: "renaissanceitalienne",
  }).execute();
  //21
  await db.insertInto("movement").values({
    name: "Rococo",
    slug: "rococo",
  }).execute();
  //22
  await db.insertInto("movement").values({
    name: "Romantisme",
    slug: "romantisme",
  }).execute();
  //23
  await db.insertInto("movement").values({
    name: "Surréalisme",
    slug: "surrealisme",
  }).execute();
  //24
  await db.insertInto("movement").values({
    name: "Symbolisme",
    slug: "symbolisme",
  }).execute();
  //25
  await db.insertInto("movement").values({
    name: "Synthétisme",
    slug: "synthetisme",
  }).execute();
  //26
  await db.insertInto("movement").values({
    name: "Renaissance nordique",
    slug: "renaissancenordique",
  }).execute();
  //27
  await db.insertInto("movement").values({
    name: "Non classé",
    slug: "nonclasse",
  }).execute();
  //28
  await db.insertInto("movement").values({
    name: "Intimisme",
    slug: "intimisme",
  }).execute();
  //29
  await db.insertInto("movement").values({
    name: "Street art",
    font: "street z-10",
    slug: "streetart",
  }).execute();
  //30
  await db.insertInto("movement").values({
    name: "Art conceptuel",
    slug: "artconceptuel",
  }).execute();
  //31
  await db.insertInto("movement").values({
    name: "Ukiyo-e",
    font: "japanese",
    slug: "ukiyoe",
  }).execute();

  // Tamara de Lempicka
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
  await db.insertInto("art").values({
    name: "Bouquet de violettes",
    movement_id: 1,
    url: "/arts/de lempicka/Bouquet de violettes.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Citron",
    movement_id: 1,
    url: "/arts/de lempicka/Citron.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "La chemise rose",
    movement_id: 1,
    url: "/arts/de lempicka/La chemise rose.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "La femme endormie",
    movement_id: 1,
    url: "/arts/de lempicka/La femme endormie.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Arums",
    movement_id: 1,
    url: "/arts/de lempicka/Les Arums.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "L'esclave",
    movement_id: 1,
    url: "/arts/de lempicka/L'esclave.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "New York",
    movement_id: 1,
    url: "/arts/de lempicka/New York.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Roses dans un vase",
    movement_id: 1,
    url: "/arts/de lempicka/Roses dans un vase.jpg",
    owner_id: 1,
  }).execute();
  await db.insertInto("art").values({
    name: "Roses",
    movement_id: 1,
    url: "/arts/de lempicka/Roses.jpg",
    owner_id: 1,
  }).execute();

  // Eugène Delacroix
  await db.insertInto("artist").values({
    first_name: "Eugène",
    last_name: "Delacroix",
    gender: "Homme",
    avatar_url: "/arts/delacroix/Autoportrait au gilet vert.jpg",
    signature: "/signs/delacroix.png",
    color: "#3b3328",
    slug: "delacroix",
  }).execute();
  await db.insertInto("art").values({
    name: "Femmes d'Alger dans leur appartement",
    movement_id: 22,
    url: "/arts/delacroix/Femmes d'Alger dans leur appartement.jpg",
    owner_id: 2,
  }).execute();
  await db.insertInto("art").values({
    name: "La Liberté guidant le peuple",
    movement_id: 22,
    url: "/arts/delacroix/La Liberté guidant le peuple.jpg",
    owner_id: 2,
  }).execute();
  await db.insertInto("art").values({
    name: "La Mort de Sardanapale",
    movement_id: 22,
    url: "/arts/delacroix/La Mort de Sardanapale.jpg",
    owner_id: 2,
  }).execute();
  await db.insertInto("art").values({
    name: "Scènes des massacres de Scio",
    movement_id: 22,
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
    color: "#dfb41a",
    slug: "gauguin",
  }).execute();
  await db.insertInto("art").values({
    name: "Le Christ jaune",
    movement_id: 5,
    url: "/arts/gauguin/Le Christ jaune.jpg",
    owner_id: 3,
  }).execute();
  await db.insertInto("art").values({
    name: "Manao Tupapau",
    movement_id: 16,
    url: "/arts/gauguin/Manao Tupapau.jpg",
    owner_id: 3,
  }).execute();
  await db.insertInto("art").values({
    name: "Quand te maries-tu ?",
    movement_id: 5,
    url: "/arts/gauguin/Quand te maries-tu.jpg",
    owner_id: 3,
  }).execute();

  // Pablo Picasso
  await db.insertInto("artist").values({
    first_name: "Pablo",
    last_name: "Picasso",
    gender: "Homme",
    avatar_url: "/arts/picasso/Autoportrait.jpg",
    signature: "/signs/picasso.png",
    color: "#3f6993",
    slug: "picasso",
  }).execute();
  await db.insertInto("art").values({
    name: "Fillette à la corbeille fleurie",
    movement_id: 7,
    url: "/arts/picasso/Fillette à la corbeille fleurie.jpg",
    owner_id: 4,
  }).execute();
  await db.insertInto("art").values({
    name: "La famille de saltimbanques",
    movement_id: 7,
    url: "/arts/picasso/La famille de saltimbanques.jpg",
    owner_id: 4,
  }).execute();
  await db.insertInto("art").values({
    name: "La Vie",
    movement_id: 7,
    url: "/arts/picasso/La Vie.jpg",
    owner_id: 4,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Demoiselles d'Avignon",
    movement_id: 6,
    url: "/arts/picasso/Les Demoiselles d'Avignon.jpg",
    owner_id: 4,
  }).execute();

  // Rembrandt
  await db.insertInto("artist").values({
    last_name: "Rembrandt",
    gender: "Homme",
    avatar_url:
      "/arts/rembrandt/Autoportrait avec fourrure, chaîne en or et boucles d'oreille.jpg",
    signature: "/signs/rembrandt.png",
    color: "#654a2d",
    slug: "rembrandt",
  }).execute();
  await db.insertInto("art").values({
    name: "Bethsabée au bain tenant la lettre de David",
    movement_id: 4,
    url: "/arts/rembrandt/Bethsabée au bain tenant la lettre de David.jpg",
    owner_id: 5,
  }).execute();
  await db.insertInto("art").values({
    name: "La Leçon d'anatomie du docteur Tulp",
    movement_id: 4,
    url: "/arts/rembrandt/La Leçon d'anatomie du docteur Tulp.jpg",
    owner_id: 5,
  }).execute();
  await db.insertInto("art").values({
    name: "La Ronde de nuit",
    movement_id: 4,
    url: "/arts/rembrandt/La Ronde de nuit.jpg",
    owner_id: 5,
  }).execute();

  // Vincent van Gogh
  await db.insertInto("artist").values({
    first_name: "Vincent",
    last_name: "van Gogh",
    gender: "Homme",
    avatar_url: "/arts/van gogh/Autoportrait.jpg",
    signature: "/signs/van gogh.png",
    color: "#61a1e9",
    slug: "vangogh",
  }).execute();
  await db.insertInto("art").values({
    name: "La Chambre de Van Gogh à Arles",
    movement_id: 16,
    url: "/arts/van gogh/La Chambre de Van Gogh à Arles.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "La Maison blanche, la nuit",
    movement_id: 16,
    url: "/arts/van gogh/La Maison blanche, la nuit.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "La Nuit étoilée",
    movement_id: 16,
    url: "/arts/van gogh/La Nuit étoilée.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Mangeurs de pommes de terre",
    movement_id: 18,
    url: "/arts/van gogh/Les Mangeurs de pommes de terre.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Tournesols",
    movement_id: 16,
    url: "/arts/van gogh/Les Tournesols.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Portrait du docteur Gachet avec branche de digitale",
    movement_id: 16,
    url:
      "/arts/van gogh/Portrait du docteur Gachet avec branche de digitale.jpg",
    owner_id: 6,
  }).execute();
  await db.insertInto("art").values({
    name: "Terrasse du café le soir",
    movement_id: 16,
    url: "/arts/van gogh/Terrasse du café le soir.jpg",
    owner_id: 6,
  }).execute();

  // Édouard Manet
  await db.insertInto("artist").values({
    first_name: "Édouard",
    last_name: "Manet",
    gender: "Homme",
    avatar_url: "/arts/manet/Autoportrait à la palette.jpg",
    signature: "/signs/manet.png",
    slug: "manet",
  }).execute();
  await db.insertInto("art").values({
    name: "Le Déjeuner sur l'herbe",
    movement_id: 10,
    url: "/arts/manet/Le Déjeuner sur l'herbe.jpg",
    owner_id: 7,
  }).execute();
  await db.insertInto("art").values({
    name: "Olympia",
    movement_id: 18,
    url: "/arts/manet/Olympia.jpg",
    owner_id: 7,
  }).execute();

  // Frida Kahlo
  await db.insertInto("artist").values({
    first_name: "Frida",
    last_name: "Kahlo",
    gender: "Femme",
    avatar_url: "/arts/kahlo/Autoportrait au collier d'épines et colibri.jpg",
    signature: "/signs/kahlo.png",
    color: "#111113",
    slug: "kahlo",
  }).execute();
  await db.insertInto("art").values({
    name: "Les Fruits de la Terre",
    movement_id: 2,
    url: "/arts/kahlo/Les Fruits de la Terre.jpg",
    owner_id: 8,
  }).execute();
  await db.insertInto("art").values({
    name: "Ma naissance",
    movement_id: 2,
    url: "/arts/kahlo/Ma naissance.jpg",
    owner_id: 8,
  }).execute();
  await db.insertInto("art").values({
    name: "Pitahayas",
    movement_id: 2,
    url: "/arts/kahlo/Pitahayas.jpg",
    owner_id: 8,
  }).execute();

  // Gustav Klimt
  await db.insertInto("artist").values({
    first_name: "Gustav",
    last_name: "Klimt",
    gender: "Homme",
    avatar_url: "/arts/klimt/Autoportrait.jpg",
    signature: "/signs/klimt.png",
    color: "#15334f",
    slug: "klimt",
  }).execute();
  await db.insertInto("art").values({
    name: "Danaé",
    movement_id: 3,
    url: "/arts/klimt/Danaé.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "La Vie et la Mort",
    movement_id: 3,
    url: "/arts/klimt/La Vie et la Mort.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Baiser",
    movement_id: 3,
    url: "/arts/klimt/Le Baiser.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Vierges",
    movement_id: 3,
    url: "/arts/klimt/Les Vierges.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Espoir II",
    movement_id: 3,
    url: "/arts/klimt/L'Espoir II.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "Portrait d'Adele Bloch-Bauer I",
    movement_id: 3,
    url: "/arts/klimt/Portrait d'Adele Bloch-Bauer I.jpg",
    owner_id: 9,
  }).execute();

  // Michel-Ange
  await db.insertInto("artist").values({
    last_name: "Michel-Ange",
    gender: "Homme",
    avatar_url: "/arts/michel-ange/Autoportrait.jpg",
    signature: "/signs/michel-ange.png",
    slug: "michel-ange",
  }).execute();
  await db.insertInto("art").values({
    name: "La Conversion de saint Paul",
    movement_id: 20,
    url: "/arts/michel-ange/La Conversion de saint Paul.jpg",
    owner_id: 10,
  }).execute();
  await db.insertInto("art").values({
    name: "La Création d'Adam",
    movement_id: 9,
    url: "/arts/michel-ange/La Création d'Adam.jpg",
    owner_id: 10,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Jugement dernier",
    movement_id: 20,
    url: "/arts/michel-ange/Le Jugement dernier.jpg",
    owner_id: 10,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Tourment de saint Antoine",
    movement_id: 20,
    url: "/arts/michel-ange/Le Tourment de saint Antoine.jpg",
    owner_id: 10,
  }).execute();

  // Léonard de Vinci
  await db.insertInto("artist").values({
    first_name: "Léonard",
    last_name: "de Vinci",
    gender: "Homme",
    avatar_url: "/arts/de vinci/Portrait d'un vieil homme.jpg",
    signature: "/signs/de vinci.png",
    slug: "devinci",
  }).execute();
  await db.insertInto("art").values({
    name: "La Cène",
    movement_id: 9,
    url: "/arts/de vinci/La Cène.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "La Joconde",
    movement_id: 9,
    url: "/arts/de vinci/La Joconde.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "Saint Jean-Baptiste",
    movement_id: 9,
    url: "/arts/de vinci/Saint Jean-Baptiste.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "Sainte Anne, la Vierge et l'Enfant Jésus jouant avec un agneau",
    movement_id: 9,
    url:
      "/arts/de vinci/Sainte Anne, la Vierge et l'Enfant Jésus jouant avec un agneau.jpg",
    owner_id: 11,
  }).execute();

  // Salvador Dalí
  await db.insertInto("artist").values({
    first_name: "Salvador",
    last_name: "Dalí",
    gender: "Homme",
    avatar_url: "/arts/dali/Autoportrait mou avec du lard grillé.jpg",
    signature: "/signs/dali.png",
    slug: "dali",
  }).execute();
  await db.insertInto("art").values({
    name: "Galacidalacidesoxyribonucleicacid",
    movement_id: 23,
    url: "/arts/dali/Galacidalacidesoxyribonucleicacid.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "La Persistance de la mémoire",
    movement_id: 23,
    url: "/arts/dali/La Persistance de la mémoire.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Grand Masturbateur",
    movement_id: 23,
    url: "/arts/dali/Le Grand Masturbateur.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Miel est plus doux que le sang",
    movement_id: 23,
    url: "/arts/dali/Le Miel est plus doux que le sang.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "Leda atomica",
    movement_id: 23,
    url: "/arts/dali/Leda atomica.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name:
      "Ma femme, nue, regardant son propre corps devenir, trois vertèbres d'une colonne, ciel et architecture",
    movement_id: 23,
    url:
      "/arts/dali/Ma femme, nue, regardant son propre corps devenir, trois vertèbres d'une colonne, ciel et architecture.jpg",
    owner_id: 12,
  }).execute();

  // Claude Monet
  await db.insertInto("artist").values({
    first_name: "Claude",
    last_name: "Monet",
    gender: "Homme",
    avatar_url: "/arts/monet/Autoportrait au béret.jpg",
    signature: "/signs/monet.png",
    color: "#444061",
    slug: "monet",
  }).execute();
  await db.insertInto("art").values({
    name: "Impression, soleil levant",
    movement_id: 10,
    url: "/arts/monet/Impression, soleil levant.jpg",
    owner_id: 13,
  }).execute();
  await db.insertInto("art").values({
    name: "Meules",
    movement_id: 10,
    url: "/arts/monet/Meules.jpg",
    owner_id: 13,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Nymphéas",
    movement_id: 10,
    url: "/arts/monet/Les Nymphéas.jpg",
    owner_id: 13,
  }).execute();

  // Auguste Renoir
  await db.insertInto("artist").values({
    first_name: "Auguste",
    last_name: "Renoir",
    gender: "Homme",
    avatar_url: "/arts/renoir/Autoportrait.jpg",
    signature: "/signs/renoir.png",
    color: "#3c2736",
    slug: "renoir",
  }).execute();
  await db.insertInto("art").values({
    name: "Bal du moulin de la Galette",
    movement_id: 10,
    url: "/arts/renoir/Bal du moulin de la Galette.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "Jeunes filles en noir",
    movement_id: 10,
    url: "/arts/renoir/Jeunes filles en noir.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "La Grenouillère",
    movement_id: 10,
    url: "/arts/renoir/La Grenouillère.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "La Loge",
    movement_id: 10,
    url: "/arts/renoir/La Loge.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Déjeuner des canotiers",
    movement_id: 10,
    url: "/arts/renoir/Le Déjeuner des canotiers.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Deux Sœurs",
    movement_id: 10,
    url: "/arts/renoir/Les Deux Sœurs.jpg",
    owner_id: 14,
  }).execute();

  // Artemisia Gentileschi
  await db.insertInto("artist").values({
    first_name: "Artemisia",
    last_name: "Gentileschi",
    gender: "Femme",
    avatar_url:
      "/arts/gentileschi/Autoportrait en allégorie de la peinture.jpg",
    signature: "/signs/gentileschi.png",
    color: "#606841",
    slug: "gentileschi",
  }).execute();
  await db.insertInto("art").values({
    name: "Suzanne et les vieillards",
    movement_id: 4,
    url: "/arts/gentileschi/Suzanne et les vieillards.jpg",
    owner_id: 15,
  }).execute();

  // Paul Cézanne
  await db.insertInto("artist").values({
    first_name: "Paul",
    last_name: "Cézanne",
    gender: "Homme",
    avatar_url: "/arts/cezanne/Autoportrait au fond rose.jpg",
    signature: "/signs/cezanne.png",
    slug: "cezanne",
  }).execute();
  await db.insertInto("art").values({
    name: "Nature morte aux pommes et aux oranges",
    movement_id: 16,
    url: "/arts/cezanne/Nature morte aux pommes et aux oranges.jpg",
    owner_id: 16,
  }).execute();

  // Johannes Vermeer
  await db.insertInto("artist").values({
    first_name: "Johannes",
    last_name: "Vermeer",
    gender: "Homme",
    avatar_url: "/arts/vermeer/Autoportrait.jpg",
    signature: "/signs/vermeer.png",
    slug: "vermeer",
  }).execute();
  await db.insertInto("art").values({
    name: "Dame jouant du virginal",
    movement_id: 4,
    url: "/arts/vermeer/Dame jouant du virginal.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "La Jeune Fille à la perle",
    movement_id: 4,
    url: "/arts/vermeer/La Jeune Fille à la perle.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "La Laitière",
    movement_id: 4,
    url: "/arts/vermeer/La Laitière.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Art de la peinture",
    movement_id: 4,
    url: "/arts/vermeer/L'Art de la peinture.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Entremetteuse",
    movement_id: 4,
    url: "/arts/vermeer/L'Entremetteuse.jpg",
    owner_id: 17,
  }).execute();

  // Berthe Morisot
  await db.insertInto("artist").values({
    first_name: "Berthe",
    last_name: "Morisot",
    gender: "Femme",
    avatar_url: "/arts/morisot/Autoportrait.jpg",
    signature: "/signs/morisot.png",
    color: "#907935",
    slug: "morisot",
  }).execute();
  await db.insertInto("art").values({
    name: "Bateaux sur la Seine",
    movement_id: 10,
    url: "/arts/morisot/Bateaux sur la Seine.jpg",
    owner_id: 18,
  }).execute();

  // Marc Chagall
  await db.insertInto("artist").values({
    first_name: "Marc",
    last_name: "Chagall",
    gender: "Homme",
    avatar_url: "/arts/chagall/Autoportrait.jpg",
    signature: "/signs/chagall.png",
    slug: "chagall",
  }).execute();
  await db.insertInto("art").values({
    name: "Dédié à ma fiancée",
    movement_id: 7,
    url: "/arts/chagall/Dédié à ma fiancée.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Golgotha",
    movement_id: 6,
    url: "/arts/chagall/Golgotha.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Violoniste",
    movement_id: 6,
    url: "/arts/chagall/Le Violoniste.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Nature morte",
    movement_id: 6,
    url: "/arts/chagall/Nature morte.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Paris par la fenêtre",
    movement_id: 6,
    url: "/arts/chagall/Paris par la fenêtre.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Trois heures et demie (Le poète)",
    movement_id: 6,
    url: "/arts/chagall/Trois heures et demie (Le poète).jpg",
    owner_id: 19,
  }).execute();

  // Titien
  await db.insertInto("artist").values({
    last_name: "Titien",
    gender: "Homme",
    avatar_url: "/arts/titien/Autoportrait.jpg",
    signature: "/signs/titien.png",
    slug: "titien",
  }).execute();
  await db.insertInto("art").values({
    name: "Bacchus et Ariane",
    movement_id: 9,
    url: "/arts/titien/Bacchus et Ariane.jpg",
    owner_id: 20,
  }).execute();
  await db.insertInto("art").values({
    name: "Caïn et Abel",
    movement_id: 11,
    url: "/arts/titien/Caïn et Abel.jpg",
    owner_id: 20,
  }).execute();

  // Rosa Bonheur
  await db.insertInto("artist").values({
    first_name: "Rosa",
    last_name: "Bonheur",
    gender: "Femme",
    avatar_url: "/arts/bonheur/Autoportrait.jpg",
    signature: "/signs/bonheur.png",
    slug: "bonheur",
  }).execute();
  await db.insertInto("art").values({
    name: "Biches et cerf au repos",
    movement_id: 22,
    url: "/arts/bonheur/Biches et cerf au repos.jpg",
    owner_id: 21,
  }).execute();
  await db.insertInto("art").values({
    name: "La foire du cheval",
    movement_id: 18,
    url: "/arts/bonheur/La foire du cheval.jpg",
    owner_id: 21,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Roi de la forêt",
    movement_id: 18,
    url: "/arts/bonheur/Le Roi de la forêt.jpg",
    owner_id: 21,
  }).execute();

  // Camille Pissarro
  await db.insertInto("artist").values({
    first_name: "Camille",
    last_name: "Pissarro",
    gender: "Homme",
    avatar_url: "/arts/pissarro/Autoportrait.jpg",
    signature: "/signs/pissarro.png",
    color: "#674e38",
    slug: "pissarro",
  }).execute();
  await db.insertInto("art").values({
    name: "Boulevard Montmartre, printemps",
    movement_id: 10,
    url: "/arts/pissarro/Boulevard Montmartre, printemps.jpg",
    owner_id: 22,
  }).execute();

  // Henri Matisse
  await db.insertInto("artist").values({
    first_name: "Henri",
    last_name: "Matisse",
    gender: "Homme",
    avatar_url: "/arts/matisse/Autoportrait.jpg",
    signature: "/signs/matisse.png",
    color: "#272f24",
    slug: "matisse",
  }).execute();
  await db.insertInto("art").values({
    name: "Femme au chapeau",
    movement_id: 8,
    url: "/arts/matisse/Femme au chapeau.jpg",
    owner_id: 23,
  }).execute();
  await db.insertInto("art").values({
    name: "La Joie de vivre",
    movement_id: 8,
    url: "/arts/matisse/La Joie de vivre.jpg",
    owner_id: 23,
  }).execute();
  await db.insertInto("art").values({
    name: "Luxe, Calme et Volupté",
    movement_id: 15,
    url: "/arts/matisse/Luxe, Calme et Volupté.jpg",
    owner_id: 23,
  }).execute();

  // Élisabeth Vigée Le Brun
  await db.insertInto("artist").values({
    first_name: "Élisabeth",
    last_name: "Vigée Le Brun",
    gender: "Femme",
    avatar_url: "/arts/le brun/Autoportrait.jpg",
    signature: "/signs/le brun.png",
    slug: "lebrun",
  }).execute();
  await db.insertInto("art").values({
    name: "La Paix ramenant l'Abondance",
    movement_id: 21,
    url: "/arts/le brun/La Paix ramenant l'Abondance.jpg",
    owner_id: 24,
  }).execute();
  await db.insertInto("art").values({
    name: "Marie-Antoinette à la rose",
    movement_id: 21,
    url: "/arts/le brun/Marie-Antoinette à la rose.jpg",
    owner_id: 24,
  }).execute();

  // Paul Véronèse
  await db.insertInto("artist").values({
    first_name: "Paul",
    last_name: "Véronèse",
    gender: "Homme",
    avatar_url: "/arts/veronese/Autoportrait.jpg",
    signature: "/signs/veronese.png",
    slug: "veronese",
  }).execute();
  await db.insertInto("art").values({
    name: "La Bataille de Lépante",
    movement_id: 11,
    url: "/arts/veronese/La Bataille de Lépante.jpg",
    owner_id: 25,
  }).execute();
  await db.insertInto("art").values({
    name: "Mars et Vénus réunis par Cupidon",
    movement_id: 11,
    url: "/arts/veronese/Mars et Vénus réunis par Cupidon.jpg",
    owner_id: 25,
  }).execute();

  // Norman Rockwell
  await db.insertInto("artist").values({
    first_name: "Norman",
    last_name: "Rockwell",
    gender: "Homme",
    avatar_url: "/arts/rockwell/Autoportrait.jpg",
    signature: "/signs/rockwell.png",
    slug: "rockwell",
  }).execute();
  await db.insertInto("art").values({
    name: "Triple autoportrait",
    movement_id: 19,
    url: "/arts/rockwell/Triple autoportrait.jpg",
    owner_id: 26,
  }).execute();

  // Henri Rousseau
  await db.insertInto("artist").values({
    first_name: "Henri",
    last_name: "Rousseau",
    gender: "Homme",
    avatar_url: "/arts/rousseau/Autoportrait avec une lampe.jpg",
    signature: "/signs/rousseau.png",
    color: "#050100",
    slug: "rousseau",
  }).execute();
  await db.insertInto("art").values({
    name: "Combat de tigre et buffle",
    movement_id: 2,
    url: "/arts/rousseau/Combat de tigre et buffle.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "L’Octroi",
    movement_id: 2,
    url: "/arts/rousseau/L’Octroi.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "La Bohémienne endormie",
    movement_id: 2,
    url: "/arts/rousseau/La Bohémienne endormie.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "La Charmeuse de serpents",
    movement_id: 2,
    url: "/arts/rousseau/La Charmeuse de serpents.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "La Seine à Suresnes",
    movement_id: 2,
    url: "/arts/rousseau/La Seine à Suresnes.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Le lion, ayant faim, se jette sur l’antilope",
    movement_id: 2,
    url: "/arts/rousseau/Le lion, ayant faim, se jette sur l’antilope.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Moulin d’Alfort",
    movement_id: 2,
    url: "/arts/rousseau/Le Moulin d’Alfort.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Repas du lion",
    movement_id: 2,
    url: "/arts/rousseau/Le Repas du lion.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Rêve",
    movement_id: 2,
    url: "/arts/rousseau/Le Rêve.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Moi-même",
    movement_id: 2,
    url: "/arts/rousseau/Moi-même.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Paysage d’Alger",
    movement_id: 2,
    url: "/arts/rousseau/Paysage d’Alger.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Portrait de Monsieur X",
    movement_id: 2,
    url: "/arts/rousseau/Portrait de Monsieur X.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Une soirée au carnaval",
    movement_id: 2,
    url: "/arts/rousseau/Une soirée au carnaval.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Vue de Billancourt et Bas-Meudon",
    movement_id: 2,
    url: "/arts/rousseau/Vue de Billancourt et Bas-Meudon.jpg",
    owner_id: 27,
  }).execute();
  await db.insertInto("art").values({
    name: "Vue du Pont de Sèvres",
    movement_id: 2,
    url: "/arts/rousseau/Vue du Pont de Sèvres.jpg",
    owner_id: 27,
  }).execute();

  // Jacques-Louis David
  await db.insertInto("artist").values({
    first_name: "Jacques-Louis",
    last_name: "David",
    gender: "Homme",
    avatar_url: "/arts/david/Autoportrait.jpg",
    signature: "/signs/david.png",
    color: "#6c4b3a",
    slug: "david",
  }).execute();
  await db.insertInto("art").values({
    name: "Bonaparte franchissant le Grand-Saint-Bernard",
    movement_id: 12,
    url: "/arts/david/Bonaparte franchissant le Grand-Saint-Bernard.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Combat de Mars contre Minerve",
    movement_id: 12,
    url: "/arts/david/Combat de Mars contre Minerve.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Diane et Apollon perçant de leurs flèches les enfants de Niobé",
    movement_id: 12,
    url:
      "/arts/david/Diane et Apollon perçant de leurs flèches les enfants de Niobé.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Érasistrate découvrant la cause de la maladie d'Antiochius",
    movement_id: 12,
    url:
      "/arts/david/Érasistrate découvrant la cause de la maladie d'Antiochius.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "La Distribution des aigles",
    movement_id: 12,
    url: "/arts/david/La Distribution des aigles.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "La Douleur d'Andromaque",
    movement_id: 12,
    url: "/arts/david/La Douleur d'Andromaque.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "La Mort de Marat",
    movement_id: 12,
    url: "/arts/david/La Mort de Marat.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "La Mort de Socrate",
    movement_id: 12,
    url: "/arts/david/La Mort de Socrate.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Sacre de Napoléon",
    movement_id: 12,
    url: "/arts/david/Le Sacre de Napoléon.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Serment des Horaces",
    movement_id: 12,
    url: "/arts/david/Le Serment des Horaces.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Léonidas aux Thermopyles",
    movement_id: 12,
    url: "/arts/david/Léonidas aux Thermopyles.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Funérailles de Patrocle",
    movement_id: 12,
    url: "/arts/david/Les Funérailles de Patrocle.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Les licteurs rapportent à Brutus les corps de ses fils",
    movement_id: 12,
    url:
      "/arts/david/Les licteurs rapportent à Brutus les corps de ses fils.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Sabines",
    movement_id: 12,
    url: "/arts/david/Les Sabines.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Mars désarmé par Vénus",
    movement_id: 12,
    url: "/arts/david/Mars désarmé par Vénus.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Napoléon dans son cabinet de travail",
    movement_id: 12,
    url: "/arts/david/Napoléon dans son cabinet de travail.jpg",
    owner_id: 28,
  }).execute();
  await db.insertInto("art").values({
    name: "Saint Roch intercédant la Vierge",
    movement_id: 12,
    url: "/arts/david/Saint Roch intercédant la Vierge.jpg",
    owner_id: 28,
  }).execute();

  // Le Caravage
  await db.insertInto("artist").values({
    last_name: "Le Caravage",
    gender: "Homme",
    avatar_url: "/arts/le caravage/Autoportrait.jpg",
    signature: "/signs/le caravage.png",
    slug: "lecaravage",
  }).execute();
  await db.insertInto("art").values({
    name: "David avec la tête de Goliath",
    movement_id: 4,
    url: "/arts/le caravage/David avec la tête de Goliath.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "Garçon avec un panier de fruits",
    movement_id: 4,
    url: "/arts/le caravage/Garçon avec un panier de fruits.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "La Conversion de saint Paul",
    movement_id: 4,
    url: "/arts/le caravage/La Conversion de saint Paul.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "La Madone des pèlerins",
    movement_id: 4,
    url: "/arts/le caravage/La Madone des pèlerins.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "La Mort de la Vierge",
    movement_id: 4,
    url: "/arts/le caravage/La Mort de la Vierge.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "La Vocation de saint Matthieu",
    movement_id: 4,
    url: "/arts/le caravage/La Vocation de saint Matthieu.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Christ à la colonne",
    movement_id: 4,
    url: "/arts/le caravage/Le Christ à la colonne.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Martyre de saint Matthieu",
    movement_id: 4,
    url: "/arts/le caravage/Le Martyre de saint Matthieu.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Sept Œuvres de miséricorde",
    movement_id: 4,
    url: "/arts/le caravage/Les Sept Œuvres de miséricorde.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Tricheurs",
    movement_id: 4,
    url: "/arts/le caravage/Les Tricheurs.jpg",
    owner_id: 29,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Incrédulité de saint Thomas",
    movement_id: 4,
    url: "/arts/le caravage/L'Incrédulité de saint Thomas.jpg",
    owner_id: 29,
  }).execute();

  // Le Tintoret
  await db.insertInto("artist").values({
    last_name: "Le Tintoret",
    gender: "Homme",
    avatar_url: "/arts/le tintoret/Autoportrait.jpg",
    signature: "/signs/le tintoret.png",
    slug: "letintoret",
  }).execute();
  await db.insertInto("art").values({
    name: "La Cène",
    movement_id: 11,
    url: "/arts/le tintoret/La Cène.jpg",
    owner_id: 30,
  }).execute();
  await db.insertInto("art").values({
    name: "Lamentations sur le Christ mort",
    movement_id: 11,
    url: "/arts/le tintoret/Lamentations sur le Christ mort.jpg",
    owner_id: 30,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Enlèvement du corps de saint Marc",
    movement_id: 11,
    url: "/arts/le tintoret/L'Enlèvement du corps de saint Marc.jpg",
    owner_id: 30,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Origine de la Voie Lactée",
    movement_id: 11,
    url: "/arts/le tintoret/L'Origine de la Voie Lactée.jpg",
    owner_id: 30,
  }).execute();
  await db.insertInto("art").values({
    name: "Miracle de l'esclave",
    movement_id: 11,
    url: "/arts/le tintoret/Miracle de l'esclave.jpg",
    owner_id: 30,
  }).execute();
  await db.insertInto("art").values({
    name: "Présentation de la Vierge au temple",
    movement_id: 11,
    url: "/arts/le tintoret/Présentation de la Vierge au temple.jpg",
    owner_id: 30,
  }).execute();
  await db.insertInto("art").values({
    name: "Saint Georges et le dragon",
    movement_id: 11,
    url: "/arts/le tintoret/Saint Georges et le dragon.jpg",
    owner_id: 30,
  }).execute();

  // Raphaël
  await db.insertInto("artist").values({
    last_name: "Raphaël",
    gender: "Homme",
    avatar_url: "/arts/raphael/Autoportrait.jpg",
    signature: "/signs/raphael.png",
    slug: "raphael",
  }).execute();
  await db.insertInto("art").values({
    name: "La Fornarina",
    movement_id: 9,
    url: "/arts/raphael/La Fornarina.jpg",
    owner_id: 31,
  }).execute();
  await db.insertInto("art").values({
    name: "La Résurrection du Christ",
    movement_id: 9,
    url: "/arts/raphael/La Résurrection du Christ.jpg",
    owner_id: 31,
  }).execute();
  await db.insertInto("art").values({
    name: "La Transfiguration",
    movement_id: 9,
    url: "/arts/raphael/La Transfiguration.jpg",
    owner_id: 31,
  }).execute();
  await db.insertInto("art").values({
    name: "Madone à la prairie",
    movement_id: 9,
    url: "/arts/raphael/Madone à la prairie.jpg",
    owner_id: 31,
  }).execute();
  await db.insertInto("art").values({
    name: "Saint George et le dragon",
    movement_id: 9,
    url: "/arts/raphael/Saint George et le dragon.jpg",
    owner_id: 31,
  }).execute();
  await db.insertInto("art").values({
    name: "Sainte Catherine d'Alexandrie",
    movement_id: 9,
    url: "/arts/raphael/Sainte Catherine d'Alexandrie.jpg",
    owner_id: 31,
  }).execute();

  // Amedeo Modigliani
  await db.insertInto("artist").values({
    first_name: "Amedeo",
    last_name: "Modigliani",
    gender: "Homme",
    avatar_url: "/arts/modigliani/Autoportrait.jpg",
    signature: "/signs/modigliani.png",
    color: "#9e4e43",
    slug: "modigliani",
  }).execute();
  await db.insertInto("art").values({
    name: "Femme à la cravate noire",
    movement_id: 7,
    url: "/arts/modigliani/Femme à la cravate noire.jpg",
    owner_id: 32,
  }).execute();
  await db.insertInto("art").values({
    name: "La Femme à l'éventail",
    movement_id: 7,
    url: "/arts/modigliani/La Femme à l'éventail.jpg",
    owner_id: 32,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Violoncelliste",
    movement_id: 7,
    url: "/arts/modigliani/Le Violoncelliste.jpg",
    owner_id: 32,
  }).execute();
  await db.insertInto("art").values({
    name: "Nu allongé sur un oreiller blanc",
    movement_id: 7,
    url: "/arts/modigliani/Nu allongé sur un oreiller blanc.jpg",
    owner_id: 32,
  }).execute();
  await db.insertInto("art").values({
    name: "Nu couché",
    movement_id: 7,
    url: "/arts/modigliani/Nu couché.jpg",
    owner_id: 32,
  }).execute();

  // Giuseppe Arcimboldo
  await db.insertInto("artist").values({
    first_name: "Giuseppe",
    last_name: "Arcimboldo",
    gender: "Homme",
    avatar_url: "/arts/arcimboldo/Autoportrait.jpg",
    color: "#304b5c",
    slug: "arcimboldo",
  }).execute();
  await db.insertInto("art").values({
    name: "La Terre",
    movement_id: 11,
    url: "/arts/arcimboldo/La Terre.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Air",
    movement_id: 11,
    url: "/arts/arcimboldo/L'Air.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Automne",
    movement_id: 11,
    url: "/arts/arcimboldo/L'Automne.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Printemps",
    movement_id: 11,
    url: "/arts/arcimboldo/Le Printemps.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Eau",
    movement_id: 11,
    url: "/arts/arcimboldo/L'Eau.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "Les quatre saisons en une seule tête",
    movement_id: 11,
    url: "/arts/arcimboldo/Les quatre saisons en une seule tête.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Été",
    movement_id: 11,
    url: "/arts/arcimboldo/L'Été.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Hiver",
    movement_id: 11,
    url: "/arts/arcimboldo/L'Hiver.jpg",
    owner_id: 33,
  }).execute();
  await db.insertInto("art").values({
    name: "Vertumne",
    movement_id: 11,
    url: "/arts/arcimboldo/Vertumne.jpg",
    owner_id: 33,
  }).execute();

  // Stanislaw Wyspianski
  await db.insertInto("artist").values({
    first_name: "Stanislaw",
    last_name: "Wyspianski",
    gender: "Homme",
    avatar_url: "/arts/wyspianski/Autoportrait.jpg",
    signature: "/signs/wyspianski.png",
    slug: "wyspianski",
  }).execute();
  await db.insertInto("art").values({
    name: "Courbes de la Vistule et le château du Wawel",
    movement_id: 7,
    url: "/arts/wyspianski/Courbes de la Vistule et le château du Wawel.jpg",
    owner_id: 34,
  }).execute();
  await db.insertInto("art").values({
    name: "Enfant avec un vase avec des fleurs",
    movement_id: 3,
    url: "/arts/wyspianski/Enfant avec un vase avec des fleurs.jpg",
    owner_id: 34,
  }).execute();
  await db.insertInto("art").values({
    name: "Iris",
    movement_id: 7,
    url: "/arts/wyspianski/Iris.jpg",
    owner_id: 34,
  }).execute();
  await db.insertInto("art").values({
    name: "Maternité",
    movement_id: 3,
    url: "/arts/wyspianski/Maternité.jpg",
    owner_id: 34,
  }).execute();
  await db.insertInto("art").values({
    name: "Parc Planty de Cracovie, la nuit",
    movement_id: 24,
    url: "/arts/wyspianski/Parc Planty de Cracovie, la nuit.jpg",
    owner_id: 34,
  }).execute();

  // Sandro Botticelli
  await db.insertInto("artist").values({
    first_name: "Sandro",
    last_name: "Botticelli",
    gender: "Homme",
    avatar_url: "/arts/botticelli/Autoportrait.jpg",
    signature: "/signs/botticelli.png",
    slug: "botticelli",
  }).execute();
  await db.insertInto("art").values({
    name: "La Calomnie d'Apelle",
    movement_id: 17,
    url: "/arts/botticelli/La Calomnie d'Apelle.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "La Naissance de Vénus",
    movement_id: 17,
    url: "/arts/botticelli/La Naissance de Vénus.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "La Punition des rebelles",
    movement_id: 17,
    url: "/arts/botticelli/La Punition des rebelles.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "La Vierge à l'Enfant avec un ange",
    movement_id: 17,
    url: "/arts/botticelli/La Vierge à l'Enfant avec un ange.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Adoration des mages",
    movement_id: 17,
    url: "/arts/botticelli/L'Adoration des mages.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Annonciation du Cestello",
    movement_id: 17,
    url: "/arts/botticelli/L'Annonciation du Cestello.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Printemps",
    movement_id: 17,
    url: "/arts/botticelli/Le Printemps.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "Pallas et le Centaure",
    movement_id: 17,
    url: "/arts/botticelli/Pallas et le Centaure.jpg",
    owner_id: 35,
  }).execute();
  await db.insertInto("art").values({
    name: "Vénus et Mars",
    movement_id: 17,
    url: "/arts/botticelli/Vénus et Mars.jpg",
    owner_id: 35,
  }).execute();

  // Pierre Paul Rubens
  await db.insertInto("artist").values({
    first_name: "Pierre Paul",
    last_name: "Rubens",
    gender: "Homme",
    avatar_url: "/arts/rubens/Autoportrait.jpg",
    signature: "/signs/rubens.png",
    slug: "rubens",
  }).execute();
  await db.insertInto("art").values({
    name: "La Chasse à l'hippopotame et au crocodile",
    movement_id: 4,
    url: "/arts/rubens/La Chasse à l'hippopotame et au crocodile.jpg",
    owner_id: 36,
  }).execute();
  await db.insertInto("art").values({
    name: "La Chasse au lion et au léopard",
    movement_id: 4,
    url: "/arts/rubens/La Chasse au lion et au léopard.jpg",
    owner_id: 36,
  }).execute();
  await db.insertInto("art").values({
    name: "La Chasse au loup et au renard",
    movement_id: 4,
    url: "/arts/rubens/La Chasse au loup et au renard.jpg",
    owner_id: 36,
  }).execute();
  await db.insertInto("art").values({
    name: "La Chasse au sanglier",
    movement_id: 4,
    url: "/arts/rubens/La Chasse au sanglier.jpg",
    owner_id: 36,
  }).execute();
  await db.insertInto("art").values({
    name: "La Chasse au tigre",
    movement_id: 4,
    url: "/arts/rubens/La Chasse au tigre.jpg",
    owner_id: 36,
  }).execute();

  // Paul Sérusier
  await db.insertInto("artist").values({
    first_name: "Paul",
    last_name: "Sérusier",
    gender: "Homme",
    avatar_url: "/arts/serusier/Autoportrait.jpg",
    signature: "/signs/serusier.png",
    slug: "serusier",
  }).execute();
  await db.insertInto("art").values({
    name: "Le Talisman",
    movement_id: 25,
    url: "/arts/serusier/Le Talisman.jpg",
    owner_id: 37,
  }).execute();

  // Gustave Courbet
  await db.insertInto("artist").values({
    first_name: "Gustave",
    last_name: "Courbet",
    gender: "Homme",
    avatar_url: "/arts/courbet/L'homme à la pipe.jpg",
    signature: "/signs/courbet.png",
    color: "#2f6468",
    slug: "courbet",
  }).execute();
  await db.insertInto("art").values({
    name: "Bonjour Monsieur Courbet",
    movement_id: 18,
    url: "/arts/courbet/Bonjour Monsieur Courbet.jpg",
    owner_id: 38,
  }).execute();
  await db.insertInto("art").values({
    name: "Fleurs dans un vase",
    movement_id: 18,
    url: "/arts/courbet/Fleurs dans un vase.jpg",
    owner_id: 38,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Atelier du peintre",
    movement_id: 18,
    url: "/arts/courbet/L'Atelier du peintre.jpg",
    owner_id: 38,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Chêne de Flagey",
    movement_id: 18,
    url: "/arts/courbet/Le Chêne de Flagey.jpg",
    owner_id: 38,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Coup de vent",
    movement_id: 18,
    url: "/arts/courbet/Le Coup de vent.jpg",
    owner_id: 38,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Déjeuner de chasse",
    movement_id: 18,
    url: "/arts/courbet/Le Déjeuner de chasse.jpg",
    owner_id: 38,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Désespéré",
    movement_id: 22,
    url: "/arts/courbet/Le Désespéré.jpg",
    owner_id: 38,
  }).execute();

  // Hans Memling
  await db.insertInto("artist").values({
    first_name: "Hans",
    last_name: "Memling",
    gender: "Homme",
    avatar_url: "/arts/memling/Autoportrait.jpg",
    color: "#495154",
    slug: "memling",
  }).execute();
  await db.insertInto("art").values({
    name: "Diptyque de Maarten van Nieuwenhove",
    movement_id: 26,
    polyptych: 2,
    url: "/arts/memling/Diptyque de Maarten van Nieuwenhove_1.jpg",
    url_2: "/arts/memling/Diptyque de Maarten van Nieuwenhove_2.jpg",
    owner_id: 39,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Jugement dernier",
    movement_id: 26,
    polyptych: 3,
    url: "/arts/memling/Le Jugement dernier_1.jpg",
    url_2: "/arts/memling/Le Jugement dernier_2.jpg",
    url_3: "/arts/memling/Le Jugement dernier_3.jpg",
    owner_id: 39,
  }).execute();
  await db.insertInto("art").values({
    name: "Scènes de la Passion du Christ",
    movement_id: 26,
    url: "/arts/memling/Scènes de la Passion du Christ.jpg",
    owner_id: 39,
  }).execute();
  await db.insertInto("art").values({
    name: "Triptyque Donne",
    movement_id: 26,
    polyptych: 3,
    url: "/arts/memling/Triptyque Donne_1.jpg",
    url_2: "/arts/memling/Triptyque Donne_2.jpg",
    url_3: "/arts/memling/Triptyque Donne_3.jpg",
    owner_id: 39,
  }).execute();

  // Mimi
  await db.insertInto("artist").values({
    last_name: "Mimi",
    gender: "Femme",
    color: "#a997f0",
    slug: "mimi",
  }).execute();
  await db.insertInto("art").values({
    name: "Âmes indiennes",
    movement_id: 27,
    polyptych: 5,
    frame: 1,
    url: "/arts/mimi/Âmes indiennes_1.jpg",
    url_2: "/arts/mimi/Âmes indiennes_2.jpg",
    url_3: "/arts/mimi/Âmes indiennes_3.jpg",
    url_4: "/arts/mimi/Âmes indiennes_4.jpg",
    url_5: "/arts/mimi/Âmes indiennes_5.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Athipik",
    movement_id: 27,
    url: "/arts/mimi/Athipik.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Bouddha penseur",
    movement_id: 27,
    polyptych: 5,
    frame: 1,
    url: "/arts/mimi/Bouddha penseur_1.jpg",
    url_2: "/arts/mimi/Bouddha penseur_2.jpg",
    url_3: "/arts/mimi/Bouddha penseur_3.jpg",
    url_4: "/arts/mimi/Bouddha penseur_4.jpg",
    url_5: "/arts/mimi/Bouddha penseur_5.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Bouddha rieur",
    movement_id: 27,
    frame: 4,
    url: "/arts/mimi/Bouddha rieur.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Brigitte Bardot",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Brigitte Bardot.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Christophe Lambert",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Christophe Lambert.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Clark Gable",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Clark Gable.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Cléopâtre",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Cléopâtre.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Corps et âmes",
    movement_id: 27,
    polyptych: 2,
    frame: 1,
    url: "/arts/mimi/Corps et âmes_1.jpg",
    url_2: "/arts/mimi/Corps et âmes_2.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Élya",
    movement_id: 27,
    frame: 4,
    url: "/arts/mimi/Élya.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Épices",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Épices.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Inconnue",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Inconnue.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Jean Marais",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Jean Marais.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Leonardo DiCaprio",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Leonardo DiCaprio.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Marcelle Derrien",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Marcelle Derrien.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Maxime",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Maxime.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Mélancolie",
    movement_id: 27,
    frame: 4,
    url: "/arts/mimi/Mélancolie.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Mère et bébé éléphant",
    movement_id: 27,
    polyptych: 3,
    frame: 1,
    url: "/arts/mimi/Mère et bébé éléphant_1.jpg",
    url_2: "/arts/mimi/Mère et bébé éléphant_2.jpg",
    url_3: "/arts/mimi/Mère et bébé éléphant_3.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Montand et Marilyn",
    movement_id: 27,
    frame: 3,
    url: "/arts/mimi/Montand et Marilyn.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Nue persienne",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Nue persienne.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Nue serpent",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Nue serpent.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Poisson Murano",
    movement_id: 27,
    frame: 4,
    url: "/arts/mimi/Poisson Murano.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Possession",
    movement_id: 27,
    polyptych: 3,
    frame: 1,
    url: "/arts/mimi/Possession_1.jpg",
    url_2: "/arts/mimi/Possession_2.jpg",
    url_3: "/arts/mimi/Possession_3.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Réflexion dorée",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Réflexion dorée.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Solitude",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Solitude.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Tamara de Lempicka",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Tamara de Lempicka.jpg",
    owner_id: 40,
  }).execute();
  await db.insertInto("art").values({
    name: "Toutânkhamon",
    movement_id: 27,
    frame: 1,
    url: "/arts/mimi/Toutânkhamon.jpg",
    owner_id: 40,
  }).execute();

  // Max Beckmann
  await db.insertInto("artist").values({
    first_name: "Max",
    last_name: "Beckmann",
    gender: "Homme",
    avatar_url: "/arts/beckmann/Autoportrait au foulard rouge.jpg",
    signature: "/signs/beckmann.png",
    slug: "beckmann",
  }).execute();
  await db.insertInto("art").values({
    name: "Naufrage du Titanic",
    movement_id: 7,
    url: "/arts/beckmann/Naufrage du Titanic.jpg",
    owner_id: 41,
  }).execute();
  await db.insertInto("art").values({
    name: "Société Paris",
    movement_id: 7,
    url: "/arts/beckmann/Société Paris.jpg",
    owner_id: 41,
  }).execute();

  // Pierre Bonnard
  await db.insertInto("artist").values({
    first_name: "Pierre",
    last_name: "Bonnard",
    gender: "Homme",
    avatar_url: "/arts/bonnard/Autoportrait.jpg",
    signature: "/signs/bonnard.png",
    slug: "bonnard",
  }).execute();
  await db.insertInto("art").values({
    name: "Femme au perroquet",
    movement_id: 16,
    url: "/arts/bonnard/Femme au perroquet.jpg",
    owner_id: 42,
  }).execute();
  await db.insertInto("art").values({
    name: "La Fenêtre ouverte",
    movement_id: 28,
    url: "/arts/bonnard/La Fenêtre ouverte.jpg",
    owner_id: 42,
  }).execute();
  await db.insertInto("art").values({
    name: "La Symphonie pastorale",
    movement_id: 16,
    url: "/arts/bonnard/La Symphonie pastorale.jpg",
    owner_id: 42,
  }).execute();
  await db.insertInto("art").values({
    name: "Nu à contre-jour",
    movement_id: 28,
    url: "/arts/bonnard/Nu à contre-jour.jpg",
    owner_id: 42,
  }).execute();

  // Lê Phổ
  await db.insertInto("artist").values({
    last_name: "Lê Phổ",
    gender: "Homme",
    avatar_url: "/arts/le pho/Autoportrait.jpg",
    signature: "/signs/le pho.png",
    slug: "lepho",
  }).execute();
  await db.insertInto("art").values({
    name: "Autoportrait dans la forêt",
    movement_id: 16,
    url: "/arts/le pho/Autoportrait dans la forêt.jpg",
    owner_id: 43,
  }).execute();
  await db.insertInto("art").values({
    name: "Hibiscus et oiseaux",
    movement_id: 16,
    url: "/arts/le pho/Hibiscus et oiseaux.jpg",
    owner_id: 43,
  }).execute();
  await db.insertInto("art").values({
    name: "Nature morte aux artichauts",
    movement_id: 16,
    url: "/arts/le pho/Nature morte aux artichauts.jpg",
    owner_id: 43,
  }).execute();
  await db.insertInto("art").values({
    name: "Portrait de femme près de pivoines",
    movement_id: 16,
    url: "/arts/le pho/Portrait de femme près de pivoines.jpg",
    owner_id: 43,
  }).execute();

  // René Magritte
  await db.insertInto("artist").values({
    first_name: "René",
    last_name: "Magritte",
    gender: "Homme",
    avatar_url: "/arts/magritte/Autoportrait.jpg",
    signature: "/signs/magritte.png",
    slug: "magritte",
  }).execute();
  await db.insertInto("art").values({
    name: "Alice au pays des merveilles",
    movement_id: 23,
    url: "/arts/magritte/Alice au pays des merveilles.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Jeunesse",
    movement_id: 6,
    url: "/arts/magritte/Jeunesse.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "La chambre d'écoute",
    movement_id: 23,
    url: "/arts/magritte/La chambre d'écoute.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "La fenêtre",
    movement_id: 23,
    url: "/arts/magritte/La fenêtre.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "La traversée difficile",
    movement_id: 23,
    url: "/arts/magritte/La traversée difficile.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Le blanc-seing",
    movement_id: 23,
    url: "/arts/magritte/Le blanc-seing.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Fils de l'homme",
    movement_id: 23,
    url: "/arts/magritte/Le Fils de l'homme.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Le jockey perdu",
    movement_id: 23,
    url: "/arts/magritte/Le jockey perdu.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Nu",
    movement_id: 6,
    url: "/arts/magritte/Nu.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Nu couché",
    movement_id: 6,
    url: "/arts/magritte/Nu couché.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Panorama populaire",
    movement_id: 23,
    url: "/arts/magritte/Panorama populaire.jpg",
    owner_id: 44,
  }).execute();
  await db.insertInto("art").values({
    name: "Paysage",
    movement_id: 23,
    url: "/arts/magritte/Paysage.jpg",
    owner_id: 44,
  }).execute();

  // Banksy
  await db.insertInto("artist").values({
    last_name: "Banksy",
    gender: "Homme",
    avatar_url: "/arts/banksy/Autoportrait.jpg",
    signature: "/signs/banksy.png",
    color: "#d6e274",
    slug: "banksy",
  }).execute();
  await db.insertInto("art").values({
    name: "Auto-stoppeur",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Auto-stoppeur.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Banksy Shop jusqu'à ce que vous laissiez tomber",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Banksy Shop jusqu'à ce que vous laissiez tomber.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Bethléem",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Bethléem.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Chien",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Chien.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Femme de ménage",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Femme de ménage.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Groupe de réflexion",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Groupe de réflexion.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name:
      "Je ne peux pas croire que vous, les imbéciles, achetez réellement cette merde",
    movement_id: 30,
    frame: 3,
    url:
      "/arts/banksy/Je ne peux pas croire que vous, les imbéciles, achetez réellement cette merde.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "La Petite Fille au ballon",
    movement_id: 29,
    frame: 3,
    url: "/arts/banksy/La Petite Fille au ballon.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Amant bien perché",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/L'Amant bien perché.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Le doux doux ouest",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Le doux doux ouest.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Fils d'un migrant syrien",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Le Fils d'un migrant syrien.jpg",
    owner_id: 45,
  }).execute();
  await db.insertInto("art").values({
    name: "Rat parachute",
    movement_id: 29,
    frame: 0,
    url: "/arts/banksy/Rat parachute.jpg",
    owner_id: 45,
  }).execute();

  // Marie Laurencin
  await db.insertInto("artist").values({
    first_name: "Marie",
    last_name: "Laurencin",
    gender: "Femme",
    avatar_url: "/arts/laurencin/Autoportrait.jpg",
    signature: "/signs/laurencin.png",
    slug: "laurencin",
  }).execute();
  await db.insertInto("art").values({
    name: "Apollinaire et ses amis",
    movement_id: 7,
    url: "/arts/laurencin/Apollinaire et ses amis.jpg",
    owner_id: 46,
  }).execute();
  await db.insertInto("art").values({
    name: "Danseuses espagnoles",
    movement_id: 7,
    url: "/arts/laurencin/Danseuses espagnoles.jpg",
    owner_id: 46,
  }).execute();
  await db.insertInto("art").values({
    name: "Île-de-France",
    movement_id: 7,
    url: "/arts/laurencin/Île-de-France.jpg",
    owner_id: 46,
  }).execute();
  await db.insertInto("art").values({
    name: "La Répétition",
    movement_id: 7,
    url: "/arts/laurencin/La Répétition.jpg",
    owner_id: 46,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Biches",
    movement_id: 7,
    url: "/arts/laurencin/Les Biches.jpg",
    owner_id: 46,
  }).execute();
  await db.insertInto("art").values({
    name: "Les deux espagnoles",
    movement_id: 7,
    url: "/arts/laurencin/Les deux espagnoles.jpg",
    owner_id: 46,
  }).execute();

  // Francis Bacon
  await db.insertInto("artist").values({
    first_name: "Francis",
    last_name: "Bacon",
    gender: "Homme",
    avatar_url: "/arts/bacon/Autoportrait.jpg",
    signature: "/signs/bacon.png",
    slug: "bacon",
  }).execute();
  await db.insertInto("art").values({
    name: "Trois études de Lucian Freud",
    movement_id: 7,
    polyptych: 3,
    url: "/arts/bacon/Trois études de Lucian Freud_1.jpg",
    url_2: "/arts/bacon/Trois études de Lucian Freud_2.jpg",
    url_3: "/arts/bacon/Trois études de Lucian Freud_3.jpg",
    owner_id: 47,
  }).execute();

  // Katsushika Hokusai
  await db.insertInto("artist").values({
    first_name: "Katsushika",
    last_name: "Hokusai",
    gender: "Homme",
    avatar_url: "/arts/hokusai/Autoportrait.jpg",
    signature: "/signs/hokusai.png",
    slug: "hokusai",
  }).execute();
  await db.insertInto("art").values({
    name: "Autoportrait sous l'aspect d'un vieillard",
    movement_id: 31,
    frame: 1,
    url: "/arts/hokusai/Autoportrait sous l'aspect d'un vieillard.jpg",
    owner_id: 48,
  }).execute();
  await db.insertInto("art").values({
    name: "La Grande Vague de Kanagawa",
    movement_id: 31,
    frame: 1,
    url: "/arts/hokusai/La Grande Vague de Kanagawa.jpg",
    owner_id: 48,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Fuji par temps clair",
    movement_id: 31,
    frame: 1,
    url: "/arts/hokusai/Le Fuji par temps clair.jpg",
    owner_id: 48,
  }).execute();
  await db.insertInto("art").values({
    name: "L'orage sous le sommet",
    movement_id: 31,
    frame: 1,
    url: "/arts/hokusai/L'orage sous le sommet.jpg",
    owner_id: 48,
  }).execute();

  // Roy Lichtenstein
  await db.insertInto("artist").values({
    first_name: "Roy",
    last_name: "Lichtenstein",
    gender: "Homme",
    avatar_url: "/arts/lichtenstein/Autoportrait.jpg",
    signature: "/signs/lichtenstein.png",
    slug: "lichtenstein",
  }).execute();
  await db.insertInto("art").values({
    name: "Bedroom at Arles",
    movement_id: 13,
    frame: 1,
    url: "/arts/lichtenstein/Bedroom at Arles.jpg",
    owner_id: 49,
  }).execute();

  // Suzanne Valadon
  await db.insertInto("artist").values({
    first_name: "Suzanne",
    last_name: "Valadon",
    gender: "Femme",
    avatar_url: "/arts/valadon/Autoportrait.jpg",
    signature: "/signs/valadon.png",
    slug: "valadon",
  }).execute();
  await db.insertInto("art").values({
    name: "Après le bain",
    movement_id: 16,
    url: "/arts/valadon/Après le bain.jpg",
    owner_id: 50,
  }).execute();
  await db.insertInto("art").values({
    name: "La Chambre bleue",
    movement_id: 16,
    url: "/arts/valadon/La Chambre bleue.jpg",
    owner_id: 50,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Lancement du filet",
    movement_id: 16,
    url: "/arts/valadon/Le Lancement du filet.jpg",
    owner_id: 50,
  }).execute();
  await db.insertInto("art").values({
    name: "Nature morte au lapin et à la perdrix",
    movement_id: 16,
    url: "/arts/valadon/Nature morte au lapin et à la perdrix.jpg",
    owner_id: 50,
  }).execute();
  await db.insertInto("art").values({
    name: "Nu couché",
    movement_id: 16,
    url: "/arts/valadon/Nu couché.jpg",
    owner_id: 50,
  }).execute();

  // Edvard Munch
  await db.insertInto("artist").values({
    first_name: "Edvard",
    last_name: "Munch",
    gender: "Homme",
    avatar_url: "/arts/munch/Autoportrait.jpg",
    signature: "/signs/munch.png",
    slug: "munch",
  }).execute();
  await db.insertInto("art").values({
    name: "Anxiété",
    movement_id: 7,
    url: "/arts/munch/Anxiété.jpg",
    owner_id: 51,
  }).execute();
  await db.insertInto("art").values({
    name: "Cri",
    movement_id: 7,
    url: "/arts/munch/Cri.jpg",
    owner_id: 51,
  }).execute();
  await db.insertInto("art").values({
    name: "Jalousie",
    movement_id: 7,
    url: "/arts/munch/Jalousie.jpg",
    owner_id: 51,
  }).execute();
  await db.insertInto("art").values({
    name: "La Madone",
    movement_id: 7,
    url: "/arts/munch/La Madone.jpg",
    owner_id: 51,
  }).execute();
  await db.insertInto("art").values({
    name: "Mélancolie",
    movement_id: 7,
    url: "/arts/munch/Mélancolie.jpg",
    owner_id: 51,
  }).execute();
  await db.insertInto("art").values({
    name: "Travailleurs de retour à la maison",
    movement_id: 7,
    url: "/arts/munch/Travailleurs de retour à la maison.jpg",
    owner_id: 51,
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
