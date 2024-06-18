import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import ArtistsSearch from "@islands/livesearch/ArtistsSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function ArtistsPage() {
  const desc = "Les meilleurs artistes au monde.";
  const title = "Urarts - Artistes";

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

      <main
        id="page"
        data-name="artists"
        class="scrollable flex-grow xl:max-h-[900px] xl:overflow-y-scroll custom-scrollbar transparent-mask-99">
        <ArtistsSearch />
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].lighterdark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].lighterdark}
      />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
