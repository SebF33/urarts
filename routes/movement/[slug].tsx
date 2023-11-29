import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import AnimBrushStroke from "@islands/AnimBrushStroke.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const db = Db.getInstance();
    const result = await db.selectFrom("movement")
      .select([
        "name",
        "font",
        "info",
        "slug",
      ]).where("slug", "=", slug).executeTakeFirst();

    let desc: string | null = null;
    let font: string | null = null;
    let info: string | null = null;
    let movement: string | null = null;
    let mySlug: string | null = null;
    let title: string | null = null;

    if (result) {
      movement = result.name;
      desc = movement + ".";
      font = result.font;
      info = result.info;
      mySlug = result.slug;
      title = movement + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({
      desc,
      font,
      info,
      movement,
      mySlug,
      title,
    });
  },
};

export default function MovementArtsPage(
  props: PageProps<{
    desc: string;
    font: string;
    info: string;
    movement: string;
    mySlug: string;
    title: string;
  }>,
) {
  const {
    desc,
    font,
    info,
    movement,
    mySlug,
    title,
  } = props.data;

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
        class={`flex-grow mb-20`}
      >
        <div
          class={`w-auto flex flex-col mx-auto`}
        >
          <div class={`mx-auto mt-8 z-10`}>
            <AnimBrushStroke
              color={colorScheme[currentColorScheme].white}
              font={font}
              fontcolor={colorScheme[currentColorScheme].lighterdark}
              title={movement}
            />
          </div>
          <div class={`-mt-44`}>
            <div
              class={`h-[38rem] md:h-96 bg-lighterdark shadow-2xl`}
            >
              <div
                class={`w-11/12 xl:w-3/6 mx-auto pt-44 text-center`}
              >
                <p
                  class={`text-center text-[1.1rem] text-white leading-5 select-none`}
                >
                  {info}
                </p>
              </div>
            </div>
          </div>

          <CollectionSearch font={font} myslug={mySlug} type="movement" />
        </div>
      </main>

      <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
