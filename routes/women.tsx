import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";

import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import WomenSearch from "@islands/livesearch/WomenSearch.tsx";

export default function WomenPage() {
  return (
    <DefaultLayout
      title="Urarts - Femmes artistes"
      desc="Les femmes artistes."
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/white)`,
            "background-color": `${colorScheme[currentColorScheme].gray}`,
            "background-position": "center",
            "background-size": "3400px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname="/artists" />
        <WomenSearch />
        <WaterDrop color={colorScheme[currentColorScheme].magenta} />
        <Footer color={colorScheme[currentColorScheme].magenta} />
      </div>
    </DefaultLayout>
  );
}
