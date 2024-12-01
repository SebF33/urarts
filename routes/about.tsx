import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import Footer from "@islands/footer/Footer.tsx";
import Mona from "@islands/Mona.tsx";
import Note from "@islands/Note.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import Title from "@islands/Title.tsx";


export const handler: Handlers = {
  GET(_: Request, ctx: FreshContext) {
    const desc = i18next.t("meta.about.desc", { ns: "translation" });
    const title = i18next.t("meta.about.title", { ns: "translation" });

    // Couleurs Mona Lisa
    const randomColorsIndex = Math.floor(Math.random() * 7);
    const colors = [
      "#c89b7c",
      "#5e3519",
      "#483316",
      "#667362",
      "#6a3726",
      "#413b25",
      "#2e2a1f",
    ];
    const color = colors[randomColorsIndex];

    return ctx.render({ color, desc, title });
  },
};


export default function AboutPage(
  props: PageProps<{
    color: string;
    desc: string;
    title: string;
  }>,
) {

  const { color, desc, title } = props.data;

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

      <main id="page" data-name="about" class="mona-page scrollable flex-grow xl:max-h-screen xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
        <div class="p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            name="about"
            dimension="min-h-[30px] max-w-[115px] md:min-h-[60px] md:max-w-[230px]"
            margin="mt-2 mb-6 md:mt-5"
          />
          <Note />
          <Mona />
        </div>
      </main>

      <WaterDrop
        color={color}
        isDropy
        pencilColor={color}
      />
      <Footer color={color} />
    </>
  );
}
