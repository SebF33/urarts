import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { define } from "@/utils.ts";
import { Head } from "fresh/runtime";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { PageProps } from "fresh";

import ArtsSearch from "@islands/livesearch/ArtsSearch.tsx";
import { DiscoverPaper } from "@islands/paper/DiscoverPaper.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import { WorldMapPaper } from "@islands/paper/WorldMapPaper.tsx";


export const handler = define.handlers({
  GET(_ctx) {
    const desc = i18next.t("meta.arts.desc", { ns: "translation" });
    const title = i18next.t("meta.arts.title", { ns: "translation" });

    return {
      data: { desc, title }
    };
  },
});


export default function ArtsPage(
  props: PageProps<{
    desc: string;
    title: string;
  }>,
) {

  const { desc, title } = props.data;

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
        data-name="arts"
        class="relative flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar overflow-hidden"
      >
        {/* Post-it : découverte de l'Art */}
        <div class="hidden 2xl:block absolute top-0 -left-16">
          <DiscoverPaper />
        </div>

        {/* Recherche : œuvres d'art */}
        <ArtsSearch />

        {/* Post-it : lien vers la carte du Monde */}
        <div class="absolute top-1 right-0">
          <WorldMapPaper />
        </div>
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].blue}
        isDropy
        pencilColor={colorScheme[currentColorScheme].magenta}
      />
      <Footer color={colorScheme[currentColorScheme].blue} />
    </>
  );
}
