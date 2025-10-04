import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import TagHero from "@islands/hero/TagHero.tsx";
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

  const isPersoGallery = props.url.pathname.endsWith("/gallery");

  
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
          <TagHero
            info={info}
            myslug={slug}
            tag={tag}
          />
          <CollectionSearch
            key={`collection-tag-${slug}`}
            font={font}
            ispersogallery={isPersoGallery}
            myslug={slug}
            type="tag"
          />
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
