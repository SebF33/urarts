import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { HttpError, PageProps } from "fresh";


import ErrorLayout from "@islands/layout/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";


export default function ErrorPage(props: PageProps) {
  const error = props.error;

  // Status par défaut
  let status = 500;

  // Cas HTTP
  if (error instanceof HttpError) {
    status = error.status;
  }

  // Extraction des digits (ex: 404 → ["4","0","4"])
  const [firstDigit, secondDigit, thirdDigit] = String(status)
    .padStart(3, "0")
    .split("");

  // Message selon le status
  let msg: string;

  if (status === 404) {
    msg = props.url.pathname;
  } else if (status === 500) {
    msg = error instanceof Error ? error.message : "Unknown error";
  } else {
    msg = "Unexpected error";
  }


  return (
    <>
      <main id="page" data-name="error" class="flex-grow">
        <ErrorLayout
          firstDigit={firstDigit}
          secondDigit={secondDigit}
          thirdDigit={thirdDigit}
          msg={msg}
        />
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
