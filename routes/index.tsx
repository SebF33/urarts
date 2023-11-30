import { ArtistQuote, ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Quote from "@islands/Quote.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;
type Quote = Array<ArtistQuote>;

export const handler: Handlers = {
  async GET(_, ctx) {
    const db = Db.getInstance();

    const artistQuery = await db.selectFrom("artist")
      .selectAll()
      .where("slug", "not in", TALENTS)
      .orderBy(sql`random()`)
      .limit(4)
      .execute();

    const artists = artistQuery.map((p) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      nationality: p.nationality,
      birthyear: p.birthyear,
      deathyear: p.deathyear,
      avatar_url: p.avatar_url,
      signature: p.signature,
      color: p.color,
      site_web: p.site_web,
      info: p.info,
      slug: p.slug,
    }));

    const artistQuote = await db.selectFrom("artist")
      .select([
        "first_name",
        "last_name",
        "avatar_url",
        "signature",
        "quote",
        "slug",
      ])
      .where("quote", "is not", null)
      .orderBy(sql`random()`)
      .executeTakeFirst();

    const randomColorsIndex = Math.floor(Math.random() * 7);
    const colors = [
      colorScheme[currentColorScheme].lighterdark,
      colorScheme[currentColorScheme].red,
      colorScheme[currentColorScheme].green,
      colorScheme[currentColorScheme].yellow,
      colorScheme[currentColorScheme].blue,
      colorScheme[currentColorScheme].magenta,
      colorScheme[currentColorScheme].cyan,
    ];
    const color = colors[randomColorsIndex];

    const grid =
      "grid gap-4 sm:gap-10 grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-14";

    return ctx.render({ artistQuote, artists, color, grid });
  },
};

export default function HomePage(
  props: PageProps<{
    artistQuote: Quote;
    artists: Artists;
    color: string;
    grid: string;
  }>,
) {
  const { artistQuote, artists, color, grid } = props.data;
  const desc = "Quelles sont les plus belles œuvres d'art au monde ?";
  const title = "Urarts - Accueil";

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

      <main class="flex-grow">
        <ArtistsLayout artists={artists} grid={grid} />
        <Quote data={artistQuote} />
      </main>

      <WaterDrop color={color} />
      <Footer color={color} />
    </>
  );
}
