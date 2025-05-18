import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import ArtsSearch from "@islands/livesearch/ArtsSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


export const handler: Handlers = {
  GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.arts.desc", { ns: "translation" });
    const title = i18next.t("meta.arts.title", { ns: "translation" });

    return ctx.render({ desc, title });
  },
};


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
        class="flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar"
      >
        <ArtsSearch />
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
