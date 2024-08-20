import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import Doughnut from "@islands/chart/Doughnut.tsx";
import Footer from "@islands/footer/Footer.tsx";
import PolarArea from "@islands/chart/PolarArea.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import Title from "@islands/Title.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const lng = i18next.language;

    const db = Db.getInstance();
    const { count } = db.fn;

    const artistQuery = await db
      .selectFrom("artist")
      .innerJoin("country", "artist.country_id", "country.id")
      .$if(lng === 'fr', (qb) => qb.select([
        "country.name as nationality",
        sql`CASE WHEN country_id IN (1,2,4,6,8) THEN country.name ELSE 'Autres' END as nationality_group`,
        count("artist.id").as("artist_count"),
      ]))
      .$if(lng === 'en', (qb) => qb.select([
        "country.name_en as nationality",
        sql`CASE WHEN country_id IN (1,2,4,6,8) THEN country.name_en ELSE 'Others' END as nationality_group`,
        count("artist.id").as("artist_count"),
      ]))
      .where("slug", "not in", TALENTS)
      .groupBy("nationality_group")
      .execute();

    const totalArtistQuery = await db
      .selectFrom("artist")
      .select([
        count("id").as("artist_count"),
      ])
      .where("slug", "not in", TALENTS)
      .execute();

    const movementQuery = await db
      .selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .$if(lng === 'fr', (qb) => qb.select([
        "movement.name",
        sql`CASE WHEN movement.slug IN ('artdeco', 'baroque', 'cubisme', 'impressionnisme', 'realisme', 'renaissanceitalienne', 'surrealisme') THEN movement.name ELSE 'Autres' END as movement_group`,
        count("art.id").as("art_count"),
      ]))
      .$if(lng === 'en', (qb) => qb.select([
        "movement.name_en as name",
        sql`CASE WHEN movement.slug IN ('artdeco', 'baroque', 'cubisme', 'impressionnisme', 'realisme', 'renaissanceitalienne', 'surrealisme') THEN movement.name_en ELSE 'Others' END as movement_group`,
        count("art.id").as("art_count"),
      ]))
      .where("artist.slug", "not in", TALENTS)
      .where("copyright", "!=", 2)
      .groupBy("movement_group")
      .execute();

    const totalArtQuery = await db
      .selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .select([count("art.id").as("art_count")])
      .where("artist.slug", "not in", TALENTS)
      .where("copyright", "!=", 2)
      .execute();

    const artistCountResult: number[] = artistQuery.map((item) => parseFloat(item.artist_count));
    const artistNationalityResult: string[] = artistQuery.map((item) => item.nationality_group);
    const totalArtistCountResult: number[] = totalArtistQuery.map((item) => parseFloat(item.artist_count));

    const movementCountResult: number[] = movementQuery.map((item) => parseFloat(item.art_count));
    const movementNameResult: string[] = movementQuery.map((item) => item.movement_group);
    const totalArtCountResult: number[] = totalArtQuery.map((item) => parseFloat(item.art_count));

    return ctx.render({
      artistCountResult,
      artistNationalityResult,
      movementCountResult,
      movementNameResult,
      totalArtCountResult,
      totalArtistCountResult,
    });
  },
};

export default function IndicatorsPage(
  props: PageProps<{
    artistCountResult: number[];
    artistNationalityResult: string[];
    movementCountResult: number[];
    movementNameResult: string[];
    totalArtCountResult: number[];
    totalArtistCountResult: number[];
  }>,
) {
  const {
    artistCountResult,
    artistNationalityResult,
    movementCountResult,
    movementNameResult,
    totalArtCountResult,
    totalArtistCountResult,
  } = props.data;
  const desc = "Indicateurs pour Urarts.";
  const title = "Urarts - Indicateurs";

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

      <main id="page" data-name="indicators" class="flex-grow transparent-mask-99">
        <div class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <Title
            name="indicators"
            dimension="min-h-[60px] max-w-[230px]"
            margin="mt-5 mb-6"
          />

          <div
            class={`charts flex justify-center mx-auto max-w-xl`}
          >
            <Doughnut
              countResult={artistCountResult}
              nationalityResult={artistNationalityResult}
              totalArtistCountResult={totalArtistCountResult}
            />
            <div style="height:60px; width:60px"></div>
            <PolarArea
              countResult={movementCountResult}
              nameResult={movementNameResult}
              totalArtCountResult={totalArtCountResult}
            />
          </div>
        </div>
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].gray}
        isDropy
        pencilColor={colorScheme[currentColorScheme].gray}
      />
      <Footer color={colorScheme[currentColorScheme].gray} />
    </>
  );
}
