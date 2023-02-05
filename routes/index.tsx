import { ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { quotes } from "@utils/quotes.ts";
import { sql } from "kysely";

import ArtistsLayout from "@components/ArtistsLayout.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers<{
  artists: Artists;
  color: string;
  grid: string;
  quote: string;
}> = {
  async GET(_, ctx) {
    const db = Db.getInstance();
    const results = await db.selectFrom("artist")
      .selectAll()
      .where("slug", "!=", "mimi")
      .orderBy(sql`random()`)
      .limit(4)
      .execute();

    const artists = results.map((p) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      avatar_url: p.avatar_url,
      signature: p.signature,
      slug: p.slug,
    }));

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
      "grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-14";

    const randomQuotesIndex = Math.floor(Math.random() * 29);
    const quote = quotes[randomQuotesIndex];

    return ctx.render({ artists, color, grid, quote });
  },
};

export default function Home(
  props: PageProps<{
    artists: Artists;
    color: string;
    grid: string;
    quote: string;
  }>,
) {
  const { artists, color, grid, quote } = props.data;

  return (
    <DefaultLayout
      title="Accueil Urarts"
      desc="Quelles sont les plus belles œuvres d'art au monde ?"
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "316px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Header />
        <main
          class={tw`flex-grow`}
        >
          <ArtistsLayout artists={artists} grid={grid} />
          <div
            class={tw`font-brush mx-auto ${
              css(
                {
                  "color": `${colorScheme[currentColorScheme].lighterdark}`,
                },
              )
            }`}
          >
            <p class={tw`text-center text-xl font-bold`}>{quote}</p>
          </div>
        </main>
        <WaterDrop color={color} />
        <Footer color={color} />
      </div>
    </DefaultLayout>
  );
}
