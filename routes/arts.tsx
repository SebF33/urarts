import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import ArtsSearch from "@islands/livesearch/ArtsSearch.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function ArtsPage() {
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

      <main id="page" data-name="arts" class="flex-grow">
        <ArtsSearch />
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].blue}
        isDropy
        pencilColor={colorScheme[currentColorScheme].magenta}
      />
      <Footer color={colorScheme[currentColorScheme].blue} />
    </>
  );
}
