import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import Footer from "@islands/footer/Footer.tsx";
import TalentsList from "@islands/TalentsList.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers = {
  async GET(_, ctx) {
    const db = Db.getInstance();

    const artistQuery = await db.selectFrom("artist")
      .selectAll()
      .where("slug", "in", TALENTS)
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

    return ctx.render({ artists, color });
  },
};

export default function TalentsPage(
  props: PageProps<{
    artists: Artists;
    color: string;
  }>,
) {
  const { artists, color } = props.data;
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

      <main id="page" data-name="talents" class={`flex-grow ${
          css({
            "mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
            "-webkit-mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
            "-o-mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
            "-moz-mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
          })
        }`}
      >
        <TalentsList artists={artists} />
      </main>

      <WaterDrop
        color={color}
        isDropy
        pencilColor={color}
      />
      <Footer color={color} />
    </>
  );
}
