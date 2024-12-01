import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { NATIONALITIES } from "@utils/constants.ts";
import { sql } from "kysely";

import ArtistsSearch from "@islands/livesearch/ArtistsSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.artists.desc", { ns: "translation" });
    const title = i18next.t("meta.artists.title", { ns: "translation" });
    const url = new URL(req.url);

    let nationality: string = url.searchParams.get("nationality") || "";

    if (nationality !== "") {
      // Contrôle nationalités définies
      NATIONALITIES.includes(nationality) ? nationality : nationality = "Monde";

      if (nationality !== "Monde") {
        const db = Db.getInstance();
        const result = await db.selectFrom("country").select("name")
          .where(sql`(name = ${nationality} OR name_en = ${nationality})`)
          .executeTakeFirst();
        nationality = result.name;
      }
    }

    return ctx.render({ desc, nationality, title });
  },
};


export default function ArtistsPage(
  props: PageProps<{
    desc: string;
    nationality: string;
    title: string;
  }>,
) {

  const { desc, nationality, title } = props.data;

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
        data-name="artists"
        class="scrollable flex-grow xl:max-h-[900px] xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
        <ArtistsSearch nationality={nationality} />
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
