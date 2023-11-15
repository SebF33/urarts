import { ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { sql } from "kysely";
import { talents } from "@utils/variables.ts";
import { tw } from "twind";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers<{}> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const db = Db.getInstance();

    const artistQuery = await db.selectFrom("artist")
      .selectAll()
      .where("slug", "in", talents)
      .orderBy(sql`random()`)
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
      "grid gap-10 sm:gap-6 md:gap-20 lg:gap-64 xl:gap-96 grid-cols-1 sm:grid-cols-2 pt-10 pb-10 lg:pt-20 md:pb-4 lg:pb-0";

    return ctx.render({ artists, color, grid, pathname });
  },
};

export default function TalentsPage(
  props: PageProps<{
    artists: Artists;
    color: string;
    grid: string;
    pathname: string;
  }>,
) {
  const { artists, color, grid, pathname } = props.data;
  const desc = "Les talents.";
  const title = "Urarts - Talents";

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
        class={tw`flex flex-col min-h-screen font-brush ${
          css({
            background: `url(/background/white)`,
            "background-color": `${colorScheme[currentColorScheme].gray}`,
            "background-position": "center",
            "background-size": "420px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname={pathname} />

        <main
          class={tw`flex-grow`}
        >
          <div
            class={tw`p-4 max-w-7xl mx-auto mb-5 sm:mb-8 px-4 sm:px-6 lg:px-8`}
          >
            <h1
              class={tw`text-5xl leading-none font-medium mx-auto z-20`}
            >
              Talents
            </h1>
          </div>

          <ArtistsLayout artists={artists} grid={grid} />
        </main>

        <WaterDrop color={color} />
        <Footer color={color} />
      </div>
    </>
  );
}
