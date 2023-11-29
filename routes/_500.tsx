import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { ErrorPageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <>
      <main
        class={`flex-grow`}
      >
        <ErrorLayout firstDigit="5" secondDigit="0" thirdDigit="0" />
        <div class={`mx-auto text-lighterdark`}>
          <h2 class={`text-center text-4xl font-bold`}>Erreur 500 !</h2>
          <p class={`text-center text-xl font-bold`}>
            Problème interne du serveur : {(error as Error).message}
          </p>
        </div>
      </main>

      <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
