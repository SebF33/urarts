import { ArtistQuote, ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import FamousArtSideBar from "@islands/livesearch/FamousArtSideBar.tsx";
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
        "id",
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

      <main id="page" data-name="home" class="flex-grow">
        <button
          x-on:click="open = true"
          class="absolute top-20 right-3 p-2 gap-1 hidden 2xl:flex justify-center items-center bg-black text-sm text-white rounded-md">
          <span class="sr-only">Ouvrir</span>
          <svg
            width="1.4rem"
            height="1.4rem"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g stroke-width="0"></g>
            <g stroke-linecap="round" stroke-linejoin="round">
            </g>
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                fill="currentColor"
              >
              </path>
            </g>
          </svg>
        </button>

        <ArtistsLayout artists={artists} flag="home" grid={grid} />

        <div class="mx-auto -mt-4 mb-6">
          <Quote data={artistQuote} />
        </div>
      </main>

      <FamousArtSideBar />

      <WaterDrop
        color={color}
        isDropy
        pencilColor={colorScheme[currentColorScheme].lighterdark}
      />
      <Footer color={color} />
    </>
  );
}
