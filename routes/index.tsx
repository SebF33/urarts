import { ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { sql } from "kysely";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type ArtistQuote = {
  first_name: string | null;
  last_name: string;
  signature: string | null;
  quote: string | null;
};
type Artists = Array<ArtistRow>;

export const handler: Handlers<{}> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const db = Db.getInstance();

    const artistQuery = await db.selectFrom("artist")
      .selectAll()
      .where("slug", "!=", "mimi")
      .orderBy(sql`random()`)
      .limit(4)
      .execute();

    const artists = artistQuery.map((p) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      nationality: p.nationality,
      avatar_url: p.avatar_url,
      signature: p.signature,
      site_web: p.site_web,
      info: p.info,
      slug: p.slug,
    }));

    const artistQuote = await db.selectFrom("artist")
      .select(["first_name", "last_name", "signature", "quote"])
      .where("quote", "is not", null)
      .where("slug", "!=", "mimi")
      .orderBy(sql`random()`)
      .executeTakeFirst();

    const randomColorsIndex = Math.floor(Math.random() * 8);
    const colors = [
      colorScheme[currentColorScheme].lighterdark,
      colorScheme[currentColorScheme].red,
      colorScheme[currentColorScheme].green,
      colorScheme[currentColorScheme].yellow,
      colorScheme[currentColorScheme].blue,
      colorScheme[currentColorScheme].magenta,
      colorScheme[currentColorScheme].cyan,
      colorScheme[currentColorScheme].gray,
    ];
    const color = colors[randomColorsIndex];

    const grid =
      "grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-14";

    return ctx.render({ artistQuote, artists, color, grid, pathname });
  },
};

export default function Home(
  props: PageProps<{
    artistQuote: ArtistQuote;
    artists: Artists;
    color: string;
    grid: string;
    pathname: string;
  }>,
) {
  const { artistQuote, artists, color, grid, pathname } = props.data;

  return (
    <DefaultLayout
      title="Urarts - Accueil"
      desc="Quelles sont les plus belles œuvres d'art au monde ?"
    >
      <div
        class={tw`flex flex-col min-h-screen font-brush ${
          css({
            background: `url(/bg)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "316px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname={pathname} />
        <main
          class={tw`flex-grow`}
        >
          <ArtistsLayout artists={artists} grid={grid} />
          <div
            class={tw`mx-auto ${
              css(
                {
                  "color": `${colorScheme[currentColorScheme].lighterdark}`,
                },
              )
            }`}
          >
            <p class={tw`text-center text-xl font-bold w-5/6 md:w-1/2 mx-auto`}>
              “{artistQuote.quote}”<br></br>—{artistQuote.first_name}{" "}
              {artistQuote.last_name}
            </p>
            {artistQuote.signature &&
              (
                <div
                  class={tw`flex justify-end w-5/6 md:w-1/3 max-h-9 mx-auto`}
                >
                  <img
                    class={tw`max-w-[100px]`}
                    src={artistQuote.signature}
                    alt={artistQuote.signature}
                  />
                </div>
              )}
          </div>
        </main>
        <WaterDrop color={color} />
        <Footer color={color} />
      </div>
    </DefaultLayout>
  );
}
