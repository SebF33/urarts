import { ArtistQuote } from "@utils/types.d.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head, Partial } from "$fresh/runtime.ts";

import AnimBrushStroke from "@islands/AnimBrushStroke.tsx";
import Avatar from "@islands/Avatar.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Quote from "@islands/Quote.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Quote = Array<ArtistQuote>;

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const url = new URL(req.url);

    const db = Db.getInstance();
    const result = await db.selectFrom("artist")
      .select([
        "first_name",
        "last_name",
        "avatar_url",
        "avatar_info",
        "color",
        "secondary_color",
        "site_web",
        "info",
        "nationality",
        "birthyear",
        "deathyear",
        "signature",
        "quote",
        "copyright",
        "slug",
      ])
      .where("slug", "=", slug)
      .executeTakeFirst();

    let artist: string | null = null;
    let artistQuote: Quote | null = null;
    let avatar: string | null = null;
    let avatarInfo: string | null = null;
    let birthyear: string | null = null;
    let color: string | null = null;
    let copyright: number | null = null;
    let deathyear: string | null = null;
    let desc: string | null = null;
    let info: string | null = null;
    let movements: string[] | null = null;
    let mySlug: string | null = null;
    let nationality: string | null = null;
    let query: object | null = null;
    let secondaryColor: string | null = null;
    let site: string | null = null;
    let title: string | null = null;

    if (result) {
      const alone = url.searchParams.has("alone");
      const fromLeonardo = url.searchParams.has("fromleonardo");
      const id = url.searchParams.get("id") || "";

      const movementQuery = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select(["movement.name", "movement.font", "movement.slug"])
      .distinct()
      .where("artist.slug", "=", result.slug)
      .where("movement.slug", "!=", "nonclasse")
      .orderBy("movement.name")
      .execute();
      
      const marginValues = ["-ml-2", "ml-6", "-ml-1", "ml-12", "-ml-3", "ml-2"];
      const rotationValues = ["-rotate-3", "rotate-3", "-rotate-1", "rotate-2", "-rotate-2", "rotate-6"];

      artist = result.first_name !== null
        ? result.first_name + " " + result.last_name
        : result.last_name;
        
      if (result.quote !== null) artistQuote = {first_name: result.first_name, last_name: result.last_name, signature: result.signature, quote: result.quote};
      else artistQuote = null;

      avatar = result.avatar_url;
      avatarInfo = result.avatar_info;
      birthyear = result.birthyear;
      color = result.color;
      copyright = result.copyright;
      deathyear = result.deathyear !== "" ? " — " + result.deathyear : "";
      desc = "Les plus belles œuvres de " + artist + ".";
      info = result.info;
      movements = movementQuery.map((p, index) => ({
        font: p.font,
        movement_name: p.name,
        position: marginValues[index % marginValues.length] + " " + rotationValues[index % rotationValues.length],
        movement_slug: p.slug,
      }));
      mySlug = result.slug;
      nationality = result.nationality;
      query = {
        alone: alone,
        fromLeonardo: fromLeonardo,
        id: id
      };
      secondaryColor = result.secondary_color;
      site = result.site_web;
      title = artist + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({
      artist,
      artistQuote,
      avatar,
      avatarInfo,
      birthyear,
      color,
      copyright,
      deathyear,
      desc,
      info,
      movements,
      mySlug,
      nationality,
      query,
      secondaryColor,
      site,
      title,
    });
  },
};

export default function ArtistArtsPage(
  props: PageProps<{
    artist: string;
    artistQuote: Quote | null;
    avatar: string;
    avatarInfo: string;
    birthyear: string;
    color: string;
    copyright: number;
    deathyear: string;
    desc: string;
    info: string;
    movements: string[];
    mySlug: string;
    nationality: string;
    query: object;
    secondaryColor: string;
    site: string;
    title: string;
  }>,
) {
  const {
    artist,
    artistQuote,
    avatar,
    avatarInfo,
    birthyear,
    color,
    copyright,
    deathyear,
    desc,
    info,
    movements,
    mySlug,
    nationality,
    query,
    secondaryColor,
    site,
    title,
  } = props.data;

  const draggable = false;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
      </Head>

      <main id="page" data-name="collection" class="scrollable flex-grow mb-6 xl:max-h-screen xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
        <div
          class={`relative w-auto flex flex-col mx-auto`}
        >
          {movements &&
            <div class={`invisible md:visible absolute mt-12 ml-16`}>
              {movements && movements.map((p) => (
                <div class={`paper max-w-[140px] min-h-8 mt-1 ${p.position} font-${p.font} shadow-none`}>
                  <div class="top-tape max-h-3"></div>
                  <a
                    href={"/movement/" + p.movement_slug}
                    class={`z-10 text-lighterdark text-xl italic underline select-none`}
                    draggable={draggable}
                  >
                    {p.movement_name}
                  </a>
                </div>
              ))}
            </div>
          }

          <div class={`mx-auto mt-8 z-10`}>
            <AnimBrushStroke
              color={color}
              font="brush"
              secondaryColor={secondaryColor}
              title={artist}
            />
          </div>
          <div class={`-mt-44`}>
            <div
              class={`h-[38rem] md:h-96 bg-lighterdark shadow-2xl`}
            >
            </div>

            <div
              class={`-mt-[27rem] md:-mt-[13.5rem] text-white`}
            >
              <div
                class={`w-11/12 xl:w-[38rem] mx-auto text-center`}
              >
                <p class="font-bold italic text-xl">
                  {birthyear + deathyear}
                </p>
                <img
                  class={`inline-block w-12 mt-2`}
                  src={"/flags/" + nationality + ".png"}
                  alt={nationality}
                  draggable={draggable}
                />
                <p class="font-bold text-lg mb-2">
                  {"Nationalité : " + nationality}
                </p>
                <p class={`text-[1.1rem] text-justify leading-5 select-none`} dangerouslySetInnerHTML={{ __html: info }}></p>
              </div>

              {site &&
                (
                  <div class={`relative w-11/12 mt-3 sm:mt-2`}>
                    <div class="paper min-h-8 max-w-[230px] ml-auto shadow-none">
                      <div class="top-tape"></div>
                      <a
                        href={site}
                        class={`z-10 text-lighterdark text-base italic underline select-none`}
                        target="_blank"
                        draggable={draggable}
                      >
                        {site}
                      </a>
                    </div>
                  </div>
                )}

              {avatar &&
                (
                  <div
                    class={`-mt-12 xl:-mt-40 grid grid-cols-1 xl:grid-cols-3`}
                  >
                    <div class={`pt-16 sm:pt-12 sm:pl-12 sm:pr-12`}>
                      <Avatar copyright={copyright} info={avatarInfo} name={artist} url={avatar} />
                    </div>
                  </div>
                )}
            </div>
          </div>

          {artistQuote && !query?.alone && (
            <div class="w-full mx-auto mt-8 2xl:-mt-8 mb-4">
              <Quote data={artistQuote} delay={10} />
            </div>
          )}

          {copyright != 2 && (
            <Partial name="artist-collection">
              <CollectionSearch query={query} myslug={mySlug} type="artist" />
            </Partial>
          )}

          {copyright === 2 &&
            (
              <div class={`flex-grow`}>
                <div
                  class={`max-w-2xl mx-auto py-10 px-6 mt-5`}
                >
                  <div
                    class={`paper max-w-[600px] mx-auto`}
                  >
                    <div class="top-tape"></div>
                    <div
                      class={`w-full my-3 mx-1`}
                    >
                      <p
                        class={`text-2xl md:text-3xl font-extrabold leading-5 text-center text-lighterdark`}
                      >
                        <span class={`text-7xl md:text-8xl`}>©</span>
                        <br />
                        Les œuvres de l’artiste ne sont pas encore disponibles
                        pour des raisons de droit d’auteur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>

      <WaterDrop
        color={color}
        isDropy
        pencilColor={secondaryColor}
      />
      <Footer color={color} />
    </>
  );
}
