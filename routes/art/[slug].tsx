import { ArtistQuote } from "@utils/types.tsx";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import AnimBrushStroke from "@islands/AnimBrushStroke.tsx";
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
    let birthyear: string | null = null;
    let color: string | null = null;
    let copyright: number | null = null;
    let deathyear: string | null = null;
    let desc: string | null = null;
    let info: string | null = null;
    let mySlug: string | null = null;
    let nationality: string | null = null;
    let query: object | null = null;
    let secondaryColor: string | null = null;
    let site: string | null = null;
    let title: string | null = null;

    if (result) {
      const fromLeonardo = url.searchParams.has("fromleonardo");
      const id = url.searchParams.get("id") || "";
      artist = result.first_name !== null
        ? result.first_name + " " + result.last_name
        : result.last_name;
      if (result.quote !== null) {
        artistQuote = {first_name: result.first_name, last_name: result.last_name, signature: result.signature, quote: result.quote};
      } else {
        artistQuote = null;
      }
      avatar = result.avatar_url;
      birthyear = result.birthyear;
      color = result.color;
      copyright = result.copyright;
      deathyear = result.deathyear !== "" ? " — " + result.deathyear : "";
      desc = "Les plus belles œuvres de " + artist + ".";
      info = result.info;
      mySlug = result.slug;
      nationality = result.nationality;
      query = {
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
      birthyear,
      color,
      copyright,
      deathyear,
      desc,
      info,
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
    birthyear: string;
    color: string;
    copyright: number;
    deathyear: string;
    desc: string;
    info: string;
    mySlug: string;
    nationality: string;
    query: string;
    secondaryColor: string;
    site: string;
    title: string;
  }>,
) {
  const {
    artist,
    artistQuote,
    avatar,
    birthyear,
    color,
    copyright,
    deathyear,
    desc,
    info,
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

      <main id="page" data-name="art" class={`flex-grow mb-20`}>
        <div
          class={`w-auto flex flex-col mx-auto`}
        >
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
                  <div class={`relative w-11/12 mt-2`}>
                    <div class="paper min-h-8 max-w-[230px] ml-auto shadow-none">
                      <div class="top-tape"></div>
                      <a
                        href={site}
                        class={`z-10 text-lighterdark text-base italic underline select-none`}
                        draggable={draggable}
                        target="_blank"
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
                    <div class={`pt-20 sm:pt-12 sm:pl-12 sm:pr-12`}>
                      <div
                        class={`p-6 w-60 mx-auto text-center bg-lighterdark rounded-xl overflow-hidden shadow-2xl`}
                      >
                        <img
                          src={avatar}
                          alt={avatar}
                          draggable={draggable}
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {artistQuote && (
            <div class="w-full mx-auto mt-8 2xl:-mt-8 mb-4">
              <Quote data={artistQuote} />
            </div>
          )}

          {copyright != 2 && (
            <CollectionSearch query={query} myslug={mySlug} type="artist" />
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
                      class={`w-full my-5 mx-1`}
                    >
                      <p
                        class={`text-2xl md:text-3xl font-extrabold leading-8 text-center text-lighterdark`}
                      >
                        <span class={`text-7xl md:text-8xl`}>©</span>
                        <br />
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
