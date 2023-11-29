import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Head } from "$fresh/runtime.ts";

import Footer from "@islands/footer/Footer.tsx";
import HistoSearch from "@islands/livesearch/HistoSearch.tsx";
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

      <main class="flex-grow">
        <HistoSearch />
      </main>

      <WaterDrop color={colorScheme[currentColorScheme].dark} />
      <Footer color={colorScheme[currentColorScheme].dark} />
    </>
  );
}
