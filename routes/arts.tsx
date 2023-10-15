import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";

import ArtsSearch from "@islands/livesearch/ArtsSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers<{}> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    return ctx.render({ pathname });
  },
};

export default function ArtsPage(
  props: PageProps<{
    pathname: string;
  }>,
) {
  const { pathname } = props.data;
  const desc = "Toutes les plus belles œuvres d'art au monde.";
  const title = "Urarts - Œuvres";

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

      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/gray)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "3200px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname={pathname} />

        <ArtsSearch />

        <WaterDrop color={colorScheme[currentColorScheme].blue} />
        <Footer color={colorScheme[currentColorScheme].blue} />
      </div>
    </>
  );
}
