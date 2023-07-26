import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { BrushStroke } from "@components/Assets.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers<{}> = {
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
        "info",
        "nationality",
        "slug",
      ])
      .where("slug", "=", slug)
      .executeTakeFirst();

    let artist: string | null = null;
    let avatar: string | null = null;
    let color: string | null = null;
    let desc: string | null = null;
    let info: string | null = null;
    let mySlug: string | null = null;
    let nationality: string | null = null;
    let query: string | null = null;
    let title: string | null = null;

    if (result) {
      artist = result.first_name !== null
        ? result.first_name + " " + result.last_name
        : result.last_name;
      avatar = result.avatar_url;
      color = result.color;
      desc = "Les plus belles œuvres de " + artist + ".";
      info = result.info;
      mySlug = result.slug;
      nationality = result.nationality;
      query = url.searchParams.get("id") || "";
      title = artist + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({
      artist,
      avatar,
      color,
      desc,
      info,
      mySlug,
      nationality,
      query,
      title,
    });
  },
};

export default function Arts(
  props: PageProps<{
    artist: string;
    avatar: string;
    color: string;
    desc: string;
    info: string;
    mySlug: string;
    nationality: string;
    query: string;
    title: string;
  }>,
) {
  const {
    artist,
    avatar,
    color,
    desc,
    info,
    mySlug,
    nationality,
    query,
    title,
  } = props.data;

  return (
    <DefaultLayout
      title={title}
      desc={desc}
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
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
              <BrushStroke
                color={color}
                font="brush"
                fontcolor="lighterdark"
                title={artist}
              />
            </div>
            <div id="bannerInfo" class={tw`-mt-44`}>
              <div
                class={tw`h-[38rem] md:h-96 bg-lighterdark shadow-2xl`}
              >
              </div>

              <div class={tw`-mt-96 md:-mt-48`}>
                <div
                  class={tw`w-11/12 xl:w-3/6 mx-auto text-center text-white font-brush`}
                >
                  <img
                    class={tw`inline-block`}
                    src={"/flags/" + nationality + ".png"}
                    alt={nationality}
                  />
                  <p class="font-bold text-xl mb-4">
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

            <CollectionSearch id={query} myslug={mySlug} type="artist" />
          </div>
        </main>

        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
