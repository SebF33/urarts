import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { Head } from "$fresh/runtime.ts";

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

      <main id="page" data-name="artists" class="flex-grow">
        <ArtistsSearch />
      </main>

      <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
