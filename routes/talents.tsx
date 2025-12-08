import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import { ButtonLines } from "@components/Assets.tsx";
import Footer from "@islands/footer/Footer.tsx";
import TalentsArtSideBar from "@islands/livesearch/TalentsArtSideBar.tsx";
import TalentsList from "@islands/TalentsList.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;


export const handler: Handlers = {
  async GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.talents.desc", { ns: "translation" });
    const title = i18next.t("meta.talents.title", { ns: "translation" });
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

    return ctx.render({ artists, color, desc, title });
  },
};


export default function TalentsPage(
  props: PageProps<{
    artists: Artists;
    color: string;
    desc: string;
    title: string;
  }>,
) {

  const { artists, color, desc, title } = props.data;
  

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
        data-name="talents"
        class="flex-grow"
      >
        <button
          data-open-section="talents-art"
          data-open-value="true"
          class="absolute top-20 right-3 p-2 gap-1 hidden 2xl:flex justify-center items-center bg-lighterdark text-sm text-white rounded-md">
          <span class="sr-only">Ouvrir</span>
          <ButtonLines />
        </button>

        <TalentsList artists={artists} />
      </main>

      <TalentsArtSideBar />

      <WaterDrop
        color={color}
        isDropy
        pencilColor={color}
      />
      <Footer color={color} />
    </>
  );
}
