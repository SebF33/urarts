import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { MovementRow } from "@utils/types.d.ts";

import Footer from "@islands/footer/Footer.tsx";
import MovementsList from "@islands/MovementsList.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Movements = Array<MovementRow>;

export const handler: Handlers = {
  async GET(_, ctx) {
    const db = Db.getInstance();
    const { count } = db.fn;

    const results = await db
      .selectFrom("movement")
      .innerJoin("art", "art.movement_id", "movement.id")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .select([
        "movement.id",
        "movement.name",
        "movement.slug",
        count("art.id").as("art_count"),
      ])
      .where("movement.slug", "!=", "nonclasse")
      .where("copyright", "!=", 2)
      .groupBy("movement.id")
      .orderBy("movement.name")
      .execute();

    const movements = results.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      art_count: String(p.art_count),
    }));

    return ctx.render({ movements });
  },
};

export default function MovementsPage(
  props: PageProps<{
    movements: Movements;
  }>,
) {
  const { movements } = props.data;
  const desc = "Les principaux mouvements artistiques.";
  const title = "Urarts - Mouvements";

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

      <main id="page" data-name="movements" class={`scrollable flex-grow xl:max-h-[860px] xl:overflow-y-scroll custom-scrollbar ${
          css({
            "mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
            "-webkit-mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
            "-o-mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
            "-moz-mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
          })
        }`}
      >
        <MovementsList movements={movements} />
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
