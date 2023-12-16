import { Db } from "@utils/db.ts";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

// API Leonardo
export const handler = async (
  req: Request,
  _ctx: RouteContext,
): Promise<Response> => {
  const url = new URL(req.url);
  let query = url.searchParams.get("welcome") || "";
  const welcome = query.length ? encodeURIComponent(query) : "";
  query = url.searchParams.get("page") || "";
  let page = query.length ? encodeURIComponent(query) : "";
  query = url.searchParams.get("subpage") || "";
  const subpage = query.length ? encodeURIComponent(query) : "";

  const db = Db.getInstance();
  const { count } = db.fn;

  const draggable = false;
  let htmlContent = "";

  if (page === "") {
    page = "home";
  }

  if (welcome === "true" && page === "home") {
    htmlContent =
      '<h2 class="text-justify">Bonjour et bienvenue sur <strong>Urarts</strong>, je suis <strong>Leonardo</strong>...</h2>';
    htmlContent +=
      '<p class="text-[1rem] text-justify mt-0 mb-2">...votre guide dans vos recherches sur l’<strong>Art</strong> !</p>';
  }

  switch (page) {
    case "art":
      if (subpage !== "undefined") {
        const artResults = await db.selectFrom("art")
          .innerJoin("artist", "art.owner_id", "artist.id")
          .select([
            "last_name",
            "slug",
            "copyright",
            "art.id as id",
            "art.name as name",
            "url",
          ])
          .where("slug", "=", subpage)
          .where("polyptych", "=", 1)
          .orderBy(sql`random()`)
          .executeTakeFirst();

        htmlContent = "<h2>Vous êtes sur la page de l’artiste <strong>" +
          artResults.last_name + "</strong>.</h2>";

        if (artResults.copyright !== 2) {
          htmlContent +=
            `<p class="text-[1rem] mt-3">Découvrez l’œuvre "<strong>${artResults.name}</strong>"...</p>`;
          htmlContent +=
            `<a href="/art/${artResults.slug}?id=${artResults.id}" class="inline-block mt-3" draggable="${draggable}"><img src="${artResults.url}" alt="${artResults.name}" style="max-width:120px" draggable="${draggable}"/></a>`;
        }
      }
      break;

    case "artists":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des artistes</span>.</h2>';

      const totalArtistQuery = await db
        .selectFrom("artist")
        .select([
          count("id").as("artist_count"),
        ])
        .where("slug", "not in", TALENTS)
        .execute();

      const totalArtistCountResult: number[] = totalArtistQuery.map((item) =>
        parseFloat(item.artist_count)
      );

      htmlContent +=
        `<p class="text-[1rem] mt-1">Faites votre recherche parmi <strong>${totalArtistCountResult}</strong> artistes disponibles...</p>`;
      htmlContent +=
        '<p class="text-[1rem] mt-3">Choisissez une nationalité et la période d’existence du ou des artiste(s) recherché(s).</p>';
      break;

    case "arts":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des noms d’œuvres d’art</span>.</h2>';

      const totalArtQuery = await db
        .selectFrom("art")
        .innerJoin("artist", "art.owner_id", "artist.id")
        .select([count("art.id").as("art_count")])
        .where("slug", "not in", TALENTS)
        .where("copyright", "!=", 2)
        .execute();

      const totalArtCountResult: number[] = totalArtQuery.map((item) =>
        parseFloat(item.art_count)
      );

      htmlContent +=
        `<p class="text-[1rem] mt-1">Faites votre recherche parmi <strong>${totalArtCountResult}</strong> œuvres disponibles...</p>`;
      break;

    case "error":
      htmlContent = "<h2>Oups ! Erreur !</h2>";
      break;

    case "home":
      htmlContent +=
        '<p class="text-[1rem]">Cliquez sur le portrait d’un(e) artiste pour accéder à ses œuvres.</p>';

      if (welcome === "true") {
        const randomArtResults = await db.selectFrom("art")
          .innerJoin("artist", "art.owner_id", "artist.id")
          .select([
            "last_name",
            "slug",
            "copyright",
            "art.id as id",
            "art.name as name",
            "url",
          ])
          .where("copyright", "!=", 2)
          .where("slug", "not in", TALENTS)
          .where("polyptych", "=", 1)
          .orderBy(sql`random()`)
          .executeTakeFirst();

        htmlContent +=
          `<p class="text-[1rem] mt-1">L’œuvre du moment s’intitule "<strong>${randomArtResults.name}</strong>"...</p>`;
        htmlContent +=
          `<a href="/art/${randomArtResults.slug}?id=${randomArtResults.id}" class="inline-block mt-3" draggable="${draggable}"><img src="${randomArtResults.url}" alt="${randomArtResults.name}" style="max-width:220px" draggable="${draggable}"/></a>`;
      }
      break;

    case "histocharacters":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des personnages historiques</span>.</h2>';
      htmlContent +=
        '<p class="text-[1rem] mt-3">Choisissez la période du ou des personnage(s) recherché(s).</p>';

      const histocharacterResults = await db.selectFrom("art")
        .select([
          "art.id as id",
          "histocharactername as name",
          "url",
        ])
        .where("histocharacter", "=", 1)
        .orderBy(sql`random()`)
        .executeTakeFirst();

      htmlContent +=
        `<p class="text-[1rem] mt-1">Découvrez <strong>${histocharacterResults.name}...</strong></p>`;
      htmlContent +=
        `<a href="/histocharacters?id=${histocharacterResults.id}" class="inline-block mt-3" draggable="${draggable}"><img src="${histocharacterResults.url}" alt="${histocharacterResults.name}" style="max-width:120px" draggable="${draggable}"/></a>`;

      break;

    case "indicators":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des indicateurs</span> du site Urarts.</h2>';
      break;

    case "movement":
      htmlContent = "<h2>Vous êtes sur la page du mouvement ";

      if (subpage !== "undefined") {
        const movementResults = await db.selectFrom("art")
          .innerJoin("artist", "art.owner_id", "artist.id")
          .innerJoin("movement", "art.movement_id", "movement.id")
          .select([
            "movement.name as movement",
            "artist.slug as artist_slug",
            "first_name",
            "last_name",
            "avatar_url",
          ])
          .where("movement.slug", "=", subpage)
          .where("artist.slug", "not in", TALENTS)
          .orderBy(sql`random()`)
          .executeTakeFirst();

        htmlContent += '"' + movementResults.movement + '".</h2>';
        htmlContent +=
          `<p class="text-[1rem] mt-3">Découvrez l’artiste <strong>${movementResults.last_name}</strong>...</p>`;
        htmlContent +=
          `<a href="/art/${movementResults.artist_slug}" class="inline-block mt-3" draggable="${draggable}"><img src="${movementResults.avatar_url}" alt="${movementResults.last_name}" style="max-width:80px" draggable="${draggable}"/></a>`;
      }
      break;

    case "movements":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des noms de mouvements</span>.</h2>';

      const totalMovementQuery = await db
        .selectFrom("movement")
        .select([count("movement.id").as("movement_count")])
        .execute();

      const totalMovementCountResult: number[] = totalMovementQuery.map((
        item,
      ) => parseFloat(item.movement_count));

      htmlContent +=
        `<p class="text-[1rem] mt-1">Faites votre recherche parmi <strong>${totalMovementCountResult}</strong> mouvements disponibles...</p>`;
      break;

    case "notfound":
      htmlContent = "<h2>Oups ! Cette page est introuvable.</h2>";
      break;

    case "talents":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des talents</span>.</h2>';
      break;

    case "women":
      htmlContent =
        '<h2>Vous êtes sur la <span class="underline">page des femmes artistes</span>.</h2>';
      htmlContent +=
        '<p class="text-[1rem] mt-1">Cliquez sur le portrait d’une artiste pour accéder à ses œuvres.</p>';
      break;

    default:
      htmlContent = "...";
  }

  htmlContent +=
    `<div class="text-[0.7rem] italic mt-4">* Cliquez sur l’icône &nbsp; <span class="inline-block"><img src="/icon_urarts.svg" class="h-5 w-5 inline-block align-top" alt="Urarts" draggable=${draggable}/></span> pour désactiver/activer Leonardo.</div>`;

  return Promise.resolve(
    new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    }),
  );
};
