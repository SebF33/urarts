import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { INDICATORS_MOVEMENTS, TALENTS } from "@utils/constants.ts";
import { sql } from "kysely";

import Doughnut from "@islands/chart/Doughnut.tsx";
import Footer from "@islands/footer/Footer.tsx";
import PolarArea from "@islands/chart/PolarArea.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import Title from "@islands/Title.tsx";


export const handler: Handlers = {
  async GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.indicators.desc", { ns: "translation" });
    const title = i18next.t("meta.indicators.title", { ns: "translation" });
    const lng = i18next.language;
    
    const db = Db.getInstance();
    const { count } = db.fn;

    const [artistQuery, totalArtistQuery, movementQuery, totalArtQuery] = await Promise.all([
      db
        .selectFrom("artist")
        .innerJoin("country", "artist.country_id", "country.id")
        .$if(lng === 'fr', (qb) => qb.select([
          "country.name as nationality",
          "country.name as nationality_value",
          sql`CASE WHEN country_id IN (1,2,4,6,8) THEN country.name ELSE 'Autres' END as nationality_group`,
          sql`CASE WHEN country_id IN (1,2,4,6,8) THEN country.name ELSE 'Monde' END as nationality_value`,
          count("artist.id").as("artist_count"),
        ]))
        .$if(lng === 'en', (qb) => qb.select([
          "country.name_en as nationality",
          "country.name as nationality_value",
          sql`CASE WHEN country_id IN (1,2,4,6,8) THEN country.name_en ELSE 'Others' END as nationality_group`,
          sql`CASE WHEN country_id IN (1,2,4,6,8) THEN country.name ELSE 'Monde' END as nationality_value`,
          count("artist.id").as("artist_count"),
        ]))
        .where("slug", "not in", TALENTS)
        .groupBy("nationality_group")
        .execute(),

      db
        .selectFrom("artist")
        .select([
          count("id").as("artist_count"),
        ])
        .where("slug", "not in", TALENTS)
        .execute(),

      db
        .selectFrom("art")
        .innerJoin("artist", "art.owner_id", "artist.id")
        .innerJoin("movement", "art.movement_id", "movement.id")
        .$if(lng === 'fr', (qb) => qb.select([
          "movement.name",
          "movement.slug as movement_value",
          sql`CASE WHEN movement.slug IN (${sql.join(INDICATORS_MOVEMENTS)}) THEN movement.name ELSE 'Autres' END as movement_group`,
          sql`CASE WHEN movement.slug IN (${sql.join(INDICATORS_MOVEMENTS)}) THEN movement.slug ELSE 'movements' END as movement_value`,
          count("art.id").as("art_count"),
        ]))
        .$if(lng === 'en', (qb) => qb.select([
          "movement.name_en as name",
          "movement.slug as movement_value",
          sql`CASE WHEN movement.slug IN (${sql.join(INDICATORS_MOVEMENTS)}) THEN movement.name_en ELSE 'Others' END as movement_group`,
          sql`CASE WHEN movement.slug IN (${sql.join(INDICATORS_MOVEMENTS)}) THEN movement.slug ELSE 'movements' END as movement_value`,
          count("art.id").as("art_count"),
        ]))
        .where("artist.slug", "not in", TALENTS)
        .where("copyright", "!=", 2)
        .groupBy("movement_group")
        .execute(),

      db
        .selectFrom("art")
        .innerJoin("artist", "art.owner_id", "artist.id")
        .select([count("art.id").as("art_count")])
        .where("artist.slug", "not in", TALENTS)
        .where("copyright", "!=", 2)
        .execute(),
    ]);

    const artistCountResult: number[] = artistQuery.map((item) => parseFloat(item.artist_count));
    const artistNationalityResult: string[] = artistQuery.map((item) => item.nationality_group);
    const artistNationalityValueResult: string[] = artistQuery.map((item) => item.nationality_value);
    const totalArtistCountResult: number[] = totalArtistQuery.map((item) => parseFloat(item.artist_count));
    
    const movementCountResult: number[] = movementQuery.map((item) => parseFloat(item.art_count));
    const movementNameResult: string[] = movementQuery.map((item) => item.movement_group);
    const movementValueResult: string[] = movementQuery.map((item) => item.movement_value);
    const totalArtCountResult: number[] = totalArtQuery.map((item) => parseFloat(item.art_count));
    
    return ctx.render({
      artistCountResult,
      artistNationalityResult,
      artistNationalityValueResult,
      desc,
      movementCountResult,
      movementNameResult,
      movementValueResult,
      title,
      totalArtCountResult,
      totalArtistCountResult,
    });
  },
};


export default function IndicatorsPage(
  props: PageProps<{
    artistCountResult: number[];
    artistNationalityResult: string[];
    artistNationalityValueResult: string[];
    desc: string;
    movementCountResult: number[];
    movementNameResult: string[];
    movementValueResult: string[];
    title: string;
    totalArtCountResult: number[];
    totalArtistCountResult: number[];
  }>,
) {

  const {
    artistCountResult,
    artistNationalityResult,
    artistNationalityValueResult,
    desc,
    movementCountResult,
    movementNameResult,
    movementValueResult,
    title,
    totalArtCountResult,
    totalArtistCountResult,
  } = props.data;
  

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
            dimension="min-h-[30px] max-w-[115px] md:min-h-[60px] md:max-w-[230px]"
            margin="mt-2 mb-6 md:mt-5"
          />

          <div class={`charts flex justify-center max-w-xl mt-12 mx-auto`}>
            <Doughnut
              countResult={artistCountResult}
              nationalityResult={artistNationalityResult}
              totalArtistCountResult={totalArtistCountResult}
              valueResult={artistNationalityValueResult}
            />
            <PolarArea
              countResult={movementCountResult}
              nameResult={movementNameResult}
              totalArtCountResult={totalArtCountResult}
              valueResult={movementValueResult}
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
