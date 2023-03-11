import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { BrushStroke } from "@components/Assets.tsx";
import CollectionSearch from "@islands/CollectionSearch.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Nav from "@islands/Nav.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

export const handler: Handlers<{
  artist: string | null;
  color: string | null;
  desc: string | null;
  mySlug: string | null;
  query: string | null;
  title: string | null;
}> = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const url = new URL(req.url);

    const db = Db.getInstance();

    const result = await db.selectFrom("artist").select([
      "first_name",
      "last_name",
      "color",
      "slug",
    ]).where("slug", "=", slug).executeTakeFirst();

    let artist: string | null = null;
    let color: string | null = null;
    let desc: string | null = null;
    let mySlug: string | null = null;
    let query: string | null = null;
    let title: string | null = null;

    if (result) {
      artist = result.first_name !== null
        ? result.first_name + " " + result.last_name
        : result.last_name;
      color = result.color;
      desc = "Les plus belles œuvres de " + artist + ".";
      mySlug = result.slug;
      query = url.searchParams.get("id") || "";
      title = artist + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({ artist, color, desc, mySlug, query, title });
  },
};

export default function Arts(
  props: PageProps<{
    artist: string;
    color: string;
    desc: string;
    mySlug: string;
    query: string;
    title: string;
  }>,
) {
  const { artist, color, desc, mySlug, query, title } = props.data;

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
            class={tw`w-auto flex flex-col mx-auto my-6`}
          >
            <BrushStroke color={color} font="brush" title={artist} />
            {mySlug === "mimi" &&
              (
                <div
                  class={tw`font-brush mx-2 mt-5 ${
                    css(
                      {
                        "color": `${
                          colorScheme[currentColorScheme].lighterdark
                        }`,
                      },
                    )
                  }`}
                >
                  <p class={tw`text-center text-xl font-bold`}>
                    “Je dédie cette page aux plus belles œuvres de mon artiste
                    préférée, celle qui au-delà de son talent exceptionnel
                    m’inspire encore aujourd’hui : ma merveilleuse Maman.”
                    —Sébastien
                  </p>
                </div>
              )}
            <CollectionSearch id={query} myslug={mySlug} type="artist" />
          </div>
        </main>
        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
