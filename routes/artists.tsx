import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { define } from "@/utils.ts";
import { Head } from "fresh/runtime";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { NATIONALITIES_SLUGS } from "@utils/constants.ts";
import { PageProps } from "fresh";

import ArtistsSearch from "@islands/livesearch/ArtistsSearch.tsx";
import { DiscoverPaper } from "@islands/paper/DiscoverPaper.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import { WorldMapPaper } from "@islands/paper/WorldMapPaper.tsx";


export const handler = define.handlers({
  async GET(ctx) {
    const url = ctx.url;

    const desc = i18next.t("meta.artists.desc", { ns: "translation" });
    const title = i18next.t("meta.artists.title", { ns: "translation" });

    let nationality: string = url.searchParams.get("nationality") || "";

    if (nationality !== "") {
      // contrôle des slugs de nationalité autorisés
      if (!NATIONALITIES_SLUGS.includes(nationality)) {
        nationality = "world";
      }
    }

    return {
      data: { desc, nationality, title }
    };
  },
});


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
        class="relative flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar overflow-hidden"
      >
        {/* Post-it : découverte de l'Art */}
        <div class="hidden 2xl:block absolute top-0 -left-16">
          <DiscoverPaper />
        </div>

        {/* Recherche : artistes */}
        <ArtistsSearch nationality={nationality} />

        {/* Post-it : lien vers la carte du Monde */}
        <div class="absolute top-1 right-0">
          <WorldMapPaper />
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
