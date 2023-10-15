import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";

import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import WomenSearch from "@islands/livesearch/WomenSearch.tsx";

export default function WomenPage() {
  const desc = "Les femmes artistes.";
  const title = "Urarts - Femmes artistes";

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
    </>
  );
}
