import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import WorldMap from "@islands/WorldMap.tsx";


export const handler: Handlers = {
  async GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.worldmap.desc", { ns: "translation" });
    const title = i18next.t("meta.worldmap.title", { ns: "translation" });
    const lng = i18next.language;

    const db = Db.getInstance();

    const tagRows = await db
      .selectFrom("tag")
      .innerJoin("art_tag", "tag.id", "art_tag.tag_id")
      .select(["tag.id"])
      .$if(lng === "fr", (qb) => qb.select("tag.name"))
      .$if(lng === "en", (qb) => qb.select("tag.name_en as name"))
      .distinct()
      .orderBy("name")
      .execute();

    const artsTagsCountries = tagRows.map((r) => r.name);

    return ctx.render({
      artsTagsCountries,
      desc,
      title,
    });
  },
};


export default function WorldMapPage(
  props: PageProps<{
    artsTagsCountries: string[];
    desc: string;
    title: string;
  }>,
) {
  const { artsTagsCountries, desc, title } = props.data;

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
        data-name="worldmap"
        class="w-full h-full"
      >
        <div class={`p-4 max-w-7xl mx-auto -mb-32 px-4 sm:px-6 lg:px-8`}>
          {/* Titre de la page */}
          <div
            class={`paper min-h-[30px] max-w-[125px] md:min-h-[60px] md:max-w-[250px] mt-2 mb-5 md:mt-5 z-10`}
          >
            <div class="tape-section"></div>
            <h1
              class={`text-2xl md:text-4xl leading-none font-medium text-center mb-2`}
            >
              {i18next.t("title.worldmap", { ns: "translation" })}
            </h1>
            <div class="tape-section"></div>
          </div>
        </div>
        {/* Carte du Monde */}
        <WorldMap artsTagsCountries={artsTagsCountries} />
      </main>

      <WaterDrop
        backgroundColor="water"
        color={colorScheme[currentColorScheme].dark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].dark}
      />
      <Footer color={colorScheme[currentColorScheme].dark} />
    </>
  );
}
