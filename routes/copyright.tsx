import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { TALENTS } from "@utils/constants.ts";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers = {
  async GET(_, ctx) {
    const db = Db.getInstance();

    const artistQuery = await db.selectFrom("artist")
      .selectAll()
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

    return ctx.render({ artists, grid });
  },
};

export default function HomePage(
  props: PageProps<{
    artists: Artists;
    grid: string;
  }>,
) {
  const { artists, grid } = props.data;
  const desc = "Artistes sous copyright";
  const title = "Urarts - Copyright";

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

      <main id="page" data-name="home" class="flex-grow">
        <div
          class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div
            class={`paper min-h-[60px] max-w-[260px] my-5`}
          >
            <div class="tape-section"></div>
            <h1 class={`text-5xl leading-none font-medium mb-2 ml-2`}>
              Artistes sous copyright ©
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
