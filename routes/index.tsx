import { ArtistQuote, ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { ButtonLines } from "@components/Assets.tsx";
import FamousArtSideBar from "@islands/livesearch/FamousArtSideBar.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Quote from "@islands/Quote.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;
type Quote = Array<ArtistQuote>;

export const handler: Handlers = {
  async GET(_, ctx) {
    const lng = i18next.language;

    const db = Db.getInstance();

    const artistQuery = await db.selectFrom("artist")
      .innerJoin("country", "artist.country_id", "country.id")
      .select([
        "artist.id",
        "first_name", "last_name",
        "birthyear", "deathyear",
        "avatar_url", "signature", "color", "site_web",
        "slug",
      ])
      .$if(lng === 'fr', (qb) => qb.select("info"))
      .$if(lng === 'en', (qb) => qb.select("info_en as info"))
      .$if(lng === 'fr', (qb) => qb.select("country.name as nationality"))
      .$if(lng === 'en', (qb) => qb.select("country.name_en as nationality"))
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
        "first_name", "last_name",
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

      <main id="page" data-name="home" class="flex-grow transparent-mask-99">
        <button
          x-on:click="openFamousArt = true"
          class="absolute top-20 right-3 p-2 gap-1 hidden 2xl:flex justify-center items-center bg-lighterdark text-sm text-white rounded-md">
          <span class="sr-only">Ouvrir</span>
          <ButtonLines />
        </button>

        <ArtistsLayout artists={artists} flag="home" grid={grid} />

        <div class="mx-auto -mt-28 mb-10">
          <Quote data={artistQuote} delay={100} />
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
