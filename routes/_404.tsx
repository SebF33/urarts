import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { tw } from "twind";
import { UnknownPageProps } from "$fresh/server.ts";

import DefaultLayout from "@components/DefaultLayout.tsx";
import ErrorLayout from "@components/ErrorLayout.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <DefaultLayout
      title="Urarts - Page introuvable"
      desc={`404 Page introuvable : ${url.pathname}`}
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
          <ErrorLayout firstDigit="4" secondDigit="0" thirdDigit="4" />
          <div
            class={tw`font-brush mx-auto ${
              css(
                {
                  "color": `${colorScheme[currentColorScheme].lighterdark}`,
                },
              )
            }`}
          >
            <h2 class={tw`text-center text-4xl font-bold`}>Erreur 404 !</h2>
            <p class={tw`text-center text-xl font-bold`}>
              Page introuvable : {url.pathname}
            </p>
          </div>
        </main>
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
