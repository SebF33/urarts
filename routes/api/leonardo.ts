import { Db } from "@utils/db.ts";
import i18next from "i18next";
import { RouteContext } from "$fresh/server.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

// API Leonardo
export const handler = async (
  req: Request,
  _ctx: RouteContext,
): Promise<Response> => {
  let query
  const url = new URL(req.url);

  query = url.searchParams.get("lng") || "";
  const lng = query.length ? encodeURIComponent(query) : "en";
  i18next.changeLanguage(lng);

  query = url.searchParams.get("page") || "";
  let page = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("pagectx") || "";
  let pagectx = query.length ? JSON.parse(decodeURIComponent(query)) : "";
  let isAlone;
  pagectx.includes("alone") ? isAlone = true : isAlone = false;
  pagectx = pagectx.split("_");

  query = url.searchParams.get("subpage") || "";
  const subpage = query.length ? encodeURIComponent(query) : "";

  query = url.searchParams.get("welcome") || "";
  const welcome = query.length ? encodeURIComponent(query) : "";

  const db = Db.getInstance();
  const { count } = db.fn;

  const draggable = false;
  let htmlContent = "";


  if (page === "") page = "home";

  if (welcome === "true" && page === "home") {
    htmlContent = i18next.t("leonardo.welcome", { ns: "translation" });
    htmlContent += i18next.t("leonardo.iam", { ns: "translation" });
  }


  switch (page) {

    case "about":
      htmlContent = i18next.t("leonardo.page_about", { ns: "translation" });
      htmlContent += i18next.t("leonardo.page_about_msg", { ns: "translation" });
      break;

    
    case "art":
      if (subpage !== "undefined") {
        const artistResult = await db.selectFrom("artist")
          .select(["last_name", "color", "copyright", "slug"])
          .where("slug", "=", subpage)
          .executeTakeFirst();

        const artResults = await db.selectFrom("artist")
          .innerJoin("art", "art.owner_id", "artist.id")
          .select(["art.id as id", "art.name as name", "url", "url_2", "url_3", "url_4", "url_5"])
          .where("slug", "=", subpage)
          .$if(isAlone, (qb) => qb.where("art.id", "=", parseInt(pagectx)))
          .orderBy(sql`random()`)
          .executeTakeFirst();

        if (!isAlone) htmlContent = `<h2>${i18next.t("leonardo.artist", { ns: "translation" })} <strong style="color:${artistResult.color}">${artistResult.last_name}</strong>.</h2>`;

        if (!isAlone && artistResult.copyright !== 2) {
          const countArtResults = await db.selectFrom("artist")
            .innerJoin("art", "art.owner_id", "artist.id")
            .select([count("art.id").as("number")])
            .where("slug", "=", subpage)
            .executeTakeFirst();

          htmlContent += `<p class="text-[1rem] leading-none mt-3"><strong>${countArtResults.number}</strong> ${i18next.t("leonardo.arts_currently_available", { ns: "translation" })}</p>`;
          htmlContent += `<p class="text-[1rem] leading-none mt-2">${i18next.t("leonardo.discover", { ns: "translation" })} <a href="/art/${artistResult.slug}?fromleonardo&id=${artResults.id}" class="inline-block">"<strong>${artResults.name}</strong>"</a>...</p>`;
          htmlContent += `<div class="flex justify-start mt-3">`;
          if (artResults.url_4) htmlContent += `<a href="/art/${artistResult.slug}?fromleonardo&id=${artResults.id}" class="inline-block" draggable="${draggable}"><img src="${artResults.url_4}" alt="${artResults.name + "_4"}" style="max-height:200px" draggable="${draggable}"/></a>`;
          if (artResults.url_2) htmlContent += `<a href="/art/${artistResult.slug}?fromleonardo&id=${artResults.id}" class="inline-block" draggable="${draggable}"><img src="${artResults.url_2}" alt="${artResults.name + "_2"}" style="max-height:200px" draggable="${draggable}"/></a>`;
          htmlContent += `<a href="/art/${artistResult.slug}?fromleonardo&id=${artResults.id}" class="inline-block" draggable="${draggable}"><img src="${artResults.url}" alt="${artResults.name}" style="max-height:200px" draggable="${draggable}"/></a>`;
          if (artResults.url_3) htmlContent += `<a href="/art/${artistResult.slug}?fromleonardo&id=${artResults.id}" class="inline-block" draggable="${draggable}"><img src="${artResults.url_3}" alt="${artResults.name + "_3"}" style="max-height:200px" draggable="${draggable}"/></a>`;
          if (artResults.url_5) htmlContent += `<a href="/art/${artistResult.slug}?fromleonardo&id=${artResults.id}" class="inline-block" draggable="${draggable}"><img src="${artResults.url_5}" alt="${artResults.name + "_5"}" style="max-height:200px" draggable="${draggable}"/></a>`;
          htmlContent += `</div>`;
        }

        if (isAlone) {
          htmlContent = `<h2>${i18next.t("leonardo.art", { ns: "translation" })} "<strong>${artResults.name}</strong>" ${i18next.t("leonardo.from_artist", { ns: "translation" })} <strong style="color:${artistResult.color}">${artistResult.last_name}</strong>.</h2>`;
          htmlContent += `<p class="text-[1rem] leading-none mt-3">${i18next.t("leonardo.discover_arts", { ns: "translation" })} <a href="/art/${artistResult.slug}" target="_blank" rel="noopener" class="inline-block"><span class="underline">ici</span></a>.</p>`;
        }
      }
      break;

    
    case "artists":
      htmlContent = i18next.t("leonardo.page_artists", { ns: "translation" });

      const totalArtistQuery = await db
        .selectFrom("artist")
        .select([count("id").as("artist_count")])
        .where("slug", "not in", TALENTS)
        .execute();

      const totalArtistCountResult: number[] = totalArtistQuery.map((item) =>
        parseFloat(item.artist_count)
      );

      htmlContent += `<p class="text-[1rem] leading-none mt-1">${i18next.t("leonardo.search_among", { ns: "translation" })} <strong>${totalArtistCountResult}</strong> ${i18next.t("leonardo.artists_available", { ns: "translation" })}...</p>`;
      htmlContent += `<p class="text-[1rem] leading-none mt-3">${i18next.t("leonardo.nationality_period", { ns: "translation" })}</p>`;
      htmlContent += `<p class="text-[1rem] leading-none mt-1">${i18next.t("leonardo.artists_displayed", { ns: "translation" })} "<strong>${pagectx[2]}</strong>" ${i18next.t("leonardo.between_the_year", { ns: "translation" })} <strong>${pagectx[0]}</strong> ${i18next.t("leonardo.and_year", { ns: "translation" })} <strong>${pagectx[1]}</strong> &nbsp; <span class="inline-block"><img src="/flags/${pagectx[2]}.png" class="h-6 inline-block align-top" alt="${pagectx[2]}" draggable=${draggable}/></span></p>`;
      break;

    
    case "arts":
      htmlContent = i18next.t("leonardo.page_arts", { ns: "translation" });

      const totalArtQuery = await db
        .selectFrom("art")
        .innerJoin("artist", "art.owner_id", "artist.id")
        .select([count("art.id").as("art_count")])
        .where("slug", "not in", TALENTS)
        .where("copyright", "!=", 2)
        .execute();

      const totalArtCountResult: number[] = totalArtQuery.map((item) => parseFloat(item.art_count));

      htmlContent += `<p class="text-[1rem] leading-none mt-1">${i18next.t("leonardo.search_among", { ns: "translation" })} <strong>${totalArtCountResult}</strong> ${i18next.t("leonardo.arts_available", { ns: "translation" })}...</p>`;
      htmlContent += `<p class="text-[1rem] leading-none">${i18next.t("leonardo.hover_art", { ns: "translation" })}</p>`;
      break;

    
    case "home":
      htmlContent += `
        <p class="text-[1rem] leading-none mb-2">${i18next.t("leonardo.lng", { ns: "translation" })} &nbsp;
          <button onclick="handleLanguage('en')" class="inline-block flex items-center focus:outline-none">
            <img class="w-6 transform-gpu transition-all duration-50 ease-in-out hover:(transform scale-110)" src="/flags/Royaume-Uni.png" alt="en" draggable=false/>
          </button>
          <button onclick="handleLanguage('fr')" class="inline-block flex items-center focus:outline-none">
            <img class="w-6 transform-gpu transition-all duration-50 ease-in-out hover:(transform scale-110)" src="/flags/France.png" alt="fr" draggable=false/>
          </button>
        </p>
      `;

      htmlContent += `<p class="text-[1rem] leading-none mb-2">${i18next.t("leonardo.click", { ns: "translation" })} <span x-on:click="toggleNavTheme" class="font-bold underline cursor-pointer">${i18next.t("leonardo.here", { ns: "translation" })}</span> ${i18next.t("leonardo.nav_theme", { ns: "translation" })}</p>`;
      htmlContent += i18next.t("leonardo.page_home_msg", { ns: "translation" });

      if (welcome === "true") {
        const randomArtResults = await db.selectFrom("art")
          .innerJoin("artist", "art.owner_id", "artist.id")
          .select([
            "last_name", "color", "slug", "copyright",
            "art.id as id",
            "art.name as name",
            "url", "url_2", "url_3", "url_4", "url_5"
          ])
          .where("copyright", "!=", 2)
          .where("slug", "not in", TALENTS)
          .orderBy(sql`random()`)
          .executeTakeFirst();

        htmlContent += `<p class="max-w-sm text-[1rem] leading-none mt-4">${i18next.t("leonardo.page_home_msg_2", { ns: "translation" })} <a href="/art/${randomArtResults.slug}?alone&id=${randomArtResults.id}" class="inline-block">"<strong>${randomArtResults.name}</strong>"</a> ${i18next.t("leonardo.from", { ns: "translation" })} <strong style="color:${randomArtResults.color}"><a href="/art/${randomArtResults.slug}">${randomArtResults.last_name}</a></strong>...</p>`;
        htmlContent += `<div class="flex justify-center mt-3">`;
        if (randomArtResults.url_4) htmlContent += `<a href="/art/${randomArtResults.slug}?alone&id=${randomArtResults.id}" class="inline-block" draggable="${draggable}"><img class="max-h-72 w-auto" src="${randomArtResults.url_4}" alt="${randomArtResults.name + "_4"}" draggable="${draggable}"/></a>`;
        if (randomArtResults.url_2) htmlContent += `<a href="/art/${randomArtResults.slug}?alone&id=${randomArtResults.id}" class="inline-block" draggable="${draggable}"><img class="max-h-72 w-auto" src="${randomArtResults.url_2}" alt="${randomArtResults.name + "_2"}" draggable="${draggable}"/></a>`;
        htmlContent += `<a href="/art/${randomArtResults.slug}?alone&id=${randomArtResults.id}" class="inline-block" draggable="${draggable}"><img class="max-h-72 w-auto" src="${randomArtResults.url}" alt="${randomArtResults.name}" draggable="${draggable}"/></a>`;
        if (randomArtResults.url_3) htmlContent += `<a href="/art/${randomArtResults.slug}?alone&id=${randomArtResults.id}" class="inline-block" draggable="${draggable}"><img class="max-h-72 w-auto" src="${randomArtResults.url_3}" alt="${randomArtResults.name + "_3"}" draggable="${draggable}"/></a>`;
        if (randomArtResults.url_5) htmlContent += `<a href="/art/${randomArtResults.slug}?alone&id=${randomArtResults.id}" class="inline-block" draggable="${draggable}"><img class="max-h-72 w-auto" src="${randomArtResults.url_5}" alt="${randomArtResults.name + "_5"}" draggable="${draggable}"/></a>`;
        htmlContent += `</div>`;
      }
      break;

    
    case "histocharacters":
      if (pagectx[0] === "") htmlContent = "...";
      else {
        htmlContent = i18next.t("leonardo.page_histocharacters", { ns: "translation" });
        htmlContent += i18next.t("leonardo.page_histocharacters_msg", { ns: "translation" });

        const histocharacterResults = await db.selectFrom("art")
          .innerJoin("artist", "art.owner_id", "artist.id")
          .select(["art.id as id", "histocharactername as name", "url"])
          .where("copyright", "!=", 2)
          .where("histocharacter", "=", 1)
          .where(sql`((histocharacterbirthyear BETWEEN ${pagectx[0]} AND ${pagectx[1]}) OR (histocharacterdeathyear BETWEEN ${pagectx[0]} AND ${pagectx[1]}))`)
          .orderBy(sql`random()`)
          .executeTakeFirst();

        htmlContent += `<p class="text-[1rem] leading-none mt-1">${i18next.t("leonardo.characters_displayed_between", { ns: "translation" })} <strong>${pagectx[0]}</strong> ${i18next.t("leonardo.and_year", { ns: "translation" })} <strong>${pagectx[1]}</strong>.</p>`;
        htmlContent += `<p class="text-[1rem] leading-none mt-2">${i18next.t("leonardo.discover", { ns: "translation" })} <strong>${histocharacterResults.name}...</strong></p>`;
        htmlContent += `<a href="/histocharacters?id=${histocharacterResults.id}" class="inline-block mt-3" draggable="${draggable}"><img src="${histocharacterResults.url}" alt="${histocharacterResults.name}" style="max-width:120px" draggable="${draggable}"/></a>`;
      }
      break;

    
    case "indicators":
      htmlContent = i18next.t("leonardo.page_indicators", { ns: "translation" });
      htmlContent += i18next.t("leonardo.page_indicators_msg", { ns: "translation" });
      break;

    
    case "movement":
      if (subpage !== "undefined") {
        const movementResults = await db.selectFrom("art")
          .innerJoin("artist", "art.owner_id", "artist.id")
          .innerJoin("movement", "art.movement_id", "movement.id")
          .select([
            "artist.last_name as artist_last_name",
            "artist.avatar_url as avatar_url",
            "artist.color as color",
            "artist.slug as artist_slug",
          ])
          .$if(lng === 'fr', (qb) => qb.select("movement.name as movement_name"))
          .$if(lng === 'en', (qb) => qb.select("movement.name_en as movement_name"))
          .where("movement.slug", "=", subpage)
          .where("artist.slug", "not in", TALENTS)
          .orderBy(sql`random()`)
          .executeTakeFirst();

        if (subpage !== "nonclasse") htmlContent = `<h2>${i18next.t("leonardo.movement", { ns: "translation" })} "<strong>${movementResults.movement_name}</strong>".</h2>`;
        else htmlContent = i18next.t("leonardo.unclassified_arts", { ns: "translation" });

        htmlContent += `<p class="text-[1rem] leading-none mt-3">${i18next.t("leonardo.discover_artist", { ns: "translation" })} <strong style="color:${movementResults.color}"><a href="/art/${movementResults.artist_slug}">${movementResults.artist_last_name}</a></strong>...</p>`;
        htmlContent += `<a href="/art/${movementResults.artist_slug}" class="inline-block mt-3" draggable="${draggable}"><img src="${movementResults.avatar_url}" alt="${movementResults.artist_last_name}" style="max-width:120px" draggable="${draggable}"/></a>`;
      }
      break;

    
    case "movements":
      htmlContent = i18next.t("leonardo.page_movements", { ns: "translation" });

      const totalMovementQuery = await db
        .selectFrom("movement")
        .select([count("movement.id").as("movement_count")])
        .execute();

      const totalMovementCountResult: number[] = totalMovementQuery.map((item) => parseFloat(item.movement_count));

      htmlContent += `<p class="text-[1rem] leading-none mt-1">${i18next.t("leonardo.search_among", { ns: "translation" })} <strong>${totalMovementCountResult}</strong> ${i18next.t("leonardo.movements_available", { ns: "translation" })}...</p>`;
      htmlContent += `<p class="text-[1rem] leading-none">${i18next.t("leonardo.hover_movement", { ns: "translation" })}</p>`;
      break;

    
    case "talents":
      htmlContent = i18next.t("leonardo.page_talents", { ns: "translation" });

      const talentResults = await db.selectFrom("artist")
        .select(["last_name", "avatar_url", "color", "slug"])
        .where("slug", "in", TALENTS)
        .orderBy(sql`random()`)
        .executeTakeFirst();

      htmlContent += `<p class="text-[1rem] leading-none mt-3">${i18next.t("leonardo.discover_artist", { ns: "translation" })} <strong style="color:${talentResults.color}"><a href="/art/${talentResults.slug}">${talentResults.last_name}</a></strong>...</p>`;
      htmlContent += `<a href="/art/${talentResults.slug}" class="inline-block mt-3" draggable="${draggable}"><img src="${talentResults.avatar_url}" alt="${talentResults.last_name}" style="max-width:120px" draggable="${draggable}"/></a>`;
      break;

    
    case "women":
      htmlContent = i18next.t("leonardo.page_women", { ns: "translation" });
      htmlContent += i18next.t("leonardo.page_women_msg", { ns: "translation" });

      const womenResults = await db.selectFrom("artist")
        .select(["last_name", "avatar_url", "color", "slug"])
        .where("gender", "=", "Femme")
        .where("artist.slug", "not in", TALENTS)
        .orderBy(sql`random()`)
        .executeTakeFirst();

      htmlContent += `<p class="text-[1rem] leading-none mt-3">${i18next.t("leonardo.discover_artist", { ns: "translation" })} <strong style="color:${womenResults.color}"><a href="/art/${womenResults.slug}">${womenResults.last_name}</a></strong>...</p>`;
      htmlContent += `<a href="/art/${womenResults.slug}" class="inline-block mt-3" draggable="${draggable}"><img src="${womenResults.avatar_url}" alt="${womenResults.last_name}" style="max-width:120px" draggable="${draggable}"/></a>`;
      break;

    
    default:
      htmlContent = "...";
  }


  htmlContent +=
    `<div class="text-[0.85rem] italic leading-none mt-4">
    <span class="inline-block"><img src="/icon_urarts.svg" class="h-5 w-5 inline-block align-bottom" alt="U" draggable=${draggable}/></span>${i18next.t("leonardo.off", { ns: "translation" })}
    </div>`;


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
