import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";

import { AnimBrushStroke, BrushStroke } from "@components/Assets.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers<{}> = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const url = new URL(req.url);

    // Firefox :
    // Le clip-path du SVG n'est pas correctement géré par ce navigateur.
    // Pour sélection de l'asset non animé à la place.
    const userAgent = req.headers.get("user-agent");
    const isFirefox = userAgent.toLowerCase().includes("firefox");
    const isNotFirefox = !isFirefox;

    const db = Db.getInstance();
    const result = await db.selectFrom("artist")
      .select([
        "first_name",
        "last_name",
        "avatar_url",
        "color",
        "info",
        "nationality",
        "birthyear",
        "deathyear",
        "copyright",
        "slug",
      ])
      .where("slug", "=", slug)
      .executeTakeFirst();

    let artist: string | null = null;
    let avatar: string | null = null;
    let color: string | null = null;
    let copyright: number | null = null;
    let desc: string | null = null;
    let info: string | null = null;
    let mySlug: string | null = null;
    let nationality: string | null = null;
    let birthyear: string | null = null;
    let deathyear: string | null = null;
    let query: string | null = null;
    let title: string | null = null;

    if (result) {
      artist = result.first_name !== null
        ? result.first_name + " " + result.last_name
        : result.last_name;
      avatar = result.avatar_url;
      color = result.color;
      copyright = result.copyright;
      desc = "Les plus belles œuvres de " + artist + ".";
      info = result.info;
      mySlug = result.slug;
      nationality = result.nationality;
      birthyear = result.birthyear;
      deathyear = result.deathyear !== "" ? " — " + result.deathyear : "";
      query = url.searchParams.get("id") || "";
      title = artist + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({
      artist,
      avatar,
      color,
      copyright,
      desc,
      info,
      isFirefox,
      isNotFirefox,
      mySlug,
      nationality,
      birthyear,
      deathyear,
      query,
      title,
    });
  },
};

export default function ArtistArtsPage(
  props: PageProps<{
    artist: string;
    avatar: string;
    color: string;
    copyright: number;
    desc: string;
    info: string;
    isFirefox: boolean;
    isNotFirefox: boolean;
    mySlug: string;
    nationality: string;
    birthyear: string;
    deathyear: string;
    query: string;
    title: string;
  }>,
) {
  const {
    artist,
    avatar,
    color,
    copyright,
    desc,
    info,
    isFirefox,
    isNotFirefox,
    mySlug,
    nationality,
    birthyear,
    deathyear,
    query,
    title,
  } = props.data;

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

      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/gray)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "540px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname="/arts" />

        <main
          class={tw`flex-grow`}
        >
          <div
            class={tw`w-auto flex flex-col mx-auto`}
          >
            <div class={tw`mx-auto mt-8 z-10`}>
              {isFirefox &&
                (
                  <BrushStroke
                    color={color}
                    font="brush"
                    fontcolor="lighterdark"
                    title={artist}
                  />
                )}
              {isNotFirefox &&
                (
                  <AnimBrushStroke
                    color={color}
                    font="brush"
                    fontcolor="lighterdark"
                    title={artist}
                  />
                )}
            </div>
            <div id="bannerInfo" class={tw`-mt-44`}>
              <div
                class={tw`h-[38rem] md:h-96 bg-lighterdark shadow-2xl`}
              >
              </div>

              <div class={tw`-mt-[27rem] md:-mt-[13.5rem]`}>
                <div
                  class={tw`w-11/12 xl:w-3/6 mx-auto text-center text-white font-brush`}
                >
                  <p class="font-bold italic text-xl">
                    {birthyear + deathyear}
                  </p>
                  <img
                    class={tw`inline-block mt-2`}
                    src={"/flags/" + nationality + ".png"}
                    alt={nationality}
                  />
                  <p class="font-bold text-lg mb-4">
                    {"Nationalité : " + nationality}
                  </p>
                  <p class={tw`text-left text-base select-none`}>{info}</p>
                </div>

                {avatar &&
                  (
                    <div
                      class={tw`-mt-12 xl:-mt-40 grid grid-cols-1 xl:grid-cols-3`}
                    >
                      <div class={tw`pt-20 sm:pt-12 sm:pl-12 sm:pr-12`}>
                        <div
                          class={tw`p-6 w-60 mx-auto text-center bg-lighterdark rounded-xl overflow-hidden shadow-2xl`}
                        >
                          <img
                            src={avatar}
                            alt={avatar}
                          />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {copyright != 2 &&
              <CollectionSearch id={query} myslug={mySlug} type="artist" />}

            {copyright === 2 &&
              (
                <div class={tw`flex-grow font-brush`}>
                  <div
                    class={tw`p-4 max-w-2xl mx-auto px-4 sm:px-6 mt-5`}
                  >
                    <p
                      class={tw`text-2xl md:text-3xl font-extrabold mx-auto text-center`}
                    >
                      <span class={tw`text-3xl md:text-4xl`}>©</span>
                      Les œuvres de l’artiste ne sont pas encore disponibles
                      pour des raisons de droit d’auteur.
                    </p>
                  </div>
                </div>
              )}
          </div>
        </main>

        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </>
  );
}
