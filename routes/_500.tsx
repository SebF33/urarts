import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { tw } from "twind";
import { ErrorPageProps } from "$fresh/server.ts";

import DefaultLayout from "@components/DefaultLayout.tsx";
import ErrorLayout from "@components/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <DefaultLayout
      title="Urarts - Erreur"
      desc={`500 Problème interne du serveur`}
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/gray)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "4000px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav />
        <main
          class={tw`flex-grow`}
        >
          <ErrorLayout firstDigit="5" secondDigit="0" thirdDigit="0" />
          <div
            class={tw`font-brush mx-auto ${
              css(
                {
                  "color": `${colorScheme[currentColorScheme].lighterdark}`,
                },
              )
            }`}
          >
            <h2 class={tw`text-center text-4xl font-bold`}>Erreur 500 !</h2>
            <p class={tw`text-center text-xl font-bold`}>
              Problème interne du serveur : {(error as Error).message}
            </p>
          </div>
        </main>
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
