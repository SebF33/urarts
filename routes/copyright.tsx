import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { TALENTS } from "@utils/constants.ts";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;


export const handler: Handlers = {
  async GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.copyright.desc", { ns: "translation" });
    const title = i18next.t("meta.copyright.title", { ns: "translation" });
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
      .where("copyright", "=", 2)
      .orderBy(({ fn }) => fn("lower", ["last_name"]))
      .orderBy(({ fn }) => fn("lower", ["first_name"]))
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

    const grid =
      "grid gap-4 sm:gap-10 grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-14";

    return ctx.render({ artists, desc, grid, title });
  },
};


export default function CopyrightPage(
  props: PageProps<{
    artists: Artists;
    desc: string;
    grid: string;
    title: string;
  }>,
) {

  const { artists, desc, grid, title } = props.data;


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
        data-name="copyright"
        class="flex-grow"
      >
        <div
          class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div
            class={`paper min-h-[60px] max-w-[260px] mt-2 mb-6 md:mt-5`}
          >
            <div class="tape-section"></div>
            <h1 class={`text-2xl md:text-5xl leading-none font-medium mb-2 ml-2`}>
              Copyright©
            </h1>
            <div class="tape-section"></div>
          </div>
        </div>

        <ArtistsLayout artists={artists} flag="copyright" grid={grid} />
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].lighterdark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].lighterdark}
      />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
