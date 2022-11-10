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
    signature: "/signs/lempicka.png",
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
  await db.insertInto("art").values({
    name: "Le Christ jaune",
    movement: "Cloisonnisme",
    url: "/arts/gauguin/Le Christ jaune.jpg",
    owner_id: 3,
  }).execute();
  await db.insertInto("art").values({
    name: "Manao Tupapau",
    movement: "Postimpressionnisme",
    url: "/arts/gauguin/Manao Tupapau.jpg",
    owner_id: 3,
  }).execute();
  await db.insertInto("art").values({
    name: "Quand te maries-tu ?",
    movement: "Cloisonnisme",
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
    slug: "picasso",
  }).execute();
  await db.insertInto("art").values({
    name: "La famille de saltimbanques",
    movement: "Période rose",
    url: "/arts/picasso/La famille de saltimbanques.jpg",
    owner_id: 4,
  }).execute();
  await db.insertInto("art").values({
    name: "La Vie",
    movement: "Période bleue",
    url: "/arts/picasso/La Vie.jpg",
    owner_id: 4,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Demoiselles d'Avignon",
    movement: "Cubisme",
    url: "/arts/picasso/Les Demoiselles d'Avignon.jpg",
    owner_id: 4,
  }).execute();

  // Rembrandt
  await db.insertInto("artist").values({
    first_name: "Rembrandt",
    gender: "Homme",
    avatar_url:
      "/arts/rembrandt/Autoportrait avec fourrure, chaîne en or et boucles d'oreille.jpg",
    signature: "/signs/rembrandt.png",
    slug: "rembrandt",
  }).execute();
  await db.insertInto("art").values({
    name: "Bethsabée au bain tenant la lettre de David",
    movement: "Baroque",
    url: "/arts/rembrandt/Bethsabée au bain tenant la lettre de David.jpg",
    owner_id: 5,
  }).execute();
  await db.insertInto("art").values({
    name: "La Leçon d'anatomie du docteur Tulp",
    movement: "Baroque",
    url: "/arts/rembrandt/La Leçon d'anatomie du docteur Tulp.jpg",
    owner_id: 5,
  }).execute();
  await db.insertInto("art").values({
    name: "La Ronde de nuit",
    movement: "Baroque",
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
    signature: "/signs/manet.png",
    slug: "manet",
  }).execute();
  await db.insertInto("art").values({
    name: "Le Déjeuner sur l'herbe",
    movement: "Impressionnisme",
    url: "/arts/manet/Le Déjeuner sur l'herbe.jpg",
    owner_id: 7,
  }).execute();
  await db.insertInto("art").values({
    name: "Olympia",
    movement: "Réalisme",
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
    slug: "kahlo",
  }).execute();
  await db.insertInto("art").values({
    name: "Les Fruits de la Terre",
    movement: "Art naïf",
    url: "/arts/kahlo/Les Fruits de la Terre.jpg",
    owner_id: 8,
  }).execute();
  await db.insertInto("art").values({
    name: "Ma naissance",
    movement: "Art naïf",
    url: "/arts/kahlo/Ma naissance.jpg",
    owner_id: 8,
  }).execute();
  await db.insertInto("art").values({
    name: "Pitahayas",
    movement: "Art naïf",
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
    slug: "klimt",
  }).execute();
  await db.insertInto("art").values({
    name: "Danaé",
    movement: "Art nouveau",
    url: "/arts/klimt/Danaé.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "La Vie et la Mort",
    movement: "Art nouveau",
    url: "/arts/klimt/La Vie et la Mort.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Baiser",
    movement: "Art nouveau",
    url: "/arts/klimt/Le Baiser.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Vierges",
    movement: "Art nouveau",
    url: "/arts/klimt/Les Vierges.jpg",
    owner_id: 9,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Espoir II",
    movement: "Art nouveau",
    url: "/arts/klimt/L'Espoir II.jpg",
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
    signature: "/signs/michel-ange.png",
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
    signature: "/signs/vinci.png",
    slug: "vinci",
  }).execute();
  await db.insertInto("art").values({
    name: "La Cène",
    movement: "Haute Renaissance",
    url: "/arts/de vinci/La Cène.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "La Joconde",
    movement: "Haute Renaissance",
    url: "/arts/de vinci/La Joconde.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "Saint Jean-Baptiste",
    movement: "Haute Renaissance",
    url:
      "/arts/de vinci/Saint Jean-Baptiste.jpg",
    owner_id: 11,
  }).execute();
  await db.insertInto("art").values({
    name: "Sainte Anne, la Vierge et l'Enfant Jésus jouant avec un agneau",
    movement: "Haute Renaissance",
    url:
      "/arts/de vinci/Sainte Anne, la Vierge et l'Enfant Jésus jouant avec un agneau.jpg",
    owner_id: 11,
  }).execute();

  // Salvador Dalí
  await db.insertInto("artist").values({
    first_name: "Salvador",
    last_name: "Dalí",
    gender: "Homme",
    avatar_url: "/arts/dali/Autoportrait.jpg",
    signature: "/signs/dali.png",
    slug: "dali",
  }).execute();
  await db.insertInto("art").values({
    name: "Galacidalacidesoxyribonucleicacid",
    movement: "Surréalisme",
    url: "/arts/dali/Galacidalacidesoxyribonucleicacid.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Grand Masturbateur",
    movement: "Surréalisme",
    url: "/arts/dali/Le Grand Masturbateur.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Miel est plus doux que le sang",
    movement: "Surréalisme",
    url: "/arts/dali/Le Miel est plus doux que le sang.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name: "Leda atomica",
    movement: "Surréalisme",
    url: "/arts/dali/Leda atomica.jpg",
    owner_id: 12,
  }).execute();
  await db.insertInto("art").values({
    name:
      "Ma femme, nue, regardant son propre corps devenir, trois vertèbres d'une colonne, ciel et architecture",
    movement: "Surréalisme",
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
    slug: "monet",
  }).execute();
  await db.insertInto("art").values({
    name: "Impression, soleil levant",
    movement: "Impressionnisme",
    url: "/arts/monet/Impression, soleil levant.jpg",
    owner_id: 13,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Nymphéas",
    movement: "Impressionnisme",
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
    slug: "renoir",
  }).execute();
  await db.insertInto("art").values({
    name: "Bal du moulin de la Galette",
    movement: "Impressionnisme",
    url: "/arts/renoir/Bal du moulin de la Galette.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "Jeunes filles en noir",
    movement: "Impressionnisme",
    url: "/arts/renoir/Jeunes filles en noir.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "La Grenouillère",
    movement: "Impressionnisme",
    url: "/arts/renoir/La Grenouillère.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "La Loge",
    movement: "Impressionnisme",
    url: "/arts/renoir/La Loge.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Déjeuner des canotiers",
    movement: "Impressionnisme",
    url: "/arts/renoir/Le Déjeuner des canotiers.jpg",
    owner_id: 14,
  }).execute();
  await db.insertInto("art").values({
    name: "Les Deux Sœurs",
    movement: "Impressionnisme",
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
    slug: "gentileschi",
  }).execute();
  await db.insertInto("art").values({
    name: "Suzanne et les vieillards",
    movement: "Baroque",
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
    movement: "Postimpressionnisme",
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
    movement: "Baroque",
    url: "/arts/vermeer/Dame jouant du virginal.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "La Laitière",
    movement: "Baroque",
    url: "/arts/vermeer/La Laitière.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Art de la peinture",
    movement: "Baroque",
    url: "/arts/vermeer/L'Art de la peinture.jpg",
    owner_id: 17,
  }).execute();
  await db.insertInto("art").values({
    name: "L'Entremetteuse",
    movement: "Baroque",
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
    slug: "morisot",
  }).execute();
  await db.insertInto("art").values({
    name: "Bateaux sur la Seine",
    movement: "Impressionnisme",
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
    movement: "Expressionnisme",
    url: "/arts/chagall/Dédié à ma fiancée.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Golgotha",
    movement: "Cubisme",
    url: "/arts/chagall/Golgotha.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Violoniste",
    movement: "Cubisme",
    url: "/arts/chagall/Le Violoniste.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Nature morte",
    movement: "Cubisme",
    url: "/arts/chagall/Nature morte.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Paris par la fenêtre",
    movement: "Cubisme",
    url: "/arts/chagall/Paris par la fenêtre.jpg",
    owner_id: 19,
  }).execute();
  await db.insertInto("art").values({
    name: "Trois heures et demie (Le poète)",
    movement: "Cubisme",
    url: "/arts/chagall/Trois heures et demie (Le poète).jpg",
    owner_id: 19,
  }).execute();

  // Titien
  await db.insertInto("artist").values({
    first_name: "Titien",
    gender: "Homme",
    avatar_url: "/arts/titien/Autoportrait.jpg",
    signature: "/signs/titien.png",
    slug: "titien",
  }).execute();
  await db.insertInto("art").values({
    name: "Bacchus et Ariane",
    movement: "Haute Renaissance",
    url: "/arts/titien/Bacchus et Ariane.jpg",
    owner_id: 20,
  }).execute();
  await db.insertInto("art").values({
    name: "Caïn et Abel",
    movement: "Maniérisme",
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
    movement: "Romantisme",
    url: "/arts/bonheur/Biches et cerf au repos.jpg",
    owner_id: 21,
  }).execute();
  await db.insertInto("art").values({
    name: "La foire du cheval",
    movement: "Réalisme",
    url: "/arts/bonheur/La foire du cheval.jpg",
    owner_id: 21,
  }).execute();
  await db.insertInto("art").values({
    name: "Le Roi de la forêt",
    movement: "Réalisme",
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
    slug: "pissarro",
  }).execute();
  await db.insertInto("art").values({
    name: "Boulevard Montmartre, printemps",
    movement: "Impressionnisme",
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
    slug: "matisse",
  }).execute();
  await db.insertInto("art").values({
    name: "Femme au chapeau",
    movement: "Fauvisme",
    url: "/arts/matisse/Femme au chapeau.jpg",
    owner_id: 23,
  }).execute();
  await db.insertInto("art").values({
    name: "La Joie de vivre",
    movement: "Fauvisme",
    url: "/arts/matisse/La Joie de vivre.jpg",
    owner_id: 23,
  }).execute();
  await db.insertInto("art").values({
    name: "Luxe, Calme et Volupté",
    movement: "Pointillisme",
    url: "/arts/matisse/Luxe, Calme et Volupté.jpg",
    owner_id: 23,
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
