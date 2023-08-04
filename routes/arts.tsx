import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import ArtsSearch from "@islands/livesearch/ArtsSearch.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers<{
  pathname: string;
}> = {
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

  return (
    <DefaultLayout
      title="Urarts - Œuvres"
      desc="Toutes les plus belles œuvres d'art au monde."
    >
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
    </DefaultLayout>
  );
}
