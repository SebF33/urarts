import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "../utils/i18n/config.ts";

import Footer from "@islands/footer/Footer.tsx";
import HistoSearch from "@islands/livesearch/HistoSearch.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    let query: string | null = null;

    query = url.searchParams.get("id") || "";

    return ctx.render({ query });
  },
};

export default function HistoCharactersPage(
  props: PageProps<{
    query: string;
  }>,
) {
  const { query } = props.data;
  const desc = "Les personnages historiques.";
  const title = "Urarts - Personnages historiques";

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

      <main id="page" data-name="histocharacters" class={`scrollable flex-grow xl:max-h-[870px] xl:overflow-y-scroll custom-scrollbar ${
          css({
            "mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
            "-webkit-mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
            "-o-mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
            "-moz-mask-image": `linear-gradient(to bottom, black 99%, transparent 100%)`,
          })
        }`}
      >
        <HistoSearch id={query} />
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].dark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].dark}
      />
      <Footer color={colorScheme[currentColorScheme].dark} />
    </>
  );
}
