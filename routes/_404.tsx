import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { PageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function NotFoundPage({ url }: PageProps) {
  return (
    <>
      <main id="page" data-name="error" class="flex-grow">
        <ErrorLayout firstDigit="4" secondDigit="0" thirdDigit="4" />
        <div class="paper max-w-[400px] mx-auto text-lighterdark overflow-hidden sm:overflow-visible">
          <div class="top-tape"></div>
          <div class="w-full my-5 mx-1">
            <h2 class="text-center text-4xl font-bold">Erreur 404 !</h2>
            <p class="text-center text-xl font-bold">
              Page introuvable : {url.pathname}
            </p>
          </div>
        </div>
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
