import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";

import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";
import ArtsSearch from "@islands/ArtsSearch.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

export default function Search() {
  return (
    <div
      class={tw`flex flex-col min-h-screen ${
        css({
          background: `url(/bg)`,
          "background-color": `${colorScheme[currentColorScheme].white}`,
          "background-position": "center",
          "background-size": "3200px",
          "-webkit-tap-highlight-color": "transparent",
        })
      }`}
    >
      <Header />
      <ArtsSearch />
      <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </div>
  );
}
