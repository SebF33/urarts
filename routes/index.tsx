import type { ArtistQuote, ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { define } from "@/utils.ts";
import { DisplayCopyrightedArtist } from "@/env.ts";
import { Head } from "fresh/runtime";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { PageProps } from "fresh";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { ButtonLines } from "@components/Assets.tsx";
import { DiscoverPaper } from "@islands/paper/DiscoverPaper.tsx";
import FamousArtSideBar from "@islands/livesearch/FamousArtSideBar.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Quote from "@islands/paper/Quote.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


type Artists = Array<ArtistRow>;


export const handler = define.handlers({
  async GET(_ctx) {
    const desc = i18next.t("meta.home.desc", { ns: "translation" });
    const title = i18next.t("meta.home.title", { ns: "translation" });
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
      .$if(!DisplayCopyrightedArtist, (qb) => qb.where("artist.copyright", "!=", 2))
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

    const artistQuoteQuery = await db.selectFrom("artist")
      .select([
        "id",
        "first_name", "last_name",
        "avatar_url",
        "signature",
        "slug",
      ])
      .$if(lng === 'fr', (qb) => qb.select("quote"))
      .$if(lng === 'en', (qb) => qb.select(sql<string>`CASE WHEN quote_en IS NOT NULL THEN quote_en ELSE quote END`.as("quote")))
      .where("quote", "is not", null)
      .$if(!DisplayCopyrightedArtist, (qb) => qb.where("artist.copyright", "!=", 2))
      .orderBy(sql`random()`)
      .executeTakeFirst();

    const artistQuote = artistQuoteQuery
    ? {
        id: artistQuoteQuery.id,
        first_name: artistQuoteQuery.first_name,
        last_name: artistQuoteQuery.last_name,
        avatar_url: artistQuoteQuery.avatar_url,
        signature: artistQuoteQuery.signature,
        slug: artistQuoteQuery.slug,
        quote: artistQuoteQuery.quote,
      }
    : undefined;

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
      "grid gap-4 sm:gap-10 grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:px-8 2xl:px-20 pt-10 pb-10 lg:pt-20 lg:pb-14";

    return {
      data: { artistQuote, artists, color, desc, grid, title }
    };
  },
});


export default function HomePage(
  props: PageProps<{
    artistQuote: ArtistQuote;
    artists: Artists;
    color: string;
    desc: string;
    grid: string;
    title: string;
  }>,
) {

  const { artistQuote, artists, color, desc, grid, title } = props.data;

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

      <main
        id="page"
        data-name="home"
        class="flex-grow xl:-mb-[35vh]!"
      >
        {/* Bouton : ouvrir la section des œuvres célèbres */}
        <button
          type="button"
          data-open-section="famous-art"
          data-open-value="true"
          class="absolute top-20 right-3 p-2 gap-1 hidden 2xl:flex justify-center items-center bg-lighterdark text-sm text-white rounded-md">
          <span class="sr-only">Ouvrir la section des œuvres célèbres</span>
          <ButtonLines aria-hidden="true" />
        </button>

        {/* Disposition de 4 artistes */}
        <ArtistsLayout artists={artists} flag="home" grid={grid} />

        {/* Post-it : découverte de l'Art */}
        <div class="hidden 2xl:block absolute top-16 -left-16">
          <DiscoverPaper />
        </div>

        {/* Post-it : citation d'un artiste */}
        <div class="mx-auto -mt-[17.5vh] mb-24">
          <Quote data={artistQuote} delay={100} />
        </div>
      </main>

      {/* Section des œuvres célèbres */}
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
