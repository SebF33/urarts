import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { PageProps } from "$fresh/server.ts";

import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export default function Error500Page({ error }: PageProps) {
  return (
    <>
      <main
        id="page"
        data-name="error"
        class="flex-grow"
      >
        <ErrorLayout firstDigit="5" secondDigit="0" thirdDigit="0" msg={(error as Error).message} />
      </main>

      <WaterDrop
        backgroundColor="gray"
        color={colorScheme[currentColorScheme].lighterdark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].lighterdark}
      />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </>
  );
}
