import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { define } from "@/utils.ts";
import { Head } from "fresh/runtime";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { PageProps } from "fresh";

import Footer from "@islands/footer/Footer.tsx";
import HistoSearch from "@islands/livesearch/HistoSearch.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


export const handler = define.handlers({
  GET(ctx) {
    const url = ctx.url;

    const desc = i18next.t("meta.histocharacters.desc", { ns: "translation" });
    const title = i18next.t("meta.histocharacters.title", { ns: "translation" });

    let query: string | null = null;
    query = url.searchParams.get("id") || "";

    return {
      data: { desc, query, title }
    };
  },
});


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

      <main
        id="page"
        data-name="histocharacters"
        class="flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar"
      >
        <HistoSearch id={query} />
      </main>

      <WaterDrop
        backgroundColor="gray"
        color={colorScheme[currentColorScheme].dark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].dark}
      />
      <Footer color={colorScheme[currentColorScheme].dark} />
    </>
  );
}
