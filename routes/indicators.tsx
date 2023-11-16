import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { sql } from "kysely";
import { talents } from "@utils/variables.ts";
import { tw } from "twind";

import Doughnut from "@islands/chart/Doughnut.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import PolarArea from "@islands/chart/PolarArea.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers<{}> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const db = Db.getInstance();
    const { count } = db.fn;

    const artistQuery = await db
      .selectFrom("artist")
      .select([
        "nationality",
        sql`CASE WHEN nationality IN ('Allemagne', 'Belgique', 'Espagne', 'France', 'Italie') THEN nationality ELSE 'Autres' END as nationality_group`,
        count("id").as("artist_count"),
      ])
      .groupBy("nationality_group")
      .execute();

    const totalArtistQuery = await db
      .selectFrom("artist")
      .select([
        count("id").as("artist_count"),
      ])
      .where("slug", "not in", talents)
      .execute();

    const movementQuery = await db
      .selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "movement.name",
        sql`CASE WHEN movement.slug IN ('artdeco', 'baroque', 'cubisme', 'impressionnisme', 'realisme', 'renaissanceitalienne', 'surrealisme') THEN movement.name ELSE 'Autres' END as movement_group`,
        count("art.id").as("art_count"),
      ])
      .where("copyright", "!=", 2)
      .groupBy("movement_group")
      .execute();

    const totalArtQuery = await db
      .selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .select([count("art.id").as("art_count")])
      .where("slug", "not in", talents)
      .where("copyright", "!=", 2)
      .execute();

    const artistCountResult: number[] = artistQuery.map((item) =>
      parseFloat(item.artist_count)
    );
    const artistNationalityResult: string[] = artistQuery.map((item) =>
      item.nationality_group
    );
    const totalArtistCountResult: number[] = totalArtistQuery.map((item) =>
      parseFloat(item.artist_count)
    );

    const movementCountResult: number[] = movementQuery.map((item) =>
      parseFloat(item.art_count)
    );
    const movementNameResult: string[] = movementQuery.map((item) =>
      item.movement_group
    );
    const totalArtCountResult: number[] = totalArtQuery.map((item) =>
      parseFloat(item.art_count)
    );

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

    return ctx.render({
      artistCountResult,
      artistNationalityResult,
      color,
      movementCountResult,
      movementNameResult,
      pathname,
      totalArtCountResult,
      totalArtistCountResult,
    });
  },
};

export default function IndicatorsPage(
  props: PageProps<{
    artistCountResult: number[];
    artistNationalityResult: string[];
    color: string;
    movementCountResult: number[];
    movementNameResult: string[];
    pathname: string;
    totalArtCountResult: number[];
    totalArtistCountResult: number[];
  }>,
) {
  const {
    artistCountResult,
    artistNationalityResult,
    color,
    movementCountResult,
    movementNameResult,
    pathname,
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

      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/gray)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "2800px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname={pathname} />

        <main class={tw`flex-grow font-brush`}>
          <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
            <div
              class={tw`paper max-w-[230px] mb-6`}
            >
              <div class="top-tape"></div>
              <h1 class={tw`text-5xl font-medium mx-auto`}>
                Indicateurs
              </h1>
            </div>

            <div
              class={tw`charts flex items-center justify-evenly mx-auto max-w-xl`}
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

        <WaterDrop color={color} />
        <Footer color={color} />
      </div>
    </>
  );
}
