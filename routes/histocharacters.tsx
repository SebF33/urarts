import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";

import Footer from "@islands/footer/Footer.tsx";
import HistoSearch from "@islands/livesearch/HistoSearch.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function HistoCharactersPage() {
  const desc = "Les personnages historiques.";
  const title = "Urarts - Personnages historiques";

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
    </>
  );
}
