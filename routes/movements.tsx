import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { MovementRow } from "@utils/types.d.ts";

import Footer from "@islands/footer/Footer.tsx";
import MovementsList from "@islands/MovementsList.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import { WorldMapPaper } from "@islands/paper/WorldMapPaper.tsx";

type Movements = Array<MovementRow>;


export const handler: Handlers = {
  async GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.movements.desc", { ns: "translation" });
    const title = i18next.t("meta.movements.title", { ns: "translation" });
    const lng = i18next.language;
    
    const db = Db.getInstance();
    const { count } = db.fn;

    const results = await db
      .selectFrom("movement")
      .innerJoin("art", "art.movement_id", "movement.id")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .select([
        "movement.id",
        "movement.slug",
        count("art.id").as("art_count"),
      ])
      .$if(lng === 'fr', (qb) => qb.select("movement.name"))
      .$if(lng === 'en', (qb) => qb.select("movement.name_en as name"))
      .where("movement.slug", "!=", "unclassified")
      .where("copyright", "!=", 2)
      .groupBy("movement.id")
      .$if(lng === 'fr', (qb) => qb.orderBy("movement.name"))
      .$if(lng === 'en', (qb) => qb.orderBy("movement.name_en"))
      .execute();

    const movements = results.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      art_count: String(p.art_count),
    }));

    return ctx.render({ desc, movements, title });
  },
};


export default function MovementsPage(
  props: PageProps<{
    desc: string;
    movements: Movements;
    title: string;
  }>,
) {

  const { desc, movements, title } = props.data;

  
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
        data-name="movements"
        class="relative flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar overflow-hidden"
      >
        <MovementsList movements={movements} />
        {/* Post-it : lien vers la carte du Monde */}
        <div class="absolute top-1 right-0">
          <WorldMapPaper />
        </div>
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].cyan}
        isDropy
        pencilColor={colorScheme[currentColorScheme].cyan}
      />
      <Footer color={colorScheme[currentColorScheme].cyan} />
    </>
  );
}
