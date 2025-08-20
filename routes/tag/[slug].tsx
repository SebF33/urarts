import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


interface TagPageProps {
  color: string;
  desc: string;
  font: string;
  info: string;
  slug: string;
  tag: string;
  title: string;
}


export const handler: Handlers<TagPageProps> = {
  async GET(_: Request, ctx: FreshContext) {
    const lng = i18next.language;
    const { slug } = ctx.params;

    const db = Db.getInstance();

    const tagDetails = await db
      .selectFrom("tag")
      .select(["slug"])
      .$if(lng === "fr", (qb) => qb.select("name"))
      .$if(lng === "en", (qb) => qb.select("name_en as name"))
      .$if(lng === "fr", (qb) => qb.select("info"))
      .$if(lng === "en", (qb) => qb.select("info_en as info"))
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!tagDetails) {
      return ctx.renderNotFound();
    }

    const tag = tagDetails.name;
    const desc = `${tag}.`;
    const title = `${tag} ${
      i18next.t("meta.collection.title", { ns: "translation" })
    }`;

    return ctx.render({
      desc,
      font: "brush",
      info: tagDetails.info,
      slug: tagDetails.slug,
      tag,
      title,
    });
  },
};


export default function TagPage(props: PageProps<TagPageProps>) {
  const { desc, font, info, tag, slug, title } = props.data;

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

      <main
        id="page"
        data-name="collection"
        class="flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar"
      >
        <div class="relative w-auto flex flex-col mx-auto">
          <div class="relative bg-lighterdark shadow-2xl">
            <div class="relative max-w-6xl mx-auto px-4 sm:px-6 py-8">
              <div class="p-4 sm:p-6">
                <div class="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                  <div class="shrink-0 mx-auto md:mx-0">
                    <img
                      src={`/tags/${slug}.png`}
                      alt={tag}
                      class="block w-24 h-24 md:w-32 md:h-32 object-contain select-none"
                      draggable={draggable}
                      loading="lazy"
                    />
                  </div>
                  <div class="grow">
                    <div class="inline-block">
                      <h1 class="text-white text-3xl md:text-5xl font-bold leading-tight">
                        {tag}
                      </h1>
                      <div class="mt-2 h-1 w-full bg-white rounded-full"></div>
                    </div>
                    <p
                      class="mt-4 text-white/90 text-lg md:text-xl leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: info }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CollectionSearch font={font} myslug={slug} type="tag" />
        </div>
      </main>

      <WaterDrop
        backgroundColor="gray"
        color={colorScheme[currentColorScheme].lighterdark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].lighterdark}
      />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
