import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { PageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function Error500Page({ error }: PageProps) {
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
        <ErrorLayout firstDigit="5" secondDigit="0" thirdDigit="0" />
        <div class="paper max-w-[500px] mx-auto mb-6 text-lighterdark overflow-hidden sm:overflow-visible">
          <div class="top-tape"></div>
          <div class="w-full my-5 mx-1">
            <h2 class="text-center text-4xl font-bold">Erreur 500 !</h2>
            <p class="text-center text-xl font-bold">
              Problème interne du serveur : {(error as Error).message}
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
