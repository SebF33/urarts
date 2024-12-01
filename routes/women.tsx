import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import WomenSearch from "@islands/livesearch/WomenSearch.tsx";


export const handler: Handlers = {
  GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.women.desc", { ns: "translation" });
    const title = i18next.t("meta.women.title", { ns: "translation" });

    return ctx.render({ desc, title });
  },
};


export default function WomenPage(
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

      <main id="page" data-name="women" class="scrollable flex-grow xl:max-h-[870px] xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
        <WomenSearch />
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].magenta}
        isDropy
        pencilColor={colorScheme[currentColorScheme].magenta}
      />
      <Footer color={colorScheme[currentColorScheme].magenta} />
    </>
  );
}
