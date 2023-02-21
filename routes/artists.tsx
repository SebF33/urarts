import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import ArtistsSearch from "@islands/ArtistsSearch.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Nav from "@islands/Nav.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

export const handler: Handlers<{
  pathname: string;
}> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    return ctx.render({ pathname });
  },
};

export default function Search(
  props: PageProps<{
    pathname: string;
  }>,
) {
  const { pathname } = props.data;

  return (
    <DefaultLayout
      title="Artistes"
      desc="Les meilleurs artistes au monde."
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
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
