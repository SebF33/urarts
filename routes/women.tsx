import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { define } from "@/utils.ts";
import { Head } from "fresh/runtime";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { PageProps } from "fresh";

import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import WomenSearch from "@islands/livesearch/WomenSearch.tsx";


export const handler = define.handlers({
  GET(_ctx) {
    const desc = i18next.t("meta.women.desc", { ns: "translation" });
    const title = i18next.t("meta.women.title", { ns: "translation" });

    return {
      data: { desc, title }
    };
  },
});


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

      <main
        id="page"
        data-name="women"
        class="flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar"
      >
        <WomenSearch />
      </main>

      <WaterDrop
        backgroundColor="gray"
        color={colorScheme[currentColorScheme].magenta}
        isDropy
        pencilColor={colorScheme[currentColorScheme].magenta}
      />
      <Footer color={colorScheme[currentColorScheme].magenta} />
    </>
  );
}
