import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import DOMPurify from "npm:isomorphic-dompurify"
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { sql } from "kysely";
import { TALENTS } from "@utils/constants.ts";

import AnimBrushStroke from "@islands/AnimBrushStroke.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


export const handler: Handlers = {
  async GET(_: Request, ctx: FreshContext) {
    const lng = i18next.language;
    const { slug } = ctx.params;

    const db = Db.getInstance();
    const result = await db.selectFrom("movement")
      .select(["font", "slug"])
      .$if(lng === 'fr', (qb) => qb.select("name"))
      .$if(lng === 'en', (qb) => qb.select("name_en as name"))
      .$if(lng === 'fr', (qb) => qb.select("info"))
      .$if(lng === 'en', (qb) => qb.select("info_en as info"))
      .where("slug", "=", slug).executeTakeFirst();

    let artists: string[] | null = null;
    let desc: string | null = null;
    let font: string | null = null;
    let info: string | null = null;
    let movement: string | null = null;
    let mySlug: string | null = null;
    let title: string | null = null;

    if (result) {
      const artistQuery = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select(["artist.avatar_url", "artist.last_name", "artist.slug"])
      .distinct()
      .where("movement.slug", "=", result.slug)
      .where("artist.slug", "not in", TALENTS)
      .orderBy(sql`random()`)
      .limit(12)
      .execute();
      
      // Position des étiquettes d'artiste
      const lValues = ["-ml-2", "ml-36", "-ml-1", "ml-40", "-ml-3", "ml-2", "-ml-2", "ml-1", "-ml-2", "ml-40", "-ml-3", "ml-36"];
      const rValues = ["-rotate-3", "rotate-6", "rotate-2", "-rotate-2", "-rotate-2", "rotate-6", "-rotate-3", "rotate-3", "rotate-0", "rotate-3", "rotate-1", "-rotate-12"];
      const tValues = ["-mt-2", "-mt-12", "-mt-1", "-mt-14", "-mt-3", "mt-2", "-mt-2", "mt-1", "-mt-2", "-mt-24", "mt-6", "-mt-16"];

      artists = artistQuery.map((p, index) => ({
        avatar_url: p.avatar_url,
        name: p.last_name,
        position: tValues[index % tValues.length] + " " + lValues[index % lValues.length] + " " + rValues[index % rValues.length],
        slug: p.slug,
      }));
      movement = result.name;
      desc = movement + ".";
      font = result.font;
      info = result.info;
      mySlug = result.slug;
      title = movement + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({
      artists,
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
    artists: string[];
    desc: string;
    font: string;
    info: string;
    movement: string;
    mySlug: string;
    title: string;
  }>,
) {
  const {
    artists,
    desc,
    font,
    info,
    movement,
    mySlug,
    title,
  } = props.data;

  const draggable = false;

  
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

      <main id="page" data-name="collection" class="scrollable flex-grow mb-6 xl:max-h-screen xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
        <div
          class={`relative w-auto flex flex-col mx-auto`}
        >
          {artists &&
            <div class={`invisible xl:visible absolute max-w-0 xl:max-w-full mt-12 ml-16 overflow-hidden xl:overflow-visible`}>
              {artists && artists.map((p) => (
                <div
                  class={`paper appear-effect-fast-fadein max-w-[140px] min-h-8 ${p.position} shadow-none`}
                >
                  <div class="top-tape max-h-3"></div>
                  <a
                    href={"/art/" + p.slug}
                    class={`z-10 text-center text-lighterdark text-xl italic underline select-none`}
                    draggable={draggable}
                  >
                    {p.name}
                  </a>
                  <img class={`w-14 ml-3 p-1`} src={p.avatar_url} alt={p.name} />
                </div>
              ))}
            </div>
          }

          <div class={`mx-auto mt-8 z-10`}>
            <AnimBrushStroke
              color={colorScheme[currentColorScheme].white}
              font={font}
              secondaryColor={colorScheme[currentColorScheme].lighterdark}
              title={movement}
            />
          </div>
          <div class={`-mt-44`}>
            <div
              class={`h-fit bg-lighterdark shadow-2xl`}
            >
              <div
                class={`w-11/12 xl:w-3/6 mx-auto pt-48 text-center`}
              >
                <p class={`relative pb-8 text-center text-[1.1rem] text-white text-justify leading-5 z-10 select-none`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info) }}></p>
              </div>
            </div>
          </div>

          <CollectionSearch font={font} myslug={mySlug} type="movement" />
        </div>
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
