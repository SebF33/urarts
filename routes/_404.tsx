import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { PageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function NotFoundPage({ url }: PageProps) {
  return (
    <>
      <main id="page" data-name="error" class="flex-grow transparent-mask-96">
        <ErrorLayout firstDigit="4" secondDigit="0" thirdDigit="4" msg={url.pathname} />
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
