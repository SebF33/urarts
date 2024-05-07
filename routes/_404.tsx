import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { PageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function NotFoundPage({ url }: PageProps) {
  return (
    <>
      <main id="page" data-name="error" class={`flex-grow ${
          css({
            "mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
            "-webkit-mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
            "-o-mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
            "-moz-mask-image": `linear-gradient(to bottom, black 96%, transparent 100%)`,
          })
        }`}
      >
        <ErrorLayout firstDigit="4" secondDigit="0" thirdDigit="4" />
        <div class="paper max-w-[400px] mx-auto mb-6 text-lighterdark overflow-hidden sm:overflow-visible">
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
