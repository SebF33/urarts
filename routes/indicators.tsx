import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { sql } from "kysely";

import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Nav from "@islands/Nav.tsx";
import Doughnut from "@islands/Doughnut.tsx";
import PolarArea from "@islands/PolarArea.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

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

    const movementQuery = await db
      .selectFrom("art")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "movement.name",
        sql`CASE WHEN movement.slug IN ('artdeco', 'baroque', 'cubisme', 'impressionnisme', 'realisme', 'renaissanceitalienne', 'surrealisme') THEN movement.name ELSE 'Autres' END as movement_group`,
        count("art.id").as("art_count"),
      ])
      .groupBy("movement_group")
      .execute();

    const artistCountResult: number[] = artistQuery.map((item) =>
      parseFloat(item.artist_count)
    );
    const artistNationalityResult: string[] = artistQuery.map((item) =>
      item.nationality_group
    );
    const movementCountResult: number[] = movementQuery.map((item) =>
      parseFloat(item.art_count)
    );
    const movementNameResult: string[] = movementQuery.map((item) =>
      item.movement_group
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
    });
  },
};

export default function Home(
  props: PageProps<{
    artistCountResult: number[];
    artistNationalityResult: string[];
    color: string;
    movementCountResult: number[];
    movementNameResult: string[];
    pathname: string;
  }>,
) {
  const {
    artistCountResult,
    artistNationalityResult,
    color,
    movementCountResult,
    movementNameResult,
    pathname,
  } = props.data;

  return (
    <DefaultLayout
      title="Urarts - Indicateurs"
      desc="Indicateurs pour Urarts"
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
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
            <h1 class={tw`text-5xl font-medium mx-auto mb-6`}>
              Indicateurs
            </h1>
            <div
              class={tw`charts flex items-center justify-evenly mx-auto max-w-xl`}
            >
              <Doughnut
                countResult={artistCountResult}
                nationalityResult={artistNationalityResult}
              />
              <div style="height:60px; width:60px"></div>
              <PolarArea
                countResult={movementCountResult}
                nameResult={movementNameResult}
              />
            </div>
          </div>
        </main>
        <WaterDrop color={color} />
        <Footer color={color} />
      </div>
    </DefaultLayout>
  );
}
