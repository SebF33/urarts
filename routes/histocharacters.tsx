import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import Footer from "@islands/footer/Footer.tsx";
import HistoSearch from "@islands/livesearch/HistoSearch.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


export const handler: Handlers = {
  GET(req: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.histocharacters.desc", { ns: "translation" });
    const title = i18next.t("meta.histocharacters.title", { ns: "translation" });
    const url = new URL(req.url);

    let query: string | null = null;
    query = url.searchParams.get("id") || "";

    return ctx.render({ desc, query, title });
  },
};


export default function HistoCharactersPage(
  props: PageProps<{
    desc: string;
    query: string;
    title: string;
  }>,
) {

  const { desc, query, title } = props.data;

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

      <main id="page" data-name="histocharacters" class="scrollable flex-grow xl:max-h-[870px] xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
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
