import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Head } from "$fresh/runtime.ts";

import Footer from "@islands/footer/Footer.tsx";
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

      <main id="page" data-name="women" class="flex-grow">
        <WomenSearch />
      </main>

      <WaterDrop
        color={colorScheme[currentColorScheme].magenta}
        isDropy
        pencilColor={colorScheme[currentColorScheme].magenta}
      />
      <Footer color={colorScheme[currentColorScheme].magenta} />
    </>
  );
}
