import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { tw } from "twind";

import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import HistoSearch from "@islands/livesearch/HistoSearch.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function HistoCharactersPage() {
  return (
    <DefaultLayout
      title="Urarts - Personnages historiques"
      desc="Les personnages historiques."
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/white)`,
            "background-color": `${colorScheme[currentColorScheme].gray}`,
            "background-position": "center",
            "background-size": "346px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname="/arts" />
        <HistoSearch />
        <WaterDrop color={colorScheme[currentColorScheme].dark} />
        <Footer color={colorScheme[currentColorScheme].dark} />
      </div>
    </DefaultLayout>
  );
}
