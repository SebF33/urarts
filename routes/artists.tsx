import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import ArtistsSearch from "@islands/livesearch/ArtistsSearch.tsx";
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

export default function ArtistsPage(
  props: PageProps<{
    pathname: string;
  }>,
) {
  const { pathname } = props.data;

  return (
    <DefaultLayout
      title="Urarts - Artistes"
      desc="Les meilleurs artistes au monde."
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/gray)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "3400px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname={pathname} />
        <ArtistsSearch />
        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
