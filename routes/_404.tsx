import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { PageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function NotFoundPage({ url }: PageProps) {
  return (
    <>
      <main id="page" data-name="notfound" class="flex-grow">
        <ErrorLayout firstDigit="4" secondDigit="0" thirdDigit="4" />
        <div
          class={`mx-auto text-lighterdark`}
        >
          <h2 class={`text-center text-4xl font-bold`}>Erreur 404 !</h2>
          <p class={`text-center text-xl font-bold`}>
            Page introuvable : {url.pathname}
          </p>
        </div>
      </main>

      <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
