import { ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { sql } from "kysely";
import { tw } from "@twind";

import ArtistsLayout from "@components/ArtistsLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers<{
  artists: Artists;
  color: string;
  grid: string;
}> = {
  async GET(_, ctx) {
    const db = Db.getInstance();
    const results = await db.selectFrom("artist").selectAll()
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

    const randomIndex = Math.floor(Math.random() * 8);
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
    const color = colors[randomIndex];

    const grid =
      "grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-20";

    return ctx.render({ artists, color, grid });
  },
};

export default function Home(
  props: PageProps<{
    artists: Artists;
    color: string;
    grid: string;
  }>,
) {
  const { artists, color, grid } = props.data;

  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />
      <main class={tw`flex-grow`}>
        <ArtistsLayout artists={artists} grid={grid} />
      </main>
      <WaterDrop color={color} />
      <Footer color={color} />
    </div>
  );
}
